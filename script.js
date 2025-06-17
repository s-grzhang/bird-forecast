console.log('🔄 Script.js starting to load...');

// Global variables
let db = null;
let firebaseLoaded = false;

// Utility functions (these work without Firebase)
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

// Firebase initialization (async, doesn't block main functionality)
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
        
        console.log('🔥 Firebase is now ready!');
        return true;
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
        console.log('📋 Calendar will work without Firebase features');
        return false;
    }
};

// Firebase functions (only called if Firebase is loaded)
const fetchSightingsForDate = async (date) => {
    if (!firebaseLoaded || !db || !window.firebaseUtils) {
        console.log('Firebase not loaded, showing placeholder data');
        // Return placeholder data for demo
        return [
            {
                id: 'demo1',
                location: 'Marymoor Park',
                timestamp: { toDate: () => new Date() },
                birds: [
                    { species: 'American Robin', count: 3 },
                    { species: "Steller's Jay", count: 1 }
                ]
            },
            {
                id: 'demo2',
                location: 'Lake Washington',
                timestamp: { toDate: () => new Date() },
                birds: [
                    { species: 'Western Grebe', count: 2 }
                ]
            }
        ];
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

// Main calendar functionality - this runs immediately when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    console.log('🎯 DOM is ready! Setting up calendar...');
    
    // Start Firebase initialization in background (non-blocking)
    initializeFirebase().then(success => {
        if (success) {
            console.log('🔥 Firebase ready for sightings!');
        } else {
            console.log('⚠️ Calendar will work with demo data');
        }
    });
    
    // Calendar functionality variables
    let currentDate = new Date();
    let selectedDate = null;
    
    console.log('📅 Current date for calendar:', currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }));

    // DOM elements - these should exist now
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
        sidebarOverlay: !!sidebarOverlay,
        closeSidebarBtn: !!closeSidebarBtn,
        selectedDateElement: !!selectedDateElement,
        sightingsListElement: !!sightingsListElement
    });

    // Check if essential elements exist
    if (!sidebar || !sidebarOverlay || !datesElement) {
        console.error('❌ Critical elements not found! Cannot initialize calendar.');
        return;
    }

    // Sidebar functions - these work without Firebase
    const openSidebar = () => {
        console.log('🚪 openSidebar function called');
        
        if (sidebar && sidebarOverlay) {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('✅ Sidebar opened successfully');
        } else {
            console.error('❌ Sidebar elements not found!');
        }
    };

    const closeSidebar = () => {
        console.log('🚪 closeSidebar function called');
        
        if (sidebar && sidebarOverlay) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Remove selected styling from calendar days
            document.querySelectorAll('.calendar-day.selected').forEach(day => {
                day.classList.remove('selected');
            });
            selectedDate = null;
            console.log('✅ Sidebar closed successfully');
        }
    };

    const displaySightings = async (date, dayElement) => {
        console.log('🎯 displaySightings called for date:', date.toDateString());
        
        // Show selected date
        if (selectedDateElement) {
            selectedDateElement.textContent = formatDate(date);
            console.log('📅 Set selected date text to:', formatDate(date));
        }
        
        // Show loading message
        if (sightingsListElement) {
            sightingsListElement.innerHTML = '<div class="loading">Loading sightings...</div>';
            console.log('⏳ Set loading message');
        }
        
        // Open sidebar first
        console.log('🚪 Opening sidebar...');
        openSidebar();
        
        // Add selected styling to clicked day
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        if (dayElement) {
            dayElement.classList.add('selected');
            console.log('✨ Added selected styling to day element');
        }
        
        // Fetch and display sightings
        console.log('🔍 Fetching sightings...');
        try {
            const sightings = await fetchSightingsForDate(date);
            console.log('📊 Received sightings:', sightings.length, 'results');
            
            if (!sightingsListElement) {
                console.error('❌ sightingsListElement not found');
                return;
            }
            
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
                            <div class="sighting-location">${sighting.location || 'Unknown Location'}</div>
                            <div class="sighting-time">${formatTime(sighting.timestamp || sighting.time)}</div>
                            <div class="sighting-birds">
                                ${(sighting.birds || []).map(bird => 
                                    `<span class="bird-tag">${bird.species} (${bird.count})</span>`
                                ).join('')}
                            </div>
                        </div>
                    `;
                });
                
                sightingsListElement.innerHTML = sightingsHTML;
                console.log('📋 Populated sidebar with', sightings.length, 'sightings');
            }
        } catch (error) {
            console.error('❌ Error in displaySightings:', error);
            if (sightingsListElement) {
                sightingsListElement.innerHTML = '<div class="no-sightings"><p>Error loading sightings. Please try again.</p></div>';
            }
        }
    };

    // Calendar rendering function
    const renderCalendar = () => {
        console.log('📅 Starting to render calendar...');
        console.log('📋 datesElement exists:', !!datesElement);
        console.log('📋 datesElement:', datesElement);
        
        if (!datesElement) {
            console.error('❌ datesElement not found! Cannot render calendar.');
            console.error('❌ Available elements:');
            console.error('- .calendar-dates:', document.querySelector('.calendar-dates'));
            console.error('- #calendar-dates:', document.getElementById('calendar-dates'));
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
        console.log('📅 Adding', firstDayOfMonth.getDay(), 'blank days at the beginning');
        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            const emptyElement = document.createElement('span');
            emptyElement.className = 'calendar-day empty';
            datesElement.appendChild(emptyElement);
        }

        // Add all days of the current month
        let clickListenersAdded = 0;
        console.log('📅 Adding days from 1 to', lastDayOfMonth.getDate());
        
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isToday = isSameDay(dayDate, new Date());
            
            const dayElement = document.createElement('span');
            dayElement.className = `calendar-day ${isToday ? 'today' : ''}`;
            dayElement.textContent = day;
            
            console.log(`📅 Creating day ${day}, element:`, dayElement);
            
            // Add click event listener to each day
            dayElement.addEventListener('click', (event) => {
                console.log(`🎯 CLICKED DAY ${day}! Date: ${dayDate.toDateString()}`);
                console.log('🖱️ Click event triggered, calling displaySightings...');
                selectedDate = dayDate;
                displaySightings(dayDate, dayElement);
            });
            
            console.log(`✅ Added click listener to day ${day}`);
            clickListenersAdded++;
            datesElement.appendChild(dayElement);
            console.log(`📅 Appended day ${day} to calendar`);
        }

        console.log(`✅ Added click listeners to ${clickListenersAdded} calendar days`);
        console.log('📅 Calendar innerHTML after adding days:', datesElement.innerHTML.substring(0, 200) + '...');

        // Add blank days for the last week offset
        const lastDayOffset = (7 - ((firstDayOfMonth.getDay() + lastDayOfMonth.getDate()) % 7)) % 7;
        console.log('📅 Adding', lastDayOffset, 'blank days at the end');
        for (let i = 0; i < lastDayOffset; i++) {
            const emptyElement = document.createElement('span');
            emptyElement.className = 'calendar-day empty';
            datesElement.appendChild(emptyElement);
        }
        console.log('📅 Final calendar HTML:', datesElement.innerHTML.substring(0, 300) + '...');
        
        console.log('📅 Calendar rendering complete!');
    };

    // Navigation buttons
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            console.log('⬅️ Previous month clicked');
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        console.log('✅ Previous button listener added');
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            console.log('➡️ Next month clicked');
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
        console.log('✅ Next button listener added');
    }

    // Sidebar close events
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener("click", () => {
            console.log('❌ Close button clicked');
            closeSidebar();
        });
        console.log('✅ Close button listener added');
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            console.log('🌫️ Overlay clicked');
            closeSidebar();
        });
        console.log('✅ Overlay listener added');
    }
    
    // Close sidebar with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
            console.log('⌨️ Escape key pressed');
            closeSidebar();
        }
    });
    console.log('✅ Escape key listener added');



    // Initial calendar render
    console.log('🚀 Calling initial renderCalendar()...');
    renderCalendar();
    
    console.log('🎉 Calendar initialization complete!');
});

console.log('📜 Script.js loaded successfully!');
