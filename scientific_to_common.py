import pandas as pd
scientific_to_common = {
    "Cygnus buccinator": "Trumpeter Swan",
    "Aix sponsa": "Wood Duck",
    "Anas platyrhynchos": "Mallard",
    "Anas crecca": "Green-winged Teal",
    "Aythya collaris": "Ring-necked Duck",
    "Bucephala albeola": "Bufflehead",
    "Calypte anna": "Anna's Hummingbird",
    "Fulica americana": "American Coot",
    "Charadrius vociferus": "Killdeer",
    "Gallinago delicata": "Wilson's Snipe",
    "Nannopterum auritum": "Double-crested Cormorant",
    "Ardea herodias": "Great Blue Heron",
    "Haliaeetus leucocephalus": "Bald Eagle",
    "Dryobates pubescens": "Downy Woodpecker",
    "Poecile atricapillus": "Black-capped Chickadee",
    "Poecile rufescens": "Chestnut-backed Chickadee",
    "Regulus satrapa": "Golden-crowned Kinglet",
    "Troglodytes pacificus": "Pacific Wren",
    "Turdus migratorius": "American Robin",
    "Junco hyemalis": "Dark-eyed Junco",
    "Zonotrichia albicollis": "White-throated Sparrow",
    "Melospiza melodia": "Song Sparrow",
    "Pipilo maculatus": "Spotted Towhee",
    "Agelaius phoeniceus": "Red-winged Blackbird",
    "Mareca strepera": "Gadwall",
    "Podilymbus podiceps": "Pied-billed Grebe",
    "Corvus brachyrhynchos": "American Crow",
    "Certhia americana": "Brown Creeper",
    "Mareca americana": "American Wigeon",
    "Mergus merganser": "Common Merganser",
    "Dryocopus pileatus": "Pileated Woodpecker",
    "Corthylio calendula": "Ruby-crowned Kinglet",
    "Spinus pinus": "Pine Siskin",
    "Spinus tristis": "American Goldfinch",
    "Branta canadensis": "Canada Goose",
    "Larus canus": "Short-billed Gull",
    "Buteo jamaicensis": "Red-tailed Hawk",
    "Zonotrichia atricapilla": "Golden-crowned Sparrow",
    "Colaptes auratus": "Northern Flicker",
    "Aythya marila": "Greater Scaup",
    "Megaceryle alcyon": "Belted Kingfisher",
    "Rallus limicola": "Virginia Rail",
    "Larus glaucescens": "Glaucous-winged Gull",
    "Accipiter striatus": "Sharp-shinned Hawk",
    "Cyanocitta stelleri": "Steller's Jay",
    "Cistothorus palustris": "Marsh Wren",
    "Thryomanes bewickii": "Bewick's Wren",
    "Haemorhous mexicanus": "House Finch",
    "Bucephala clangula": "Common Goldeneye",
    "Larus delawarensis": "Ring-billed Gull",
    "Sitta canadensis": "Red-breasted Nuthatch",
    "Melospiza lincolnii": "Lincoln's Sparrow",
    "Lophodytes cucullatus": "Hooded Merganser",
    "Psaltriparus minimus": "Bushtit",
    "Haemorhous purpureus": "Purple Finch",
    "Podiceps auritus": "Horned Grebe",
    "Aythya affinis": "Lesser Scaup",
    "Corvus corax": "Common Raven",
    "Branta hutchinsii": "Cackling Goose",
    "Sturnus vulgaris": "European Starling",
    "Passerella iliaca": "Fox Sparrow",
    "Larus glaucescens × occidentalis": "Western x Glaucous-winged Gull (hybrid)",
    "Setophaga coronata": "Yellow-rumped Warbler",
    "Bombycilla cedrorum": "Cedar Waxwing",
    "Passer domesticus": "House Sparrow",
    "Zonotrichia leucophrys": "White-crowned Sparrow",
    "Dryobates villosus": "Hairy Woodpecker",
    "Aechmophorus occidentalis": "Western Grebe",
    "Ixoreus naevius": "Varied Thrush",
    "Oxyura jamaicensis": "Ruddy Duck",
    "Vireo huttoni": "Hutton's Vireo",
    "Spatula clypeata": "Northern Shoveler",
    "Larus occidentalis": "Western Gull",
    "Larus californicus": "California Gull"
}


# Load CSV into pandas DataFrame
file = 'English_species_file_L232479.csv'  # Replace with your CSV file path
df = pd.read_csv(file)

# Check if 'Species' column exists
if 'Species' in df.columns:
    # Replace scientific names with common names
    df['Species'] = df['Species'].map(scientific_to_common).fillna(df['Species'])
else:
    print("Warning: 'Species' column not found in the CSV file")

# Save the updated DataFrame to a new CSV
output_file = 'English_common_species_file_L232479.csv'
df.to_csv(output_file, index=False)
print(f"Updated file saved as {output_file}")