import pandas as pd

# Read the CSV into a DataFrame
df = pd.read_csv('filtered_L351484_bird_data.csv')

# List of non-species values (genus and family names)
non_species = [
    "Western x Glaucous-winged Gull (hybrid)",
    "Larus",
    "Passerellidae",
    "Empidonax",
    "Setophaga coronata auduboni",
    "Ardea herodias fannini",
    "Pandion haliaetus carolinensis",
    "Dryobates",
    "Psaltriparus minimus saturatus",
    "Mergus merganser americanus",
    "Pipilo maculatus oregonus",
    "Passeriformes",
    "Branta hutchinsii taverneri",
    "Anas crecca carolinensis",
    "Hirundinidae",
    "Setophaga coronata coronata",
    "Accipitriformes"
]

# Remove rows where 'Species' column matches any of the non-species values
df_cleaned = df[~df['Species'].isin(non_species)]

# Save the cleaned DataFrame back to a CSV file
df_cleaned.to_csv('English_species_file_L351484.csv', index=False)