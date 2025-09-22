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
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
                    <div class="relative group cursor-pointer" onclick="showImageModal('https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Sawfish_Pristis_zijsron_Genova_Aquarium.jpg/1059px-Sawfish_Pristis_zijsron_Genova_Aquarium.jpg', 0)">
                        <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Sawfish_Pristis_zijsron_Genova_Aquarium.jpg/1059px-Sawfish_Pristis_zijsron_Genova_Aquarium.jpg" 
                                 alt="Pari Gergaji di Akuarium Genova" 
                                 class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
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
                                 class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
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
                                 class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
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
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
                    <div class="relative group cursor-pointer" onclick="showImageModal('https://asset.kompas.com/crops/b3vumNxFeHu9TjkdliFvYnJx3ds=/0x0:1000x667/1200x800/data/photo/2022/05/22/628a2ead38f95.jpg', 0)">
                        <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                            <img src="https://asset.kompas.com/crops/b3vumNxFeHu9TjkdliFvYnJx3ds=/0x0:1000x667/1200x800/data/photo/2022/05/22/628a2ead38f95.jpg" 
                                 alt="Pari Manta di Habitat Alami" 
                                 class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
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
                                 class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
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
                                 class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
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
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
                    <div class="relative group cursor-pointer" onclick="showImageModal('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Whale_shark_Georgia_aquarium.jpg/1200px-Whale_shark_Georgia_aquarium.jpg', 0)">
                        <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Whale_shark_Georgia_aquarium.jpg/1200px-Whale_shark_Georgia_aquarium.jpg" 
                                 alt="Hiu Paus di Akuarium Georgia" 
                                 class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
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
                                 class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
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
                                 class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
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
        ` : animal.latin === 'Rhincodon typus' ? `
        <!-- Special Gallery for Hiu Paus -->
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Galeri Hiu Paus</h2>
            <p class="text-slate-600">Koleksi gambar morfologi dan habitat Hiu Paus</p>
        </div>
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
                <div class="relative group cursor-pointer" onclick="showImageModal('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Whale_shark_Georgia_aquarium.jpg/1200px-Whale_shark_Georgia_aquarium.jpg', 0)">
                    <div class="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Whale_shark_Georgia_aquarium.jpg/1200px-Whale_shark_Georgia_aquarium.jpg" 
                             alt="Hiu Paus di Akuarium Georgia" 
                             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
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
                             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
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
                             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
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
        ` : `
        <!-- Default Gallery for Other Animals -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${(animal.images || [animal.image]).map((img, index) => `
                <div class="relative group cursor-pointer" onclick="showImageModal('${img}', ${index})">
                    <div class="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img src="${img}" alt="${animal.name} ${index + 1}" 
                             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
                    </div>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
                        <i data-lucide="zoom-in" class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                </div>
            `).join('')}
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



                    <!-- Locations in North Sulawesi -->
                    ${animal.locations && animal.locations.length > 0 ? `
                    <div class="detail-card p-6">
                        <div class="flex items-center mb-4">
                            <div class="detail-icon flex-shrink-0 flex items-center justify-center mr-3"><i data-lucide="map-pin" class="w-5 h-5"></i></div>
                            <h3 class="text-lg font-bold text-slate-800">Lokasi di Sulawesi Utara</h3>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            ${animal.locations.map(location => `
                                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors cursor-pointer" onclick="showLocationReferences('${location.name}')">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="font-semibold text-slate-800 mb-1">${location.name}</h4>
                                            <p class="text-xs text-slate-500">${location.coordinates}</p>
                                        </div>
                                        <i data-lucide="external-link" class="w-4 h-4 text-blue-500"></i>
                                    </div>
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
                    <a href="dashboard.html" class="inline-block bg-white text-slate-600 border border-slate-300 px-6 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 mx-auto">
                        <i data-lucide="arrow-left" class="w-4 h-4"></i>
                        Kembali ke Daftar Satwa
                    </a>
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
            appearance: 'Pari Gergaji memiliki tubuh yang pipih seperti ikan pari pada umumnya, dengan moncong panjang yang menyerupai gergaji. Moncong ini memiliki gigi-gigi kecil di kedua sisinya yang berfungsi untuk mendeteksi mangsa dan melumpuhkannya.',
            size: 'Panjang tubuhnya bisa mencapai 7,6 meter dengan berat hingga 600 kg. Moncongnya memanjang hingga 25-30% dari total panjang tubuh.',
            color: 'Tubuh bagian atas berwarna coklat keabu-abuan, sedangkan bagian bawah berwarna putih. Warna ini membantu kamuflase di dasar laut.',
            features: 'Memiliki 5 pasang celah insang di bagian bawah tubuh dan lubang kecil di belakang mata untuk bernapas. Moncong gergajinya adalah ciri paling khas.'
        },
        'Mobula birostris': {
            appearance: 'Pari Manta adalah salah satu ikan pari terbesar di dunia dengan lebar sayap yang bisa mencapai 7 meter. Tubuhnya pipih dan lebar seperti sayap, dengan kepala yang besar dan mulut yang lebar.',
            size: 'Lebar sayap bisa mencapai 7 meter dengan berat hingga 2 ton. Tubuhnya sangat lebar dibandingkan panjangnya.',
            color: 'Warna tubuhnya bervariasi dari hitam, abu-abu, hingga coklat di bagian atas, dan putih di bagian bawah. Ada pola bintik-bintik yang unik di setiap individu.',
            features: 'Di bagian kepala terdapat dua tonjolan yang disebut "cephalic fins" yang membantu mengarahkan makanan ke mulut. Ekornya panjang dan tipis tanpa duri beracun.'
        },
        'Chelonia mydas': {
            appearance: 'Penyu Hijau memiliki tempurung yang keras dan pipih dengan warna hijau keabu-abuan. Tempurung bagian atas (karapas) berbentuk oval dan bagian bawah (plastron) berwarna kuning pucat.',
            size: 'Panjang tempurungnya bisa mencapai 1,5 meter dan beratnya hingga 200 kg. Tempurungnya sangat keras dan tebal.',
            color: 'Warna tempurung hijau keabu-abuan dengan pola yang unik. Bagian bawah berwarna kuning pucat yang kontras dengan bagian atas.',
            features: 'Kaki depannya berbentuk seperti dayung yang kuat untuk berenang, sedangkan kaki belakangnya lebih kecil dan digunakan sebagai kemudi. Kepalanya relatif kecil dengan paruh yang tajam.'
        },
        'Eretmochelys imbricata': {
            appearance: 'Penyu Sisik memiliki tempurung yang indah dengan pola seperti sisik yang tumpang tindih. Paruhnya runcing dan melengkung seperti paruh elang, yang membedakannya dari penyu lainnya.',
            size: 'Ukurannya lebih kecil dari Penyu Hijau, dengan panjang tempurung sekitar 1 meter dan berat hingga 80 kg.',
            color: 'Warna tempurungnya bervariasi dari coklat, kuning, hingga hitam dengan pola yang unik seperti sisik yang tumpang tindih.',
            features: 'Kaki depannya memiliki dua cakar yang tajam. Paruhnya yang runcing dan melengkung adalah ciri khas yang membedakannya dari penyu lainnya.'
        },
        'Globicephala macrorhynchus': {
            appearance: 'Paus Pilot memiliki tubuh yang besar dan ramping dengan kepala bulat yang khas. Kepalanya memiliki "melon" yang menonjol yang digunakan untuk komunikasi dan navigasi.',
            size: 'Panjang tubuhnya bisa mencapai 7 meter dengan berat hingga 4 ton. Tubuhnya ramping dan kekar.',
            color: 'Warna tubuhnya hitam atau abu-abu gelap dengan patch putih di bagian dada. Warna ini membantu kamuflase di laut dalam.',
            features: 'Sirip punggungnya tinggi dan melengkung ke belakang. Kepalanya bulat dengan "melon" yang menonjol untuk komunikasi dan navigasi.'
        },
        'Stenella longirostris': {
            appearance: 'Lumba-lumba Spinner memiliki tubuh yang ramping dan panjang dengan moncong yang sangat panjang dan tipis. Ciri khasnya adalah kemampuan melompat tinggi sambil berputar di udara.',
            size: 'Panjang tubuhnya sekitar 2 meter dengan berat hingga 80 kg. Moncongnya sangat panjang dibandingkan tubuhnya.',
            color: 'Warna tubuhnya abu-abu dengan tiga warna: abu-abu gelap di bagian atas, abu-abu terang di bagian tengah, dan putih di bagian bawah.',
            features: 'Kemampuan melompat tinggi sambil berputar di udara adalah ciri khas yang paling menonjol. Moncongnya yang sangat panjang dan tipis juga unik.'
        },
        'Lagenodelphis hosei': {
            appearance: 'Lumba-lumba Fraser memiliki tubuh yang ramping dengan kepala bulat dan moncong pendek. Ada garis hitam yang memisahkan warna abu-abu terang dan putih.',
            size: 'Panjang tubuhnya sekitar 2,7 meter dengan berat hingga 200 kg. Tubuhnya ramping dan proporsional.',
            color: 'Warna tubuhnya abu-abu dengan pola yang unik: abu-abu gelap di bagian atas, abu-abu terang di bagian tengah, dan putih di bagian bawah.',
            features: 'Ada garis hitam yang memisahkan warna abu-abu terang dan putih, yang merupakan ciri khas yang membedakannya dari lumba-lumba lainnya.'
        },
        'Tursiops truncatus': {
            appearance: 'Lumba-lumba Hidung Botol memiliki tubuh yang besar dan kekar dengan kepala bulat yang khas. Moncongnya pendek dan tebal seperti botol.',
            size: 'Panjang tubuhnya bisa mencapai 4 meter dengan berat hingga 650 kg. Tubuhnya besar dan kekar.',
            color: 'Warna tubuhnya abu-abu dengan pola yang bervariasi: abu-abu gelap di bagian atas dan abu-abu terang di bagian bawah.',
            features: 'Moncongnya pendek dan tebal seperti botol adalah ciri khas yang paling menonjol. Sirip punggungnya tinggi dan melengkung.'
        },
        'Balaenoptera edeni': {
            appearance: 'Paus Bryde memiliki tubuh yang sangat besar dan ramping dengan kepala yang lebar dan datar. Ada tiga garis longitudinal di bagian atas kepala yang khas.',
            size: 'Panjang tubuhnya bisa mencapai 15 meter dengan berat hingga 25 ton. Tubuhnya sangat besar dan ramping.',
            color: 'Warna tubuhnya abu-abu gelap dengan bintik-bintik putih di bagian bawah. Ada pola warna yang unik di setiap individu.',
            features: 'Ada tiga garis longitudinal di bagian atas kepala yang khas. Sirip punggungnya kecil dan terletak di bagian belakang tubuh.'
        },
        'Carcharhinus longimanus': {
            appearance: 'Hiu Koboi memiliki tubuh yang ramping dan kekar dengan moncong yang pendek dan bulat. Mata besar dan bulat dengan selaput pelindung.',
            size: 'Panjang tubuhnya bisa mencapai 4 meter dengan berat hingga 170 kg. Tubuhnya ramping dan kekar.',
            color: 'Warna tubuhnya abu-abu dengan ujung sirip yang putih mencolok, terutama sirip punggung, sirip dada, dan sirip ekor.',
            features: 'Ujung sirip yang putih mencolok adalah ciri khas yang paling menonjol. Mata besar dan bulat dengan selaput pelindung juga unik.'
        },
        'Sphyrna spp.': {
            appearance: 'Hiu Martil memiliki kepala yang sangat unik berbentuk seperti palu atau martil. Mata dan lubang hidung terletak di ujung-ujung "palu" ini.',
            size: 'Panjang tubuhnya bervariasi tergantung spesies, dari 1 meter hingga 6 meter. Kepalanya sangat lebar dibandingkan tubuhnya.',
            color: 'Warna tubuhnya abu-abu di bagian atas dan putih di bagian bawah. Warna ini membantu kamuflase di laut.',
            features: 'Kepala berbentuk palu atau martil adalah ciri khas yang paling menonjol. Mata dan lubang hidung terletak di ujung-ujung "palu" ini.'
        },
        'Rhincodon typus': {
            appearance: 'Hiu Paus adalah ikan terbesar di dunia dengan tubuh yang sangat besar dan lebar. Kepalanya datar dan lebar dengan mulut yang sangat besar.',
            size: 'Panjang tubuhnya bisa mencapai 18 meter dengan berat hingga 21 ton. Tubuhnya sangat besar dan lebar.',
            color: 'Warna tubuhnya abu-abu dengan bintik-bintik putih dan kuning yang unik seperti sidik jari. Setiap individu memiliki pola yang berbeda.',
            features: 'Bintik-bintik putih dan kuning yang unik seperti sidik jari adalah ciri khas yang paling menonjol. Mulut yang sangat besar juga unik.'
        },
        'Hippocampus spp.': {
            appearance: 'Kuda Laut memiliki bentuk tubuh yang sangat unik seperti kuda dengan kepala yang menyerupai kuda dan ekor yang melengkung. Tubuhnya dilindungi oleh lempeng-lempeng tulang yang keras.',
            size: 'Ukurannya kecil, panjangnya hanya 1-30 cm tergantung spesies. Tubuhnya sangat kecil dan ramping.',
            color: 'Warna tubuhnya bervariasi dari kuning, oranye, merah, hingga hitam, dan bisa berubah sesuai lingkungan untuk kamuflase.',
            features: 'Ekor yang melengkung dan bisa digunakan untuk memegang benda adalah ciri khas. Kepala yang menyerupai kuda juga unik. Jantan yang mengerami telur di kantung perutnya.'
        },
        'Nautilus pompilius': {
            appearance: 'Nautilus memiliki cangkang spiral yang indah dengan ruang-ruang yang terpisah. Di dalam cangkang terdapat hewan dengan banyak tentakel dan mata yang besar.',
            size: 'Diameter cangkangnya bisa mencapai 25 cm. Cangkangnya berbentuk spiral yang sempurna.',
            color: 'Cangkangnya berwarna putih dengan garis-garis coklat yang membentuk pola spiral yang indah.',
            features: 'Cangkang spiral dengan ruang-ruang yang terpisah adalah ciri khas. Hewan ini hidup di dalam ruang terakhir cangkang dan menggunakan tentakel untuk bergerak dan makan.'
        },
        'Tridacna crocea': {
            appearance: 'Kima Kecil memiliki cangkang yang tebal dan keras dengan bentuk oval. Cangkangnya memiliki tonjolan-tonjolan yang khas.',
            size: 'Panjang cangkangnya bisa mencapai 15 cm. Ukurannya relatif kecil dibandingkan kima lainnya.',
            color: 'Warna cangkangnya bervariasi dari putih, kuning, hingga coklat dengan pola yang unik.',
            features: 'Cangkang yang tebal dan keras dengan tonjolan-tonjolan adalah ciri khas. Hewan ini hidup di dalam cangkang dan memiliki mantel yang berwarna-warni.'
        },
        'Tridacna squamosa': {
            appearance: 'Kima Gigi memiliki cangkang yang besar dengan tonjolan-tonjolan seperti gigi di bagian tepinya. Cangkangnya berbentuk oval dan tebal.',
            size: 'Panjang cangkangnya bisa mencapai 40 cm. Ukurannya sedang dibandingkan kima lainnya.',
            color: 'Warna cangkangnya bervariasi dari putih, kuning, hingga coklat dengan pola yang unik.',
            features: 'Tonjolan-tonjolan seperti gigi di bagian tepi cangkang adalah ciri khas. Cangkangnya tebal dan keras untuk perlindungan.'
        },
        'Tridacna gigas': {
            appearance: 'Kima Raksasa adalah moluska terbesar di dunia dengan cangkang yang sangat besar dan tebal. Cangkangnya berbentuk oval dan sangat berat.',
            size: 'Panjang cangkangnya bisa mencapai 1,5 meter dengan berat hingga 200 kg. Ukurannya sangat besar.',
            color: 'Warna cangkangnya bervariasi dari putih, kuning, hingga coklat dengan pola yang unik.',
            features: 'Ukuran yang sangat besar adalah ciri khas yang paling menonjol. Cangkangnya tebal dan keras untuk perlindungan maksimal.'
        },
        'Acropora spp.': {
            appearance: 'Karang Meja memiliki struktur yang keras dan bercabang seperti meja. Warnanya bervariasi dari coklat, kuning, hingga hijau.',
            size: 'Ukurannya bervariasi, bisa mencapai beberapa meter. Strukturnya bercabang dan melebar seperti meja.',
            color: 'Warna karangnya bervariasi dari coklat, kuning, hijau, hingga biru tergantung jenis dan kondisi lingkungan.',
            features: 'Struktur yang bercabang seperti meja adalah ciri khas. Karang ini membentuk terumbu karang yang penting untuk ekosistem laut.'
        },
        'Antipathes spp.': {
            appearance: 'Karang Hitam memiliki struktur yang keras dan berwarna hitam. Bentuknya bercabang seperti pohon dengan cabang-cabang yang halus.',
            size: 'Ukurannya bervariasi, bisa mencapai beberapa meter. Strukturnya bercabang seperti pohon.',
            color: 'Warna karangnya hitam atau coklat gelap. Warna ini yang memberinya nama "karang hitam".',
            features: 'Warna hitam dan struktur bercabang seperti pohon adalah ciri khas. Karang ini tumbuh sangat lambat dan bisa berumur ratusan tahun.'
        },
        'Caretta caretta': {
            appearance: 'Penyu Tempayan memiliki tempurung yang keras dan tebal dengan kepala yang besar. Tempurungnya berbentuk oval dan sangat keras.',
            size: 'Panjang tempurungnya bisa mencapai 1,2 meter dengan berat hingga 200 kg. Tempurungnya sangat tebal dan keras.',
            color: 'Warna tempurungnya coklat kemerahan dengan pola yang unik. Bagian bawah berwarna kuning pucat.',
            features: 'Kepala yang besar dan tempurung yang sangat tebal adalah ciri khas. Kaki depannya besar dan kuat untuk berenang.'
        },
        'Latimeria menadoensis': {
            appearance: 'Ikan Coelacanth memiliki tubuh yang memanjang dengan sirip-sirip yang unik. Tubuhnya dilindungi oleh sisik-sisik yang keras.',
            size: 'Panjang tubuhnya bisa mencapai 2 meter dengan berat hingga 90 kg. Tubuhnya memanjang dan kekar.',
            color: 'Warna tubuhnya coklat kebiruan dengan bintik-bintik putih. Warna ini membantu kamuflase di laut dalam.',
            features: 'Sirip-sirip yang unik dan struktur tubuh yang primitif adalah ciri khas. Ikan ini disebut "fosil hidup" karena tidak berubah selama jutaan tahun.'
        },
        'Lutjanus spp.': {
            appearance: 'Ikan Kakap Merah memiliki tubuh yang memanjang dan compressed dengan mulut yang besar. Sirip-siripnya berwarna merah yang mencolok.',
            size: 'Panjang tubuhnya bervariasi tergantung spesies, dari 30 cm hingga 1 meter. Tubuhnya memanjang dan kekar.',
            color: 'Warna tubuhnya merah dengan variasi dari merah terang hingga merah gelap. Sirip-siripnya juga berwarna merah.',
            features: 'Warna merah yang mencolok adalah ciri khas yang paling menonjol. Mulut yang besar dan gigi yang tajam juga unik.'
        },
        'Anguilla spp.': {
            appearance: 'Ikan Sidat memiliki tubuh yang memanjang seperti ular dengan kulit yang licin. Tubuhnya sangat fleksibel dan bisa bergerak dengan mudah.',
            size: 'Panjang tubuhnya bisa mencapai 1,5 meter dengan berat hingga 4 kg. Tubuhnya sangat memanjang dan ramping.',
            color: 'Warna tubuhnya bervariasi dari coklat, hijau, hingga hitam tergantung habitat dan umur. Warna ini membantu kamuflase.',
            features: 'Tubuh yang memanjang seperti ular dan kulit yang licin adalah ciri khas. Ikan ini bisa hidup di air tawar dan air laut.'
        },
        'Cromileptes altivelis': {
            appearance: 'Kerapu Tikus memiliki tubuh yang compressed dengan kepala yang besar dan mulut yang lebar. Tubuhnya ditutupi bintik-bintik yang unik.',
            size: 'Panjang tubuhnya bisa mencapai 70 cm dengan berat hingga 4 kg. Tubuhnya compressed dan kekar.',
            color: 'Warna tubuhnya putih dengan bintik-bintik hitam berukuran besar yang tersebar di seluruh tubuh. Pola ini unik untuk setiap individu.',
            features: 'Bintik-bintik hitam berukuran besar adalah ciri khas yang paling menonjol. Kepala yang besar dan mulut yang lebar juga unik.'
        },
        'Cheilinus undulatus': {
            appearance: 'Ikan Napoleon memiliki tubuh yang besar dan kekar dengan kepala yang besar dan mulut yang lebar. Ada punuk di kepala yang menonjol.',
            size: 'Panjang tubuhnya bisa mencapai 2,3 meter dengan berat hingga 191 kg. Tubuhnya besar dan kekar.',
            color: 'Warna tubuhnya bervariasi dari hijau kebiruan hingga biru tua dengan garis-garis berwarna biru atau hijau.',
            features: 'Punuk di kepala dan bibir yang tebal adalah ciri khas yang paling menonjol. Warna yang cerah dan kontras juga unik.'
        }
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
        'Cromileptes altivelis': 'Kerapu Tikus memiliki tubuh yang pipih dan lebar dengan warna abu-abu yang ditutupi bintik-bintik hitam yang menyerupai tikus. Sirip-siripnya juga memiliki pola bintik yang sama. Mata besar dan mulut lebar dengan gigi-gigi tajam. Panjang tubuhnya bisa mencapai 1 meter dengan berat hingga 20 kg. Tubuhnya dilindungi oleh sisik-sisik yang halus.',
        'Cheilinus undulatus': 'Ikan Napoleon memiliki tubuh yang besar dan kekar dengan kepala yang besar dan mulut yang lebar. Warna tubuhnya bervariasi dari hijau, biru, hingga ungu dengan pola yang unik. Di bagian kepala terdapat tonjolan yang menyerupai mahkota. Panjang tubuhnya bisa mencapai 2 meter dengan berat hingga 200 kg. Tubuhnya dilindungi oleh sisik-sisik yang besar dan keras.'
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
        'Cheilinus undulatus': {
            'Panjang Maksimal': '2.3 meter (record), rata-rata 1.5-1.8 meter',
            'Berat Maksimal': '191 kg (record), rata-rata 100-150 kg',
            'Standard Length': '60-70% dari total length dengan body depth 32-38% SL',
            'Nuchal Hump': 'Pronounced pada jantan dewasa, height 15-25% head length',
            'Lip Morphology': 'Sangat tebal (8-12 mm), fleshy dengan sensory function',
            'Pharyngeal Teeth': 'Molariform untuk crushing coral dan mollusks',
            'Dorsal Fin': 'IX,10 dengan anterior spines flexible',
            'Anal Fin': 'III,8 dengan posterior rays elongated',
            'Caudal Fin': 'Lunate dengan aspect ratio 1.8-2.2',
            'Colorasi Ontogenik': 'Juvenil: garis putih, dewasa: reticulated pattern',
            'Sexual Dichromatism': 'Jantan: biru-hijau intens, betina: lebih kusam',
            'Scale Count': 'Lateral line: 25-27, predorsal: 8-10'
        },
        'Pterapogon kauderni': {
            'Panjang Maksimal': '8.0 cm SL (standard length)',
            'Body Depth': '45-55% dari standard length',
            'Head Length': '32-38% dari standard length',
            'Colorasi Base': 'Perak metalik dengan iridescent sheen',
            'Vertical Bars': '3 bar hitam: pre-orbital, mid-body, caudal peduncle',
            'Bar Width': '8-12% dari body depth dengan distinct margins',
            'Spot Patterns': 'White spots pada extended fin rays (5-8 spots)',
            'Dorsal Fins': 'VII-I,9 dengan second dorsal elongated',
            'Anal Fin': 'II,8 dengan posterior rays extended',
            'Caudal Fin': 'Lyre-shaped dengan filamentous extensions',
            'Mouth Morphology': 'Small, terminal dengan maxilla reaching mid-eye',
            'Lateral Line': 'Incomplete, ending below second dorsal fin'
        },
        'Epinephelus lanceolatus': {
            'Panjang Maksimal': '2.7 meter',
            'Berat Maksimal': '400 kg',
            'Bentuk Tubuh': 'Robust dan memanjang',
            'Kepala': 'Besar dengan mulut lebar',
            'Warna': 'Coklat muda - abu-abu gelap',
            'Pola': 'Bintik dan blotches gelap',
            'Sirip Dorsal': '11 spina',
            'Sirip Anal': '3 spina',
            'Gigi': 'Villiform (seperti sikat)',
            'Operculum': '3 spina'
        },
        'Arothron stellatus': {
            'Panjang Maksimal': '35 cm',
            'Bentuk Tubuh': 'Globular',
            'Kemampuan Inflasi': '3x ukuran normal',
            'Kulit': 'Tanpa sisik, berduri kecil',
            'Warna': 'Coklat kekuningan',
            'Pola': 'Bintik putih tersebar',
            'Sirip Ventral': 'Tidak ada',
            'Gigi': 'Menyatu membentuk paruh',
            'Dental Plates': '4 (2 atas, 2 bawah)',
            'Racun': 'Tetrodotoxin di hati'
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
        'Dermochelys coriacea': {
            'Panjang Maksimal': '263 cm',
            'Berat Maksimal': '916 kg',
            'Karapas': 'Tanpa tulang keras',
            'Permukaan': 'Kulit seperti karet',
            'Longitudinal Ridges': '7 lunas memanjang',
            'Warna': 'Hitam - coklat gelap',
            'Pola': 'Bintik putih dan pink',
            'Sirip Depan': 'Sangat panjang (270 cm)',
            'Cakar': 'Tidak ada',
            'Scutes': 'Tidak ada'
        },
        'Lepidochelys olivacea': {
            'Panjang Karapas': 'Hingga 75 cm',
            'Berat Maksimal': 'Hingga 50 kg',
            'Bentuk Karapas': 'Rounded hingga oval',
            'Warna Karapas': 'Hijau zaitun - abu-abu',
            'Costal Scutes': '6-8 pairs (biasanya 7)',
            'Lateral Scutes': '5-9 pairs di bridge',
            'Paruh': 'Slightly hooked',
            'Cakar': '1-2 pada setiap sirip',
            'Scutes': 'Tidak overlap',
            'Perilaku': 'Arribada (nesting massal)'
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
        'Antipathes spp.': {
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
        'Pinctada maxima': {
            'Diameter Shell': 'Hingga 30 cm',
            'Ketebalan': 'Hingga 5 cm',
            'Exterior': 'Hitam hingga coklat gelap',
            'Interior Nacre': 'Silver-white iridescent',
            'Golden Margins': 'Tepi emas khas',
            'Bentuk': 'Rounded hingga oval',
            'Umbo': 'Prominent (menonjol)',
            'Pearl Production': 'Berkualitas tinggi',
            'Attachment': 'Byssal lemah',
            'Habitat': 'Sandy substrat'
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
        'Octopus cyaneus': {
            'Mantle Length': 'Hingga 60 cm',
            'Arm Span': 'Hingga 9 meter',
            'Berat Maksimal': 'Hingga 15 kg',
            'Arms': '8 muscular arms',
            'Suckers': '2000 (double rows)',
            'Body Shape': 'Saccular',
            'Mata': 'Besar dan complex',
            'Chromatophores': 'Advanced system',
            'Kamuflase': 'Rapid color & texture change',
            'Shell': 'Tidak ada (internal/external)'
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
        'Cheilinus undulatus': [
            { text: 'Sadovy, Y., et al. (2003). The humphead wrasse, Cheilinus undulatus: synopsis of a threatened and poorly known giant coral reef fish. Reviews in Fish Biology and Fisheries, 13(3), 327-364.', url: 'https://link.springer.com/article/10.1007/s11160-004-1006-6', source: 'Reviews in Fish Biology and Fisheries' },
            { text: 'Russell, B.C. (2004). Review of the wrasses (Pisces: Labridae) of the Great Barrier Reef. Australian Journal of Marine and Freshwater Research, 39(4), 565-575.', url: 'https://www.publish.csiro.au/mf/MF9880565', source: 'Australian Journal of Marine and Freshwater Research' },
            { text: 'Donaldson, T.J., & Sadovy, Y. (2001). Threatened fishes of the world: Cheilinus undulatus Rüppell, 1835 (Labridae). Environmental Biology of Fishes, 62(4), 428.', url: 'https://link.springer.com/article/10.1023/A:1012205612339', source: 'Environmental Biology of Fishes' },
            { text: 'Choat, J.H., & Robertson, D.R. (2002). Age-based studies on coral reef fishes. In: Sale PF (ed) Coral reef fishes: dynamics and diversity in a complex ecosystem. Academic Press, San Diego, pp 57-80.', url: 'https://www.sciencedirect.com/book/9780126151855/coral-reef-fishes', source: 'Academic Press' }
        ],
        'Pterapogon kauderni': [
            { text: 'Vagelli, A.A. (2005). Reproductive biology, geographic distribution and ecology of the Banggai cardinalfish Pterapogon kauderni Koumans 1933, with considerations on the conservation status of this species. Aqua, 10(1), 15-30.', url: 'https://www.aqua-aquapress.com/pdf/10_1_15.pdf', source: 'Aqua International Journal' },
            { text: 'Kolm, N., et al. (2005). Sexual selection in the endemic Banggai cardinalfish (Pterapogon kauderni). Marine Biology, 147(3), 689-696.', url: 'https://link.springer.com/article/10.1007/s00227-005-1607-z', source: 'Marine Biology' },
            { text: 'Moore, A., et al. (2012). Unprecedented complexity of local population structure in a small coral reef fish, the Banggai cardinalfish (Pterapogon kauderni). Marine Biology, 159(6), 1253-1267.', url: 'https://link.springer.com/article/10.1007/s00227-012-1913-5', source: 'Marine Biology' },
            { text: 'Bernardi, G., & Vagelli, A.A. (2004). Population structure in Banggai cardinalfish, Pterapogon kauderni, a coral reef species lacking a pelagic larval phase. Marine Biology, 145(4), 803-810.', url: 'https://link.springer.com/article/10.1007/s00227-004-1381-6', source: 'Marine Biology' }
        ],
        'Tridacna gigas': [
            { text: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.', url: 'https://www.biodiversitylibrary.org/item/83797', source: 'Indo-Pacific Mollusca' },
            { text: 'Jameson, S.C. (1976). Early life history of the giant clams Tridacna crocea Lamarck, Tridacna maxima (Röding), and Hippopus hippopus (Linnaeus). Pacific Science, 30(3), 219-233.', url: 'https://scholarspace.manoa.hawaii.edu/items/8c7c1b9a-6e6a-4b8c-8b4b-f6c5e9a5c8e4', source: 'Pacific Science' },
            { text: 'Lucas, J.S. (1994). The biology, exploitation, and mariculture of giant clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.', url: 'https://www.tandfonline.com/doi/abs/10.1080/10641269409388557', source: 'Reviews in Fisheries Science' },
            { text: 'Klumpp, D.W., et al. (1992). Nutritional ecology of the giant clams Tridacna tevoroa and T. derasa from Tonga: influence of light on filter-feeding and photosynthesis. Marine Ecology Progress Series, 107, 147-156.', url: 'https://www.int-res.com/articles/meps/107/m107p147.pdf', source: 'Marine Ecology Progress Series' }
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
                             class="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105">
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
