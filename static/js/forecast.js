// eBird API configuration
const EBIRD_API_KEY = 'fnqq0qvc0dc1'; // Using the same API key from data_scraper.py
const EBIRD_BASE_URL = 'https://api.ebird.org/v2';

// DOM elements
const forecastForm = document.getElementById('forecastForm');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const resultsContainer = document.getElementById('resultsContainer');
const birdResults = document.getElementById('birdResults');

// Bird image mapping for common birds
const birdImages = {
    'American Crow': '/images/American Crow.png',
    'American Robin': '/images/American Robin.png',
    'Northern Shoveler': '/images/Northern Shoveler.png',
    'Pine Siskin': '/images/Pine Siskin.png',
    'Chestnut-backed Chickadee': '/images/Chestnut-backed Chickadee.png',
    'American Coot': '/images/American Coot.png',
    'California Gull': '/images/California Gull.png',
    'Western Grebe': '/images/Western Grebe.png',
    "Steller's Jay": '/images/Steller\'s Jay.png',
    'Western Bluebird': '/images/Western Bluebird.jpg',
    'Black-capped Chickadee': '/images/Black-capped Chickadee.png',
    'Dark-eyed Junco': '/images/Dark-eyed Junco.png',
    'House Finch': '/images/House Finch.png',
    'Song Sparrow': '/images/Song Sparrow.png',
    'Spotted Towhee': '/images/Spotted Towhee.png',
    'Anna\'s Hummingbird': '/images/Anna\'s Hummingbird.png',
    'Bewick\'s Wren': '/images/Bewick\'s Wren.png',
    'Northern Flicker': '/images/Northern Flicker.png',
    'European Starling': '/images/European Starling.png'
};

const hotspotCodeToName = {
    'L162766': 'Union Bay Natural Area',
    'L128530': 'Discovery Park',
    'L269461': 'Magnuson Park',
    'L351484': 'Marymoor Park',
    'L232479': 'Juanita Bay Park',
    'L298030': 'Carkeek Park',
    'L321969': 'Lake Sammamish State Park',
    'L257959': 'Kent Ponds',
    'L207315': 'Alki Beach'
};

// Utility functions
const showLoading = () => {
    loading.classList.add('show');
    submitBtn.disabled = true;
    resultsContainer.classList.remove('show');
    errorMessage.classList.remove('show');
};

const hideLoading = () => {
    loading.classList.remove('show');
    submitBtn.disabled = false;
};

const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    hideLoading();
};

const hideError = () => {
    errorMessage.classList.remove('show');
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const getTimeRange = (timeOfDay) => {
    const ranges = {
        'dawn': { start: 5, end: 7 },
        'morning': { start: 7, end: 11 },
        'afternoon': { start: 11, end: 15 },
        'evening': { start: 15, end: 19 },
        'dusk': { start: 19, end: 21 }
    };
    return ranges[timeOfDay] || { start: 0, end: 24 };
};

// API functions
const fetchEBirdData = async (regionName, date) => {
    try {
        const response = await fetch('/api/bird-forecast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                region_code: regionName,
                date: date
            })
        });

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            // If response is not JSON (e.g., HTML error page), show a user-friendly error
            throw new Error('Failed to get bird forecast: The server did not return valid data. Please try again later.');
        }

        if (!response.ok) {
            throw new Error(data.error || `API error: ${response.status} ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Error fetching bird data:', error);
        throw error;
    }
};



const getFrequencyBadge = (count) => {
    if (count >= 10) return { text: 'Very Common', color: '#4caf50' };
    if (count >= 5) return { text: 'Common', color: '#2196f3' };
    if (count >= 2) return { text: 'Uncommon', color: '#ff9800' };
    return { text: 'Rare', color: '#f44336' };
};

const createBirdCard = (species, count, details) => {
    const imageSrc = birdImages[species] || '/images/logo.png'; // Fallback to logo if no specific image
    
    return `
        <div class="bird-card">
            <img src="${imageSrc}" alt="${species}" class="bird-image" onerror="this.src='/images/logo.png'">
            <div class="bird-info">
                <div class="bird-name">${species}</div>
            </div>
        </div>
    `;
};

const displayResults = (data, formData) => {
    const { birds, counts, details } = data;
    const locationDisplay = hotspotCodeToName[formData.location] || formData.location;
    
    if (birds.length === 0) {
        birdResults.innerHTML = `
            <div class="no-results">
                <h3>No recent bird sightings found</h3>
                <p>Try selecting a different date or location, or check back later for updated data.</p>
            </div>
        `;
    } else {
        const resultsHTML = birds.map(species => 
            createBirdCard(species, counts[species], details[species])
        ).join('');

        birdResults.innerHTML = `
            <div style="margin-bottom: 20px;">
                <p><strong>Forecast for ${formatDate(formData.date)} at ${formData.time}</strong></p>
                <p>Based on recent sightings in ${locationDisplay}</p>
            </div>
            ${resultsHTML}
        `;
    }

    resultsContainer.classList.add('show');
};

// Form submission handler
const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(forecastForm);
    const date = formData.get('date');
    const time = formData.get('time');
    const location = formData.get('location');

    if (!date || !time || !location) {
        showError('Please fill in all fields');
        return;
    }

    showLoading();
    hideError();

    try {
        console.log('Fetching bird data for:', { date, time, location });
        const birdData = await fetchEBirdData(location, date);
        displayResults(birdData, { date, time, location });
    } catch (error) {
        console.error('Forecast error:', error);
        showError(`Failed to get bird forecast: ${error.message}. Please try again later.`);
    } finally {
        hideLoading();
    }
};

// Initialize form
const initializeForm = () => {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
    
    // Add form submit listener
    forecastForm.addEventListener('submit', handleFormSubmit);
    
    console.log('Forecast form initialized');
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeForm); 