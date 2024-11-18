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
  const successMessage = document.querySelector('.success-message');
  successMessage.style.display = 'block'; // Show the success message
  setTimeout(() => {
      successMessage.style.display = 'none'; // Hide it after 3 seconds
  }, 3000);
}


// Example of triggering the success message (e.g., after form submission)
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission for demonstration
  showSuccessMessage(); // Show the success message
  this.reset();
});