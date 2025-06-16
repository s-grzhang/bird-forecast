const firebaseConfig = {
  apiKey: "AIzaSyA0yxFTwKgT2EzczVSM0Cti9PtUfs0auSM",
  authDomain: "king-co-forecase.firebaseapp.com",
  projectId: "king-co-forecase",
  storageBucket: "king-co-forecase.firebasestorage.app",
  messagingSenderId: "657363005946",
  appId: "1:657363005946:web:b4284f3280818e22527443",
  measurementId: "G-QGQ5J7EEJS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to add new bird species and count fields
function addField() {
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
}

// Attach the event listener to the button
document.getElementById("addFieldButton").addEventListener("click", addField);

// Function to display the success message
function showSuccessMessage() {
  const successMessage = document.getElementById('successMessage');
  successMessage.style.display = 'block';
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 3000);
}

// Function to display error message
function showErrorMessage(message) {
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.textContent = message;
  document.querySelector('.submit').insertBefore(errorMessage, document.querySelector('form'));
  setTimeout(() => {
    errorMessage.remove();
  }, 3000);
}

// Handle form submission
document.getElementById('sightingForm').addEventListener('submit', async function(event) {
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
    await db.collection('sightings').add({
      location: location,
      time: new Date(time),
      birds: birds,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Show success message and reset form
    showSuccessMessage();
    this.reset();
  } catch (error) {
    console.error('Error submitting form:', error);
    showErrorMessage('Error submitting form. Please try again.');
  }
});