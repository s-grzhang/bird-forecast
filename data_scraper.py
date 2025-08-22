import requests
import pandas as pd
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get eBird API key from environment variable
API_KEY = os.getenv('EBIRD_API_KEY')
if not API_KEY:
    raise ValueError("EBIRD_API_KEY environment variable is required. Please set it in your .env file.")

# Function to parse dates in multiple formats
def parse_date(date_str):
    # Attempt to parse the date in multiple formats
    for fmt in ('%Y-%m-%d %H:%M', '%Y-%m-%d'):
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    # If none of the formats work, return None or raise an exception
    print(f"Failed to parse date: {date_str}")
    return None

# Function to get recent bird observations for a specified location
def get_ebird_observations(region_code, year=2023, max_results=200):
    url = f'https://api.ebird.org/v2/data/obs/{region_code}/recent'
    headers = {'X-eBirdApiToken': API_KEY}
    observations = []
    chunk_size = 30  # Limit each chunk to 30 days
    
    # Loop through each month of the specified year
    for month in range(1, 13):
        start_date = datetime(year, month, 1)
        if month == 12:  # December
            end_date = datetime(year + 1, 1, 1)  # End at the start of next year
        else:
            end_date = datetime(year, month + 1, 1)  # Start of next month
        
        # Split the month into chunks of 30 days
        while start_date < end_date:
            chunk_end_date = min(start_date + timedelta(days=chunk_size), end_date)
            
            # Convert dates to strings for API parameters
            start_date_str = start_date.strftime('%Y-%m-%d')
            chunk_end_date_str = chunk_end_date.strftime('%Y-%m-%d')

            # Define params to get data within the specific chunk range
            params = {
                'maxResults': max_results,  # Max results per request
            }

            response = requests.get(url, headers=headers, params=params)
            if response.status_code == 200:
                data = response.json()
                for obs in data:
                    observation = {
                        'Species': obs.get('comName'),
                        'Location': obs.get('locName'),
                        'Latitude': obs.get('lat'),
                        'Longitude': obs.get('lng'),
                        'Observation Date': parse_date(obs.get('obsDt')),
                        'Count': obs.get('howMany', 'N/A')
                    }
                    observations.append(observation)
            else:
                print(f"Error fetching data for {start_date_str} to {chunk_end_date_str}: {response.status_code}")
                break

            # Move the start_date to the next chunk
            start_date = chunk_end_date

    return pd.DataFrame(observations)

# Ask the user for the region code dynamically
region_code = input("Enter the eBird region code (e.g., 'US-WA-KI' for King County): ").strip()

# File name to store data (use region code to differentiate)
output_file = f"{region_code.replace('-', '_')}_bird_data.csv"

try:
    # Load existing data if available
    try:
        existing_df = pd.read_csv(output_file)
    except FileNotFoundError:
        existing_df = pd.DataFrame()  # No existing data
    
    # Fetch new observations
    print(f"Fetching data for region: {region_code}")
    new_observations_df = get_ebird_observations(region_code)
    
    # Combine the data, ensuring no duplicates
    if not existing_df.empty:
        combined_df = pd.concat([existing_df, new_observations_df]).drop_duplicates()
    else:
        combined_df = new_observations_df
    
    # Save the updated data
    combined_df.to_csv(output_file, index=False)
    print(f"Data for {region_code} saved to {output_file}.")
except Exception as e:
    print(f"An error occurred: {e}")