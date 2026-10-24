import os
import sys
import re
import time
import argparse
import requests
import pandas as pd
from datetime import date, datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

# eBird API key, read from the environment (see .env.example)
API_KEY = os.getenv('EBIRD_API_KEY')
if not API_KEY:
    sys.exit('EBIRD_API_KEY is not set. Copy .env.example to .env and fill it in.')

BASE_URL = 'https://api.ebird.org/v2'
REGION_CODE_PATTERN = re.compile(r'^[A-Za-z0-9-]{2,20}$')
REQUEST_TIMEOUT = 15
REQUEST_DELAY = 0.5   # seconds between requests, to stay polite to the API
MAX_RETRIES = 4
MAX_RESULTS = 10000   # per-day cap enforced by the historic endpoint
SAVE_EVERY = 30       # days between incremental saves


def parse_date(date_str):
    """Parse an eBird observation date in either of its two formats."""
    for fmt in ('%Y-%m-%d %H:%M', '%Y-%m-%d'):
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    print(f"Failed to parse date: {date_str}")
    return None


def fetch_day(region_code, day):
    """Fetch all observations for one calendar day from the historic endpoint.

    Returns a list of observation dicts, or None if the day could not be fetched.
    """
    url = f'{BASE_URL}/data/obs/{region_code}/historic/{day.year}/{day.month}/{day.day}'
    headers = {'X-eBirdApiToken': API_KEY}
    params = {'maxResults': MAX_RESULTS, 'detail': 'simple'}

    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(url, headers=headers, params=params, timeout=REQUEST_TIMEOUT)
        except requests.RequestException as e:
            print(f"  Network error on {day}: {e}")
            time.sleep(2 ** attempt)
            continue

        if response.status_code == 200:
            rows = []
            for obs in response.json():
                rows.append({
                    'Species': obs.get('comName'),
                    'Location': obs.get('locName'),
                    'Latitude': obs.get('lat'),
                    'Longitude': obs.get('lng'),
                    'Observation Date': parse_date(obs.get('obsDt', '')),
                    'Count': obs.get('howMany', 'N/A'),
                })
            if len(rows) >= MAX_RESULTS:
                print(f"  Warning: {day} hit the {MAX_RESULTS}-record cap; data may be truncated.")
            return rows

        if response.status_code in (429, 500, 502, 503, 504):
            wait = 2 ** (attempt + 1)
            print(f"  HTTP {response.status_code} on {day}, retrying in {wait}s")
            time.sleep(wait)
            continue

        print(f"  HTTP {response.status_code} on {day}, skipping")
        return None

    print(f"  Giving up on {day} after {MAX_RETRIES} attempts")
    return None


def load_existing(output_file):
    try:
        df = pd.read_csv(output_file)
    except FileNotFoundError:
        return pd.DataFrame()
    df['Observation Date'] = pd.to_datetime(df['Observation Date'], errors='coerce')
    return df


def save(existing_df, new_rows, output_file):
    if not new_rows:
        return existing_df
    combined = pd.concat([existing_df, pd.DataFrame(new_rows)], ignore_index=True).drop_duplicates()
    combined.to_csv(output_file, index=False)
    return combined


def scrape(region_code, start, end, output_file):
    df = load_existing(output_file)

    # Resume support: skip days that already have at least one observation saved.
    # Days with no observations are fetched again, which costs one cheap request.
    done_days = set()
    if not df.empty:
        done_days = set(df['Observation Date'].dropna().dt.date)

    days = [start + timedelta(days=i) for i in range((end - start).days + 1)]
    todo = [d for d in days if d not in done_days]
    print(f"Fetching {len(todo)} day(s) for {region_code} ({len(days) - len(todo)} already saved).")

    pending = []
    for i, day in enumerate(todo, 1):
        rows = fetch_day(region_code, day)
        if rows:
            pending.extend(rows)
        if i % SAVE_EVERY == 0:
            df = save(df, pending, output_file)
            pending = []
            print(f"  {i}/{len(todo)} days processed, progress saved.")
        time.sleep(REQUEST_DELAY)

    df = save(df, pending, output_file)
    print(f"Done. {len(df)} total rows saved to {output_file}.")


def main():
    parser = argparse.ArgumentParser(description='Download historic eBird observations, one day at a time.')
    parser.add_argument('region_code', nargs='?', help="eBird region or hotspot code, e.g. US-WA-033 or L162766")
    parser.add_argument('--start', help='start date, YYYY-MM-DD (default: one year ago)')
    parser.add_argument('--end', help='end date, YYYY-MM-DD (default: yesterday)')
    args = parser.parse_args()

    region_code = (args.region_code or input("Enter the eBird region code (e.g., 'US-WA-033' for King County): ")).strip()
    if not REGION_CODE_PATTERN.match(region_code):
        sys.exit('Invalid region code.')

    try:
        end = datetime.strptime(args.end, '%Y-%m-%d').date() if args.end else date.today() - timedelta(days=1)
        start = datetime.strptime(args.start, '%Y-%m-%d').date() if args.start else end - timedelta(days=364)
    except ValueError:
        sys.exit('Dates must be in YYYY-MM-DD format.')
    if start > end:
        sys.exit('Start date must not be after end date.')

    output_file = f"{region_code.replace('-', '_')}_bird_data.csv"
    try:
        scrape(region_code, start, end, output_file)
    except KeyboardInterrupt:
        print("\nInterrupted. Re-run the same command to resume; saved days are skipped.")


if __name__ == '__main__':
    main()
