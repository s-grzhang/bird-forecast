from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from datetime import datetime, timedelta
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# eBird API configuration
EBIRD_API_KEY = 'fnqq0qvc0dc1'
EBIRD_BASE_URL = 'https://api.ebird.org/v2'

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/bird-forecast', methods=['POST'])
def bird_forecast():
    try:
        data = request.json
        region_code = data.get('region_code')
        date = data.get('date')
        
        if not region_code or not date:
            return jsonify({'error': 'Missing required parameters'}), 400
        
        # Calculate date range (7 days before and after the selected date)
        selected_date = datetime.strptime(date, '%Y-%m-%d')
        start_date = selected_date - timedelta(days=7)
        end_date = selected_date + timedelta(days=7)
        
        # Make API call to eBird
        url = f'{EBIRD_BASE_URL}/data/obs/{region_code}/recent'
        headers = {
            'X-eBirdApiToken': EBIRD_API_KEY
        }
        
        response = requests.get(url, headers=headers)
        
        if response.status_code != 200:
            return jsonify({'error': f'eBird API error: {response.status_code}'}), response.status_code
        
        ebird_data = response.json()
        
        # Filter data by date range
        filtered_data = []
        for obs in ebird_data:
            try:
                obs_date = datetime.strptime(obs['obsDt'], '%Y-%m-%d %H:%M')
                if start_date <= obs_date <= end_date:
                    filtered_data.append(obs)
            except ValueError:
                # Skip observations with invalid date format
                continue
        
        # Process the data
        bird_counts = {}
        bird_details = {}
        
        for obs in filtered_data:
            species = obs.get('comName')
            if not species:
                continue
                
            if species not in bird_counts:
                bird_counts[species] = 0
                bird_details[species] = {
                    'locations': set(),
                    'total_count': 0,
                    'avg_count': 0
                }
            
            bird_counts[species] += 1
            bird_details[species]['locations'].add(obs.get('locName', 'Unknown'))
            bird_details[species]['total_count'] += obs.get('howMany', 1)
        
        # Calculate averages and convert sets to lists
        for species in bird_details:
            bird_details[species]['avg_count'] = round(
                bird_details[species]['total_count'] / bird_counts[species]
            )
            bird_details[species]['locations'] = list(bird_details[species]['locations'])
        
        # Sort by frequency
        sorted_birds = sorted(bird_counts.keys(), key=lambda x: bird_counts[x], reverse=True)
        
        result = {
            'birds': sorted_birds[:20],  # Top 20 most common birds
            'counts': bird_counts,
            'details': bird_details
        }
        
        return jsonify(result)
        
    except Exception as e:
        print(f"Error in bird forecast: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/health')
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    # Serve static files from current directory
    app.static_folder = '.'
    app.static_url_path = ''
    
    print("Starting Bird Forecast Server...")
    print("Server will be available at: http://localhost:5000")
    print("Forecast API endpoint: http://localhost:5000/api/bird-forecast")
    
    app.run(debug=True, host='0.0.0.0', port=5000) 