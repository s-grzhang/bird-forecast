from bird_ai import BirdModel
import sys

def main():
    print("Starting model training...")
    try:
        ai = BirdModel()
        # Assuming data is in the current directory or specify path
        ai.train(data_dir='.') 
        print("Model trained successfully.")
    except Exception as e:
        print(f"Training failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
