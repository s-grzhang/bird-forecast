import xgboost as xgb
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from datetime import datetime
from imblearn.over_sampling import SMOTE

# Function to parse dates in multiple formats
def parse_date(date_str):
    for fmt in ('%Y-%m-%d %H:%M', '%Y-%m-%d'):
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    print(f"Failed to parse date: {date_str}")
    return None

# Load your CSV files into a dataframe
csv_files = [
    'L257959_bird_data.csv', 'L207315_bird_data.csv', 'L162766_bird_data.csv',
    'marymoor_park.csv', 'L321969_bird_data.csv', 'L298030_bird_data.csv',
    'L269461_bird_data.csv', 'L232479_bird_data.csv', 'L128530_bird_data.csv'
]

df_list = [pd.read_csv(file) for file in csv_files]
df = pd.concat(df_list, ignore_index=True)

# Strip extra spaces from column names
df.columns = df.columns.str.strip()

# Ensure 'Observation Date' column is parsed correctly as datetime
df['Observation Date'] = pd.to_datetime(df['Observation Date'], errors='coerce')

# Check if there are any missing values after parsing
df = df.dropna(subset=['Observation Date'])  # Drop rows with invalid dates

# Feature Engineering: Extract relevant features from 'Observation Date'
df['Hour'] = df['Observation Date'].dt.hour
df['Day'] = df['Observation Date'].dt.day
df['Month'] = df['Observation Date'].dt.month
df['Year'] = df['Observation Date'].dt.year
df['Weekday'] = df['Observation Date'].dt.weekday

# Handle categorical features (Location and Species) by encoding them
df['Location'] = df['Location'].astype('category').cat.codes
df['Species'] = df['Species'].astype('category').cat.codes

# Prepare your features and labels
X = df[['Hour', 'Day', 'Month', 'Year', 'Weekday', 'Location']]  # Add 'Latitude' and 'Longitude'
y = df['Species']  # Target variable (Species)

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
smote = SMOTE(random_state=42, k_neighbors=2)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# Convert to DMatrix for XGBoost
dtrain = xgb.DMatrix(X_train_res, label=y_train_res)
dtest = xgb.DMatrix(X_test, label=y_test)

# Define hyperparameters for the model
params = {
    'objective': 'multi:softmax',  # Multi-class classification
    'num_class': len(df['Species'].unique()),  # Number of classes (species)
    'max_depth': 7,  # Maximum depth of the trees
    'eta': 0.1,  # Learning rate (step size)
    'subsample': 0.8,  # Fraction of samples to use for each tree
    'colsample_bytree': 0.8,  # Fraction of features to use for each tree
    'eval_metric': 'merror',  # Error rate metric for multi-class classification
    'seed': 42  # Random seed for reproducibility
}

# Train the XGBoost model with the given hyperparameters
num_round = 100  # Number of boosting rounds (trees)
bst = xgb.train(params, dtrain, num_round)

# Make predictions on the test set
y_pred = bst.predict(dtest)

# Convert predictions to integers (since the model outputs class probabilities)
y_pred = y_pred.astype(int)

# Evaluate the model's performance using accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy}')

# Feature importance plot (optional)
import matplotlib.pyplot as plt
xgb.plot_importance(bst)
plt.show()