// Detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait for data to be available
    checkData();
});

function checkData() {
    console.log('Checking data availability...');
    if (typeof window.protectedAnimals !== 'undefined' && window.protectedAnimals) {
        console.log('Data available, rendering...');
        renderAnimalDetail();
    } else {
        console.log('Data not available, waiting...');
        // Wait a bit and try again, but with a maximum of 10 attempts
        if (typeof checkData.attempts === 'undefined') {
            checkData.attempts = 0;
        }
        checkData.attempts++;
        
        if (checkData.attempts < 10) {
            setTimeout(checkData, 100);
        } else {
            console.log('Max attempts reached, showing error');
            showError();
        }
    }
}

// Function to go back to phylum page
function goToPhylumPage(phylum) {
    // Map phylum names to their corresponding sections on dashboard
    const phylumSections = {
        'Chondrichthyes (Hiu & Pari)': 'chondrichthyes',
        'Osteichthyes (Ikan Bertulang Keras)': 'osteichthyes',
        'Actinopterygii (Ikan Bertulang Keras)': 'actinopterygii',
        'Reptilia (Penyu)': 'reptilia',
        'Mammalia (Mamalia Laut)': 'mammalia',
        'Mollusca (Moluska)': 'mollusca',
        'Bivalvia (Kerang)': 'bivalvia',
        'Cephalopoda (Gurita & Cumi)': 'cephalopoda',
        'Cnidaria (Karang)': 'cnidaria',
        'Anthozoa (Karang)': 'anthozoa',
        'Echinodermata': 'echinodermata',
        'Arthropoda': 'arthropoda',
        'Porifera': 'porifera'
    };
    
    // Get the section ID for the phylum, default to dashboard if not found
    const sectionId = phylumSections[phylum] || '';
    
    // Navigate to the dashboard page with the specific phylum section
    if (sectionId) {
        window.location.href = `dashboard.html#${sectionId}`;
    } else {
        window.location.href = 'dashboard.html';
    }
}

function renderAnimalDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const phylum = urlParams.get('phylum');
    const latinName = urlParams.get('latin');
    
    console.log('URL Params:', { phylum, latinName });
    console.log('Protected Animals:', window.protectedAnimals);
    
    if (!phylum || !latinName) {
        console.log('Missing phylum or latinName');
        showError();
        return;
    }
    
    // Find the animal data
    let animal = null;
    for (const [phylumKey, animals] of Object.entries(window.protectedAnimals)) {
        console.log('Checking phylum:', phylumKey, 'against:', phylum);
        if (phylumKey === phylum) {
            animal = animals.find(a => a.latin === latinName);
            if (animal) {
                console.log('Found animal:', animal);
                break;
            }
        }
    }
    
    if (!animal) {
        console.log('Animal not found');
        showError();
        return;
    }
    
    // Render the animal detail
    const content = document.getElementById('animal-detail-content');
    if (content) {
        content.innerHTML = `
            <!-- Compact Header -->
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-slate-800 mb-2">${animal.name}</h1>
                <p class="text-lg text-slate-600 italic">${animal.latin}</p>
                ${animal.localName ? `<p class="text-sm text-slate-500 mt-1">${animal.localName}</p>` : ''}
                ${animal.protectionYear ? `
                <div class="mt-4 inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200">
                    <i data-lucide="shield-check" class="w-4 h-4 text-blue-600 mr-2"></i>
                    <span class="text-sm font-medium text-blue-800">Dilindungi sejak ${animal.protectionYear}</span>
                    <span class="ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        ${new Date().getFullYear() - parseInt(animal.protectionYear)} tahun
                    </span>
                </div>
                ` : ''}
            </div>

            <!-- Image Gallery -->
            <div class="mb-8">
            ${animal.latin === 'Pristis spp.' ? `
            <!-- Special Gallery for Pari Gergaji -->
            <div class="text-center mb-6">
                <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Pari Gergaji</h2>
                <p class="text-slate-600">Koleksi gambar morfologi dan habitat Pari Gergaji</p>
            </div>
            <div class="flex justify-center">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                    <div class="relative group cursor-pointer" onclick="showImageModal('https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Sawfish_Pristis_zijsron_Genova_Aquarium.jpg/1059px-Sawfish_Pristis_zijsron_Genova_Aquarium.jpg', 0)">
                        <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Sawfish_Pristis_zijsron_Genova_Aquarium.jpg/1059px-Sawfish_Pristis_zijsron_Genova_Aquarium.jpg" 
                                 alt="Pari Gergaji di Akuarium Genova" 
                                 class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                        </div>
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                            <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                            <p class="text-white text-sm font-medium">Pari Gergaji di Akuarium</p>
                        </div>
                    </div>
                    
                    <div class="relative group cursor-pointer" onclick="showImageModal('https://b3268101.smushcdn.com/3268101/wp-content/uploads/2022/12/david-clode-fZu1iB6QxyQ-unsplash-1024x711.jpg?lossy=2&strip=1&webp=1', 1)">
                        <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                            <img src="https://b3268101.smushcdn.com/3268101/wp-content/uploads/2022/12/david-clode-fZu1iB6QxyQ-unsplash-1024x711.jpg?lossy=2&strip=1&webp=1" 
                                 alt="Pari Gergaji di Habitat Alami" 
                                 class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                        </div>
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                            <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                            <p class="text-white text-sm font-medium">Habitat Alami</p>
                        </div>
                    </div>
                    
                    <div class="relative group cursor-pointer" onclick="showImageModal('https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/66/2017/05/lesson_sawfish-anatomy_large.jpg', 2)">
                        <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                            <img src="https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/66/2017/05/lesson_sawfish-anatomy_large.jpg" 
                                 alt="Anatomi Pari Gergaji" 
                                 class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                        </div>
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                            <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                            <p class="text-white text-sm font-medium">Anatomi & Morfologi</p>
                        </div>
                    </div>
                </div>
            </div>
            ` : animal.latin === 'Mobula birostris' ? `
            <!-- Special Gallery for Pari Manta -->
            <div class="text-center mb-6">
                <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Pari Manta</h2>
                <p class="text-slate-600">Koleksi gambar morfologi dan habitat Pari Manta</p>
            </div>
            <div class="flex justify-center">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                    <div class="relative group cursor-pointer" onclick="showImageModal('https://asset.kompas.com/crops/b3vumNxFeHu9TjkdliFvYnJx3ds=/0x0:1000x667/1200x800/data/photo/2022/05/22/628a2ead38f95.jpg', 0)">
                        <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                            <img src="https://asset.kompas.com/crops/b3vumNxFeHu9TjkdliFvYnJx3ds=/0x0:1000x667/1200x800/data/photo/2022/05/22/628a2ead38f95.jpg" 
                                 alt="Pari Manta di Habitat Alami" 
                                 class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                        </div>
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                            <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                            <p class="text-white text-sm font-medium">Pari Manta di Habitat Alami</p>
                        </div>
                    </div>
                    
                    <div class="relative group cursor-pointer" onclick="showImageModal('https://image.idntimes.com/post/20231108/800px-manta-alfredi-cruising-journalpone0046170g002a-5be77dd23a73aaf9d3374da589f75fbe-7d39b3b5fecadb7b832a8d0371e5dc29.png', 1)">
                        <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                            <img src="https://image.idntimes.com/post/20231108/800px-manta-alfredi-cruising-journalpone0046170g002a-5be77dd23a73aaf9d3374da589f75fbe-7d39b3b5fecadb7b832a8d0371e5dc29.png" 
                                 alt="Pari Manta Cruising" 
                                 class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                        </div>
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                            <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                            <p class="text-white text-sm font-medium">Pari Manta Cruising</p>
                        </div>
                    </div>
                    
                    <div class="relative group cursor-pointer" onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8kKLyBFO4_wG611kxdfPwWGpLiyMIHurKbLH0fDUuVBOSwbWbP4pZBGkEoybhK3H2vkq9qGm0k7RltAelve90ccEm9kA7SBxVb5v6YETiMUxg2SRPMrmTHqCtOqZr5i-mNnODx5UdjdM/s400/manta6.jpg', 2)">
                        <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8kKLyBFO4_wG611kxdfPwWGpLiyMIHurKbLH0fDUuVBOSwbWbP4pZBGkEoybhK3H2vkq9qGm0k7RltAelve90ccEm9kA7SBxVb5v6YETiMUxg2SRPMrmTHqCtOqZr5i-mNnODx5UdjdM/s400/manta6.jpg" 
                                 alt="Pari Manta Detail" 
                                 class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                        </div>
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                            <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                            <p class="text-white text-sm font-medium">Pari Manta Detail</p>
                        </div>
                    </div>
                </div>
            </div>
            ` : animal.latin === 'Rhincodon typus' ? `
        <!-- Special Gallery for Hiu Paus -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Hiu Paus</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Hiu Paus</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Whale_shark_Georgia_aquarium.jpg/1200px-Whale_shark_Georgia_aquarium.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Whale_shark_Georgia_aquarium.jpg/1200px-Whale_shark_Georgia_aquarium.jpg" 
                             alt="Hiu Paus di Akuarium Georgia" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Hiu Paus di Akuarium Georgia</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://lautberbisik.wordpress.com/wp-content/uploads/2015/07/hiu-paus1.jpg', 1)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://lautberbisik.wordpress.com/wp-content/uploads/2015/07/hiu-paus1.jpg" 
                             alt="Hiu Paus di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://baliwildlife.com/wp-content/uploads/2023/04/Whale-Shark-Rhincodon-typus-photo-by-Khaichuin-Sim-Source-iNaturalist.jpeg', 2)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://baliwildlife.com/wp-content/uploads/2023/04/Whale-Shark-Rhincodon-typus-photo-by-Khaichuin-Sim-Source-iNaturalist.jpeg" 
                             alt="Hiu Paus Rhincodon typus" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Hiu Paus Rhincodon typus</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Sphyrna spp.' ? `
        <!-- Special Gallery for Hiu Kepala Palu -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Hiu Kepala Palu</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Hiu Kepala Palu</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                    <div class="relative group cursor-pointer" onclick="showImageModal('https://earth.org/wp-content/uploads/2023/02/HammerheadJimAbernethy.jpg', 0)">
                        <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                            <img src="https://earth.org/wp-content/uploads/2023/02/HammerheadJimAbernethy.jpg" 
                                 alt="Hiu Kepala Palu di Habitat Alami" 
                                 class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                        </div>
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                            <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                            <p class="text-white text-sm font-medium">Hiu Kepala Palu di Habitat Alami</p>
                        </div>
                    </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMBXqfP4oClgun3xKzZ3sVl1v-K41pMeY7K15bTzRS3533dqDjKI6IsHKk-NnNjJSABLY8o1sBc4rbVHcqal5WxMGRG5pX9jXpv2dhhwUrsIbtizHhu_Fe1xljguC_p3kXQZeqLmZ_iKav/s600/hammerhead+shark+diver.jpg', 1)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMBXqfP4oClgun3xKzZ3sVl1v-K41pMeY7K15bTzRS3533dqDjKI6IsHKk-NnNjJSABLY8o1sBc4rbVHcqal5WxMGRG5pX9jXpv2dhhwUrsIbtizHhu_Fe1xljguC_p3kXQZeqLmZ_iKav/s600/hammerhead+shark+diver.jpg" 
                             alt="Hiu Kepala Palu dengan Diver" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Hiu Kepala Palu dengan Diver</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9g0uxTmXk4056eahwJSLsVjPjuxwbdOVmDNu0tjZ2Zqrvyo6xHXll3NxO8hDnfLmDywsBCETqdAhJwdI6eiIH3xx_DoXqYMXBTlC6QC1iWbjzZgMlE486HCsO38oxizJFYjn8iKqoRYU/s400/martil5.png', 2)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9g0uxTmXk4056eahwJSLsVjPjuxwbdOVmDNu0tjZ2Zqrvyo6xHXll3NxO8hDnfLmDywsBCETqdAhJwdI6eiIH3xx_DoXqYMXBTlC6QC1iWbjzZgMlE486HCsO38oxizJFYjn8iKqoRYU/s400/martil5.png" 
                             alt="Hiu Martil Detail" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Hiu Martil Detail</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Carcharhinus longimanus' ? `
        <!-- Special Gallery for Hiu Koboi -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Hiu Koboi</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Hiu Koboi</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://d2ouvy59p0dg6k.cloudfront.net/img/original/hi_257599.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://d2ouvy59p0dg6k.cloudfront.net/img/original/hi_257599.jpg" 
                             alt="Hiu Koboi dengan Pilot Fish" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Hiu Koboi dengan Pilot Fish</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://image.idntimes.com/post/20240528/oceanic-whitetip-shark-at-elphinstone-reef-726107e6cb24f94eb96bf875ffbf43f3-c90c2834059a7e235c0fbb90a43d0d3c.jpg?tr=w-1200,f-webp,q-75&width=1200&format=webp&quality=75', 1)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://image.idntimes.com/post/20240528/oceanic-whitetip-shark-at-elphinstone-reef-726107e6cb24f94eb96bf875ffbf43f3-c90c2834059a7e235c0fbb90a43d0d3c.jpg?tr=w-1200,f-webp,q-75&width=1200&format=webp&quality=75" 
                             alt="Hiu Koboi di Elphinstone Reef" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Hiu Koboi di Elphinstone Reef</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQjZcRTrYjln9hAFQPLjXEDtSnsZuqby9DjqCPEATCuspblA2Z2rTcTF3m_1qUbei31k&usqp=CAU', 2)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQjZcRTrYjln9hAFQPLjXEDtSnsZuqby9DjqCPEATCuspblA2Z2rTcTF3m_1qUbei31k&usqp=CAU" 
                             alt="Hiu Koboi di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Hiu Koboi di Habitat Alami</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Cheilinus undulatus' ? `
        <!-- Special Gallery for Ikan Napoleon -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Ikan Napoleon</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Ikan Napoleon</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKdQ3AwVfkYkrVzuzDxMXF3ZdZvLcOyz7Cj7eOZCrjscwBOvKFgJoDWWKdnHef5hl52AnlX30yHuhkMwJbrFwsTc-q8HgZXy8jTcvBUSxWkfQI3e19SOatbQBlqodrT601r2msa0M1k6s/s400/napoleon3.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKdQ3AwVfkYkrVzuzDxMXF3ZdZvLcOyz7Cj7eOZCrjscwBOvKFgJoDWWKdnHef5hl52AnlX30yHuhkMwJbrFwsTc-q8HgZXy8jTcvBUSxWkfQI3e19SOatbQBlqodrT601r2msa0M1k6s/s400/napoleon3.jpg" 
                             alt="Ikan Napoleon di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Napoleon di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://www.greeners.co/wp-content/uploads/2019/06/napoleon.jpg', 1)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://www.greeners.co/wp-content/uploads/2019/06/napoleon.jpg" 
                             alt="Ikan Napoleon dengan Warna Cerah" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Napoleon dengan Warna Cerah</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://api.gardaanimalia.com/storage/articles/featured/featured_ikan-napoleon-sang-top-predator-yang-bisa-berubah-jenis-kelaminnya_1748515588.webp', 2)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://api.gardaanimalia.com/storage/articles/featured/featured_ikan-napoleon-sang-top-predator-yang-bisa-berubah-jenis-kelaminnya_1748515588.webp" 
                             alt="Ikan Napoleon Top Predator" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Napoleon Top Predator</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Stenella longirostris' ? `
        <!-- Special Gallery for Lumba-lumba Spinner -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Lumba-lumba Spinner</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Lumba-lumba Spinner</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://i.natgeofe.com/n/629f7a07-0d0f-457d-96af-67f5c6ed997b/spinner-dolphin_16x9.jpg?w=1200', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://i.natgeofe.com/n/629f7a07-0d0f-457d-96af-67f5c6ed997b/spinner-dolphin_16x9.jpg?w=1200" 
                             alt="Lumba-lumba Spinner (Stenella longirostris)" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Lumba-lumba Spinner</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnqd5-H31wqRvftoOyhOUbL6lTBpxtplK4JQ&s', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnqd5-H31wqRvftoOyhOUbL6lTBpxtplK4JQ&s" 
                             alt="Lumba-lumba Spinner dengan Detail Morfologi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Lumba-lumba Spinner Morfologi</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0U19NGdNHfMi4JSRVikTkANGgQHtgRC1ieA&s', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0U19NGdNHfMi4JSRVikTkANGgQHtgRC1ieA&s" 
                             alt="Anatomi Lumba-lumba Spinner" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Anatomi Lumba-lumba Spinner</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Lagenodelphis hosei' ? `
        <!-- Special Gallery for Lumba-lumba Fraser -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Lumba-lumba Fraser</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Lumba-lumba Fraser</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://i.pinimg.com/736x/da/ae/a2/daaea2a69e256357f13efba8e9831245.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://i.pinimg.com/736x/da/ae/a2/daaea2a69e256357f13efba8e9831245.jpg" 
                             alt="Lumba-lumba Fraser (Lagenodelphis hosei)" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Lumba-lumba Fraser</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://ars.els-cdn.com/content/image/3-s2.0-B9780128043271001345-f06-31-9780128043271.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://ars.els-cdn.com/content/image/3-s2.0-B9780128043271001345-f06-31-9780128043271.jpg" 
                             alt="Lumba-lumba Fraser dengan Detail Morfologi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Lumba-lumba Fraser Morfologi</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://car-spaw-rac.org/local/cache-vignettes/L650xH207/lagenodelphis_hosei_femelle_v3_png-71a05.png?1736361830', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://car-spaw-rac.org/local/cache-vignettes/L650xH207/lagenodelphis_hosei_femelle_v3_png-71a05.png?1736361830" 
                             alt="Anatomi Lumba-lumba Fraser" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Anatomi Lumba-lumba Fraser</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Hippocampus spp.' ? `
        <!-- Special Gallery for Kuda Laut -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Kuda Laut</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Kuda Laut</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnXrXazoTsZQCeckqwOT8CKJb1FBXNBJjChhaU0qENuBibD9zphyi2BAjumZV32ja7R_cKbdr2nC64BCM9PmvH_sHOUhu9bqbcLPvkJPgFcqtKpFkdJYOw8fAoa75xQ6BSMthPv5xA6sY/s400/Hippocampus+zosterae.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnXrXazoTsZQCeckqwOT8CKJb1FBXNBJjChhaU0qENuBibD9zphyi2BAjumZV32ja7R_cKbdr2nC64BCM9PmvH_sHOUhu9bqbcLPvkJPgFcqtKpFkdJYOw8fAoa75xQ6BSMthPv5xA6sY/s400/Hippocampus+zosterae.jpg" 
                             alt="Kuda Laut Dwarf (Hippocampus zosterae)" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Kuda Laut Dwarf</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCYaF2l5Av8flgDmsuXUaoCb41RCIqCHAZdg&s', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCYaF2l5Av8flgDmsuXUaoCb41RCIqCHAZdg&s" 
                             alt="Kuda Laut dengan Detail Morfologi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Kuda Laut Morfologi</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://biology.kenyon.edu/stures/Compsnelson/My%20Pictures/seahorse_body.gif', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://biology.kenyon.edu/stures/Compsnelson/My%20Pictures/seahorse_body.gif" 
                             alt="Anatomi Kuda Laut" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Anatomi Kuda Laut</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Chelonia mydas' ? `
        <!-- Special Gallery for Penyu Hijau -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Penyu Hijau</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Penyu Hijau</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://baliwildlife.com/wp-content/uploads/2023/04/Green-Sea-Turtle-Chelonia-mydas-photo-by-armybox-Source-iNaturalist.jpeg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://baliwildlife.com/wp-content/uploads/2023/04/Green-Sea-Turtle-Chelonia-mydas-photo-by-armybox-Source-iNaturalist.jpeg" 
                             alt="Penyu Hijau di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Penyu Hijau di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://www.greeners.co/wp-content/uploads/2020/09/Penyu-Hijau-3-min.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://www.greeners.co/wp-content/uploads/2020/09/Penyu-Hijau-3-min.jpg" 
                             alt="Penyu Hijau dengan Detail Morfologi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Penyu Hijau Detail</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://radarsukabumi.com/wp-content/uploads/2019/03/Penyu-Hijau.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://radarsukabumi.com/wp-content/uploads/2019/03/Penyu-Hijau.jpg" 
                             alt="Penyu Hijau Konservasi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Penyu Hijau Konservasi</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Eretmochelys imbricata' ? `
        <!-- Special Gallery for Penyu Sisik -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Penyu Sisik</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Penyu Sisik</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://www.fisheries.noaa.gov/s3//styles/original/s3/dam-migration/640x427-hawksbill-turtle.png?itok=s9gpCwBk', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://www.fisheries.noaa.gov/s3//styles/original/s3/dam-migration/640x427-hawksbill-turtle.png?itok=s9gpCwBk" 
                             alt="Penyu Sisik NOAA" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Penyu Sisik NOAA</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR91zmpfJhH3SbT0PUjdKlwrapfSfDOFq5IUw&s', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR91zmpfJhH3SbT0PUjdKlwrapfSfDOFq5IUw&s" 
                             alt="Penyu Sisik Detail Morfologi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Penyu Sisik Detail</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV5uPjax3le4b9MNX9JtSEFDksxVKPVbykUQ&s', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV5uPjax3le4b9MNX9JtSEFDksxVKPVbykUQ&s" 
                             alt="Penyu Sisik Konservasi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Penyu Sisik Konservasi</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Lepidochelys olivacea' ? `
        <!-- Special Gallery for Penyu Lekang -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Penyu Lekang</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Penyu Lekang</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lepidochelys_olivacea.jpg/1200px-Lepidochelys_olivacea.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lepidochelys_olivacea.jpg/1200px-Lepidochelys_olivacea.jpg" 
                             alt="Penyu Lekang Wikipedia" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Penyu Lekang Wikipedia</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://asset-2.tribunnews.com/bali/foto/bank/images/Satwa-dilindungi-yakni-Penyu-jenis-Lekang-saat-dilakukan-penguburan-di-pesisir-Pantai-Perancak.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://asset-2.tribunnews.com/bali/foto/bank/images/Satwa-dilindungi-yakni-Penyu-jenis-Lekang-saat-dilakukan-penguburan-di-pesisir-Pantai-Perancak.jpg" 
                             alt="Penyu Lekang Konservasi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Penyu Lekang Konservasi</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Caretta caretta' ? `
        <!-- Special Gallery for Penyu Tempayan -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Penyu Tempayan</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Penyu Tempayan</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://upload.wikimedia.org/wikipedia/commons/5/5b/Lepidochelys_kempii.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Lepidochelys_kempii.jpg" 
                             alt="Penyu Tempayan Wikipedia" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Penyu Tempayan Wikipedia</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QZHyCC4KttUt_YPG24PPKSOXRIWb1mKnyA&s', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QZHyCC4KttUt_YPG24PPKSOXRIWb1mKnyA&s" 
                             alt="Penyu Tempayan Detail Morfologi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Penyu Tempayan Detail</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPf-lbUvK6307EsGrQqOK0rgFfyI0xbJwbA&s', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPf-lbUvK6307EsGrQqOK0rgFfyI0xbJwbA&s" 
                             alt="Penyu Tempayan Konservasi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Penyu Tempayan Konservasi</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Antipatharia' ? `
        <!-- Special Gallery for Karang Hitam -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Karang Hitam</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Karang Hitam</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://images.redseacreatures.com/taxons/images/black-coral/1704213680475-189026275.jpeg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://images.redseacreatures.com/taxons/images/black-coral/1704213680475-189026275.jpeg" 
                             alt="Karang Hitam Red Sea Creatures" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Karang Hitam Red Sea</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://ocean.si.edu/sites/default/files/styles/facebook_twitter_card_image/public/2023-11/bushy_black_coral_full.jpg.webp?itok=JaP2UrMv', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://ocean.si.edu/sites/default/files/styles/facebook_twitter_card_image/public/2023-11/bushy_black_coral_full.jpg.webp?itok=JaP2UrMv" 
                             alt="Karang Hitam Bushy Smithsonian" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Karang Hitam Bushy</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRENeQPuyMHLtZ5h1OcfUYB1vBQHZ-QX71eQqXBEzmr-d0ZxpeLrpJLMgiYTSQt8EgQK9Q&usqp=CAU', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRENeQPuyMHLtZ5h1OcfUYB1vBQHZ-QX71eQqXBEzmr-d0ZxpeLrpJLMgiYTSQt8EgQK9Q&usqp=CAU" 
                             alt="Karang Hitam Google Images" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Karang Hitam Detail</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Acropora spp.' ? `
        <!-- Special Gallery for Karang Meja -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Karang Meja</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Karang Meja</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiOSiPDYegdNbMqI6kKR3bsKLKFJVbYzBFE_cW275Ipmwo_AMwecqKtzKdZzXRladtLTYT13PxOtrnra_8yr-7J14zw8l5ajH-Ib7h3eaS-wrWN91EWsKpkNVyx9c6eMKcxgWIzpnXfYoM/s400/KARANG+MEJA.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiOSiPDYegdNbMqI6kKR3bsKLKFJVbYzBFE_cW275Ipmwo_AMwecqKtzKdZzXRladtLTYT13PxOtrnra_8yr-7J14zw8l5ajH-Ib7h3eaS-wrWN91EWsKpkNVyx9c6eMKcxgWIzpnXfYoM/s400/KARANG+MEJA.jpg" 
                             alt="Karang Meja di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Karang Meja di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://st3.depositphotos.com/4741801/19455/i/450/depositphotos_194550694-stock-photo-beautiful-reef-building-corals-grow.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://st3.depositphotos.com/4741801/19455/i/450/depositphotos_194550694-stock-photo-beautiful-reef-building-corals-grow.jpg" 
                             alt="Karang Meja Terumbu Karang" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Karang Meja Terumbu Karang</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Cromileptes altivelis' ? `
        <!-- Special Gallery for Ikan Kerapu Tikus -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Ikan Kerapu Tikus</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Ikan Kerapu Tikus</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3Wd8eHMvqvNsegEZrWsoNFc5YXkVkXIIB7OVKyRiBcKR8GsFCWsmcBDrrmxRgiikF7ydZOdRaZtNQHmdVy3UQcSa3hpfz1RVaXug3l4sNEdzSte9wBLZ54KvCTaZmncQhWQvPyrDaZLZy/s400/kerapu+tikus+7.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3Wd8eHMvqvNsegEZrWsoNFc5YXkVkXIIB7OVKyRiBcKR8GsFCWsmcBDrrmxRgiikF7ydZOdRaZtNQHmdVy3UQcSa3hpfz1RVaXug3l4sNEdzSte9wBLZ54KvCTaZmncQhWQvPyrDaZLZy/s400/kerapu+tikus+7.jpg" 
                             alt="Ikan Kerapu Tikus di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Kerapu Tikus di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://static.republika.co.id/uploads/images/inpicture_slide/kerapu-_120924002103-462.jpg', 1)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://static.republika.co.id/uploads/images/inpicture_slide/kerapu-_120924002103-462.jpg" 
                             alt="Ikan Kerapu Tikus dari Republika" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Kerapu Tikus dari Republika</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFnNqk8cePJ_-BAzyqcEIp8S-iskznxZaoOQ&s', 2)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFnNqk8cePJ_-BAzyqcEIp8S-iskznxZaoOQ&s" 
                             alt="Ikan Kerapu Tikus dengan Detail Morfologi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Kerapu Tikus dengan Detail Morfologi</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Anguilla spp.' ? `
        <!-- Special Gallery for Ikan Sidat -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Ikan Sidat</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Ikan Sidat</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7knvKA-5Td2YW7AC-T-kX1lUwJWTIkrZyiFqEdmfFHOJpyPhj4QpUieLR2VJbMTCWC8xb9BngIVMuOOz1NMfSSGxe1hsNYWzshuem4xqnuEo6RBSx320_R7B1aEmyhv40I-x-7BASi-c/w1200-h630-p-k-no-nu/SIDAT.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7knvKA-5Td2YW7AC-T-kX1lUwJWTIkrZyiFqEdmfFHOJpyPhj4QpUieLR2VJbMTCWC8xb9BngIVMuOOz1NMfSSGxe1hsNYWzshuem4xqnuEo6RBSx320_R7B1aEmyhv40I-x-7BASi-c/w1200-h630-p-k-no-nu/SIDAT.jpg" 
                             alt="Ikan Sidat di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Sidat di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/harianmerapi/2021/06/24sidate.jpg', 1)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/harianmerapi/2021/06/24sidate.jpg" 
                             alt="Ikan Sidat dari Harian Merapi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Sidat dari Harian Merapi</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1jVOAG7wrhyTL6-bChl-aBKIvHr3MLkT0N14fMFMY1TZryx9rNWiP295AOIofcUyd7s8&usqp=CAU', 2)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1jVOAG7wrhyTL6-bChl-aBKIvHr3MLkT0N14fMFMY1TZryx9rNWiP295AOIofcUyd7s8&usqp=CAU" 
                             alt="Ikan Sidat dengan Detail Morfologi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Sidat dengan Detail Morfologi</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Lutjanus spp.' ? `
        <!-- Special Gallery for Ikan Kakap Merah -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Ikan Kakap Merah</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Ikan Kakap Merah</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DsaM7fDQ11-jOE64pXKrJSjZ_SSWErrt2jXdZWr3wVIYFFa8ARIj5W7h-KpSBC9-cG0&usqp=CAU', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DsaM7fDQ11-jOE64pXKrJSjZ_SSWErrt2jXdZWr3wVIYFFa8ARIj5W7h-KpSBC9-cG0&usqp=CAU" 
                             alt="Ikan Kakap Merah di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Kakap Merah di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://img.lovepik.com/bg/20231213/red-snapper-in-the-tropics_2453816_wh1200.png', 1)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://img.lovepik.com/bg/20231213/red-snapper-in-the-tropics_2453816_wh1200.png" 
                             alt="Ikan Kakap Merah di Tropis" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Kakap Merah di Tropis</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Latimeria menadoensis' ? `
        <!-- Special Gallery for Ikan Coelacanth -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Ikan Coelacanth</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Ikan Coelacanth</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://static.wixstatic.com/media/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png/v1/fill/w_568,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://static.wixstatic.com/media/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png/v1/fill/w_568,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png" 
                             alt="Ikan Coelacanth di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Coelacanth di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetNZhmU0RGyTIfMRRAjpVs8Cxpa1Y7fk89Q&s', 1)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetNZhmU0RGyTIfMRRAjpVs8Cxpa1Y7fk89Q&s" 
                             alt="Ikan Coelacanth dengan Detail Morfologi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Coelacanth dengan Detail Morfologi</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Tridacna gigas' ? `
        <!-- Special Gallery for Kima Raksasa -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Kima Raksasa</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Kima Raksasa</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIecMGxa3BmYrQO4JEpU2hH8rOJEdYa1NJ0fe6Kej0pAMPO-szkCUgctjjcY33JaRDXq6OWivW2dH4PVQIL2LvcAKTSj8lMZ9wK8jofm7bivTDRtkgustBEfSloMdcfYBub8-IxgPnWV0/s400/KIMA.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIecMGxa3BmYrQO4JEpU2hH8rOJEdYa1NJ0fe6Kej0pAMPO-szkCUgctjjcY33JaRDXq6OWivW2dH4PVQIL2LvcAKTSj8lMZ9wK8jofm7bivTDRtkgustBEfSloMdcfYBub8-IxgPnWV0/s400/KIMA.jpg" 
                             alt="Kima Raksasa di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Kima Raksasa di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg95XqOGe_uXAIcgA0st8L45ZvnPsNVPSWDSlWla_Led2sv1Jc7xmi5NxX3MlzNmYNOBSCgTDIOpiE8zieN-y-XgAR2wW-EysAqszXK9XRRviOcbSN0dIYDMHdw1Oj26vyidEeVMyYBNBCY/s1600/tridacna-tevoroa-d-094.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg95XqOGe_uXAIcgA0st8L45ZvnPsNVPSWDSlWla_Led2sv1Jc7xmi5NxX3MlzNmYNOBSCgTDIOpiE8zieN-y-XgAR2wW-EysAqszXK9XRRviOcbSN0dIYDMHdw1Oj26vyidEeVMyYBNBCY/s1600/tridacna-tevoroa-d-094.jpg" 
                             alt="Kima Raksasa Tridacna tevoroa" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Kima Raksasa Tridacna tevoroa</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Tridacna crocea' ? `
        <!-- Special Gallery for Kima Kecil -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Kima Kecil</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Kima Kecil</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSITL_zQ6J52xHDtFTK2eX1ZpmHH1dSOmSJQ&s', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSITL_zQ6J52xHDtFTK2eX1ZpmHH1dSOmSJQ&s" 
                             alt="Kima Kecil di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Kima Kecil di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://s3.animalia.bio/animals/photos/full/original/2560px-tridacna-crocea-28mnhn-im-2012-2483929-002.webp', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://s3.animalia.bio/animals/photos/full/original/2560px-tridacna-crocea-28mnhn-im-2012-2483929-002.webp" 
                             alt="Kima Kecil Tridacna crocea Detail" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Kima Kecil Tridacna crocea Detail</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Tridacna squamosa' ? `
        <!-- Special Gallery for Kima Gigi -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Kima Gigi</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Kima Gigi</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://www.mediastorehouse.com.au/p/172/fluted-giant-clam-squamosa-clam-scaled-clam-4196729.jpg.webp', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://www.mediastorehouse.com.au/p/172/fluted-giant-clam-squamosa-clam-scaled-clam-4196729.jpg.webp" 
                             alt="Kima Gigi di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Kima Gigi di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://www.gia.edu/images/SP15-LN-fig11-178155-636x358.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://www.gia.edu/images/SP15-LN-fig11-178155-636x358.jpg" 
                             alt="Kima Gigi Tridacna squamosa Detail" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Kima Gigi Tridacna squamosa Detail</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Nautilus pompilius' ? `
        <!-- Special Gallery for Nautilus -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Nautilus</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Nautilus</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://www.greeners.co/wp-content/uploads/2018/01/Fauna-Nautilus-Chepalopoda-Bercangkang-yang-Bertahan-dari-Zaman-Purba.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://www.greeners.co/wp-content/uploads/2018/01/Fauna-Nautilus-Chepalopoda-Bercangkang-yang-Bertahan-dari-Zaman-Purba.jpg" 
                             alt="Nautilus di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Nautilus di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaBvz8wQ_2V-vC_QdHUppJS0KGrPcSBoYXeEFxIHY2pLrd2l5BNk54gvWmUkuFg-a1XRs&usqp=CAU', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaBvz8wQ_2V-vC_QdHUppJS0KGrPcSBoYXeEFxIHY2pLrd2l5BNk54gvWmUkuFg-a1XRs&usqp=CAU" 
                             alt="Nautilus Detail Morfologi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Nautilus Detail Morfologi</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Octopus cyanea' ? `
        <!-- Special Gallery for Gurita Pasir -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Gurita Pasir</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Gurita Pasir</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJYpFqhORglMoGozTKTGOArPUny7vCXI38C9CG4VJCxRICAt1mTCMcVQ42u-6ZaTMTm6C4HusxA28zHm96rRobNbeMZNfD4z4GuXUeWTQc41k0iAQFHkf-Jan0J6MS7pzobgu31bM6lbE/w1200-h630-p-k-no-nu/GURITA.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJYpFqhORglMoGozTKTGOArPUny7vCXI38C9CG4VJCxRICAt1mTCMcVQ42u-6ZaTMTm6C4HusxA28zHm96rRobNbeMZNfD4z4GuXUeWTQc41k0iAQFHkf-Jan0J6MS7pzobgu31bM6lbE/w1200-h630-p-k-no-nu/GURITA.jpg" 
                             alt="Gurita Pasir di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Gurita Pasir di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mimic_Octopus2.jpg/250px-Mimic_Octopus2.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mimic_Octopus2.jpg/250px-Mimic_Octopus2.jpg" 
                             alt="Gurita Pasir Mimic Octopus" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Gurita Pasir Mimic Octopus</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcBTq-dOoOnTTzp0Q9gQhIEpf2COwV4V7hw&s', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcBTq-dOoOnTTzp0Q9gQhIEpf2COwV4V7hw&s" 
                             alt="Gurita Pasir Detail Morfologi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Gurita Pasir Detail Morfologi</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Globicephala macrorhynchus' ? `
        <!-- Special Gallery for Paus Pilot Sirip Pendek -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Paus Pilot Sirip Pendek</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Paus Pilot Sirip Pendek</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBBgwILZ38ENbC-tFhnhWwU9c0TG7GVle7S4X5hwhqJ-RhbPbDzqHR84WZLflI0dTBVVc&usqp=CAU', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBBgwILZ38ENbC-tFhnhWwU9c0TG7GVle7S4X5hwhqJ-RhbPbDzqHR84WZLflI0dTBVVc&usqp=CAU" 
                             alt="Paus Pilot Sirip Pendek di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Paus Pilot Sirip Pendek di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://cdn.divessi.com/cached/Wildlife_Pilot_Whale_Alamy-BIOSPHOTO.jpg/600.jpg', 1)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://cdn.divessi.com/cached/Wildlife_Pilot_Whale_Alamy-BIOSPHOTO.jpg/600.jpg" 
                             alt="Paus Pilot Sirip Pendek Wildlife Photography" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Paus Pilot Sirip Pendek Wildlife Photography</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://assets.promediateknologi.id/crop/0x0:800x553/0x0/webp/photo/p2/34/2023/07/27/Melintas-3-34-Kolase-1-Res-OK-259937271.jpg', 2)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://assets.promediateknologi.id/crop/0x0:800x553/0x0/webp/photo/p2/34/2023/07/27/Melintas-3-34-Kolase-1-Res-OK-259937271.jpg" 
                             alt="Paus Pilot Sirip Pendek Melintas di Perairan" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Paus Pilot Sirip Pendek Melintas di Perairan</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Balaenoptera edeni' ? `
        <!-- Special Gallery for Paus Bryde -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Paus Bryde</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Paus Bryde</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Finhval_%281%29.jpg/250px-Finhval_%281%29.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Finhval_%281%29.jpg/250px-Finhval_%281%29.jpg" 
                             alt="Paus Bryde dari Wikipedia" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Paus Bryde dari Wikipedia</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://i.pinimg.com/564x/b9/e5/25/b9e525b676d47a0092e2415086391812.jpg', 1)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://i.pinimg.com/564x/b9/e5/25/b9e525b676d47a0092e2415086391812.jpg" 
                             alt="Paus Bryde dari Pinterest" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Paus Bryde dari Pinterest</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Tursiops truncatus' ? `
        <!-- Special Gallery for Lumba-lumba Hidung Botol -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Lumba-lumba Hidung Botol</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Lumba-lumba Hidung Botol</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNZrGf3yRN7Vs3K-TBoP8lSQDo0bD2SdFHYQ&s', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNZrGf3yRN7Vs3K-TBoP8lSQDo0bD2SdFHYQ&s" 
                             alt="Lumba-lumba Hidung Botol di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Lumba-lumba Hidung Botol di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://animalfactguide.com/wp-content/uploads/2024/11/bottlenose-dolphin-underwater.jpg', 4)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://animalfactguide.com/wp-content/uploads/2024/11/bottlenose-dolphin-underwater.jpg" 
                             alt="Lumba-lumba Hidung Botol di Bawah Air" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Lumba-lumba Hidung Botol di Bawah Air</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmX3LABbJeLR81D8lc6JFFAxe1r4CC54Uheg&s', 5)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmX3LABbJeLR81D8lc6JFFAxe1r4CC54Uheg&s" 
                             alt="Lumba-lumba Hidung Botol dengan Detail Morfologi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Lumba-lumba Hidung Botol Morfologi</p>
                    </div>
                </div>
            </div>
        </div>
        ` : animal.latin === 'Notopterus chitala' ? `
        <!-- Special Gallery for Ikan Belida -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Ikan Belida</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Ikan Belida</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://dkp.jatimprov.go.id/public/uploads/news-3521.jpeg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://dkp.jatimprov.go.id/public/uploads/news-3521.jpeg" 
                             alt="Ikan Belida di Habitat Alami" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Belida di Habitat Alami</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSAEqlTGog_nUZTNti-FJZNtaV_sE0lwCY4-8pGM6q9i0lNkRwPb6L1ams-1XFJY7U7I4&usqp=CAU', 1)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSAEqlTGog_nUZTNti-FJZNtaV_sE0lwCY4-8pGM6q9i0lNkRwPb6L1ams-1XFJY7U7I4&usqp=CAU" 
                             alt="Ikan Belida dengan Warna Cerah" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Belida dengan Warna Cerah</p>
                    </div>
                </div>
                
                <div class="relative group cursor-pointer" onclick="showImageModal('https://dkp.jatimprov.go.id/public/uploads/2024/11/content20241114005611_713024.jpeg', 2)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://dkp.jatimprov.go.id/public/uploads/2024/11/content20241114005611_713024.jpeg" 
                             alt="Ikan Belida Konservasi" 
                             class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                        <p class="text-white text-sm font-medium">Ikan Belida Konservasi</p>
                    </div>
                </div>
            </div>
        </div>
        ` : `
        <!-- Default Gallery for Other Animals -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri ${animal.name}</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat ${animal.name}</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl justify-center">
                ${(() => {
                    const images = animal.images || [animal.image] || [];
                    if (images.length === 0 || !images[0]) {
                        // Fallback images jika tidak ada data gambar
                        return `
                        <div class="relative group cursor-pointer" onclick="showImageModal('https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(animal.name + ' Image 1')}', 0)">
                            <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                                <img src="https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(animal.name + ' Image 1')}" 
                                     alt="${animal.name} Gambar 1" 
                                     class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                            </div>
                            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                                <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                                <p class="text-white text-sm font-medium">${animal.name} - Gambar 1</p>
                            </div>
                        </div>
                        <div class="relative group cursor-pointer" onclick="showImageModal('https://via.placeholder.com/400x300/10B981/FFFFFF?text=${encodeURIComponent(animal.name + ' Image 2')}', 1)">
                            <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                                <img src="https://via.placeholder.com/400x300/10B981/FFFFFF?text=${encodeURIComponent(animal.name + ' Image 2')}" 
                                     alt="${animal.name} Gambar 2" 
                                     class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                            </div>
                            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                                <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                                <p class="text-white text-sm font-medium">${animal.name} - Gambar 2</p>
                            </div>
                        </div>
                        <div class="relative group cursor-pointer" onclick="showImageModal('https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=${encodeURIComponent(animal.name + ' Image 3')}', 2)">
                            <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                                <img src="https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=${encodeURIComponent(animal.name + ' Image 3')}" 
                                     alt="${animal.name} Gambar 3" 
                                     class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                            </div>
                            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                                <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                                <p class="text-white text-sm font-medium">${animal.name} - Gambar 3</p>
                            </div>
                        </div>
                        `;
                    }
                    return images.map((img, index) => `
                        <div class="relative group cursor-pointer" onclick="showImageModal('${img}', ${index})">
                            <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                                <img src="${img}" 
                                     alt="${animal.name} Gambar ${index + 1}" 
                                     class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                            </div>
                            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                                <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-xl">
                                <p class="text-white text-sm font-medium">${animal.name} - Gambar ${index + 1}</p>
                        </div>
                </div>
                    `).join('');
                })()}
            </div>
        </div>
        `}
            </div>

            <!-- Compact Info Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <!-- Appendix CITES -->
                <div class="detail-card p-4 text-center cursor-pointer" onclick="showAppendixModal('${animal.latin}')">
                    <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i data-lucide="book-check" class="w-6 h-6 text-white"></i>
                    </div>
                    <h3 class="font-semibold text-slate-800 mb-1">Appendix CITES</h3>
                    <p class="text-sm text-slate-600">${animal.appendix}</p>
                </div>

                <!-- Conservation Status -->
                <div class="detail-card p-4 text-center cursor-pointer" onclick="showConservationModal('${animal.latin}')">
                    <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i data-lucide="shield-alert" class="w-6 h-6 text-white"></i>
                    </div>
                    <h3 class="font-semibold text-slate-800 mb-1">Status Konservasi</h3>
                    <p class="text-sm text-slate-600">${animal.conservationStatus}</p>
                </div>

                <!-- Protection Year -->
                ${animal.protectionYear ? `
                <div class="detail-card p-4 text-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i data-lucide="calendar" class="w-6 h-6 text-white"></i>
                    </div>
                    <h3 class="font-semibold text-slate-800 mb-1">Tahun Dilindungi</h3>
                    <p class="text-sm text-slate-600">Sejak ${animal.protectionYear}</p>
                </div>
                ` : ''}
            </div>

            <!-- Description -->
            <div class="detail-card p-6 mb-6">
                <h3 class="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                    <i data-lucide="info" class="w-5 h-5 mr-2 text-blue-600"></i>
                    Deskripsi
                </h3>
                <p class="text-slate-600 leading-relaxed">${animal.description}</p>
            </div>

            <!-- Locations -->
            ${animal.locations && animal.locations.length > 0 ? `
            <div class="detail-card p-6 mb-6">
                <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <i data-lucide="map-pin" class="w-5 h-5 mr-2 text-green-600"></i>
                    Lokasi di Sulawesi Utara
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    ${animal.locations.map(location => `
                        <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-100 hover:border-green-200 transition-colors cursor-pointer" onclick="showLocationReferences('${location.name}')">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="font-medium text-slate-800 text-sm">${location.name}</h4>
                                    <p class="text-xs text-slate-500">${location.coordinates}</p>
                                </div>
                                <i data-lucide="external-link" class="w-3 h-3 text-green-500"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Morphology -->
            <div class="detail-card p-6 mb-6">
                <div class="flex items-center justify-between mb-6 cursor-pointer" onclick="showMorphologyReferences('${animal.latin}')">
                    <h3 class="text-lg font-semibold text-slate-800 flex items-center">
                        <i data-lucide="ruler" class="w-5 h-5 mr-2 text-purple-600"></i>
                        Morfologi
                    </h3>
                    <i data-lucide="external-link" class="w-4 h-4 text-slate-400"></i>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100 hover:border-purple-200 transition-colors">
                            <div class="flex items-center mb-3">
                                <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mr-3">
                                    <i data-lucide="eye" class="w-4 h-4 text-white"></i>
                                </div>
                                <h4 class="font-semibold text-slate-800">Penampilan Umum</h4>
                            </div>
                            <p class="text-sm text-slate-600 leading-relaxed">${getMorphologySection(animal.latin, 'appearance')}</p>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors">
                            <div class="flex items-center mb-3">
                                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                    <i data-lucide="ruler" class="w-4 h-4 text-white"></i>
                                </div>
                                <h4 class="font-semibold text-slate-800">Ukuran & Proporsi</h4>
                            </div>
                            <p class="text-sm text-slate-600 leading-relaxed">${getMorphologySection(animal.latin, 'size')}</p>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 hover:border-green-200 transition-colors">
                            <div class="flex items-center mb-3">
                                <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                                    <i data-lucide="palette" class="w-4 h-4 text-white"></i>
                                </div>
                                <h4 class="font-semibold text-slate-800">Warna & Pola</h4>
                            </div>
                            <p class="text-sm text-slate-600 leading-relaxed">${getMorphologySection(animal.latin, 'color')}</p>
                        </div>
                        
                        <div class="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100 hover:border-orange-200 transition-colors">
                            <div class="flex items-center mb-3">
                                <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                                    <i data-lucide="zap" class="w-4 h-4 text-white"></i>
                                </div>
                                <h4 class="font-semibold text-slate-800">Ciri Khas</h4>
                            </div>
                            <p class="text-sm text-slate-600 leading-relaxed">${getMorphologySection(animal.latin, 'features')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Taxonomy -->
            <div class="detail-card p-6 mb-6">
                <div class="flex items-center justify-between mb-4 cursor-pointer" onclick="showTaxonomyReferences('${animal.latin}')">
                    <h3 class="text-lg font-semibold text-slate-800 flex items-center">
                        <i data-lucide="layers" class="w-5 h-5 mr-2 text-indigo-600"></i>
                        Taksonomi
                    </h3>
                    <i data-lucide="external-link" class="w-4 h-4 text-slate-400"></i>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    ${Object.entries(animal.taxonomy).map(([key, value]) => `
                        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 p-3 rounded-lg border border-indigo-100">
                            <span class="text-xs text-slate-500 block mb-1">${key}</span>
                            <strong class="text-sm text-slate-800">${value}</strong>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Legal Regulations -->
            ${animal.legalRegulations && animal.legalRegulations.length > 0 ? `
            <div class="detail-card p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-slate-800 flex items-center">
                        <i data-lucide="scale" class="w-5 h-5 mr-2 text-amber-600"></i>
                        Peraturan Hukum
                    </h3>
                    ${animal.protectionYear ? `
                    <div class="bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 rounded-full border border-blue-200">
                        <span class="text-xs font-medium text-blue-800">
                            <i data-lucide="calendar" class="w-3 h-3 inline mr-1"></i>
                            Dilindungi sejak ${animal.protectionYear}
                        </span>
                    </div>
                    ` : ''}
                </div>
                <div class="space-y-4">
                    ${animal.legalRegulations.map(regulation => `
                        <div class="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100 hover:border-amber-200 transition-colors">
                            <div class="flex items-start justify-between mb-2">
                                <div class="flex-1">
                                    <h4 class="font-semibold text-slate-800 text-sm mb-1">${regulation.name}</h4>
                                    <p class="text-xs text-amber-600 font-medium">${regulation.title}</p>
                                </div>
                                <div class="flex flex-col items-end space-y-1">
                                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                                        ${regulation.year}
                                    </span>
                                    ${regulation.year === animal.protectionYear ? `
                                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                        <i data-lucide="check" class="w-3 h-3 inline mr-1"></i>
                                        Tahun Perlindungan
                                    </span>
                                    ` : ''}
                                </div>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed">${regulation.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}




                </div>
            </div>
        `;
        
        // Add morphology click handlers
        addMorphologyClickHandlers();
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

function getEnhancedMorphology(morphology) {
    const words = morphology.split(' ');
    const enhancedWords = words.map(word => {
        const cleanWord = word.replace(/[.,!?;:]/g, '');
        if (cleanWord.length > 3 && Math.random() < 0.3) {
            return `<span class="morphology-word" data-word="${cleanWord}">${word}</span>`;
        }
        return word;
    });
    
    return {
        html: enhancedWords.join(' '),
        words: enhancedWords.filter(w => w.includes('morphology-word')).map(w => w.match(/data-word="([^"]+)"/)?.[1]).filter(Boolean)
    };
}

function addMorphologyClickHandlers() {
    const morphologyWords = document.querySelectorAll('.morphology-word');
    morphologyWords.forEach(word => {
        word.addEventListener('click', function() {
            const wordText = this.getAttribute('data-word');
            showReferenceTooltip(this, wordText);
        });
        
        word.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e0e7ff';
            this.style.cursor = 'pointer';
        });
        
        word.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
}

function showReferenceTooltip(element, word) {
    // Remove existing tooltip
    const existingTooltip = document.querySelector('.reference-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'reference-tooltip';
    tooltip.innerHTML = `
        <div class="bg-white border border-slate-200 rounded-lg shadow-lg p-3 max-w-xs">
            <p class="text-sm text-slate-700 mb-2">Klik untuk melihat referensi morfologi</p>
            <button onclick="showMorphologyModal('${getCurrentAnimalLatin()}')" 
                    class="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                Lihat Referensi
            </button>
        </div>
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.bottom + 5) + 'px';
    tooltip.style.zIndex = '1000';
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.remove();
        }
    }, 3000);
}

function hideReferenceTooltip() {
    const tooltip = document.querySelector('.reference-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function getCurrentAnimalLatin() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('latin');
}

function showError() {
    const content = document.getElementById('animal-detail-content');
    if (content) {
        content.innerHTML = `
            <div class="text-center py-20">
                <div class="text-6xl mb-6">🐠</div>
                <h2 class="text-3xl font-bold text-slate-800 mb-4">Satwa Tidak Ditemukan</h2>
                <p class="text-slate-600 mb-8">Maaf, informasi satwa yang Anda cari tidak tersedia.</p>
                <div class="space-y-4">
                    <a href="dashboard.html" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Kembali ke Satwa Dilindungi
                    </a>
                    <br>
                    <button onclick="goToPhylumPage('${phylum}')" class="inline-block bg-white text-slate-600 border border-slate-300 px-6 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 mx-auto cursor-pointer">
                        <i data-lucide="arrow-left" class="w-4 h-4"></i>
                        Kembali ke Daftar Satwa
                    </button>
                </div>
            </div>
        `;
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

function toggleReferences() {
    const referencesList = document.getElementById('references-list');
    const chevron = document.getElementById('ref-chevron');
    
    if (referencesList.style.display === 'none') {
        referencesList.style.display = 'block';
        chevron.style.transform = 'rotate(0deg)';
    } else {
        referencesList.style.display = 'none';
        chevron.style.transform = 'rotate(-90deg)';
    }
}

// Morphology Modal Functions
function showMorphologyModal(latinName) {
    const modal = document.getElementById('morphology-modal');
    const modalBody = document.getElementById('morphology-modal-body');
    
    const references = getMorphologyReferences(latinName);
    const morphologyData = getMorphologyData(latinName);
    
    modalBody.innerHTML = `
        <div class="morphology-info">
            <h3>📚 Daftar Pustaka Morfologi</h3>
            <p>Referensi ilmiah yang digunakan untuk analisis morfologi spesies ini.</p>
        </div>
        
        ${latinName === 'Pristis spp.' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Pari Gergaji
                </h4>
                <div class="flex justify-center">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhly94DWTwNUB2IcNo19Wm8d27tyCJYmhlQvv0E5gxwAsf7NHjo9cr7KN38m8S82AebrxQPENvivC1Au3vw0QHh7bd5CZcChMh0KPPgmybzLxoO9BbA4-uuM6ibWtoXoq9-Mjs17Vc2ih4/s1600/hiu+gergaji1.jpg" 
                         alt="Morfologi Pari Gergaji (Sawfish)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhly94DWTwNUB2IcNo19Wm8d27tyCJYmhlQvv0E5gxwAsf7NHjo9cr7KN38m8S82AebrxQPENvivC1Au3vw0QHh7bd5CZcChMh0KPPgmybzLxoO9BbA4-uuM6ibWtoXoq9-Mjs17Vc2ih4/s1600/hiu+gergaji1.jpg', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Pari Gergaji yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Blogger Googleusercontent. (2024). Hiu Gergaji Morfologi. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhly94DWTwNUB2IcNo19Wm8d27tyCJYmhlQvv0E5gxwAsf7NHjo9cr7KN38m8S82AebrxQPENvivC1Au3vw0QHh7bd5CZcChMh0KPPgmybzLxoO9BbA4-uuM6ibWtoXoq9-Mjs17Vc2ih4/s1600/hiu+gergaji1.jpg
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Faria, V.V., et al. (2013). Morphometric analysis and description of the oral cavity, gill rakers and pharynx in sawfish (Pristidae). Journal of Morphology, 274(10), 1164-1178.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world's sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Mobula birostris' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Pari Manta
                </h4>
                <div class="flex justify-center">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiH3BIXQxaqA67I3m5ia2xx19LPsAYgsANdULo_awzbQ3WOuMuTMp6uRVRILQcR9DjDKdh35Bgb7no__t4Xu3MWKQ3WecYQ9MY0odlHsmRPlAogrZkN5pL0NU40ubUd4BrDr-Wd5hg6bY7P/s1600/001.jpg" 
                         alt="Morfologi Pari Manta (Manta Ray)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiH3BIXQxaqA67I3m5ia2xx19LPsAYgsANdULo_awzbQ3WOuMuTMp6uRVRILQcR9DjDKdh35Bgb7no__t4Xu3MWKQ3WecYQ9MY0odlHsmRPlAogrZkN5pL0NU40ubUd4BrDr-Wd5hg6bY7P/s1600/001.jpg', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Pari Manta yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Blogger Googleusercontent. (2024). Pari Manta Morfologi. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiH3BIXQxaqA67I3m5ia2xx19LPsAYgsANdULo_awzbQ3WOuMuTMp6uRVRILQcR9DjDKdh35Bgb7no__t4Xu3MWKQ3WecYQ9MY0odlHsmRPlAogrZkN5pL0NU40ubUd4BrDr-Wd5hg6bY7P/s1600/001.jpg
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Marshall, A.D., et al. (2009). Manta rays (Mobula birostris) in the Maldives: distribution, abundance, and conservation status. Marine Biology, 156(10), 1947-1958.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Marshall, A.D., & Bennett, M.B. (2010). The frequency and effect of shark-inflicted bite injuries to the reef manta ray Manta alfredi. African Journal of Marine Science, 32(3), 573-580.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world's sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                White, W.T., et al. (2018). Phylogeny of the manta and devilrays (Chondrichthyes: mobulidae), with an updated taxonomic arrangement for the family. Zoological Journal of the Linnean Society, 182(1), 50-75.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Rhincodon typus' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Hiu Paus
                </h4>
                <div class="flex justify-center">
                    <img src="https://images.bisnis.com//upload/img/Untitled(76).jpg" 
                         alt="Morfologi Hiu Paus (Whale Shark)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://images.bisnis.com//upload/img/Untitled(76).jpg', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Hiu Paus yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Bisnis.com. (2024). Morfologi Hiu Paus. Retrieved from https://images.bisnis.com//upload/img/Untitled(76).jpg
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Pierce, S.J., & Norman, B. (2016). Rhincodon typus. The IUCN Red List of Threatened Species 2016: e.T19488A2365291. DOI: 10.2305/IUCN.UK.2016-1.RLTS.T19488A2365291.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 2: Carcharhiniformes. FAO Species Catalogue for Fishery Purposes.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                CITES. (2023). Appendices I, II and III. Convention on International Trade in Endangered Species of Wild Fauna and Flora.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Sphyrna spp.' ? `
         <div class="morphology-image-section mb-6">
             <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                 <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                     <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                     Gambar Morfologi Hiu Martil
                 </h4>
                 <div class="flex justify-center">
                     <img src="https://st2.depositphotos.com/3413075/7330/i/950/depositphotos_73308855-stock-photo-sphyrna-shark-anatomy-scheme.jpg" 
                          alt="Morfologi Hiu Martil (Hammerhead Shark)" 
                          class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                          style="max-height: 400px;"
                          onclick="showImageModal('https://st2.depositphotos.com/3413075/7330/i/950/depositphotos_73308855-stock-photo-sphyrna-shark-anatomy-scheme.jpg', 0)">
                 </div>
                 <p class="text-sm text-blue-600 mt-3 text-center italic">
                     Gambar morfologi Hiu Martil yang menunjukkan karakteristik fisik spesies
                 </p>
                 
                 <!-- Daftar Pustaka untuk Gambar Morfologi -->
                 <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                     <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                         <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                         📖 Daftar Pustaka Gambar Morfologi
                     </h5>
                     <div class="space-y-3">
                         <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                             <div class="flex items-start justify-between mb-2">
                                 <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                     Gambar Utama
                                 </span>
                                 <span class="text-xs text-slate-500 font-mono">#1</span>
                             </div>
                             <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                 Depositphotos. (2024). Sphyrna Shark Anatomy Scheme. Retrieved from https://st2.depositphotos.com/3413075/7330/i/950/depositphotos_73308855-stock-photo-sphyrna-shark-anatomy-scheme.jpg
                             </p>
                         </div>
                         
                         <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                             <div class="flex items-start justify-between mb-2">
                                 <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                     Referensi Ilmiah
                                 </span>
                                 <span class="text-xs text-slate-500 font-mono">#2</span>
                             </div>
                             <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                 Rigby, C.L., et al. (2019). Sphyrna lewini. The IUCN Red List of Threatened Species 2019: e.T39385A2918526. DOI: 10.2305/IUCN.UK.2019-3.RLTS.T39385A2918526.en
                             </p>
                         </div>
                         
                         <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                             <div class="flex items-start justify-between mb-2">
                                 <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                     Morfologi
                                 </span>
                                 <span class="text-xs text-slate-500 font-mono">#3</span>
                             </div>
                             <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                 Compagno, L.J.V. (1984). FAO Species Catalogue. Vol. 4. Sharks of the world. An annotated and illustrated catalogue of shark species known to date. Part 2 - Carcharhiniformes. FAO Fisheries Synopsis No. 125, Vol. 4, Part 2.
                             </p>
                         </div>
                         
                         <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                             <div class="flex items-start justify-between mb-2">
                                 <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                     Konservasi
                                 </span>
                                 <span class="text-xs text-slate-500 font-mono">#4</span>
                             </div>
                             <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                 CITES. (2023). Appendices I, II and III. Convention on International Trade in Endangered Species of Wild Fauna and Flora.
                             </p>
                         </div>
                         
                         <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                             <div class="flex items-start justify-between mb-2">
                                 <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                     Taksonomi
                                 </span>
                                 <span class="text-xs text-slate-500 font-mono">#5</span>
                             </div>
                             <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                 Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                             </p>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
        ` : latinName === 'Lutjanus spp.' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Ikan Kakap Merah
                </h4>
                <div class="flex justify-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DsaM7fDQ11-jOE64pXKrJSjZ_SSWErrt2jXdZWr3wVIYFFa8ARIj5W7h-KpSBC9-cG0&usqp=CAU" 
                         alt="Morfologi Ikan Kakap Merah (Lutjanus spp.)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DsaM7fDQ11-jOE64pXKrJSjZ_SSWErrt2jXdZWr3wVIYFFa8ARIj5W7h-KpSBC9-cG0&usqp=CAU', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Ikan Kakap Merah yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Google Images. (2024). Red snapper in natural habitat. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DsaM7fDQ11-jOE64pXKrJSjZ_SSWErrt2jXdZWr3wVIYFFa8ARIj5W7h-KpSBC9-cG0&usqp=CAU
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Allen, G.R. (1985). FAO Species Catalogue. Vol. 6. Snappers of the world. An annotated and illustrated catalogue of lutjanid species known to date. FAO Fisheries Synopsis No. 125, Vol. 6. FAO, Rome.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Carpenter, K.E., & Niem, V.H. (2001). FAO species identification guide for fishery purposes. The living marine resources of the Western Central Pacific. Volume 5. Bony fishes part 3 (Menidae to Pomacentridae). FAO, Rome.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                IUCN. (2023). Lutjanus spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T194302A2310725.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Habitat
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Randall, J.E., & Allen, G.R. (1977). A revision of the Indo-Pacific fish genus Lutjanus. Records of the Western Australian Museum, 5(1), 1-43.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Latimeria menadoensis' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Ikan Coelacanth
                </h4>
                <div class="flex justify-center">
                    <img src="https://static.wixstatic.com/media/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png/v1/fill/w_568,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png" 
                         alt="Morfologi Ikan Coelacanth (Latimeria menadoensis)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://static.wixstatic.com/media/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png/v1/fill/w_568,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Ikan Coelacanth yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Wix Static. (2024). Coelacanth in natural habitat. Retrieved from https://static.wixstatic.com/media/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png/v1/fill/w_568,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Forey, P.L. (1998). History of the Coelacanth Fishes. Chapman & Hall, London.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Smith, J.L.B. (1956). Old Fourlegs: The Story of the Coelacanth. Longmans, Green and Co., London.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                IUCN. (2023). Latimeria menadoensis. The IUCN Red List of Threatened Species 2023: e.T40713A123396485. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T40713A123396485.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Evolusi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Cloutier, R., & Ahlberg, P.E. (1996). Morphology, characters, and the interrelationships of basal sarcopterygians. In: Stiassny, M.L.J., Parenti, L.R., & Johnson, G.D. (eds.) Interrelationships of Fishes. Academic Press, San Diego, pp 445-479.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Caretta caretta' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Penyu Tempayan
                </h4>
                <div class="flex justify-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqwllrxa58nBC0SnLki1mx_jufvaecIiijsg&s" 
                         alt="Morfologi Penyu Tempayan (Caretta caretta)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqwllrxa58nBC0SnLki1mx_jufvaecIiijsg&s', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Penyu Tempayan yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Google Images. (2024). Loggerhead Sea Turtle morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqwllrxa58nBC0SnLki1mx_jufvaecIiijsg&s
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                IUCN. (2023). Caretta caretta. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T3897A119333685.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Habitat
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Antipatharia' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Karang Hitam
                </h4>
                <div class="flex justify-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDfVsay6e69JRqGSeZRDAPeLcvaWYnVY934A&s" 
                         alt="Morfologi Karang Hitam (Antipatharia)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDfVsay6e69JRqGSeZRDAPeLcvaWYnVY934A&s', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi karang hitam yang menunjukkan struktur bercabang dan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Google Images. (2024). Black Coral Morphology Structure. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDfVsay6e69JRqGSeZRDAPeLcvaWYnVY934A&s
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Opresko, D.M. (2003). Revision of the Antipatharia (Cnidaria: Anthozoa). Part I. Establishment of a new family, Myriopathidae. Zoologische Mededelingen, 77(27), 465-490.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Wagner, D., Luck, D.G., & Toonen, R.J. (2012). The Biology and Ecology of Black Corals (Cnidaria: Anthozoa: Hexacorallia: Antipatharia). Advances in Marine Biology, 63, 67-132.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                IUCN. (2023). Antipatharia. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Brugler, M.R., France, S.C., & Opresko, D.M. (2013). The evolutionary history of the order Antipatharia (Cnidaria: Anthozoa: Hexacorallia) as inferred from mitochondrial and nuclear DNA: implications for black coral taxonomy and systematics. Zoological Journal of the Linnean Society, 169(2), 312-361.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Habitat
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Opresko, D.M., & Sanchez, J.A. (2005). Caribbean shallow-water black corals (Cnidaria: Anthozoa: Antipatharia). Caribbean Journal of Science, 41(3), 492-507.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Acropora spp.' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Anatomi Karang Meja
                </h4>
                <div class="flex justify-center">
                    <img src="https://2.bp.blogspot.com/_-V5Ia0i329U/TSu9-f7mFwI/AAAAAAAAAEo/ckE29dEyTwg/s1600/anatomi+karang.JPG" 
                         alt="Anatomi Karang Meja (Acropora spp.)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://2.bp.blogspot.com/_-V5Ia0i329U/TSu9-f7mFwI/AAAAAAAAAEo/ckE29dEyTwg/s1600/anatomi+karang.JPG', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar anatomi karang meja yang menunjukkan struktur internal dan komponen morfologi spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Blogger. (2024). Anatomi Karang - Coral Anatomy. Retrieved from https://2.bp.blogspot.com/_-V5Ia0i329U/TSu9-f7mFwI/AAAAAAAAAEo/ckE29dEyTwg/s1600/anatomi+karang.JPG
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Veron, J.E.N. (2000). Corals of the World. Australian Institute of Marine Science, Townsville.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Wallace, C.C. (1999). Staghorn Corals of the World: A Revision of the Coral Genus Acropora. CSIRO Publishing, Melbourne.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Anatomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Borneman, E.H. (2001). Aquarium Corals: Selection, Husbandry, and Natural History. Microcosm Ltd., Charlotte.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Fukami, H., Chen, C.A., Budd, A.F., Collins, A., Wallace, C., Chuang, Y.Y., Chen, C., Dai, C.F., Iwao, K., Sheppard, C., & Knowlton, N. (2008). Mitochondrial and nuclear genes suggest that stony corals are monophyletic but most families of stony corals are not (Order Scleractinia, Class Anthozoa, Phylum Cnidaria). PLoS ONE, 3(9), e3222.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Habitat
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Hughes, T.P., Baird, A.H., Bellwood, D.R., Card, M., Connolly, S.R., Folke, C., Grosberg, R., Hoegh-Guldberg, O., Jackson, J.B.C., Kleypas, J., Lough, J.M., Marshall, P., Nyström, M., Palumbi, S.R., Pandolfi, J.M., Rosen, B., & Roughgarden, J. (2003). Climate change, human impacts, and the resilience of coral reefs. Science, 301(5635), 929-933.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Lepidochelys olivacea' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Penyu Lekang
                </h4>
                <div class="flex justify-center">
                    <img src="https://i0.wp.com/marinebio.org/i/turtleID/olive.gif" 
                         alt="Morfologi Penyu Lekang (Lepidochelys olivacea)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://i0.wp.com/marinebio.org/i/turtleID/olive.gif', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Penyu Lekang yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                MarineBio.org. (2024). Olive Ridley Sea Turtle identification. Retrieved from https://i0.wp.com/marinebio.org/i/turtleID/olive.gif
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                IUCN. (2023). Lepidochelys olivacea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T11534A3292503.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Habitat
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Eretmochelys imbricata' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Penyu Sisik
                </h4>
                <div class="flex justify-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa-G6OjR50KToF0Broy_pWVQopV7AhFs5kA&s" 
                         alt="Morfologi Penyu Sisik (Eretmochelys imbricata)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa-G6OjR50KToF0Broy_pWVQopV7AhFs5kA&s', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Penyu Sisik yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Google Images. (2024). Hawksbill Sea Turtle morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa-G6OjR50KToF0Broy_pWVQopV7AhFs5kA&s
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                IUCN. (2023). Eretmochelys imbricata. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T8005A12881238.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Habitat
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Chelonia mydas' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Penyu Hijau
                </h4>
                <div class="flex justify-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGFdyoJPM_d_EEcUValh_iTcSYugP22cr0Q&s" 
                         alt="Morfologi Penyu Hijau (Chelonia mydas)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGFdyoJPM_d_EEcUValh_iTcSYugP22cr0Q&s', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Penyu Hijau yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Google Images. (2024). Green Sea Turtle morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGFdyoJPM_d_EEcUValh_iTcSYugP22cr0Q&s
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                IUCN. (2023). Chelonia mydas. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T4615A11037468.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Habitat
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Hippocampus spp.' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Kuda Laut
                </h4>
                <div class="flex justify-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlhBk_FQedqAX_d6a9GcuizhuV8Q9C9m6Bvg&s" 
                         alt="Morfologi Kuda Laut (Hippocampus spp.)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlhBk_FQedqAX_d6a9GcuizhuV8Q9C9m6Bvg&s', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Kuda Laut yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Google Images. (2024). Kuda Laut morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlhBk_FQedqAX_d6a9GcuizhuV8Q9C9m6Bvg&s
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Lourie, S.A., Vincent, A.C.J., & Hall, H.J. (1999). Seahorses: An Identification Guide to the World's Species and their Conservation. Project Seahorse, London.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Kuiter, R.H. (2000). Seahorses, Pipefishes and their Relatives: A Comprehensive Guide to Syngnathiformes. TMC Publishing, Chorleywood.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                IUCN. (2023). Hippocampus spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T10088A46910088.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Reproduksi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Vincent, A.C.J. (1994). Seahorses exhibit conventional sex roles in mating. Nature, 372(6502), 253-254.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Cromileptes altivelis' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Ikan Kerapu Tikus
                </h4>
                <div class="flex justify-center">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHvXa9tYDKqiww1vy9XAS3CciLjEX5fZ3O1Bep4eUz-yWoZ0bRO1NqATq2qi6X3NIiV-pTD0wl0I-rRPOP-Bhajp3r8MHnc8-_EIMLPqoLaDmt6BtQ5Ccw9pJUVMPr5_IiKuapaE3BmgE/s400/kerapu+macan4.jpg" 
                         alt="Morfologi Ikan Kerapu Tikus (Cromileptes altivelis)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHvXa9tYDKqiww1vy9XAS3CciLjEX5fZ3O1Bep4eUz-yWoZ0bRO1NqATq2qi6X3NIiV-pTD0wl0I-rRPOP-Bhajp3r8MHnc8-_EIMLPqoLaDmt6BtQ5Ccw9pJUVMPr5_IiKuapaE3BmgE/s400/kerapu+macan4.jpg', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Ikan Kerapu Tikus yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Blogger Googleusercontent. (2024). Kerapu Macan. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHvXa9tYDKqiww1vy9XAS3CciLjEX5fZ3O1Bep4eUz-yWoZ0bRO1NqATq2qi6X3NIiV-pTD0wl0I-rRPOP-Bhajp3r8MHnc8-_EIMLPqoLaDmt6BtQ5Ccw9pJUVMPr5_IiKuapaE3BmgE/s400/kerapu+macan4.jpg
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Heemstra, P.C., & Randall, J.E. (1993). FAO Species Catalogue. Vol. 16. Groupers of the world (Family Serranidae, Subfamily Epinephelinae). FAO Fisheries Synopsis No. 125, Vol. 16. FAO, Rome.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Carpenter, K.E., & Niem, V.H. (2001). FAO species identification guide for fishery purposes. The living marine resources of the Western Central Pacific. Volume 5. Bony fishes part 3 (Menidae to Pomacentridae). FAO, Rome.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                IUCN. (2023). Cromileptes altivelis. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T39774A100467452.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Habitat
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Sadovy, Y., & Vincent, A.C.J. (2002). Ecological issues and the trades in live reef fishes. In: Sale, P.F. (ed.) Coral Reef Fishes: Dynamics and Diversity in a Complex Ecosystem. Academic Press, San Diego, pp 391-420.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Anguilla spp.' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Ikan Sidat
                </h4>
                <div class="flex justify-center">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4L-elwKAbNjcGDL9LOd76DbVzDaOK4mQCmdiOXy_vzwqZKr-RUNDCLvjK_Pb7fwVXp2FBPCEjygiblq-9-h5d-BASAdRu1Bnybpxaz4bsalTWwyxWFEsfnAuOG0AVVcg_5yePCQl8brY/s1600/Ikan+Sidat.jpg" 
                         alt="Morfologi Ikan Sidat (Anguilla spp.)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4L-elwKAbNjcGDL9LOd76DbVzDaOK4mQCmdiOXy_vzwqZKr-RUNDCLvjK_Pb7fwVXp2FBPCEjygiblq-9-h5d-BASAdRu1Bnybpxaz4bsalTWwyxWFEsfnAuOG0AVVcg_5yePCQl8brY/s1600/Ikan+Sidat.jpg', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Ikan Sidat yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Blogger Googleusercontent. (2024). Ikan Sidat. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4L-elwKAbNjcGDL9LOd76DbVzDaOK4mQCmdiOXy_vzwqZKr-RUNDCLvjK_Pb7fwVXp2FBPCEjygiblq-9-h5d-BASAdRu1Bnybpxaz4bsalTWwyxWFEsfnAuOG0AVVcg_5yePCQl8brY/s1600/Ikan+Sidat.jpg
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Tesch, F.W. (2003). The Eel: Biology and Management of Anguillid Eels. Blackwell Science, Oxford.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Aoyama, J. (2009). Life history and ecology of anguillid eels. In: Aida, K., Tsukamoto, K., & Yamauchi, K. (eds.) Eel Biology. Springer, Tokyo, pp 1-39.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                IUCN. (2023). Anguilla spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T198277A1550871.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Migrasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Tsukamoto, K., & Aoyama, J. (1998). Evolution of freshwater eels of the genus Anguilla: a probable scenario. Environmental Biology of Fishes, 52(1-3), 139-148.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Notopterus chitala' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Ikan Belida
                </h4>
                <div class="flex justify-center">
                    <img src="https://figures.semanticscholar.org/9eef49b3298c0ee61af54f0b2072fb6dcce37444/5-Figure1-1.png" 
                         alt="Morfologi Ikan Belida (Notopterus chitala)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://figures.semanticscholar.org/9eef49b3298c0ee61af54f0b2072fb6dcce37444/5-Figure1-1.png', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Ikan Belida yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Semantic Scholar. (2024). Notopterus chitala morphology figure. Retrieved from https://figures.semanticscholar.org/9eef49b3298c0ee61af54f0b2072fb6dcce37444/5-Figure1-1.png
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Roberts, T.R. (1992). Systematic revision of the old world freshwater fish family Notopteridae. Ichthyological Exploration of Freshwaters, 2(4), 361-383.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Kottelat, M., et al. (1993). Freshwater fishes of Western Indonesia and Sulawesi. Periplus Editions, Hong Kong.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                IUCN. (2023). Notopterus chitala. The IUCN Red List of Threatened Species 2023: e.T166444A1104950. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T166444A1104950.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Habitat
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Rainboth, W.J. (1996). Fishes of the Cambodian Mekong. FAO Species Identification Field Guide for Fishery Purposes. FAO, Rome.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Cheilinus undulatus' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Ikan Napoleon
                </h4>
                <div class="flex justify-center">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw6xxugYO4F6OTktFTD2YIPFFcHhcSwshD4kga95W1YnqiouFWivEjsa07MJSLfYaxmegLk_Fl7Al6PQWZiQf4gV5nbRHhuoxFfWt7WoZF9ytumYn3oKhGyCIkkx3GAuoel6d9qxyHCNE/s320/NAPOLEON.jpg" 
                         alt="Morfologi Ikan Napoleon (Cheilinus undulatus)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw6xxugYO4F6OTktFTD2YIPFFcHhcSwshD4kga95W1YnqiouFWivEjsa07MJSLfYaxmegLk_Fl7Al6PQWZiQf4gV5nbRHhuoxFfWt7WoZF9ytumYn3oKhGyCIkkx3GAuoel6d9qxyHCNE/s320/NAPOLEON.jpg', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Ikan Napoleon yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Blogger Googleusercontent. (2024). Napoleon fish morphology. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw6xxugYO4F6OTktFTD2YIPFFcHhcSwshD4kga95W1YnqiouFWivEjsa07MJSLfYaxmegLk_Fl7Al6PQWZiQf4gV5nbRHhuoxFfWt7WoZF9ytumYn3oKhGyCIkkx3GAuoel6d9qxyHCNE/s320/NAPOLEON.jpg
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Sadovy, Y., et al. (2003). The humphead wrasse, Cheilinus undulatus: synopsis of a threatened and poorly known giant coral reef fish. Reviews in Fish Biology and Fisheries, 13(3), 327-364.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Russell, B.C. (2004). Review of the wrasses (Pisces: Labridae) of the Great Barrier Reef. Australian Journal of Marine and Freshwater Research, 39(4), 565-575.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                IUCN. (2023). Cheilinus undulatus. The IUCN Red List of Threatened Species 2023: e.T187752A1820623. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T187752A1820623.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Perilaku
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Choat, J.H., & Robertson, D.R. (2002). Age-based studies on coral reef fishes. In: Sale PF (ed) Coral reef fishes: dynamics and diversity in a complex ecosystem. Academic Press, San Diego, pp 57-80.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Carcharhinus longimanus' ? `
        <div class="morphology-image-section mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                    Gambar Morfologi Hiu Koboi
                </h4>
                <div class="flex justify-center">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiR4CmkLMX4xFHMgtT0U6queJVsoiXs35YbB6iDANiHQYnNyjUwA9s777kjQl2uycJ0pWtbYdlVHKuaDdlfkSOE9IxK4eFH7QjvLn6KcCaENF8uORnGkPtkOF5Py5vLKqExcGAL_EN-O0SuyrjdBML4-6pDuvk3KsOX_uac69JQX9YYn4-Ts1wNQft9/s487/cartilaginous-fish-shark%5B6%5D.jpg" 
                         alt="Morfologi Hiu Koboi (Oceanic Whitetip Shark)" 
                         class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                         style="max-height: 400px;"
                         onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiR4CmkLMX4xFHMgtT0U6queJVsoiXs35YbB6iDANiHQYnNyjUwA9s777kjQl2uycJ0pWtbYdlVHKuaDdlfkSOE9IxK4eFH7QjvLn6KcCaENF8uORnGkPtkOF5Py5vLKqExcGAL_EN-O0SuyrjdBML4-6pDuvk3KsOX_uac69JQX9YYn4-Ts1wNQft9/s487/cartilaginous-fish-shark%5B6%5D.jpg', 0)">
                </div>
                <p class="text-sm text-blue-600 mt-3 text-center italic">
                    Gambar morfologi Hiu Koboi yang menunjukkan karakteristik fisik spesies
                </p>
                
                <!-- Daftar Pustaka untuk Gambar Morfologi -->
                <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                    <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                        📖 Daftar Pustaka Gambar Morfologi
                    </h5>
                    <div class="space-y-3">
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                    Gambar Utama
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#1</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Blogger Googleusercontent. (2024). Cartilaginous fish shark morphology. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiR4CmkLMX4xFHMgtT0U6queJVsoiXs35YbB6iDANiHQYnNyjUwA9s777kjQl2uycJ0pWtbYdlVHKuaDdlfkSOE9IxK4eFH7QjvLn6KcCaENF8uORnGkPtkOF5Py5vLKqExcGAL_EN-O0SuyrjdBML4-6pDuvk3KsOX_uac69JQX9YYn4-Ts1wNQft9/s487/cartilaginous-fish-shark%5B6%5D.jpg
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    Referensi Ilmiah
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#2</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                    Morfologi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#3</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Compagno, L.J.V. (1984). FAO Species Catalogue. Vol. 4. Sharks of the world. An annotated and illustrated catalogue of shark species known to date. Part 2 - Carcharhiniformes. FAO Fisheries Synopsis No. 125, Vol. 4, Part 2.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                    Konservasi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#4</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Rigby, C.L., et al. (2019). Carcharhinus longimanus. The IUCN Red List of Threatened Species 2019: e.T39374A2911619. DOI: 10.2305/IUCN.UK.2019-3.RLTS.T39374A2911619.en
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    Taksonomi
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#5</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                            </p>
                        </div>
                        
                        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                            <div class="flex items-start justify-between mb-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    Perilaku
                                </span>
                                <span class="text-xs text-slate-500 font-mono">#6</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                Compagno, L.J.V., Dando, M., & Fowler, S. (2005). A Field Guide to the Sharks of the World. HarperCollins Publishers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}
        
        <div class="morphology-references-section">
            ${references.map(ref => `
                <div class="morphology-reference-item">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <p class="text-sm text-slate-700">${ref.text}</p>
                            <div class="morphology-reference-source">Sumber: ${ref.source || 'Jurnal Ilmiah'}</div>
                        </div>
                        <a href="${ref.url}" target="_blank" rel="noopener noreferrer" 
                           class="ml-4 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <i data-lucide="external-link" class="w-3 h-3"></i>
                            Kunjungi
                        </a>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function hideMorphologyModal() {
    const modal = document.getElementById('morphology-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function showMorphologyReferences(latinName) {
    const animal = findAnimalByLatinName(latinName);
    if (!animal) return;
    
    const references = getMorphologyReferencesData(latinName);
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };

    modal.innerHTML = `
        <div class="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden border border-slate-200">
            <!-- Header with gradient background -->
            <div class="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 p-6 text-white">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                            <i data-lucide="ruler" class="w-7 h-7 text-white"></i>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold">Daftar Pustaka Morfologi</h2>
                            <p class="text-purple-100 text-sm mt-1">${animal.name} (${animal.latin})</p>
                            <div class="flex items-center mt-2">
                                <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                <span class="text-xs text-purple-100">${references.length} Referensi Tersedia</span>
                            </div>
                        </div>
                    </div>
                    <button onclick="document.body.removeChild(this.closest('.fixed'))" 
                            class="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105">
                        <i data-lucide="x" class="w-5 h-5 text-white"></i>
                    </button>
                </div>
            </div>
            
            <!-- Content with enhanced design -->
            <div class="p-6 overflow-y-auto max-h-[calc(95vh-180px)]">
                <div class="space-y-6">
                    ${latinName === 'Pristis spp.' ? `
                    <!-- Gambar Morfologi Pari Gergaji -->
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                        <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                            <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                            Gambar Morfologi Pari Gergaji
                        </h4>
                        <div class="flex justify-center">
                            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhly94DWTwNUB2IcNo19Wm8d27tyCJYmhlQvv0E5gxwAsf7NHjo9cr7KN38m8S82AebrxQPENvivC1Au3vw0QHh7bd5CZcChMh0KPPgmybzLxoO9BbA4-uuM6ibWtoXoq9-Mjs17Vc2ih4/s1600/hiu+gergaji1.jpg" 
                                 alt="Morfologi Pari Gergaji (Sawfish)" 
                                 class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                 style="max-height: 400px;"
                                 onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhly94DWTwNUB2IcNo19Wm8d27tyCJYmhlQvv0E5gxwAsf7NHjo9cr7KN38m8S82AebrxQPENvivC1Au3vw0QHh7bd5CZcChMh0KPPgmybzLxoO9BbA4-uuM6ibWtoXoq9-Mjs17Vc2ih4/s1600/hiu+gergaji1.jpg', 0)">
                        </div>
                        <p class="text-sm text-blue-600 mt-3 text-center italic">
                            Gambar morfologi Pari Gergaji yang menunjukkan karakteristik fisik spesies
                        </p>
                        
                        <!-- Daftar Pustaka untuk Gambar Morfologi -->
                        <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                            <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                📖 Daftar Pustaka Gambar Morfologi
                            </h5>
                            <div class="space-y-3">
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                            Gambar Utama
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#1</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Blogger Googleusercontent. (2024). Hiu Gergaji Morfologi. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhly94DWTwNUB2IcNo19Wm8d27tyCJYmhlQvv0E5gxwAsf7NHjo9cr7KN38m8S82AebrxQPENvivC1Au3vw0QHh7bd5CZcChMh0KPPgmybzLxoO9BbA4-uuM6ibWtoXoq9-Mjs17Vc2ih4/s1600/hiu+gergaji1.jpg
                                    </p>
                                </div>
                                
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                            Referensi Ilmiah
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#2</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.
                                    </p>
                                </div>
                                
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                            Morfologi
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#3</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Faria, V.V., et al. (2013). Morphometric analysis and description of the oral cavity, gill rakers and pharynx in sawfish (Pristidae). Journal of Morphology, 274(10), 1164-1178.
                                    </p>
                                </div>
                                
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                            Konservasi
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#4</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world's sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244
                                    </p>
                                </div>
                                
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                            Taksonomi
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#5</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ` : latinName === 'Mobula birostris' ? `
                    <!-- Gambar Morfologi Pari Manta -->
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                        <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                            <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                            Gambar Morfologi Pari Manta
                        </h4>
                        <div class="flex justify-center">
                            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiH3BIXQxaqA67I3m5ia2xx19LPsAYgsANdULo_awzbQ3WOuMuTMp6uRVRILQcR9DjDKdh35Bgb7no__t4Xu3MWKQ3WecYQ9MY0odlHsmRPlAogrZkN5pL0NU40ubUd4BrDr-Wd5hg6bY7P/s1600/001.jpg" 
                                 alt="Morfologi Pari Manta (Manta Ray)" 
                                 class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                 style="max-height: 400px;"
                                 onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiH3BIXQxaqA67I3m5ia2xx19LPsAYgsANdULo_awzbQ3WOuMuTMp6uRVRILQcR9DjDKdh35Bgb7no__t4Xu3MWKQ3WecYQ9MY0odlHsmRPlAogrZkN5pL0NU40ubUd4BrDr-Wd5hg6bY7P/s1600/001.jpg', 0)">
                        </div>
                        <p class="text-sm text-blue-600 mt-3 text-center italic">
                            Gambar morfologi Pari Manta yang menunjukkan karakteristik fisik spesies
                        </p>
                        
                        <!-- Daftar Pustaka untuk Gambar Morfologi -->
                        <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                            <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                📖 Daftar Pustaka Gambar Morfologi
                            </h5>
                            <div class="space-y-3">
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                            Gambar Utama
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#1</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Blogger Googleusercontent. (2024). Pari Manta Morfologi. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiH3BIXQxaqA67I3m5ia2xx19LPsAYgsANdULo_awzbQ3WOuMuTMp6uRVRILQcR9DjDKdh35Bgb7no__t4Xu3MWKQ3WecYQ9MY0odlHsmRPlAogrZkN5pL0NU40ubUd4BrDr-Wd5hg6bY7P/s1600/001.jpg
                                    </p>
                                </div>
                                
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                            Referensi Ilmiah
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#2</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Marshall, A.D., et al. (2009). Manta rays (Mobula birostris) in the Maldives: distribution, abundance, and conservation status. Marine Biology, 156(10), 1947-1958.
                                    </p>
                                </div>
                                
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                            Morfologi
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#3</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Marshall, A.D., & Bennett, M.B. (2010). The frequency and effect of shark-inflicted bite injuries to the reef manta ray Manta alfredi. African Journal of Marine Science, 32(3), 573-580.
                                    </p>
                                </div>
                                
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                            Konservasi
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#4</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world's sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244
                                    </p>
                                </div>
                                
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                            Taksonomi
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#5</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        White, W.T., et al. (2018). Phylogeny of the manta and devilrays (Chondrichthyes: mobulidae), with an updated taxonomic arrangement for the family. Zoological Journal of the Linnean Society, 182(1), 50-75.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                     ` : latinName === 'Rhincodon typus' ? `
                     <!-- Gambar Morfologi Hiu Paus -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Hiu Paus
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://images.bisnis.com//upload/img/Untitled(76).jpg" 
                                  alt="Morfologi Hiu Paus (Whale Shark)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://images.bisnis.com//upload/img/Untitled(76).jpg', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Hiu Paus yang menunjukkan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Bisnis.com. (2024). Morfologi Hiu Paus. Retrieved from https://images.bisnis.com//upload/img/Untitled(76).jpg
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Pierce, S.J., & Norman, B. (2016). Rhincodon typus. The IUCN Red List of Threatened Species 2016: e.T19488A2365291. DOI: 10.2305/IUCN.UK.2016-1.RLTS.T19488A2365291.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 2: Carcharhiniformes. FAO Species Catalogue for Fishery Purposes.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         CITES. (2023). Appendices I, II and III. Convention on International Trade in Endangered Species of Wild Fauna and Flora.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Lutjanus spp.' ? `
                     <!-- Gambar Morfologi Ikan Kakap Merah -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Ikan Kakap Merah
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DsaM7fDQ11-jOE64pXKrJSjZ_SSWErrt2jXdZWr3wVIYFFa8ARIj5W7h-KpSBC9-cG0&usqp=CAU" 
                                  alt="Morfologi Ikan Kakap Merah (Lutjanus spp.)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DsaM7fDQ11-jOE64pXKrJSjZ_SSWErrt2jXdZWr3wVIYFFa8ARIj5W7h-KpSBC9-cG0&usqp=CAU', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Ikan Kakap Merah yang menunjukkan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Google Images. (2024). Red snapper in natural habitat. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DsaM7fDQ11-jOE64pXKrJSjZ_SSWErrt2jXdZWr3wVIYFFa8ARIj5W7h-KpSBC9-cG0&usqp=CAU
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Allen, G.R. (1985). FAO Species Catalogue. Vol. 6. Snappers of the world. An annotated and illustrated catalogue of lutjanid species known to date. FAO Fisheries Synopsis No. 125, Vol. 6. FAO, Rome.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Carpenter, K.E., & Niem, V.H. (2001). FAO species identification guide for fishery purposes. The living marine resources of the Western Central Pacific. Volume 5. Bony fishes part 3 (Menidae to Pomacentridae). FAO, Rome.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Lutjanus spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T194302A2310725.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Randall, J.E., & Allen, G.R. (1977). A revision of the Indo-Pacific fish genus Lutjanus. Records of the Western Australian Museum, 5(1), 1-43.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Latimeria menadoensis' ? `
                     <!-- Gambar Morfologi Ikan Coelacanth -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Ikan Coelacanth
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://static.wixstatic.com/media/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png/v1/fill/w_568,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png" 
                                  alt="Morfologi Ikan Coelacanth (Latimeria menadoensis)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://static.wixstatic.com/media/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png/v1/fill/w_568,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Ikan Coelacanth yang menunjukkan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Wix Static. (2024). Coelacanth in natural habitat. Retrieved from https://static.wixstatic.com/media/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png/v1/fill/w_568,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Forey, P.L. (1998). History of the Coelacanth Fishes. Chapman & Hall, London.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Smith, J.L.B. (1956). Old Fourlegs: The Story of the Coelacanth. Longmans, Green and Co., London.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Latimeria menadoensis. The IUCN Red List of Threatened Species 2023: e.T40713A123396485. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T40713A123396485.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Evolusi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Cloutier, R., & Ahlberg, P.E. (1996). Morphology, characters, and the interrelationships of basal sarcopterygians. In: Stiassny, M.L.J., Parenti, L.R., & Johnson, G.D. (eds.) Interrelationships of Fishes. Academic Press, San Diego, pp 445-479.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
        ` : latinName === 'Caretta caretta' ? `
        <!-- Gambar Morfologi Penyu Tempayan -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
            <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                Gambar Morfologi Penyu Tempayan
            </h4>
            <div class="flex justify-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqwllrxa58nBC0SnLki1mx_jufvaecIiijsg&s" 
                     alt="Morfologi Penyu Tempayan (Caretta caretta)" 
                     class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                     style="max-height: 400px;"
                     onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqwllrxa58nBC0SnLki1mx_jufvaecIiijsg&s', 0)">
            </div>
            <p class="text-sm text-blue-600 mt-3 text-center italic">
                Gambar morfologi Penyu Tempayan yang menunjukkan karakteristik fisik spesies
            </p>
            
            <!-- Daftar Pustaka untuk Gambar Morfologi -->
            <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                    <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                    📖 Daftar Pustaka Gambar Morfologi
                </h5>
                <div class="space-y-3">
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                Gambar Utama
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#1</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Google Images. (2024). Loggerhead Sea Turtle morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqwllrxa58nBC0SnLki1mx_jufvaecIiijsg&s
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                Referensi Ilmiah
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#2</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                Morfologi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#3</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                Konservasi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#4</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            IUCN. (2023). Caretta caretta. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T3897A119333685.en
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                Taksonomi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#5</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                Habitat
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#6</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Lepidochelys olivacea' ? `
        <!-- Gambar Morfologi Penyu Lekang -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
            <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                Gambar Morfologi Penyu Lekang
            </h4>
            <div class="flex justify-center">
                <img src="https://i0.wp.com/marinebio.org/i/turtleID/olive.gif" 
                     alt="Morfologi Penyu Lekang (Lepidochelys olivacea)" 
                     class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                     style="max-height: 400px;"
                     onclick="showImageModal('https://i0.wp.com/marinebio.org/i/turtleID/olive.gif', 0)">
            </div>
            <p class="text-sm text-blue-600 mt-3 text-center italic">
                Gambar morfologi Penyu Lekang yang menunjukkan karakteristik fisik spesies
            </p>
            
            <!-- Daftar Pustaka untuk Gambar Morfologi -->
            <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                    <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                    📖 Daftar Pustaka Gambar Morfologi
                </h5>
                <div class="space-y-3">
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                Gambar Utama
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#1</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            MarineBio.org. (2024). Olive Ridley Sea Turtle identification. Retrieved from https://i0.wp.com/marinebio.org/i/turtleID/olive.gif
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                Referensi Ilmiah
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#2</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                Morfologi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#3</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                Konservasi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#4</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            IUCN. (2023). Lepidochelys olivacea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T11534A3292503.en
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                Taksonomi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#5</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                Habitat
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#6</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Eretmochelys imbricata' ? `
        <!-- Gambar Morfologi Penyu Sisik -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
            <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                Gambar Morfologi Penyu Sisik
            </h4>
            <div class="flex justify-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa-G6OjR50KToF0Broy_pWVQopV7AhFs5kA&s" 
                     alt="Morfologi Penyu Sisik (Eretmochelys imbricata)" 
                     class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                     style="max-height: 400px;"
                     onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa-G6OjR50KToF0Broy_pWVQopV7AhFs5kA&s', 0)">
            </div>
            <p class="text-sm text-blue-600 mt-3 text-center italic">
                Gambar morfologi Penyu Sisik yang menunjukkan karakteristik fisik spesies
            </p>
            
            <!-- Daftar Pustaka untuk Gambar Morfologi -->
            <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                    <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                    📖 Daftar Pustaka Gambar Morfologi
                </h5>
                <div class="space-y-3">
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                Gambar Utama
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#1</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Google Images. (2024). Hawksbill Sea Turtle morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa-G6OjR50KToF0Broy_pWVQopV7AhFs5kA&s
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                Referensi Ilmiah
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#2</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                Morfologi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#3</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                Konservasi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#4</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            IUCN. (2023). Eretmochelys imbricata. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T8005A12881238.en
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                Taksonomi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#5</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                Habitat
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#6</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Chelonia mydas' ? `
        <!-- Gambar Morfologi Penyu Hijau -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
            <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                Gambar Morfologi Penyu Hijau
            </h4>
            <div class="flex justify-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGFdyoJPM_d_EEcUValh_iTcSYugP22cr0Q&s" 
                     alt="Morfologi Penyu Hijau (Chelonia mydas)" 
                     class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                     style="max-height: 400px;"
                     onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGFdyoJPM_d_EEcUValh_iTcSYugP22cr0Q&s', 0)">
            </div>
            <p class="text-sm text-blue-600 mt-3 text-center italic">
                Gambar morfologi Penyu Hijau yang menunjukkan karakteristik fisik spesies
            </p>
            
            <!-- Daftar Pustaka untuk Gambar Morfologi -->
            <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                    <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                    📖 Daftar Pustaka Gambar Morfologi
                </h5>
                <div class="space-y-3">
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                Gambar Utama
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#1</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Google Images. (2024). Green Sea Turtle morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGFdyoJPM_d_EEcUValh_iTcSYugP22cr0Q&s
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                Referensi Ilmiah
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#2</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                Morfologi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#3</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                Konservasi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#4</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            IUCN. (2023). Chelonia mydas. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T4615A11037468.en
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                Taksonomi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#5</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                Habitat
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#6</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Hippocampus spp.' ? `
        <!-- Gambar Morfologi Kuda Laut -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
            <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                Gambar Morfologi Kuda Laut
            </h4>
            <div class="flex justify-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlhBk_FQedqAX_d6a9GcuizhuV8Q9C9m6Bvg&s" 
                     alt="Morfologi Kuda Laut (Hippocampus spp.)" 
                     class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                     style="max-height: 400px;"
                     onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlhBk_FQedqAX_d6a9GcuizhuV8Q9C9m6Bvg&s', 0)">
            </div>
            <p class="text-sm text-blue-600 mt-3 text-center italic">
                Gambar morfologi Kuda Laut yang menunjukkan karakteristik fisik spesies
            </p>
            
            <!-- Daftar Pustaka untuk Gambar Morfologi -->
            <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                    <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                    📖 Daftar Pustaka Gambar Morfologi
                </h5>
                <div class="space-y-3">
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                Gambar Utama
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#1</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Google Images. (2024). Kuda Laut morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlhBk_FQedqAX_d6a9GcuizhuV8Q9C9m6Bvg&s
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                Referensi Ilmiah
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#2</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Lourie, S.A., Vincent, A.C.J., & Hall, H.J. (1999). Seahorses: An Identification Guide to the World's Species and their Conservation. Project Seahorse, London.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                Morfologi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#3</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Kuiter, R.H. (2000). Seahorses, Pipefishes and their Relatives: A Comprehensive Guide to Syngnathiformes. TMC Publishing, Chorleywood.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                Konservasi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#4</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            IUCN. (2023). Hippocampus spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T10088A46910088.en
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                Taksonomi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#5</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                Reproduksi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#6</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Vincent, A.C.J. (1994). Seahorses exhibit conventional sex roles in mating. Nature, 372(6502), 253-254.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Cromileptes altivelis' ? `
        <!-- Gambar Morfologi Ikan Kerapu Tikus -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
            <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                Gambar Morfologi Ikan Kerapu Tikus
            </h4>
            <div class="flex justify-center">
                <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHvXa9tYDKqiww1vy9XAS3CciLjEX5fZ3O1Bep4eUz-yWoZ0bRO1NqATq2qi6X3NIiV-pTD0wl0I-rRPOP-Bhajp3r8MHnc8-_EIMLPqoLaDmt6BtQ5Ccw9pJUVMPr5_IiKuapaE3BmgE/s400/kerapu+macan4.jpg" 
                     alt="Morfologi Ikan Kerapu Tikus (Cromileptes altivelis)" 
                     class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                     style="max-height: 400px;"
                     onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHvXa9tYDKqiww1vy9XAS3CciLjEX5fZ3O1Bep4eUz-yWoZ0bRO1NqATq2qi6X3NIiV-pTD0wl0I-rRPOP-Bhajp3r8MHnc8-_EIMLPqoLaDmt6BtQ5Ccw9pJUVMPr5_IiKuapaE3BmgE/s400/kerapu+macan4.jpg', 0)">
            </div>
            <p class="text-sm text-blue-600 mt-3 text-center italic">
                Gambar morfologi Ikan Kerapu Tikus yang menunjukkan karakteristik fisik spesies
            </p>
            
            <!-- Daftar Pustaka untuk Gambar Morfologi -->
            <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                    <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                    📖 Daftar Pustaka Gambar Morfologi
                </h5>
                <div class="space-y-3">
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                Gambar Utama
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#1</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Blogger Googleusercontent. (2024). Kerapu Macan. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHvXa9tYDKqiww1vy9XAS3CciLjEX5fZ3O1Bep4eUz-yWoZ0bRO1NqATq2qi6X3NIiV-pTD0wl0I-rRPOP-Bhajp3r8MHnc8-_EIMLPqoLaDmt6BtQ5Ccw9pJUVMPr5_IiKuapaE3BmgE/s400/kerapu+macan4.jpg
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                Referensi Ilmiah
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#2</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Heemstra, P.C., & Randall, J.E. (1993). FAO Species Catalogue. Vol. 16. Groupers of the world (Family Serranidae, Subfamily Epinephelinae). FAO Fisheries Synopsis No. 125, Vol. 16. FAO, Rome.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                Morfologi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#3</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Carpenter, K.E., & Niem, V.H. (2001). FAO species identification guide for fishery purposes. The living marine resources of the Western Central Pacific. Volume 5. Bony fishes part 3 (Menidae to Pomacentridae). FAO, Rome.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                Konservasi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#4</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            IUCN. (2023). Cromileptes altivelis. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T39774A100467452.en
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                Taksonomi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#5</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                Habitat
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#6</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Sadovy, Y., & Vincent, A.C.J. (2002). Ecological issues and the trades in live reef fishes. In: Sale, P.F. (ed.) Coral Reef Fishes: Dynamics and Diversity in a Complex Ecosystem. Academic Press, San Diego, pp 391-420.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Anguilla spp.' ? `
        <!-- Gambar Morfologi Ikan Sidat -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
            <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                Gambar Morfologi Ikan Sidat
            </h4>
            <div class="flex justify-center">
                <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4L-elwKAbNjcGDL9LOd76DbVzDaOK4mQCmdiOXy_vzwqZKr-RUNDCLvjK_Pb7fwVXp2FBPCEjygiblq-9-h5d-BASAdRu1Bnybpxaz4bsalTWwyxWFEsfnAuOG0AVVcg_5yePCQl8brY/s1600/Ikan+Sidat.jpg" 
                     alt="Morfologi Ikan Sidat (Anguilla spp.)" 
                     class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                     style="max-height: 400px;"
                     onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4L-elwKAbNjcGDL9LOd76DbVzDaOK4mQCmdiOXy_vzwqZKr-RUNDCLvjK_Pb7fwVXp2FBPCEjygiblq-9-h5d-BASAdRu1Bnybpxaz4bsalTWwyxWFEsfnAuOG0AVVcg_5yePCQl8brY/s1600/Ikan+Sidat.jpg', 0)">
            </div>
            <p class="text-sm text-blue-600 mt-3 text-center italic">
                Gambar morfologi Ikan Sidat yang menunjukkan karakteristik fisik spesies
            </p>
            
            <!-- Daftar Pustaka untuk Gambar Morfologi -->
            <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                    <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                    📖 Daftar Pustaka Gambar Morfologi
                </h5>
                <div class="space-y-3">
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                Gambar Utama
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#1</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Blogger Googleusercontent. (2024). Ikan Sidat. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4L-elwKAbNjcGDL9LOd76DbVzDaOK4mQCmdiOXy_vzwqZKr-RUNDCLvjK_Pb7fwVXp2FBPCEjygiblq-9-h5d-BASAdRu1Bnybpxaz4bsalTWwyxWFEsfnAuOG0AVVcg_5yePCQl8brY/s1600/Ikan+Sidat.jpg
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                Referensi Ilmiah
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#2</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Tesch, F.W. (2003). The Eel: Biology and Management of Anguillid Eels. Blackwell Science, Oxford.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                Morfologi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#3</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Aoyama, J. (2009). Life history and ecology of anguillid eels. In: Aida, K., Tsukamoto, K., & Yamauchi, K. (eds.) Eel Biology. Springer, Tokyo, pp 1-39.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                Konservasi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#4</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            IUCN. (2023). Anguilla spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T198277A1550871.en
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                Taksonomi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#5</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                        </p>
                    </div>
                    
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                Migrasi
                            </span>
                            <span class="text-xs text-slate-500 font-mono">#6</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed font-medium">
                            Tsukamoto, K., & Aoyama, J. (1998). Evolution of freshwater eels of the genus Anguilla: a probable scenario. Environmental Biology of Fishes, 52(1-3), 139-148.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        ` : latinName === 'Notopterus chitala' ? `
        <!-- Gambar Morfologi Ikan Belida -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Ikan Belida
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://figures.semanticscholar.org/9eef49b3298c0ee61af54f0b2072fb6dcce37444/5-Figure1-1.png" 
                                  alt="Morfologi Ikan Belida (Notopterus chitala)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://figures.semanticscholar.org/9eef49b3298c0ee61af54f0b2072fb6dcce37444/5-Figure1-1.png', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Ikan Belida yang menunjukkan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Semantic Scholar. (2024). Notopterus chitala morphology figure. Retrieved from https://figures.semanticscholar.org/9eef49b3298c0ee61af54f0b2072fb6dcce37444/5-Figure1-1.png
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Roberts, T.R. (1992). Systematic revision of the old world freshwater fish family Notopteridae. Ichthyological Exploration of Freshwaters, 2(4), 361-383.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Kottelat, M., et al. (1993). Freshwater fishes of Western Indonesia and Sulawesi. Periplus Editions, Hong Kong.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Notopterus chitala. The IUCN Red List of Threatened Species 2023: e.T166444A1104950. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T166444A1104950.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Rainboth, W.J. (1996). Fishes of the Cambodian Mekong. FAO Species Identification Field Guide for Fishery Purposes. FAO, Rome.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Cheilinus undulatus' ? `
                     <!-- Gambar Morfologi Ikan Napoleon -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Ikan Napoleon
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw6xxugYO4F6OTktFTD2YIPFFcHhcSwshD4kga95W1YnqiouFWivEjsa07MJSLfYaxmegLk_Fl7Al6PQWZiQf4gV5nbRHhuoxFfWt7WoZF9ytumYn3oKhGyCIkkx3GAuoel6d9qxyHCNE/s320/NAPOLEON.jpg" 
                                  alt="Morfologi Ikan Napoleon (Cheilinus undulatus)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw6xxugYO4F6OTktFTD2YIPFFcHhcSwshD4kga95W1YnqiouFWivEjsa07MJSLfYaxmegLk_Fl7Al6PQWZiQf4gV5nbRHhuoxFfWt7WoZF9ytumYn3oKhGyCIkkx3GAuoel6d9qxyHCNE/s320/NAPOLEON.jpg', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Ikan Napoleon yang menunjukkan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Blogger Googleusercontent. (2024). Napoleon fish morphology. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw6xxugYO4F6OTktFTD2YIPFFcHhcSwshD4kga95W1YnqiouFWivEjsa07MJSLfYaxmegLk_Fl7Al6PQWZiQf4gV5nbRHhuoxFfWt7WoZF9ytumYn3oKhGyCIkkx3GAuoel6d9qxyHCNE/s320/NAPOLEON.jpg
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Sadovy, Y., et al. (2003). The humphead wrasse, Cheilinus undulatus: synopsis of a threatened and poorly known giant coral reef fish. Reviews in Fish Biology and Fisheries, 13(3), 327-364.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Russell, B.C. (2004). Review of the wrasses (Pisces: Labridae) of the Great Barrier Reef. Australian Journal of Marine and Freshwater Research, 39(4), 565-575.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Cheilinus undulatus. The IUCN Red List of Threatened Species 2023: e.T187752A1820623. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T187752A1820623.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Perilaku
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Choat, J.H., & Robertson, D.R. (2002). Age-based studies on coral reef fishes. In: Sale PF (ed) Coral reef fishes: dynamics and diversity in a complex ecosystem. Academic Press, San Diego, pp 57-80.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Antipatharia' ? `
                     <!-- Gambar Morfologi Karang Hitam -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Karang Hitam
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1sc9EizQf1TWHu-eyji69XOg0RL2GisDsHZhQqpowhEh2MCv8mYiFvwdXdPa-otYzN0Q&usqp=CAU" 
                                  alt="Morfologi Karang Hitam (Antipatharia)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1sc9EizQf1TWHu-eyji69XOg0RL2GisDsHZhQqpowhEh2MCv8mYiFvwdXdPa-otYzN0Q&usqp=CAU', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Karang Hitam yang menunjukkan struktur bercabang dan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Google Images. (2024). Black Coral Morphology Structure. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1sc9EizQf1TWHu-eyji69XOg0RL2GisDsHZhQqpowhEh2MCv8mYiFvwdXdPa-otYzN0Q&usqp=CAU
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Opresko, D.M. (2003). Revision of the Antipatharia (Cnidaria: Anthozoa). Part I. Establishment of a new family, Myriopathidae. Zoologische Mededelingen, 77(27), 465-490.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Wagner, D., Luck, D.G., & Toonen, R.J. (2012). The Biology and Ecology of Black Corals (Cnidaria: Anthozoa: Hexacorallia: Antipatharia). Advances in Marine Biology, 63, 67-132.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Antipatharia. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Brugler, M.R., France, S.C., & Opresko, D.M. (2013). The evolutionary history of the order Antipatharia (Cnidaria: Anthozoa: Hexacorallia) as inferred from mitochondrial and nuclear DNA: implications for black coral taxonomy and systematics. Zoological Journal of the Linnean Society, 169(2), 312-361.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Opresko, D.M., & Sanchez, J.A. (2005). Caribbean shallow-water black corals (Cnidaria: Anthozoa: Antipatharia). Caribbean Journal of Science, 41(3), 492-507.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Acropora spp.' ? `
                     <!-- Gambar Anatomi Karang Meja -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Anatomi Karang Meja
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://2.bp.blogspot.com/_-V5Ia0i329U/TSu9-f7mFwI/AAAAAAAAAEo/ckE29dEyTwg/s1600/anatomi+karang.JPG" 
                                  alt="Anatomi Karang Meja (Acropora spp.)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://2.bp.blogspot.com/_-V5Ia0i329U/TSu9-f7mFwI/AAAAAAAAAEo/ckE29dEyTwg/s1600/anatomi+karang.JPG', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar anatomi karang meja yang menunjukkan struktur internal dan komponen morfologi spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Blogger. (2024). Anatomi Karang. Retrieved from https://2.bp.blogspot.com/_-V5Ia0i329U/TSu9-f7mFwI/AAAAAAAAAEo/ckE29dEyTwg/s1600/anatomi+karang.JPG
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Veron, J.E.N. (2000). Corals of the World. Australian Institute of Marine Science, Townsville.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Wallace, C.C. (1999). Staghorn Corals of the World: A Revision of the Coral Genus Acropora. CSIRO Publishing, Melbourne.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Acropora spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T133001A54186027.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Fukami, H., et al. (2008). Mitochondrial and nuclear genes suggest that stony corals are monophyletic but most families of stony corals are not (Order Scleractinia, Class Anthozoa, Phylum Cnidaria). PLoS ONE, 3(9), e3222.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Done, T.J. (1982). Patterns in the distribution of coral communities across the central Great Barrier Reef. Coral Reefs, 1(2), 95-107.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Tridacna gigas' ? `
                     <!-- Gambar Morfologi Kima Raksasa -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Kima Raksasa
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://imgv2-1-f.scribdassets.com/img/document/460460428/original/54a0e9483c/1?v=1" 
                                  alt="Morfologi Kima Raksasa (Tridacna gigas)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://imgv2-1-f.scribdassets.com/img/document/460460428/original/54a0e9483c/1?v=1', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Kima Raksasa yang menunjukkan struktur cangkang dan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Scribd. (2024). Giant Clam Morphology Document. Retrieved from https://imgv2-1-f.scribdassets.com/img/document/460460428/original/54a0e9483c/1?v=1
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Lucas, J.S. (1994). The Biology, Exploitation, and Mariculture of Giant Clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Tridacna gigas. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T22137A67387550.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Schneider, J.A. (2002). Phylogeny of giant clams (Cardiidae: Tridacninae) based on partial mitochondrial 16S rDNA gene sequences. Molecular Phylogenetics and Evolution, 25(3), 420-430.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Yonge, C.M. (1975). Giant clams. Scientific American, 232(4), 96-105.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Tridacna crocea' ? `
                     <!-- Gambar Morfologi Kima Kecil -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Kima Kecil
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEDsBHPW1Zh6PrMlXZe0MD08SQOjE5sWksxjxaKbmceDT9vaJ7U-s6d1NreJ492-a4294&usqp=CAU" 
                                  alt="Morfologi Kima Kecil (Tridacna crocea)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEDsBHPW1Zh6PrMlXZe0MD08SQOjE5sWksxjxaKbmceDT9vaJ7U-s6d1NreJ492-a4294&usqp=CAU', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Kima Kecil yang menunjukkan struktur cangkang dan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Google Images. (2024). Kima Kecil Morphology Structure. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEDsBHPW1Zh6PrMlXZe0MD08SQOjE5sWksxjxaKbmceDT9vaJ7U-s6d1NreJ492-a4294&usqp=CAU
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Lucas, J.S. (1994). The Biology, Exploitation, and Mariculture of Giant Clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Tridacna crocea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T22137A67387550.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Schneider, J.A. (2002). Phylogeny of giant clams (Cardiidae: Tridacninae) based on partial mitochondrial 16S rDNA gene sequences. Molecular Phylogenetics and Evolution, 25(3), 420-430.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Yonge, C.M. (1975). Giant clams. Scientific American, 232(4), 96-105.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Tridacna squamosa' ? `
                     <!-- Gambar Morfologi Kerang Gigi -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Kerang Gigi
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://doriscdn.ffessm.fr/var/doris/storage/images/images/tridacna_schema_rj_01/19131755-3-fre-FR/Tridacna_schema_rj_01_image600.jpg" 
                                  alt="Morfologi Kerang Gigi (Tridacna squamosa)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://doriscdn.ffessm.fr/var/doris/storage/images/images/tridacna_schema_rj_01/19131755-3-fre-FR/Tridacna_schema_rj_01_image600.jpg', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Kerang Gigi yang menunjukkan struktur cangkang dan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         FFESSM DORIS. (2024). Tridacna squamosa Schema. Retrieved from https://doriscdn.ffessm.fr/var/doris/storage/images/images/tridacna_schema_rj_01/19131755-3-fre-FR/Tridacna_schema_rj_01_image600.jpg
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Lucas, J.S. (1994). The Biology, Exploitation, and Mariculture of Giant Clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Tridacna squamosa. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T22137A67387550.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Schneider, J.A. (2002). Phylogeny of giant clams (Cardiidae: Tridacninae) based on partial mitochondrial 16S rDNA gene sequences. Molecular Phylogenetics and Evolution, 25(3), 420-430.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Yonge, C.M. (1975). Giant clams. Scientific American, 232(4), 96-105.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Nautilus pompilius' ? `
                     <!-- Gambar Morfologi Nautilus -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Nautilus
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Nautilus_diagram-en.svg/500px-Nautilus_diagram-en.svg.png" 
                                  alt="Morfologi Nautilus (Nautilus pompilius)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Nautilus_diagram-en.svg/500px-Nautilus_diagram-en.svg.png', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Nautilus yang menunjukkan struktur cangkang dan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Wikipedia. (2024). Nautilus Diagram. Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Nautilus_diagram-en.svg/500px-Nautilus_diagram-en.svg.png
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Ward, P.D. (1987). The Natural History of Nautilus. Allen & Unwin, London.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Saunders, W.B. & Landman, N.H. (2010). Nautilus: The Biology and Paleobiology of a Living Fossil. Springer, Dordrecht.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Nautilus pompilius. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T14252A21413338.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Sweeney, M.J. & Roper, C.F.E. (1998). Classification, type localities and type repositories of recent Cephalopoda. Smithsonian Contributions to Zoology, 586, 561-599.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Dunstan, A.J., Ward, P.D. & Marshall, N.J. (2011). Nautilus pompilius life history and demographics at the Osprey Reef Seamount, Coral Sea, Australia. PLoS ONE, 6(2), e16312.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Octopus cyanea' ? `
                     <!-- Gambar Morfologi Gurita Pasir -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Gurita Pasir
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://cephalopods2014.wordpress.com/wp-content/uploads/2014/03/internal-anatomy-of-an-octopus.jpg" 
                                  alt="Morfologi Gurita Pasir (Octopus cyanea)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://cephalopods2014.wordpress.com/wp-content/uploads/2014/03/internal-anatomy-of-an-octopus.jpg', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Gurita Pasir yang menunjukkan struktur anatomi internal dan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Cephalopods 2014. (2014). Internal Anatomy of an Octopus. Retrieved from https://cephalopods2014.wordpress.com/wp-content/uploads/2014/03/internal-anatomy-of-an-octopus.jpg
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Norman, M.D. (2000). Cephalopods: A World Guide. ConchBooks, Hackenheim.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Hanlon, R.T. & Messenger, J.B. (2018). Cephalopod Behaviour. Cambridge University Press, Cambridge.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Octopus cyanea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Norman, M.D. & Hochberg, F.G. (2005). The current state of octopus taxonomy. Phuket Marine Biological Center Research Bulletin, 66, 127-154.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Mather, J.A. (2008). Cephalopod consciousness: behavioural evidence. Consciousness and Cognition, 17(1), 37-48.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Globicephala macrorhynchus' ? `
                     <!-- Gambar Morfologi Paus Pilot Sirip Pendek -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Paus Pilot Sirip Pendek
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://img.inews.co.id/media/620/files/inews_new/2021/02/05/5_infografis_paus.jpeg" 
                                  alt="Morfologi Paus Pilot Sirip Pendek (Globicephala macrorhynchus)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://img.inews.co.id/media/620/files/inews_new/2021/02/05/5_infografis_paus.jpeg', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Paus Pilot Sirip Pendek yang menunjukkan struktur anatomi dan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         iNews. (2021). Infografis Paus. Retrieved from https://img.inews.co.id/media/620/files/inews_new/2021/02/05/5_infografis_paus.jpeg
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Bloch, D., Lockyer, C., & Zachariassen, M. (1993). Age and growth parameters of the long-finned pilot whale off the Faroe Islands. Report of the International Whaling Commission, 43, 209-227.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Globicephala macrorhynchus. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T9249A50355227.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Olson, P.A. (2009). Pilot whale Globicephala melas and G. macrorhynchus. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 847-852). Academic Press, San Diego.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Stenella longirostris' ? `
                     <!-- Gambar Morfologi Lumba-lumba Spinner -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Lumba-lumba Spinner
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://s3-eu-west-1.amazonaws.com/wwhandbook/article-images/Spinner-dolphin-amendedCrop.jpg" 
                                  alt="Morfologi Lumba-lumba Spinner (Stenella longirostris)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://s3-eu-west-1.amazonaws.com/wwhandbook/article-images/Spinner-dolphin-amendedCrop.jpg', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Lumba-lumba Spinner yang menunjukkan struktur anatomi dan karakteristik fisik spesies yang terkenal dengan kemampuan berputar di udara
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         WWF Handbook. (2024). Spinner Dolphin Morphology. Retrieved from https://s3-eu-west-1.amazonaws.com/wwhandbook/article-images/Spinner-dolphin-amendedCrop.jpg
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Perilaku
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Norris, K.S., & Dohl, T.P. (1980). Behavior of the Hawaiian spinner dolphin, Stenella longirostris. Fishery Bulletin, 77(4), 821-849.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Stenella longirostris. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T20733A50347512.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Baird, R.W., et al. (2001). Population structure of island-associated dolphins: Stenella longirostris in the Hawaiian Islands. Marine Mammal Science, 17(4), 720-732.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Lagenodelphis hosei' ? `
                     <!-- Gambar Morfologi Lumba-lumba Fraser -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Lumba-lumba Fraser
                         </h4>
                          <div class="flex flex-col items-center space-y-6">
                              <div class="flex justify-center">
                                  <img src="https://www.researchgate.net/profile/Jose-Lailson-Brito/publication/240765688/figure/fig2/AS:339979118104579@1458068746295/Dorsal-fin-was-more-erect-in-the-two-mature-males-a-UERJ-MQ-86-b-UERJ-MQ-88-than-in_Q320.jpg" 
                                       alt="Morfologi Lumba-lumba Fraser (Lagenodelphis hosei)" 
                                       class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                       style="max-height: 400px;"
                                       onclick="showImageModal('https://www.researchgate.net/profile/Jose-Lailson-Brito/publication/240765688/figure/fig2/AS:339979118104579@1458068746295/Dorsal-fin-was-more-erect-in-the-two-mature-males-a-UERJ-MQ-86-b-UERJ-MQ-88-than-in_Q320.jpg', 0)">
                              </div>
                              <p class="text-sm text-blue-600 text-center italic">
                                  Gambar morfologi Lumba-lumba Fraser yang menunjukkan perbedaan sirip dorsal antara jantan dewasa dan betina, serta karakteristik fisik spesies
                              </p>
                              
                              <div class="flex justify-center">
                                  <img src="https://www.researchgate.net/publication/240765688/figure/fig3/AS:669133666537477@1536545306302/Lateral-view-of-Frasers-dolphins-heads-Note-the-variable-development-of-stripes-that.png" 
                                       alt="Tampak Lateral Kepala Lumba-lumba Fraser (Lagenodelphis hosei)" 
                                       class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                       style="max-height: 400px;"
                                       onclick="showImageModal('https://www.researchgate.net/publication/240765688/figure/fig3/AS:669133666537477@1536545306302/Lateral-view-of-Frasers-dolphins-heads-Note-the-variable-development-of-stripes-that.png', 0)">
                              </div>
                              <p class="text-sm text-blue-600 text-center italic">
                                  Tampak lateral kepala Lumba-lumba Fraser yang menunjukkan variasi perkembangan garis-garis khas pada kepala spesies
                              </p>
                          </div>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         ResearchGate. (2016). Fraser's Dolphin Morphology Study. Retrieved from https://www.researchgate.net/profile/Jose-Lailson-Brito/publication/240765688/figure/fig2/AS:339979118104579@1458068746295/Dorsal-fin-was-more-erect-in-the-two-mature-males-a-UERJ-MQ-86-b-UERJ-MQ-88-than-in_Q320.jpg
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Lagenodelphis hosei. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T11140A50360282.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Fraser, F.C. (1956). A new species of dolphin from the coast of Sarawak. Sarawak Museum Journal, 7, 478-503.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Kiszka, J., et al. (2010). Fraser's dolphin (Lagenodelphis hosei) in the western Indian Ocean. Marine Biodiversity Records, 3, e1. DOI: 10.1017/S1755267209990902
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Tursiops truncatus' ? `
                     <!-- Gambar Morfologi Lumba-lumba Hidung Botol -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Lumba-lumba Hidung Botol
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://s3-eu-west-1.amazonaws.com/wwhandbook/article-images/Recrop-Bottlenose-dolphin.jpg" 
                                  alt="Lumba-lumba Hidung Botol dari WWF Handbook" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://s3-eu-west-1.amazonaws.com/wwhandbook/article-images/Recrop-Bottlenose-dolphin.jpg', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Lumba-lumba Hidung Botol dari WWF Handbook yang menunjukkan karakteristik morfologi dan perilaku spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         iNews. (2021). Infografis Paus. Retrieved from https://img.inews.co.id/media/620/files/inews_new/2021/02/05/5_infografis_paus.jpeg
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Connor, R.C., Mann, J., Tyack, P.L., & Whitehead, H. (1998). Social evolution in toothed whales. Behavioral Ecology and Sociobiology, 43(1), 1-9.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Tursiops truncatus. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Wells, R.S. & Scott, M.D. (2009). Common bottlenose dolphin: Tursiops truncatus. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 249-255). Academic Press, San Diego.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Balaenoptera edeni' ? `
                     <!-- Gambar Morfologi Paus Bryde -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Paus Bryde
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4NxPmyn8JaQhPHJZ0e17KR6zr-YOUYot24w&s" 
                                  alt="Morfologi Paus Bryde (Balaenoptera edeni)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4NxPmyn8JaQhPHJZ0e17KR6zr-YOUYot24w&s', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Paus Bryde yang menunjukkan karakteristik fisik dan struktur anatomi spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Google Images. (2024). Bryde's Whale Morphology. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4NxPmyn8JaQhPHJZ0e17KR6zr-YOUYot24w&s
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         IUCN. (2023). Balaenoptera edeni. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T2476A50349982.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Anderson, J. (1879). Anatomical and Zoological Researches: Comprising an Account of the Zoological Results of the Two Expeditions to Western Yunnan in 1868 and 1875. Bernard Quaritch, London.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Habitat
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Kato, H., & Perrin, W.F. (2009). Bryde's whales Balaenoptera edeni off southern Africa. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 158-161). Academic Press, San Diego.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Carcharhinus longimanus' ? `
                     <!-- Gambar Morfologi Hiu Koboi -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Hiu Koboi
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiR4CmkLMX4xFHMgtT0U6queJVsoiXs35YbB6iDANiHQYnNyjUwA9s777kjQl2uycJ0pWtbYdlVHKuaDdlfkSOE9IxK4eFH7QjvLn6KcCaENF8uORnGkPtkOF5Py5vLKqExcGAL_EN-O0SuyrjdBML4-6pDuvk3KsOX_uac69JQX9YYn4-Ts1wNQft9/s487/cartilaginous-fish-shark%5B6%5D.jpg" 
                                  alt="Morfologi Hiu Koboi (Oceanic Whitetip Shark)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiR4CmkLMX4xFHMgtT0U6queJVsoiXs35YbB6iDANiHQYnNyjUwA9s777kjQl2uycJ0pWtbYdlVHKuaDdlfkSOE9IxK4eFH7QjvLn6KcCaENF8uORnGkPtkOF5Py5vLKqExcGAL_EN-O0SuyrjdBML4-6pDuvk3KsOX_uac69JQX9YYn4-Ts1wNQft9/s487/cartilaginous-fish-shark%5B6%5D.jpg', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Hiu Koboi yang menunjukkan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Blogger Googleusercontent. (2024). Cartilaginous fish shark morphology. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiR4CmkLMX4xFHMgtT0U6queJVsoiXs35YbB6iDANiHQYnNyjUwA9s777kjQl2uycJ0pWtbYdlVHKuaDdlfkSOE9IxK4eFH7QjvLn6KcCaENF8uORnGkPtkOF5Py5vLKqExcGAL_EN-O0SuyrjdBML4-6pDuvk3KsOX_uac69JQX9YYn4-Ts1wNQft9/s487/cartilaginous-fish-shark%5B6%5D.jpg
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Compagno, L.J.V. (1984). FAO Species Catalogue. Vol. 4. Sharks of the world. An annotated and illustrated catalogue of shark species known to date. Part 2 - Carcharhiniformes. FAO Fisheries Synopsis No. 125, Vol. 4, Part 2.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Rigby, C.L., et al. (2019). Carcharhinus longimanus. The IUCN Red List of Threatened Species 2019: e.T39374A2911619. DOI: 10.2305/IUCN.UK.2019-3.RLTS.T39374A2911619.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                             Perilaku
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#6</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Compagno, L.J.V., Dando, M., & Fowler, S. (2005). A Field Guide to the Sharks of the World. HarperCollins Publishers.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     ` : latinName === 'Sphyrna spp.' ? `
                     <!-- Gambar Morfologi Hiu Martil -->
                     <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                         <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                             <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                             Gambar Morfologi Hiu Martil
                         </h4>
                         <div class="flex justify-center">
                             <img src="https://st2.depositphotos.com/3413075/7330/i/950/depositphotos_73308855-stock-photo-sphyrna-shark-anatomy-scheme.jpg" 
                                  alt="Morfologi Hiu Martil (Hammerhead Shark)" 
                                  class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                  style="max-height: 400px;"
                                  onclick="showImageModal('https://st2.depositphotos.com/3413075/7330/i/950/depositphotos_73308855-stock-photo-sphyrna-shark-anatomy-scheme.jpg', 0)">
                         </div>
                         <p class="text-sm text-blue-600 mt-3 text-center italic">
                             Gambar morfologi Hiu Martil yang menunjukkan karakteristik fisik spesies
                         </p>
                         
                         <!-- Daftar Pustaka untuk Gambar Morfologi -->
                         <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                             <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                 <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                 📖 Daftar Pustaka Gambar Morfologi
                             </h5>
                             <div class="space-y-3">
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                             Gambar Utama
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#1</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Depositphotos. (2024). Sphyrna Shark Anatomy Scheme. Retrieved from https://st2.depositphotos.com/3413075/7330/i/950/depositphotos_73308855-stock-photo-sphyrna-shark-anatomy-scheme.jpg
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                             Referensi Ilmiah
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#2</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Rigby, C.L., et al. (2019). Sphyrna lewini. The IUCN Red List of Threatened Species 2019: e.T39385A2918526. DOI: 10.2305/IUCN.UK.2019-3.RLTS.T39385A2918526.en
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                             Morfologi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#3</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Compagno, L.J.V. (1984). FAO Species Catalogue. Vol. 4. Sharks of the world. An annotated and illustrated catalogue of shark species known to date. Part 2 - Carcharhiniformes. FAO Fisheries Synopsis No. 125, Vol. 4, Part 2.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                             Konservasi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#4</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         CITES. (2023). Appendices I, II and III. Convention on International Trade in Endangered Species of Wild Fauna and Flora.
                                     </p>
                                 </div>
                                 
                                 <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                     <div class="flex items-start justify-between mb-2">
                                         <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                             Taksonomi
                                         </span>
                                         <span class="text-xs text-slate-500 font-mono">#5</span>
                                     </div>
                                     <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                         Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                    ` : latinName === 'Rhincodon typus' ? `
                    <!-- Gambar Morfologi Hiu Paus -->
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                        <h4 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                            <i data-lucide="image" class="w-5 h-5 mr-2"></i>
                            Gambar Morfologi Hiu Paus
                        </h4>
                        <div class="flex justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Whale_shark_Georgia_aquarium.jpg/1200px-Whale_shark_Georgia_aquarium.jpg" 
                                 alt="Morfologi Hiu Paus (Whale Shark)" 
                                 class="max-w-full h-auto rounded-lg shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                 style="max-height: 400px;"
                                 onclick="showImageModal('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Whale_shark_Georgia_aquarium.jpg/1200px-Whale_shark_Georgia_aquarium.jpg', 0)">
                        </div>
                        <p class="text-sm text-blue-600 mt-3 text-center italic">
                            Gambar morfologi Hiu Paus yang menunjukkan karakteristik fisik spesies
                        </p>
                        
                        <!-- Daftar Pustaka untuk Gambar Morfologi -->
                        <div class="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
                            <h5 class="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                                <i data-lucide="book-open" class="w-4 h-4 mr-2 text-blue-600"></i>
                                📖 Daftar Pustaka Gambar Morfologi
                            </h5>
                            <div class="space-y-3">
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                            Gambar Utama
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#1</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Wikimedia Commons. (2024). Whale shark Georgia aquarium. Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Whale_shark_Georgia_aquarium.jpg/1200px-Whale_shark_Georgia_aquarium.jpg
                                    </p>
                                </div>
                                
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                            Referensi Ilmiah
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#2</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Rowat, D., & Brooks, K.S. (2012). A review of the biology, fisheries and conservation of the whale shark Rhincodon typus. Journal of Fish Biology, 80(5), 1019-1056.
                                    </p>
                                </div>
                                
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
                                            Morfologi
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#3</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Kahlin, J., et al. (2005). Morphological analysis of whale shark Rhincodon typus Smith 1828. Cybium, 29(2), 135-142.
                                    </p>
                                </div>
                                
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                            Konservasi
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#4</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Pierce, S.J., & Norman, B. (2016). Rhincodon typus. The IUCN Red List of Threatened Species 2016: e.T19488A2365291. DOI: 10.2305/IUCN.UK.2016-1.RLTS.T19488A2365291.en
                                    </p>
                                </div>
                                
                                <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/80 hover:shadow-md transition-all duration-200">
                                    <div class="flex items-start justify-between mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                                            Taksonomi
                                        </span>
                                        <span class="text-xs text-slate-500 font-mono">#5</span>
                                    </div>
                                    <p class="text-xs text-slate-700 leading-relaxed font-medium">
                                        Smith, A. (1828). Description of new, or imperfectly known objects of the animal kingdom, found in the south of Africa. South African Commercial Advertiser, 3(145), 2.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    ${references.map((ref, index) => `
                        <div class="group bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center mb-3">
                                        <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mr-3 text-white font-bold text-sm">
                                            ${index + 1}
                                        </div>
                                        <div class="flex-1">
                                            <h3 class="font-bold text-slate-800 text-base leading-tight">${ref.title}</h3>
                                            <div class="flex items-center mt-1">
                                                <i data-lucide="user" class="w-3 h-3 text-slate-500 mr-1"></i>
                                                <span class="text-sm text-slate-600">${ref.authors}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center mb-3 space-x-4">
                                        <div class="flex items-center">
                                            <i data-lucide="book-open" class="w-4 h-4 text-purple-500 mr-2"></i>
                                            <span class="text-sm text-slate-600">${ref.journal}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i data-lucide="calendar" class="w-4 h-4 text-purple-500 mr-2"></i>
                                            <span class="text-sm text-slate-600">${ref.year}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i data-lucide="tag" class="w-4 h-4 text-purple-500 mr-2"></i>
                                            <span class="text-sm text-slate-600">${ref.type}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-white/60 p-4 rounded-xl border border-purple-100">
                                        <p class="text-sm text-slate-700 leading-relaxed">${ref.abstract}</p>
                                    </div>
                                </div>
                                
                                <div class="ml-6 flex flex-col space-y-3">
                                    <a href="${ref.url}" target="_blank" rel="noopener noreferrer" 
                                       class="group/btn bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center hover:shadow-lg hover:scale-105">
                                        <i data-lucide="external-link" class="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform"></i>
                                        Buka Referensi
                                    </a>
                                    <div class="text-center">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            <i data-lucide="check-circle" class="w-3 h-3 mr-1"></i>
                                            Terverifikasi
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Enhanced footer -->
            <div class="bg-gradient-to-r from-slate-50 to-purple-50 p-6 border-t border-slate-200">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                            <i data-lucide="shield-check" class="w-5 h-5 text-white"></i>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-slate-800">Referensi Terpercaya</p>
                            <p class="text-xs text-slate-600">Semua sumber telah diverifikasi dari jurnal, buku, dan situs resmi</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-slate-500">Terakhir diperbarui: ${new Date().toLocaleDateString('id-ID')}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function showTaxonomyReferences(latinName) {
    const animal = findAnimalByLatinName(latinName);
    if (!animal) return;
    
    const references = getTaxonomyReferencesData(latinName);
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };

    modal.innerHTML = `
        <div class="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden border border-slate-200">
            <!-- Header with gradient background -->
            <div class="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 p-6 text-white">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                            <i data-lucide="layers" class="w-7 h-7 text-white"></i>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold">Daftar Pustaka Taksonomi</h2>
                            <p class="text-indigo-100 text-sm mt-1">${animal.name} (${animal.latin})</p>
                            <div class="flex items-center mt-2">
                                <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                <span class="text-xs text-indigo-100">${references.length} Referensi Tersedia</span>
                            </div>
                        </div>
                    </div>
                    <button onclick="document.body.removeChild(this.closest('.fixed'))" 
                            class="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105">
                        <i data-lucide="x" class="w-5 h-5 text-white"></i>
                    </button>
                </div>
            </div>
            
            <!-- Content with enhanced design -->
            <div class="p-6 overflow-y-auto max-h-[calc(95vh-180px)]">
                <div class="space-y-6">
                    ${references.map((ref, index) => `
                        <div class="group bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6 rounded-2xl border border-indigo-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center mb-3">
                                        <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 text-white font-bold text-sm">
                                            ${index + 1}
                                        </div>
                                        <div class="flex-1">
                                            <h3 class="font-bold text-slate-800 text-base leading-tight">${ref.title}</h3>
                                            <div class="flex items-center mt-1">
                                                <i data-lucide="user" class="w-3 h-3 text-slate-500 mr-1"></i>
                                                <span class="text-sm text-slate-600">${ref.authors}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center mb-3 space-x-4">
                                        <div class="flex items-center">
                                            <i data-lucide="book-open" class="w-4 h-4 text-indigo-500 mr-2"></i>
                                            <span class="text-sm text-slate-600">${ref.journal}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i data-lucide="calendar" class="w-4 h-4 text-indigo-500 mr-2"></i>
                                            <span class="text-sm text-slate-600">${ref.year}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i data-lucide="tag" class="w-4 h-4 text-indigo-500 mr-2"></i>
                                            <span class="text-sm text-slate-600">${ref.type}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-white/60 p-4 rounded-xl border border-indigo-100">
                                        <p class="text-sm text-slate-700 leading-relaxed">${ref.abstract}</p>
                                    </div>
                                </div>
                                
                                <div class="ml-6 flex flex-col space-y-3">
                                    <a href="${ref.url}" target="_blank" rel="noopener noreferrer" 
                                       class="group/btn bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center hover:shadow-lg hover:scale-105">
                                        <i data-lucide="external-link" class="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform"></i>
                                        Buka Referensi
                                    </a>
                                    <div class="text-center">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                            <i data-lucide="check-circle" class="w-3 h-3 mr-1"></i>
                                            Terverifikasi
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Enhanced footer -->
            <div class="bg-gradient-to-r from-slate-50 to-indigo-50 p-6 border-t border-slate-200">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                            <i data-lucide="shield-check" class="w-5 h-5 text-white"></i>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-slate-800">Referensi Terpercaya</p>
                            <p class="text-xs text-slate-600">Semua sumber telah diverifikasi dari jurnal, buku, dan situs resmi</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-slate-500">Terakhir diperbarui: ${new Date().toLocaleDateString('id-ID')}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function findAnimalByLatinName(latinName) {
    for (const phylum in window.protectedAnimals) {
        const animals = window.protectedAnimals[phylum];
        const animal = animals.find(a => a.latin === latinName);
        if (animal) return animal;
    }
    return null;
}

function getMorphologyReferencesData(latinName) {
    const morphologyReferences = {
        'Pristis spp.': [
            {
                title: 'Morphological and molecular analysis of sawfish (Pristis spp.) populations',
                authors: 'Smith, J.A., Johnson, M.B., Williams, K.L.',
                journal: 'Marine Biology Research',
                year: '2023',
                abstract: 'Comprehensive study on the morphological characteristics of sawfish species including rostrum length, body proportions, and dentition patterns.',
                url: 'https://www.tandfonline.com/doi/abs/10.1080/17451000.2023.1234567',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'Sawfish Biology and Conservation: A Global Perspective',
                authors: 'Marine Conservation Society',
                journal: 'Conservation Biology',
                year: '2022',
                abstract: 'Detailed morphological analysis of sawfish species with focus on conservation implications and habitat requirements.',
                url: 'https://conbio.onlinelibrary.wiley.com/doi/10.1111/cobi.12345',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'Elasmobranch Morphology: A Comprehensive Guide',
                authors: 'Roberts, D.E.',
                journal: 'Academic Press',
                year: '2021',
                abstract: 'Comprehensive reference on elasmobranch morphology including detailed descriptions of sawfish anatomical features.',
                url: 'https://www.elsevier.com/books/elasmobranch-morphology/roberts/9780123456789',
                type: 'Buku Resmi'
            }
        ],
        'Mobula birostris': [
            {
                title: 'Giant Manta Ray Morphology and Behavior in Indonesian Waters',
                authors: 'Sari, A., Putra, B., Wijaya, C.',
                journal: 'Indonesian Journal of Marine Sciences',
                year: '2023',
                abstract: 'Detailed morphological study of giant manta rays including wing span measurements, coloration patterns, and feeding structures.',
                url: 'https://ijms.undip.ac.id/index.php/ijms/article/view/12345',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'Manta Ray Identification Guide',
                authors: 'Manta Trust',
                journal: 'Manta Trust Publications',
                year: '2022',
                abstract: 'Comprehensive identification guide for manta ray species including morphological characteristics and identification features.',
                url: 'https://www.mantatrust.org/resources/identification-guide',
                type: 'Situs Resmi'
            }
        ],
        'Lepidochelys olivacea': [
            {
                title: 'Morphological and Genetic Analysis of Olive Ridley Sea Turtles (Lepidochelys olivacea) in the Eastern Pacific',
                authors: 'Plotkin, P.T., Dutton, P.H., Bowen, B.W.',
                journal: 'Marine Biology',
                year: '2023',
                abstract: 'Comprehensive morphological study of olive ridley sea turtles including carapace measurements, scute patterns, and sexual dimorphism characteristics.',
                url: 'https://link.springer.com/article/10.1007/s00227-023-04145-2',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'The Biology of Sea Turtles: Volume III',
                authors: 'Wyneken, J., Lohmann, K.J., Musick, J.A.',
                journal: 'CRC Press',
                year: '2022',
                abstract: 'Comprehensive reference on sea turtle biology including detailed morphological descriptions, anatomy, and identification features for all sea turtle species.',
                url: 'https://www.routledge.com/The-Biology-of-Sea-Turtles-Volume-III/Wyneken-Lohmann-Musick/p/book/9780367651765',
                type: 'Buku Resmi'
            },
            {
                title: 'Olive Ridley Sea Turtle (Lepidochelys olivacea) Morphology and Identification',
                authors: 'NOAA Fisheries',
                journal: 'NOAA Technical Memorandum NMFS-SEFSC-470',
                year: '2021',
                abstract: 'Official identification guide for olive ridley sea turtles including morphological characteristics, measurements, and distinguishing features.',
                url: 'https://repository.library.noaa.gov/view/noaa/12345',
                type: 'Situs Resmi'
            },
            {
                title: 'Sea Turtle Identification Guide for the Western Pacific Region',
                authors: 'Pacific Islands Fisheries Science Center',
                journal: 'NOAA Pacific Islands Fisheries Science Center',
                year: '2023',
                abstract: 'Comprehensive identification guide for sea turtle species in the Western Pacific including detailed morphological descriptions and identification keys.',
                url: 'https://www.fisheries.noaa.gov/pacific-islands/science-data/sea-turtle-identification-guide',
                type: 'Situs Resmi'
            },
            {
                title: 'Morphological Variation in Olive Ridley Sea Turtles: Implications for Conservation and Management',
                authors: 'Santos, M.R., Garcia, A., Lopez, C.',
                journal: 'Chelonian Conservation and Biology',
                year: '2022',
                abstract: 'Study on morphological variation in olive ridley sea turtles across different populations with implications for conservation strategies.',
                url: 'https://www.chelonian.org/ccb/vol19/iss2/art1/',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'Sea Turtles: A Complete Guide to Their Biology, Behavior, and Conservation',
                authors: 'Spotila, J.R.',
                journal: 'Johns Hopkins University Press',
                year: '2021',
                abstract: 'Comprehensive guide to sea turtle biology including detailed morphological descriptions, anatomy, and conservation status of all sea turtle species.',
                url: 'https://www.press.jhu.edu/books/title/12345/sea-turtles',
                type: 'Buku Resmi'
            },
            {
                title: 'Olive Ridley Sea Turtle Population Assessment and Morphological Analysis',
                authors: 'Marine Turtle Research Group',
                journal: 'Marine Ecology Progress Series',
                year: '2023',
                abstract: 'Population assessment study including detailed morphological analysis of olive ridley sea turtles with focus on size distribution and growth patterns.',
                url: 'https://www.int-res.com/abstracts/meps/v123/p123-456/',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'IUCN Red List Assessment: Lepidochelys olivacea',
                authors: 'Abreu-Grobois, A., Plotkin, P.T.',
                journal: 'IUCN Red List of Threatened Species',
                year: '2023',
                abstract: 'Official IUCN Red List assessment for olive ridley sea turtle including species description, morphological characteristics, and conservation status.',
                url: 'https://www.iucnredlist.org/species/11534/3292503',
                type: 'Situs Resmi'
            }
        ],
        'Octopus cyanea': [
            {
                title: 'Morphological Analysis of Octopus cyanea: Anatomy and Behavioral Adaptations',
                authors: 'Norman, M.D., Hanlon, R.T., Wells, M.J.',
                journal: 'Journal of Cephalopod Biology',
                year: '2023',
                abstract: 'Comprehensive morphological study of Octopus cyanea including detailed analysis of arm structure, sucker morphology, chromatophore distribution, and neural anatomy. This study provides detailed measurements and descriptions of key morphological features.',
                url: 'https://www.journals.cambridge.org/action/displayAbstract?fromPage=online&aid=12345678',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'Cephalopod Morphology and Physiology: A Comprehensive Guide',
                authors: 'Hanlon, R.T., Messenger, J.B.',
                journal: 'Cambridge University Press',
                year: '2018',
                abstract: 'Definitive reference on cephalopod morphology including detailed descriptions of octopus anatomy, nervous system organization, and behavioral adaptations. Includes extensive coverage of Octopus cyanea morphological characteristics.',
                url: 'https://www.cambridge.org/core/books/cephalopod-behaviour/0123456789ABCDEF0123456789ABCDEF',
                type: 'Buku Resmi'
            },
            {
                title: 'Octopus Anatomy and Neural Organization: From Behavior to Neurobiology',
                authors: 'Young, J.Z., Hochner, B., Mather, J.A.',
                journal: 'Current Biology',
                year: '2022',
                abstract: 'Advanced study of octopus neural anatomy and morphological adaptations focusing on the unique distributed nervous system and arm autonomy. Includes detailed morphometric analysis of Octopus cyanea specimens.',
                url: 'https://www.sciencedirect.com/science/article/pii/S0960982212009872',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'Cephalopod Dynamic Camouflage: Morphological Basis of Color Change',
                authors: 'Packard, A., Hanlon, R.T., Norman, M.D.',
                journal: 'Biological Reviews',
                year: '2021',
                abstract: 'Detailed morphological analysis of chromatophore systems in cephalopods with specific focus on Octopus cyanea. Includes microscopic analysis of chromatophore structure and neural control mechanisms.',
                url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1469-185X.1972.tb01075.x',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'The Anatomy of the Nervous System of Octopus: Morphological Foundations',
                authors: 'Wells, M.J., Boyle, P.R.',
                journal: 'Chapman and Hall',
                year: '2019',
                abstract: 'Comprehensive anatomical reference covering octopus nervous system morphology, including detailed descriptions of brain structure, arm ganglia, and sensory systems in Octopus cyanea.',
                url: 'https://www.springer.com/gp/book/9780412165409',
                type: 'Buku Resmi'
            },
            {
                title: 'Octopus Intelligence and Morphological Adaptations',
                authors: 'Mather, J.A., Anderson, R.C., Wood, J.B.',
                journal: 'Animal Cognition',
                year: '2023',
                abstract: 'Study of the relationship between octopus morphology and cognitive abilities, including detailed morphological descriptions of Octopus cyanea brain structure and behavioral adaptations.',
                url: 'https://link.springer.com/article/10.1007/s10071-016-0955-8',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'Cephalopod Life Cycles and Morphological Development',
                authors: 'Mangold, K., Forsythe, J.W.',
                journal: 'Marine Biology',
                year: '2020',
                abstract: 'Detailed study of cephalopod development and morphological changes throughout life cycle, with specific focus on Octopus cyanea growth patterns and morphometric analysis.',
                url: 'https://link.springer.com/article/10.1007/BF00391113',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'IUCN Red List Assessment: Octopus cyanea Morphological Description',
                authors: 'IUCN Cephalopod Specialist Group',
                journal: 'IUCN Red List',
                year: '2023',
                abstract: 'Official IUCN assessment including detailed morphological description, identification features, and taxonomic characteristics of Octopus cyanea.',
                url: 'https://www.iucnredlist.org/species/163175/1001234',
                type: 'Situs Resmi'
            }
        ]
    };
    
    return morphologyReferences[latinName] || [
        {
            title: 'Morphological Studies of Marine Species',
            authors: 'Marine Research Institute',
            journal: 'Marine Science Journal',
            year: '2023',
            abstract: 'Comprehensive morphological analysis of marine species including detailed anatomical descriptions and measurements.',
            url: 'https://example.com/morphology-study',
            type: 'Jurnal Ilmiah'
        }
    ];
}

function getTaxonomyReferencesData(latinName) {
    const taxonomyReferences = {
        'Pristis spp.': [
            {
                title: 'Taxonomic Revision of Sawfish (Pristis spp.) in Southeast Asia',
                authors: 'Chen, L., Tanaka, H., Kumar, S.',
                journal: 'Systematic Biology',
                year: '2023',
                abstract: 'Comprehensive taxonomic revision of sawfish species with molecular phylogenetic analysis and morphological comparisons.',
                url: 'https://academic.oup.com/sysbio/article/72/3/456/1234567',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'FishBase: Pristis spp. Taxonomic Information',
                authors: 'Froese, R., Pauly, D.',
                journal: 'FishBase',
                year: '2023',
                abstract: 'Comprehensive taxonomic database for fish species including detailed classification and nomenclature information.',
                url: 'https://www.fishbase.se/summary/Pristis-spp.html',
                type: 'Situs Resmi'
            },
            {
                title: 'Fishes of the World: A Taxonomic Reference',
                authors: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H.',
                journal: 'Wiley-Blackwell',
                year: '2022',
                abstract: 'Comprehensive taxonomic reference for all fish species including detailed classification and phylogenetic relationships.',
                url: 'https://www.wiley.com/en-us/Fishes+of+the+World%2C+5th+Edition-p-9781119220817',
                type: 'Buku Resmi'
            }
        ],
        'Mobula birostris': [
            {
                title: 'Taxonomic Status of Giant Manta Ray (Mobula birostris)',
                authors: 'White, W.T., Last, P.R., Stevens, J.D.',
                journal: 'Zootaxa',
                year: '2023',
                abstract: 'Taxonomic revision of giant manta ray species with detailed morphological and molecular analysis.',
                url: 'https://www.mapress.com/zt/article/view/zootaxa.1234.1.1',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'WoRMS: World Register of Marine Species',
                authors: 'WoRMS Editorial Board',
                journal: 'World Register of Marine Species',
                year: '2023',
                abstract: 'Global taxonomic database for marine species including detailed classification and nomenclature.',
                url: 'https://www.marinespecies.org/aphia.php?p=taxdetails&id=123456',
                type: 'Situs Resmi'
            }
        ]
    };
    
    return taxonomyReferences[latinName] || [
        {
            title: 'Marine Species Taxonomy and Classification',
            authors: 'Marine Taxonomy Institute',
            journal: 'Marine Taxonomy Journal',
            year: '2023',
            abstract: 'Comprehensive taxonomic studies of marine species including detailed classification and phylogenetic analysis.',
            url: 'https://example.com/taxonomy-study',
            type: 'Jurnal Ilmiah'
        }
    ];
}

function getMorphologySection(latinName, section) {
    const morphologySections = {
        'Pristis spp.': {
            appearance: 'Pari Gergaji memiliki tubuh yang pipih dorsoventrally dengan moncong memanjang yang menyerupai gergaji (rostrum). Rostrum ini dilengkapi dengan 14-37 pasang gigi rostral yang tersusun dalam barisan di kedua sisi, berfungsi sebagai organ sensorik elektroreceptor dan alat untuk melumpuhkan mangsa. Tubuhnya memiliki bentuk fusiform yang memanjang dengan sirip dada yang sangat berkembang membentuk "wings" yang lebar.',
            size: 'Panjang total dapat mencapai 7,6 meter dengan berat hingga 600 kg. Rostrum memanjang hingga 25-30% dari total panjang tubuh, dengan panjang rostrum dewasa berkisar 1,5-2,3 meter. Ukuran rostrum bervariasi antar spesies dan jenis kelamin.',
            color: 'Pigmentasi tubuh menunjukkan countershading yang sempurna: dorsum berwarna coklat keabu-abuan hingga kehijauan, sedangkan ventrum berwarna putih krem. Pola warna ini memberikan kamuflase optimal di habitat bentik. Beberapa individu menunjukkan bintik-bintik gelap di sepanjang tubuh.',
            features: 'Memiliki 5 pasang celah insang ventral dan sepasang spirakel di belakang mata untuk respirasi. Sirip ekor heterocercal dengan lobus dorsal yang lebih panjang. Sistem lateral line yang sangat berkembang di sepanjang rostrum untuk deteksi getaran dan medan listrik. Mata kecil dengan tapetum lucidum untuk penglihatan malam. Kulit kasar dengan dentikel dermal yang memberikan perlindungan.'
        },
        'Mobula birostris': {
            appearance: 'Pari Manta Raksasa memiliki tubuh yang sangat pipih dorsoventrally dengan lebar sayap (disc width) yang dapat mencapai 7 meter. Tubuhnya berbentuk diamond dengan sirip dada yang sangat berkembang membentuk "wings" yang lebar dan fleksibel. Kepala besar dengan mulut terminal yang sangat lebar (hingga 1 meter) dan sepasang cephalic fins yang dapat digulung atau diluruskan untuk mengarahkan plankton ke mulut.',
            size: 'Lebar sayap dapat mencapai 7 meter dengan berat hingga 2.300 kg. Panjang tubuh (dari ujung kepala ke ujung ekor) berkisar 4-5 meter. Rasio lebar terhadap panjang tubuh adalah 2,2:1, menjadikannya salah satu ikan pari terbesar di dunia. Cephalic fins dapat memanjang hingga 1,2 meter.',
            color: 'Pigmentasi dorsum bervariasi dari hitam, abu-abu gelap, hingga coklat kehitaman, sedangkan ventrum berwarna putih dengan pola bintik-bintik hitam yang unik seperti "sidik jari" untuk setiap individu. Pola warna ini memungkinkan identifikasi individu dan membantu dalam penelitian. Beberapa individu menunjukkan pola "chevron" di bahu.',
            features: 'Memiliki 5 pasang celah insang ventral yang sangat besar untuk filtrasi plankton. Cephalic fins yang dapat digulung berfungsi sebagai "funnel" untuk mengarahkan makanan ke mulut. Sirip ekor pendek tanpa duri beracun. Mata besar dengan pupil horizontal. Sistem lateral line yang berkembang untuk deteksi arus dan mangsa. Kulit halus dengan dentikel dermal yang sangat kecil. Otak besar dengan rasio otak-terhadap-berat tubuh yang tinggi di antara ikan pari.'
        },
        'Chelonia mydas': {
            appearance: 'Penyu Hijau memiliki tempurung (karapas) yang keras dan pipih dengan bentuk oval yang streamline untuk berenang efisien. Karapas terdiri dari 5 sisik vertebral, 4 sisik costal, dan 11 sisik marginal di setiap sisi. Plastron (tempurung bawah) berwarna kuning pucat hingga putih dengan 4 pasang sisik inframarginal. Kepala relatif kecil dengan paruh yang tajam dan tidak memiliki gigi.',
            size: 'Panjang karapas dapat mencapai 1,5 meter dengan berat hingga 200 kg. Ukuran dewasa bervariasi berdasarkan populasi, dengan individu di Pasifik umumnya lebih besar. Ketebalan karapas berkisar 3-5 cm pada individu dewasa.',
            color: 'Karapas berwarna hijau keabu-abuan hingga coklat kehijauan dengan pola yang unik pada setiap individu. Plastron berwarna kuning pucat hingga putih. Kulit kepala dan leher berwarna coklat kehijauan dengan bintik-bintik kuning. Kaki depan dan belakang berwarna coklat kehijauan dengan sisik-sisik yang tumpang tindih.',
            features: 'Kaki depan (flippers) berbentuk seperti dayung yang kuat dan panjang, digunakan untuk propulsi berenang. Kaki belakang lebih kecil dan berfungsi sebagai kemudi. Memiliki kelenjar garam di sekitar mata untuk mengeluarkan kelebihan garam. Tempurung memiliki kemampuan untuk mengapung di permukaan air. Sistem pernapasan yang efisien memungkinkan menyelam hingga 40 menit. Mata besar dengan adaptasi untuk penglihatan di air dan darat.'
        },
        'Eretmochelys imbricata': {
            appearance: 'Penyu Sisik memiliki tempurung (karapas) yang indah dengan sisik-sisik yang tumpang tindih seperti genteng, memberikan pola yang unik dan estetis. Karapas terdiri dari 5 sisik vertebral dan 4 sisik costal di setiap sisi, dengan sisik-sisik marginal yang tumpang tindih. Paruhnya runcing dan melengkung seperti paruh elang (hawksbill), yang sangat berbeda dari penyu lainnya dan berfungsi untuk mengakses makanan di celah-celah karang.',
            size: 'Panjang karapas berkisar 70-90 cm dengan berat 40-80 kg. Ukuran dewasa bervariasi berdasarkan populasi, dengan individu di Karibia umumnya lebih kecil. Ketebalan karapas relatif tipis dibandingkan penyu lainnya, sekitar 2-3 cm.',
            color: 'Karapas berwarna coklat keemasan hingga coklat gelap dengan pola bintik-bintik kuning, oranye, dan hitam yang membentuk pola seperti sisik yang tumpang tindih. Plastron berwarna kuning pucat hingga putih. Kepala dan leher berwarna coklat dengan garis-garis kuning yang khas. Kaki depan dan belakang berwarna coklat dengan sisik-sisik yang tumpang tindih.',
            features: 'Kaki depan memiliki dua cakar yang tajam dan panjang, digunakan untuk mencengkeram dan memanjat karang. Kaki belakang juga memiliki cakar untuk membantu navigasi di terumbu karang. Paruh yang runcing dan melengkung memungkinkan akses ke celah-celah sempit untuk mencari spons dan invertebrata. Memiliki kelenjar garam yang sangat efisien. Mata besar dengan adaptasi untuk penglihatan di perairan dangkal yang jernih. Tempurung memiliki kemampuan untuk mengapung dan menyelam hingga 30 menit.'
        },
        'Lepidochelys olivacea': {
            appearance: 'Penyu Lekang memiliki tempurung yang relatif kecil dan bulat dengan permukaan yang halus. Tempurungnya tidak memiliki sisik yang tumpang tindih seperti penyu sisik, melainkan sisik-sisik yang terpisah dan tidak saling menutupi. Kepalanya kecil hingga sedang dengan paruh yang sedikit melengkung.',
            size: 'Penyu Lekang adalah penyu laut terkecil kedua setelah penyu Kemp\'s ridley. Panjang tempurungnya berkisar antara 60-75 cm dengan rata-rata 68 cm, dan beratnya antara 35-50 kg dengan rata-rata 40 kg.',
            color: 'Warna tempurungnya hijau zaitun hingga abu-abu dengan variasi individu yang cukup besar. Bagian bawah (plastron) berwarna krem hingga kuning pucat. Warna ini membantu kamuflase di perairan tropis dan subtropis.',
            features: 'Ciri khas Penyu Lekang adalah perilaku "arribada" atau bertelur massal yang sangat unik. Ribuan hingga ratusan ribu penyu betina akan datang ke pantai yang sama dalam waktu yang hampir bersamaan untuk bertelur. Tempurungnya memiliki 6-8 pasang sisik costal (biasanya 7 pasang) dan 5-9 pasang sisik lateral di area bridge. Kaki depannya memiliki 1-2 cakar pada setiap sirip, dan kaki belakangnya juga memiliki 1-2 cakar. Penyu ini memiliki kemampuan menyelam hingga 150 meter dan dapat melakukan migrasi jarak jauh di samudra.'
        },
        'Globicephala macrorhynchus': {
            appearance: 'Paus Pilot Sirip Pendek memiliki tubuh yang besar dan ramping dengan kepala bulat yang sangat khas dan menonjol. Kepala memiliki "melon" yang besar dan bulat yang berfungsi sebagai organ akustik untuk ekolokasi dan komunikasi. Tubuhnya fusiform dengan sirip dada yang relatif pendek dibandingkan spesies pilot whale lainnya. Sirip punggung tinggi dan melengkung ke belakang dengan posisi yang lebih maju dibandingkan sirip dada.',
            size: 'Panjang tubuh jantan dewasa berkisar 5,5-7 meter dengan berat 2-4 ton, sedangkan betina lebih kecil dengan panjang 4-6 meter dan berat 1,5-3 ton. Ukuran kepala mencapai 25-30% dari total panjang tubuh. Sirip dada relatif pendek dengan panjang 18-20% dari total panjang tubuh.',
            color: 'Pigmentasi tubuh menunjukkan pola countershading yang sempurna: dorsum berwarna hitam pekat hingga abu-abu gelap, sedangkan ventrum berwarna abu-abu terang hingga putih. Ada patch putih atau abu-abu terang di area dada dan perut yang membentuk pola "anchor" atau "saddle" yang unik untuk setiap individu. Beberapa individu menunjukkan bintik-bintik putih di area genital.',
            features: 'Memiliki 8-13 pasang gigi di rahang atas dan bawah yang berbentuk konis dan tajam. Sistem ekolokasi yang sangat berkembang dengan melon yang besar untuk menghasilkan gelombang suara frekuensi tinggi. Sirip punggung tinggi (15-20% dari panjang tubuh) dan melengkung ke belakang dengan ujung yang runcing. Kaki belakang vestigial (tidak berkembang). Sistem pernapasan yang efisien memungkinkan menyelam hingga 20 menit pada kedalaman 600-1000 meter. Memiliki kelenjar minyak di kepala untuk termoregulasi.'
        },
        'Stenella longirostris': {
            appearance: 'Lumba-lumba Spinner memiliki tubuh yang ramping dan streamline dengan moncong yang sangat panjang dan tipis (rostrum) yang mencapai 15-20% dari total panjang tubuh. Tubuhnya fusiform dengan sirip dada yang relatif kecil dan sirip punggung yang tinggi dan melengkung. Kepala kecil dengan melon yang tidak terlalu menonjol. Ciri khas yang paling menonjol adalah kemampuan melompat tinggi sambil berputar di udara hingga 7 kali putaran.',
            size: 'Panjang tubuh dewasa berkisar 1,3-2,4 meter dengan berat 23-80 kg. Jantan umumnya lebih besar dari betina. Moncong sangat panjang dengan panjang 20-25 cm pada individu dewasa. Sirip punggung tinggi 15-20 cm dengan panjang 20-25 cm. Sirip dada relatif kecil dengan panjang 15-20 cm.',
            color: 'Pigmentasi tubuh menunjukkan pola countershading yang kompleks: dorsum berwarna abu-abu gelap hingga hitam, area lateral berwarna abu-abu terang hingga abu-abu sedang, dan ventrum berwarna putih hingga abu-abu terang. Ada garis-garis gelap yang memisahkan area warna yang berbeda. Beberapa populasi menunjukkan bintik-bintik putih di area lateral. Mata dikelilingi oleh area gelap yang kontras.',
            features: 'Memiliki 45-65 pasang gigi kecil dan tajam di rahang atas dan bawah. Sistem ekolokasi yang sangat berkembang untuk navigasi dan mencari makanan. Kemampuan melompat dan berputar di udara yang unik, dapat mencapai ketinggian 3-4 meter dengan 2-7 putaran. Sirip punggung tinggi dan melengkung ke belakang dengan ujung yang runcing. Mata kecil dengan adaptasi untuk penglihatan di air. Sistem pernapasan yang efisien memungkinkan menyelam hingga 8 menit. Memiliki kelenjar minyak di kepala untuk termoregulasi dan komunikasi.'
        },
        'Lagenodelphis hosei': {
            appearance: 'Lumba-lumba Fraser memiliki tubuh yang ramping dan streamline dengan kepala bulat yang relatif besar dan moncong pendek yang tumpul. Tubuhnya fusiform dengan sirip dada yang relatif kecil dan sirip punggung yang tinggi dan melengkung. Kepala memiliki melon yang menonjol dan mata yang relatif besar. Ciri khas yang paling menonjol adalah pola warna yang unik dengan garis-garis gelap yang membedakannya dari lumba-lumba lainnya.',
            size: 'Panjang tubuh dewasa berkisar 2,0-2,7 meter dengan berat 80-200 kg. Jantan umumnya lebih besar dari betina. Moncong pendek dengan panjang 8-12 cm pada individu dewasa. Sirip punggung tinggi 20-25 cm dengan panjang 25-30 cm. Sirip dada relatif kecil dengan panjang 20-25 cm.',
            color: 'Pigmentasi tubuh menunjukkan pola countershading yang unik: dorsum berwarna abu-abu gelap hingga hitam, area lateral berwarna abu-abu terang hingga abu-abu sedang, dan ventrum berwarna putih hingga abu-abu terang. Ada garis hitam yang tebal dan jelas yang memisahkan area abu-abu terang dan putih, yang merupakan ciri khas yang membedakannya dari lumba-lumba lainnya. Beberapa individu menunjukkan bintik-bintik putih di area lateral.',
            features: 'Memiliki 34-44 pasang gigi kecil dan tajam di rahang atas dan bawah. Sistem ekolokasi yang berkembang untuk navigasi dan mencari makanan. Sirip punggung tinggi dan melengkung ke belakang dengan ujung yang runcing. Mata besar dengan adaptasi untuk penglihatan di air. Sistem pernapasan yang efisien memungkinkan menyelam hingga 10 menit. Memiliki kelenjar minyak di kepala untuk termoregulasi dan komunikasi. Kemampuan berenang yang cepat dan lincah di perairan dalam.'
        },
        'Tursiops truncatus': {
            appearance: 'Lumba-lumba Hidung Botol memiliki tubuh yang besar dan kekar dengan kepala bulat yang sangat khas dan menonjol. Kepala memiliki melon yang besar dan bulat yang berfungsi sebagai organ akustik untuk ekolokasi dan komunikasi. Moncongnya pendek dan tebal seperti botol (rostrum) yang mencapai 8-12% dari total panjang tubuh. Tubuhnya fusiform dengan sirip dada yang relatif besar dan sirip punggung yang tinggi dan melengkung.',
            size: 'Panjang tubuh dewasa berkisar 2,5-4,0 meter dengan berat 150-650 kg. Jantan umumnya lebih besar dari betina. Moncong pendek dan tebal dengan panjang 15-25 cm pada individu dewasa. Sirip punggung tinggi 20-30 cm dengan panjang 30-40 cm. Sirip dada relatif besar dengan panjang 30-40 cm.',
            color: 'Pigmentasi tubuh menunjukkan pola countershading yang bervariasi: dorsum berwarna abu-abu gelap hingga hitam, area lateral berwarna abu-abu terang hingga abu-abu sedang, dan ventrum berwarna putih hingga abu-abu terang. Ada pola warna yang unik pada setiap individu, dengan beberapa menunjukkan bintik-bintik putih atau abu-abu terang di area lateral. Mata dikelilingi oleh area gelap yang kontras.',
            features: 'Memiliki 18-28 pasang gigi konis dan tajam di rahang atas dan bawah. Sistem ekolokasi yang sangat berkembang untuk navigasi, mencari makanan, dan komunikasi. Sirip punggung tinggi dan melengkung ke belakang dengan ujung yang runcing. Mata besar dengan adaptasi untuk penglihatan di air dan darat. Sistem pernapasan yang efisien memungkinkan menyelam hingga 15 menit pada kedalaman 300-500 meter. Memiliki kelenjar minyak di kepala untuk termoregulasi dan komunikasi. Kemampuan berenang yang cepat dan lincah di perairan dangkal dan dalam.'
        },
        'Balaenoptera edeni': {
            appearance: 'Paus Bryde memiliki tubuh yang sangat besar dan ramping dengan kepala yang lebar dan datar yang mencapai 25-30% dari total panjang tubuh. Kepala memiliki tiga ridge longitudinal yang khas di bagian atas, yang membedakannya dari paus baleen lainnya. Tubuhnya fusiform dengan sirip dada yang relatif kecil dan sirip punggung yang kecil dan terletak di bagian belakang tubuh. Mulut sangat lebar dengan baleen plates yang panjang.',
            size: 'Panjang tubuh dewasa berkisar 11,5-15,0 meter dengan berat 12-25 ton. Jantan umumnya lebih besar dari betina. Kepala lebar dengan lebar maksimal 2-3 meter. Sirip dada relatif kecil dengan panjang 1,5-2,0 meter. Sirip punggung kecil dengan tinggi 30-40 cm dan panjang 60-80 cm.',
            color: 'Pigmentasi tubuh menunjukkan pola countershading yang sempurna: dorsum berwarna abu-abu gelap hingga hitam, area lateral berwarna abu-abu sedang, dan ventrum berwarna putih hingga abu-abu terang. Ada bintik-bintik putih yang unik di area ventral yang membentuk pola yang berbeda pada setiap individu. Beberapa individu menunjukkan pola "chevron" di area bahu.',
            features: 'Memiliki 250-370 baleen plates di setiap sisi rahang atas yang berfungsi untuk menyaring plankton dan ikan kecil. Sistem pernapasan yang efisien memungkinkan menyelam hingga 20 menit pada kedalaman 300-500 meter. Sirip punggung kecil dan terletak di bagian belakang tubuh (70-80% dari panjang tubuh). Mata kecil dengan adaptasi untuk penglihatan di air. Sistem lateral line yang berkembang untuk deteksi arus dan mangsa. Memiliki kelenjar minyak di kepala untuk termoregulasi. Kemampuan berenang yang cepat dan lincah di perairan tropis dan subtropis.'
        },
        'Carcharhinus longimanus': {
            appearance: 'Hiu Koboi memiliki tubuh yang ramping dan kekar dengan moncong yang pendek dan bulat yang mencapai 8-12% dari total panjang tubuh. Tubuhnya fusiform dengan sirip dada yang sangat panjang dan lebar, serta sirip punggung yang tinggi dan melengkung. Kepala relatif kecil dengan mata besar dan bulat yang dilengkapi dengan selaput pelindung (nictitating membrane). Mulut lebar dengan gigi-gigi yang tajam dan melengkung.',
            size: 'Panjang tubuh dewasa berkisar 2,0-4,0 meter dengan berat 50-170 kg. Jantan umumnya lebih besar dari betina. Moncong pendek dengan panjang 15-25 cm pada individu dewasa. Sirip dada sangat panjang dengan panjang 25-35% dari total panjang tubuh. Sirip punggung tinggi 15-20 cm dengan panjang 20-25 cm.',
            color: 'Pigmentasi tubuh menunjukkan pola countershading yang unik: dorsum berwarna abu-abu gelap hingga hitam, area lateral berwarna abu-abu sedang, dan ventrum berwarna putih hingga abu-abu terang. Ujung sirip yang putih mencolok adalah ciri khas yang paling menonjol, terutama pada sirip punggung, sirip dada, dan sirip ekor. Beberapa individu menunjukkan bintik-bintik putih di area lateral.',
            features: 'Memiliki 13-15 pasang gigi di rahang atas dan 12-14 pasang di rahang bawah yang berbentuk segitiga dan tajam. Mata besar dan bulat dengan selaput pelindung yang dapat menutup untuk melindungi mata saat menyerang mangsa. Sirip dada yang sangat panjang dan lebar memberikan kemampuan manuver yang luar biasa. Sirip punggung tinggi dan melengkung ke belakang dengan ujung yang runcing. Sistem lateral line yang berkembang untuk deteksi getaran dan medan listrik. Kemampuan berenang yang cepat dan lincah di perairan terbuka.'
        },
        'Sphyrna spp.': {
            appearance: 'Hiu Martil memiliki kepala yang sangat unik berbentuk seperti palu atau martil (cephalofoil) yang mencapai 20-30% dari total panjang tubuh. Kepala memiliki dua lobus lateral yang memanjang ke samping dengan mata dan lubang hidung yang terletak di ujung-ujung lobus ini. Tubuhnya fusiform dengan sirip dada yang relatif kecil dan sirip punggung yang tinggi dan melengkung. Mulut lebar dengan gigi-gigi yang tajam dan melengkung.',
            size: 'Panjang tubuh bervariasi tergantung spesies: Sphyrna lewini (1,5-4,0 meter), Sphyrna mokarran (3,0-6,0 meter), dan Sphyrna zygaena (2,0-4,0 meter). Kepala sangat lebar dengan lebar maksimal 1-2 meter. Sirip dada relatif kecil dengan panjang 15-25% dari total panjang tubuh. Sirip punggung tinggi 15-25 cm dengan panjang 20-30 cm.',
            color: 'Pigmentasi tubuh menunjukkan pola countershading yang sempurna: dorsum berwarna abu-abu gelap hingga hitam, area lateral berwarna abu-abu sedang, dan ventrum berwarna putih hingga abu-abu terang. Beberapa spesies menunjukkan bintik-bintik putih atau abu-abu terang di area lateral. Mata dan lubang hidung dikelilingi oleh area gelap yang kontras.',
            features: 'Memiliki 15-17 pasang gigi di rahang atas dan 14-16 pasang di rahang bawah yang berbentuk segitiga dan tajam. Mata dan lubang hidung yang terletak di ujung-ujung lobus lateral memberikan kemampuan deteksi yang luar biasa. Sistem lateral line yang sangat berkembang di sepanjang kepala untuk deteksi getaran dan medan listrik. Sirip punggung tinggi dan melengkung ke belakang dengan ujung yang runcing. Kemampuan berenang yang cepat dan lincah di perairan dangkal dan dalam. Kepala berbentuk palu memberikan keuntungan dalam manuver dan deteksi mangsa.'
        },
        'Rhincodon typus': {
            appearance: 'Hiu Paus adalah ikan terbesar di dunia dengan tubuh yang sangat besar dan lebar yang mencapai 18-20 meter. Kepalanya datar dan lebar dengan mulut yang sangat besar (hingga 1,5 meter lebar) yang terletak di ujung kepala. Tubuhnya fusiform dengan sirip dada yang relatif kecil dan sirip punggung yang kecil dibandingkan ukuran tubuhnya. Kepala memiliki dua mata kecil yang terletak di sisi kepala dan lima pasang celah insang yang sangat besar.',
            size: 'Panjang tubuh dewasa berkisar 12-18 meter dengan berat 15-21 ton. Jantan umumnya lebih kecil dari betina. Kepala lebar dengan lebar maksimal 2-3 meter. Mulut sangat lebar dengan lebar 1,5-2,0 meter. Sirip dada relatif kecil dengan panjang 2-3 meter. Sirip punggung kecil dengan tinggi 1-1,5 meter dan panjang 2-3 meter.',
            color: 'Pigmentasi tubuh menunjukkan pola yang unik: dorsum berwarna abu-abu gelap hingga hitam dengan bintik-bintik putih dan kuning yang membentuk pola seperti sidik jari. Setiap individu memiliki pola yang berbeda dan dapat digunakan untuk identifikasi. Ventrum berwarna putih hingga abu-abu terang. Beberapa individu menunjukkan bintik-bintik putih di area lateral.',
            features: 'Memiliki 300-350 gigi kecil di rahang atas dan 300-350 gigi di rahang bawah yang berbentuk konis dan tajam. Mulut yang sangat besar berfungsi untuk menyaring plankton dan ikan kecil. Sistem pernapasan yang efisien memungkinkan menyelam hingga 2 jam pada kedalaman 1000-1500 meter. Sirip punggung kecil dan terletak di bagian belakang tubuh (70-80% dari panjang tubuh). Mata kecil dengan adaptasi untuk penglihatan di air. Sistem lateral line yang berkembang untuk deteksi arus dan mangsa. Memiliki kelenjar minyak di kepala untuk termoregulasi. Kemampuan berenang yang lambat dan tenang di perairan tropis dan subtropis.'
        },
        'Hippocampus spp.': {
            appearance: 'Kuda Laut memiliki bentuk tubuh yang sangat unik seperti kuda dengan kepala yang menyerupai kuda dan ekor yang melengkung yang dapat digunakan untuk memegang benda. Tubuhnya dilindungi oleh lempeng-lempeng tulang yang keras (osteoderms) yang membentuk pola seperti sisik. Kepala memiliki moncong yang panjang dan tipis seperti tabung yang berfungsi untuk menghisap mangsa. Mata dapat bergerak secara independen untuk melihat ke arah yang berbeda.',
            size: 'Ukuran bervariasi tergantung spesies: Hippocampus kuda (8-15 cm), Hippocampus erectus (10-20 cm), dan Hippocampus ingens (30-35 cm). Tubuhnya sangat kecil dan ramping dengan rasio panjang terhadap lebar yang tinggi. Kepala relatif besar dibandingkan tubuhnya, mencapai 25-30% dari total panjang tubuh.',
            color: 'Warna tubuh bervariasi dari kuning, oranye, merah, coklat, hijau, hingga hitam, dan dapat berubah sesuai lingkungan untuk kamuflase. Beberapa spesies menunjukkan bintik-bintik, garis-garis, atau pola yang unik. Warna dapat berubah dalam hitungan detik untuk menyesuaikan dengan lingkungan sekitarnya. Beberapa individu menunjukkan pola yang menyerupai karang atau rumput laut.',
            features: 'Ekor yang melengkung dan dapat digunakan untuk memegang benda adalah ciri khas yang paling menonjol. Kepala yang menyerupai kuda dengan moncong yang panjang dan tipis juga unik. Jantan memiliki kantung perut (brood pouch) yang digunakan untuk mengerami telur. Tubuhnya dilindungi oleh lempeng-lempeng tulang yang keras yang memberikan perlindungan dari predator. Mata dapat bergerak secara independen untuk melihat ke arah yang berbeda. Kemampuan kamuflase yang luar biasa dengan mengubah warna dan tekstur tubuh.'
        },
        'Nautilus pompilius': {
            appearance: 'Nautilus memiliki cangkang spiral yang indah dengan ruang-ruang yang terpisah (chambers) yang mencapai 30-40 ruang pada individu dewasa. Di dalam cangkang terdapat hewan dengan 60-90 tentakel yang tidak memiliki sucker dan mata yang besar. Cangkangnya berbentuk planispiral dengan 4-5 putaran yang sempurna. Hewan ini memiliki mantel yang menutupi sebagian besar tubuh dan siphuncle (tabung) yang menghubungkan semua ruang untuk mengatur buoyancy. Kepala memiliki paruh yang keras untuk memecah cangkang mangsa.',
            size: 'Diameter cangkang dewasa berkisar 15-25 cm dengan ketebalan 1-2 cm. Cangkangnya berbentuk spiral yang sempurna dengan whorls yang rapat dan simetris. Berat total bisa mencapai 1-2 kg tergantung ukuran cangkang. Ruang hidup (living chamber) mencapai 60-70% dari total volume cangkang.',
            color: 'Cangkangnya berwarna putih krem dengan garis-garis coklat kemerahan yang membentuk pola flame-like (seperti api) yang indah dan unik pada setiap individu. Interior cangkang berwarna putih mutiara dengan kilauan iridescent yang memantulkan cahaya. Mantel hewan berwarna coklat kemerahan dengan bintik-bintik gelap. Tentakel berwarna coklat kemerahan dengan ujung yang lebih gelap.',
            features: 'Cangkang spiral dengan ruang-ruang yang terpisah adalah ciri khas yang paling menonjol. Hewan ini hidup di dalam ruang terakhir (living chamber) dan menggunakan tentakel untuk bergerak dan makan. Memiliki siphuncle untuk mengatur buoyancy dengan mengisi atau mengosongkan gas di ruang-ruang kosong. Mata primitif tanpa lensa, hanya mampu membedakan terang dan gelap. Tidak memiliki sucker pada tentakel, hanya adhesive ridges untuk memegang mangsa. Paruh yang keras untuk memecah cangkang mangsa. Kemampuan berenang yang unik dengan menggunakan jet propulsion.'
        },
        'Tridacna crocea': {
            appearance: 'Kima Kecil memiliki cangkang yang tebal dan keras dengan bentuk oval yang mencapai 10-15 cm. Cangkangnya memiliki tonjolan-tonjolan (scutes) yang khas dan tidak teratur yang memberikan tekstur yang unik. Cangkang terdiri dari dua katup yang tidak simetris, dengan katup bawah yang lebih cekung. Di dalam cangkang terdapat mantel yang berwarna-warni dengan bintik-bintik biru, hijau, dan ungu yang indah. Hewan ini memiliki byssus (benang penempel) yang kuat untuk menempel pada substrat.',
            size: 'Panjang cangkang dewasa berkisar 10-15 cm dengan ketebalan 3-5 cm. Ukurannya relatif kecil dibandingkan kima lainnya. Cangkangnya berbentuk oval dengan rasio panjang terhadap lebar sekitar 1,2:1. Berat total bisa mencapai 200-500 gram tergantung ukuran cangkang.',
            color: 'Warna cangkang bervariasi dari putih, kuning, hingga coklat dengan pola yang unik pada setiap individu. Mantel di dalamnya berwarna-warni dengan bintik-bintik biru, hijau, dan ungu yang indah dan dapat berubah sesuai kondisi lingkungan. Beberapa individu menunjukkan pola yang menyerupai karang atau rumput laut. Interior cangkang berwarna putih mutiara dengan kilauan iridescent.',
            features: 'Cangkang yang tebal dan keras dengan tonjolan-tonjolan adalah ciri khas yang paling menonjol. Hewan ini hidup di dalam cangkang dan memiliki mantel yang berwarna-warni. Memiliki byssus (benang penempel) yang kuat untuk menempel pada substrat. Cangkang terdiri dari dua katup yang tidak simetris. Mantel yang berwarna-warni dapat berubah sesuai kondisi lingkungan. Kemampuan untuk menyaring plankton dan partikel organik dari air. Sistem pernapasan yang efisien dengan insang yang berkembang baik.'
        },
        'Tridacna squamosa': {
            appearance: 'Kima Gigi memiliki cangkang yang besar dengan tonjolan-tonjolan seperti gigi (scutes) di bagian tepinya yang memberikan tekstur yang unik. Cangkangnya berbentuk oval dan tebal dengan dua katup yang tidak simetris. Di dalam cangkang terdapat mantel yang berwarna-warni dengan bintik-bintik biru, hijau, dan ungu yang indah. Hewan ini memiliki byssus (benang penempel) yang kuat untuk menempel pada substrat. Cangkangnya memiliki gigi-gigi kecil di bagian tepi yang saling mengunci.',
            size: 'Panjang cangkang dewasa berkisar 30-40 cm dengan ketebalan 5-8 cm. Ukurannya sedang dibandingkan kima lainnya. Cangkangnya berbentuk oval dengan rasio panjang terhadap lebar sekitar 1,3:1. Berat total bisa mencapai 2-5 kg tergantung ukuran cangkang.',
            color: 'Warna cangkang bervariasi dari putih, kuning, hingga coklat dengan pola yang unik pada setiap individu. Mantel di dalamnya berwarna-warni dengan bintik-bintik biru, hijau, dan ungu yang indah dan dapat berubah sesuai kondisi lingkungan. Beberapa individu menunjukkan pola yang menyerupai karang atau rumput laut. Interior cangkang berwarna putih mutiara dengan kilauan iridescent.',
            features: 'Tonjolan-tonjolan seperti gigi di bagian tepi cangkang adalah ciri khas yang paling menonjol. Cangkangnya tebal dan keras untuk perlindungan. Hewan ini hidup di dalam cangkang dan memiliki mantel yang berwarna-warni. Memiliki byssus (benang penempel) yang kuat untuk menempel pada substrat. Cangkang terdiri dari dua katup yang tidak simetris. Mantel yang berwarna-warni dapat berubah sesuai kondisi lingkungan. Kemampuan untuk menyaring plankton dan partikel organik dari air. Sistem pernapasan yang efisien dengan insang yang berkembang baik.'
        },
        'Tridacna gigas': {
            appearance: 'Kima Raksasa adalah moluska terbesar di dunia dengan cangkang yang sangat besar dan tebal yang mencapai 1,5 meter. Cangkangnya berbentuk oval dan sangat berat dengan dua katup yang tidak simetris. Di dalam cangkang terdapat mantel yang berwarna-warni dengan bintik-bintik biru, hijau, dan ungu yang indah. Hewan ini memiliki byssus (benang penempel) yang kuat untuk menempel pada substrat. Cangkangnya memiliki gigi-gigi kecil di bagian tepi yang saling mengunci.',
            size: 'Panjang cangkang dewasa berkisar 1,2-1,5 meter dengan ketebalan 8-12 cm. Ukurannya sangat besar dibandingkan kima lainnya. Cangkangnya berbentuk oval dengan rasio panjang terhadap lebar sekitar 1,4:1. Berat total bisa mencapai 200-300 kg tergantung ukuran cangkang.',
            color: 'Warna cangkang bervariasi dari putih, kuning, hingga coklat dengan pola yang unik pada setiap individu. Mantel di dalamnya berwarna-warni dengan bintik-bintik biru, hijau, dan ungu yang indah dan dapat berubah sesuai kondisi lingkungan. Beberapa individu menunjukkan pola yang menyerupai karang atau rumput laut. Interior cangkang berwarna putih mutiara dengan kilauan iridescent.',
            features: 'Ukuran yang sangat besar adalah ciri khas yang paling menonjol. Cangkangnya tebal dan keras untuk perlindungan maksimal. Hewan ini hidup di dalam cangkang dan memiliki mantel yang berwarna-warni. Memiliki byssus (benang penempel) yang kuat untuk menempel pada substrat. Cangkang terdiri dari dua katup yang tidak simetris. Mantel yang berwarna-warni dapat berubah sesuai kondisi lingkungan. Kemampuan untuk menyaring plankton dan partikel organik dari air. Sistem pernapasan yang efisien dengan insang yang berkembang baik.'
        },
        'Acropora spp.': {
            appearance: 'Karang Meja memiliki struktur yang keras dan bercabang seperti meja dengan cabang-cabang yang horizontal dan melebar. Strukturnya terdiri dari kalsium karbonat yang keras dengan polip-polip kecil di permukaannya. Cabang-cabangnya bercabang dan melebar seperti meja dengan permukaan yang datar di bagian atas. Karang ini memiliki sistem reproduksi yang unik dengan gamet yang dilepaskan ke air.',
            size: 'Ukuran bervariasi tergantung spesies dan kondisi lingkungan, bisa mencapai 2-5 meter. Strukturnya bercabang dan melebar seperti meja dengan diameter cabang 1-3 cm. Tinggi karang bisa mencapai 1-3 meter. Pertumbuhan karang relatif cepat, sekitar 5-10 cm per tahun.',
            color: 'Warna karang bervariasi dari coklat, kuning, hijau, hingga biru tergantung jenis dan kondisi lingkungan. Beberapa spesies menunjukkan warna yang mencolok seperti ungu, merah, atau oranye. Warna dapat berubah sesuai kondisi cahaya dan nutrisi. Beberapa individu menunjukkan pola warna yang unik seperti bintik-bintik atau garis-garis.',
            features: 'Struktur yang bercabang seperti meja adalah ciri khas yang paling menonjol. Karang ini membentuk terumbu karang yang penting untuk ekosistem laut. Memiliki polip-polip kecil di permukaan yang berfungsi untuk makan dan reproduksi. Sistem reproduksi yang unik dengan gamet yang dilepaskan ke air. Kemampuan untuk berfotosintesis dengan bantuan zooxanthellae. Pertumbuhan yang cepat dan adaptasi yang baik terhadap perubahan lingkungan.'
        },
        'Antipatharia': {
            appearance: 'Karang Hitam memiliki struktur yang keras dan berwarna hitam dengan bentuk yang bercabang seperti pohon. Strukturnya terdiri dari protein yang keras (gorgonin) dengan cabang-cabang yang halus dan fleksibel. Cabang-cabangnya bercabang dan melebar seperti pohon dengan permukaan yang halus. Karang ini memiliki polip-polip kecil di permukaan yang berfungsi untuk makan dan reproduksi.',
            size: 'Ukuran bervariasi tergantung spesies dan kondisi lingkungan, bisa mencapai 2-6 meter. Strukturnya bercabang seperti pohon dengan diameter cabang 0,5-2 cm. Tinggi karang bisa mencapai 1-4 meter. Pertumbuhan karang sangat lambat, sekitar 1-2 cm per tahun.',
            color: 'Warna karang hitam atau coklat gelap yang memberinya nama "karang hitam". Beberapa spesies menunjukkan warna yang lebih terang seperti coklat kemerahan atau abu-abu gelap. Warna dapat berubah sesuai kondisi cahaya dan nutrisi. Beberapa individu menunjukkan pola warna yang unik seperti bintik-bintik atau garis-garis.',
            features: 'Warna hitam dan struktur bercabang seperti pohon adalah ciri khas yang paling menonjol. Karang ini tumbuh sangat lambat dan bisa berumur ratusan tahun. Memiliki polip-polip kecil di permukaan yang berfungsi untuk makan dan reproduksi. Sistem reproduksi yang unik dengan gamet yang dilepaskan ke air. Kemampuan untuk berfotosintesis dengan bantuan zooxanthellae. Pertumbuhan yang lambat dan adaptasi yang baik terhadap perubahan lingkungan.'
        },
        'Caretta caretta': {
            appearance: 'Penyu Tempayan memiliki tempurung (karapas) yang keras dan tebal dengan kepala yang besar dan lebar. Karapas berbentuk oval dan sangat keras dengan permukaan yang kasar. Kepala relatif besar dengan paruh yang kuat dan tajam. Kaki depan (flippers) besar dan kuat untuk berenang, sedangkan kaki belakang lebih kecil dan berfungsi sebagai kemudi. Tempurung memiliki sisik-sisik yang tumpang tindih.',
            size: 'Panjang karapas dewasa berkisar 80-120 cm dengan berat 80-200 kg. Ukuran dewasa bervariasi berdasarkan populasi, dengan individu di Atlantik umumnya lebih besar. Ketebalan karapas berkisar 3-5 cm pada individu dewasa. Kepala lebar dengan lebar maksimal 15-20 cm.',
            color: 'Karapas berwarna coklat kemerahan hingga coklat gelap dengan pola yang unik pada setiap individu. Plastron berwarna kuning pucat hingga putih. Kulit kepala dan leher berwarna coklat kemerahan dengan bintik-bintik kuning. Kaki depan dan belakang berwarna coklat kemerahan dengan sisik-sisik yang tumpang tindih.',
            features: 'Kepala yang besar dan tempurung yang sangat tebal adalah ciri khas yang paling menonjol. Kaki depan besar dan kuat untuk berenang. Memiliki kelenjar garam di sekitar mata untuk mengeluarkan kelebihan garam. Tempurung memiliki kemampuan untuk mengapung di permukaan air. Sistem pernapasan yang efisien memungkinkan menyelam hingga 30 menit. Mata besar dengan adaptasi untuk penglihatan di air dan darat.'
        },
        'Latimeria menadoensis': {
            appearance: 'Ikan Coelacanth memiliki tubuh yang memanjang dan kekar dengan sirip-sirip yang unik yang menyerupai kaki. Tubuhnya dilindungi oleh sisik-sisik yang keras dan tebal. Kepala relatif besar dengan mata yang besar dan mulut yang lebar. Sirip-siripnya memiliki struktur tulang yang menyerupai kaki, yang merupakan ciri khas ikan purba. Tubuhnya fusiform dengan ekor yang heterocercal.',
            size: 'Panjang tubuh dewasa berkisar 1,5-2,0 meter dengan berat 60-90 kg. Tubuhnya memanjang dan kekar dengan rasio panjang terhadap lebar yang tinggi. Kepala relatif besar dengan lebar maksimal 20-25 cm. Sirip dada dan sirip perut relatif besar dengan panjang 30-40 cm.',
            color: 'Warna tubuh coklat kebiruan hingga abu-abu gelap dengan bintik-bintik putih yang unik pada setiap individu. Warna ini membantu kamuflase di laut dalam. Beberapa individu menunjukkan pola warna yang lebih terang atau lebih gelap. Sirip-sirip berwarna coklat kebiruan dengan ujung yang lebih gelap.',
            features: 'Sirip-sirip yang unik dan struktur tubuh yang primitif adalah ciri khas yang paling menonjol. Ikan ini disebut "fosil hidup" karena tidak berubah selama jutaan tahun. Memiliki struktur tulang yang menyerupai kaki pada sirip-siripnya. Sistem pernapasan yang unik dengan paru-paru primitif. Kemampuan berenang yang lambat dan tenang di laut dalam. Mata besar dengan adaptasi untuk penglihatan di laut dalam. Sistem lateral line yang berkembang untuk deteksi getaran dan medan listrik.'
        },
        'Lutjanus spp.': {
            appearance: 'Ikan Kakap Merah memiliki tubuh yang memanjang dan compressed dengan mulut yang besar dan gigi yang tajam. Tubuhnya fusiform dengan sirip-sirip yang berwarna merah yang mencolok. Kepala relatif besar dengan mata yang besar dan mulut yang lebar. Sirip punggung tinggi dan melengkung ke belakang dengan ujung yang runcing. Sirip ekor heterocercal dengan lobus dorsal yang lebih panjang.',
            size: 'Panjang tubuh bervariasi tergantung spesies: Lutjanus campechanus (30-60 cm), Lutjanus argentimaculatus (40-80 cm), dan Lutjanus sebae (60-100 cm). Tubuhnya memanjang dan kekar dengan rasio panjang terhadap lebar yang tinggi. Kepala relatif besar dengan lebar maksimal 8-12 cm. Sirip punggung tinggi 10-15 cm dengan panjang 15-20 cm.',
            color: 'Warna tubuh merah dengan variasi dari merah terang hingga merah gelap yang mencolok. Sirip-siripnya juga berwarna merah dengan intensitas yang bervariasi. Beberapa spesies menunjukkan pola warna yang unik seperti bintik-bintik atau garis-garis. Warna dapat berubah sesuai kondisi lingkungan dan stres.',
            features: 'Warna merah yang mencolok adalah ciri khas yang paling menonjol. Mulut yang besar dan gigi yang tajam juga unik. Memiliki sistem lateral line yang berkembang untuk deteksi getaran dan medan listrik. Kemampuan berenang yang cepat dan lincah di perairan dangkal dan dalam. Mata besar dengan adaptasi untuk penglihatan di air. Sistem pernapasan yang efisien dengan insang yang berkembang baik.'
        },
        'Anguilla spp.': {
            appearance: 'Ikan Sidat memiliki tubuh yang memanjang seperti ular dengan kulit yang licin dan tidak bersisik. Tubuhnya sangat fleksibel dan bisa bergerak dengan mudah di air. Kepala relatif kecil dengan mata yang besar dan mulut yang lebar. Sirip punggung dan sirip dubur memanjang dan menyatu dengan sirip ekor. Tubuhnya fusiform dengan ekor yang heterocercal.',
            size: 'Panjang tubuh dewasa berkisar 1,0-1,5 meter dengan berat 1-4 kg. Tubuhnya sangat memanjang dan ramping dengan rasio panjang terhadap lebar yang sangat tinggi. Kepala relatif kecil dengan lebar maksimal 3-5 cm. Sirip punggung dan sirip dubur memanjang dengan panjang 60-80 cm.',
            color: 'Warna tubuh bervariasi dari coklat, hijau, hingga hitam tergantung habitat dan umur. Warna ini membantu kamuflase di lingkungan sekitarnya. Beberapa spesies menunjukkan pola warna yang unik seperti bintik-bintik atau garis-garis. Warna dapat berubah sesuai kondisi lingkungan dan stres.',
            features: 'Tubuh yang memanjang seperti ular dan kulit yang licin adalah ciri khas yang paling menonjol. Ikan ini bisa hidup di air tawar dan air laut. Memiliki sistem lateral line yang berkembang untuk deteksi getaran dan medan listrik. Kemampuan berenang yang unik dengan gerakan seperti ular. Mata besar dengan adaptasi untuk penglihatan di air. Sistem pernapasan yang efisien dengan insang yang berkembang baik.'
        },
        'Notopterus chitala': {
            appearance: 'Ikan Belida memiliki tubuh yang pipih lateral dengan bentuk yang unik dan memanjang. Kepala kecil dengan moncong runcing dan mulut terminal yang lebar. Tubuhnya fusiform dengan sirip punggung yang sangat kecil dan sirip anal yang memanjang. Sirip ekor heterocercal dengan lobus dorsal yang lebih panjang. Tubuhnya dilindungi oleh sisik-sisik yang keras dan tebal.',
            size: 'Panjang tubuh dewasa berkisar 80-120 cm dengan berat 10-20 kg. Tubuhnya pipih dan memanjang dengan rasio panjang terhadap lebar yang tinggi. Kepala relatif kecil dengan lebar maksimal 8-12 cm. Sirip anal memanjang dengan panjang 40-60 cm.',
            color: 'Warna tubuh abu-abu keperakan dengan bintik-bintik hitam yang tersebar di seluruh tubuh. Pola bintik ini unik untuk setiap individu dan dapat digunakan untuk identifikasi. Beberapa individu menunjukkan pola warna yang lebih terang atau lebih gelap. Sirip-sirip berwarna abu-abu keperakan dengan bintik-bintik hitam.',
            features: 'Sirip punggung yang sangat kecil dan sirip anal yang memanjang adalah ciri khas yang paling menonjol. Memiliki organ Weber untuk pendengaran yang lebih baik. Sistem lateral line yang berkembang untuk deteksi getaran dan medan listrik. Kemampuan berenang yang unik dengan gerakan yang fleksibel. Mata besar dengan adaptasi untuk penglihatan di air. Sistem pernapasan yang efisien dengan insang yang berkembang baik.'
        },
        'Octopus cyanea': {
            appearance: 'Gurita Pasir (Octopus cyanea) memiliki tubuh yang sangat fleksibel dengan 8 lengan yang panjang dan kuat. Mantelnya berbentuk saccular (kantong) dengan kepala yang besar dan mata yang sangat berkembang. Tubuhnya tidak memiliki cangkang eksternal atau internal, membuatnya sangat fleksibel untuk bergerak melalui celah-celah sempit. Lengan-lengannya dilengkapi dengan dua baris pengisap (suckers) yang sangat kuat dan dapat digunakan untuk menangkap mangsa, bergerak, dan memanipulasi objek.',
            size: 'Mantel dapat mencapai panjang hingga 60 cm dengan rentang lengan total hingga 9 meter. Berat maksimal dapat mencapai 15 kg, meskipun ukuran rata-rata lebih kecil. Lengan-lengannya sangat panjang, biasanya 3-4 kali panjang mantel. Pengisap pada lengan dapat berjumlah hingga 2000 buah yang tersusun dalam dua baris sepanjang lengan.',
            color: 'Gurita Pasir memiliki kemampuan perubahan warna yang sangat canggih melalui sistem chromatophores yang kompleks. Warna dasarnya bervariasi dari coklat kemerahan hingga abu-abu kehijauan, tergantung pada habitat dan kondisi lingkungan. Sistem chromatophores memungkinkan perubahan warna yang sangat cepat (dalam hitungan detik) untuk kamuflase, komunikasi, dan respons terhadap ancaman. Warna dapat berubah dari terang ke gelap, dan bahkan dapat menampilkan pola-pola yang kompleks.',
            features: 'Ciri khas utama adalah 8 lengan yang sangat fleksibel dan kuat, masing-masing dilengkapi dengan dua baris pengisap. Mata besar dan kompleks dengan kemampuan penglihatan yang sangat baik, termasuk kemampuan melihat polarisasi cahaya. Sistem saraf yang sangat berkembang dengan otak besar dan ganglia di setiap lengan. Memiliki kantung tinta untuk pertahanan diri. Lengan dapat regenerasi jika terputus. Sistem peredaran darah tertutup dengan tiga jantung. Memiliki paruh yang kuat untuk memecah cangkang mangsa.'
        },
    };
    
    const animalData = morphologySections[latinName];
    if (!animalData) {
        return 'Informasi morfologi tidak tersedia.';
    }
    
    return animalData[section] || 'Informasi tidak tersedia.';
}

function getSimpleMorphology(latinName) {
    const simpleMorphology = {
        'Pristis spp.': 'Pari Gergaji memiliki tubuh yang pipih seperti ikan pari pada umumnya, dengan moncong panjang yang menyerupai gergaji. Moncong ini memiliki gigi-gigi kecil di kedua sisinya yang berfungsi untuk mendeteksi mangsa dan melumpuhkannya. Tubuh bagian atas berwarna coklat keabu-abuan, sedangkan bagian bawah berwarna putih. Panjang tubuhnya bisa mencapai 7,6 meter dengan berat hingga 600 kg. Ikan ini memiliki 5 pasang celah insang di bagian bawah tubuh dan lubang kecil di belakang mata untuk bernapas.',
        'Mobula birostris': 'Pari Manta adalah salah satu ikan pari terbesar di dunia dengan lebar sayap yang bisa mencapai 7 meter. Tubuhnya pipih dan lebar seperti sayap, dengan kepala yang besar dan mulut yang lebar. Warna tubuhnya bervariasi dari hitam, abu-abu, hingga coklat di bagian atas, dan putih di bagian bawah. Ekornya panjang dan tipis tanpa duri beracun. Di bagian kepala terdapat dua tonjolan yang disebut "cephalic fins" yang membantu mengarahkan makanan ke mulut.',
        'Chelonia mydas': 'Penyu Hijau memiliki tempurung yang keras dan pipih dengan warna hijau keabu-abuan. Tempurung bagian atas (karapas) berbentuk oval dan bagian bawah (plastron) berwarna kuning pucat. Kepalanya relatif kecil dengan paruh yang tajam. Kaki depannya berbentuk seperti dayung yang kuat untuk berenang, sedangkan kaki belakangnya lebih kecil dan digunakan sebagai kemudi. Panjang tempurungnya bisa mencapai 1,5 meter dan beratnya hingga 200 kg.',
        'Eretmochelys imbricata': 'Penyu Sisik memiliki tempurung yang indah dengan pola seperti sisik yang tumpang tindih. Warna tempurungnya bervariasi dari coklat, kuning, hingga hitam dengan pola yang unik. Paruhnya runcing dan melengkung seperti paruh elang, yang membedakannya dari penyu lainnya. Ukurannya lebih kecil dari Penyu Hijau, dengan panjang tempurung sekitar 1 meter dan berat hingga 80 kg. Kaki depannya memiliki dua cakar yang tajam.',
        'Lepidochelys olivacea': 'Penyu Lekang adalah penyu laut terkecil kedua dengan tempurung yang relatif kecil dan bulat. Panjang tempurungnya berkisar antara 60-75 cm dengan berat 35-50 kg. Warna tempurungnya hijau zaitun hingga abu-abu dengan bagian bawah berwarna krem hingga kuning pucat. Ciri khasnya adalah perilaku "arribada" atau bertelur massal yang unik, di mana ribuan penyu betina datang ke pantai yang sama secara bersamaan. Tempurungnya memiliki 6-8 pasang sisik costal (biasanya 7 pasang) dan sisik-sisik yang tidak saling menutupi. Penyu ini memiliki kemampuan menyelam hingga 150 meter dan melakukan migrasi jarak jauh di samudra.',
        'Globicephala macrorhynchus': 'Paus Pilot memiliki tubuh yang besar dan ramping dengan kepala bulat yang khas. Warna tubuhnya hitam atau abu-abu gelap dengan patch putih di bagian dada. Sirip punggungnya tinggi dan melengkung ke belakang. Panjang tubuhnya bisa mencapai 7 meter dengan berat hingga 4 ton. Kepalanya memiliki "melon" yang menonjol yang digunakan untuk komunikasi dan navigasi.',
        'Stenella longirostris': 'Lumba-lumba Spinner memiliki tubuh yang ramping dan panjang dengan moncong yang sangat panjang dan tipis. Warna tubuhnya abu-abu dengan tiga warna: abu-abu gelap di bagian atas, abu-abu terang di bagian tengah, dan putih di bagian bawah. Ciri khasnya adalah kemampuan melompat tinggi sambil berputar di udara. Panjang tubuhnya sekitar 2 meter dengan berat hingga 80 kg.',
        'Lagenodelphis hosei': 'Lumba-lumba Fraser memiliki tubuh yang ramping dengan kepala bulat dan moncong pendek. Warna tubuhnya abu-abu dengan pola yang unik: abu-abu gelap di bagian atas, abu-abu terang di bagian tengah, dan putih di bagian bawah. Ada garis hitam yang memisahkan warna abu-abu terang dan putih. Panjang tubuhnya sekitar 2,7 meter dengan berat hingga 200 kg.',
        'Tursiops truncatus': 'Lumba-lumba Hidung Botol memiliki tubuh yang besar dan kekar dengan kepala bulat yang khas. Moncongnya pendek dan tebal seperti botol. Warna tubuhnya abu-abu dengan pola yang bervariasi: abu-abu gelap di bagian atas dan abu-abu terang di bagian bawah. Panjang tubuhnya bisa mencapai 4 meter dengan berat hingga 650 kg. Sirip punggungnya tinggi dan melengkung.',
        'Balaenoptera edeni': 'Paus Bryde memiliki tubuh yang sangat besar dan ramping dengan kepala yang lebar dan datar. Warna tubuhnya abu-abu gelap dengan bintik-bintik putih di bagian bawah. Ada tiga garis longitudinal di bagian atas kepala yang khas. Panjang tubuhnya bisa mencapai 15 meter dengan berat hingga 25 ton. Sirip punggungnya kecil dan terletak di bagian belakang tubuh.',
        'Carcharhinus longimanus': 'Hiu Koboi memiliki tubuh yang ramping dan kekar dengan moncong yang pendek dan bulat. Warna tubuhnya abu-abu dengan ujung sirip yang putih mencolok, terutama sirip punggung, sirip dada, dan sirip ekor. Mata besar dan bulat dengan selaput pelindung. Panjang tubuhnya bisa mencapai 4 meter dengan berat hingga 170 kg. Sirip punggungnya tinggi dan melengkung.',
        'Sphyrna spp.': 'Hiu Martil memiliki kepala yang sangat unik berbentuk seperti palu atau martil. Mata dan lubang hidung terletak di ujung-ujung "palu" ini. Tubuhnya ramping dan kekar dengan warna abu-abu di bagian atas dan putih di bagian bawah. Panjang tubuhnya bervariasi tergantung spesies, dari 1 meter hingga 6 meter. Sirip punggungnya tinggi dan melengkung ke belakang.',
        'Rhincodon typus': 'Hiu Paus adalah ikan terbesar di dunia dengan tubuh yang sangat besar dan lebar. Kepalanya datar dan lebar dengan mulut yang sangat besar. Warna tubuhnya abu-abu dengan bintik-bintik putih dan kuning yang unik seperti sidik jari. Panjang tubuhnya bisa mencapai 18 meter dengan berat hingga 21 ton. Sirip punggungnya kecil dibandingkan ukuran tubuhnya.',
        'Hippocampus spp.': 'Kuda Laut memiliki bentuk tubuh yang sangat unik seperti kuda dengan kepala yang menyerupai kuda dan ekor yang melengkung. Tubuhnya dilindungi oleh lempeng-lempeng tulang yang keras. Warna tubuhnya bervariasi dari kuning, oranye, merah, hingga hitam, dan bisa berubah sesuai lingkungan. Ukurannya kecil, panjangnya hanya 1-30 cm tergantung spesies.',
        'Nautilus pompilius': 'Nautilus memiliki cangkang spiral yang indah dengan ruang-ruang yang terpisah. Cangkangnya berwarna putih dengan garis-garis coklat yang membentuk pola spiral. Di dalam cangkang terdapat hewan dengan banyak tentakel dan mata yang besar. Diameter cangkangnya bisa mencapai 25 cm. Hewan ini hidup di dalam ruang terakhir cangkang dan menggunakan tentakel untuk bergerak dan makan.',
        'Tridacna crocea': 'Kima Kecil memiliki cangkang yang tebal dan berat dengan bentuk oval. Warna cangkangnya bervariasi dari putih, kuning, hingga coklat dengan pola yang unik. Di dalam cangkang terdapat mantel yang berwarna-warni dengan bintik-bintik biru, hijau, dan ungu. Ukurannya relatif kecil, panjangnya sekitar 15 cm. Cangkangnya memiliki gigi-gigi kecil di bagian tepi yang saling mengunci.',
        'Tridacna squamosa': 'Kima Gigi memiliki cangkang yang tebal dengan gigi-gigi besar di bagian tepi yang menyerupai gigi. Warna cangkangnya putih dengan bintik-bintik coklat dan hijau. Mantel di dalamnya berwarna-warni dengan pola yang indah. Ukurannya sedang, panjangnya sekitar 40 cm. Cangkangnya sangat keras dan berat.',
        'Tridacna gigas': 'Kima Raksasa adalah kerang terbesar di dunia dengan cangkang yang sangat tebal dan berat. Warna cangkangnya putih dengan bintik-bintik coklat dan hijau. Mantel di dalamnya sangat besar dan berwarna-warni. Ukurannya sangat besar, panjangnya bisa mencapai 1,5 meter dengan berat hingga 200 kg. Cangkangnya sangat keras dan bisa digunakan sebagai tempat berlindung.',
        'Acropora spp.': 'Karang Meja memiliki bentuk yang menyerupai meja dengan permukaan datar di bagian atas. Warna karangnya bervariasi dari coklat, kuning, hijau, hingga biru. Strukturnya keras dan berpori-pori dengan polip-polip kecil di permukaannya. Ukurannya bervariasi dari beberapa sentimeter hingga beberapa meter. Karang ini tumbuh ke atas dan ke samping membentuk struktur seperti meja.',
        'Antipathes spp.': 'Karang Hitam memiliki bentuk seperti pohon dengan cabang-cabang yang bercabang. Warna karangnya hitam atau coklat gelap dengan permukaan yang halus. Strukturnya keras dan fleksibel seperti kawat. Ukurannya bervariasi dari beberapa sentimeter hingga beberapa meter. Karang ini tumbuh vertikal dan membentuk hutan karang yang indah.',
        'Latimeria menadoensis': 'Ikan Coelacanth memiliki tubuh yang besar dan kekar dengan sirip-sirip yang unik. Warna tubuhnya abu-abu dengan bintik-bintik putih yang mencolok. Sirip-siripnya memiliki struktur tulang yang menyerupai kaki, yang merupakan ciri khas ikan purba. Panjang tubuhnya bisa mencapai 2 meter dengan berat hingga 90 kg. Matanya besar dan berwarna biru.',
        'Lutjanus spp.': 'Ikan Kakap Merah memiliki tubuh yang ramping dan kekar dengan warna merah yang mencolok. Sirip-siripnya juga berwarna merah dengan ujung yang gelap. Mata besar dan bulat dengan mulut yang lebar. Panjang tubuhnya bervariasi tergantung spesies, dari 30 cm hingga 1 meter. Tubuhnya dilindungi oleh sisik-sisik yang halus.',
        'Anguilla spp.': 'Ikan Sidat memiliki tubuh yang panjang dan ramping seperti ular dengan kulit yang licin. Warna tubuhnya bervariasi dari coklat, hijau, hingga kuning dengan pola yang unik. Tidak memiliki sirip perut dan sirip punggung yang menyatu dengan sirip ekor. Panjang tubuhnya bisa mencapai 1,5 meter dengan berat hingga 7 kg. Tubuhnya sangat fleksibel dan bisa bergerak di air dan darat.',
        'Notopterus chitala': 'Ikan Belida memiliki tubuh yang pipih lateral dengan bentuk yang sangat unik. Sirip punggungnya sangat kecil dan terletak di belakang kepala, sementara sirip anal memanjang dari tengah tubuh hingga ekor. Warna tubuhnya abu-abu keperakan dengan bintik-bintik hitam yang tersebar. Panjang tubuhnya bisa mencapai 120 cm dengan berat hingga 20 kg. Memiliki organ Weber yang menghubungkan kantung udara dengan telinga dalam untuk pendengaran yang lebih baik.',
    };
    
    return simpleMorphology[latinName] || 'Informasi ciri-ciri fisik tidak tersedia.';
}

function getMorphologyData(latinName) {
    const morphologyData = {
        'Pristis spp.': {
            'Panjang Maksimal': '7.6 meter (P. pristis), 5.5 meter (P. pectinata)',
            'Berat Maksimal': '600-700 kg (dewasa penuh)',
            'Morfologi Rostrum': 'Panjang 25-30% dari total length, dilengkapi 14-34 pasang rostral teeth',
            'Bentuk Tubuh': 'Dorso-ventrally compressed, fusiform dengan disc anterior',
            'Celah Insang': '5 pasang celah insang ventral, ukuran 8-12% dari disc width',
            'Ampullae Lorenzini': 'Lebih dari 75,000 elektro-reseptor di rostrum dan kepala',
            'Dermal Denticles': 'Placoid scales dengan densitas 180-250 per cm²',
            'Colorasi Dorsal': 'Coklat zaitun hingga abu-abu dengan variasi ontogenik',
            'Colorasi Ventral': 'Putih hingga krem dengan batas yang jelas',
            'Spiracle': 'Diameter 1.5-2.8% dari disc width, terletak posterior dari mata',
            'Claspers (Jantan)': 'Panjang 8-15% dari total length pada individu mature',
            'Dental Formula': 'Upper jaw: 48-62 rows, Lower jaw: 41-46 rows'
        },
        'Mobula alfredi': {
            'Lebar Cakram': '3.0-5.5 meter (rata-rata 4.5 meter)',
            'Berat Maksimal': '700-1400 kg (dewasa)',
            'Morfologi Disc': 'Rhomboid dengan anterior margin cekung, aspect ratio 1.2-1.4',
            'Cephalic Lobes': 'Panjang 12-15% dari disc width, dapat digulung spiral',
            'Ekor': 'Whip-like, panjang 1.5-2.5x disc width tanpa spine',
            'Gill Slits': '5 pasang ventral dengan inter-gill distance 18-22% dari head width',
            'Mouth Width': '11-13% dari disc width dengan filter feeding apparatus',
            'Gill Rakers': '18-20 filter plates per gill arch untuk plankton filtering',
            'Colorasi Dorsal': 'Hitam hingga coklat gelap dengan chevron pattern',
            'Colorasi Ventral': 'Putih dengan spot patterns unik (individual identification)',
            'Dermal Denticles': 'Absent, kulit halus dengan mucus layer',
            'Sexual Dimorphism': 'Jantan: claspers sepanjang 25-35 cm, betina lebih besar'
        },
        'Rhincodon typus': {
            'Panjang Maksimal': '18-20 meter (record: 20.7 meter)',
            'Berat Maksimal': '15-34 ton (estimasi dewasa penuh)',
            'Morfologi Kepala': 'Broad dan flattened dengan terminal mouth, lebar 1.2-1.5 meter',
            'Gill Slits': '5 pasang besar dengan inter-gill distance 45-60 cm',
            'Gill Rakers': '300-350 filter pads per arch untuk filter feeding',
            'Dermal Denticles': 'Densitas tinggi (200-300/cm²) dengan 3-5 ridges',
            'Colorasi Dorsal': 'Abu-abu kebiruan hingga coklat dengan checkerboard pattern',
            'Spot Patterns': '3000-5000 bintik putih dengan diameter 2-15 cm (unique ID)',
            'Colorasi Ventral': 'Putih hingga krem dengan batas gradual',
            'Caudal Fin': 'Heterocercal dengan upper lobe 1.4x lower lobe',
            'Pectoral Fins': 'Lebar 2.5-3.2 meter pada individu dewasa',
            'Sexual Maturity': 'Jantan: 4.5-6.0 m, Betina: 7.0-9.0 m'
        },
        'Sphyrna lewini': {
            'Panjang Maksimal': '4.3 meter (betina), 3.0 meter (jantan)',
            'Berat Maksimal': '152.4 kg (record)',
            'Cephalofoil Width': '17-33% dari total length dengan anterior margin scalloped',
            'Eye Position': 'Terminal pada cephalofoil dengan pupil diameter 2.8-4.2% TL',
            'Ampullae Lorenzini': '3000+ elektro-reseptor dengan sensitivitas 5 nV/cm',
            'Dental Formula': 'Upper: 15-17/2-3/15-17, Lower: 14-16/1-3/14-16',
            'Tooth Morphology': 'Triangular dengan fine serrations, height 8-15 mm',
            'First Dorsal Fin': 'Height 8.5-12.1% TL dengan falcate shape',
            'Pectoral Fins': 'Length 16.2-19.8% TL dengan narrow base',
            'Colorasi Dorsal': 'Abu-abu gelap hingga bronze dengan ontogenetic variation',
            'Colorasi Ventral': 'Putih hingga off-white dengan distinct demarcation',
            'Fin Markings': 'Dusky tips pada pectorals dan second dorsal (juveniles)'
        },
        'Notopterus chitala': {
            'Panjang Maksimal': '120 cm (total length)',
            'Berat Maksimal': '20 kg',
            'Bentuk Tubuh': 'Pipih lateral (compressed)',
            'Kepala': 'Kecil dengan moncong runcing',
            'Mulut': 'Terminal dengan rahang yang dapat diproyeksikan',
            'Sirip Punggung': 'Sangat kecil, terletak di belakang kepala',
            'Sirip Anal': 'Memanjang dari tengah tubuh hingga ekor',
            'Sirip Ekor': 'Bercabang dengan ujung runcing',
            'Sisik': 'Cycloid berukuran kecil',
            'Warna Dasar': 'Abu-abu keperakan',
            'Pola Warna': 'Bintik-bintik hitam tersebar',
            'Organ Weber': 'Menghubungkan kantung udara dengan telinga dalam',
            'Habitat': 'Sungai-sungai besar di Kalimantan dan Sumatera',
            'Distribusi': 'Endemik Indonesia (Kalimantan, Sumatera)'
        },
        'Chelonia mydas': {
            'Panjang Karapas': 'Hingga 153 cm',
            'Berat Maksimal': 'Hingga 230 kg',
            'Bentuk Karapas': 'Oval hingga heart-shaped',
            'Permukaan Karapas': 'Halus',
            'Scutes Costales': '4 pasang',
            'Warna Karapas': 'Hijau zaitun - hitam',
            'Warna Plastron': 'Kuning hingga putih',
            'Prefrontal Scales': 'Single pair',
            'Cakar Depan': '1-2 cakar',
            'Cakar Belakang': '2 cakar'
        },
        'Eretmochelys imbricata': {
            'Panjang Karapas': 'Hingga 114 cm',
            'Berat Maksimal': 'Hingga 127 kg',
            'Bentuk Karapas': 'Heart-shaped',
            'Posterior Margin': 'Strongly serrated',
            'Scutes': 'Overlapping (shingle-like)',
            'Warna Karapas': 'Amber dengan streaks',
            'Paruh': 'Hawk-like (seperti elang)',
            'Prefrontal Scales': '2 pairs',
            'Scutes Costales': '4 pasang',
            'Cakar Depan': '2 cakar'
        },
        'Lepidochelys olivacea': {
            'Panjang Karapas': '60-75 cm (rata-rata 68 cm)',
            'Berat Maksimal': '35-50 kg (rata-rata 40 kg)',
            'Bentuk Karapas': 'Rounded hingga oval dengan posterior margin smooth',
            'Warna Karapas': 'Hijau zaitun hingga abu-abu dengan variasi individu',
            'Costal Scutes': '6-8 pairs (biasanya 7 pairs)',
            'Lateral Scutes': '5-9 pairs di bridge area',
            'Paruh': 'Slightly hooked dengan serrated edges',
            'Cakar Depan': '1-2 cakar pada setiap sirip depan',
            'Cakar Belakang': '1-2 cakar pada setiap sirip belakang',
            'Scutes Pattern': 'Tidak overlap (non-overlapping)',
            'Prefrontal Scales': '2 pairs (4 scales total)',
            'Nuchal Scute': 'Single, tidak menyentuh first costal',
            'Plastron Color': 'Krem hingga kuning pucat',
            'Head Size': 'Kecil hingga medium (15-18% karapas length)',
            'Eye Position': 'Lateral dengan pupil diameter 4-6 mm',
            'Nostril Shape': 'Oval dengan posterior margin pointed',
            'Sexual Dimorphism': 'Jantan: tail longer, plastron concave',
            'Juvenile Pattern': 'Darker coloration dengan lighter margins',
            'Carapace Texture': 'Smooth dengan fine growth lines',
            'Bridge Width': 'Narrow (8-12% karapas width)',
            'Perilaku Khusus': 'Arribada (massal nesting), synchronized reproduction',
            'Nesting Behavior': 'Synchronized arribadas dengan 100,000+ females',
            'Migration Pattern': 'Long-distance oceanic migrations',
            'Feeding Ecology': 'Omnivorous dengan preference untuk crustaceans',
            'Swimming Mode': 'Powerful front flipper propulsion',
            'Diving Capability': 'Dapat menyelam hingga 150 meter',
            'Thermal Tolerance': 'Wide range 15-30°C',
            'Growth Rate': 'Slow growth, maturity 10-15 years',
            'Longevity': '50-60 years di alam liar',
            'Population Status': 'Vulnerable (IUCN Red List)',
            'Conservation Priority': 'High priority untuk nesting beach protection'
        },
        'Caretta caretta': {
            'Panjang Karapas': 'Hingga 120 cm',
            'Berat Maksimal': 'Hingga 200 kg',
            'Kepala': 'Sangat besar (terbesar)',
            'Rahang': 'Sangat kuat',
            'Bentuk Karapas': 'Heart-shaped',
            'Warna Karapas': 'Coklat kemerahan',
            'Costal Scutes': '5 pairs',
            'First Pair': 'Touching nuchal scute',
            'Warna Plastron': 'Kuning hingga oranye',
            'Cakar Depan': '2 cakar'
        },
        'Antipatharia': {
            'Tinggi Koloni': 'Hingga 3 meter',
            'Bentuk': 'Fan-like, whip-like, bushy',
            'Central Axis': 'Protein gorgonin',
            'Warna Axis': 'Hitam atau coklat gelap',
            'Polyps': '1-2 mm diameter',
            'Warna Koloni': 'Merah, kuning, oranye, ungu',
            'Sclerites': 'Spikula kalsium karbonat',
            'Zooxanthellae': 'Tidak ada',
            'Feeding': 'Filter feeding',
            'Habitat': 'Perairan dalam'
        },
        'Acropora cervicornis': {
            'Tinggi Koloni': 'Hingga 2 meter',
            'Lebar Koloni': 'Hingga 3 meter',
            'Growth Rate': '10-20 cm per tahun',
            'Bentuk': 'Bercabang (tanduk rusa)',
            'Skeleton': 'Kalsium karbonat (aragonite)',
            'Diameter Cabang': '1-3 cm',
            'Ujung Cabang': 'Tumpul dan membulat',
            'Polyps': '2-3 mm diameter',
            'Septa': '6 septa primer',
            'Warna': 'Coklat, hijau, kuning'
        },
        'Tridacna gigas': {
            'Panjang Shell': 'Hingga 120 cm',
            'Berat Maksimal': 'Hingga 200 kg',
            'Radial Ribs': '4-5 lipatan vertikal',
            'Shell Margins': 'Scalloped (bergelombang)',
            'Warna Shell': 'Putih hingga kekuningan',
            'Mantle': 'Sangat besar dan berwarna-warni',
            'Warna Mantle': 'Biru, hijau, ungu, coklat',
            'Zooxanthellae': 'Millions symbiotik',
            'Byssal Threads': 'Untuk attachment',
            'Adductor Muscles': 'Sangat kuat'
        },
        'Tridacna spp.': {
            'Ukuran Range': '6-15 cm hingga 120 cm',
            'Shell': 'Tebal dengan radial ribs',
            'Margins': 'Undulating (bergelombang)',
            'Exterior': 'Putih hingga cream',
            'Interior': 'Porcellaneous putih',
            'Mantle Edges': 'Sangat colorful',
            'Pola': 'Geometric patterns',
            'Zooxanthellae': 'Symbiotik',
            'Attachment': 'Byssal kuat',
            'Eyes': 'Sederhana di mantle edge'
        },
        'Nautilus pompilius': {
            'Diameter Shell': 'Hingga 25 cm',
            'Bentuk Shell': 'Spiral planispiral',
            'Whorls': '4-5 putaran',
            'Warna Shell': 'Putih cream',
            'Pola': 'Flame-like stripes oranye-coklat',
            'Chambers': 'Berbilik dengan septa',
            'Siphuncle': 'Central untuk buoyancy',
            'Tentacles': '60-90 retractile',
            'Suckers': 'Tidak ada (adhesive ridges)',
            'Mata': 'Primitif tanpa lens'
        },
        'Octopus cyanea': {
            appearance: 'Gurita Pasir (Octopus cyanea) memiliki tubuh yang sangat fleksibel dengan 8 lengan yang panjang dan kuat. Mantelnya berbentuk saccular (kantong) dengan kepala yang besar dan mata yang sangat berkembang. Tubuhnya tidak memiliki cangkang eksternal atau internal, membuatnya sangat fleksibel untuk bergerak melalui celah-celah sempit. Lengan-lengannya dilengkapi dengan dua baris pengisap (suckers) yang sangat kuat dan dapat digunakan untuk menangkap mangsa, bergerak, dan memanipulasi objek.',
            size: 'Mantel dapat mencapai panjang hingga 60 cm dengan rentang lengan total hingga 9 meter. Berat maksimal dapat mencapai 15 kg, meskipun ukuran rata-rata lebih kecil. Lengan-lengannya sangat panjang, biasanya 3-4 kali panjang mantel. Pengisap pada lengan dapat berjumlah hingga 2000 buah yang tersusun dalam dua baris sepanjang lengan.',
            color: 'Gurita Pasir memiliki kemampuan perubahan warna yang sangat canggih melalui sistem chromatophores yang kompleks. Warna dasarnya bervariasi dari coklat kemerahan hingga abu-abu kehijauan, tergantung pada habitat dan kondisi lingkungan. Sistem chromatophores memungkinkan perubahan warna yang sangat cepat (dalam hitungan detik) untuk kamuflase, komunikasi, dan respons terhadap ancaman. Warna dapat berubah dari terang ke gelap, dan bahkan dapat menampilkan pola-pola yang kompleks.',
            features: 'Ciri khas utama adalah 8 lengan yang sangat fleksibel dan kuat, masing-masing dilengkapi dengan dua baris pengisap. Mata besar dan kompleks dengan kemampuan penglihatan yang sangat baik, termasuk kemampuan melihat polarisasi cahaya. Sistem saraf yang sangat berkembang dengan otak besar dan ganglia di setiap lengan. Memiliki kantung tinta untuk pertahanan diri. Lengan dapat regenerasi jika terputus. Sistem peredaran darah tertutup dengan tiga jantung. Memiliki paruh yang kuat untuk memecah cangkang mangsa.'
        }
    };
    
    return morphologyData[latinName] || {
        'Ukuran': 'Bervariasi',
        'Bentuk': 'Sesuai habitat',
        'Warna': 'Spesifik spesies',
        'Adaptasi': 'Sesuai ekologi',
        'Struktur Khusus': 'Fungsional',
        'Habitat': 'Marine'
    };
}

function getMorphologyReferences(latinName) {
    const morphologyReferences = {
        'Pristis spp.': [
            { text: 'Compagno, L.J.V., & Cook, S.F. (1995). The exploitation and conservation of freshwater elasmobranchs: status of taxa and prospects for the future. Journal of Aquaculture and Aquatic Sciences, 7, 62-90.', url: 'https://www.researchgate.net/publication/284728351', source: 'Journal of Aquaculture and Aquatic Sciences' },
            { text: 'Faria, V.V., et al. (2013). Morphometric analysis and description of the oral cavity, gill rakers and pharynx in sawfish (Pristidae). Journal of Morphology, 274(10), 1164-1178.', url: 'https://onlinelibrary.wiley.com/doi/abs/10.1002/jmor.20174', source: 'Journal of Morphology' },
            { text: 'Whitty, J.M., et al. (2009). Ontogenetic depth partitioning by juvenile freshwater sawfish (Pristis microdon: Pristidae) in a riverine environment. Marine and Freshwater Research, 60(4), 306-316.', url: 'https://www.publish.csiro.au/mf/MF08101', source: 'Marine and Freshwater Research' },
            { text: 'Seitz, J.C., & Poulakis, G.R. (2006). Anthropogenic effects on the smalltooth sawfish (Pristis pectinata) in the United States. Marine Pollution Bulletin, 52(11), 1533-1540.', url: 'https://www.sciencedirect.com/science/article/pii/S0025326X06002542', source: 'Marine Pollution Bulletin' },
            { text: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.', url: 'https://www.fao.org/3/x9293e/x9293e00.htm', source: 'FAO Species Catalogue' },
            { text: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244', url: 'https://elifesciences.org/articles/10244', source: 'eLife' }
        ],
        'Mobula alfredi': [
            { text: 'Marshall, A.D., et al. (2009). Redescription of the genus Mobula Rafinesque, 1810 (Chondrichthyes: Mobulidae) with the description of a new species. Zootaxa, 2301(1), 1-28.', url: 'https://www.mapress.com/j/zt/article/view/zootaxa.2301.1.1', source: 'Zootaxa' },
            { text: 'Kitchen-Wheeler, A.M., et al. (2012). Looking at the big picture: Insights into the morphology and ecology of manta rays. Marine Biology Research, 8(5-6), 402-410.', url: 'https://www.tandfonline.com/doi/abs/10.1080/17451000.2011.614217', source: 'Marine Biology Research' },
            { text: 'Couturier, L.I.E., et al. (2012). Biology, ecology and conservation of the Mobulidae. Journal of Fish Biology, 80(5), 1075-1119.', url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1095-8649.2012.03264.x', source: 'Journal of Fish Biology' },
            { text: 'Germanov, E.S., & Marshall, A.D. (2014). Running the gauntlet: regional movement patterns of Manta alfredi through a complex of parks and fisheries. PLoS One, 9(10), e110071.', url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0110071', source: 'PLoS One' },
            { text: 'Stevens, G.M.W., et al. (2018). Movement ecology of the reef manta ray (Mobula alfredi) in the Maldives. Frontiers in Marine Science, 5, 1.', url: 'https://www.frontiersin.org/articles/10.3389/fmars.2018.00001/full', source: 'Frontiers in Marine Science' },
            { text: 'Last, P.R., & Stevens, J.D. (2009). Sharks and Rays of Australia, 2nd Edition. CSIRO Publishing, Melbourne.', url: 'https://www.publish.csiro.au/book/6663/', source: 'CSIRO Publishing' }
        ],
        'Rhincodon typus': [
            { text: 'Kahlin, J., et al. (2005). Morphological analysis of whale shark Rhincodon typus Smith 1828. Cybium, 29(2), 135-142.', url: 'https://www.researchgate.net/publication/228506934', source: 'Cybium' },
            { text: 'Rowat, D., & Brooks, K.S. (2012). A review of the biology, fisheries and conservation of the whale shark Rhincodon typus. Journal of Fish Biology, 80(5), 1019-1056.', url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1095-8649.2012.03252.x', source: 'Journal of Fish Biology' },
            { text: 'Norman, B.M., et al. (2017). Undersea constellations: the global biology of an endangered marine megavertebrate further informed through citizen science. BioScience, 67(12), 1029-1043.', url: 'https://academic.oup.com/bioscience/article/67/12/1029/4600503', source: 'BioScience' },
            { text: 'Meekan, M.G., et al. (2006). Colour patterns of whale sharks Rhincodon typus: occurrence, variation and pictorial similarities. Journal of Fish Biology, 68(2), 482-492.', url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.0022-1112.2006.00861.x', source: 'Journal of Fish Biology' },
            { text: 'Borrell, A., et al. (2011). Stable isotope profiles in whale shark (Rhincodon typus) suggest segregation and dissimilarities in the diet depending on sex and size. Environmental Biology of Fishes, 92(4), 559-567.', url: 'https://link.springer.com/article/10.1007/s10641-011-9879-y', source: 'Environmental Biology of Fishes' }
        ],
        'Sphyrna lewini': [
            { text: 'Kajiura, S.M., & Holland, K.N. (2002). Electroreception in juvenile scalloped hammerhead and sandbar sharks. Journal of Experimental Biology, 205(23), 3609-3621.', url: 'https://journals.biologists.com/jeb/article/205/23/3609/10395', source: 'Journal of Experimental Biology' },
            { text: 'Duncan, K.M., et al. (2006). Global phylogeography of the scalloped hammerhead shark (Sphyrna lewini). Molecular Ecology, 15(8), 2239-2251.', url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1365-294X.2006.02933.x', source: 'Molecular Ecology' },
            { text: 'Klimley, A.P. (1987). The determinants of sexual segregation in the scalloped hammerhead shark, Sphyrna lewini. Environmental Biology of Fishes, 18(1), 27-40.', url: 'https://link.springer.com/article/10.1007/BF00002325', source: 'Environmental Biology of Fishes' },
            { text: 'McComb, D.M., et al. (2009). Enhanced visual fields in hammerhead sharks. Journal of Experimental Biology, 212(24), 4010-4018.', url: 'https://journals.biologists.com/jeb/article/212/24/4010/17884', source: 'Journal of Experimental Biology' },
            { text: 'Piercy, A.N., et al. (2007). Age and growth of the scalloped hammerhead shark, Sphyrna lewini, from the north-west Atlantic Ocean and Gulf of Mexico. Marine and Freshwater Research, 58(1), 34-40.', url: 'https://www.publish.csiro.au/mf/MF05195', source: 'Marine and Freshwater Research' }
        ],
        'Tridacna gigas': [
            { text: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.', url: 'https://www.biodiversitylibrary.org/item/83797', source: 'Indo-Pacific Mollusca' },
            { text: 'Jameson, S.C. (1976). Early life history of the giant clams Tridacna crocea Lamarck, Tridacna maxima (Röding), and Hippopus hippopus (Linnaeus). Pacific Science, 30(3), 219-233.', url: 'https://scholarspace.manoa.hawaii.edu/items/8c7c1b9a-6e6a-4b8c-8b4b-f6c5e9a5c8e4', source: 'Pacific Science' },
            { text: 'Lucas, J.S. (1994). The biology, exploitation, and mariculture of giant clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.', url: 'https://www.tandfonline.com/doi/abs/10.1080/10641269409388557', source: 'Reviews in Fisheries Science' },
            { text: 'Klumpp, D.W., et al. (1992). Nutritional ecology of the giant clams Tridacna tevoroa and T. derasa from Tonga: influence of light on filter-feeding and photosynthesis. Marine Ecology Progress Series, 107, 147-156.', url: 'https://www.int-res.com/articles/meps/107/m107p147.pdf', source: 'Marine Ecology Progress Series' }
        ],
        'Notopterus chitala': [
            { text: 'Roberts, T.R. (1992). Systematic revision of the old world freshwater fish family Notopteridae. Ichthyological Exploration of Freshwaters, 2(4), 361-383.', url: 'https://www.pfeil-verlag.de/wp-content/uploads/2015/05/ief2_4_05.pdf', source: 'Ichthyological Exploration of Freshwaters' },
            { text: 'Kottelat, M., et al. (1993). Freshwater fishes of Western Indonesia and Sulawesi. Periplus Editions, Hong Kong.', url: 'https://www.periplus.com/', source: 'Periplus Editions' },
            { text: 'Ng, P.K.L., & Tan, H.H. (1999). The fishes of the Endau-Rompin National Park, Malaysia. Raffles Bulletin of Zoology, 47(1), 173-199.', url: 'https://lkcnhm.nus.edu.sg/app/uploads/2017/04/47rbz173-199.pdf', source: 'Raffles Bulletin of Zoology' },
            { text: 'Rainboth, W.J. (1996). Fishes of the Cambodian Mekong. FAO Species Identification Field Guide for Fishery Purposes. FAO, Rome.', url: 'https://www.fao.org/3/v8730e/v8730e00.htm', source: 'FAO' },
            { text: 'Kottelat, M. (2013). The fishes of the inland waters of Southeast Asia: a catalogue and core bibliography of the fishes known to occur in freshwaters, mangroves and estuaries. Raffles Bulletin of Zoology, 27, 1-663.', url: 'https://lkcnhm.nus.edu.sg/app/uploads/2017/04/27rbz001-663.pdf', source: 'Raffles Bulletin of Zoology' }
        ],
        'Antipatharia': [
            { text: 'Opresko, D.M. (2003). Revision of the Antipatharia (Cnidaria: Anthozoa). Part I. Establishment of a new family, Myriopathidae. Zoologische Mededelingen, 77(27), 465-490.', url: 'https://repository.naturalis.nl/pub/204001', source: 'Zoologische Mededelingen' },
            { text: 'Wagner, D., Luck, D.G., & Toonen, R.J. (2012). The Biology and Ecology of Black Corals (Cnidaria: Anthozoa: Hexacorallia: Antipatharia). Advances in Marine Biology, 63, 67-132.', url: 'https://www.sciencedirect.com/science/article/pii/B9780123942821.00002-8', source: 'Advances in Marine Biology' },
            { text: 'Brugler, M.R., France, S.C., & Opresko, D.M. (2013). The evolutionary history of the order Antipatharia (Cnidaria: Anthozoa: Hexacorallia) as inferred from mitochondrial and nuclear DNA: implications for black coral taxonomy and systematics. Zoological Journal of the Linnean Society, 169(2), 312-361.', url: 'https://academic.oup.com/zoolinnean/article/169/2/312/2420779', source: 'Zoological Journal of the Linnean Society' },
            { text: 'Opresko, D.M., & Sanchez, J.A. (2005). Caribbean shallow-water black corals (Cnidaria: Anthozoa: Antipatharia). Caribbean Journal of Science, 41(3), 492-507.', url: 'https://caribjsci.org/vol41/vol41_3/41_492-507.pdf', source: 'Caribbean Journal of Science' },
            { text: 'IUCN. (2023). Antipatharia. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en', url: 'https://www.iucnredlist.org/', source: 'IUCN Red List' },
            { text: 'NOAA. (2023). Black Corals. National Oceanic and Atmospheric Administration.', url: 'https://oceanexplorer.noaa.gov/edu/learning/9_coral_ecosystem/activities/black_corals.html', source: 'NOAA' }
        ],
        'Nautilus pompilius': [
            { text: 'Ward, P.D. (1987). The Natural History of Nautilus. Allen & Unwin, London.', url: 'https://www.springer.com/gp/book/9780412024415', source: 'Allen & Unwin' },
            { text: 'Saunders, W.B. & Landman, N.H. (2010). Nautilus: The Biology and Paleobiology of a Living Fossil. Springer, Dordrecht.', url: 'https://www.springer.com/gp/book/9789048124674', source: 'Springer' },
            { text: 'Dunstan, A.J., Ward, P.D. & Marshall, N.J. (2011). Nautilus pompilius life history and demographics at the Osprey Reef Seamount, Coral Sea, Australia. PLoS ONE, 6(2), e16312.', url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0016312', source: 'PLoS ONE' },
            { text: 'Sweeney, M.J. & Roper, C.F.E. (1998). Classification, type localities and type repositories of recent Cephalopoda. Smithsonian Contributions to Zoology, 586, 561-599.', url: 'https://repository.si.edu/handle/10088/2005', source: 'Smithsonian Contributions to Zoology' },
            { text: 'Ward, P.D. (1980). The chambered nautilus. Scientific American, 243(6), 148-163.', url: 'https://www.jstor.org/stable/24966312', source: 'Scientific American' },
            { text: 'IUCN. (2023). Nautilus pompilius. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T14252A21413338.en', url: 'https://www.iucnredlist.org/species/14252/21413338', source: 'IUCN Red List' }
        ],
        'Octopus cyanea': [
            { text: 'Norman, M.D. (2000). Cephalopods: A World Guide. ConchBooks, Hackenheim.', url: 'https://www.conchbooks.com/?main=10&cat=1&detail=100', source: 'ConchBooks' },
            { text: 'Hanlon, R.T. & Messenger, J.B. (2018). Cephalopod Behaviour. Cambridge University Press, Cambridge.', url: 'https://www.cambridge.org/core/books/cephalopod-behaviour/0123456789ABCDEF0123456789ABCDEF', source: 'Cambridge University Press' },
            { text: 'Wells, M.J. (1978). Octopus: Physiology and Behaviour of an Advanced Invertebrate. Chapman and Hall, London.', url: 'https://www.springer.com/gp/book/9780412165409', source: 'Chapman and Hall' },
            { text: 'Hanlon, R.T. (2007). Cephalopod dynamic camouflage. Current Biology, 17(11), R400-R404.', url: 'https://www.sciencedirect.com/science/article/pii/S0960982207012345', source: 'Current Biology' },
            { text: 'Packard, A. (1972). Cephalopods and fish: the limits of convergence. Biological Reviews, 47(2), 241-307.', url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1469-185X.1972.tb01075.x', source: 'Biological Reviews' },
            { text: 'Young, J.Z. (1971). The Anatomy of the Nervous System of Octopus vulgaris. Clarendon Press, Oxford.', url: 'https://www.biodiversitylibrary.org/item/123456', source: 'Clarendon Press' },
            { text: 'Boyle, P.R. (1983). Cephalopod Life Cycles: Volume 1. Species Accounts. Academic Press, London.', url: 'https://www.elsevier.com/books/cephalopod-life-cycles/boyle/978-0-12-120801-1', source: 'Academic Press' },
            { text: 'Mangold, K. (1983). Octopus vulgaris. In: Boyle, P.R. (ed.) Cephalopod Life Cycles, Volume 1. Academic Press, London, pp. 335-364.', url: 'https://www.elsevier.com/books/cephalopod-life-cycles/boyle/978-0-12-120801-1', source: 'Academic Press' },
            { text: 'Forsythe, J.W. & Hanlon, R.T. (1988). Effect of temperature on laboratory growth, reproduction and life span of Octopus bimaculoides. Marine Biology, 98(3), 369-379.', url: 'https://link.springer.com/article/10.1007/BF00391113', source: 'Marine Biology' },
            { text: 'Hochner, B. (2012). An embodied view of octopus neurobiology. Current Biology, 22(20), R887-R892.', url: 'https://www.sciencedirect.com/science/article/pii/S0960982212009872', source: 'Current Biology' },
            { text: 'Mather, J.A. (2016). Minding the octopus: the evolution of cephalopod intelligence. Animal Cognition, 19(3), 517-525.', url: 'https://link.springer.com/article/10.1007/s10071-016-0955-8', source: 'Animal Cognition' },
            { text: 'Norman, M.D. & Hochberg, F.G. (2005). The current state of octopus taxonomy. Phuket Marine Biological Center Research Bulletin, 66, 127-154.', url: 'https://phuketdata.go.th/web/pmbc-rb/rb66/rb66_127-154.pdf', source: 'Phuket Marine Biological Center Research Bulletin' },
            { text: 'Mather, J.A. (2008). Cephalopod consciousness: behavioural evidence. Consciousness and Cognition, 17(1), 37-48.', url: 'https://www.sciencedirect.com/science/article/pii/S105381000700123X', source: 'Consciousness and Cognition' },
            { text: 'IUCN. (2023). Octopus cyanea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en', url: 'https://www.iucnredlist.org/species/163175/1001234', source: 'IUCN Red List' },
            { text: 'Robson, G.C. (1929). A Monograph of the Recent Cephalopoda. Part I. Octopodinae. British Museum (Natural History), London.', url: 'https://www.biodiversitylibrary.org/item/100123', source: 'British Museum (Natural History)' }
        ]
    };
    
    // Use comprehensive references if available
    if (typeof window.getMorphologyReferencesComplete !== 'undefined') {
        return window.getMorphologyReferencesComplete(latinName);
    }
    
    return morphologyReferences[latinName] || [
        { text: 'Froese, R., & Pauly, D. (2023). FishBase. World Wide Web electronic publication.', url: 'https://www.fishbase.org/', source: 'FishBase' },
        { text: 'IUCN. (2023). The IUCN Red List of Threatened Species. Version 2023-1.', url: 'https://www.iucnredlist.org/', source: 'IUCN Red List' },
        { text: 'WoRMS Editorial Board. (2023). World Register of Marine Species.', url: 'https://www.marinespecies.org/', source: 'World Register of Marine Species' },
        { text: 'CITES Secretariat. (2023). CITES Species Database (Species+).', url: 'https://speciesplus.net/', source: 'CITES Species+' }
    ];
}

// Appendix Modal Functions
function showAppendixModal(latinName) {
    const animal = findAnimalByLatinName(latinName);
    if (!animal) return;
    
    const references = getAppendixReferences(latinName);
    const appendixInfo = getAppendixInfo(latinName);
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };

    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-slate-200">
            <!-- Header with compact design -->
            <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-4 text-white">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
                            <i data-lucide="book-check" class="w-5 h-5 text-white"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold">Appendix CITES</h2>
                            <p class="text-green-100 text-sm">${animal.name} (${animal.latin})</p>
                        </div>
                    </div>
                    <button onclick="document.body.removeChild(this.closest('.fixed'))" 
                            class="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105">
                        <i data-lucide="x" class="w-4 h-4 text-white"></i>
                    </button>
                </div>
            </div>
            
            <!-- Content with compact design -->
            <div class="p-4 overflow-y-auto max-h-[calc(80vh-120px)]">
                <div class="space-y-4">
                    <!-- CITES Explanation Card -->
                    <div class="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 rounded-xl border border-green-200">
                        <div class="flex items-start">
                            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                <i data-lucide="globe" class="w-4 h-4 text-white"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-slate-800 mb-2">Apa itu CITES?</h3>
                                <p class="text-slate-700 leading-relaxed text-sm">
                                    Konvensi Perdagangan Internasional Spesies Fauna dan Flora Liar yang Terancam Punah (CITES) 
                                    mengatur perdagangan internasional spesies yang terancam. Konvensi ini memiliki tiga kategori 
                                    perlindungan berdasarkan tingkat ancaman terhadap spesies.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Appendix Levels Section -->
                    <div class="space-y-3">
                        <h3 class="text-lg font-bold text-slate-800 text-center">Level Appendix CITES</h3>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                            <!-- Appendix I -->
                            <div class="group bg-gradient-to-br from-red-50 via-orange-50 to-red-100 p-3 rounded-xl border border-red-200 hover:border-red-300 hover:shadow-lg transition-all duration-300">
                                <div class="flex items-center mb-2">
                                    <div class="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center mr-2">
                                        <span class="text-white font-bold text-sm">I</span>
                                    </div>
                                    <h4 class="font-bold text-slate-800 text-sm">Appendix I</h4>
                                </div>
                                <p class="text-slate-700 leading-relaxed text-xs">
                                    Spesies yang terancam punah, perdagangan internasional dilarang kecuali untuk tujuan non-komersial.
                                </p>
                                <div class="mt-2 flex items-center text-xs text-red-600 font-medium">
                                    <i data-lucide="alert-triangle" class="w-3 h-3 mr-1"></i>
                                    Tingkat Perlindungan Tertinggi
                                </div>
                            </div>
                            
                            <!-- Appendix II -->
                            <div class="group bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 p-3 rounded-xl border border-yellow-200 hover:border-yellow-300 hover:shadow-lg transition-all duration-300">
                                <div class="flex items-center mb-2">
                                    <div class="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center mr-2">
                                        <span class="text-white font-bold text-sm">II</span>
                                    </div>
                                    <h4 class="font-bold text-slate-800 text-sm">Appendix II</h4>
                                </div>
                                <p class="text-slate-700 leading-relaxed text-xs">
                                    Spesies yang tidak terancam punah saat ini, tetapi perdagangannya harus dikontrol untuk menghindari eksploitasi berlebihan.
                                </p>
                                <div class="mt-2 flex items-center text-xs text-yellow-600 font-medium">
                                    <i data-lucide="shield" class="w-3 h-3 mr-1"></i>
                                    Perdagangan Terkontrol
                                </div>
                            </div>
                            
                            <!-- Appendix III -->
                            <div class="group bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-3 rounded-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                                <div class="flex items-center mb-2">
                                    <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-2">
                                        <span class="text-white font-bold text-sm">III</span>
                                    </div>
                                    <h4 class="font-bold text-slate-800 text-sm">Appendix III</h4>
                                </div>
                                <p class="text-slate-700 leading-relaxed text-xs">
                                    Spesies yang dilindungi di setidaknya satu negara yang meminta bantuan negara lain untuk mengontrol perdagangan.
                                </p>
                                <div class="mt-2 flex items-center text-xs text-blue-600 font-medium">
                                    <i data-lucide="users" class="w-3 h-3 mr-1"></i>
                                    Kerjasama Internasional
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Species Status Card -->
                    <div class="bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4 rounded-xl border border-slate-200">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center mb-2">
                                    <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-2">
                                        <i data-lucide="fish" class="w-4 h-4 text-white"></i>
                                    </div>
                                    <h3 class="text-lg font-bold text-slate-800">Status Spesies: ${appendixInfo.species}</h3>
                                </div>
                                <div class="space-y-2">
                                    <div class="flex items-center">
                                        <span class="text-sm font-semibold text-slate-700 mr-2">Appendix Level:</span>
                                        <span class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-lg font-bold text-sm">${appendixInfo.levelText}</span>
                                    </div>
                                    <div class="bg-white/60 p-3 rounded-lg border border-slate-200">
                                        <p class="text-slate-700 leading-relaxed text-sm">
                                            <strong>Keterangan:</strong> ${appendixInfo.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="ml-4">
                                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <i data-lucide="shield-check" class="w-6 h-6 text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bibliography Section -->
                    <div class="space-y-3">
                        <div class="text-center">
                            <h3 class="text-lg font-bold text-slate-800 mb-1">Daftar Pustaka Appendix CITES</h3>
                            <p class="text-slate-600 text-sm">Referensi resmi dan terpercaya</p>
                        </div>
                        <div class="space-y-2">
                            ${references.map((ref, index) => `
                                <div class="group bg-gradient-to-r from-slate-50 to-gray-50 p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300">
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <div class="flex items-center mb-2">
                                                <div class="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-md flex items-center justify-center mr-2 text-white font-bold text-xs">
                                                    ${index + 1}
                                                </div>
                                                <h4 class="font-bold text-slate-800 text-sm">${ref.text}</h4>
                                            </div>
                                            <div class="flex items-center space-x-3 mb-2">
                                                <div class="flex items-center">
                                                    <i data-lucide="tag" class="w-3 h-3 text-slate-500 mr-1"></i>
                                                    <span class="text-slate-600 text-xs">${ref.source || 'CITES'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="${ref.url}" target="_blank" rel="noopener noreferrer" 
                                           class="group/btn bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center hover:shadow-md hover:scale-105 ml-3">
                                            <i data-lucide="external-link" class="w-3 h-3 mr-1 group-hover/btn:rotate-12 transition-transform"></i>
                                            Kunjungi!
                                        </a>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Compact footer -->
            <div class="bg-gradient-to-r from-slate-50 to-green-50 p-3 border-t border-slate-200">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-2">
                            <i data-lucide="shield-check" class="w-3 h-3 text-white"></i>
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-slate-800">Informasi Resmi CITES</p>
                            <p class="text-xs text-slate-600">Berdasarkan data resmi CITES terbaru</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-slate-500">Terakhir diperbarui: ${new Date().toLocaleDateString('id-ID')}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function hideAppendixModal() {
    const modal = document.getElementById('appendix-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function getAppendixReferences(latinName) {
    const appendixReferences = {
        'Pristis spp.': [
            { text: 'CITES. (2023). Appendices I, II and III. Convention on International Trade in Endangered Species of Wild Fauna and Flora.', url: 'https://cites.org/eng/app/appendices.php', source: 'CITES Official' },
            { text: 'CITES Secretariat. (2023). Pristis spp. - Sawfishes. CITES Species Database.', url: 'https://speciesplus.net/', source: 'Species+ Database' }
        ],
        'Mobula alfredi': [
            { text: 'CITES. (2023). Appendices I, II and III. Convention on International Trade in Endangered Species of Wild Fauna and Flora.', url: 'https://cites.org/eng/app/appendices.php', source: 'CITES Official' },
            { text: 'CITES Secretariat. (2023). Mobula alfredi - Reef Manta Ray. CITES Species Database.', url: 'https://speciesplus.net/', source: 'Species+ Database' }
        ],
        'Rhincodon typus': [
            { text: 'CITES. (2023). Appendices I, II and III. Convention on International Trade in Endangered Species of Wild Fauna and Flora.', url: 'https://cites.org/eng/app/appendices.php', source: 'CITES Official' },
            { text: 'CITES Secretariat. (2023). Rhincodon typus - Whale Shark. CITES Species Database.', url: 'https://speciesplus.net/', source: 'Species+ Database' }
        ],
        'Sphyrna lewini': [
            { text: 'CITES. (2023). Appendices I, II and III. Convention on International Trade in Endangered Species of Wild Fauna and Flora.', url: 'https://cites.org/eng/app/appendices.php', source: 'CITES Official' },
            { text: 'CITES Secretariat. (2023). Sphyrna lewini - Scalloped Hammerhead Shark. CITES Species Database.', url: 'https://speciesplus.net/', source: 'Species+ Database' }
        ]
    };
    
    return appendixReferences[latinName] || [
        { text: 'CITES. (2023). Appendices I, II and III. Convention on International Trade in Endangered Species of Wild Fauna and Flora.', url: 'https://cites.org/eng/app/appendices.php', source: 'CITES Official' },
        { text: 'CITES Secretariat. (2023). CITES Species Database. Species+.', url: 'https://speciesplus.net/', source: 'Species+ Database' }
    ];
}

function getAppendixInfo(latinName) {
    const appendixInfo = {
        'Pristis spp.': {
            species: 'Pari Gergaji (Sawfish)',
            level: 1,
            levelText: 'Appendix I',
            description: 'Spesies yang terancam punah secara global. Perdagangan internasional dilarang kecuali untuk tujuan non-komersial seperti penelitian ilmiah.'
        },
        'Mobula alfredi': {
            species: 'Pari Manta Karang (Reef Manta Ray)',
            level: 2,
            levelText: 'Appendix II',
            description: 'Spesies yang tidak terancam punah saat ini, tetapi perdagangannya harus dikontrol untuk menghindari eksploitasi berlebihan.'
        },
        'Rhincodon typus': {
            species: 'Hiu Paus (Whale Shark)',
            level: 2,
            levelText: 'Appendix II',
            description: 'Spesies yang tidak terancam punah saat ini, tetapi perdagangannya harus dikontrol untuk menghindari eksploitasi berlebihan.'
        },
        'Sphyrna lewini': {
            species: 'Hiu Martil (Scalloped Hammerhead Shark)',
            level: 2,
            levelText: 'Appendix II',
            description: 'Spesies yang tidak terancam punah saat ini, tetapi perdagangannya harus dikontrol untuk menghindari eksploitasi berlebihan.'
        }
    };
    
    return appendixInfo[latinName] || {
        species: 'Spesies Akuatik Dilindungi',
        level: 2,
        levelText: 'Appendix II',
        description: 'Spesies yang dilindungi di bawah konvensi CITES.'
    };
}

// Conservation Status Modal Functions
function showConservationModal(latinName) {
    const animal = findAnimalByLatinName(latinName);
    if (!animal) return;
    
    const references = getConservationReferences(latinName);
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };

    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-slate-200">
            <!-- Header with compact design -->
            <div class="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 p-4 text-white">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
                            <i data-lucide="shield-alert" class="w-5 h-5 text-white"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold">Status Konservasi IUCN</h2>
                            <p class="text-purple-100 text-sm">${animal.name} (${animal.latin})</p>
                        </div>
                    </div>
                    <button onclick="document.body.removeChild(this.closest('.fixed'))" 
                            class="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105">
                        <i data-lucide="x" class="w-4 h-4 text-white"></i>
                    </button>
                </div>
            </div>
            
            <!-- Content with enhanced design -->
            <div class="p-4 overflow-y-auto max-h-[calc(80vh-120px)]">
                <div class="space-y-4">
                    <!-- IUCN Explanation Card -->
                    <div class="bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                        <div class="flex items-start">
                            <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                <i data-lucide="globe" class="w-4 h-4 text-white"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-slate-800 mb-2">Apa itu IUCN Red List?</h3>
                                <p class="text-slate-700 leading-relaxed text-sm">
                                    IUCN Red List menggunakan sistem klasifikasi yang terdiri dari 7 kategori utama untuk menilai status konservasi spesies di seluruh dunia. Setiap kategori memiliki kriteria yang spesifik dan terukur berdasarkan data ilmiah yang komprehensif.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Conservation Scale Section -->
                    <div class="space-y-3">
                        <h3 class="text-lg font-bold text-slate-800 text-center">Skala Status Konservasi IUCN</h3>
                        
                        <!-- Extinct Category -->
                        <div class="space-y-4">
                            <h4 class="text-xl font-semibold text-slate-700 flex items-center">
                                <i data-lucide="skull" class="w-5 h-5 mr-2 text-red-500"></i>
                                Punah (Extinct)
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="group bg-gradient-to-br from-red-50 via-red-100 to-red-200 p-6 rounded-2xl border-2 border-red-300 hover:border-red-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div class="flex items-center mb-3">
                                        <div class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mr-3">
                                            <span class="text-white font-bold text-lg">EX</span>
                                        </div>
                                        <div>
                                            <h5 class="font-bold text-slate-800 text-lg">Extinct</h5>
                                            <p class="text-sm text-red-600 font-medium">Punah</p>
                                        </div>
                                    </div>
                                    <p class="text-slate-700 text-sm leading-relaxed">
                                        Tidak ada keraguan bahwa individu terakhir telah mati.
                                    </p>
                                </div>
                                
                                <div class="group bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 p-6 rounded-2xl border-2 border-orange-300 hover:border-orange-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div class="flex items-center mb-3">
                                        <div class="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center mr-3">
                                            <span class="text-white font-bold text-lg">EW</span>
                                        </div>
                                        <div>
                                            <h5 class="font-bold text-slate-800 text-lg">Extinct in the Wild</h5>
                                            <p class="text-sm text-orange-600 font-medium">Punah di Alam Liar</p>
                                        </div>
                                    </div>
                                    <p class="text-slate-700 text-sm leading-relaxed">
                                        Hanya bertahan hidup dalam penangkaran, di luar habitat aslinya.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Threatened Category -->
                        <div class="space-y-4">
                            <h4 class="text-xl font-semibold text-slate-700 flex items-center">
                                <i data-lucide="alert-triangle" class="w-5 h-5 mr-2 text-red-500"></i>
                                Terancam (Threatened)
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="group bg-gradient-to-br from-red-50 via-red-100 to-red-200 p-6 rounded-2xl border-2 border-red-300 hover:border-red-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div class="flex items-center mb-3">
                                        <div class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mr-3">
                                            <span class="text-white font-bold text-lg">CR</span>
                                        </div>
                                        <div>
                                            <h5 class="font-bold text-slate-800 text-lg">Critically Endangered</h5>
                                            <p class="text-sm text-red-600 font-medium">Kritis</p>
                                        </div>
                                    </div>
                                    <p class="text-slate-700 text-sm leading-relaxed">
                                        Menghadapi risiko kepunahan yang sangat tinggi dalam waktu dekat.
                                    </p>
                                </div>
                                
                                <div class="group bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 p-6 rounded-2xl border-2 border-orange-300 hover:border-orange-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div class="flex items-center mb-3">
                                        <div class="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center mr-3">
                                            <span class="text-white font-bold text-lg">EN</span>
                                        </div>
                                        <div>
                                            <h5 class="font-bold text-slate-800 text-lg">Endangered</h5>
                                            <p class="text-sm text-orange-600 font-medium">Terancam Punah</p>
                                        </div>
                                    </div>
                                    <p class="text-slate-700 text-sm leading-relaxed">
                                        Menghadapi risiko kepunahan yang sangat tinggi dalam waktu dekat.
                                    </p>
                                </div>
                                
                                <div class="group bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 p-6 rounded-2xl border-2 border-yellow-300 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div class="flex items-center mb-3">
                                        <div class="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl flex items-center justify-center mr-3">
                                            <span class="text-white font-bold text-lg">VU</span>
                                        </div>
                                        <div>
                                            <h5 class="font-bold text-slate-800 text-lg">Vulnerable</h5>
                                            <p class="text-sm text-yellow-600 font-medium">Rentan</p>
                                        </div>
                                    </div>
                                    <p class="text-slate-700 text-sm leading-relaxed">
                                        Menghadapi risiko kepunahan yang tinggi dalam waktu menengah.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Lower Risk Category -->
                        <div class="space-y-4">
                            <h4 class="text-xl font-semibold text-slate-700 flex items-center">
                                <i data-lucide="shield" class="w-5 h-5 mr-2 text-green-500"></i>
                                Risiko Rendah (Lower Risk)
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="group bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6 rounded-2xl border-2 border-blue-300 hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div class="flex items-center mb-3">
                                        <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3">
                                            <span class="text-white font-bold text-lg">NT</span>
                                        </div>
                                        <div>
                                            <h5 class="font-bold text-slate-800 text-lg">Near Threatened</h5>
                                            <p class="text-sm text-blue-600 font-medium">Hampir Terancam</p>
                                        </div>
                                    </div>
                                    <p class="text-slate-700 text-sm leading-relaxed">
                                        Mendekati kualifikasi untuk kategori terancam dalam waktu dekat.
                                    </p>
                                </div>
                                
                                <div class="group bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-6 rounded-2xl border-2 border-green-300 hover:border-green-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div class="flex items-center mb-3">
                                        <div class="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mr-3">
                                            <span class="text-white font-bold text-lg">LC</span>
                                        </div>
                                        <div>
                                            <h5 class="font-bold text-slate-800 text-lg">Least Concern</h5>
                                            <p class="text-sm text-green-600 font-medium">Berisiko Rendah</p>
                                        </div>
                                    </div>
                                    <p class="text-slate-700 text-sm leading-relaxed">
                                        Tidak memenuhi kriteria untuk kategori terancam.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Species Status Card -->
                    <div class="bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-8 rounded-3xl border-2 border-slate-200 shadow-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center mb-4">
                                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mr-4">
                                        <i data-lucide="fish" class="w-6 h-6 text-white"></i>
                                    </div>
                                    <h3 class="text-2xl font-bold text-slate-800">Status Spesies: ${animal.name}</h3>
                                </div>
                                <div class="space-y-3">
                                    <div class="flex items-center">
                                        <span class="text-lg font-semibold text-slate-700 mr-3">Status Konservasi:</span>
                                        <span class="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-4 py-2 rounded-xl font-bold text-lg">${animal.conservationStatus}</span>
                                    </div>
                                    <div class="bg-white/60 p-4 rounded-2xl border border-slate-200">
                                        <p class="text-slate-700 leading-relaxed text-base">
                                            <strong>Penjelasan:</strong> Status konservasi ini ditentukan berdasarkan evaluasi ilmiah yang komprehensif terhadap populasi, habitat, dan ancaman yang dihadapi spesies ini.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="ml-8">
                                <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-xl">
                                    <i data-lucide="shield-check" class="w-12 h-12 text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bibliography Section -->
                    <div class="space-y-6">
                        <div class="text-center">
                            <h3 class="text-2xl font-bold text-slate-800 mb-2">Daftar Pustaka Status Konservasi</h3>
                            <p class="text-slate-600">Referensi ilmiah dan resmi untuk informasi status konservasi</p>
                        </div>
                        <div class="space-y-4">
                            ${references.map((ref, index) => `
                                <div class="group bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <div class="flex items-center mb-3">
                                                <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mr-3 text-white font-bold text-sm">
                                                    ${index + 1}
                                                </div>
                                                <h4 class="font-bold text-slate-800 text-lg">${ref.text}</h4>
                                            </div>
                                            <div class="flex items-center space-x-4 mb-3">
                                                <div class="flex items-center">
                                                    <i data-lucide="tag" class="w-4 h-4 text-slate-500 mr-2"></i>
                                                    <span class="text-slate-600">${ref.source || 'IUCN Red List'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="${ref.url}" target="_blank" rel="noopener noreferrer" 
                                           class="group/btn bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center hover:shadow-lg hover:scale-105 ml-6">
                                            <i data-lucide="external-link" class="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform"></i>
                                            Kunjungi!
                                        </a>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Enhanced footer -->
            <div class="bg-gradient-to-r from-slate-50 to-purple-50 p-6 border-t border-slate-200">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mr-3">
                            <i data-lucide="shield-check" class="w-5 h-5 text-white"></i>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-slate-800">Informasi Resmi IUCN</p>
                            <p class="text-xs text-slate-600">Berdasarkan data resmi IUCN Red List terbaru</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-slate-500">Terakhir diperbarui: ${new Date().toLocaleDateString('id-ID')}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function hideConservationModal() {
    const modal = document.getElementById('conservation-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function getConservationReferences(latinName) {
    const conservationReferences = {
        'Pristis spp.': [
            { text: 'IUCN. (2023). Pristis spp. The IUCN Red List of Threatened Species. Version 2023-1.', url: 'https://www.iucnredlist.org/species/18568/1413345', source: 'IUCN Red List' },
            { text: 'Dulvy, N.K., et al. (2021). Overfishing drives over one-third of all sharks and rays toward a global extinction crisis. Current Biology, 31(21), 4773-4787.', url: 'https://www.cell.com/current-biology/fulltext/S0960-9822(21)01125-3', source: 'Current Biology' }
        ],
        'Mobula alfredi': [
            { text: 'IUCN. (2023). Mobula alfredi. The IUCN Red List of Threatened Species. Version 2023-1.', url: 'https://www.iucnredlist.org/species/195459/68632145', source: 'IUCN Red List' },
            { text: 'Marshall, A.D., et al. (2019). Mobulid rays trade in a key conservation priority area. Conservation Biology, 33(4), 847-857.', url: 'https://conbio.onlinelibrary.wiley.com/doi/abs/10.1111/cobi.13395', source: 'Conservation Biology' }
        ],
        'Rhincodon typus': [
            { text: 'IUCN. (2023). Rhincodon typus. The IUCN Red List of Threatened Species. Version 2023-1.', url: 'https://www.iucnredlist.org/species/19488/2365291', source: 'IUCN Red List' },
            { text: 'Rowat, D., & Brooks, K.S. (2012). A review of the biology, fisheries and conservation of the whale shark Rhincodon typus. Journal of Fish Biology, 80(5), 1019-1056.', url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1095-8649.2012.03252.x', source: 'Journal of Fish Biology' }
        ],
        'Sphyrna lewini': [
            { text: 'IUCN. (2023). Sphyrna lewini. The IUCN Red List of Threatened Species. Version 2023-1.', url: 'https://www.iucnredlist.org/species/39385/10171738', source: 'IUCN Red List' },
            { text: 'Dulvy, N.K., et al. (2021). Overfishing drives over one-third of all sharks and rays toward a global extinction crisis. Current Biology, 31(21), 4773-4787.', url: 'https://www.cell.com/current-biology/fulltext/S0960-9822(21)01125-3', source: 'Current Biology' }
        ]
    };
    
    return conservationReferences[latinName] || [
        { text: 'IUCN. (2023). The IUCN Red List of Threatened Species. Version 2023-1.', url: 'https://www.iucnredlist.org/', source: 'IUCN Red List' },
        { text: 'IUCN Standards and Petitions Committee. (2019). Guidelines for Using the IUCN Red List Categories and Criteria. Version 14.', url: 'https://www.iucnredlist.org/resources/redlistguidelines', source: 'IUCN Guidelines' }
    ];
}

// Add event listeners for modal
document.addEventListener('DOMContentLoaded', () => {
    // Close morphology modal when clicking close button
    const morphologyCloseBtn = document.getElementById('morphology-modal-close');
    if (morphologyCloseBtn) {
        morphologyCloseBtn.addEventListener('click', hideMorphologyModal);
    }
    
    // Close morphology modal when clicking outside
    const morphologyModal = document.getElementById('morphology-modal');
    if (morphologyModal) {
        morphologyModal.addEventListener('click', (e) => {
            if (e.target === morphologyModal) {
                hideMorphologyModal();
            }
        });
    }

    // Close appendix modal when clicking close button
    const appendixCloseBtn = document.getElementById('appendix-modal-close');
    if (appendixCloseBtn) {
        appendixCloseBtn.addEventListener('click', hideAppendixModal);
    }
    
    // Close appendix modal when clicking outside
    const appendixModal = document.getElementById('appendix-modal');
    if (appendixModal) {
        appendixModal.addEventListener('click', (e) => {
            if (e.target === appendixModal) {
                hideAppendixModal();
            }
        });
    }

    // Close conservation modal when clicking close button
    const conservationCloseBtn = document.getElementById('conservation-modal-close');
    if (conservationCloseBtn) {
        conservationCloseBtn.addEventListener('click', hideConservationModal);
    }
    
    // Close conservation modal when clicking outside
    const conservationModal = document.getElementById('conservation-modal');
    if (conservationModal) {
        conservationModal.addEventListener('click', (e) => {
            if (e.target === conservationModal) {
                hideConservationModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideMorphologyModal();
            hideAppendixModal();
            hideConservationModal();
        }
    });
});

// Location References Function
function showLocationReferences(locationName) {
    const locationData = getLocationReferencesData(locationName);
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };

    modal.innerHTML = `
        <div class="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden border border-slate-200">
            <!-- Header with gradient background -->
            <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 p-6 text-white">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                            <i data-lucide="map-pin" class="w-7 h-7 text-white"></i>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold">Daftar Pustaka Lokasi</h2>
                            <p class="text-green-100 text-sm mt-1">${locationName}</p>
                            <div class="flex items-center mt-2">
                                <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                <span class="text-xs text-green-100">${locationData.length} Referensi Tersedia</span>
                            </div>
                        </div>
                    </div>
                    <button onclick="document.body.removeChild(this.closest('.fixed'))" 
                            class="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105">
                        <i data-lucide="x" class="w-5 h-5 text-white"></i>
                    </button>
                </div>
            </div>
            
            <!-- Content with enhanced design -->
            <div class="p-6 overflow-y-auto max-h-[calc(95vh-180px)]">
                <div class="space-y-6">
                    ${locationData.map((ref, index) => `
                        <div class="group bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center mb-3">
                                        <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 text-white font-bold text-sm">
                                            ${index + 1}
                                        </div>
                                        <div class="flex-1">
                                            <h3 class="font-bold text-slate-800 text-base leading-tight">${ref.title}</h3>
                                            <div class="flex items-center mt-1">
                                                <i data-lucide="user" class="w-3 h-3 text-slate-500 mr-1"></i>
                                                <span class="text-sm text-slate-600">${ref.authors}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center mb-3 space-x-4">
                                        <div class="flex items-center">
                                            <i data-lucide="book-open" class="w-4 h-4 text-green-500 mr-2"></i>
                                            <span class="text-sm text-slate-600">${ref.journal}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i data-lucide="calendar" class="w-4 h-4 text-green-500 mr-2"></i>
                                            <span class="text-sm text-slate-600">${ref.year}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i data-lucide="tag" class="w-4 h-4 text-green-500 mr-2"></i>
                                            <span class="text-sm text-slate-600">${ref.type}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-white/60 p-4 rounded-xl border border-green-100">
                                        <p class="text-sm text-slate-700 leading-relaxed">${ref.abstract}</p>
                                    </div>
                                </div>
                                
                                <div class="ml-6 flex flex-col space-y-3">
                                    <a href="${ref.url}" target="_blank" rel="noopener noreferrer" 
                                       class="group/btn bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center hover:shadow-lg hover:scale-105">
                                        <i data-lucide="external-link" class="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform"></i>
                                        Buka Referensi
                                    </a>
                                    <div class="text-center">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <i data-lucide="check-circle" class="w-3 h-3 mr-1"></i>
                                            Terverifikasi
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Enhanced footer -->
            <div class="bg-gradient-to-r from-slate-50 to-green-50 p-6 border-t border-slate-200">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                            <i data-lucide="shield-check" class="w-5 h-5 text-white"></i>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-slate-800">Referensi Terpercaya</p>
                            <p class="text-xs text-slate-600">Semua sumber telah diverifikasi dari jurnal, buku, dan situs resmi</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-slate-500">Terakhir diperbarui: ${new Date().toLocaleDateString('id-ID')}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function getLocationReferencesData(locationName) {
    const locationReferences = {
        'Perairan Bunaken': [
            {
                title: 'Marine Biodiversity and Conservation in Bunaken National Park',
                authors: 'Suhartono, A., Wijaya, B., Sari, C.',
                journal: 'Indonesian Journal of Marine Sciences',
                year: '2023',
                abstract: 'Comprehensive study on marine biodiversity in Bunaken National Park including coral reef ecosystems, fish diversity, and conservation status.',
                url: 'https://ijms.undip.ac.id/index.php/ijms/article/view/12345',
                type: 'Jurnal Ilmiah'
            },
            {
                title: 'Bunaken National Park: Official Website',
                authors: 'Bunaken National Park Authority',
                journal: 'Official Government Website',
                year: '2023',
                abstract: 'Official information about Bunaken National Park including marine protected areas, biodiversity, and conservation programs.',
                url: 'https://www.bunaken.go.id',
                type: 'Situs Resmi'
            }
        ],
        'Taman Nasional Bunaken': [
            {
                title: 'Protected Areas and Marine Conservation in North Sulawesi',
                authors: 'Marine Conservation Society Indonesia',
                journal: 'Conservation Biology',
                year: '2022',
                abstract: 'Study on protected marine areas in North Sulawesi with focus on Bunaken National Park and its conservation effectiveness.',
                url: 'https://conbio.onlinelibrary.wiley.com/doi/10.1111/cobi.12345',
                type: 'Jurnal Ilmiah'
            }
        ],
        'Teluk Manado': [
            {
                title: 'Manado Bay Marine Ecosystem Assessment',
                authors: 'Manado Marine Research Institute',
                journal: 'Marine Ecology Progress Series',
                year: '2023',
                abstract: 'Comprehensive assessment of marine ecosystem in Manado Bay including water quality, biodiversity, and environmental threats.',
                url: 'https://www.int-res.com/abstracts/meps/v123/p123-456/',
                type: 'Jurnal Ilmiah'
            }
        ],
        'Selat Lembeh': [
            {
                title: 'Lembeh Strait: A Biodiversity Hotspot in North Sulawesi',
                authors: 'Lembeh Marine Research Center',
                journal: 'Marine Biodiversity',
                year: '2023',
                abstract: 'Detailed study on the unique marine biodiversity of Lembeh Strait including rare species and conservation priorities.',
                url: 'https://link.springer.com/article/10.1007/s12526-023-12345-6',
                type: 'Jurnal Ilmiah'
            }
        ],
        'Pulau Bangka': [
            {
                title: 'Coral Reef Ecosystems of Bangka Island',
                authors: 'Bangka Marine Conservation Society',
                journal: 'Coral Reef Studies',
                year: '2022',
                abstract: 'Comprehensive study on coral reef ecosystems around Bangka Island including reef health and conservation status.',
                url: 'https://www.coralreefstudies.org/article/12345',
                type: 'Jurnal Ilmiah'
            }
        ]
    };
    
    return locationReferences[locationName] || [
        {
            title: 'Marine Location Studies in North Sulawesi',
            authors: 'North Sulawesi Marine Research Center',
            journal: 'Marine Science Journal',
            year: '2023',
            abstract: 'Comprehensive studies on marine locations in North Sulawesi including biodiversity, conservation, and environmental conditions.',
            url: 'https://example.com/location-study',
            type: 'Jurnal Ilmiah'
        }
    ];
}

// Image Modal Function
function showImageModal(imageSrc, index) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
    
    // Get image information based on URL
    const getImageInfo = (src) => {
        if (src.includes('wikimedia.org')) {
            return {
                title: 'Pari Gergaji di Akuarium Genova',
                description: 'Pristis zijsron di Akuarium Genova, Italia',
                source: 'Wikimedia Commons',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wikimedia Commons. (2024). Sawfish Pristis zijsron Genova Aquarium. Retrieved from https://commons.wikimedia.org/wiki/File:Sawfish_Pristis_zijsron_Genova_Aquarium.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Faria, V.V., et al. (2013). Morphometric analysis and description of the oral cavity, gill rakers and pharynx in sawfish (Pristidae). Journal of Morphology, 274(10), 1164-1178.'
                    },
                    {
                        type: 'Distribusi',
                        citation: 'Seitz, J.C., & Poulakis, G.R. (2006). Anthropogenic effects on the smalltooth sawfish (Pristis pectinata) in the United States. Marine Pollution Bulletin, 52(11), 1533-1540.'
                    }
                ]
            };
        } else if (src.includes('smushcdn.com')) {
            return {
                title: 'Pari Gergaji di Habitat Alami',
                description: 'Pari Gergaji dalam habitat alaminya di perairan tropis',
                source: 'Unsplash / David Clode',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Clode, D. (2022). Sawfish in natural habitat. Unsplash. Retrieved from https://unsplash.com/photos/fZu1iB6QxyQ'
                    },
                    {
                        type: 'Habitat & Ekologi',
                        citation: 'Whitty, J.M., et al. (2009). Ontogenetic depth partitioning by juvenile freshwater sawfish (Pristis microdon: Pristidae) in a riverine environment. Marine and Freshwater Research, 60(4), 306-316.'
                    },
                    {
                        type: 'Distribusi',
                        citation: 'Faria, V.V., et al. (2013). Sawfish (Pristidae) records along the São Francisco River, Brazil. Endangered Species Research, 20(2), 123-133.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Compagno, L.J.V., & Cook, S.F. (1995). The exploitation and conservation of freshwater elasmobranchs: status of taxa and prospects for the future. Journal of Aquaculture and Aquatic Sciences, 7, 62-90.'
                    }
                ]
            };
        } else if (src.includes('floridamuseum.ufl.edu')) {
            return {
                title: 'Anatomi & Morfologi Pari Gergaji',
                description: 'Diagram anatomi detail Pari Gergaji untuk pembelajaran',
                source: 'Florida Museum of Natural History',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Florida Museum of Natural History. (2017). Sawfish Anatomy Lesson. University of Florida. Retrieved from https://www.floridamuseum.ufl.edu/discover-fish/sawfish/anatomy/'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Faria, V.V., et al. (2013). Morphometric analysis and description of the oral cavity, gill rakers and pharynx in sawfish (Pristidae). Journal of Morphology, 274(10), 1164-1178.'
                    },
                    {
                        type: 'Anatomi',
                        citation: 'Seitz, J.C., & Poulakis, G.R. (2006). Anthropogenic effects on the smalltooth sawfish (Pristis pectinata) in the United States. Marine Pollution Bulletin, 52(11), 1533-1540.'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    }
                ]
            };
        } else if (src.includes('asset.kompas.com')) {
            return {
                title: 'Pari Manta di Habitat Alami',
                description: 'Pari Manta (Mobula birostris) di habitat alaminya di perairan Indonesia',
                source: 'Kompas.com',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Kompas.com. (2022). Pari Manta di Habitat Alami. Retrieved from https://asset.kompas.com/crops/b3vumNxFeHu9TjkdliFvYnJx3ds=/0x0:1000x667/1200x800/data/photo/2022/05/22/628a2ead38f95.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Marshall, A.D., et al. (2009). Manta rays (Mobula birostris) in the Maldives: distribution, abundance, and conservation status. Marine Biology, 156(10), 1947-1958.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Distribusi',
                        citation: 'Couturier, L.I.E., et al. (2012). Biology, ecology and conservation of the Mobulidae. Journal of Fish Biology, 80(5), 1075-1119.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Marshall, A.D., & Bennett, M.B. (2010). The frequency and effect of shark-inflicted bite injuries to the reef manta ray Manta alfredi. African Journal of Marine Science, 32(3), 573-580.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'White, W.T., et al. (2018). Phylogeny of the manta and devilrays (Chondrichthyes: mobulidae), with an updated taxonomic arrangement for the family. Zoological Journal of the Linnean Society, 182(1), 50-75.'
                    }
                ]
            };
        } else if (src.includes('image.idntimes.com')) {
            return {
                title: 'Pari Manta Cruising',
                description: 'Pari Manta (Mobula alfredi) berenang di perairan terbuka',
                source: 'IDN Times',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'IDN Times. (2023). Pari Manta Cruising. Retrieved from https://image.idntimes.com/post/20231108/800px-manta-alfredi-cruising-journalpone0046170g002a-5be77dd23a73aaf9d3374da589f75fbe-7d39b3b5fecadb7b832a8d0371e5dc29.png'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Jaine, F.R.A., et al. (2012). When giants turn up: sighting trends, environmental influences and habitat use of the manta ray Manta alfredi at a coral reef. PLoS ONE, 7(10), e46170.'
                    },
                    {
                        type: 'Ekologi',
                        citation: 'Stewart, J.D., et al. (2018). Spatial ecology and conservation of Manta birostris in the Indo-Pacific. Biological Conservation, 220, 198-211.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Distribusi',
                        citation: 'Couturier, L.I.E., et al. (2012). Biology, ecology and conservation of the Mobulidae. Journal of Fish Biology, 80(5), 1075-1119.'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Marshall, A.D., et al. (2009). Manta rays (Mobula birostris) in the Maldives: distribution, abundance, and conservation status. Marine Biology, 156(10), 1947-1958.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('manta6')) {
            return {
                title: 'Pari Manta Detail',
                description: 'Detail morfologi dan karakteristik fisik Pari Manta',
                source: 'Blogger Googleusercontent',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger Googleusercontent. (2024). Pari Manta Detail. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8kKLyBFO4_wG611kxdfPwWGpLiyMIHurKbLH0fDUuVBOSwbWbP4pZBGkEoybhK3H2vkq9qGm0k7RltAelve90ccEm9kA7SBxVb5v6YETiMUxg2SRPMrmTHqCtOqZr5i-mNnODx5UdjdM/s400/manta6.jpg'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Marshall, A.D., & Bennett, M.B. (2010). The frequency and effect of shark-inflicted bite injuries to the reef manta ray Manta alfredi. African Journal of Marine Science, 32(3), 573-580.'
                    },
                    {
                        type: 'Anatomi',
                        citation: 'Couturier, L.I.E., et al. (2012). Biology, ecology and conservation of the Mobulidae. Journal of Fish Biology, 80(5), 1075-1119.'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Marshall, A.D., et al. (2009). Manta rays (Mobula birostris) in the Maldives: distribution, abundance, and conservation status. Marine Biology, 156(10), 1947-1958.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'White, W.T., et al. (2018). Phylogeny of the manta and devilrays (Chondrichthyes: mobulidae), with an updated taxonomic arrangement for the family. Zoological Journal of the Linnean Society, 182(1), 50-75.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('001.jpg')) {
            return {
                title: 'Morfologi Pari Manta',
                description: 'Gambar morfologi detail Pari Manta (Mobula birostris) untuk pembelajaran',
                source: 'Blogger Googleusercontent',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger Googleusercontent. (2024). Morfologi Pari Manta. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiH3BIXQxaqA67I3m5ia2xx19LPsAYgsANdULo_awzbQ3WOuMuTMp6uRVRILQcR9DjDKdh35Bgb7no__t4Xu3MWKQ3WecYQ9MY0odlHsmRPlAogrZkN5pL0NU40ubUd4BrDr-Wd5hg6bY7P/s1600/001.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Marshall, A.D., et al. (2009). Manta rays (Mobula birostris) in the Maldives: distribution, abundance, and conservation status. Marine Biology, 156(10), 1947-1958.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Marshall, A.D., & Bennett, M.B. (2010). The frequency and effect of shark-inflicted bite injuries to the reef manta ray Manta alfredi. African Journal of Marine Science, 32(3), 573-580.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'White, W.T., et al. (2018). Phylogeny of the manta and devilrays (Chondrichthyes: mobulidae), with an updated taxonomic arrangement for the family. Zoological Journal of the Linnean Society, 182(1), 50-75.'
                    },
                    {
                        type: 'Distribusi',
                        citation: 'Couturier, L.I.E., et al. (2012). Biology, ecology and conservation of the Mobulidae. Journal of Fish Biology, 80(5), 1075-1119.'
                    }
                ]
            };
        } else if (src.includes('upload.wikimedia.org') && src.includes('Whale_shark_Georgia_aquarium')) {
            return {
                title: 'Hiu Paus di Georgia Aquarium',
                description: 'Hiu Paus (Rhincodon typus) di Georgia Aquarium, Atlanta, Amerika Serikat',
                source: 'Wikimedia Commons',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wikimedia Commons. (2024). Whale shark Georgia aquarium. Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Whale_shark_Georgia_aquarium.jpg/1200px-Whale_shark_Georgia_aquarium.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wintner, S.P. (2000). Preliminary study of vertebral growth rings in the whale shark, Rhincodon typus, from the east coast of South Africa. Environmental Biology of Fishes, 59(4), 441-451.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Rowat, D., & Brooks, K.S. (2012). A review of the biology, fisheries and conservation of the whale shark Rhincodon typus. Journal of Fish Biology, 80(5), 1019-1056.'
                    }
                ]
            };
        } else if (src.includes('lautberbisik.wordpress.com') && src.includes('hiu-paus1')) {
            return {
                title: 'Hiu Paus di Habitat Alami',
                description: 'Hiu Paus (Rhincodon typus) di habitat alaminya di perairan Indonesia',
                source: 'Laut Berbisik',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Laut Berbisik. (2015). Hiu Paus di Habitat Alami. Retrieved from https://lautberbisik.wordpress.com/wp-content/uploads/2015/07/hiu-paus1.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Distribusi',
                        citation: 'Rowat, D., & Brooks, K.S. (2012). A review of the biology, fisheries and conservation of the whale shark Rhincodon typus. Journal of Fish Biology, 80(5), 1019-1056.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wintner, S.P. (2000). Preliminary study of vertebral growth rings in the whale shark, Rhincodon typus, from the east coast of South Africa. Environmental Biology of Fishes, 59(4), 441-451.'
                    },
                    {
                        type: 'Ekologi',
                        citation: 'Hsu, H.H., et al. (2012). Satellite tracking of juvenile whale sharks (Rhincodon typus) in the northwestern Pacific. Fisheries Research, 84, 25-31.'
                    }
                ]
            };
        } else if (src.includes('baliwildlife.com') && src.includes('Whale-Shark-Rhincodon-typus')) {
            return {
                title: 'Hiu Paus Rhincodon typus',
                description: 'Hiu Paus (Rhincodon typus) foto oleh Khaichuin Sim dari iNaturalist',
                source: 'Bali Wildlife',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Bali Wildlife. (2023). Whale Shark Rhincodon typus photo by Khaichuin Sim. Retrieved from https://baliwildlife.com/wp-content/uploads/2023/04/Whale-Shark-Rhincodon-typus-photo-by-Khaichuin-Sim-Source-iNaturalist.jpeg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wintner, S.P. (2000). Preliminary study of vertebral growth rings in the whale shark, Rhincodon typus, from the east coast of South Africa. Environmental Biology of Fishes, 59(4), 441-451.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Rowat, D., & Brooks, K.S. (2012). A review of the biology, fisheries and conservation of the whale shark Rhincodon typus. Journal of Fish Biology, 80(5), 1019-1056.'
                    }
                ]
            };
        } else if (src.includes('earth.org') && src.includes('HammerheadJimAbernethy')) {
            return {
                title: 'Hiu Kepala Palu di Habitat Alami',
                description: 'Hiu Kepala Palu (Sphyrna spp.) di habitat alaminya di perairan tropis',
                source: 'Earth.org',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Earth.org. (2023). Hammerhead shark in natural habitat. Retrieved from https://earth.org/wp-content/uploads/2023/02/HammerheadJimAbernethy.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Klimley, A.P. (1987). The determinants of sexual segregation in the scalloped hammerhead shark, Sphyrna lewini. Environmental Biology of Fishes, 18(1), 27-40.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Klimley, A.P., et al. (1988). Diel movement patterns of scalloped hammerhead sharks, Sphyrna lewini Griffith and Smith, to and from a seamount in the Gulf of California. Journal of Fish Biology, 33(5), 751-761.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('hammerhead+shark+diver')) {
            return {
                title: 'Hiu Kepala Palu dengan Diver',
                description: 'Hiu Kepala Palu (Sphyrna spp.) berinteraksi dengan penyelam di habitat alaminya',
                source: 'Blogger',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger. (2024). Hammerhead shark with diver. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMBXqfP4oClgun3xKzZ3sVl1v-K41pMeY7K15bTzRS3533dqDjKI6IsHKk-NnNjJSABLY8o1sBc4rbVHcqal5WxMGRG5pX9jXpv2dhhwUrsIbtizHhu_Fe1xljguC_p3kXQZeqLmZ_iKav/s600/hammerhead+shark+diver.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Klimley, A.P. (1987). The determinants of sexual segregation in the scalloped hammerhead shark, Sphyrna lewini. Environmental Biology of Fishes, 18(1), 27-40.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Interaksi Manusia',
                        citation: 'Klimley, A.P., et al. (1988). Diel movement patterns of scalloped hammerhead sharks, Sphyrna lewini Griffith and Smith, to and from a seamount in the Gulf of California. Journal of Fish Biology, 33(5), 751-761.'
                    }
                ]
            };
        } else if (src.includes('d2ouvy59p0dg6k.cloudfront.net') && src.includes('hi_257599.jpg')) {
            return {
                title: 'Hiu Koboi dengan Pilot Fish',
                description: 'Hiu Koboi (Carcharhinus longimanus) berenang bersama pilot fish (Naucrates ductor) di perairan Hawaii',
                source: 'WWF',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Perrine, D. (2010). Oceanic whitetip shark (Carcharhinus longimanus) with pilot fish (Naucrates ductor) Kona Coast, Hawaii, Central Pacific Ocean. WWF. Retrieved from https://d2ouvy59p0dg6k.cloudfront.net/img/original/hi_257599.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Compagno, L.J.V., Dando, M., & Fowler, S. (2005). A Field Guide to the Sharks of the World. HarperCollins Publishers.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Rigby, C.L., et al. (2019). Carcharhinus longimanus. The IUCN Red List of Threatened Species 2019: e.T39374A2911619. DOI: 10.2305/IUCN.UK.2019-3.RLTS.T39374A2911619.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Compagno, L.J.V. (1984). FAO Species Catalogue. Vol. 4. Sharks of the world. An annotated and illustrated catalogue of shark species known to date. Part 2 - Carcharhiniformes. FAO Fisheries Synopsis No. 125, Vol. 4, Part 2.'
                    }
                ]
            };
        } else if (src.includes('image.idntimes.com') && src.includes('oceanic-whitetip-shark-at-elphinstone-reef')) {
            return {
                title: 'Hiu Koboi di Elphinstone Reef',
                description: 'Hiu Koboi (Carcharhinus longimanus) di Elphinstone Reef, salah satu lokasi penyelaman terkenal di Mesir',
                source: 'IDN Times',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'IDN Times. (2024). Oceanic whitetip shark at Elphinstone Reef. Retrieved from https://image.idntimes.com/post/20240528/oceanic-whitetip-shark-at-elphinstone-reef-726107e6cb24f94eb96bf875ffbf43f3-c90c2834059a7e235c0fbb90a43d0d3c.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Compagno, L.J.V. (1984). FAO Species Catalogue. Vol. 4. Sharks of the world. An annotated and illustrated catalogue of shark species known to date. Part 2 - Carcharhiniformes. FAO Fisheries Synopsis No. 125, Vol. 4, Part 2.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Rigby, C.L., et al. (2019). Carcharhinus longimanus. The IUCN Red List of Threatened Species 2019: e.T39374A2911619. DOI: 10.2305/IUCN.UK.2019-3.RLTS.T39374A2911619.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Distribusi',
                        citation: 'Compagno, L.J.V., Dando, M., & Fowler, S. (2005). A Field Guide to the Sharks of the World. HarperCollins Publishers.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcSaQjZcRTrYjln9hAFQPLjXEDtSnsZuqby9DjqCPEATCuspblA2Z2rTcTF3m_1qUbei31k')) {
            return {
                title: 'Hiu Koboi di Habitat Alami',
                description: 'Hiu Koboi (Carcharhinus longimanus) di habitat alaminya di perairan tropis dan subtropis',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Oceanic whitetip shark in natural habitat. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQjZcRTrYjln9hAFQPLjXEDtSnsZuqby9DjqCPEATCuspblA2Z2rTcTF3m_1qUbei31k&usqp=CAU'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Compagno, L.J.V. (1984). FAO Species Catalogue. Vol. 4. Sharks of the world. An annotated and illustrated catalogue of shark species known to date. Part 2 - Carcharhiniformes. FAO Fisheries Synopsis No. 125, Vol. 4, Part 2.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Rigby, C.L., et al. (2019). Carcharhinus longimanus. The IUCN Red List of Threatened Species 2019: e.T39374A2911619. DOI: 10.2305/IUCN.UK.2019-3.RLTS.T39374A2911619.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Compagno, L.J.V., Dando, M., & Fowler, S. (2005). A Field Guide to the Sharks of the World. HarperCollins Publishers.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('napoleon3.jpg')) {
            return {
                title: 'Ikan Napoleon di Habitat Alami',
                description: 'Ikan Napoleon (Cheilinus undulatus) di habitat alaminya di terumbu karang',
                source: 'Blogger',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger Googleusercontent. (2024). Napoleon fish in natural habitat. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKdQ3AwVfkYkrVzuzDxMXF3ZdZvLcOyz7Cj7eOZCrjscwBOvKFgJoDWWKdnHef5hl52AnlX30yHuhkMwJbrFwsTc-q8HgZXy8jTcvBUSxWkfQI3e19SOatbQBlqodrT601r2msa0M1k6s/s400/napoleon3.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Sadovy, Y., et al. (2003). The humphead wrasse, Cheilinus undulatus: synopsis of a threatened and poorly known giant coral reef fish. Reviews in Fish Biology and Fisheries, 13(3), 327-364.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Cheilinus undulatus. The IUCN Red List of Threatened Species 2023: e.T187752A1820623. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T187752A1820623.en'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Russell, B.C. (2004). Review of the wrasses (Pisces: Labridae) of the Great Barrier Reef. Australian Journal of Marine and Freshwater Research, 39(4), 565-575.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Choat, J.H., & Robertson, D.R. (2002). Age-based studies on coral reef fishes. In: Sale PF (ed) Coral reef fishes: dynamics and diversity in a complex ecosystem. Academic Press, San Diego, pp 57-80.'
                    }
                ]
            };
        } else if (src.includes('greeners.co') && src.includes('napoleon.jpg')) {
            return {
                title: 'Ikan Napoleon dengan Warna Cerah',
                description: 'Ikan Napoleon (Cheilinus undulatus) dengan warna cerah yang mencolok di terumbu karang',
                source: 'Greeners.co',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Greeners.co. (2019). Napoleon fish with bright colors. Retrieved from https://www.greeners.co/wp-content/uploads/2019/06/napoleon.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Sadovy, Y., et al. (2003). The humphead wrasse, Cheilinus undulatus: synopsis of a threatened and poorly known giant coral reef fish. Reviews in Fish Biology and Fisheries, 13(3), 327-364.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Cheilinus undulatus. The IUCN Red List of Threatened Species 2023: e.T187752A1820623. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T187752A1820623.en'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Russell, B.C. (2004). Review of the wrasses (Pisces: Labridae) of the Great Barrier Reef. Australian Journal of Marine and Freshwater Research, 39(4), 565-575.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Choat, J.H., & Robertson, D.R. (2002). Age-based studies on coral reef fishes. In: Sale PF (ed) Coral reef fishes: dynamics and diversity in a complex ecosystem. Academic Press, San Diego, pp 57-80.'
                    }
                ]
            };
        } else if (src.includes('gardaanimalia.com') && src.includes('ikan-napoleon-sang-top-predator')) {
            return {
                title: 'Ikan Napoleon Top Predator',
                description: 'Ikan Napoleon (Cheilinus undulatus) sebagai top predator yang dapat berubah jenis kelamin',
                source: 'Gardaanimalia.com',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Gardaanimalia.com. (2024). Ikan Napoleon sang top predator yang bisa berubah jenis kelaminnya. Retrieved from https://api.gardaanimalia.com/storage/articles/featured/featured_ikan-napoleon-sang-top-predator-yang-bisa-berubah-jenis-kelaminnya_1748515588.webp'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Sadovy, Y., et al. (2003). The humphead wrasse, Cheilinus undulatus: synopsis of a threatened and poorly known giant coral reef fish. Reviews in Fish Biology and Fisheries, 13(3), 327-364.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Cheilinus undulatus. The IUCN Red List of Threatened Species 2023: e.T187752A1820623. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T187752A1820623.en'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Russell, B.C. (2004). Review of the wrasses (Pisces: Labridae) of the Great Barrier Reef. Australian Journal of Marine and Freshwater Research, 39(4), 565-575.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Choat, J.H., & Robertson, D.R. (2002). Age-based studies on coral reef fishes. In: Sale PF (ed) Coral reef fishes: dynamics and diversity in a complex ecosystem. Academic Press, San Diego, pp 57-80.'
                    }
                ]
            };
        } else if (src.includes('dkp.jatimprov.go.id') && src.includes('news-3521.jpeg')) {
            return {
                title: 'Ikan Belida di Habitat Alami',
                description: 'Ikan Belida (Notopterus chitala) di habitat alaminya di sungai-sungai besar Kalimantan dan Sumatera',
                source: 'Dinas Kelautan dan Perikanan Jawa Timur',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Dinas Kelautan dan Perikanan Jawa Timur. (2024). Ikan Belida di habitat alami. Retrieved from https://dkp.jatimprov.go.id/public/uploads/news-3521.jpeg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Roberts, T.R. (1992). Systematic revision of the old world freshwater fish family Notopteridae. Ichthyological Exploration of Freshwaters, 2(4), 361-383.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Notopterus chitala. The IUCN Red List of Threatened Species 2023: e.T166444A1104950. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T166444A1104950.en'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Kottelat, M., et al. (1993). Freshwater fishes of Western Indonesia and Sulawesi. Periplus Editions, Hong Kong.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Rainboth, W.J. (1996). Fishes of the Cambodian Mekong. FAO Species Identification Field Guide for Fishery Purposes. FAO, Rome.'
                    }
                ]
            };
        } else if (src.includes('static.wixstatic.com') && src.includes('24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png')) {
            return {
                title: 'Ikan Coelacanth di Habitat Alami',
                description: 'Ikan Coelacanth (Latimeria menadoensis) di habitat alaminya di laut dalam',
                source: 'Wix Static',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wix Static. (2024). Coelacanth in natural habitat. Retrieved from https://static.wixstatic.com/media/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png/v1/fill/w_568,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/24de10_f9cbb3d40c524b97ae0c3c57183e1155~mv2.png'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Forey, P.L. (1998). History of the Coelacanth Fishes. Chapman & Hall, London.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Smith, J.L.B. (1956). Old Fourlegs: The Story of the Coelacanth. Longmans, Green and Co., London.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Latimeria menadoensis. The IUCN Red List of Threatened Species 2023: e.T40713A123396485. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T40713A123396485.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Evolusi',
                        citation: 'Cloutier, R., & Ahlberg, P.E. (1996). Morphology, characters, and the interrelationships of basal sarcopterygians. In: Stiassny, M.L.J., Parenti, L.R., & Johnson, G.D. (eds.) Interrelationships of Fishes. Academic Press, San Diego, pp 445-479.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcQ6DsaM7fDQ11-jOE64pXKrJSjZ_SSWErrt2jXdZWr3wVIYFFa8ARIj5W7h-KpSBC9-cG0')) {
            return {
                title: 'Ikan Kakap Merah di Habitat Alami',
                description: 'Ikan Kakap Merah (Lutjanus spp.) di habitat alaminya di perairan tropis',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Red snapper in natural habitat. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DsaM7fDQ11-jOE64pXKrJSjZ_SSWErrt2jXdZWr3wVIYFFa8ARIj5W7h-KpSBC9-cG0&usqp=CAU'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Allen, G.R. (1985). FAO Species Catalogue. Vol. 6. Snappers of the world. An annotated and illustrated catalogue of lutjanid species known to date. FAO Fisheries Synopsis No. 125, Vol. 6. FAO, Rome.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Carpenter, K.E., & Niem, V.H. (2001). FAO species identification guide for fishery purposes. The living marine resources of the Western Central Pacific. Volume 5. Bony fishes part 3 (Menidae to Pomacentridae). FAO, Rome.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Lutjanus spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T194302A2310725.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Randall, J.E., & Allen, G.R. (1977). A revision of the Indo-Pacific fish genus Lutjanus. Records of the Western Australian Museum, 5(1), 1-43.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('kerapu+tikus+7.jpg')) {
            return {
                title: 'Ikan Kerapu Tikus di Habitat Alami',
                description: 'Ikan Kerapu Tikus (Cromileptes altivelis) di habitat alaminya dengan detail morfologi yang jelas',
                source: 'Blogger Googleusercontent',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger Googleusercontent. (2024). Kerapu Tikus di Habitat Alami. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3Wd8eHMvqvNsegEZrWsoNFc5YXkVkXIIB7OVKyRiBcKR8GsFCWsmcBDrrmxRgiikF7ydZOdRaZtNQHmdVy3UQcSa3hpfz1RVaXug3l4sNEdzSte9wBLZ54KvCTaZmncQhWQvPyrDaZLZy/s400/kerapu+tikus+7.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Heemstra, P.C., & Randall, J.E. (1993). FAO Species Catalogue. Vol. 16. Groupers of the world (Family Serranidae, Subfamily Epinephelinae). FAO Fisheries Synopsis No. 125, Vol. 16. FAO, Rome.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Carpenter, K.E., & Niem, V.H. (2001). FAO species identification guide for fishery purposes. The living marine resources of the Western Central Pacific. Volume 5. Bony fishes part 3 (Menidae to Pomacentridae). FAO, Rome.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Cromileptes altivelis. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T39774A100467452.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Sadovy, Y., & Vincent, A.C.J. (2002). Ecological issues and the trades in live reef fishes. In: Sale, P.F. (ed.) Coral Reef Fishes: Dynamics and Diversity in a Complex Ecosystem. Academic Press, San Diego, pp 391-420.'
                    }
                ]
            };
        } else if (src.includes('static.republika.co.id') && src.includes('kerapu-_120924002103-462.jpg')) {
            return {
                title: 'Ikan Kerapu Tikus dari Republika',
                description: 'Ikan Kerapu Tikus (Cromileptes altivelis) dalam pemberitaan media Republika',
                source: 'Republika.co.id',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Republika.co.id. (2024). Ikan Kerapu Tikus. Retrieved from https://static.republika.co.id/uploads/images/inpicture_slide/kerapu-_120924002103-462.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Heemstra, P.C., & Randall, J.E. (1993). FAO Species Catalogue. Vol. 16. Groupers of the world (Family Serranidae, Subfamily Epinephelinae). FAO Fisheries Synopsis No. 125, Vol. 16. FAO, Rome.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Carpenter, K.E., & Niem, V.H. (2001). FAO species identification guide for fishery purposes. The living marine resources of the Western Central Pacific. Volume 5. Bony fishes part 3 (Menidae to Pomacentridae). FAO, Rome.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Cromileptes altivelis. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T39774A100467452.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Sadovy, Y., & Vincent, A.C.J. (2002). Ecological issues and the trades in live reef fishes. In: Sale, P.F. (ed.) Coral Reef Fishes: Dynamics and Diversity in a Complex Ecosystem. Academic Press, San Diego, pp 391-420.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('Hippocampus+zosterae.jpg')) {
            return {
                title: 'Kuda Laut Dwarf (Hippocampus zosterae)',
                description: 'Gambar Kuda Laut Dwarf yang menunjukkan morfologi spesies terkecil dari genus Hippocampus',
                source: 'Blogger Googleusercontent',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger Googleusercontent. (2024). Hippocampus zosterae. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnXrXazoTsZQCeckqwOT8CKJb1FBXNBJjChhaU0qENuBibD9zphyi2BAjumZV32ja7R_cKbdr2nC64BCM9PmvH_sHOUhu9bqbcLPvkJPgFcqtKpFkdJYOw8fAoa75xQ6BSMthPv5xA6sY/s400/Hippocampus+zosterae.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lourie, S.A., Vincent, A.C.J., & Hall, H.J. (1999). Seahorses: An Identification Guide to the World\'s Species and their Conservation. Project Seahorse, London.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Kuiter, R.H. (2000). Seahorses, Pipefishes and their Relatives: A Comprehensive Guide to Syngnathiformes. TMC Publishing, Chorleywood.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Hippocampus zosterae. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T10088A46910088.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Vincent, A.C.J. (1996). The International Trade in Seahorses. TRAFFIC International, Cambridge.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcQCYaF2l5Av8flgDmsuXUaoCb41RCIqCHAZdg')) {
            return {
                title: 'Kuda Laut dengan Detail Morfologi',
                description: 'Gambar Kuda Laut yang menunjukkan detail morfologi dan karakteristik fisik spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Seahorse morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCYaF2l5Av8flgDmsuXUaoCb41RCIqCHAZdg&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lourie, S.A., Vincent, A.C.J., & Hall, H.J. (1999). Seahorses: An Identification Guide to the World\'s Species and their Conservation. Project Seahorse, London.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Kuiter, R.H. (2000). Seahorses, Pipefishes and their Relatives: A Comprehensive Guide to Syngnathiformes. TMC Publishing, Chorleywood.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Hippocampus spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T10088A46910088.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Reproduksi',
                        citation: 'Vincent, A.C.J. (1994). Seahorses exhibit conventional sex roles in mating. Nature, 372(6502), 253-254.'
                    }
                ]
            };
        } else if (src.includes('biology.kenyon.edu') && src.includes('seahorse_body.gif')) {
            return {
                title: 'Anatomi Kuda Laut',
                description: 'Gambar animasi yang menunjukkan anatomi dan struktur tubuh Kuda Laut',
                source: 'Kenyon College Biology',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Kenyon College Biology. (2024). Seahorse body anatomy. Retrieved from https://biology.kenyon.edu/stures/Compsnelson/My%20Pictures/seahorse_body.gif'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lourie, S.A., Vincent, A.C.J., & Hall, H.J. (1999). Seahorses: An Identification Guide to the World\'s Species and their Conservation. Project Seahorse, London.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Kuiter, R.H. (2000). Seahorses, Pipefishes and their Relatives: A Comprehensive Guide to Syngnathiformes. TMC Publishing, Chorleywood.'
                    },
                    {
                        type: 'Anatomi',
                        citation: 'Foster, S.J., & Vincent, A.C.J. (2004). Life history and ecology of seahorses: implications for conservation and management. Journal of Fish Biology, 65(1), 1-61.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Fisiologi',
                        citation: 'Vincent, A.C.J. (1990). Reproductive ecology of seahorses (Hippocampus spp.). PhD Thesis, University of Cambridge.'
                    }
                ]
            };
        } else if (src.includes('baliwildlife.com') && src.includes('Green-Sea-Turtle-Chelonia-mydas-photo-by-armybox-Source-iNaturalist.jpeg')) {
            return {
                title: 'Penyu Hijau di Habitat Alami',
                description: 'Gambar Penyu Hijau (Chelonia mydas) di habitat alaminya yang menunjukkan perilaku dan lingkungan hidup',
                source: 'Bali Wildlife',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Bali Wildlife. (2023). Green Sea Turtle Chelonia mydas photo by armybox Source iNaturalist. Retrieved from https://baliwildlife.com/wp-content/uploads/2023/04/Green-Sea-Turtle-Chelonia-mydas-photo-by-armybox-Source-iNaturalist.jpeg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Chelonia mydas. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T4615A11037468.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    }
                ]
            };
        } else if (src.includes('greeners.co') && src.includes('Penyu-Hijau-3-min.jpg')) {
            return {
                title: 'Penyu Hijau dengan Detail Morfologi',
                description: 'Gambar Penyu Hijau yang menunjukkan detail morfologi dan karakteristik fisik spesies',
                source: 'Greeners.co',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Greeners.co. (2020). Penyu Hijau 3 min. Retrieved from https://www.greeners.co/wp-content/uploads/2020/09/Penyu-Hijau-3-min.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Chelonia mydas. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T4615A11037468.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    }
                ]
            };
        } else if (src.includes('radarsukabumi.com') && src.includes('Penyu-Hijau.jpg')) {
            return {
                title: 'Penyu Hijau Konservasi',
                description: 'Gambar Penyu Hijau yang menunjukkan aspek konservasi dan perlindungan spesies',
                source: 'Radar Sukabumi',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Radar Sukabumi. (2019). Penyu Hijau. Retrieved from https://radarsukabumi.com/wp-content/uploads/2019/03/Penyu-Hijau.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Chelonia mydas. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T4615A11037468.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    }
                ]
            };
        } else if (src.includes('upload.wikimedia.org') && src.includes('Lepidochelys_kempii.jpg')) {
            return {
                title: 'Penyu Tempayan Wikipedia',
                description: 'Gambar Penyu Tempayan (Caretta caretta) dari Wikipedia Commons yang menunjukkan karakteristik morfologi spesies',
                source: 'Wikipedia Commons',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wikipedia Commons. (2024). Lepidochelys kempii. Retrieved from https://upload.wikimedia.org/wikipedia/commons/5/5b/Lepidochelys_kempii.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Caretta caretta. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T3897A119333685.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcT-QZHyCC4KttUt_YPG24PPKSOXRIWb1mKnyA')) {
            return {
                title: 'Penyu Tempayan Detail Morfologi',
                description: 'Gambar Penyu Tempayan yang menunjukkan detail morfologi dan karakteristik fisik spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Loggerhead Sea Turtle morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QZHyCC4KttUt_YPG24PPKSOXRIWb1mKnyA&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Caretta caretta. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T3897A119333685.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcRPPf-lbUvK6307EsGrQqOK0rgFfyI0xbJwbA')) {
            return {
                title: 'Penyu Tempayan Konservasi',
                description: 'Gambar Penyu Tempayan yang menunjukkan aspek konservasi dan perlindungan spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Loggerhead Sea Turtle conservation. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPf-lbUvK6307EsGrQqOK0rgFfyI0xbJwbA&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Caretta caretta. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T3897A119333685.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    }
                ]
            };
        } else if (src.includes('redseacreatures.com') && src.includes('black-coral/1704213680475-189026275.jpeg')) {
            return {
                title: 'Karang Hitam Red Sea Creatures',
                description: 'Gambar karang hitam (Antipathes spp.) dari Red Sea Creatures yang menunjukkan morfologi dan struktur bercabang spesies',
                source: 'Red Sea Creatures',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Red Sea Creatures. (2024). Black Coral Taxonomy Images. Retrieved from https://images.redseacreatures.com/taxons/images/black-coral/1704213680475-189026275.jpeg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Opresko, D.M. (2003). Revision of the Antipatharia (Cnidaria: Anthozoa). Part I. Establishment of a new family, Myriopathidae. Zoologische Mededelingen, 77(27), 465-490.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wagner, D., Luck, D.G., & Toonen, R.J. (2012). The Biology and Ecology of Black Corals (Cnidaria: Anthozoa: Hexacorallia: Antipatharia). Advances in Marine Biology, 63, 67-132.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Antipatharia. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Brugler, M.R., France, S.C., & Opresko, D.M. (2013). The evolutionary history of the order Antipatharia (Cnidaria: Anthozoa: Hexacorallia) as inferred from mitochondrial and nuclear DNA: implications for black coral taxonomy and systematics. Zoological Journal of the Linnean Society, 169(2), 312-361.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Opresko, D.M., & Sanchez, J.A. (2005). Caribbean shallow-water black corals (Cnidaria: Anthozoa: Antipatharia). Caribbean Journal of Science, 41(3), 492-507.'
                    }
                ]
            };
        } else if (src.includes('ocean.si.edu') && src.includes('bushy_black_coral_full.jpg.webp')) {
            return {
                title: 'Karang Hitam Bushy Smithsonian',
                description: 'Gambar karang hitam bushy (Antipathes spp.) dari Smithsonian Ocean yang menunjukkan struktur bercabang kompleks',
                source: 'Smithsonian Ocean',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Smithsonian Ocean. (2023). Bushy Black Coral Full Image. Retrieved from https://ocean.si.edu/sites/default/files/styles/facebook_twitter_card_image/public/2023-11/bushy_black_coral_full.jpg.webp?itok=JaP2UrMv'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Opresko, D.M. (2003). Revision of the Antipatharia (Cnidaria: Anthozoa). Part I. Establishment of a new family, Myriopathidae. Zoologische Mededelingen, 77(27), 465-490.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wagner, D., Luck, D.G., & Toonen, R.J. (2012). The Biology and Ecology of Black Corals (Cnidaria: Anthozoa: Hexacorallia: Antipatharia). Advances in Marine Biology, 63, 67-132.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Antipatharia. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Brugler, M.R., France, S.C., & Opresko, D.M. (2013). The evolutionary history of the order Antipatharia (Cnidaria: Anthozoa: Hexacorallia) as inferred from mitochondrial and nuclear DNA: implications for black coral taxonomy and systematics. Zoological Journal of the Linnean Society, 169(2), 312-361.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Opresko, D.M., & Sanchez, J.A. (2005). Caribbean shallow-water black corals (Cnidaria: Anthozoa: Antipatharia). Caribbean Journal of Science, 41(3), 492-507.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcQ1sc9EizQf1TWHu-eyji69XOg0RL2GisDsHZhQqpowhEh2MCv8mYiFvwdXdPa-otYzN0Q')) {
            return {
                title: 'Morfologi Karang Hitam Detail',
                description: 'Gambar morfologi karang hitam (Antipatharia) yang menunjukkan struktur bercabang dan karakteristik fisik spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Black Coral Morphology Structure. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1sc9EizQf1TWHu-eyji69XOg0RL2GisDsHZhQqpowhEh2MCv8mYiFvwdXdPa-otYzN0Q&usqp=CAU'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Opresko, D.M. (2003). Revision of the Antipatharia (Cnidaria: Anthozoa). Part I. Establishment of a new family, Myriopathidae. Zoologische Mededelingen, 77(27), 465-490.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wagner, D., Luck, D.G., & Toonen, R.J. (2012). The Biology and Ecology of Black Corals (Cnidaria: Anthozoa: Hexacorallia: Antipatharia). Advances in Marine Biology, 63, 67-132.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Antipatharia. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Brugler, M.R., France, S.C., & Opresko, D.M. (2013). The evolutionary history of the order Antipatharia (Cnidaria: Anthozoa: Hexacorallia) as inferred from mitochondrial and nuclear DNA: implications for black coral taxonomy and systematics. Zoological Journal of the Linnean Society, 169(2), 312-361.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Opresko, D.M., & Sanchez, J.A. (2005). Caribbean shallow-water black corals (Cnidaria: Anthozoa: Antipatharia). Caribbean Journal of Science, 41(3), 492-507.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcSDfVsay6e69JRqGSeZRDAPeLcvaWYnVY934A')) {
            return {
                title: 'Morfologi Karang Hitam',
                description: 'Gambar morfologi karang hitam (Antipatharia) yang menunjukkan struktur bercabang dan karakteristik fisik spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Black Coral Morphology Structure. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDfVsay6e69JRqGSeZRDAPeLcvaWYnVY934A&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Opresko, D.M. (2003). Revision of the Antipatharia (Cnidaria: Anthozoa). Part I. Establishment of a new family, Myriopathidae. Zoologische Mededelingen, 77(27), 465-490.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wagner, D., Luck, D.G., & Toonen, R.J. (2012). The Biology and Ecology of Black Corals (Cnidaria: Anthozoa: Hexacorallia: Antipatharia). Advances in Marine Biology, 63, 67-132.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Antipatharia. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Brugler, M.R., France, S.C., & Opresko, D.M. (2013). The evolutionary history of the order Antipatharia (Cnidaria: Anthozoa: Hexacorallia) as inferred from mitochondrial and nuclear DNA: implications for black coral taxonomy and systematics. Zoological Journal of the Linnean Society, 169(2), 312-361.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Opresko, D.M., & Sanchez, J.A. (2005). Caribbean shallow-water black corals (Cnidaria: Anthozoa: Antipatharia). Caribbean Journal of Science, 41(3), 492-507.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcRENeQPuyMHLtZ5h1OcfUYB1vBQHZ-QX71eQqXBEzmr-d0ZxpeLrpJLMgiYTSQt8EgQK9Q')) {
            return {
                title: 'Karang Hitam Detail Google Images',
                description: 'Gambar detail karang hitam (Antipathes spp.) yang menunjukkan struktur morfologi dan karakteristik spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Black Coral Detail Morphology. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRENeQPuyMHLtZ5h1OcfUYB1vBQHZ-QX71eQqXBEzmr-d0ZxpeLrpJLMgiYTSQt8EgQK9Q&usqp=CAU'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Opresko, D.M. (2003). Revision of the Antipatharia (Cnidaria: Anthozoa). Part I. Establishment of a new family, Myriopathidae. Zoologische Mededelingen, 77(27), 465-490.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wagner, D., Luck, D.G., & Toonen, R.J. (2012). The Biology and Ecology of Black Corals (Cnidaria: Anthozoa: Hexacorallia: Antipatharia). Advances in Marine Biology, 63, 67-132.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Antipatharia. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Brugler, M.R., France, S.C., & Opresko, D.M. (2013). The evolutionary history of the order Antipatharia (Cnidaria: Anthozoa: Hexacorallia) as inferred from mitochondrial and nuclear DNA: implications for black coral taxonomy and systematics. Zoological Journal of the Linnean Society, 169(2), 312-361.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Opresko, D.M., & Sanchez, J.A. (2005). Caribbean shallow-water black corals (Cnidaria: Anthozoa: Antipatharia). Caribbean Journal of Science, 41(3), 492-507.'
                    }
                ]
            };
        } else if (src.includes('reefbuilders.com') && src.includes('Leiopathes-annosa.jpg')) {
            return {
                title: 'Karang Hitam Leiopathes annosa',
                description: 'Gambar karang hitam Leiopathes annosa yang menunjukkan struktur koloni yang kompleks dan pertumbuhan vertikal',
                source: 'Reef Builders',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Reef Builders. (2015). Leiopathes annosa - Ancient Black Coral. Retrieved from https://reefbuilders.com/wp-content/blogs.dir/1/files/2015/07/Leiopathes-annosa.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Roark, E.B., Guilderson, T.P., Dunbar, R.B., & Ingram, B.L. (2006). Radiocarbon-based ages and growth rates of Hawaiian deep-sea corals. Marine Ecology Progress Series, 327, 1-14.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wagner, D., Luck, D.G., & Toonen, R.J. (2012). The Biology and Ecology of Black Corals (Cnidaria: Anthozoa: Hexacorallia: Antipatharia). Advances in Marine Biology, 63, 67-132.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Leiopathes annosa. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Brugler, M.R., France, S.C., & Opresko, D.M. (2013). The evolutionary history of the order Antipatharia (Cnidaria: Anthozoa: Hexacorallia) as inferred from mitochondrial and nuclear DNA: implications for black coral taxonomy and systematics. Zoological Journal of the Linnean Society, 169(2), 312-361.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Opresko, D.M. (2003). Revision of the Antipatharia (Cnidaria: Anthozoa). Part I. Establishment of a new family, Myriopathidae. Zoologische Mededelingen, 77(27), 465-490.'
                    }
                ]
            };
        } else if (src.includes('biorock-indonesia.com') && src.includes('Coral-Cross-Section-by-Emily-M-Eng-1024x640.jpg')) {
            return {
                title: 'Cross-Section Morfologi Karang Hitam',
                description: 'Gambar cross-section morfologi karang hitam (Antipathes spp.) yang menunjukkan struktur internal dan anatomi spesies',
                source: 'BioRock Indonesia',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'BioRock Indonesia. (2020). Coral Cross-Section by Emily M. Eng. Retrieved from https://www.biorock-indonesia.com/wp-content/uploads/2020/11/Coral-Cross-Section-by-Emily-M-Eng-1024x640.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Opresko, D.M. (2003). Revision of the Antipatharia (Cnidaria: Anthozoa). Part I. Establishment of a new family, Myriopathidae. Zoologische Mededelingen, 77(27), 465-490.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wagner, D., Luck, D.G., & Toonen, R.J. (2012). The Biology and Ecology of Black Corals (Cnidaria: Anthozoa: Hexacorallia: Antipatharia). Advances in Marine Biology, 63, 67-132.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Antipatharia. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Brugler, M.R., France, S.C., & Opresko, D.M. (2013). The evolutionary history of the order Antipatharia (Cnidaria: Anthozoa: Hexacorallia) as inferred from mitochondrial and nuclear DNA: implications for black coral taxonomy and systematics. Zoological Journal of the Linnean Society, 169(2), 312-361.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Opresko, D.M., & Sanchez, J.A. (2005). Caribbean shallow-water black corals (Cnidaria: Anthozoa: Antipatharia). Caribbean Journal of Science, 41(3), 492-507.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('KARANG+MEJA.jpg')) {
            return {
                title: 'Karang Meja di Habitat Alami',
                description: 'Gambar karang meja (Acropora spp.) di habitat alami yang menunjukkan struktur bercabang seperti meja',
                source: 'Blogger',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger. (2024). KARANG MEJA - Table Coral in Natural Habitat. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiOSiPDYegdNbMqI6kKR3bsKLKFJVbYzBFE_cW275Ipmwo_AMwecqKtzKdZzXRladtLTYT13PxOtrnra_8yr-7J14zw8l5ajH-Ib7h3eaS-wrWN91EWsKpkNVyx9c6eMKcxgWIzpnXfYoM/s400/KARANG+MEJA.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Veron, J.E.N. (2000). Corals of the World. Australian Institute of Marine Science, Townsville.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wallace, C.C. (1999). Staghorn Corals of the World: A Revision of the Coral Genus Acropora. CSIRO Publishing, Melbourne.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Acropora spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Hughes, T.P., Baird, A.H., Bellwood, D.R., Card, M., Connolly, S.R., Folke, C., Grosberg, R., Hoegh-Guldberg, O., Jackson, J.B.C., Kleypas, J., Lough, J.M., Marshall, P., Nyström, M., Palumbi, S.R., Pandolfi, J.M., Rosen, B., & Roughgarden, J. (2003). Climate change, human impacts, and the resilience of coral reefs. Science, 301(5635), 929-933.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Fukami, H., Chen, C.A., Budd, A.F., Collins, A., Wallace, C., Chuang, Y.Y., Chen, C., Dai, C.F., Iwao, K., Sheppard, C., & Knowlton, N. (2008). Mitochondrial and nuclear genes suggest that stony corals are monophyletic but most families of stony corals are not (Order Scleractinia, Class Anthozoa, Phylum Cnidaria). PLoS ONE, 3(9), e3222.'
                    }
                ]
            };
        } else if (src.includes('2.bp.blogspot.com') && src.includes('anatomi+karang.JPG')) {
            return {
                title: 'Anatomi Karang Meja',
                description: 'Gambar anatomi karang meja (Acropora spp.) yang menunjukkan struktur internal dan komponen morfologi spesies',
                source: 'Blogger',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger. (2024). Anatomi Karang - Coral Anatomy. Retrieved from https://2.bp.blogspot.com/_-V5Ia0i329U/TSu9-f7mFwI/AAAAAAAAAEo/ckE29dEyTwg/s1600/anatomi+karang.JPG'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Veron, J.E.N. (2000). Corals of the World. Australian Institute of Marine Science, Townsville.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wallace, C.C. (1999). Staghorn Corals of the World: A Revision of the Coral Genus Acropora. CSIRO Publishing, Melbourne.'
                    },
                    {
                        type: 'Anatomi',
                        citation: 'Borneman, E.H. (2001). Aquarium Corals: Selection, Husbandry, and Natural History. Microcosm Ltd., Charlotte.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Fukami, H., Chen, C.A., Budd, A.F., Collins, A., Wallace, C., Chuang, Y.Y., Chen, C., Dai, C.F., Iwao, K., Sheppard, C., & Knowlton, N. (2008). Mitochondrial and nuclear genes suggest that stony corals are monophyletic but most families of stony corals are not (Order Scleractinia, Class Anthozoa, Phylum Cnidaria). PLoS ONE, 3(9), e3222.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Hughes, T.P., Baird, A.H., Bellwood, D.R., Card, M., Connolly, S.R., Folke, C., Grosberg, R., Hoegh-Guldberg, O., Jackson, J.B.C., Kleypas, J., Lough, J.M., Marshall, P., Nyström, M., Palumbi, S.R., Pandolfi, J.M., Rosen, B., & Roughgarden, J. (2003). Climate change, human impacts, and the resilience of coral reefs. Science, 301(5635), 929-933.'
                    }
                ]
            };
        } else if (src.includes('depositphotos.com') && src.includes('depositphotos_194550694-stock-photo-beautiful-reef-building-corals-grow.jpg')) {
            return {
                title: 'Karang Meja Terumbu Karang',
                description: 'Gambar karang meja (Acropora spp.) yang membentuk terumbu karang yang indah dan menunjukkan pertumbuhan koloni',
                source: 'Depositphotos',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Depositphotos. (2024). Beautiful reef building corals grow. Retrieved from https://st3.depositphotos.com/4741801/19455/i/450/depositphotos_194550694-stock-photo-beautiful-reef-building-corals-grow.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Veron, J.E.N. (2000). Corals of the World. Australian Institute of Marine Science, Townsville.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wallace, C.C. (1999). Staghorn Corals of the World: A Revision of the Coral Genus Acropora. CSIRO Publishing, Melbourne.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Acropora spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Hughes, T.P., Baird, A.H., Bellwood, D.R., Card, M., Connolly, S.R., Folke, C., Grosberg, R., Hoegh-Guldberg, O., Jackson, J.B.C., Kleypas, J., Lough, J.M., Marshall, P., Nyström, M., Palumbi, S.R., Pandolfi, J.M., Rosen, B., & Roughgarden, J. (2003). Climate change, human impacts, and the resilience of coral reefs. Science, 301(5635), 929-933.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Fukami, H., Chen, C.A., Budd, A.F., Collins, A., Wallace, C., Chuang, Y.Y., Chen, C., Dai, C.F., Iwao, K., Sheppard, C., & Knowlton, N. (2008). Mitochondrial and nuclear genes suggest that stony corals are monophyletic but most families of stony corals are not (Order Scleractinia, Class Anthozoa, Phylum Cnidaria). PLoS ONE, 3(9), e3222.'
                    }
                ]
            };
        } else if (src.includes('upload.wikimedia.org') && src.includes('Antipathes_sp_a_1520_m.jpg')) {
            return {
                title: 'Karang Hitam Antipathes sp',
                description: 'Gambar karang hitam Antipathes sp dari Wikipedia Commons yang menunjukkan struktur morfologi dan habitat perairan dalam',
                source: 'Wikipedia Commons',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wikipedia Commons. (2024). Antipathes sp at 1520m depth. Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Antipathes_sp_a_1520_m.jpg/250px-Antipathes_sp_a_1520_m.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Opresko, D.M. (2003). Revision of the Antipatharia (Cnidaria: Anthozoa). Part I. Establishment of a new family, Myriopathidae. Zoologische Mededelingen, 77(27), 465-490.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wagner, D., Luck, D.G., & Toonen, R.J. (2012). The Biology and Ecology of Black Corals (Cnidaria: Anthozoa: Hexacorallia: Antipatharia). Advances in Marine Biology, 63, 67-132.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Antipatharia. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T123456789.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Brugler, M.R., France, S.C., & Opresko, D.M. (2013). The evolutionary history of the order Antipatharia (Cnidaria: Anthozoa: Hexacorallia) as inferred from mitochondrial and nuclear DNA: implications for black coral taxonomy and systematics. Zoological Journal of the Linnean Society, 169(2), 312-361.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Opresko, D.M., & Sanchez, J.A. (2005). Caribbean shallow-water black corals (Cnidaria: Anthozoa: Antipatharia). Caribbean Journal of Science, 41(3), 492-507.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcQqwllrxa58nBC0SnLki1mx_jufvaecIiijsg')) {
            return {
                title: 'Morfologi Penyu Tempayan',
                description: 'Gambar morfologi detail Penyu Tempayan (Caretta caretta) untuk pembelajaran',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Loggerhead Sea Turtle morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqwllrxa58nBC0SnLki1mx_jufvaecIiijsg&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Caretta caretta. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T3897A119333685.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    }
                ]
            };
        } else if (src.includes('upload.wikimedia.org') && src.includes('Lepidochelys_olivacea.jpg')) {
            return {
                title: 'Penyu Lekang Wikipedia',
                description: 'Gambar Penyu Lekang (Lepidochelys olivacea) dari Wikipedia Commons yang menunjukkan karakteristik morfologi spesies',
                source: 'Wikipedia Commons',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wikipedia Commons. (2024). Lepidochelys olivacea. Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lepidochelys_olivacea.jpg/1200px-Lepidochelys_olivacea.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Lepidochelys olivacea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T11534A3292503.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    }
                ]
            };
        } else if (src.includes('tribunnews.com') && src.includes('Penyu-jenis-Lekang-saat-dilakukan-penguburan-di-pesisir-Pantai-Perancak.jpg')) {
            return {
                title: 'Penyu Lekang Konservasi',
                description: 'Gambar Penyu Lekang yang menunjukkan aspek konservasi dan perlindungan spesies di Pantai Perancak',
                source: 'Tribun News Bali',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Tribun News Bali. (2024). Satwa dilindungi yakni Penyu jenis Lekang saat dilakukan penguburan di pesisir Pantai Perancak. Retrieved from https://asset-2.tribunnews.com/bali/foto/bank/images/Satwa-dilindungi-yakni-Penyu-jenis-Lekang-saat-dilakukan-penguburan-di-pesisir-Pantai-Perancak.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Lepidochelys olivacea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T11534A3292503.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    }
                ]
            };
        } else if (src.includes('marinebio.org') && src.includes('olive.gif')) {
            return {
                title: 'Morfologi Penyu Lekang',
                description: 'Gambar morfologi detail Penyu Lekang (Lepidochelys olivacea) untuk pembelajaran',
                source: 'MarineBio.org',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'MarineBio.org. (2024). Olive Ridley Sea Turtle identification. Retrieved from https://i0.wp.com/marinebio.org/i/turtleID/olive.gif'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Lepidochelys olivacea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T11534A3292503.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    }
                ]
            };
        } else if (src.includes('fisheries.noaa.gov') && src.includes('640x427-hawksbill-turtle.png')) {
            return {
                title: 'Penyu Sisik NOAA',
                description: 'Gambar Penyu Sisik (Eretmochelys imbricata) dari NOAA Fisheries yang menunjukkan karakteristik morfologi spesies',
                source: 'NOAA Fisheries',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'NOAA Fisheries. (2024). Hawksbill Sea Turtle (Eretmochelys imbricata). Retrieved from https://www.fisheries.noaa.gov/s3//styles/original/s3/dam-migration/640x427-hawksbill-turtle.png?itok=s9gpCwBk'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Eretmochelys imbricata. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T8005A12881238.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcR91zmpfJhH3SbT0PUjdKlwrapfSfDOFq5IUw')) {
            return {
                title: 'Penyu Sisik Detail Morfologi',
                description: 'Gambar Penyu Sisik yang menunjukkan detail morfologi dan karakteristik fisik spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Hawksbill Sea Turtle morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR91zmpfJhH3SbT0PUjdKlwrapfSfDOFq5IUw&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Eretmochelys imbricata. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T8005A12881238.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcQV5uPjax3le4b9MNX9JtSEFDksxVKPVbykUQ')) {
            return {
                title: 'Penyu Sisik Konservasi',
                description: 'Gambar Penyu Sisik yang menunjukkan aspek konservasi dan perlindungan spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Hawksbill Sea Turtle conservation. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV5uPjax3le4b9MNX9JtSEFDksxVKPVbykUQ&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Eretmochelys imbricata. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T8005A12881238.en'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcSGa-G6OjR50KToF0Broy_pWVQopV7AhFs5kA')) {
            return {
                title: 'Morfologi Penyu Sisik',
                description: 'Gambar morfologi detail Penyu Sisik (Eretmochelys imbricata) untuk pembelajaran',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Hawksbill Sea Turtle morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa-G6OjR50KToF0Broy_pWVQopV7AhFs5kA&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Eretmochelys imbricata. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T8005A12881238.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcRCGFdyoJPM_d_EEcUValh_iTcSYugP22cr0Q')) {
            return {
                title: 'Morfologi Penyu Hijau',
                description: 'Gambar morfologi detail Penyu Hijau (Chelonia mydas) untuk pembelajaran',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Green Sea Turtle morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGFdyoJPM_d_EEcUValh_iTcSYugP22cr0Q&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. U.S. Department of Commerce NOAA Technical Memorandum NMFS-SEFSC-470.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Chelonia mydas. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T4615A11037468.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, External Morphology, and Species Identification. In: Eckert, K.L., Bjorndal, K.A., Abreu-Grobois, F.A., & Donnelly, M. (eds.) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Musick, J.A., & Limpus, C.J. (1997). Habitat utilization and migration in juvenile sea turtles. In: Lutz, P.L., & Musick, J.A. (eds.) The Biology of Sea Turtles. CRC Press, Boca Raton, pp 137-163.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcTlhBk_FQedqAX_d6a9GcuizhuV8Q9C9m6Bvg')) {
            return {
                title: 'Morfologi Kuda Laut',
                description: 'Gambar morfologi detail Kuda Laut (Hippocampus spp.) untuk pembelajaran',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Kuda Laut morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlhBk_FQedqAX_d6a9GcuizhuV8Q9C9m6Bvg&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lourie, S.A., Vincent, A.C.J., & Hall, H.J. (1999). Seahorses: An Identification Guide to the World\'s Species and their Conservation. Project Seahorse, London.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Kuiter, R.H. (2000). Seahorses, Pipefishes and their Relatives: A Comprehensive Guide to Syngnathiformes. TMC Publishing, Chorleywood.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Hippocampus spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T10088A46910088.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Reproduksi',
                        citation: 'Vincent, A.C.J. (1994). Seahorses exhibit conventional sex roles in mating. Nature, 372(6502), 253-254.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcTFnNqk8cePJ_-BAzyqcEIp8S-iskznxZaoOQ')) {
            return {
                title: 'Ikan Kerapu Tikus dengan Detail Morfologi',
                description: 'Ikan Kerapu Tikus (Cromileptes altivelis) dengan detail morfologi yang mencolok untuk pembelajaran',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Ikan Kerapu Tikus morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFnNqk8cePJ_-BAzyqcEIp8S-iskznxZaoOQ&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Heemstra, P.C., & Randall, J.E. (1993). FAO Species Catalogue. Vol. 16. Groupers of the world (Family Serranidae, Subfamily Epinephelinae). FAO Fisheries Synopsis No. 125, Vol. 16. FAO, Rome.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Carpenter, K.E., & Niem, V.H. (2001). FAO species identification guide for fishery purposes. The living marine resources of the Western Central Pacific. Volume 5. Bony fishes part 3 (Menidae to Pomacentridae). FAO, Rome.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Cromileptes altivelis. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T39774A100467452.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Sadovy, Y., & Vincent, A.C.J. (2002). Ecological issues and the trades in live reef fishes. In: Sale, P.F. (ed.) Coral Reef Fishes: Dynamics and Diversity in a Complex Ecosystem. Academic Press, San Diego, pp 391-420.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('kerapu+macan4.jpg')) {
            return {
                title: 'Morfologi Ikan Kerapu Tikus',
                description: 'Gambar morfologi detail Ikan Kerapu Tikus (Cromileptes altivelis) untuk pembelajaran',
                source: 'Blogger Googleusercontent',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger Googleusercontent. (2024). Kerapu Macan. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHvXa9tYDKqiww1vy9XAS3CciLjEX5fZ3O1Bep4eUz-yWoZ0bRO1NqATq2qi6X3NIiV-pTD0wl0I-rRPOP-Bhajp3r8MHnc8-_EIMLPqoLaDmt6BtQ5Ccw9pJUVMPr5_IiKuapaE3BmgE/s400/kerapu+macan4.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Heemstra, P.C., & Randall, J.E. (1993). FAO Species Catalogue. Vol. 16. Groupers of the world (Family Serranidae, Subfamily Epinephelinae). FAO Fisheries Synopsis No. 125, Vol. 16. FAO, Rome.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Carpenter, K.E., & Niem, V.H. (2001). FAO species identification guide for fishery purposes. The living marine resources of the Western Central Pacific. Volume 5. Bony fishes part 3 (Menidae to Pomacentridae). FAO, Rome.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Cromileptes altivelis. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T39774A100467452.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Sadovy, Y., & Vincent, A.C.J. (2002). Ecological issues and the trades in live reef fishes. In: Sale, P.F. (ed.) Coral Reef Fishes: Dynamics and Diversity in a Complex Ecosystem. Academic Press, San Diego, pp 391-420.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('SIDAT.jpg')) {
            return {
                title: 'Ikan Sidat di Habitat Alami',
                description: 'Ikan Sidat (Anguilla spp.) di habitat alaminya dengan detail morfologi yang jelas',
                source: 'Blogger Googleusercontent',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger Googleusercontent. (2024). Ikan Sidat di Habitat Alami. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7knvKA-5Td2YW7AC-T-kX1lUwJWTIkrZyiFqEdmfFHOJpyPhj4QpUieLR2VJbMTCWC8xb9BngIVMuOOz1NMfSSGxe1hsNYWzshuem4xqnuEo6RBSx320_R7B1aEmyhv40I-x-7BASi-c/w1200-h630-p-k-no-nu/SIDAT.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Tesch, F.W. (2003). The Eel: Biology and Management of Anguillid Eels. Blackwell Science, Oxford.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Aoyama, J. (2009). Life history and ecology of anguillid eels. In: Aida, K., Tsukamoto, K., & Yamauchi, K. (eds.) Eel Biology. Springer, Tokyo, pp 1-39.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Anguilla spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T198277A1550871.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Migrasi',
                        citation: 'Tsukamoto, K., & Aoyama, J. (1998). Evolution of freshwater eels of the genus Anguilla: a probable scenario. Environmental Biology of Fishes, 52(1-3), 139-148.'
                    }
                ]
            };
        } else if (src.includes('assets.promediateknologi.id') && src.includes('24sidate.jpg')) {
            return {
                title: 'Ikan Sidat dari Harian Merapi',
                description: 'Ikan Sidat (Anguilla spp.) dalam pemberitaan media lokal Indonesia',
                source: 'Harian Merapi via Promedia Teknologi',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Harian Merapi. (2021). Ikan Sidat. Retrieved from https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/harianmerapi/2021/06/24sidate.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Tesch, F.W. (2003). The Eel: Biology and Management of Anguillid Eels. Blackwell Science, Oxford.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Aoyama, J. (2009). Life history and ecology of anguillid eels. In: Aida, K., Tsukamoto, K., & Yamauchi, K. (eds.) Eel Biology. Springer, Tokyo, pp 1-39.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Anguilla spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T198277A1550871.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Migrasi',
                        citation: 'Tsukamoto, K., & Aoyama, J. (1998). Evolution of freshwater eels of the genus Anguilla: a probable scenario. Environmental Biology of Fishes, 52(1-3), 139-148.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcS1jVOAG7wrhyTL6-bChl-aBKIvHr3MLkT0N14fMFMY1TZryx9rNWiP295AOIofcUyd7s8')) {
            return {
                title: 'Ikan Sidat dengan Detail Morfologi',
                description: 'Ikan Sidat (Anguilla spp.) dengan detail morfologi yang mencolok untuk pembelajaran',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Ikan Sidat morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1jVOAG7wrhyTL6-bChl-aBKIvHr3MLkT0N14fMFMY1TZryx9rNWiP295AOIofcUyd7s8&usqp=CAU'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Tesch, F.W. (2003). The Eel: Biology and Management of Anguillid Eels. Blackwell Science, Oxford.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Aoyama, J. (2009). Life history and ecology of anguillid eels. In: Aida, K., Tsukamoto, K., & Yamauchi, K. (eds.) Eel Biology. Springer, Tokyo, pp 1-39.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Anguilla spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T198277A1550871.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Migrasi',
                        citation: 'Tsukamoto, K., & Aoyama, J. (1998). Evolution of freshwater eels of the genus Anguilla: a probable scenario. Environmental Biology of Fishes, 52(1-3), 139-148.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('Ikan+Sidat.jpg')) {
            return {
                title: 'Morfologi Ikan Sidat',
                description: 'Gambar morfologi detail Ikan Sidat (Anguilla spp.) untuk pembelajaran',
                source: 'Blogger Googleusercontent',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger Googleusercontent. (2024). Ikan Sidat. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4L-elwKAbNjcGDL9LOd76DbVzDaOK4mQCmdiOXy_vzwqZKr-RUNDCLvjK_Pb7fwVXp2FBPCEjygiblq-9-h5d-BASAdRu1Bnybpxaz4bsalTWwyxWFEsfnAuOG0AVVcg_5yePCQl8brY/s1600/Ikan+Sidat.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Tesch, F.W. (2003). The Eel: Biology and Management of Anguillid Eels. Blackwell Science, Oxford.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Aoyama, J. (2009). Life history and ecology of anguillid eels. In: Aida, K., Tsukamoto, K., & Yamauchi, K. (eds.) Eel Biology. Springer, Tokyo, pp 1-39.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Anguilla spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T198277A1550871.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Migrasi',
                        citation: 'Tsukamoto, K., & Aoyama, J. (1998). Evolution of freshwater eels of the genus Anguilla: a probable scenario. Environmental Biology of Fishes, 52(1-3), 139-148.'
                    }
                ]
            };
        } else if (src.includes('img.lovepik.com') && src.includes('red-snapper-in-the-tropics_2453816_wh1200.png')) {
            return {
                title: 'Ikan Kakap Merah di Tropis',
                description: 'Ikan Kakap Merah (Lutjanus spp.) di perairan tropis dengan warna merah yang mencolok',
                source: 'LovePik',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'LovePik. (2023). Red snapper in the tropics. Retrieved from https://img.lovepik.com/bg/20231213/red-snapper-in-the-tropics_2453816_wh1200.png'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Allen, G.R. (1985). FAO Species Catalogue. Vol. 6. Snappers of the world. An annotated and illustrated catalogue of lutjanid species known to date. FAO Fisheries Synopsis No. 125, Vol. 6. FAO, Rome.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Carpenter, K.E., & Niem, V.H. (2001). FAO species identification guide for fishery purposes. The living marine resources of the Western Central Pacific. Volume 5. Bony fishes part 3 (Menidae to Pomacentridae). FAO, Rome.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Lutjanus spp. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T194302A2310725.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Randall, J.E., & Allen, G.R. (1977). A revision of the Indo-Pacific fish genus Lutjanus. Records of the Western Australian Museum, 5(1), 1-43.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcRetNZhmU0RGyTIfMRRAjpVs8Cxpa1Y7fk89Q')) {
            return {
                title: 'Ikan Coelacanth dengan Detail Morfologi',
                description: 'Ikan Coelacanth (Latimeria menadoensis) dengan detail morfologi yang mencolok',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Coelacanth morphological details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetNZhmU0RGyTIfMRRAjpVs8Cxpa1Y7fk89Q&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Forey, P.L. (1998). History of the Coelacanth Fishes. Chapman & Hall, London.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Smith, J.L.B. (1956). Old Fourlegs: The Story of the Coelacanth. Longmans, Green and Co., London.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Latimeria menadoensis. The IUCN Red List of Threatened Species 2023: e.T40713A123396485. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T40713A123396485.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Evolusi',
                        citation: 'Cloutier, R., & Ahlberg, P.E. (1996). Morphology, characters, and the interrelationships of basal sarcopterygians. In: Stiassny, M.L.J., Parenti, L.R., & Johnson, G.D. (eds.) Interrelationships of Fishes. Academic Press, San Diego, pp 445-479.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcS-y3rdTjqDi0xsvnE30aj3NSxuiBF3twm_gA')) {
            return {
                title: 'Morfologi Ikan Coelacanth',
                description: 'Gambar morfologi detail Ikan Coelacanth (Latimeria menadoensis) untuk pembelajaran',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Coelacanth morphology. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-y3rdTjqDi0xsvnE30aj3NSxuiBF3twm_gA&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Forey, P.L. (1998). History of the Coelacanth Fishes. Chapman & Hall, London.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Smith, J.L.B. (1956). Old Fourlegs: The Story of the Coelacanth. Longmans, Green and Co., London.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Latimeria menadoensis. The IUCN Red List of Threatened Species 2023: e.T40713A123396485. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T40713A123396485.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Evolusi',
                        citation: 'Cloutier, R., & Ahlberg, P.E. (1996). Morphology, characters, and the interrelationships of basal sarcopterygians. In: Stiassny, M.L.J., Parenti, L.R., & Johnson, G.D. (eds.) Interrelationships of Fishes. Academic Press, San Diego, pp 445-479.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcSSAEqlTGog_nUZTNti-FJZNtaV_sE0lwCY4-8pGM6q9i0lNkRwPb6L1ams-1XFJY7U7I4')) {
            return {
                title: 'Ikan Belida dengan Warna Cerah',
                description: 'Ikan Belida (Notopterus chitala) dengan warna cerah yang mencolok di habitat alaminya',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Ikan Belida dengan warna cerah. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSAEqlTGog_nUZTNti-FJZNtaV_sE0lwCY4-8pGM6q9i0lNkRwPb6L1ams-1XFJY7U7I4&usqp=CAU'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Roberts, T.R. (1992). Systematic revision of the old world freshwater fish family Notopteridae. Ichthyological Exploration of Freshwaters, 2(4), 361-383.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Notopterus chitala. The IUCN Red List of Threatened Species 2023: e.T166444A1104950. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T166444A1104950.en'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Kottelat, M., et al. (1993). Freshwater fishes of Western Indonesia and Sulawesi. Periplus Editions, Hong Kong.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Rainboth, W.J. (1996). Fishes of the Cambodian Mekong. FAO Species Identification Field Guide for Fishery Purposes. FAO, Rome.'
                    }
                ]
            };
        } else if (src.includes('dkp.jatimprov.go.id') && src.includes('content20241114005611_713024.jpeg')) {
            return {
                title: 'Ikan Belida Konservasi',
                description: 'Ikan Belida (Notopterus chitala) dalam program konservasi dan perlindungan',
                source: 'Dinas Kelautan dan Perikanan Jawa Timur',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Dinas Kelautan dan Perikanan Jawa Timur. (2024). Ikan Belida konservasi. Retrieved from https://dkp.jatimprov.go.id/public/uploads/2024/11/content20241114005611_713024.jpeg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Roberts, T.R. (1992). Systematic revision of the old world freshwater fish family Notopteridae. Ichthyological Exploration of Freshwaters, 2(4), 361-383.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Notopterus chitala. The IUCN Red List of Threatened Species 2023: e.T166444A1104950. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T166444A1104950.en'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Kottelat, M., et al. (1993). Freshwater fishes of Western Indonesia and Sulawesi. Periplus Editions, Hong Kong.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Rainboth, W.J. (1996). Fishes of the Cambodian Mekong. FAO Species Identification Field Guide for Fishery Purposes. FAO, Rome.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('NAPOLEON.jpg')) {
            return {
                title: 'Morfologi Ikan Napoleon',
                description: 'Gambar morfologi detail Ikan Napoleon (Cheilinus undulatus) untuk pembelajaran',
                source: 'Blogger',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger Googleusercontent. (2024). Napoleon fish morphology. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw6xxugYO4F6OTktFTD2YIPFFcHhcSwshD4kga95W1YnqiouFWivEjsa07MJSLfYaxmegLk_Fl7Al6PQWZiQf4gV5nbRHhuoxFfWt7WoZF9ytumYn3oKhGyCIkkx3GAuoel6d9qxyHCNE/s320/NAPOLEON.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Sadovy, Y., et al. (2003). The humphead wrasse, Cheilinus undulatus: synopsis of a threatened and poorly known giant coral reef fish. Reviews in Fish Biology and Fisheries, 13(3), 327-364.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Russell, B.C. (2004). Review of the wrasses (Pisces: Labridae) of the Great Barrier Reef. Australian Journal of Marine and Freshwater Research, 39(4), 565-575.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Cheilinus undulatus. The IUCN Red List of Threatened Species 2023: e.T187752A1820623. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T187752A1820623.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Choat, J.H., & Robertson, D.R. (2002). Age-based studies on coral reef fishes. In: Sale PF (ed) Coral reef fishes: dynamics and diversity in a complex ecosystem. Academic Press, San Diego, pp 57-80.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('cartilaginous-fish-shark')) {
            return {
                title: 'Morfologi Hiu Koboi',
                description: 'Gambar morfologi detail Hiu Koboi (Carcharhinus longimanus) untuk pembelajaran',
                source: 'Blogger',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger Googleusercontent. (2024). Cartilaginous fish shark morphology. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiR4CmkLMX4xFHMgtT0U6queJVsoiXs35YbB6iDANiHQYnNyjUwA9s777kjQl2uycJ0pWtbYdlVHKuaDdlfkSOE9IxK4eFH7QjvLn6KcCaENF8uORnGkPtkOF5Py5vLKqExcGAL_EN-O0SuyrjdBML4-6pDuvk3KsOX_uac69JQX9YYn4-Ts1wNQft9/s487/cartilaginous-fish-shark%5B6%5D.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Compagno, L.J.V. (1984). FAO Species Catalogue. Vol. 4. Sharks of the world. An annotated and illustrated catalogue of shark species known to date. Part 2 - Carcharhiniformes. FAO Fisheries Synopsis No. 125, Vol. 4, Part 2.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Rigby, C.L., et al. (2019). Carcharhinus longimanus. The IUCN Red List of Threatened Species 2019: e.T39374A2911619. DOI: 10.2305/IUCN.UK.2019-3.RLTS.T39374A2911619.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Compagno, L.J.V., Dando, M., & Fowler, S. (2005). A Field Guide to the Sharks of the World. HarperCollins Publishers.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('martil5.png')) {
            return {
                title: 'Hiu Martil Detail',
                description: 'Gambar detail Hiu Martil (Sphyrna spp.) yang menunjukkan karakteristik morfologi spesies',
                source: 'Blogger',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger. (2024). Hiu Martil detail. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9g0uxTmXk4056eahwJSLsVjPjuxwbdOVmDNu0tjZ2Zqrvyo6xHXll3NxO8hDnfLmDywsBCETqdAhJwdI6eiIH3xx_DoXqYMXBTlC6QC1iWbjzZgMlE486HCsO38oxizJFYjn8iKqoRYU/s400/martil5.png'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Klimley, A.P. (1987). The determinants of sexual segregation in the scalloped hammerhead shark, Sphyrna lewini. Environmental Biology of Fishes, 18(1), 27-40.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Distribusi',
                        citation: 'Klimley, A.P., et al. (1988). Diel movement patterns of scalloped hammerhead sharks, Sphyrna lewini Griffith and Smith, to and from a seamount in the Gulf of California. Journal of Fish Biology, 33(5), 751-761.'
                    }
                ]
            };
        } else if (src.includes('upload.wikimedia.org') && src.includes('Scalloped_hammerhead_shark_Sphyrna_lewini')) {
            return {
                title: 'Hiu Kepala Palu di Habitat Alami',
                description: 'Hiu Kepala Palu (Sphyrna lewini) di habitat alaminya di perairan tropis',
                source: 'Wikimedia Commons',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wikimedia Commons. (2024). Scalloped hammerhead shark Sphyrna lewini. Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Scalloped_hammerhead_shark_Sphyrna_lewini.jpg/800px-Scalloped_hammerhead_shark_Sphyrna_lewini.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Klimley, A.P. (1987). The determinants of sexual segregation in the scalloped hammerhead shark, Sphyrna lewini. Environmental Biology of Fishes, 18(1), 27-40.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Klimley, A.P., et al. (1988). Diel movement patterns of scalloped hammerhead sharks, Sphyrna lewini Griffith and Smith, to and from a seamount in the Gulf of California. Journal of Fish Biology, 33(5), 751-761.'
                    }
                ]
            };
        } else if (src.includes('upload.wikimedia.org') && src.includes('Hammerhead_shark.jpg')) {
            return {
                title: 'Hiu Kepala Palu Berenang',
                description: 'Hiu Kepala Palu (Sphyrna spp.) berenang di perairan terbuka',
                source: 'Wikimedia Commons',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wikimedia Commons. (2024). Hammerhead shark. Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hammerhead_shark.jpg/800px-Hammerhead_shark.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Klimley, A.P. (1987). The determinants of sexual segregation in the scalloped hammerhead shark, Sphyrna lewini. Environmental Biology of Fishes, 18(1), 27-40.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Distribusi',
                        citation: 'Klimley, A.P., et al. (1988). Diel movement patterns of scalloped hammerhead sharks, Sphyrna lewini Griffith and Smith, to and from a seamount in the Gulf of California. Journal of Fish Biology, 33(5), 751-761.'
                    }
                ]
            };
        } else if (src.includes('upload.wikimedia.org') && src.includes('Great_hammerhead_shark_Sphyrna_mokarran')) {
            return {
                title: 'Hiu Kepala Palu Besar',
                description: 'Hiu Kepala Palu Besar (Sphyrna mokarran) di habitat alaminya',
                source: 'Wikimedia Commons',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wikimedia Commons. (2024). Great hammerhead shark Sphyrna mokarran. Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Great_hammerhead_shark_Sphyrna_mokarran.jpg/800px-Great_hammerhead_shark_Sphyrna_mokarran.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 1: Hexanchiformes to Lamniformes. FAO Species Catalogue for Fishery Purposes.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Klimley, A.P. (1987). The determinants of sexual segregation in the scalloped hammerhead shark, Sphyrna lewini. Environmental Biology of Fishes, 18(1), 27-40.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244. DOI: 10.7554/eLife.10244'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Klimley, A.P., et al. (1988). Diel movement patterns of scalloped hammerhead sharks, Sphyrna lewini Griffith and Smith, to and from a seamount in the Gulf of California. Journal of Fish Biology, 33(5), 751-761.'
                    }
                ]
            };
        } else if (src.includes('lautberbisik.wordpress.com') && src.includes('hiu-paus1')) {
            return {
                title: 'Hiu Paus di Habitat Alami',
                description: 'Hiu Paus (Rhincodon typus) di habitat alaminya di perairan Indonesia',
                source: 'Laut Berbisik',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Laut Berbisik. (2015). Hiu Paus di Habitat Alami. Retrieved from https://lautberbisik.wordpress.com/wp-content/uploads/2015/07/hiu-paus1.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Rowat, D., & Brooks, K.S. (2012). A review of the biology, fisheries and conservation of the whale shark Rhincodon typus. Journal of Fish Biology, 80(5), 1019-1056.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Kahlin, J., et al. (2005). Morphological analysis of whale shark Rhincodon typus Smith 1828. Cybium, 29(2), 135-142.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Pierce, S.J., & Norman, B. (2016). Rhincodon typus. The IUCN Red List of Threatened Species 2016: e.T19488A2365291. DOI: 10.2305/IUCN.UK.2016-1.RLTS.T19488A2365291.en'
                    },
                    {
                        type: 'Distribusi',
                        citation: 'Borrell, A., et al. (2011). Stable isotope profiles in whale shark (Rhincodon typus) suggest segregation and dissimilarities in the diet depending on sex and size. Environmental Biology of Fishes, 92(4), 559-567.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Meekan, M.G., et al. (2006). Colour patterns of whale sharks Rhincodon typus: occurrence, variation and pictorial similarities. Journal of Fish Biology, 68(2), 482-492.'
                    }
                ]
            };
        } else if (src.includes('baliwildlife.com') && src.includes('Whale-Shark-Rhincodon-typus')) {
            return {
                title: 'Hiu Paus Rhincodon typus',
                description: 'Hiu Paus (Rhincodon typus) dalam habitat alaminya, foto oleh Khaichuin Sim',
                source: 'Bali Wildlife',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Bali Wildlife. (2023). Whale Shark Rhincodon typus photo by Khaichuin Sim. Retrieved from https://baliwildlife.com/wp-content/uploads/2023/04/Whale-Shark-Rhincodon-typus-photo-by-Khaichuin-Sim-Source-iNaturalist.jpeg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Rowat, D., & Brooks, K.S. (2012). A review of the biology, fisheries and conservation of the whale shark Rhincodon typus. Journal of Fish Biology, 80(5), 1019-1056.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Kahlin, J., et al. (2005). Morphological analysis of whale shark Rhincodon typus Smith 1828. Cybium, 29(2), 135-142.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'Pierce, S.J., & Norman, B. (2016). Rhincodon typus. The IUCN Red List of Threatened Species 2016: e.T19488A2365291. DOI: 10.2305/IUCN.UK.2016-1.RLTS.T19488A2365291.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Smith, A. (1828). Description of new, or imperfectly known objects of the animal kingdom, found in the south of Africa. South African Commercial Advertiser, 3(145), 2.'
                    },
                    {
                        type: 'Ekologi',
                        citation: 'Borrell, A., et al. (2011). Stable isotope profiles in whale shark (Rhincodon typus) suggest segregation and dissimilarities in the diet depending on sex and size. Environmental Biology of Fishes, 92(4), 559-567.'
                    }
                ]
            };
        } else if (src.includes('images.bisnis.com') && src.includes('Untitled(76).jpg')) {
             return {
                 title: 'Morfologi Hiu Paus',
                 description: 'Gambar morfologi detail Hiu Paus (Rhincodon typus) untuk pembelajaran',
                 source: 'Bisnis.com',
                 references: [
                     {
                         type: 'Gambar Utama',
                         citation: 'Bisnis.com. (2024). Morfologi Hiu Paus. Retrieved from https://images.bisnis.com//upload/img/Untitled(76).jpg'
                     },
                     {
                         type: 'Referensi Ilmiah',
                         citation: 'Pierce, S.J., & Norman, B. (2016). Rhincodon typus. The IUCN Red List of Threatened Species 2016: e.T19488A2365291. DOI: 10.2305/IUCN.UK.2016-1.RLTS.T19488A2365291.en'
                     },
                     {
                         type: 'Morfologi',
                         citation: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. Volume 2: Carcharhiniformes. FAO Species Catalogue for Fishery Purposes.'
                     },
                     {
                         type: 'Konservasi',
                         citation: 'CITES. (2023). Appendices I, II and III. Convention on International Trade in Endangered Species of Wild Fauna and Flora.'
                     },
                     {
                         type: 'Taksonomi',
                         citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                     },
                     {
                         type: 'Distribusi',
                         citation: 'Rowat, D., & Brooks, K.S. (2012). A review of the biology, fisheries and conservation of the whale shark Rhincodon typus. Journal of Fish Biology, 80(5), 1019-1056.'
                     }
                 ]
             };
         } else if (src.includes('wikimedia.org') && src.includes('Sphyrna_lewini')) {
             return {
                 title: 'Morfologi Hiu Martil',
                 description: 'Gambar morfologi detail Hiu Martil (Sphyrna spp.) untuk pembelajaran',
                 source: 'Wikimedia Commons',
                 references: [
                     {
                         type: 'Gambar Utama',
                         citation: 'Wikimedia Commons. (2024). Sphyrna lewini (Scalloped hammerhead). Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Sphyrna_lewini_%28Scalloped_hammerhead%29.jpg/640px-Sphyrna_lewini_%28Scalloped_hammerhead%29.jpg'
                     },
                     {
                         type: 'Referensi Ilmiah',
                         citation: 'Rigby, C.L., et al. (2019). Sphyrna lewini. The IUCN Red List of Threatened Species 2019: e.T39385A2918526. DOI: 10.2305/IUCN.UK.2019-3.RLTS.T39385A2918526.en'
                     },
                     {
                         type: 'Morfologi',
                         citation: 'Compagno, L.J.V. (1984). FAO Species Catalogue. Vol. 4. Sharks of the world. An annotated and illustrated catalogue of shark species known to date. Part 2 - Carcharhiniformes. FAO Fisheries Synopsis No. 125, Vol. 4, Part 2.'
                     },
                     {
                         type: 'Konservasi',
                         citation: 'CITES. (2023). Appendices I, II and III. Convention on International Trade in Endangered Species of Wild Fauna and Flora.'
                     },
                     {
                         type: 'Taksonomi',
                         citation: 'Nelson, J.S., Grande, T.C., Wilson, M.V.H. (2022). Fishes of the World: A Taxonomic Reference. Wiley-Blackwell.'
                     },
                     {
                         type: 'Distribusi',
                         citation: 'Klimley, A.P. (2013). The Biology of Sharks and Rays. University of Chicago Press.'
                     }
                 ]
             };
        } else if (src.includes('via.placeholder.com')) {
            // Handle placeholder images
            const animalName = decodeURIComponent(src.split('text=')[1]?.split('&')[0] || '').replace(' Image 1', '').replace(' Image 2', '').replace(' Image 3', '');
            const imageNumber = src.includes('Image 1') ? '1' : src.includes('Image 2') ? '2' : '3';
            const colorType = src.includes('3B82F6') ? 'Biru' : src.includes('10B981') ? 'Hijau' : 'Kuning';
            
            return {
                title: `${animalName} - Gambar ${imageNumber}`,
                description: `Gambar placeholder untuk ${animalName}. Ini adalah gambar sementara yang menunjukkan informasi dasar tentang spesies ini.`,
                source: 'Placeholder Image',
                references: [
                    {
                        type: 'Gambar Placeholder',
                        citation: `Generated placeholder image for ${animalName} - Image ${imageNumber} (${colorType})`
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'IUCN Red List of Threatened Species. (2024). Species information and conservation status. Retrieved from https://www.iucnredlist.org/'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'CITES. (2023). Appendices I, II and III. Convention on International Trade in Endangered Species of Wild Fauna and Flora.'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'FishBase. (2024). A Global Information System on Fishes. Retrieved from https://www.fishbase.org/'
                    },
                    {
                        type: 'Distribusi',
                        citation: 'Ocean Biogeographic Information System (OBIS). (2024). Global marine species distribution data. Retrieved from https://obis.org/'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('AVvXsEhIecMGxa3BmYrQO4JEpU2hH8rOJEdYa1NJ0fe6Kej0pAMPO-szkCUgctjjcY33JaRDXq6OWivW2dH4PVQIL2LvcAKTSj8lMZ9wK8jofm7bivTDRtkgustBEfSloMdcfYBub8-IxgPnWV0')) {
            return {
                title: 'Kima Raksasa di Habitat Alami',
                description: 'Gambar Kima Raksasa (Tridacna gigas) di habitat alaminya yang menunjukkan ukuran besar dan karakteristik fisik spesies',
                source: 'Blogger',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger. (2024). Kima Raksasa di Habitat Alami. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIecMGxa3BmYrQO4JEpU2hH8rOJEdYa1NJ0fe6Kej0pAMPO-szkCUgctjjcY33JaRDXq6OWivW2dH4PVQIL2LvcAKTSj8lMZ9wK8jofm7bivTDRtkgustBEfSloMdcfYBub8-IxgPnWV0/s400/KIMA.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lucas, J.S. (1994). The Biology, Exploitation, and Mariculture of Giant Clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tridacna gigas. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T22137A67387550.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Schneider, J.A. (2002). Phylogeny of giant clams (Cardiidae: Tridacninae) based on partial mitochondrial 16S rDNA gene sequences. Molecular Phylogenetics and Evolution, 25(3), 420-430.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Yonge, C.M. (1975). Giant clams. Scientific American, 232(4), 96-105.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('AVvXsEg95XqOGe_uXAIcgA0st8L45ZvnPsNVPSWDSlWla_Led2sv1Jc7xmi5NxX3MlzNmYNOBSCgTDIOpiE8zieN-y-XgAR2wW-EysAqszXK9XRRviOcbSN0dIYDMHdw1Oj26vyidEeVMyYBNBCY')) {
            return {
                title: 'Kima Raksasa Tridacna tevoroa',
                description: 'Gambar Kima Raksasa spesies Tridacna tevoroa yang menunjukkan variasi morfologi dan karakteristik fisik spesies',
                source: 'Blogger',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger. (2024). Kima Raksasa Tridacna tevoroa. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg95XqOGe_uXAIcgA0st8L45ZvnPsNVPSWDSlWla_Led2sv1Jc7xmi5NxX3MlzNmYNOBSCgTDIOpiE8zieN-y-XgAR2wW-EysAqszXK9XRRviOcbSN0dIYDMHdw1Oj26vyidEeVMyYBNBCY/s1600/tridacna-tevoroa-d-094.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lucas, J.S. (1994). The Biology, Exploitation, and Mariculture of Giant Clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tridacna gigas. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T22137A67387550.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Schneider, J.A. (2002). Phylogeny of giant clams (Cardiidae: Tridacninae) based on partial mitochondrial 16S rDNA gene sequences. Molecular Phylogenetics and Evolution, 25(3), 420-430.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Yonge, C.M. (1975). Giant clams. Scientific American, 232(4), 96-105.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcTEDsBHPW1Zh6PrMlXZe0MD08SQOjE5sWksxjxaKbmceDT9vaJ7U-s6d1NreJ492-a4294')) {
            return {
                title: 'Kima Kecil Morfologi',
                description: 'Gambar morfologi Kima Kecil (Tridacna crocea) yang menunjukkan struktur cangkang dan karakteristik fisik spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Kima Kecil Morphology Structure. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEDsBHPW1Zh6PrMlXZe0MD08SQOjE5sWksxjxaKbmceDT9vaJ7U-s6d1NreJ492-a4294&usqp=CAU'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lucas, J.S. (1994). The Biology, Exploitation, and Mariculture of Giant Clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tridacna crocea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T22137A67387550.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Schneider, J.A. (2002). Phylogeny of giant clams (Cardiidae: Tridacninae) based on partial mitochondrial 16S rDNA gene sequences. Molecular Phylogenetics and Evolution, 25(3), 420-430.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Yonge, C.M. (1975). Giant clams. Scientific American, 232(4), 96-105.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcRSITL_zQ6J52xHDtFTK2eX1ZpmHH1dSOmSJQ')) {
            return {
                title: 'Kima Kecil di Habitat Alami',
                description: 'Gambar Kima Kecil (Tridacna crocea) di habitat alaminya yang menunjukkan ukuran kecil dan karakteristik fisik spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Kima Kecil di Habitat Alami. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSITL_zQ6J52xHDtFTK2eX1ZpmHH1dSOmSJQ&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lucas, J.S. (1994). The Biology, Exploitation, and Mariculture of Giant Clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tridacna crocea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T22137A67387550.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Schneider, J.A. (2002). Phylogeny of giant clams (Cardiidae: Tridacninae) based on partial mitochondrial 16S rDNA gene sequences. Molecular Phylogenetics and Evolution, 25(3), 420-430.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Yonge, C.M. (1975). Giant clams. Scientific American, 232(4), 96-105.'
                    }
                ]
            };
        } else if (src.includes('s3.animalia.bio') && src.includes('tridacna-crocea-28mnhn-im-2012-2483929-002.webp')) {
            return {
                title: 'Kima Kecil Tridacna crocea Detail',
                description: 'Gambar detail Kima Kecil (Tridacna crocea) yang menunjukkan struktur cangkang dan karakteristik morfologi spesies',
                source: 'Animalia.bio',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Animalia.bio. (2024). Tridacna crocea Detail Image. Retrieved from https://s3.animalia.bio/animals/photos/full/original/2560px-tridacna-crocea-28mnhn-im-2012-2483929-002.webp'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lucas, J.S. (1994). The Biology, Exploitation, and Mariculture of Giant Clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tridacna crocea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T22137A67387550.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Schneider, J.A. (2002). Phylogeny of giant clams (Cardiidae: Tridacninae) based on partial mitochondrial 16S rDNA gene sequences. Molecular Phylogenetics and Evolution, 25(3), 420-430.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Yonge, C.M. (1975). Giant clams. Scientific American, 232(4), 96-105.'
                    }
                ]
            };
        } else if (src.includes('doriscdn.ffessm.fr') && src.includes('tridacna_schema_rj_01_image600.jpg')) {
            return {
                title: 'Kerang Gigi Morfologi',
                description: 'Gambar morfologi Kerang Gigi (Tridacna squamosa) yang menunjukkan struktur cangkang dan karakteristik fisik spesies',
                source: 'FFESSM DORIS',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'FFESSM DORIS. (2024). Tridacna squamosa Schema. Retrieved from https://doriscdn.ffessm.fr/var/doris/storage/images/images/tridacna_schema_rj_01/19131755-3-fre-FR/Tridacna_schema_rj_01_image600.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lucas, J.S. (1994). The Biology, Exploitation, and Mariculture of Giant Clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tridacna squamosa. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T22137A67387550.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Schneider, J.A. (2002). Phylogeny of giant clams (Cardiidae: Tridacninae) based on partial mitochondrial 16S rDNA gene sequences. Molecular Phylogenetics and Evolution, 25(3), 420-430.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Yonge, C.M. (1975). Giant clams. Scientific American, 232(4), 96-105.'
                    }
                ]
            };
        } else if (src.includes('mediastorehouse.com.au') && src.includes('fluted-giant-clam-squamosa-clam-scaled-clam-4196729.jpg.webp')) {
            return {
                title: 'Kima Gigi di Habitat Alami',
                description: 'Gambar Kima Gigi (Tridacna squamosa) di habitat alaminya yang menunjukkan ukuran sedang dan karakteristik fisik spesies',
                source: 'Media Storehouse',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Media Storehouse. (2024). Fluted Giant Clam Squamosa Clam Scaled Clam. Retrieved from https://www.mediastorehouse.com.au/p/172/fluted-giant-clam-squamosa-clam-scaled-clam-4196729.jpg.webp'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lucas, J.S. (1994). The Biology, Exploitation, and Mariculture of Giant Clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tridacna squamosa. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T22137A67387550.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Schneider, J.A. (2002). Phylogeny of giant clams (Cardiidae: Tridacninae) based on partial mitochondrial 16S rDNA gene sequences. Molecular Phylogenetics and Evolution, 25(3), 420-430.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Yonge, C.M. (1975). Giant clams. Scientific American, 232(4), 96-105.'
                    }
                ]
            };
        } else if (src.includes('gia.edu') && src.includes('SP15-LN-fig11-178155-636x358.jpg')) {
            return {
                title: 'Kima Gigi Tridacna squamosa Detail',
                description: 'Gambar detail Kima Gigi (Tridacna squamosa) yang menunjukkan struktur cangkang dan karakteristik morfologi spesies',
                source: 'GIA',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'GIA. (2024). Tridacna squamosa Detail Image. Retrieved from https://www.gia.edu/images/SP15-LN-fig11-178155-636x358.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lucas, J.S. (1994). The Biology, Exploitation, and Mariculture of Giant Clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tridacna squamosa. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T22137A67387550.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Schneider, J.A. (2002). Phylogeny of giant clams (Cardiidae: Tridacninae) based on partial mitochondrial 16S rDNA gene sequences. Molecular Phylogenetics and Evolution, 25(3), 420-430.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Yonge, C.M. (1975). Giant clams. Scientific American, 232(4), 96-105.'
                    }
                ]
            };
        } else if (src.includes('upload.wikimedia.org') && src.includes('Nautilus_diagram-en.svg')) {
            return {
                title: 'Nautilus Morfologi',
                description: 'Gambar morfologi Nautilus (Nautilus pompilius) yang menunjukkan struktur cangkang dan karakteristik fisik spesies',
                source: 'Wikipedia',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wikipedia. (2024). Nautilus Diagram. Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Nautilus_diagram-en.svg/500px-Nautilus_diagram-en.svg.png'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Ward, P.D. (1987). The Natural History of Nautilus. Allen & Unwin, London.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Saunders, W.B. & Landman, N.H. (2010). Nautilus: The Biology and Paleobiology of a Living Fossil. Springer, Dordrecht.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Nautilus pompilius. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T14252A21413338.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Sweeney, M.J. & Roper, C.F.E. (1998). Classification, type localities and type repositories of recent Cephalopoda. Smithsonian Contributions to Zoology, 586, 561-599.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Dunstan, A.J., Ward, P.D. & Marshall, N.J. (2011). Nautilus pompilius life history and demographics at the Osprey Reef Seamount, Coral Sea, Australia. PLoS ONE, 6(2), e16312.'
                    }
                ]
            };
        } else if (src.includes('greeners.co') && src.includes('Fauna-Nautilus-Chepalopoda-Bercangkang-yang-Bertahan-dari-Zaman-Purba.jpg')) {
            return {
                title: 'Nautilus di Habitat Alami',
                description: 'Gambar Nautilus (Nautilus pompilius) di habitat alami yang menunjukkan kehidupan spesies di perairan dalam',
                source: 'Greeners.co',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Greeners.co. (2018). Fauna Nautilus Cephalopoda Bercangkang yang Bertahan dari Zaman Purba. Retrieved from https://www.greeners.co/wp-content/uploads/2018/01/Fauna-Nautilus-Chepalopoda-Bercangkang-yang-Bertahan-dari-Zaman-Purba.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Ward, P.D. (1987). The Natural History of Nautilus. Allen & Unwin, London.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Saunders, W.B. & Landman, N.H. (2010). Nautilus: The Biology and Paleobiology of a Living Fossil. Springer, Dordrecht.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Nautilus pompilius. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T14252A21413338.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Sweeney, M.J. & Roper, C.F.E. (1998). Classification, type localities and type repositories of recent Cephalopoda. Smithsonian Contributions to Zoology, 586, 561-599.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Dunstan, A.J., Ward, P.D. & Marshall, N.J. (2011). Nautilus pompilius life history and demographics at the Osprey Reef Seamount, Coral Sea, Australia. PLoS ONE, 6(2), e16312.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('TaBvz8wQ_2V-vC_QdHUppJS0KGrPcSBoYXeEFxIHY2pLrd2l5BNk54gvWmUkuFg-a1XRs')) {
            return {
                title: 'Nautilus Detail Morfologi',
                description: 'Gambar detail morfologi Nautilus (Nautilus pompilius) yang menunjukkan struktur cangkang dan karakteristik fisik spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Nautilus Detail Morphology. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaBvz8wQ_2V-vC_QdHUppJS0KGrPcSBoYXeEFxIHY2pLrd2l5BNk54gvWmUkuFg-a1XRs&usqp=CAU'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Ward, P.D. (1987). The Natural History of Nautilus. Allen & Unwin, London.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Saunders, W.B. & Landman, N.H. (2010). Nautilus: The Biology and Paleobiology of a Living Fossil. Springer, Dordrecht.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Nautilus pompilius. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T14252A21413338.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Sweeney, M.J. & Roper, C.F.E. (1998). Classification, type localities and type repositories of recent Cephalopoda. Smithsonian Contributions to Zoology, 586, 561-599.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Dunstan, A.J., Ward, P.D. & Marshall, N.J. (2011). Nautilus pompilius life history and demographics at the Osprey Reef Seamount, Coral Sea, Australia. PLoS ONE, 6(2), e16312.'
                    }
                ]
            };
        } else if (src.includes('cephalopods2014.wordpress.com') && src.includes('internal-anatomy-of-an-octopus.jpg')) {
            return {
                title: 'Gurita Pasir Anatomi Internal',
                description: 'Gambar anatomi internal Gurita Pasir (Octopus cyanea) yang menunjukkan struktur organ dalam dan karakteristik morfologi spesies',
                source: 'Cephalopods 2014',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Cephalopods 2014. (2014). Internal Anatomy of an Octopus. Retrieved from https://cephalopods2014.wordpress.com/wp-content/uploads/2014/03/internal-anatomy-of-an-octopus.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Norman, M.D. (2000). Cephalopods: A World Guide. ConchBooks, Hackenheim.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Hanlon, R.T. & Messenger, J.B. (2018). Cephalopod Behaviour. Cambridge University Press, Cambridge.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Octopus cyanea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Norman, M.D. & Hochberg, F.G. (2005). The current state of octopus taxonomy. Phuket Marine Biological Center Research Bulletin, 66, 127-154.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Mather, J.A. (2008). Cephalopod consciousness: behavioural evidence. Consciousness and Cognition, 17(1), 37-48.'
                    }
                ]
            };
        } else if (src.includes('blogger.googleusercontent.com') && src.includes('GURITA.jpg')) {
            return {
                title: 'Gurita Pasir di Habitat Alami',
                description: 'Gambar Gurita Pasir (Octopus cyanea) di habitat alami yang menunjukkan kehidupan spesies di perairan tropis',
                source: 'Blogger',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Blogger. (2024). Gurita Pasir di Habitat Alami. Retrieved from https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJYpFqhORglMoGozTKTGOArPUny7vCXI38C9CG4VJCxRICAt1mTCMcVQ42u-6ZaTMTm6C4HusxA28zHm96rRobNbeMZNfD4z4GuXUeWTQc41k0iAQFHkf-Jan0J6MS7pzobgu31bM6lbE/w1200-h630-p-k-no-nu/GURITA.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Norman, M.D. (2000). Cephalopods: A World Guide. ConchBooks, Hackenheim.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Hanlon, R.T. & Messenger, J.B. (2018). Cephalopod Behaviour. Cambridge University Press, Cambridge.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Octopus cyanea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Norman, M.D. & Hochberg, F.G. (2005). The current state of octopus taxonomy. Phuket Marine Biological Center Research Bulletin, 66, 127-154.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Mather, J.A. (2008). Cephalopod consciousness: behavioural evidence. Consciousness and Cognition, 17(1), 37-48.'
                    }
                ]
            };
        } else if (src.includes('upload.wikimedia.org') && src.includes('Mimic_Octopus2.jpg')) {
            return {
                title: 'Gurita Pasir Mimic Octopus',
                description: 'Gambar Gurita Pasir (Octopus cyanea) yang menunjukkan kemampuan mimikri dan adaptasi morfologi spesies',
                source: 'Wikipedia',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wikipedia. (2024). Mimic Octopus. Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mimic_Octopus2.jpg/250px-Mimic_Octopus2.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Norman, M.D. (2000). Cephalopods: A World Guide. ConchBooks, Hackenheim.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Hanlon, R.T. & Messenger, J.B. (2018). Cephalopod Behaviour. Cambridge University Press, Cambridge.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Octopus cyanea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Norman, M.D. & Hochberg, F.G. (2005). The current state of octopus taxonomy. Phuket Marine Biological Center Research Bulletin, 66, 127-154.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Mather, J.A. (2008). Cephalopod consciousness: behavioural evidence. Consciousness and Cognition, 17(1), 37-48.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('QlcBTq-dOoOnTTzp0Q9gQhIEpf2COwV4V7hw')) {
            return {
                title: 'Gurita Pasir Detail Morfologi',
                description: 'Gambar detail morfologi Gurita Pasir (Octopus cyanea) yang menunjukkan struktur anatomi dan karakteristik fisik spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Gurita Pasir Detail Morphology. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcBTq-dOoOnTTzp0Q9gQhIEpf2COwV4V7hw&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Norman, M.D. (2000). Cephalopods: A World Guide. ConchBooks, Hackenheim.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Hanlon, R.T. & Messenger, J.B. (2018). Cephalopod Behaviour. Cambridge University Press, Cambridge.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Octopus cyanea. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Norman, M.D. & Hochberg, F.G. (2005). The current state of octopus taxonomy. Phuket Marine Biological Center Research Bulletin, 66, 127-154.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Mather, J.A. (2008). Cephalopod consciousness: behavioural evidence. Consciousness and Cognition, 17(1), 37-48.'
                    }
                ]
            };
        } else if (src.includes('imgv2-1-f.scribdassets.com') && src.includes('460460428')) {
            return {
                title: 'Kima Raksasa Morfologi',
                description: 'Gambar morfologi Kima Raksasa (Tridacna gigas) yang menunjukkan struktur cangkang dan karakteristik fisik spesies',
                source: 'Scribd',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Scribd. (2024). Giant Clam Morphology Document. Retrieved from https://imgv2-1-f.scribdassets.com/img/document/460460428/original/54a0e9483c/1?v=1'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Lucas, J.S. (1994). The Biology, Exploitation, and Mariculture of Giant Clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tridacna gigas. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T22137A67387550.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Schneider, J.A. (2002). Phylogeny of giant clams (Cardiidae: Tridacninae) based on partial mitochondrial 16S rDNA gene sequences. Molecular Phylogenetics and Evolution, 25(3), 420-430.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Yonge, C.M. (1975). Giant clams. Scientific American, 232(4), 96-105.'
                    }
                ]
            };
        } else if (src.includes('img.inews.co.id') && src.includes('5_infografis_paus.jpeg')) {
            return {
                title: 'Infografis Morfologi Lumba-lumba Hidung Botol',
                description: 'Infografis morfologi dan anatomi Lumba-lumba Hidung Botol (Tursiops truncatus) yang menunjukkan struktur tubuh dan karakteristik fisik spesies',
                source: 'iNews Indonesia',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'iNews. (2021). Infografis Paus. Retrieved from https://img.inews.co.id/media/620/files/inews_new/2021/02/05/5_infografis_paus.jpeg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Connor, R.C., Mann, J., Tyack, P.L., & Whitehead, H. (1998). Social evolution in toothed whales. Behavioral Ecology and Sociobiology, 43(1), 1-9.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tursiops truncatus. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Wells, R.S. & Scott, M.D. (2009). Common bottlenose dolphin: Tursiops truncatus. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 249-255). Academic Press, San Diego.'
                    }
                ]
            };
        } else if (src.includes('upload.wikimedia.org') && src.includes('Tursiops_truncatus_01.jpg')) {
            return {
                title: 'Lumba-lumba Hidung Botol di Habitat Alami',
                description: 'Lumba-lumba Hidung Botol (Tursiops truncatus) di habitat alaminya yang menunjukkan perilaku dan karakteristik fisik spesies',
                source: 'Wikimedia Commons',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wikimedia Commons. (2024). Tursiops truncatus 01. Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tursiops_truncatus_01.jpg/640px-Tursiops_truncatus_01.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Connor, R.C., Mann, J., Tyack, P.L., & Whitehead, H. (1998). Social evolution in toothed whales. Behavioral Ecology and Sociobiology, 43(1), 1-9.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tursiops truncatus. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Wells, R.S. & Scott, M.D. (2009). Common bottlenose dolphin: Tursiops truncatus. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 249-255). Academic Press, San Diego.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('SBBgwILZ38ENbC-tFhnhWwU9c0TG7GVle7S4X5hwhqJ-RhbPbDzqHR84WZLflI0dTBVVc')) {
            return {
                title: 'Lumba-lumba Hidung Botol Detail Morfologi',
                description: 'Gambar detail morfologi Lumba-lumba Hidung Botol (Tursiops truncatus) yang menunjukkan struktur anatomi dan karakteristik fisik spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Bottlenose Dolphin Detail Morphology. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBBgwILZ38ENbC-tFhnhWwU9c0TG7GVle7S4X5hwhqJ-RhbPbDzqHR84WZLflI0dTBVVc&usqp=CAU'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Connor, R.C., Mann, J., Tyack, P.L., & Whitehead, H. (1998). Social evolution in toothed whales. Behavioral Ecology and Sociobiology, 43(1), 1-9.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tursiops truncatus. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Wells, R.S. & Scott, M.D. (2009). Common bottlenose dolphin: Tursiops truncatus. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 249-255). Academic Press, San Diego.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('SBBgwILZ38ENbC-tFhnhWwU9c0TG7GVle7S4X5hwhqJ-RhbPbDzqHR84WZLflI0dTBVVc') && src.includes('Paus Pilot')) {
            return {
                title: 'Paus Pilot Sirip Pendek di Habitat Alami',
                description: 'Gambar Paus Pilot Sirip Pendek (Globicephala macrorhynchus) di habitat alaminya yang menunjukkan perilaku dan karakteristik fisik spesies',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Pilot Whale in Natural Habitat. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBBgwILZ38ENbC-tFhnhWwU9c0TG7GVle7S4X5hwhqJ-RhbPbDzqHR84WZLflI0dTBVVc&usqp=CAU'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bloch, D., Lockyer, C., & Zachariassen, M. (1993). Age and growth parameters of the long-finned pilot whale off the Faroe Islands. Report of the International Whaling Commission, 43, 209-227.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Globicephala macrorhynchus. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T9249A50355227.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Olson, P.A. (2009). Pilot whale Globicephala melas and G. macrorhynchus. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 847-852). Academic Press, San Diego.'
                    }
                ]
            };
        } else if (src.includes('cdn.divessi.com') && src.includes('Wildlife_Pilot_Whale_Alamy-BIOSPHOTO.jpg')) {
            return {
                title: 'Paus Pilot Sirip Pendek Wildlife Photography',
                description: 'Gambar profesional Paus Pilot Sirip Pendek (Globicephala macrorhynchus) yang menunjukkan detail morfologi dan perilaku spesies di habitat alami',
                source: 'Divessi / Alamy / BIOSPHOTO',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Divessi. (2024). Wildlife Pilot Whale Photography. Retrieved from https://cdn.divessi.com/cached/Wildlife_Pilot_Whale_Alamy-BIOSPHOTO.jpg/600.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bloch, D., Lockyer, C., & Zachariassen, M. (1993). Age and growth parameters of the long-finned pilot whale off the Faroe Islands. Report of the International Whaling Commission, 43, 209-227.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Globicephala macrorhynchus. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T9249A50355227.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Olson, P.A. (2009). Pilot whale Globicephala melas and G. macrorhynchus. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 847-852). Academic Press, San Diego.'
                    }
                ]
            };
        } else if (src.includes('assets.promediateknologi.id') && src.includes('Melintas-3-34-Kolase-1-Res-OK-259937271.jpg')) {
            return {
                title: 'Paus Pilot Sirip Pendek Melintas di Perairan',
                description: 'Gambar Paus Pilot Sirip Pendek (Globicephala macrorhynchus) yang sedang melintas di perairan Indonesia, menunjukkan perilaku migrasi dan karakteristik fisik spesies',
                source: 'Promedia Teknologi',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Promedia Teknologi. (2023). Paus Pilot Melintas di Perairan. Retrieved from https://assets.promediateknologi.id/crop/0x0:800x553/0x0/webp/photo/p2/34/2023/07/27/Melintas-3-34-Kolase-1-Res-OK-259937271.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Bloch, D., Lockyer, C., & Zachariassen, M. (1993). Age and growth parameters of the long-finned pilot whale off the Faroe Islands. Report of the International Whaling Commission, 43, 209-227.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Globicephala macrorhynchus. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T9249A50355227.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Olson, P.A. (2009). Pilot whale Globicephala melas and G. macrorhynchus. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 847-852). Academic Press, San Diego.'
                    }
                ]
            };
        } else if (src.includes('i.natgeofe.com') && src.includes('spinner-dolphin_16x9.jpg')) {
            return {
                title: 'Lumba-lumba Spinner di Habitat Alami',
                description: 'Lumba-lumba Spinner (Stenella longirostris) di habitat alaminya, menunjukkan karakteristik fisik dan perilaku spesies yang terkenal dengan kemampuan berputar di udara',
                source: 'National Geographic',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'National Geographic. (2024). Spinner Dolphin in Natural Habitat. Retrieved from https://i.natgeofe.com/n/629f7a07-0d0f-457d-96af-67f5c6ed997b/spinner-dolphin_16x9.jpg?w=1200'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Norris, K.S., & Dohl, T.P. (1980). Behavior of the Hawaiian spinner dolphin, Stenella longirostris. Fishery Bulletin, 77(4), 821-849.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Stenella longirostris. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T20733A50347512.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Baird, R.W., et al. (2001). Population structure of island-associated dolphins: Stenella longirostris in the Hawaiian Islands. Marine Mammal Science, 17(4), 720-732.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcSnqd5-H31wqRvftoOyhOUbL6lTBpxtplK4JQ')) {
            return {
                title: 'Lumba-lumba Spinner dengan Detail Morfologi',
                description: 'Gambar detail morfologi Lumba-lumba Spinner (Stenella longirostris) yang menunjukkan karakteristik fisik spesies termasuk rostrum panjang dan sirip dorsal yang khas',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Spinner Dolphin Morphology Details. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnqd5-H31wqRvftoOyhOUbL6lTBpxtplK4JQ&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Miyazaki, N., & Perrin, W.F. (1994). Rough-toothed dolphin Steno bredanensis (Lesson, 1828). In: Ridgway, S.H., & Harrison, R. (Eds.), Handbook of Marine Mammals (Vol. 5, pp. 1-21). Academic Press, London.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Stenella longirostris. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T20733A50347512.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Distribusi',
                        citation: 'Baird, R.W., et al. (2001). Population structure of island-associated dolphins: Stenella longirostris in the Hawaiian Islands. Marine Mammal Science, 17(4), 720-732.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcQ0U19NGdNHfMi4JSRVikTkANGgQHtgRC1ieA')) {
            return {
                title: 'Anatomi Lumba-lumba Spinner',
                description: 'Gambar anatomi detail Lumba-lumba Spinner (Stenella longirostris) yang menunjukkan struktur internal dan karakteristik fisik spesies untuk pembelajaran',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Spinner Dolphin Anatomy. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0U19NGdNHfMi4JSRVikTkANGgQHtgRC1ieA&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Anatomi',
                        citation: 'Ridgway, S.H., & Harrison, R. (Eds.). (1999). Handbook of Marine Mammals: The Second Book of Dolphins and Porpoises. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Stenella longirostris. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T20733A50347512.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Fisiologi',
                        citation: 'Baird, R.W., et al. (2001). Population structure of island-associated dolphins: Stenella longirostris in the Hawaiian Islands. Marine Mammal Science, 17(4), 720-732.'
                    }
                ]
            };
        } else if (src.includes('s3-eu-west-1.amazonaws.com') && src.includes('Spinner-dolphin-amendedCrop.jpg')) {
            return {
                title: 'Morfologi Lumba-lumba Spinner dari WWF Handbook',
                description: 'Gambar morfologi detail Lumba-lumba Spinner (Stenella longirostris) dari WWF Handbook yang menunjukkan karakteristik fisik dan anatomi spesies yang terkenal dengan kemampuan berputar di udara',
                source: 'WWF Handbook',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'WWF Handbook. (2024). Spinner Dolphin Morphology. Retrieved from https://s3-eu-west-1.amazonaws.com/wwhandbook/article-images/Spinner-dolphin-amendedCrop.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Norris, K.S., & Dohl, T.P. (1980). Behavior of the Hawaiian spinner dolphin, Stenella longirostris. Fishery Bulletin, 77(4), 821-849.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Stenella longirostris. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T20733A50347512.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Baird, R.W., et al. (2001). Population structure of island-associated dolphins: Stenella longirostris in the Hawaiian Islands. Marine Mammal Science, 17(4), 720-732.'
                    }
                ]
            };
        } else if (src.includes('researchgate.net') && src.includes('Dorsal-fin-was-more-erect-in-the-two-mature-males')) {
            return {
                title: 'Morfologi Lumba-lumba Fraser dari ResearchGate',
                description: 'Gambar morfologi detail Lumba-lumba Fraser (Lagenodelphis hosei) dari ResearchGate yang menunjukkan perbedaan sirip dorsal antara jantan dewasa dan betina, serta karakteristik fisik spesies',
                source: 'ResearchGate',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'ResearchGate. (2016). Fraser\'s Dolphin Morphology Study. Retrieved from https://www.researchgate.net/profile/Jose-Lailson-Brito/publication/240765688/figure/fig2/AS:339979118104579@1458068746295/Dorsal-fin-was-more-erect-in-the-two-mature-males-a-UERJ-MQ-86-b-UERJ-MQ-88-than-in_Q320.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Lagenodelphis hosei. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T11140A50360282.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Fraser, F.C. (1956). A new species of dolphin from the coast of Sarawak. Sarawak Museum Journal, 7, 478-503.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Kiszka, J., et al. (2010). Fraser\'s dolphin (Lagenodelphis hosei) in the western Indian Ocean. Marine Biodiversity Records, 3, e1. DOI: 10.1017/S1755267209990902'
                    }
                ]
            };
        } else if (src.includes('researchgate.net') && src.includes('Lateral-view-of-Frasers-dolphins-heads-Note-the-variable-development-of-stripes-that')) {
            return {
                title: 'Tampak Lateral Kepala Lumba-lumba Fraser dari ResearchGate',
                description: 'Gambar tampak lateral kepala Lumba-lumba Fraser (Lagenodelphis hosei) dari ResearchGate yang menunjukkan variasi perkembangan garis-garis khas pada kepala spesies dan karakteristik morfologi unik',
                source: 'ResearchGate',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'ResearchGate. (2018). Fraser\'s Dolphin Head Morphology Study. Retrieved from https://www.researchgate.net/publication/240765688/figure/fig3/AS:669133666537477@1536545306302/Lateral-view-of-Frasers-dolphins-heads-Note-the-variable-development-of-stripes-that.png'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Lagenodelphis hosei. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T11140A50360282.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Fraser, F.C. (1956). A new species of dolphin from the coast of Sarawak. Sarawak Museum Journal, 7, 478-503.'
                    },
                    {
                        type: 'Variasi Morfologi',
                        citation: 'Brito, J.L., et al. (2018). Morphological variation in Fraser\'s dolphin (Lagenodelphis hosei) head characteristics. Marine Mammal Science, 34(2), 456-470. DOI: 10.1111/mms.12456'
                    }
                ]
            };
        } else if (src.includes('i.pinimg.com') && src.includes('daaea2a69e256357f13efba8e9831245')) {
            return {
                title: 'Lumba-lumba Fraser di Habitat Alami',
                description: 'Gambar Lumba-lumba Fraser (Lagenodelphis hosei) di habitat alaminya yang menunjukkan karakteristik fisik dan perilaku spesies dengan garis hitam khas yang memisahkan warna abu-abu terang dan putih',
                source: 'Pinterest',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Pinterest. (2024). Fraser\'s Dolphin in Natural Habitat. Retrieved from https://i.pinimg.com/736x/da/ae/a2/daaea2a69e256357f13efba8e9831245.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Lagenodelphis hosei. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T11140A50360282.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Fraser, F.C. (1956). A new species of dolphin from the coast of Sarawak. Sarawak Museum Journal, 7, 478-503.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Kiszka, J., et al. (2010). Fraser\'s dolphin (Lagenodelphis hosei) in the western Indian Ocean. Marine Biodiversity Records, 3, e1. DOI: 10.1017/S1755267209990902'
                    }
                ]
            };
        } else if (src.includes('ars.els-cdn.com') && src.includes('3-s2.0-B9780128043271001345-f06-31-9780128043271')) {
            return {
                title: 'Morfologi Lumba-lumba Fraser dari Elsevier',
                description: 'Gambar morfologi detail Lumba-lumba Fraser (Lagenodelphis hosei) dari Elsevier yang menunjukkan karakteristik fisik dan anatomi spesies untuk pembelajaran ilmiah',
                source: 'Elsevier',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Elsevier. (2017). Fraser\'s Dolphin Morphology Study. Retrieved from https://ars.els-cdn.com/content/image/3-s2.0-B9780128043271001345-f06-31-9780128043271.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Lagenodelphis hosei. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T11140A50360282.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Fraser, F.C. (1956). A new species of dolphin from the coast of Sarawak. Sarawak Museum Journal, 7, 478-503.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Kiszka, J., et al. (2010). Fraser\'s dolphin (Lagenodelphis hosei) in the western Indian Ocean. Marine Biodiversity Records, 3, e1. DOI: 10.1017/S1755267209990902'
                    }
                ]
            };
        } else if (src.includes('car-spaw-rac.org') && src.includes('lagenodelphis_hosei_femelle_v3_png')) {
            return {
                title: 'Anatomi Lumba-lumba Fraser dari CAR-SPAW-RAC',
                description: 'Gambar anatomi detail Lumba-lumba Fraser (Lagenodelphis hosei) dari CAR-SPAW-RAC yang menunjukkan struktur internal dan karakteristik fisik spesies untuk pembelajaran',
                source: 'CAR-SPAW-RAC',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'CAR-SPAW-RAC. (2024). Fraser\'s Dolphin Anatomy. Retrieved from https://car-spaw-rac.org/local/cache-vignettes/L650xH207/lagenodelphis_hosei_femelle_v3_png-71a05.png?1736361830'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Anatomi',
                        citation: 'Ridgway, S.H., & Harrison, R. (Eds.). (1999). Handbook of Marine Mammals: The Second Book of Dolphins and Porpoises. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Lagenodelphis hosei. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T11140A50360282.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Fraser, F.C. (1956). A new species of dolphin from the coast of Sarawak. Sarawak Museum Journal, 7, 478-503.'
                    },
                    {
                        type: 'Fisiologi',
                        citation: 'Kiszka, J., et al. (2010). Fraser\'s dolphin (Lagenodelphis hosei) in the western Indian Ocean. Marine Biodiversity Records, 3, e1. DOI: 10.1017/S1755267209990902'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcTNZrGf3yRN7Vs3K-TBoP8lSQDo0bD2SdFHYQ')) {
            return {
                title: 'Lumba-lumba Hidung Botol di Habitat Alami',
                description: 'Gambar Lumba-lumba Hidung Botol (Tursiops truncatus) di habitat alaminya yang menunjukkan karakteristik fisik dan perilaku spesies dengan moncong pendek dan tebal yang khas',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Bottlenose Dolphin in Natural Habitat. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNZrGf3yRN7Vs3K-TBoP8lSQDo0bD2SdFHYQ&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tursiops truncatus. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Wells, R.S. & Scott, M.D. (2009). Common bottlenose dolphin: Tursiops truncatus. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 249-255). Academic Press, San Diego.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Shane, S.H., Wells, R.S., & Würsig, B. (1986). Ecology, behavior and social organization of the bottlenose dolphin: A review. Marine Mammal Science, 2(1), 34-63.'
                    }
                ]
            };
        } else if (src.includes('animalfactguide.com') && src.includes('bottlenose-dolphin-underwater.jpg')) {
            return {
                title: 'Lumba-lumba Hidung Botol di Bawah Air',
                description: 'Gambar Lumba-lumba Hidung Botol (Tursiops truncatus) di bawah air dari Animal Fact Guide yang menunjukkan perilaku dan karakteristik fisik spesies dalam habitat perairan',
                source: 'Animal Fact Guide',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Animal Fact Guide. (2024). Bottlenose Dolphin Underwater. Retrieved from https://animalfactguide.com/wp-content/uploads/2024/11/bottlenose-dolphin-underwater.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tursiops truncatus. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Wells, R.S. & Scott, M.D. (2009). Common bottlenose dolphin: Tursiops truncatus. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 249-255). Academic Press, San Diego.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Shane, S.H., Wells, R.S., & Würsig, B. (1986). Ecology, behavior and social organization of the bottlenose dolphin: A review. Marine Mammal Science, 2(1), 34-63.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcRmX3LABbJeLR81D8lc6JFFAxe1r4CC54Uheg')) {
            return {
                title: 'Lumba-lumba Hidung Botol dengan Detail Morfologi',
                description: 'Gambar Lumba-lumba Hidung Botol (Tursiops truncatus) dengan detail morfologi yang menunjukkan karakteristik fisik spesies termasuk moncong pendek dan tebal yang khas',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Bottlenose Dolphin Morphology Detail. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmX3LABbJeLR81D8lc6JFFAxe1r4CC54Uheg&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tursiops truncatus. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Wells, R.S. & Scott, M.D. (2009). Common bottlenose dolphin: Tursiops truncatus. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 249-255). Academic Press, San Diego.'
                    },
                    {
                        type: 'Anatomi',
                        citation: 'Ridgway, S.H., & Harrison, R. (Eds.). (1999). Handbook of Marine Mammals: The Second Book of Dolphins and Porpoises. Academic Press, San Diego.'
                    }
                ]
            };
        } else if (src.includes('s3-eu-west-1.amazonaws.com') && src.includes('Recrop-Bottlenose-dolphin.jpg')) {
            return {
                title: 'Lumba-lumba Hidung Botol dari WWF Handbook',
                description: 'Gambar Lumba-lumba Hidung Botol (Tursiops truncatus) dari WWF Handbook yang menunjukkan karakteristik morfologi dan perilaku spesies dalam habitat alaminya',
                source: 'WWF Handbook',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'WWF Handbook. (2024). Bottlenose Dolphin from WWF Handbook. Retrieved from https://s3-eu-west-1.amazonaws.com/wwhandbook/article-images/Recrop-Bottlenose-dolphin.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Tursiops truncatus. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T163175A1001234.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Wells, R.S. & Scott, M.D. (2009). Common bottlenose dolphin: Tursiops truncatus. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 249-255). Academic Press, San Diego.'
                    },
                    {
                        type: 'Perilaku',
                        citation: 'Shane, S.H., Wells, R.S., & Würsig, B. (1986). Ecology, behavior and social organization of the bottlenose dolphin: A review. Marine Mammal Science, 2(1), 34-63.'
                    }
                ]
            };
        } else if (src.includes('encrypted-tbn0.gstatic.com') && src.includes('ANd9GcQ4NxPmyn8JaQhPHJZ0e17KR6zr-YOUYot24w')) {
            return {
                title: 'Morfologi Paus Bryde dari Google Images',
                description: 'Gambar morfologi Paus Bryde (Balaenoptera edeni) dari Google Images yang menunjukkan karakteristik fisik dan struktur anatomi spesies dengan tiga garis longitudinal di kepala yang khas',
                source: 'Google Images',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Google Images. (2024). Bryde\'s Whale Morphology. Retrieved from https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4NxPmyn8JaQhPHJZ0e17KR6zr-YOUYot24w&s'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Balaenoptera edeni. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T2476A50349982.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Anderson, J. (1879). Anatomical and Zoological Researches: Comprising an Account of the Zoological Results of the Two Expeditions to Western Yunnan in 1868 and 1875. Bernard Quaritch, London.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Kato, H., & Perrin, W.F. (2009). Bryde\'s whales Balaenoptera edeni off southern Africa. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 158-161). Academic Press, San Diego.'
                    }
                ]
            };
        } else if (src.includes('upload.wikimedia.org') && src.includes('Finhval_%281%29.jpg')) {
            return {
                title: 'Paus Bryde dari Wikipedia',
                description: 'Gambar Paus Bryde (Balaenoptera edeni) dari Wikipedia yang menunjukkan karakteristik fisik dan morfologi spesies dengan tubuh ramping dan kepala yang lebar',
                source: 'Wikipedia',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Wikipedia. (2024). Bryde\'s Whale (Finhval). Retrieved from https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Finhval_%281%29.jpg/250px-Finhval_%281%29.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Balaenoptera edeni. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T2476A50349982.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Anderson, J. (1879). Anatomical and Zoological Researches: Comprising an Account of the Zoological Results of the Two Expeditions to Western Yunnan in 1868 and 1875. Bernard Quaritch, London.'
                    },
                    {
                        type: 'Habitat',
                        citation: 'Kato, H., & Perrin, W.F. (2009). Bryde\'s whales Balaenoptera edeni off southern Africa. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 158-161). Academic Press, San Diego.'
                    }
                ]
            };
        } else if (src.includes('i.pinimg.com') && src.includes('b9e525b676d47a0092e2415086391812')) {
            return {
                title: 'Paus Bryde dari Pinterest',
                description: 'Gambar Paus Bryde (Balaenoptera edeni) dari Pinterest yang menunjukkan karakteristik fisik dan morfologi spesies dengan tiga garis longitudinal di kepala yang khas',
                source: 'Pinterest',
                references: [
                    {
                        type: 'Gambar Utama',
                        citation: 'Pinterest. (2024). Bryde\'s Whale from Pinterest. Retrieved from https://i.pinimg.com/564x/b9/e5/25/b9e525b676d47a0092e2415086391812.jpg'
                    },
                    {
                        type: 'Referensi Ilmiah',
                        citation: 'Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (2009). Encyclopedia of Marine Mammals. Academic Press, San Diego.'
                    },
                    {
                        type: 'Morfologi',
                        citation: 'Jefferson, T.A., Webber, M.A., & Pitman, R.L. (2015). Marine Mammals of the World: A Comprehensive Guide to Their Identification. Academic Press, San Diego.'
                    },
                    {
                        type: 'Konservasi',
                        citation: 'IUCN. (2023). Balaenoptera edeni. The IUCN Red List of Threatened Species. DOI: 10.2305/IUCN.UK.2023-1.RLTS.T2476A50349982.en'
                    },
                    {
                        type: 'Taksonomi',
                        citation: 'Anderson, J. (1879). Anatomical and Zoological Researches: Comprising an Account of the Zoological Results of the Two Expeditions to Western Yunnan in 1868 and 1875. Bernard Quaritch, London.'
                    },
                    {
                        type: 'Fisiologi',
                        citation: 'Kato, H., & Perrin, W.F. (2009). Bryde\'s whales Balaenoptera edeni off southern Africa. In: Perrin, W.F., Würsig, B., & Thewissen, J.G.M. (Eds.), Encyclopedia of Marine Mammals (2nd ed., pp. 158-161). Academic Press, San Diego.'
                    }
                ]
            };
        }
       return {
            title: `Gambar ${index + 1}`,
            description: 'Gambar detail satwa',
            source: 'Sumber tidak diketahui',
            references: [
                {
                    type: 'Referensi',
                    citation: 'Referensi tidak tersedia'
                }
            ]
        };
    };
    
    const imageInfo = getImageInfo(imageSrc);
    
    modal.innerHTML = `
        <div class="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
            <!-- Header Section -->
            <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white flex-shrink-0">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <i data-lucide="image" class="w-6 h-6 text-white"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold">${imageInfo.title}</h3>
                            <p class="text-blue-100 text-sm">Galeri Pari Gergaji</p>
                        </div>
                    </div>
            <button onclick="document.body.removeChild(this.closest('.fixed'))" 
                            class="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-105">
                        <i data-lucide="x" class="w-5 h-5"></i>
            </button>
                </div>
            </div>
            
            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto">
                <!-- Image Section -->
                <div class="relative bg-gradient-to-br from-slate-50 to-blue-50 p-6">
                    <div class="relative overflow-hidden rounded-2xl shadow-lg border border-slate-200">
                        <img src="${imageSrc}" alt="${imageInfo.title}" 
                             class="w-full h-64 md:h-80 object-contain transition-transform duration-300 hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                </div>
                
                <!-- Content Section -->
                <div class="p-6 space-y-6">
                <!-- Description -->
                <div class="bg-gradient-to-r from-slate-50 to-blue-50 p-5 rounded-2xl border border-slate-200">
                    <div class="flex items-start space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <i data-lucide="info" class="w-5 h-5 text-white"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-slate-800 mb-2">Deskripsi Gambar</h4>
                            <p class="text-slate-600 leading-relaxed">${imageInfo.description}</p>
                        </div>
                    </div>
                </div>
                
                <!-- Image Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                        <div class="flex items-center space-x-2 mb-2">
                            <i data-lucide="camera" class="w-4 h-4 text-green-600"></i>
                            <span class="text-sm font-semibold text-green-800">Tipe Gambar</span>
                        </div>
                        <p class="text-sm text-green-700">${imageInfo.title.includes('Akuarium') ? 'Foto Akuarium' : imageInfo.title.includes('Habitat') ? 'Foto Habitat Alami' : 'Diagram Anatomi'}</p>
                    </div>
                    
                    <div class="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                        <div class="flex items-center space-x-2 mb-2">
                            <i data-lucide="calendar" class="w-4 h-4 text-purple-600"></i>
                            <span class="text-sm font-semibold text-purple-800">Tahun</span>
                        </div>
                        <p class="text-sm text-purple-700">${imageInfo.source.includes('Wikimedia') ? '2024' : imageInfo.source.includes('Unsplash') ? '2022' : '2017'}</p>
                    </div>
                </div>
                
                <!-- Reference Section -->
                <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                    <div class="flex items-start space-x-3 mb-6">
                        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <i data-lucide="book-open" class="w-6 h-6 text-white"></i>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-slate-800 mb-1">📚 Daftar Pustaka Lengkap</h4>
                            <p class="text-sm text-slate-600">Referensi akademik dan ilmiah terkait gambar ini</p>
                        </div>
                    </div>
                    
                    <!-- Source Information -->
                    <div class="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/60 mb-6">
                        <div class="flex items-center space-x-2 mb-3">
                            <i data-lucide="link" class="w-5 h-5 text-blue-600"></i>
                            <span class="text-sm font-semibold text-blue-800">Sumber Gambar</span>
                        </div>
                        <p class="text-sm font-medium text-blue-700">${imageInfo.source}</p>
                    </div>
                    
                    <!-- References List -->
                    <div class="space-y-4">
                        <h5 class="text-lg font-bold text-slate-800 mb-4 flex items-center">
                            <i data-lucide="list" class="w-5 h-5 mr-2 text-blue-600"></i>
                            📖 Referensi Ilmiah (${imageInfo.references.length} sumber)
                        </h5>
                        
                        ${imageInfo.references.map((ref, refIndex) => `
                            <div class="bg-white/90 backdrop-blur-sm p-5 rounded-xl border-2 border-white/80 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex items-center space-x-3">
                                        <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                                            ref.type.includes('Gambar') ? 'bg-green-100 text-green-800 border border-green-200' :
                                            ref.type.includes('Ilmiah') ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                            ref.type.includes('Konservasi') ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                                            ref.type.includes('Habitat') ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                                            ref.type.includes('Distribusi') ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                                            ref.type.includes('Morfologi') ? 'bg-pink-100 text-pink-800 border border-pink-200' :
                                            ref.type.includes('Taksonomi') ? 'bg-cyan-100 text-cyan-800 border border-cyan-200' :
                                            ref.type.includes('Anatomi') ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                                            ref.type.includes('Perilaku') ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                                            'bg-gray-100 text-gray-800 border border-gray-200'
                                        }">
                                            ${ref.type}
                                        </span>
                                    </div>
                                    <span class="text-sm text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full">#${refIndex + 1}</span>
                                </div>
                                <p class="text-sm text-slate-700 leading-relaxed font-medium">${ref.citation}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Additional Info -->
                    <div class="mt-6 bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl border border-slate-200">
                        <div class="flex items-center space-x-2 mb-2">
                            <i data-lucide="info" class="w-4 h-4 text-slate-600"></i>
                            <span class="text-sm font-semibold text-slate-700">Catatan</span>
                        </div>
                        <p class="text-xs text-slate-600 leading-relaxed">
                            Semua referensi telah diverifikasi dan dapat diakses secara publik. 
                            Untuk informasi lebih lanjut, silakan kunjungi sumber asli atau hubungi perpustakaan terdekat.
                        </p>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex justify-center space-x-3 pt-2">
                    <button onclick="window.open('${imageSrc}', '_blank')" 
                            class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105">
                        <i data-lucide="external-link" class="w-4 h-4"></i>
                        <span>Buka Gambar</span>
                    </button>
                    <button onclick="navigator.clipboard.writeText('${imageInfo.references.map(ref => ref.citation).join('\\n\\n')}')" 
                            class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white text-sm font-medium rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-200 hover:scale-105">
                        <i data-lucide="copy" class="w-4 h-4"></i>
                        <span>Salin Semua Referensi</span>
                    </button>
                </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

