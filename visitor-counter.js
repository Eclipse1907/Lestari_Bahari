// Enhanced Visitor Counter System
class VisitorCounter {
    constructor() {
        this.storageKey = 'lestari_bahari_visitor_count';
        this.sessionKey = 'lestari_bahari_session';
        this.uniqueVisitorKey = 'lestari_bahari_unique_visitors';
        this.lastVisitKey = 'lestari_bahari_last_visit';
        this.init();
    }

    init() {
        // Check if this is a new session
        if (!sessionStorage.getItem(this.sessionKey)) {
            this.incrementCounter();
            this.trackUniqueVisitor();
            sessionStorage.setItem(this.sessionKey, 'true');
        }
        
        this.updateLastVisit();
        this.displayCounter();
    }

    incrementCounter() {
        let count = this.getCurrentCount();
        count++;
        localStorage.setItem(this.storageKey, count.toString());
        
        // Also update the last visit time
        this.updateLastVisit();
        
        return count;
    }

    trackUniqueVisitor() {
        const uniqueVisitors = this.getUniqueVisitors();
        const visitorId = this.generateVisitorId();
        
        if (!uniqueVisitors.includes(visitorId)) {
            uniqueVisitors.push(visitorId);
            localStorage.setItem(this.uniqueVisitorKey, JSON.stringify(uniqueVisitors));
        }
    }

    generateVisitorId() {
        // Generate a simple visitor ID based on browser fingerprint
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Visitor ID', 2, 2);
        
        const fingerprint = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset(),
            canvas.toDataURL()
        ].join('|');
        
        // Simple hash function
        let hash = 0;
        for (let i = 0; i < fingerprint.length; i++) {
            const char = fingerprint.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        return Math.abs(hash).toString(36);
    }

    getUniqueVisitors() {
        const stored = localStorage.getItem(this.uniqueVisitorKey);
        return stored ? JSON.parse(stored) : [];
    }

    getCurrentCount() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? parseInt(stored, 10) : 0;
    }

    updateLastVisit() {
        const now = new Date().toISOString();
        localStorage.setItem(this.lastVisitKey, now);
    }

    getLastVisit() {
        const stored = localStorage.getItem(this.lastVisitKey);
        return stored ? new Date(stored) : null;
    }

    displayCounter() {
        const count = this.getCurrentCount();
        const counterElement = document.getElementById('visitor-count');
        
        if (counterElement) {
            // Animate the counter
            this.animateCounter(counterElement, 0, count, 1500);
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
        localStorage.setItem(this.uniqueVisitorKey, '[]');
        this.displayCounter();
    }

    // Method to get current count (for admin purposes)
    getCount() {
        return this.getCurrentCount();
    }

    // Method to get unique visitor count
    getUniqueVisitorCount() {
        return this.getUniqueVisitors().length;
    }

    // Method to get visitor statistics
    getStats() {
        return {
            totalVisits: this.getCurrentCount(),
            uniqueVisitors: this.getUniqueVisitorCount(),
            lastVisit: this.getLastVisit()
        };
    }
}

// Initialize visitor counter when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.visitorCounter = new VisitorCounter();
});

// Enhanced Analytics System
class SimpleAnalytics {
    constructor() {
        this.pageKey = 'lestari_bahari_page_views';
        this.dailyStatsKey = 'lestari_bahari_daily_stats';
        this.init();
    }

    init() {
        this.trackPageView();
        this.updateDailyStats();
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

    updateDailyStats() {
        const today = new Date().toDateString();
        const dailyStats = this.getDailyStats();
        
        if (!dailyStats[today]) {
            dailyStats[today] = {
                visits: 0,
                pages: {},
                timestamp: new Date().toISOString()
            };
        }
        
        dailyStats[today].visits++;
        
        const currentPage = window.location.pathname;
        if (!dailyStats[today].pages[currentPage]) {
            dailyStats[today].pages[currentPage] = 0;
        }
        dailyStats[today].pages[currentPage]++;
        
        localStorage.setItem(this.dailyStatsKey, JSON.stringify(dailyStats));
    }

    getPageViews() {
        const stored = localStorage.getItem(this.pageKey);
        return stored ? JSON.parse(stored) : {};
    }

    getDailyStats() {
        const stored = localStorage.getItem(this.dailyStatsKey);
        return stored ? JSON.parse(stored) : {};
    }

    getTotalPageViews() {
        const pageViews = this.getPageViews();
        return Object.values(pageViews).reduce((total, views) => total + views, 0);
    }

    getTodayStats() {
        const today = new Date().toDateString();
        const dailyStats = this.getDailyStats();
        return dailyStats[today] || { visits: 0, pages: {} };
    }

    getWeeklyStats() {
        const dailyStats = this.getDailyStats();
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        const weeklyStats = {};
        Object.keys(dailyStats).forEach(date => {
            const dateObj = new Date(date);
            if (dateObj >= weekAgo) {
                weeklyStats[date] = dailyStats[date];
            }
        });
        
        return weeklyStats;
    }
}

// Initialize analytics
document.addEventListener('DOMContentLoaded', function() {
    window.simpleAnalytics = new SimpleAnalytics();
});

// Add a global function to get visitor statistics
window.getVisitorStats = function() {
    if (window.visitorCounter && window.simpleAnalytics) {
        return {
            ...window.visitorCounter.getStats(),
            totalPageViews: window.simpleAnalytics.getTotalPageViews(),
            todayStats: window.simpleAnalytics.getTodayStats(),
            weeklyStats: window.simpleAnalytics.getWeeklyStats()
        };
    }
    return null;
};

// Add a function to manually increment counter (for testing)
window.incrementVisitorCounter = function() {
    if (window.visitorCounter) {
        window.visitorCounter.incrementCounter();
        window.visitorCounter.displayCounter();
    }
};

// Add a function to reset all counters (for admin)
window.resetAllCounters = function() {
    if (window.visitorCounter) {
        window.visitorCounter.resetCounter();
    }
    localStorage.removeItem('lestari_bahari_page_views');
    localStorage.removeItem('lestari_bahari_daily_stats');
    console.log('All counters have been reset');
};
