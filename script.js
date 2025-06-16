console.log('🔄 Script.js starting to load...');

// Global variables for Firebase
let db = null;
let firebaseLoaded = false;

// Initialize Firebase asynchronously
const initializeFirebase = async () => {
    try {
        console.log('📦 Importing Firebase modules...');
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js');
        console.log('✅ Firebase app imported');
        const { getFirestore, collection, query, where, orderBy, limit, getDocs, Timestamp } = await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js');
        console.log('✅ Firestore imported');

        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyA0yxFTwKgT2EzczVSM0Cti9PtUfs0auSM",
            authDomain: "king-co-forecase.firebaseapp.com",
            projectId: "king-co-forecase",
            storageBucket: "king-co-forecase.firebasestorage.app",
            messagingSenderId: "657363005946",
            appId: "1:657363005946:web:b4284f3280818e22527443",
            measurementId: "G-QGQ5J7EEJS"
        };

        console.log('🚀 Initializing Firebase...');
        const app = initializeApp(firebaseConfig);
        console.log('✅ Firebase app initialized');
        db = getFirestore(app);
        console.log('✅ Firestore initialized');
        
        // Store Firebase functions globally
        window.firebaseUtils = { collection, query, where, orderBy, limit, getDocs, Timestamp };
        firebaseLoaded = true;
        
        return true;
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
        return false;
    }
};

// Utility functions
const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const formatTime = (timestamp) => {
    if (timestamp && timestamp.toDate) {
        return timestamp.toDate().toLocaleString("en-US", {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }
    return 'Time not available';
};

const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
};

// Firebase functions
const fetchSightingsForDate = async (date) => {
    if (!firebaseLoaded || !db || !window.firebaseUtils) {
        console.log('Firebase not loaded, cannot fetch sightings');
        return [];
    }

    try {
        console.log('Fetching sightings for date:', date.toDateString());
        
        const { collection, query, where, orderBy, limit, getDocs, Timestamp } = window.firebaseUtils;
        
        // Create start and end of day timestamps
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        console.log('Date range:', startOfDay.toISOString(), 'to', endOfDay.toISOString());

        // Try querying with 'time' field first
        let querySnapshot;
        let sightings = [];

        try {
            const qTime = query(
                collection(db, 'sightings'),
                where('time', '>=', Timestamp.fromDate(startOfDay)),
                where('time', '<=', Timestamp.fromDate(endOfDay)),
                orderBy('time', 'desc'),
                limit(10)
            );
            querySnapshot = await getDocs(qTime);
            console.log('Query with "time" field found:', querySnapshot.size, 'results');
        } catch (timeError) {
            console.log('Query with "time" failed, trying "timestamp":', timeError.message);
            
            // Try with 'timestamp' field
            try {
                const qTimestamp = query(
                    collection(db, 'sightings'),
                    where('timestamp', '>=', Timestamp.fromDate(startOfDay)),
                    where('timestamp', '<=', Timestamp.fromDate(endOfDay)),
                    orderBy('timestamp', 'desc'),
                    limit(10)
                );
                querySnapshot = await getDocs(qTimestamp);
                console.log('Query with "timestamp" field found:', querySnapshot.size, 'results');
            } catch (timestampError) {
                console.log('Both queries failed, fetching all and filtering manually');
                
                // Fallback: get all sightings and filter manually
                const allQuery = query(collection(db, 'sightings'), limit(50));
                const allSnapshot = await getDocs(allQuery);
                
                allSnapshot.forEach((doc) => {
                    const data = doc.data();
                    const sightingDate = data.time?.toDate() || data.timestamp?.toDate();
                    
                    if (sightingDate && 
                        sightingDate.getDate() === date.getDate() &&
                        sightingDate.getMonth() === date.getMonth() &&
                        sightingDate.getFullYear() === date.getFullYear()) {
                        sightings.push({
                            id: doc.id,
                            ...data
                        });
                    }
                });
                
                console.log('Manual filtering found:', sightings.length, 'results');
                return sightings.slice(0, 10);
            }
        }

        if (querySnapshot) {
            querySnapshot.forEach((doc) => {
                sightings.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
        }

        console.log('Final results:', sightings.length, 'sightings found');
        return sightings;
    } catch (error) {
        console.error('Error fetching sightings:', error);
        return [];
    }
};

console.log('⏳ Waiting for DOM to be ready...');

// Event listeners - ALL DOM-dependent code goes here
document.addEventListener("DOMContentLoaded", async () => {
    console.log('🎯 DOM is ready! Setting up calendar...');
    
    // Initialize Firebase in the background
    initializeFirebase().then(success => {
        if (success) {
            console.log('🔥 Firebase ready for sightings!');
        } else {
            console.log('⚠️ Calendar will work without Firebase features');
        }
    });
    
    // Calendar functionality variables
    let currentDate = new Date(); // This will be June 2025
    let selectedDate = null;
    
    console.log('📅 Current date for calendar:', currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }));

    // DOM elements - now these will exist
    const monthElement = document.querySelector(".calendar-month");
    const datesElement = document.querySelector(".calendar-dates");
    const prevButton = document.querySelector(".calendar-button.prev");
    const nextButton = document.querySelector(".calendar-button.next");
    const sidebar = document.getElementById("sightingsSidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const closeSidebarBtn = document.getElementById("closeSidebar");
    const selectedDateElement = document.getElementById("selectedDate");
    const sightingsListElement = document.getElementById("sightingsList");
    const loadingMessage = document.getElementById("loadingMessage");

    console.log('📋 DOM elements found:', {
        monthElement: !!monthElement,
        datesElement: !!datesElement,
        sidebar: !!sidebar,
        sidebarOverlay: !!sidebarOverlay
    });

    // Sidebar functions
    const openSidebar = () => {
        console.log('🚪 openSidebar function called');
        console.log('📋 Sidebar element exists:', !!sidebar);
        console.log('🌫️ Overlay element exists:', !!sidebarOverlay);
        
        if (sidebar) {
            sidebar.classList.add('active');
            console.log('✅ Added active class to sidebar');
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('active');
            console.log('✅ Added active class to overlay');
        }
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        console.log('🔒 Set body overflow to hidden');
    };

    const closeSidebar = () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Remove selected styling from calendar days
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        selectedDate = null;
    };

    const displaySightings = async (date, dayElement) => {
        console.log('🎯 displaySightings called for date:', date.toDateString());
        
        // Show selected date
        selectedDateElement.textContent = formatDate(date);
        console.log('📅 Set selected date text to:', formatDate(date));
        
        // Show loading message
        sightingsListElement.innerHTML = '<div class="loading">Loading sightings...</div>';
        console.log('⏳ Set loading message');
        
        // Open sidebar
        console.log('🚪 Opening sidebar...');
        openSidebar();
        
        // Add selected styling to clicked day
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        dayElement.classList.add('selected');
        console.log('✨ Added selected styling to day element');
        
        // Fetch and display sightings
        console.log('🔍 Fetching sightings...');
        const sightings = await fetchSightingsForDate(date);
        console.log('📊 Received sightings:', sightings.length, 'results');
        
        if (sightings.length === 0) {
            sightingsListElement.innerHTML = `
                <div class="no-sightings">
                    <p>No bird sightings recorded for this date.</p>
                    <p>Be the first to <a href="submit.html" style="color: #20568d;">submit a sighting</a>!</p>
                </div>
            `;
            console.log('📭 No sightings found, showing empty message');
        } else {
            let sightingsHTML = `<h4 style="margin-bottom: 15px; color: #20568d; font-family: 'Quicksand', sans-serif;">Top ${sightings.length} Sightings</h4>`;
            
            sightings.forEach((sighting, index) => {
                sightingsHTML += `
                    <div class="sighting-item">
                        <div class="sighting-location">${sighting.location}</div>
                        <div class="sighting-time">${formatTime(sighting.timestamp || sighting.time)}</div>
                        <div class="sighting-birds">
                            ${sighting.birds.map(bird => 
                                `<span class="bird-tag">${bird.species} (${bird.count})</span>`
                            ).join('')}
                        </div>
                    </div>
                `;
            });
            
            sightingsListElement.innerHTML = sightingsHTML;
            console.log('📋 Populated sidebar with', sightings.length, 'sightings');
        }
    };

    // Calendar rendering function
    const renderCalendar = async () => {
        console.log('📅 Starting to render calendar...');
        
        if (!datesElement) {
            console.error('❌ datesElement not found! Cannot render calendar.');
            return;
        }
        
        // Get the first and last day of the current month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        console.log('📅 Rendering calendar for:', currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }));

        // Update the month display
        if (monthElement) {
            monthElement.textContent = currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
            });
            console.log('📅 Updated month display to:', monthElement.textContent);
        }

        // Clear previous dates
        datesElement.innerHTML = "";
        console.log('🧹 Cleared previous calendar dates');

        // Add blank days for the first week offset
        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            datesElement.innerHTML += `<span class="calendar-day empty"></span>`;
        }

        // Add all days of the current month
        let clickListenersAdded = 0;
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isToday = isSameDay(dayDate, new Date());
            
            const dayElement = document.createElement('span');
            dayElement.className = `calendar-day ${isToday ? 'today' : ''}`;
            dayElement.textContent = day;
            
            // Add click event listener to each day
            dayElement.addEventListener('click', (event) => {
                console.log(`🎯 CLICKED DAY ${day}! Date: ${dayDate.toDateString()}`);
                console.log('🖱️ Click event triggered, calling displaySightings...');
                selectedDate = dayDate;
                displaySightings(dayDate, dayElement);
            });
            
            clickListenersAdded++;
            datesElement.appendChild(dayElement);
        }

        console.log(`✅ Added click listeners to ${clickListenersAdded} calendar days`);

        // Add blank days for the last week offset
        const lastDayOffset = (7 - ((firstDayOfMonth.getDay() + lastDayOfMonth.getDate()) % 7)) % 7;
        for (let i = 0; i < lastDayOffset; i++) {
            datesElement.innerHTML += `<span class="calendar-day empty"></span>`;
        }
        
        console.log('📅 Calendar rendering complete!');
    };

    // Navigation buttons
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    // Sidebar close events
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener("click", closeSidebar);
    }
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }
    
    // Close sidebar with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Initial calendar render
    console.log('🚀 Calling initial renderCalendar()...');
    renderCalendar();
});
