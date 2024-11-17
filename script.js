document.addEventListener("DOMContentLoaded", () => {
    const monthElement = document.querySelector(".calendar-month");
    const datesElement = document.querySelector(".calendar-dates");
    const prevButton = document.querySelector(".calendar-button.prev");
    const nextButton = document.querySelector(".calendar-button.next");

    // Initialize current month and year
    let currentDate = new Date();

    // Function to render the calendar
    function renderCalendar() {
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

    // Event listeners for navigation buttons
    prevButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Render the calendar for the current month
    renderCalendar();
});
