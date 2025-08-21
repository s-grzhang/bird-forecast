// Import Firebase v9+ modular SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';

// Firebase configuration - will be loaded from server
let firebaseConfig = null;
let app = null;
let db = null;

// Function to initialize Firebase with configuration from server
const initializeFirebase = async () => {
    try {
        const response = await fetch('/api/firebase-config');
        const config = await response.json();
        firebaseConfig = config;
        
        // Initialize Firebase
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Firebase:', error);
    }
};

// Initialize Firebase when page loads
document.addEventListener('DOMContentLoaded', initializeFirebase);

// Function to add new bird species and count fields
const addField = () => {
  const birdFields = document.getElementById("birdFields");

  // Create a new fieldset for species and count
  const newField = document.createElement("div");
  newField.classList.add("additional-field");

  // Add the Bird Species and Count fields with a Remove button
  newField.innerHTML = `
    <label>Bird Species:</label>
    <input type="text" name="species[]" required aria-label="Enter bird species"><br><br>
    <label>Number of Birds:</label>
    <input type="number" name="count[]" min="1" required aria-label="Enter bird count"><br><br>
    <button type="button" class="removeFieldButton">Remove</button><br><br>
  `;

  // Append the new field to birdFields
  birdFields.appendChild(newField);

  // Add event listener for the remove button
  newField.querySelector(".removeFieldButton").addEventListener("click", () => {
    birdFields.removeChild(newField);
  });
};

// Function to display the success message
const showSuccessMessage = () => {
  const successMessage = document.getElementById('successMessage');
  successMessage.style.display = 'block';
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 3000);
};

// Function to display error message
const showErrorMessage = (message) => {
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.textContent = message;
  document.querySelector('.submit').insertBefore(errorMessage, document.querySelector('form'));
  setTimeout(() => {
    errorMessage.remove();
  }, 3000);
};

// Handle form submission
const handleFormSubmit = async (event) => {
  event.preventDefault();
  
  // Get form data
  const location = document.getElementById('location').value;
  const time = document.getElementById('time').value;
  const species = Array.from(document.getElementsByName('species[]')).map(input => input.value);
  const counts = Array.from(document.getElementsByName('count[]')).map(input => parseInt(input.value));
  
  // Combine species and counts into an array of objects
  const birds = species.map((species, index) => ({
    species: species,
    count: counts[index]
  }));

  try {
    // Add data to Firestore
    const docRef = await addDoc(collection(db, 'sightings'), {
      location: location,
      time: new Date(time),
      birds: birds,
      timestamp: serverTimestamp()
    });

    console.log('Document written with ID: ', docRef.id);
    
    // Show success message and reset form
    showSuccessMessage();
    document.getElementById('sightingForm').reset();
  } catch (error) {
    console.error('Error submitting form:', error);
    showErrorMessage('Error submitting form. Please try again.');
  }
};

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Attach event listeners
  document.getElementById("addFieldButton").addEventListener("click", addField);
  document.getElementById('sightingForm').addEventListener('submit', handleFormSubmit);
});