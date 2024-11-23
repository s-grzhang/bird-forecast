'''from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Connect to MySQL server hosted by XAMPP
db = mysql.connector.connect(
    host="192.168.122.1",           # XAMPP MySQL host
    user="root",                # Default MySQL username for XAMPP
    password="Li$aRockstar1",                # Default MySQL password (leave blank for XAMPP)
    database="kc_sightings_db"  # Your database name
)

@app.route('/get_sightings', methods=['GET'])
def get_sightings():
    date = request.args.get('date')  # Get the date from the query parameters
    cursor = db.cursor(dictionary=True)
    
    query = """
        SELECT location, time, species, count 
        FROM bird_sightings 
        WHERE sighting_date = %s
    """
    cursor.execute(query, (date,))
    results = cursor.fetchall()
    cursor.close()
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)  # Flask will run on port 5000'''
