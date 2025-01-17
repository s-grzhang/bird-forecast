import pandas as pd

# Load CSV into a pandas DataFrame
file = 'English_species_file_L298030.csv'  # Replace with your CSV file path
df = pd.read_csv(file)

# Check if 'Species' column exists
if 'Species' in df.columns:
    # Get all unique species in the 'Species' column
    unique_species = df['Species'].unique()
    print("Unique species in the file:")
    for species in unique_species:
        print(species)
else:
    print("Warning: 'Species' column not found in the CSV file")