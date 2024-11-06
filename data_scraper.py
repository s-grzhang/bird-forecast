import requests
import pandas as pd
from datetime import datetime

# Your eBird API key
API_KEY = 'fnqq0qvc0dc1'


# Function to get recent bird observations for a specified location
def get_ebird_observations(region_code, days_back=365, max_results=200):
    url = f'https://api.ebird.org/v2/data/obs/{region_code}/recent'
    headers = {
        'X-eBirdApiToken': API_KEY
    }
    params = {
        'back': days_back,  # Number of days back to retrieve data
        'maxResults': max_results,  # Limit results
    }

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        observations = []

        for obs in data:
            observation = {
                'Species': obs.get('comName'),
                'Location': obs.get('locName'),
                'Latitude': obs.get('lat'),
                'Longitude': obs.get('lng'),
                'Observation Date': datetime.strptime(obs.get('obsDt'), '%Y-%m-%d %H:%M'),
                'Count': obs.get('howMany', 'N/A')
            }
            observations.append(observation)

        return pd.DataFrame(observations)
    else:
        print(f"Error fetching data: {response.status_code}")
        return None

existing_df = pd.read_csv('marymoor_data.csv')
# Use the function to get bird observations for a specific region
region_code = 'L351484'  # Example: Washington state (change as needed)
# Fetch new observations
new_observations_df = get_ebird_observations(region_code)

# Combine the existing and new observations
combined_df = pd.concat([existing_df, new_observations_df])

# Remove duplicates (if necessary)
combined_df = combined_df.drop_duplicates()

# Save the updated DataFrame back to the CSV file
combined_df.to_csv('marymoor_data.csv', index=False)

# Display the data
print(combined_df.head())
