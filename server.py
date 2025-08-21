from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import requests
from datetime import datetime, timedelta
import os
import calendar

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Add explicit static file serving for subdirectories
@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory('static/images', filename)

@app.route('/sounds/<path:filename>')
def serve_sounds(filename):
    return send_from_directory('static/sounds', filename)

# eBird API configuration
EBIRD_API_KEY = os.getenv('EBIRD_API_KEY')
if not EBIRD_API_KEY:
    raise ValueError("EBIRD_API_KEY environment variable is required. Please set it in your .env file.")
EBIRD_BASE_URL = 'https://api.ebird.org/v2'

# King County region code
KING_COUNTY_REGION = 'US-WA-033'

# Bird name to image mapping
BIRD_IMAGE_MAPPING = {
    # New downloaded images
    'American Crow': 'American Crow.png',
    'American Robin': 'American Robin.png',
    'Northern Shoveler': 'Northern Shoveler.png',
    'Pine Siskin': 'Pine Siskin.png',
    'Chestnut-backed Chickadee': 'Chestnut-backed Chickadee.png',
    'American Coot': 'American Coot.png',
    'California Gull': 'California Gull.png',
    'Western Grebe': 'Western Grebe.png',
    'Steller\'s Jay': 'Steller\'s Jay.png',
    'Western Bluebird': 'Western Bluebird.jpg',
    'Bluebird': 'Bluebird.png',
    'Duck': 'Duck.png',
    'Waxwing': 'waxwing.jpg',
    'Mallard': 'Mallard.jpg',
    'Wood Duck': 'Wood Duck.jpg',
    'Great Blue Heron': 'great blue heron.jpg',
    'Great Horned Owl': 'great-horned owl.jpg',
    'Barred Owl': 'Barred owl.jpg',
    'Glaucous-winged Gull': 'Glaucous-winged Gull.jpg',
    'Caspian Tern': 'Caspian Tern.jpg',
    'Vaux\'s Swift': 'Vaux\'s Swift.jpg',
    'Western Wood-Pewee': 'western wood pewee.jpg',
    'Pied-billed Grebe': 'Pied-billed Grebe.jpg',
    'Canada Goose': 'Canada Goose.jpg',
    'Common Nighthawk': 'Common Nighthawk.jpg',
    'Barn Owl': 'Barn Owl.jpg',
    
    # Images from subfolders (using Learn folder images)
    'European Starling': 'European Starling/Learn/Breeding Adult European Starling.jpg',
    'Common Starling': 'European Starling/Learn/Breeding Adult European Starling.jpg',
    'House Finch': 'House Finch/Learn/House Finch.jpg',
    'Dark-eyed Junco': 'Dark-eyed Junco/Learn/52901081636_1b2b4426dd_b.jpg',
    'Song Sparrow': 'Song-Sparrow/Learn/Song Sparrow PNW.jpg',
    'Spotted Towhee': 'Spotted Towhee/Learn/spotted towhee.jpg',
    'Anna\'s Hummingbird': 'Anna-Hummingbird/Learn/F Anna\'s Hummingbird.jpg',
    'Bewick\'s Wren': 'Bewick-Wren/Learn/Bewick\'s Wren.jpg',
    'Northern Flicker': 'Northern Flicker/Learn/Northern Flicker.jpg',
    'Black-capped Chickadee': 'Black-capped Chickadee/Learn/Black-capped Chickadee.jpg',
    
    # Fallbacks for any other birds
    'default': 'Bluebird.png'
}

def get_common_birds_this_month():
    """Fetch common birds for the current month from eBird"""
    try:
        # Get current month's date range
        now = datetime.now()
        start_of_month = now.replace(day=1)
        if now.month == 12:
            end_of_month = now.replace(year=now.year + 1, month=1, day=1) - timedelta(days=1)
        else:
            end_of_month = now.replace(month=now.month + 1, day=1) - timedelta(days=1)
        
        # Format dates for eBird API
        start_date = start_of_month.strftime('%Y-%m-%d')
        end_date = end_of_month.strftime('%Y-%m-%d')
        
        # Fetch data from eBird API for King County
        url = f'{EBIRD_BASE_URL}/data/obs/{KING_COUNTY_REGION}/recent'
        headers = {'X-eBirdApiToken': EBIRD_API_KEY}
        response = requests.get(url, headers=headers)
        
        if response.status_code != 200:
            print(f"eBird API error: {response.status_code}")
            return get_fallback_birds()
        
        ebird_data = response.json()
        
        # Filter observations for current month
        filtered_data = []
        for obs in ebird_data:
            try:
                obs_date = datetime.strptime(obs['obsDt'], '%Y-%m-%d %H:%M')
                if start_of_month <= obs_date <= end_of_month:
                    filtered_data.append(obs)
            except ValueError:
                continue
        
        # Count bird species
        bird_counts = {}
        for obs in filtered_data:
            species = obs.get('comName')
            if species:
                bird_counts[species] = bird_counts.get(species, 0) + 1
        
        # Sort by frequency and get top birds
        sorted_birds = sorted(bird_counts.items(), key=lambda x: x[1], reverse=True)
        
        # Get top 7 birds that have images
        common_birds = []
        for species, count in sorted_birds:
            if len(common_birds) < 7:
                # Use mapping if available, otherwise use fallback
                image = BIRD_IMAGE_MAPPING.get(species, BIRD_IMAGE_MAPPING.get('default', 'Bluebird.png'))
                common_birds.append({
                    'name': species,
                    'count': count,
                    'image': image
                })
        
        return common_birds
        
    except Exception as e:
        print(f"Error fetching common birds: {str(e)}")
        return get_fallback_birds()

def get_fallback_birds():
    """Return fallback birds if API fails"""
    return [
        {'name': 'American Crow', 'count': 0, 'image': 'American Crow.png'},
        {'name': 'American Robin', 'count': 0, 'image': 'American Robin.png'},
        {'name': 'Mallard', 'count': 0, 'image': 'Mallard.jpg'},
        {'name': 'Great Blue Heron', 'count': 0, 'image': 'great blue heron.jpg'},
        {'name': 'California Gull', 'count': 0, 'image': 'California Gull.png'},
        {'name': 'Western Grebe', 'count': 0, 'image': 'Western Grebe.png'},
        {'name': 'Steller\'s Jay', 'count': 0, 'image': 'Steller\'s Jay.png'}
    ]

@app.route('/')
def index():
    # Get common birds for current month
    common_birds = get_common_birds_this_month()
    current_month = datetime.now().strftime('%B %Y')
    return render_template('index.html', common_birds=common_birds, current_month=current_month)

@app.route('/api/common-birds')
def api_common_birds():
    """API endpoint to get common birds for current month"""
    try:
        common_birds = get_common_birds_this_month()
        current_month = datetime.now().strftime('%B %Y')
        return jsonify({
            'birds': common_birds,
            'month': current_month
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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
    app.run(debug=False, host='0.0.0.0', port=5000) 