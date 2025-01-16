import pandas as pd

# Read the CSV into a DataFrame
df = pd.read_csv('filtered_L232479_bird_data.csv')

# List of non-species values (genus and family names)
non_species = [
    "Aythya",
    "Anatidae",
    "Passerellidae",
    "Phalacrocoracidae",
    "Aves",
    "Passeriformes",
    "Rallus limicola limicola",
    "Cyanocitta stelleri",
    "Scolopacidae",
    "Spinus",
    "Corvus",
    "Podiceps auritus",
    "Haliaeetus leucocephalus washingtoniensis",
    "Anas crecca carolinensis",
    "Colaptes auratus luteus × cafer"
]
# Remove rows where 'Species' column matches any of the non-species values
df_cleaned = df[~df['Species'].isin(non_species)]

# Save the cleaned DataFrame back to a CSV file
df_cleaned.to_csv('English_species_file_L232479.csv', index=False)