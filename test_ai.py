from bird_ai import BirdModel
from datetime import datetime

def test_model():
    print("Loading model...")
    ai = BirdModel()
    
    if not ai.load():
        print("ERROR: Model not found. Please run train_model.py first.")
        return
    
    print("Model loaded successfully!")
    print(f"Feature columns: {len(ai.feature_columns)}")
    print(f"Locations: {ai.locations}")
    
    # Test prediction for Lake Sammamish State Park in summer
    test_date = datetime(2025, 7, 15)
    region_code = "L321969"
    
    print(f"\nTesting prediction for {test_date.strftime('%Y-%m-%d')} at {region_code}...")
    predictions = ai.predict(test_date, region_code, top_k=10)
    
    print("\nTop 10 predicted birds:")
    for i, pred in enumerate(predictions, 1):
        print(f"{i}. {pred['name']}: {pred['score']:.4f}")

if __name__ == "__main__":
    test_model()
