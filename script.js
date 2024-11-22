document.addEventListener("DOMContentLoaded", () => {
    const datesElement = document.querySelector(".calendar-dates");
    const sightingsContainer = document.querySelector(".sightings-container"); // Add this to your HTML if not present
    let currentDate = new Date();

    // Function to render the calendar
    function renderCalendar() {
        const monthElement = document.querySelector(".calendar-month");

        // Get the first and last day of the current month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Update the month display
        monthElement.textContent = currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });

        // Clear previous dates
        datesElement.innerHTML = "";

        // Add blank days for the first week offset
        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            datesElement.innerHTML += `<span class="calendar-day empty"></span>`;
        }

        // Add all days of the current month
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

            datesElement.innerHTML += `<span class="calendar-day ${
                isToday ? "today" : ""
            }">${day}</span>`;
        }

        // Add blank days for the last week offset
        const lastDayOffset = (7 - ((firstDayOfMonth.getDay() + lastDayOfMonth.getDate()) % 7)) % 7;
        for (let i = 0; i < lastDayOffset; i++) {
            datesElement.innerHTML += `<span class="calendar-day empty"></span>`;
        }
    }

    // Fetch and display sightings for a specific date
    function fetchSightings(date) {
        fetch(`http://localhost:5000/get_sightings?date=${date}`)
            .then((response) => response.json())
            .then((sightings) => displaySightings(sightings))
            .catch((error) => {
                console.error("Error fetching sightings:", error);
                sightingsContainer.innerHTML = "<p>Error fetching data. Please try again later.</p>";
            });
    }

    // Display sightings in the container
    function displaySightings(sightings) {
        sightingsContainer.innerHTML = ""; // Clear previous content

        if (sightings.length === 0) {
            sightingsContainer.innerHTML = "<p>No sightings for this date.</p>";
            return;
        }

        sightings.forEach((sighting) => {
            const sightingElement = document.createElement("div");
            sightingElement.className = "sighting";
            sightingElement.innerHTML = `
                <p><strong>Species:</strong> ${sighting.species}</p>
                <p><strong>Location:</strong> ${sighting.location}</p>
                <p><strong>Time:</strong> ${sighting.time}</p>
                <p><strong>Count:</strong> ${sighting.count}</p>
            `;
            sightingsContainer.appendChild(sightingElement);
        });
    }

    // Event listener for date clicks
    datesElement.addEventListener("click", (event) => {
        const clickedDay = event.target;

        if (clickedDay.classList.contains("calendar-day") && !clickedDay.classList.contains("empty")) {
            const selectedDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                parseInt(clickedDay.textContent)
            ).toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'

            // Fetch and display sightings for the selected date
            fetchSightings(selectedDate);
        }
    });

    // Event listeners for navigation buttons
    document.querySelector(".calendar-button.prev").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.querySelector(".calendar-button.next").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Render the calendar on page load
    renderCalendar();
});
