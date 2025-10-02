class AnalogClock {
    constructor() {
        this.hourHand = document.getElementById('hour-hand');
        this.minHand = document.getElementById('min-hand');
        this.secHand = document.getElementById('sec-hand');
        this.digitalTime = document.getElementById('digital-time');
        
        this.startClock();
    }
    
    updateClock() {
        const now = new Date();
        
        // Get current time with milliseconds for smooth movement
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();
        
        // Calculate smooth rotations
        const smoothSeconds = seconds + milliseconds / 1000;
        const smoothMinutes = minutes + smoothSeconds / 60;
        const smoothHours = (hours % 12) + smoothMinutes / 60;
        
        // Convert to degrees
        const hourDeg = smoothHours * 30; // 30 degrees per hour
        const minDeg = smoothMinutes * 6; // 6 degrees per minute
        const secDeg = smoothSeconds * 6; // 6 degrees per second
        
        // Apply rotations
        this.hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
        this.minHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
        this.secHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
        
        // Update digital time
        this.updateDigitalTime(hours, minutes, seconds);
    }
    
    updateDigitalTime(hours, minutes, seconds) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        const displaySeconds = seconds.toString().padStart(2, '0');
        
        this.digitalTime.textContent = `${displayHours}:${displayMinutes}:${displaySeconds} ${ampm}`;
    }
    
    startClock() {
        // Update immediately
        this.updateClock();
        
        // Update continuously for smooth animation
        requestAnimationFrame(() => this.startClock());
    }
}

// Initialize the clock when page loads
document.addEventListener('DOMContentLoaded', () => {
    new AnalogClock();
});