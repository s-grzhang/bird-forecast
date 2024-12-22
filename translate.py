import pandas as pd
from googletrans import Translator

# Initialize the translator
translator = Translator()

# List of your CSV files
csv_files = [
    "L257959_bird_data.csv", "L207315_bird_data.csv", "L162766_bird_data.csv",
    "L351484_bird_data.csv", "L321969_bird_data.csv", "L298030_bird_data.csv",
    "L269461_bird_data.csv", "L232479_bird_data.csv", "L128530_bird_data.csv"
]

# Function to translate location names from Chinese to English
def translate_location(location):
    try:
        # Translate from Chinese (zh-CN) to English (en)
        translated = translator.translate(location, src='zh-CN', dest='en')
        return translated.text
    except Exception as e:
        print(f"Error translating {location}: {e}")
        return location  # Return original if there's an error

# Loop through each CSV file
for file in csv_files:
    # Read the CSV file
    df = pd.read_csv(file)
    
    # Ensure the 'Location' column exists
    if 'Location' in df.columns:
        # Translate the 'Location' column from Chinese to English
        df['Location'] = df['Location'].apply(translate_location)
    
        # Save the updated DataFrame back to the CSV
        df.to_csv(file, index=False)
        print(f"Updated {file} with translated locations.")

    else:
        print(f"'{file}' does not have a 'Location' column.")
