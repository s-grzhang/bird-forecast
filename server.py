from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
from datetime import datetime, timedelta
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# eBird API configuration
EBIRD_API_KEY = 'fnqq0qvc0dc1'
EBIRD_BASE_URL = 'https://api.ebird.org/v2'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/birds')
def birds():
    return render_template('birds.html')

@app.route('/forecast')
def forecast():
    return render_template('forecast.html')

@app.route('/submit')
def submit():
    return render_template('submit.html')

@app.route('/calendar')
def calendar():
    return render_template('calendar.html')

@app.route('/hotspots')
def hotspots():
    return render_template('hotspots.html')

@app.route('/api/bird-forecast', methods=['POST'])
def bird_forecast():
    try:
        data = request.json
        region_code = data.get('region_code')
        date = data.get('date')
        if not region_code or not date:
            return jsonify({'error': 'Missing required parameters'}), 400
        selected_date = datetime.strptime(date, '%Y-%m-%d')
        start_date = selected_date - timedelta(days=7)
        end_date = selected_date + timedelta(days=7)
        url = f'{EBIRD_BASE_URL}/data/obs/{region_code}/recent'
        headers = {'X-eBirdApiToken': EBIRD_API_KEY}
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return jsonify({'error': f'eBird API error: {response.status_code}'}), response.status_code
        ebird_data = response.json()
        filtered_data = []
        for obs in ebird_data:
            try:
                obs_date = datetime.strptime(obs['obsDt'], '%Y-%m-%d %H:%M')
                if start_date <= obs_date <= end_date:
                    filtered_data.append(obs)
            except ValueError:
                continue
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
        for species in bird_details:
            bird_details[species]['avg_count'] = round(
                bird_details[species]['total_count'] / bird_counts[species]
            )
            bird_details[species]['locations'] = list(bird_details[species]['locations'])
        sorted_birds = sorted(bird_counts.keys(), key=lambda x: bird_counts[x], reverse=True)
        result = {
            'birds': sorted_birds[:20],
            'counts': bird_counts,
            'details': bird_details
        }
        return jsonify(result)
    except Exception as e:
        print(f"Error in bird forecast: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/health')
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    print("Starting Bird Forecast Server...")
    app.run(debug=True) 