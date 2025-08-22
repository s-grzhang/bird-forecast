from flask import Flask, request, jsonify, send_from_directory, render_template
import requests
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import json
from config import config
from security import (
    add_security_headers, rate_limit, validate_input, 
    sanitize_string, validate_location, validate_date, 
    validate_time, log_security_event
)

# Load environment variables
load_dotenv()

def create_app(config_name=None):
    """Application factory pattern with security configuration"""
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'default')
    
    app = Flask(__name__, 
                template_folder='templates',
                static_folder='static')
    app.config.from_object(config[config_name])
    
    # Validate configuration
    try:
        app.config.from_object(config[config_name])
        config[config_name].validate_config()
    except ValueError as e:
        print(f"Configuration error: {e}")
        return None
    
    # Apply security headers to all responses
    app.after_request(add_security_headers)
    
    return app

app = create_app()

if app is None:
    print("Failed to create application due to configuration errors")
    exit(1)

# Use configuration instead of direct environment variables
EBIRD_API_KEY = app.config['EBIRD_API_KEY']
EBIRD_BASE_URL = app.config['EBIRD_BASE_URL']

# Location coordinates mapping (King County, WA)
LOCATION_COORDS = {
    'Union Bay': {'lat': 47.6619, 'lng': -122.2989},
    'Discovery Park': {'lat': 47.6597, 'lng': -122.4075},
    'Magnuson Park': {'lat': 47.6806, 'lng': -122.2547},
    'Marymoor Park': {'lat': 47.6806, 'lng': -122.1208},
    'Juanita Bay Park': {'lat': 47.6806, 'lng': -122.2075},
    'Carkeek Park': {'lat': 47.7133, 'lng': -122.3747},
    'Lake Sammamish State Park': {'lat': 47.5806, 'lng': -122.0808},
    'Kent Ponds': {'lat': 47.3806, 'lng': -122.2075},
    'Alki Beach': {'lat': 47.5806, 'lng': -122.4075}
}

def get_ebird_headers():
    """Get headers for eBird API requests"""
    return {
        'X-eBirdApiToken': EBIRD_API_KEY,
        'Content-Type': 'application/json'
    }

def get_ebird_recent_observations(lat, lng, radius_km=10):
    """Get recent observations from eBird API"""
    try:
        # eBird API endpoint for recent observations
        url = f"{EBIRD_BASE_URL}/data/obs/geo/recent"
        
        params = {
            'lat': lat,
            'lng': lng,
            'dist': radius_km,
            'back': 7,  # Get observations from last 7 days
            'fmt': 'json'
        }
        
        response = requests.get(url, headers=get_ebird_headers(), params=params, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            log_security_event("API_ERROR", f"eBird API error: {response.status_code}")
            return []
            
    except requests.exceptions.Timeout:
        log_security_event("API_TIMEOUT", "eBird API request timed out")
        return []
    except Exception as e:
        log_security_event("API_EXCEPTION", f"Error fetching eBird data: {str(e)}")
        return []

def get_ebird_species_info(species_code):
    """Get species information from eBird API"""
    try:
        # Sanitize species code input
        sanitized_code = sanitize_string(species_code)
        
        return {
            'speciesCode': sanitized_code,
            'comName': sanitized_code,  # Use code as fallback
            'sciName': sanitized_code
        }
        
    except Exception as e:
        log_security_event("SPECIES_INFO_ERROR", f"Error getting species info: {str(e)}")
        return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/forecast')
def forecast_page():
    return render_template('forecast.html')

@app.route('/submit')
def submit_page():
    return render_template('submit.html')

@app.route('/calendar')
def calendar_page():
    return render_template('calendar.html')

@app.route('/hotspots')
def hotspots_page():
    return render_template('hotspots.html')

@app.route('/birds')
def birds_page():
    return render_template('birds.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'images/logo.png')

@app.route('/static/images/<path:filename>')
def serve_images(filename):
    """Serve images from static/images directory"""
    try:
        # Handle URL-encoded filenames (spaces, special characters)
        import urllib.parse
        decoded_filename = urllib.parse.unquote(filename)
        return send_from_directory('static/images', decoded_filename)
    except Exception as e:
        log_security_event("IMAGE_SERVING_ERROR", f"Error serving image {filename}: {str(e)}")
        return jsonify({'error': 'Image not found'}), 404

@app.route('/sounds/<path:filename>')
def serve_sounds(filename):
    """Serve sound files from static/sounds directory"""
    try:
        # Handle URL-encoded filenames (spaces, special characters)
        import urllib.parse
        decoded_filename = urllib.parse.unquote(filename)
        return send_from_directory('static/sounds', decoded_filename)
    except Exception as e:
        log_security_event("SOUND_SERVING_ERROR", f"Error serving sound {filename}: {str(e)}")
        return jsonify({'error': 'Sound file not found'}), 404

@app.route('/<path:filename>')
def serve_static(filename):
    # Validate filename to prevent directory traversal attacks
    if '..' in filename or filename.startswith('/'):
        log_security_event("PATH_TRAVERSAL_ATTEMPT", f"Attempted path traversal: {filename}")
        return jsonify({'error': 'Invalid filename'}), 400
    
    # Handle API routes
    if filename.startswith('api/'):
        # Let Flask handle API routes normally
        return jsonify({'error': 'API endpoint not found'}), 404
    
    # Only serve allowed file types
    allowed_extensions = {'.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.mp3', '.wav', '.ogg', '.m4a'}
    if not any(filename.lower().endswith(ext) for ext in allowed_extensions):
        log_security_event("INVALID_FILE_TYPE", f"Attempted to access: {filename}")
        return jsonify({'error': 'File type not allowed'}), 400
    
    # Serve HTML files from templates, other files from static
    if filename.endswith('.html'):
        return send_from_directory('templates', filename)
    else:
        # Handle URL-encoded filenames (spaces, special characters)
        try:
            import urllib.parse
            decoded_filename = urllib.parse.unquote(filename)
            return send_from_directory('static', decoded_filename)
        except Exception as e:
            log_security_event("FILE_SERVING_ERROR", f"Error serving file {filename}: {str(e)}")
            return jsonify({'error': 'File not found'}), 404

@app.route('/api/forecast', methods=['POST'])
@rate_limit
def forecast():
    try:
        # Validate content type
        if not request.is_json:
            log_security_event("INVALID_CONTENT_TYPE", "Non-JSON request to forecast endpoint")
            return jsonify({'error': 'Content-Type must be application/json'}), 400
        
        data = request.get_json()
        
        # Input validation
        is_valid, error_msg = validate_input(
            data, 
            required_fields=['location', 'date', 'time'],
            allowed_values={'location': list(LOCATION_COORDS.keys())}
        )
        
        if not is_valid:
            log_security_event("VALIDATION_ERROR", f"Input validation failed: {error_msg}")
            return jsonify({'error': error_msg}), 400
        
        # Additional validation
        location = sanitize_string(data['location'])
        date_str = sanitize_string(data['date'])
        time_str = sanitize_string(data['time'])
        
        if not validate_location(location):
            log_security_event("INVALID_LOCATION", f"Invalid location: {location}")
            return jsonify({'error': 'Invalid location'}), 400
        
        if not validate_date(date_str):
            log_security_event("INVALID_DATE", f"Invalid date format: {date_str}")
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
        
        if not validate_time(time_str):
            log_security_event("INVALID_TIME", f"Invalid time format: {time_str}")
            return jsonify({'error': 'Invalid time format. Use HH:MM'}), 400
        
        # Get coordinates for the location
        coords = LOCATION_COORDS[location]
        
        # Get recent eBird observations
        birds = []
        recent_observations = get_ebird_recent_observations(
            coords['lat'], coords['lng']
        )
        
        # Process recent observations
        for obs in recent_observations[:15]:  # Top 15 recent species
            species_code = obs.get('speciesCode', '')
            com_name = obs.get('comName', species_code)
            sci_name = obs.get('sciName', species_code)
            obs_date = obs.get('obsDt', 'unknown date')
            count = obs.get('howMany', 1)
            
            # Sanitize all string inputs
            birds.append({
                'common_name': sanitize_string(com_name),
                'scientific_name': sanitize_string(sci_name),
                'confidence': 0.9,  # High confidence for recent sightings
                'count': min(count, 1000),  # Limit count to prevent abuse
                'description': sanitize_string(f"Recently observed in this area on {obs_date}. Count: {count} birds.")
            })
        
        # Sort by count (more birds = higher priority)
        birds.sort(key=lambda x: x['count'], reverse=True)
        top_birds = birds[:10]
        
        return jsonify({
            'birds': top_birds,
            'location': location,
            'date': date_str,
            'time': time_str,
            'total_species': len(top_birds)
        })
        
    except Exception as e:
        log_security_event("FORECAST_ERROR", f"Unexpected error in forecast endpoint: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/config')
def get_config():
    """Return configuration for frontend (excluding sensitive data)"""
    return jsonify({
        'ebird_api_key': EBIRD_API_KEY if EBIRD_API_KEY else None,
        'ebird_base_url': EBIRD_BASE_URL
    })

@app.route('/test')
def test():
    """Simple test route to verify routing is working"""
    return jsonify({'message': 'Test route working!', 'timestamp': str(datetime.now())})

@app.route('/api/firebase-config')
def get_firebase_config():
    """Return Firebase configuration for frontend"""
    # Debug: Print all environment variables
    print("=== Firebase Environment Variables Debug ===")
    print(f"FIREBASE_API_KEY: {os.getenv('FIREBASE_API_KEY')}")
    print(f"FIREBASE_AUTH_DOMAIN: {os.getenv('FIREBASE_AUTH_DOMAIN')}")
    print(f"FIREBASE_PROJECT_ID: {os.getenv('FIREBASE_PROJECT_ID')}")
    print(f"FIREBASE_STORAGE_BUCKET: {os.getenv('FIREBASE_STORAGE_BUCKET')}")
    print(f"FIREBASE_MESSAGING_SENDER_ID: {os.getenv('FIREBASE_MESSAGING_SENDER_ID')}")
    print(f"FIREBASE_APP_ID: {os.getenv('FIREBASE_APP_ID')}")
    print(f"FIREBASE_MEASUREMENT_ID: {os.getenv('FIREBASE_MEASUREMENT_ID')}")
    print("==========================================")
    
    firebase_config = {
        'apiKey': os.getenv('FIREBASE_API_KEY'),  # Changed from GOOGLE_MAPS_API_KEY
        'authDomain': os.getenv('FIREBASE_AUTH_DOMAIN'),
        'projectId': os.getenv('FIREBASE_PROJECT_ID'),
        'storageBucket': os.getenv('FIREBASE_STORAGE_BUCKET'),
        'messagingSenderId': os.getenv('FIREBASE_MESSAGING_SENDER_ID'),
        'appId': os.getenv('FIREBASE_APP_ID'),
        'measurementId': os.getenv('FIREBASE_MEASUREMENT_ID')
    }
    
    # Check if essential Firebase config is present (don't require all fields)
    essential_fields = ['apiKey', 'projectId', 'authDomain']
    missing_essential = [field for field in essential_fields if not firebase_config[field]]
    
    if missing_essential:
        print(f"Warning: Missing essential Firebase config: {missing_essential}")
        # Return partial config instead of error
        partial_config = {k: v for k, v in firebase_config.items() if v}
        print(f"Returning partial config: {partial_config}")
        return jsonify(partial_config)
    
    print(f"Returning full Firebase config: {firebase_config}")
    return jsonify(firebase_config)

@app.route('/api/common-birds')
def get_common_birds():
    """Return common birds for the current month"""
    try:
        # Get current month's date range
        now = datetime.now()
        start_of_month = now.replace(day=1)
        if now.month == 12:
            end_of_month = now.replace(year=now.year + 1, month=1, day=1) - timedelta(days=1)
        else:
            end_of_month = now.replace(month=now.month + 1, day=1) - timedelta(days=1)
        
        # For now, return a sample list of common birds
        # In a real implementation, you'd fetch this from eBird API
        common_birds = [
            {'name': 'American Robin', 'count': 45, 'image': '/static/images/American%20Robin.png'},
            {'name': 'American Crow', 'count': 32, 'image': '/static/images/American%20Crow.png'},
            {'name': 'Northern Shoveler', 'count': 28, 'image': '/static/images/Northern%20Shoveler.png'},
            {'name': 'Pine Siskin', 'count': 25, 'image': '/static/images/Pine%20Siskin.png'},
            {'name': 'Chestnut-backed Chickadee', 'count': 22, 'image': '/static/images/Chestnut-backed%20Chickadee.png'},
            {'name': 'American Coot', 'count': 20, 'image': '/static/images/American%20Coot.png'},
            {'name': 'Steller\'s Jay', 'count': 18, 'image': '/static/images/Steller\'s%20Jay.png'},
            {'name': 'California Gull', 'count': 15, 'image': '/static/images/California%20Gull.png'}
        ]
        
        return jsonify({
            'birds': common_birds,
            'month': now.strftime('%B %Y'),
            'total_species': len(common_birds)
        })
        
    except Exception as e:
        log_security_event("COMMON_BIRDS_ERROR", f"Error getting common birds: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({'error': 'Method not allowed'}), 405

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Security: Don't run in debug mode in production
    debug_mode = app.config.get('DEBUG', False)
    host = app.config.get('HOST', '0.0.0.0')
    port = app.config.get('PORT', 8080)
    
    print(f"Starting Bird Forecast application...")
    print(f"Environment: {os.getenv('FLASK_ENV', 'development')}")
    print(f"Debug mode: {debug_mode}")
    print(f"Host: {host}")
    print(f"Port: {port}")
    
    app.run(debug=debug_mode, host=host, port=port) 