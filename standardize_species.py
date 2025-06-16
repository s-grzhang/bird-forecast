import pandas as pd
import re
from collections import defaultdict

def clean_species_name(name):
    """
    Clean and standardize a species name:
    1. Strip whitespace
    2. Fix capitalization (first letter of each word)
    3. Handle special characters
    """
    if pd.isna(name):
        return name
    
    # Strip whitespace and convert to title case
    name = name.strip()
    
    # Split on whitespace and hyphens, keeping hyphens
    words = re.split(r'([-\s]+)', name)
    
    # Capitalize first letter of each word, except articles and prepositions
    lowercase_words = {'and', 'or', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'}
    result = []
    for i, word in enumerate(words):
        if word.strip() and (i == 0 or word.lower() not in lowercase_words):
            result.append(word.capitalize())
        else:
            result.append(word.lower())
    
    return ''.join(result)

def find_similar_names(names):
    """
    Group similar names together using basic string similarity
    Returns a dictionary mapping variant spellings to their most common form
    """
    name_counts = defaultdict(int)
    for name in names:
        if pd.isna(name):
            continue
        name_counts[name] += 1
    
    # For each name, find if it's a variant of a more common name
    standardized_names = {}
    for name in names:
        if pd.isna(name):
            continue
            
        # Compare with other names
        max_count = name_counts[name]
        standard_name = name
        
        # Check for case-insensitive matches
        for other_name, count in name_counts.items():
            if other_name.lower() == name.lower() and count > max_count:
                max_count = count
                standard_name = other_name
        
        standardized_names[name] = standard_name
    
    return standardized_names

def standardize_species_files():
    """
    Process all English common species files to standardize species names
    """
    # List all English common species files
    import glob
    files = glob.glob('English_common_species_file_L351484.csv')
    
    if not files:
        print("No English common species files found!")
        return
    
    # First pass: collect all unique species names and their variants
    all_species = set()
    for file in files:
        df = pd.read_csv(file)
        if 'Species' in df.columns:
            species_names = df['Species'].dropna().unique()
            all_species.update(species_names)
    
    # Clean all species names
    cleaned_names = {name: clean_species_name(name) for name in all_species if pd.notna(name)}
    
    # Find similar names and create standardization mapping
    standardized_names = find_similar_names(list(cleaned_names.values()))
    
    # Create final mapping combining cleaning and standardization
    final_mapping = {name: standardized_names[cleaned_names[name]] 
                    for name in all_species 
                    if pd.notna(name)}
    
    # Process each file
    for file in files:
        print(f"Processing {file}...")
        df = pd.read_csv(file)
        
        if 'Species' not in df.columns:
            print(f"Warning: No 'Species' column in {file}")
            continue
        
        # Create backup of original file
        backup_file = file.replace('.csv', '_backup.csv')
        df.to_csv(backup_file, index=False)
        print(f"Created backup: {backup_file}")
        
        # Apply standardization
        original_species = df['Species'].copy()
        df['Species'] = df['Species'].map(lambda x: final_mapping.get(x, x) if pd.notna(x) else x)
        
        # Report changes
        changes = sum(original_species != df['Species'])
        print(f"Made {changes} standardization changes")
        
        # Save standardized file
        df.to_csv(file, index=False)
        print(f"Saved standardized version of {file}")
        
        # Report specific changes
        if changes > 0:
            print("\nExample changes:")
            changed_mask = original_species != df['Species']
            examples = pd.DataFrame({
                'Original': original_species[changed_mask],
                'Standardized': df['Species'][changed_mask]
            }).drop_duplicates().head()
            print(examples.to_string())
            print()

if __name__ == "__main__":
    standardize_species_files() 