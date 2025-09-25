// Visitor Counter Script
// Hanya admin yang dapat melihat data pengunjung

class VisitorCounter {
    constructor() {
        this.storageKey = 'website_visitor_data';
        this.adminKey = 'admin_view_visitors';
        this.init();
    }

    init() {
        // Cek apakah ini kunjungan pertama kali
        if (!this.isReturningVisitor()) {
            this.incrementVisitorCount();
            this.setReturningVisitor();
        }
        
        // Tambahkan event listener untuk admin
        this.setupAdminControls();
    }

    isReturningVisitor() {
        return localStorage.getItem('has_visited') === 'true';
    }

    setReturningVisitor() {
        localStorage.setItem('has_visited', 'true');
    }

    incrementVisitorCount() {
        const data = this.getVisitorData();
        data.totalVisitors++;
        data.lastVisit = new Date().toISOString();
        data.visits.push({
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct',
            page: window.location.pathname
        });
        
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    getVisitorData() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            return JSON.parse(stored);
        }
        
        return {
            totalVisitors: 0,
            lastVisit: null,
            visits: [],
            createdAt: new Date().toISOString()
        };
    }

    setupAdminControls() {
        // Tambahkan tombol admin yang tersembunyi
        this.createAdminButton();
        
        // Tambahkan event listener untuk kombinasi tombol admin
        this.setupAdminKeyCombo();
    }

    createAdminButton() {
        // Cek apakah sudah ada tombol admin
        if (document.getElementById('admin-visitor-btn')) return;

        const adminBtn = document.createElement('button');
        adminBtn.id = 'admin-visitor-btn';
        adminBtn.innerHTML = '👁️ Visitor Stats';
        adminBtn.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
            background: #1f2937;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s;
            display: none;
        `;
        
        adminBtn.addEventListener('click', () => this.showVisitorStats());
        adminBtn.addEventListener('mouseenter', () => {
            adminBtn.style.opacity = '1';
        });
        adminBtn.addEventListener('mouseleave', () => {
            adminBtn.style.opacity = '0.7';
        });

        document.body.appendChild(adminBtn);
    }

    setupAdminKeyCombo() {
        let keySequence = [];
        const adminSequence = ['KeyA', 'KeyD', 'KeyM', 'KeyI', 'KeyN'];
        
        document.addEventListener('keydown', (e) => {
            keySequence.push(e.code);
            
            // Hanya simpan 5 tombol terakhir
            if (keySequence.length > adminSequence.length) {
                keySequence.shift();
            }
            
            // Cek apakah urutan tombol sesuai dengan admin sequence
            if (this.arraysEqual(keySequence, adminSequence)) {
                this.toggleAdminMode();
                keySequence = []; // Reset sequence
            }
        });
    }

    arraysEqual(a, b) {
        return a.length === b.length && a.every((val, index) => val === b[index]);
    }

    toggleAdminMode() {
        const adminBtn = document.getElementById('admin-visitor-btn');
        if (adminBtn) {
            adminBtn.style.display = adminBtn.style.display === 'none' ? 'block' : 'none';
        }
    }

    showVisitorStats() {
        const data = this.getVisitorData();
        const modal = this.createStatsModal(data);
        document.body.appendChild(modal);
    }

    createStatsModal(data) {
        const modal = document.createElement('div');
        modal.id = 'visitor-stats-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #666;
        `;
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        const statsHTML = `
            <h2 style="color: #1f2937; margin-bottom: 20px;">📊 Website Visitor Statistics</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #3b82f6;">${data.totalVisitors}</div>
                    <div style="color: #6b7280; font-size: 14px;">Total Visitors</div>
                </div>
                
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #10b981;">${data.visits.length}</div>
                    <div style="color: #6b7280; font-size: 14px;">Total Visits</div>
                </div>
                
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #f59e0b;">${this.getUniqueVisitors(data.visits)}</div>
                    <div style="color: #6b7280; font-size: 14px;">Unique Visitors</div>
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="color: #374151; margin-bottom: 10px;">📅 Recent Activity</h3>
                <div style="max-height: 200px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 6px;">
                    ${this.getRecentVisitsHTML(data.visits)}
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="color: #374151; margin-bottom: 10px;">📈 Page Views</h3>
                <div style="background: #f9fafb; padding: 15px; border-radius: 6px;">
                    ${this.getPageViewsHTML(data.visits)}
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="color: #374151; margin-bottom: 10px;">🔗 Traffic Sources</h3>
                <div style="background: #f9fafb; padding: 15px; border-radius: 6px;">
                    ${this.getTrafficSourcesHTML(data.visits)}
                </div>
            </div>

            <div style="text-align: center; margin-top: 20px;">
                <button onclick="this.closest('#visitor-stats-modal').remove()" 
                        style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                    Close
                </button>
                <button onclick="visitorCounter.exportData()" 
                        style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-left: 10px;">
                    Export Data
                </button>
                <button onclick="visitorCounter.clearData()" 
                        style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-left: 10px;">
                    Clear Data
                </button>
            </div>
        `;

        modalContent.appendChild(closeBtn);
        modalContent.innerHTML += statsHTML;
        modal.appendChild(modalContent);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        return modal;
    }

    getUniqueVisitors(visits) {
        const uniqueIPs = new Set();
        visits.forEach(visit => {
            // Simpan user agent sebagai identifier sederhana
            uniqueIPs.add(visit.userAgent.substring(0, 50));
        });
        return uniqueIPs.size;
    }

    getRecentVisitsHTML(visits) {
        const recentVisits = visits.slice(-10).reverse();
        return recentVisits.map(visit => `
            <div style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-size: 12px;">
                <div style="font-weight: bold; color: #374151;">
                    ${new Date(visit.timestamp).toLocaleString()}
                </div>
                <div style="color: #6b7280;">
                    Page: ${visit.page} | Source: ${visit.referrer}
                </div>
            </div>
        `).join('');
    }

    getPageViewsHTML(visits) {
        const pageCounts = {};
        visits.forEach(visit => {
            pageCounts[visit.page] = (pageCounts[visit.page] || 0) + 1;
        });

        return Object.entries(pageCounts)
            .sort(([,a], [,b]) => b - a)
            .map(([page, count]) => `
                <div style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #374151;">${page}</span>
                    <span style="font-weight: bold; color: #3b82f6;">${count}</span>
                </div>
            `).join('');
    }

    getTrafficSourcesHTML(visits) {
        const sources = {};
        visits.forEach(visit => {
            const source = visit.referrer === 'Direct' ? 'Direct' : 
                          visit.referrer.includes('google') ? 'Google' :
                          visit.referrer.includes('facebook') ? 'Facebook' :
                          visit.referrer.includes('twitter') ? 'Twitter' :
                          'Other';
            sources[source] = (sources[source] || 0) + 1;
        });

        return Object.entries(sources)
            .sort(([,a], [,b]) => b - a)
            .map(([source, count]) => `
                <div style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #374151;">${source}</span>
                    <span style="font-weight: bold; color: #10b981;">${count}</span>
                </div>
            `).join('');
    }

    exportData() {
        const data = this.getVisitorData();
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `visitor-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    clearData() {
        if (confirm('Are you sure you want to clear all visitor data? This action cannot be undone.')) {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem('has_visited');
            alert('Visitor data has been cleared.');
            location.reload();
        }
    }
}

// Inisialisasi visitor counter
const visitorCounter = new VisitorCounter();

// Tambahkan ke window object untuk akses global
window.visitorCounter = visitorCounter;
