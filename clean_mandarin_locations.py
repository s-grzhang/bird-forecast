import pandas as pd
import re  # Regular expression library

# List of CSV files to process
files = ['L128530_bird_data.csv', 'L162766_bird_data.csv', 'L207315_bird_data.csv', 'L232479_bird_data.csv', 'L257959_bird_data.csv', 'L269461_bird_data.csv', 'L298030_bird_data.csv', 'L321969_bird_data.csv', 'L351484_bird_data.csv']

# Function to check if a string contains Chinese characters
def contains_chinese(text):
    return bool(re.search('[\u4e00-\u9fff]', text))  # Chinese characters are in the range \u4e00-\u9fff

# Loop through each file
for file in files:
    df = pd.read_csv(file)  # Load CSV into a pandas DataFrame

    # Check if 'Location' column exists
    if 'Location' in df.columns:
        # Filter out rows where 'Location' contains Chinese characters
        df_filtered = df[~df['Location'].apply(contains_chinese)]
    else:
        print(f"Warning: 'Location' column not found in {file}")
        continue  # Skip this file if 'Location' column doesn't exist

    # Save the updated DataFrame to a new CSV with a unique name
    output_file = f"filtered_{file}"
    df_filtered.to_csv(output_file, index=False)
    print(f"Filtered file saved as {output_file}")