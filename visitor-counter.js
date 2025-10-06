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
            this.setSessionStart();
            sessionStorage.setItem(this.sessionKey, 'true');
        }
        
        this.updateLastVisit();
        this.updateDailyStats();
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
            lastVisit: this.getLastVisit(),
            dailyStats: this.getDailyVisitorStats(),
            sessionDuration: this.getSessionDuration()
        };
    }

    // Method to get daily visitor statistics
    getDailyVisitorStats() {
        const dailyStats = this.getDailyStats();
        const today = new Date().toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        return {
            today: dailyStats[today] || { visits: 0, uniqueVisitors: 0, avgDuration: 0 },
            yesterday: dailyStats[yesterdayStr] || { visits: 0, uniqueVisitors: 0, avgDuration: 0 },
            last7Days: this.getLast7DaysStats(),
            allTime: this.getAllTimeStats()
        };
    }

    // Method to get daily stats
    getDailyStats() {
        const stored = localStorage.getItem('lestari_bahari_daily_visitor_stats');
        return stored ? JSON.parse(stored) : {};
    }

    // Method to update daily stats
    updateDailyStats() {
        try {
            const today = new Date().toDateString();
            const dailyStats = this.getDailyStats();

            if (!dailyStats[today]) {
                dailyStats[today] = {
                    visits: 0,
                    uniqueVisitors: [],
                    durations: [],
                    timestamp: new Date().toISOString()
                };
            }

            // Ensure uniqueVisitors is a Set in-memory for safe .add()
            const existingUnique = dailyStats[today].uniqueVisitors;
            let uniqueSet;
            if (existingUnique instanceof Set) {
                uniqueSet = existingUnique;
            } else if (Array.isArray(existingUnique)) {
                uniqueSet = new Set(existingUnique);
            } else if (existingUnique && typeof existingUnique === 'object' && typeof existingUnique.add === 'function') {
                // Any set-like object
                uniqueSet = existingUnique;
            } else if (existingUnique && typeof existingUnique === 'object') {
                // In case of accidental object storage
                uniqueSet = new Set(Object.values(existingUnique));
            } else {
                uniqueSet = new Set();
            }

            // Increment visits
            dailyStats[today].visits = (dailyStats[today].visits || 0) + 1;

            // Add unique visitor
            const visitorId = this.generateVisitorId();
            uniqueSet.add(visitorId);

            // Track session duration
            const sessionStart = this.getSessionStart();
            if (sessionStart) {
                const duration = Date.now() - sessionStart;
                if (!Array.isArray(dailyStats[today].durations)) {
                    dailyStats[today].durations = [];
                }
                dailyStats[today].durations.push(duration);
            }

            // Save back with Array (storage-friendly)
            const statsToStore = { ...dailyStats };
            statsToStore[today] = {
                ...statsToStore[today],
                uniqueVisitors: Array.from(uniqueSet)
            };

            localStorage.setItem('lestari_bahari_daily_visitor_stats', JSON.stringify(statsToStore));
        } catch (error) {
            console.error('Error updating daily stats:', error);
        }
    }

    // Method to get session start time
    getSessionStart() {
        const stored = sessionStorage.getItem('lestari_bahari_session_start');
        return stored ? parseInt(stored, 10) : null;
    }

    // Method to set session start time
    setSessionStart() {
        sessionStorage.setItem('lestari_bahari_session_start', Date.now().toString());
    }

    // Method to get current session duration
    getSessionDuration() {
        const sessionStart = this.getSessionStart();
        if (sessionStart) {
            return Date.now() - sessionStart;
        }
        return 0;
    }

    // Method to get last 7 days statistics
    getLast7DaysStats() {
        const dailyStats = this.getDailyStats();
        const last7Days = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            const dayStats = dailyStats[dateStr];
            
            if (dayStats) {
                const avgDuration = dayStats.durations && dayStats.durations.length > 0 
                    ? dayStats.durations.reduce((a, b) => a + b, 0) / dayStats.durations.length 
                    : 0;
                
                last7Days.push({
                    date: dateStr,
                    visits: dayStats.visits,
                    uniqueVisitors: dayStats.uniqueVisitors ? dayStats.uniqueVisitors.length : 0,
                    avgDuration: Math.round(avgDuration / 1000) // Convert to seconds
                });
            } else {
                last7Days.push({
                    date: dateStr,
                    visits: 0,
                    uniqueVisitors: 0,
                    avgDuration: 0
                });
            }
        }
        
        return last7Days;
    }

    // Method to get all time statistics
    getAllTimeStats() {
        const dailyStats = this.getDailyStats();
        let totalVisits = 0;
        let totalUniqueVisitors = 0;
        let totalDuration = 0;
        let totalSessions = 0;
        
        Object.values(dailyStats).forEach(dayStats => {
            totalVisits += dayStats.visits || 0;
            totalUniqueVisitors += dayStats.uniqueVisitors ? dayStats.uniqueVisitors.length : 0;
            if (dayStats.durations) {
                totalDuration += dayStats.durations.reduce((a, b) => a + b, 0);
                totalSessions += dayStats.durations.length;
            }
        });
        
        return {
            totalVisits,
            totalUniqueVisitors,
            avgDuration: totalSessions > 0 ? Math.round(totalDuration / totalSessions / 1000) : 0,
            totalSessions
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
    localStorage.removeItem('lestari_bahari_daily_visitor_stats');
    console.log('All counters have been reset');
};

// Add function to show detailed visitor statistics
window.showVisitorStats = function() {
    if (!window.visitorCounter) return;
    
    const stats = window.visitorCounter.getStats();
    const dailyStats = stats.dailyStats;
    const currentDuration = Math.round(stats.sessionDuration / 1000);
    
    // Create modal HTML
    const modalHTML = `
        <div id="visitor-stats-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Statistik Pengunjung</h2>
                        <button onclick="closeVisitorStats()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                    </div>
                    
                    <!-- Current Session -->
                    <div class="bg-blue-50 p-4 rounded-lg mb-6">
                        <h3 class="text-lg font-semibold text-blue-800 mb-2">Sesi Saat Ini</h3>
                        <p class="text-blue-600">Durasi: ${formatDuration(currentDuration)}</p>
                    </div>
                    
                    <!-- Today's Stats -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-green-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-green-800">Hari Ini</h4>
                            <p class="text-2xl font-bold text-green-600">${dailyStats.today.visits}</p>
                            <p class="text-sm text-green-600">Kunjungan</p>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-blue-800">Kemarin</h4>
                            <p class="text-2xl font-bold text-blue-600">${dailyStats.yesterday.visits}</p>
                            <p class="text-sm text-blue-600">Kunjungan</p>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-purple-800">Total</h4>
                            <p class="text-2xl font-bold text-purple-600">${stats.totalVisits.toLocaleString('id-ID')}</p>
                            <p class="text-sm text-purple-600">Kunjungan</p>
                        </div>
                    </div>
                    
                    <!-- Last 7 Days Chart -->
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">7 Hari Terakhir</h3>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="grid grid-cols-7 gap-2">
                                ${dailyStats.last7Days.map(day => `
                                    <div class="text-center">
                                        <div class="text-xs text-gray-600 mb-1">${new Date(day.date).toLocaleDateString('id-ID', {weekday: 'short'})}</div>
                                        <div class="bg-blue-200 rounded h-16 flex items-end justify-center" style="height: ${Math.max(16, (day.visits / Math.max(...dailyStats.last7Days.map(d => d.visits), 1)) * 64)}px">
                                            <span class="text-xs font-semibold text-blue-800">${day.visits}</span>
                                        </div>
                                        <div class="text-xs text-gray-500 mt-1">${formatDuration(day.avgDuration)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- All Time Stats -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-800 mb-2">Statistik Keseluruhan</h4>
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span>Total Kunjungan:</span>
                                    <span class="font-semibold">${dailyStats.allTime.totalVisits.toLocaleString('id-ID')}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Pengunjung Unik:</span>
                                    <span class="font-semibold">${dailyStats.allTime.totalUniqueVisitors.toLocaleString('id-ID')}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Rata-rata Durasi:</span>
                                    <span class="font-semibold">${formatDuration(dailyStats.allTime.avgDuration)}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Total Sesi:</span>
                                    <span class="font-semibold">${dailyStats.allTime.totalSessions.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-800 mb-2">Informasi Sesi</h4>
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span>Kunjungan Terakhir:</span>
                                    <span class="font-semibold">${stats.lastVisit ? new Date(stats.lastVisit).toLocaleString('id-ID') : 'Tidak ada'}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Pengunjung Unik Hari Ini:</span>
                                    <span class="font-semibold">${dailyStats.today.uniqueVisitors || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

// Function to close visitor stats modal
window.closeVisitorStats = function() {
    const modal = document.getElementById('visitor-stats-modal');
    if (modal) {
        modal.remove();
    }
};

// Function to format duration in seconds to readable format
function formatDuration(seconds) {
    if (seconds < 60) {
        return `${seconds} detik`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}j ${minutes}m`;
    }
}
