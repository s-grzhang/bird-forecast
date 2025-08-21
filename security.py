import re
from functools import wraps
from flask import request, jsonify, current_app
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def add_security_headers(response):
    """Add security headers to all responses"""
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
    return response

def sanitize_string(input_string, max_length=100):
    """Sanitize string input to prevent injection attacks"""
    if not isinstance(input_string, str):
        return ""
    
    # Remove potentially dangerous characters
    sanitized = re.sub(r'[<>"\']', '', input_string)
    
    # Limit length
    if len(sanitized) > max_length:
        sanitized = sanitized[:max_length]
    
    return sanitized.strip()

def validate_location(location):
    """Validate location input"""
    allowed_locations = {
        'Union Bay', 'Discovery Park', 'Magnuson Park', 'Marymoor Park',
        'Juanita Bay Park', 'Carkeek Park', 'Lake Sammamish State Park',
        'Kent Ponds', 'Alki Beach'
    }
    return location in allowed_locations

def validate_date(date_str):
    """Validate date format (YYYY-MM-DD)"""
    import datetime
    try:
        datetime.datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except ValueError:
        return False

def validate_time(time_str):
    """Validate time format (HH:MM)"""
    import datetime
    try:
        datetime.datetime.strptime(time_str, '%H:%M')
        return True
    except ValueError:
        return False

def rate_limit(f):
    """Simple rate limiting decorator"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Simple IP-based rate limiting
        client_ip = request.remote_addr
        
        # You can implement more sophisticated rate limiting here
        # For now, just log the request
        logger.info(f"Request from {client_ip} to {request.endpoint}")
        
        return f(*args, **kwargs)
    return decorated_function

def log_security_event(event_type, message):
    """Log security-related events"""
    logger.warning(f"SECURITY_EVENT [{event_type}]: {message}")

def validate_input(data, required_fields, allowed_values=None):
    """Validate input data"""
    # Check required fields
    for field in required_fields:
        if field not in data or not data[field]:
            return False, f"Missing required field: {field}"
    
    # Check allowed values if specified
    if allowed_values:
        for field, allowed_list in allowed_values.items():
            if field in data and data[field] not in allowed_list:
                return False, f"Invalid value for {field}: {data[field]}"
    
    return True, ""