import pandas as pd
scientific_to_common = {
    "Bucephala clangula": "Common Goldeneye",
    "Haliaeetus leucocephalus": "Bald Eagle",
    "Corvus brachyrhynchos": "American Crow",
    "Regulus satrapa": "Golden-crowned Kinglet",
    "Melospiza melodia": "Song Sparrow",
    "Anas platyrhynchos": "Mallard",
    "Melanitta perspicillata": "Surf Scoter",
    "Bucephala albeola": "Bufflehead",
    "Patagioenas fasciata": "Band-tailed Pigeon",
    "Charadrius vociferus": "Killdeer",
    "Larus glaucescens": "Glaucous-winged Gull",
    "Podiceps auritus": "Horned Grebe",
    "Nannopterum auritum": "Double-crested Cormorant",
    "Dryobates villosus": "Hairy Woodpecker",
    "Colaptes auratus": "Northern Flicker",
    "Corthylio calendula": "Ruby-crowned Kinglet",
    "Troglodytes pacificus": "Pacific Wren",
    "Thryomanes bewickii": "Bewick's Wren",
    "Junco hyemalis": "Dark-eyed Junco",
    "Melanitta deglandi": "Black Scoter",
    "Bucephala islandica": "Barrow's Goldeneye",
    "Mergus merganser": "Common Merganser",
    "Mergus serrator": "Red-breasted Merganser",
    "Calypte anna": "Anna's Hummingbird",
    "Ardea herodias": "Great Blue Heron",
    "Megaceryle alcyon": "Belted Kingfisher",
    "Dryobates pubescens": "Downy Woodpecker",
    "Dryocopus pileatus": "Pileated Woodpecker",
    "Poecile atricapillus": "Black-capped Chickadee",
    "Poecile rufescens": "Chestnut-backed Chickadee",
    "Certhia americana": "Brown Creeper",
    "Spinus pinus": "Pine Siskin",
    "Zonotrichia atricapilla": "Golden-crowned Sparrow",
    "Psaltriparus minimus": "Bushtit",
    "Pipilo maculatus": "Spotted Towhee",
    "Cinclus mexicanus": "American Dipper",
    "Haemorhous mexicanus": "House Finch",
    "Branta hutchinsii": "Brant",
    "Cerorhinca monocerata": "Rhinoceros Auklet",
    "Larus brachyrhynchus": "Short-billed Gull",
    "Larus californicus": "California Gull",
    "Larus glaucoides": "Iceland Gull",
    "Podiceps grisegena": "Red-necked Grebe",
    "Aechmophorus occidentalis": "Western Grebe",
    "Gavia stellata": "Red-throated Loon",
    "Turdus migratorius": "American Robin",
    "Setophaga townsendi": "Townsend's Warbler",
    "Uria aalge": "Common Murre",
    "Gavia pacifica": "Pacific Loon",
    "Corvus corax": "Common Raven",
    "Sitta canadensis": "Red-breasted Nuthatch",
    "Passerella iliaca": "Fox Sparrow",
    "Setophaga coronata": "Yellow-rumped Warbler",
    "Mareca americana": "American Wigeon",
    "Histrionicus histrionicus": "Harlequin Duck",
    "Columba livia domestica": "Rock Pigeon",
    "Ixoreus naevius": "Varied Thrush",
    "Haemorhous purpureus": "Purple Finch",
    "Leiothlypis celata": "Orange-crowned Warbler",
    "Melanitta fusca": "White-winged Scoter",
    "Cyanocitta stelleri": "Steller's Jay",
    "Catharus guttatus": "Hermit Thrush",
    "Gavia immer": "Common Loon",
    "Aythya marila": "Greater Scaup",
    "Nannopterum pelagicum": "Pelagic Cormorant",
    "Sphyrapicus ruber": "Red-breasted Sapsucker",
    "Cepphus columba": "Pigeon Guillemot",
    "Brandt's Cormorant": "Brandt's Cormorant"
}


# Load CSV into pandas DataFrame
file = 'English_species_file_L269461.csv'  # Replace with your CSV file path
df = pd.read_csv(file)

# Check if 'Species' column exists
if 'Species' in df.columns:
    # Replace scientific names with common names
    df['Species'] = df['Species'].map(scientific_to_common).fillna(df['Species'])
else:
    print("Warning: 'Species' column not found in the CSV file")

# Save the updated DataFrame to a new CSV
output_file = 'English_common_species_file_L269461.csv'
df.to_csv(output_file, index=False)
print(f"Updated file saved as {output_file}")