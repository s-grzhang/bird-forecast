# Bird Forecast - King County Bird Sightings Prediction

A web application that predicts bird sightings based on location, date, and time using historical data and eBird API integration.

## Features

- **Bird Forecasting**: Predict which birds you're likely to see at specific locations and times
- **Historical Data Analysis**: Uses local bird sighting data from King County
- **eBird Integration**: Combines with real-time eBird observations (optional)
- **Interactive UI**: Modern, responsive web interface
- **Location Support**: 9 popular birding locations in King County, WA

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. eBird API Key (Optional)

To enable real-time eBird data integration:

1. Get a free API key from [eBird API Keygen](https://ebird.org/api/keygen)
2. Create a `.env` file in the project root:
   ```
   EBIRD_API_KEY=your-actual-api-key-here
   ```

### 3. Run the Application

```bash
python app.py
```

The application will be available at `http://localhost:5000`

## Project Structure

- `app.py` - Flask backend server
- `forecast.html` - Forecast page with form
- `forecast.css` - Forecast page styling
- `forecast.js` - Frontend JavaScript for form handling
- `index.html` - Main landing page
- `style.css` - Main site styling
- `filtered_*.csv` - Historical bird sighting data
- `scientific_to_common.py` - Species name mapping

## API Endpoints

- `GET /` - Serve main page
- `POST /api/forecast` - Get bird predictions
  - Request body: `{"location": "Union Bay", "date": "2024-01-15", "time": "09:00"}`
  - Response: `{"birds": [{"common_name": "...", "scientific_name": "...", "confidence": 0.8, ...}]}`

## Supported Locations

- Union Bay Natural Area/Montlake Fill
- Discovery Park
- Magnuson Park
- Marymoor Park
- Juanita Bay Park
- Carkeek Park
- Lake Sammamish State Park
- Kent Ponds
- Alki Beach

## Data Sources

- Historical bird sighting data from local CSV files
- Real-time observations from eBird API (when configured)
- Seasonal analysis based on historical patterns

## Development

The application uses:
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Flask (Python)
- **Data**: Pandas for data analysis
- **API**: eBird API for real-time data