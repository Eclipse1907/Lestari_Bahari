// Visitor Counter System
class VisitorCounter {
    constructor() {
        this.storageKey = 'lestari_bahari_visitor_count';
        this.sessionKey = 'lestari_bahari_session';
        this.init();
    }

    init() {
        // Check if this is a new session
        if (!sessionStorage.getItem(this.sessionKey)) {
            this.incrementCounter();
            sessionStorage.setItem(this.sessionKey, 'true');
        }
        
        this.displayCounter();
    }

    incrementCounter() {
        let count = this.getCurrentCount();
        count++;
        localStorage.setItem(this.storageKey, count.toString());
        return count;
    }

    getCurrentCount() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? parseInt(stored, 10) : 0;
    }

    displayCounter() {
        const count = this.getCurrentCount();
        const counterElement = document.getElementById('visitor-count');
        
        if (counterElement) {
            // Animate the counter
            this.animateCounter(counterElement, 0, count, 1000);
        }
    }

    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = current.toLocaleString('id-ID');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    // Method to reset counter (for admin purposes)
    resetCounter() {
        localStorage.setItem(this.storageKey, '0');
        this.displayCounter();
    }

    // Method to get current count (for admin purposes)
    getCount() {
        return this.getCurrentCount();
    }
}

// Initialize visitor counter when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.visitorCounter = new VisitorCounter();
});

// Add some additional analytics
class SimpleAnalytics {
    constructor() {
        this.pageKey = 'lestari_bahari_page_views';
        this.init();
    }

    init() {
        this.trackPageView();
    }

    trackPageView() {
        const currentPage = window.location.pathname;
        const pageViews = this.getPageViews();
        
        if (!pageViews[currentPage]) {
            pageViews[currentPage] = 0;
        }
        
        pageViews[currentPage]++;
        localStorage.setItem(this.pageKey, JSON.stringify(pageViews));
    }

    getPageViews() {
        const stored = localStorage.getItem(this.pageKey);
        return stored ? JSON.parse(stored) : {};
    }

    getTotalPageViews() {
        const pageViews = this.getPageViews();
        return Object.values(pageViews).reduce((total, views) => total + views, 0);
    }
}

// Initialize analytics
document.addEventListener('DOMContentLoaded', function() {
    window.simpleAnalytics = new SimpleAnalytics();
});
