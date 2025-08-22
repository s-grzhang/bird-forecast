// Simple Bird Sighting Form Handler with Firebase
class BirdSightingForm {
    constructor() {
        this.firebaseInitialized = false;
        this.db = null;
        this.initializeForm();
        this.initializeFirebase();
    }

    async initializeFirebase() {
        try {
            console.log('Fetching Firebase configuration from server...');
            const response = await fetch('/api/firebase-config');
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const config = await response.json();
            console.log('Firebase config received:', config);
            
            // Check if we have the essential configuration
            if (!config.apiKey || !config.projectId || !config.authDomain) {
                throw new Error('Missing essential Firebase configuration');
            }
            
            // Check if Firebase is available globally
            if (typeof firebase === 'undefined') {
                throw new Error('Firebase not loaded. Loading Firebase from CDN...');
            }
            
            // Initialize Firebase
            const app = firebase.initializeApp(config);
            this.db = firebase.firestore(app);
            this.firebaseInitialized = true;
            
            console.log('Firebase initialized successfully');
            console.log('Database instance:', this.db);
            
        } catch (error) {
            console.error('Failed to initialize Firebase:', error);
            this.showMessage('Firebase not available. Form will work without database storage.', 'error');
        }
    }

    initializeForm() {
        // Get form elements
        this.form = document.getElementById('sightingForm');
        this.addButton = document.getElementById('addFieldButton');
        this.birdFields = document.getElementById('birdFields');
        this.successMessage = document.getElementById('successMessage');

        // Add event listeners
        if (this.addButton) {
            this.addButton.addEventListener('click', () => this.addBirdField());
        }
        
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        console.log('Bird sighting form initialized');
    }

    addBirdField() {
        const newField = document.createElement('div');
        newField.className = 'additional-field';
        
        newField.innerHTML = `
            <label>Bird Species:</label>
            <input type="text" name="species[]" required aria-label="Enter bird species"><br><br>
            <label>Number of Birds:</label>
            <input type="number" name="count[]" min="1" required aria-label="Enter bird count"><br><br>
            <button type="button" class="removeFieldButton">Remove</button><br><br>
        `;

        // Add remove button functionality
        const removeButton = newField.querySelector('.removeFieldButton');
        removeButton.addEventListener('click', () => {
            this.birdFields.removeChild(newField);
        });

        this.birdFields.appendChild(newField);
        console.log('Added new bird field');
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log('Form submitted');

        // Get form data
        const location = document.getElementById('location').value;
        const time = document.getElementById('time').value;
        const speciesInputs = document.querySelectorAll('input[name="species[]"]');
        const countInputs = document.querySelectorAll('input[name="count[]"]');

        // Validate form
        if (!location || !time) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Collect species and counts
        const birds = [];
        for (let i = 0; i < speciesInputs.length; i++) {
            const species = speciesInputs[i].value.trim();
            const count = parseInt(countInputs[i].value);
            
            if (species && count > 0) {
                birds.push({ species, count });
            }
        }

        if (birds.length === 0) {
            this.showMessage('Please add at least one bird species.', 'error');
            return;
        }

        // Prepare data for submission
        const formData = {
            location,
            time,
            birds,
            timestamp: new Date().toISOString()
        };

        console.log('Submitting data:', formData);

        try {
            if (this.firebaseInitialized && this.db) {
                // Save to Firebase
                console.log('Saving to Firebase database...');
                const docRef = await this.db.collection('sightings').add({
                    location: location,
                    time: new Date(time),
                    birds: birds,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });

                console.log('Document written to Firebase with ID: ', docRef.id);
                this.showMessage('Bird sighting submitted successfully and saved to database!', 'success');
            } else {
                // Firebase not available, just show success
                console.log('Firebase not available, showing success message only');
                this.showMessage('Bird sighting submitted successfully! (Database not available)', 'success');
            }
            
            // Reset form
            this.form.reset();
            
            // Remove all additional bird fields except the first one
            const additionalFields = this.birdFields.querySelectorAll('.additional-field:not(:first-child)');
            additionalFields.forEach(field => field.remove());
            
            console.log('Form submitted successfully');
            
        } catch (error) {
            console.error('Error submitting form:', error);
            this.showMessage(`Error submitting form: ${error.message}`, 'error');
        }
    }

    showMessage(message, type) {
        if (this.successMessage) {
            this.successMessage.innerHTML = `
                <h3>${type === 'success' ? 'Success!' : 'Error'}</h3>
                <p>${message}</p>
            `;
            this.successMessage.style.display = 'block';
            this.successMessage.className = `success-message ${type}`;
            
            // Hide message after 5 seconds for success, 3 seconds for error
            const timeout = type === 'success' ? 5000 : 3000;
            setTimeout(() => {
                this.successMessage.style.display = 'none';
            }, timeout);
        } else {
            // Fallback: use alert if success message element not found
            alert(message);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing bird sighting form');
    window.birdSightingForm = new BirdSightingForm();
});

// Add some basic styling for the success/error messages
const style = document.createElement('style');
style.textContent = `
    .success-message {
        padding: 15px;
        margin: 10px 0;
        border-radius: 5px;
        text-align: center;
    }
    
    .success-message.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .success-message.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .removeFieldButton {
        background-color: #dc3545;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
    }
    
    .removeFieldButton:hover {
        background-color: #c82333;
    }
`;
document.head.appendChild(style);