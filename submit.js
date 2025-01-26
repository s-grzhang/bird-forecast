// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

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

// Function to handle form submission
document.getElementById('sightingForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const location = document.getElementById('location').value;
  const time = document.getElementById('time').value;
  const species = Array.from(document.querySelectorAll('input[name="species[]"]')).map(input => input.value);
  const count = Array.from(document.querySelectorAll('input[name="count[]"]')).map(input => input.value);

  // Check if required fields are filled
  if (!location || !time || species.length === 0 || count.length === 0) {
    alert("Please fill all fields.");
    return;
  }

  // Prepare data to send to Firebase
  const sightingData = {
    location: location,
    time: time,
    sightings: species.map((speciesName, index) => ({
      species: speciesName,
      count: parseInt(count[index], 10),
    }))
  };

  // Add data to Firebase Firestore
  try {
    const docRef = await addDoc(collection(db, "birdSightings"), sightingData);
    console.log("Document written with ID: ", docRef.id);
    showSuccessMessage();  // Show success message
    document.getElementById('sightingForm').reset();  // Reset form fields
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Failed to submit the form.");
  }
});

// Function to display the success message
function showSuccessMessage() {
  const successMessage = document.querySelector('.success-message');
  successMessage.style.display = 'block'; // Show the success message
  setTimeout(() => {
    successMessage.style.display = 'none'; // Hide it after 3 seconds
  }, 3000);
}