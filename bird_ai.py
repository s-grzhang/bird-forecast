import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer
import joblib
import os
from datetime import datetime
import glob

class BirdModel:
    def __init__(self, model_path='bird_model.pkl'):
        self.model_path = model_path
        self.model = None
        self.mlb = None
        self.locations = []
        
    def load_data(self, data_dir='.'):
        """
        Load all *_bird_data.csv files from the directory.
        Assumes CSV format: Species,Location,Latitude,Longitude,Observation Date
        Extracts RegionCode from filename (e.g., L128530_bird_data.csv -> L128530)
        """
        all_files = glob.glob(os.path.join(data_dir, '*_bird_data.csv'))
        df_list = []
        
        for filename in all_files:
            try:
                # Read CSV
                df = pd.read_csv(filename)
                
                # Standardize column names
                df.columns = [c.strip() for c in df.columns]
                
                # Extract Region Code from filename
                basename = os.path.basename(filename)
                if '_bird_data.csv' in basename:
                    region_code = basename.replace('_bird_data.csv', '')
                    df['RegionCode'] = region_code
                else:
                    df['RegionCode'] = 'Unknown'
                
                if 'Observation Date' in df.columns and 'Species' in df.columns:
                    df_list.append(df)
            except Exception as e:
                print(f"Error loading {filename}: {e}")
                
        if not df_list:
            raise ValueError("No valid bird data files found.")
            
        return pd.concat(df_list, ignore_index=True)

    def preprocess(self, df):
        """
        Preprocess data for training.
        Features: Day of Year (Sin/Cos), RegionCode (One-Hot)
        """
        # Convert date to datetime with explicit format
        # Try multiple common formats
        import warnings
        warnings.filterwarnings('ignore', category=UserWarning)
        
        df['Observation Date'] = pd.to_datetime(df['Observation Date'], format='mixed', errors='coerce')
        
        # Drop rows with invalid dates
        df = df.dropna(subset=['Observation Date'])
        
        # Extract Day of Year
        df['DayOfYear'] = df['Observation Date'].dt.dayofyear
        
        # Cyclic date features
        df['Day_Sin'] = np.sin(2 * np.pi * df['DayOfYear'] / 365.0)
        df['Day_Cos'] = np.cos(2 * np.pi * df['DayOfYear'] / 365.0)
        
        # Encode RegionCode
        # We use MultiLabelBinarizer or just get_dummies? 
        # Since we need to save the encoder for prediction, let's use OneHotEncoder or manual mapping.
        # Simple approach: get_dummies and save columns.
        # Better: LabelEncoder for RegionCode if Tree-based? No, One-Hot is safer for nominal.
        # But Random Forest handles nominals okay if label encoded? Sklearn RF doesn't handle categorical natively well without encoding.
        # Let's use OneHotEncoder.
        
        # Actually, let's just use get_dummies and save the columns to ensure alignment during prediction.
        self.locations = sorted(df['RegionCode'].unique())
        
        # Create dummy variables for RegionCode
        region_dummies = pd.get_dummies(df['RegionCode'], prefix='Region')
        
        # Features
        X = pd.concat([df[['Day_Sin', 'Day_Cos']], region_dummies], axis=1)
        y = df['Species']
        
        # Save feature columns to ensure alignment
        self.feature_columns = X.columns.tolist()
        
        return X, y

    def train(self, data_dir='.'):
        print("Loading data...")
        df = self.load_data(data_dir)
        
        print(f"Loaded {len(df)} observations.")
        
        print("Preprocessing...")
        X, y = self.preprocess(df)
        
        print("Training Random Forest...")
        self.model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
        self.model.fit(X, y)
        
        print("Saving model...")
        joblib.dump({
            'model': self.model,
            'feature_columns': self.feature_columns,
            'locations': self.locations
        }, self.model_path)
        print("Training complete.")

    def load(self):
        if os.path.exists(self.model_path):
            data = joblib.load(self.model_path)
            self.model = data['model']
            self.feature_columns = data['feature_columns']
            self.locations = data.get('locations', [])
            return True
        return False

    def predict(self, date_obj, region_code, top_k=20):
        if not self.model:
            if not self.load():
                raise ValueError("Model not trained or found.")
        
        # Prepare input
        day_of_year = date_obj.timetuple().tm_yday
        day_sin = np.sin(2 * np.pi * day_of_year / 365.0)
        day_cos = np.cos(2 * np.pi * day_of_year / 365.0)
        
        # Create input dataframe with all feature columns initialized to 0
        input_data = {col: 0 for col in self.feature_columns}
        input_data['Day_Sin'] = day_sin
        input_data['Day_Cos'] = day_cos
        
        # Set the specific region bit
        region_col = f'Region_{region_code}'
        if region_col in input_data:
            input_data[region_col] = 1
        else:
            # Unknown region, maybe fallback or just 0s (generic prediction)
            pass
            
        X_pred = pd.DataFrame([input_data])
        
        # Get probabilities
        probs = self.model.predict_proba(X_pred)[0]
        species_names = self.model.classes_
        
        predictions = list(zip(species_names, probs))
        predictions.sort(key=lambda x: x[1], reverse=True)
        
        return [{'name': p[0], 'score': float(p[1])} for p in predictions[:top_k]]

if __name__ == "__main__":
    # Test run
    ai = BirdModel()
    ai.train()
