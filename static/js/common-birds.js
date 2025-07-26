// Common Birds This Month - Dynamic Loading
class CommonBirdsManager {
    constructor() {
        this.container = document.getElementById('common-birds-container');
        this.monthDisplay = document.getElementById('month-display');
        this.lastUpdate = null;
        this.updateInterval = null;
        
        // Check for updates every hour
        this.startAutoUpdate();
        
        // Initial load
        this.loadCommonBirds();
    }
    
    async loadCommonBirds() {
        try {
            const response = await fetch('/api/common-birds');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.updateBirdsDisplay(data.birds, data.month);
            this.lastUpdate = new Date();
            
        } catch (error) {
            console.error('Error loading common birds:', error);
            // Keep existing display if API fails
        }
    }
    
    updateBirdsDisplay(birds, month) {
        if (!this.container) return;
        
        // Clear existing birds
        this.container.innerHTML = '';
        
        // Add new birds
        birds.forEach(bird => {
            const birdElement = this.createBirdElement(bird);
            this.container.appendChild(birdElement);
        });
        
        // Update month display
        if (this.monthDisplay) {
            this.monthDisplay.textContent = month;
        }
    }
    
    createBirdElement(bird) {
        const birdDiv = document.createElement('div');
        birdDiv.className = 'bird';
        
        const img = document.createElement('img');
        img.src = `/images/${bird.image}`;
        img.alt = bird.name;
        img.loading = 'lazy'; // Lazy loading for better performance
        
        const nameP = document.createElement('p');
        nameP.textContent = bird.name;
        
        birdDiv.appendChild(img);
        birdDiv.appendChild(nameP);
        
        return birdDiv;
    }
    
    startAutoUpdate() {
        // Check for updates every hour (3600000 ms)
        this.updateInterval = setInterval(() => {
            this.loadCommonBirds();
        }, 3600000);
    }
    
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
    
    // Manual refresh method
    refresh() {
        this.loadCommonBirds();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the home page
    if (document.getElementById('common-birds-container')) {
        window.commonBirdsManager = new CommonBirdsManager();
    }
});

// Add refresh capability to window for debugging
window.refreshCommonBirds = function() {
    if (window.commonBirdsManager) {
        window.commonBirdsManager.refresh();
    }
}; 