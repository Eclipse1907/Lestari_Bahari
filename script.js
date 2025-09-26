// JavaScript untuk Lestari Bahari
// BKHIT Sulawesi Utara - Aktualisasi CPNS

// Data gambar hewan yang sudah diisi
const animalImages = {
    'Chondrichthyes (Hiu & Pari)': [
        {
            name: 'Pari Gergaji',
            latin: 'Pristis spp.',
            image: 'https://www.greeners.co/wp-content/uploads/2019/01/Hiu-Gergaji.jpg',
            images: [
                'https://www.greeners.co/wp-content/uploads/2019/01/Hiu-Gergaji.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Sawfish_Pristis_zijsron_Genova_Aquarium.jpg/1059px-Sawfish_Pristis_zijsron_Genova_Aquarium.jpg',
                'https://b3268101.smushcdn.com/3268101/wp-content/uploads/2022/12/david-clode-fZu1iB6QxyQ-unsplash-1024x711.jpg?lossy=2&strip=1&webp=1',
                'https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/66/2017/05/lesson_sawfish-anatomy_large.jpg'
            ]
        },
        {
            name: 'Pari Manta',
            latin: 'Mobula birostris',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2R0sVzWEj3S2Wjj1kqWRg7_DQTghUpGj5ZvLOMslqa_OyEqYFLddo-lorHy8P6slMZWw&usqp=CAU',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2R0sVzWEj3S2Wjj1kqWRg7_DQTghUpGj5ZvLOMslqa_OyEqYFLddo-lorHy8P6slMZWw&usqp=CAU',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Reef_manta_ray_-_Kaafu_Atoll%2C_Maldives.jpg/640px-Reef_manta_ray_-_Kaafu_Atoll%2C_Maldives.jpg',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Hiu Paus',
            latin: 'Rhincodon typus',
            image: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Whale_shark_Georgia_aquarium.jpg',
            images: [
                'https://upload.wikimedia.org/wikipedia/commons/f/f1/Whale_shark_Georgia_aquarium.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Hiu Martil',
            latin: 'Sphyrna spp.',
            image: 'https://digitani.ipb.ac.id/wp-content/uploads/2025/02/hiu-martil.png',
            images: [
                'https://digitani.ipb.ac.id/wp-content/uploads/2025/02/hiu-martil.png',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Hiu Koboi',
            latin: 'Carcharhinus longimanus',
            image: 'https://image.idntimes.com/post/20240528/oceanic-whitetip-shark-at-elphinstone-reef-726107e6cb24f94eb96bf875ffbf43f3-c90c2834059a7e235c0fbb90a43d0d3c.jpg?tr=w-1200,f-webp,q-75&width=1200&format=webp&quality=75',
            images: [
                'https://image.idntimes.com/post/20240528/oceanic-whitetip-shark-at-elphinstone-reef-726107e6cb24f94eb96bf875ffbf43f3-c90c2834059a7e235c0fbb90a43d0d3c.jpg?tr=w-1200,f-webp,q-75&width=1200&format=webp&quality=75',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        }
    ],
    'Osteichthyes (Ikan Bertulang Keras)': [
        {
            name: 'Ikan Napoleon',
            latin: 'Cheilinus undulatus',
            image: 'https://api.gardaanimalia.com/storage/articles/featured/featured_ikan-napoleon-sang-top-predator-yang-bisa-berubah-jenis-kelaminnya_1748515588.webp',
            images: [
                'https://api.gardaanimalia.com/storage/articles/featured/featured_ikan-napoleon-sang-top-predator-yang-bisa-berubah-jenis-kelaminnya_1748515588.webp',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Ikan Belida',
            latin: 'Notopterus chitala',
            image: 'https://rsum.bandaacehkota.go.id/wp-content/uploads/2025/01/ikan-belinda.webp',
            images: [
                'https://rsum.bandaacehkota.go.id/wp-content/uploads/2025/01/ikan-belinda.webp',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Ikan Coelacanth',
            latin: 'Latimeria menadoensis',
            image: 'https://asset.kompas.com/crops/wUsvHUbRK9Kv_tBro-IkME3d-_U=/10x10:740x497/1200x800/data/photo/2023/05/08/6458772a04483.jpeg',
            images: [
                'https://asset.kompas.com/crops/wUsvHUbRK9Kv_tBro-IkME3d-_U=/10x10:740x497/1200x800/data/photo/2023/05/08/6458772a04483.jpeg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Ikan Kakap Merah',
            latin: 'Lutjanus spp.',
            image: 'https://e7.pngegg.com/pngimages/648/754/png-clipart-northern-red-snapper-fish-seafood-vermilion-snapper-fishing-food-orange-thumbnail.png',
            images: [
                'https://e7.pngegg.com/pngimages/648/754/png-clipart-northern-red-snapper-fish-seafood-vermilion-snapper-fishing-food-orange-thumbnail.png',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Ikan Sidat',
            latin: 'Anguilla spp.',
            image: 'https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/harianmerapi/2021/04/09sidate.jpg',
            images: [
                'https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/harianmerapi/2021/04/09sidate.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Kerapu Tikus',
            latin: 'Cromileptes altivelis',
            image: 'https://unair.ac.id/wp-content/uploads/2021/03/Ikan-Kerapu-Tikus.png',
            images: [
                'https://unair.ac.id/wp-content/uploads/2021/03/Ikan-Kerapu-Tikus.png',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Kuda Laut',
            latin: 'Hippocampus spp.',
            image: 'https://asset.kompas.com/crops/VxgNcWYJwH0-U56QrWr0zJupS9w=/0x30:800x564/1200x800/data/photo/2022/07/27/62e1318acccd4.jpg',
            images: [
                'https://asset.kompas.com/crops/VxgNcWYJwH0-U56QrWr0zJupS9w=/0x30:800x564/1200x800/data/photo/2022/07/27/62e1318acccd4.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        }
    ],
    'Reptilia (Penyu)': [
        {
            name: 'Penyu Hijau',
            latin: 'Chelonia mydas',
            image: 'https://animalium.id/wp-content/uploads/2024/04/Penyu-Hijau.jpg',
            images: [
                'https://animalium.id/wp-content/uploads/2024/04/Penyu-Hijau.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Penyu Sisik',
            latin: 'Eretmochelys imbricata',
            image: 'https://awsimages.detik.net.id/community/media/visual/2023/09/12/penyu-sisik-yang-ditemukan-di-sungai-gunung-anyar-surabaya-3_169.jpeg?w=600&q=90',
            images: [
                'https://awsimages.detik.net.id/community/media/visual/2023/09/12/penyu-sisik-yang-ditemukan-di-sungai-gunung-anyar-surabaya-3_169.jpeg?w=600&q=90',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Penyu Lekang',
            latin: 'Lepidochelys olivacea',
            image: 'https://unair.ac.id/wp-content/uploads/2021/09/Foto-by-4muda.jpg',
            images: [
                'https://unair.ac.id/wp-content/uploads/2021/09/Foto-by-4muda.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Penyu Tempayan',
            latin: 'Caretta caretta',
            image: 'https://static.republika.co.id/uploads/images/inpicture_slide/penyu-tempayan-_120702174348-735.jpg',
            images: [
                'https://static.republika.co.id/uploads/images/inpicture_slide/penyu-tempayan-_120702174348-735.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        }
    ],
    'Mammalia (Mamalia Laut)': [
        {
            name: 'Paus Botol',
            latin: 'Tursiops truncatus',
            image: 'https://image.idntimes.com/post/20220906/1024px-bottlenose-dolphin-1498971217-726107e6cb24f94eb96bf875ffbf43f3-62f9a53e9dd8470c7bb67ede32257f8f.jpg',
            images: [
                'https://image.idntimes.com/post/20220906/1024px-bottlenose-dolphin-1498971217-726107e6cb24f94eb96bf875ffbf43f3-62f9a53e9dd8470c7bb67ede32257f8f.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Paus Pilot Sirip Pendek',
            latin: 'Globicephala macrorhynchus',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48246E9B5El6yBZBMNCpjwT6HiCpRUZpUwiokoGvwpMQsavm0k8oNo1mJ5CgA_ovVIdA&usqp=CAU',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48246E9B5El6yBZBMNCpjwT6HiCpRUZpUwiokoGvwpMQsavm0k8oNo1mJ5CgA_ovVIdA&usqp=CAU',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Lumba-lumba Spinner',
            latin: 'Stenella longirostris',
            image: 'https://i.natgeofe.com/n/629f7a07-0d0f-457d-96af-67f5c6ed997b/spinner-dolphin_16x9.jpg?w=1200',
            images: [
                'https://i.natgeofe.com/n/629f7a07-0d0f-457d-96af-67f5c6ed997b/spinner-dolphin_16x9.jpg?w=1200',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Lumba-lumba Fraser',
            latin: 'Lagenodelphis hosei',
            image: 'https://alamendah.org/wp-content/uploads/2016/04/lumba-lumba-fraser-lagenodelphis-hosei.jpg',
            images: [
                'https://alamendah.org/wp-content/uploads/2016/04/lumba-lumba-fraser-lagenodelphis-hosei.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Lumba-lumba Hidung Botol',
            latin: 'Tursiops truncatus',
            image: 'https://www.greeners.co/wp-content/uploads/2017/01/Fauna-Lumba-lumba-Hidung-Botol-Mamalia-Laut-Sahabat-Nelayan.jpg',
            images: [
                'https://www.greeners.co/wp-content/uploads/2017/01/Fauna-Lumba-lumba-Hidung-Botol-Mamalia-Laut-Sahabat-Nelayan.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Paus Bryde',
            latin: 'Balaenoptera edeni',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Baleia_de_Bryde.jpg/250px-Baleia_de_Bryde.jpg',
            images: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Baleia_de_Bryde.jpg/250px-Baleia_de_Bryde.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        }
    ],
    'Mollusca (Moluska)': [
        {
            name: 'Nautilus',
            latin: 'Nautilus pompilius',
            image: 'https://www.greeners.co/wp-content/uploads/2018/01/Fauna-Nautilus-Chepalopoda-Bercangkang-yang-Bertahan-dari-Zaman-Purba.jpg',
            images: [
                'https://www.greeners.co/wp-content/uploads/2018/01/Fauna-Nautilus-Chepalopoda-Bercangkang-yang-Bertahan-dari-Zaman-Purba.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaBvz8wQ_2V-vC_QdHUppJS0KGrPcSBoYXeEFxIHY2pLrd2l5BNk54gvWmUkuFg-a1XRs&usqp=CAU',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Nautilus_diagram-en.svg/500px-Nautilus_diagram-en.svg.png',
                'https://images.unsplash.com/photo-1601131422475-1051510d48f7?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Gurita Pasir',
            latin: 'Octopus cyanea',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6rA78I16IxaAQ7wMPN-7rVJZZCXDwKsosCe9rYI2y95Q61xXTY6zwy4NLFVSJTlcHP0Y&usqp=CAU',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6rA78I16IxaAQ7wMPN-7rVJZZCXDwKsosCe9rYI2y95Q61xXTY6zwy4NLFVSJTlcHP0Y&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdiOHni1VGm5nBYN0K6_bfTE1a34pZLhhkBOdVYgsYFRRz-1Qdl2_-9RiLwkhE1Om82a8&usqp=CAU',
                'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJYpFqhORglMoGozTKTGOArPUny7vCXI38C9CG4VJCxRICAt1mTCMcVQ42u-6ZaTMTm6C4HusxA28zHm96rRobBbeMZNfD4z4GuXUeWTQc41k0iAQFHkf-Jan0J6MS7pzobgu31bM6lbE/w1200-h630-p-k-no-nu/GURITA.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mimic_Octopus2.jpg/250px-Mimic_Octopus2.jpg'
            ]
        },
        {
            name: 'Kerang Kima',
            latin: 'Tridacna spp.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUsguWz8e-XT02vdJ8t1GaaXUmoGTmux6jqA&s',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUsguWz8e-XT02vdJ8t1GaaXUmoGTmux6jqA&s',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Kima Raksasa',
            latin: 'Tridacna gigas',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmiFh-PY_bgNC6zlODxedtws2GsS_GAVqT8g&s',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmiFh-PY_bgNC6zlODxedtws2GsS_GAVqT8g&s',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Kima Kecil',
            latin: 'Tridacna crocea',
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNRXOgL9uOJCi31GXY0cAavFf7-lZAqBXZmLXjDgu3t9HBhwWDdYwXOyLnXrP6kw6WdW0IZr2RETZI1-JnDO3EpHz4wZlH0RE89k39cT5Ij8TqnfDnWBV24KqoTSZnN95N3ImR7A9sfGUW/s1600/Kima+12.jpg',
            images: [
                'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNRXOgL9uOJCi31GXY0cAavFf7-lZAqBXZmLXjDgu3t9HBhwWDdYwXOyLnXrP6kw6WdW0IZr2RETZI1-JnDO3EpHz4wZlH0RE89k39cT5Ij8TqnfDnWBV24KqoTSZnN95N3ImR7A9sfGUW/s1600/Kima+12.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Kima Gigi',
            latin: 'Tridacna squamosa',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg1yuRB6GaYbUI_2vPh5H63Rs3Vcg3TJKTft-8_NicznEg2DCMa9iPtk95fCDVm7Xb0XI&usqp=CAU',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg1yuRB6GaYbUI_2vPh5H63Rs3Vcg3TJKTft-8_NicznEg2DCMa9iPtk95fCDVm7Xb0XI&usqp=CAU',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        }
    ],
    'Cnidaria (Karang)': [
        {
            name: 'Karang Hitam',
            latin: 'Antipatharia',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxTnFe2vnj12eDDDkL6fa41rcd3gphQ51Y3Q&s',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxTnFe2vnj12eDDDkL6fa41rcd3gphQ51Y3Q&s',
                'https://deltagardens.com/cdn/shop/products/CaribbeanSet_BlackCoral_505.jpg?v=1522254029',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop'
            ]
        },
        {
            name: 'Karang Acropora',
            latin: 'Acropora spp.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Acropora_pulchra.jpg',
            images: [
                'https://upload.wikimedia.org/wikipedia/commons/e/e9/Acropora_pulchra.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ]
        }
    ]
};

// Data satwa akuatik yang dilindungi berdasarkan peraturan Indonesia
const protectedAnimals = {
    'Chondrichthyes (Hiu & Pari)': [
        { 
            name: 'Pari Gergaji', 
            localName: 'Ikan Gergaji, Todak Laut',
            latin: 'Pristis spp.', 
            status: 'Dilindungi Penuh', 
            regulation: 'PP No. 7/1999',
            protectionYear: '1999',
            legalRegulations: [
                {
                    name: 'Peraturan Pemerintah No. 7 Tahun 1999',
                    title: 'Pengawetan Jenis Tumbuhan dan Satwa',
                    description: 'Peraturan yang menetapkan Pristis spp. sebagai ikan yang dilindungi di Indonesia. Merupakan landasan utama perlindungan Pari Gergaji.',
                    year: '1999'
                },
                {
                    name: 'Keputusan Menteri Kelautan dan Perikanan No. 18 Tahun 2013',
                    title: 'Penetapan Status Perlindungan Penuh Terhadap Jenis Ikan Pari Gergaji',
                    description: 'Keputusan yang memperkuat perlindungan Pari Gergaji dengan status perlindungan penuh di perairan Indonesia.',
                    year: '2013'
                },
                {
                    name: 'Keputusan Menteri Kelautan dan Perikanan No. 1 Tahun 2021',
                    title: 'Jenis Ikan yang Dilindungi',
                    description: 'Keputusan terbaru yang mengatur perlindungan jenis-jenis ikan, termasuk Pari Gergaji yang memiliki status perlindungan penuh.',
                    year: '2021'
                }
            ],
            locations: [
                { name: 'Perairan Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Teluk Manado', coordinates: '1.4748°N, 124.8421°E' },
                { name: 'Selat Lembeh', coordinates: '1.4500°N, 125.2167°E' }
            ],
            image: 'https://www.greeners.co/wp-content/uploads/2019/01/Hiu-Gergaji.jpg',
            images: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pristis_pristis_aquarium.jpg/640px-Pristis_pristis_aquarium.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ], 
            description: 'Pari Gergaji dikenal dengan moncong panjangnya yang khas seperti gergaji, yang digunakan untuk mendeteksi dan melumpuhkan mangsa.',
            appendix: 'CITES Appendix I',
            conservationStatus: 'Critically Endangered (CR)',
            morphology: 'Tubuh dorso-ventrally pipih dengan moncong (rostrum) memanjang hingga 25-30% dari total panjang tubuh. Rostrum dilengkapi 14-23 pasang gigi lateral berbentuk kerucut yang berfungsi sebagai elektro-reseptor dan senjata untuk melumpuhkan mangsa. Tubuh berwarna coklat keabu-abuan di bagian dorsal dan putih di ventral. Panjang maksimal dapat mencapai 7.6 meter dengan berat hingga 600 kg. Memiliki 5 pasang celah insang di bagian ventral dan spiracle kecil di belakang mata.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Chondrichthyes',
                Order: 'Pristiformes',
                Family: 'Pristidae'
            },
            references: [
                { text: 'CITES (Convention on International Trade in Endangered Species of Wild Fauna and Flora). (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN (International Union for Conservation of Nature). (2023). Pristis pristis. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/18584848/178116515' }
            ]
        },
        { 
            name: 'Pari Manta', 
            localName: 'Ikan Pari Raksasa, Manta',
            latin: 'Mobula birostris', 
            status: 'Dilindungi Penuh', 
            regulation: 'Permen KP No. 4/2014',
            protectionYear: '2011',
            legalRegulations: [
                {
                    name: 'CMS (Konvensi Spesies Migrasi Satwa Liar) Tahun 2011',
                    title: 'Convention on Migratory Species',
                    description: 'Konvensi internasional yang melindungi spesies migrasi satwa liar, termasuk Pari Manta (Mobula birostris) yang ditambahkan dalam Appendix I pada tahun 2011.',
                    year: '2011'
                },
                {
                    name: 'Peraturan Menteri Kelautan dan Perikanan No. 4 Tahun 2014',
                    title: 'Penetapan Status Perlindungan Penuh Terhadap Jenis Ikan Pari Manta',
                    description: 'Peraturan yang menetapkan Pari Manta (Mobula birostris) sebagai ikan yang dilindungi penuh di perairan Indonesia, mengikuti ketentuan CMS 2011.',
                    year: '2014'
                }
            ],
            locations: [
                { name: 'Taman Nasional Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Pulau Bangka', coordinates: '1.7500°N, 125.1333°E' },
                { name: 'Perairan Sangihe', coordinates: '3.5833°N, 125.5000°E' }
            ],
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2R0sVzWEj3S2Wjj1kqWRg7_DQTghUpGj5ZvLOMslqa_OyEqYFLddo-lorHy8P6slMZWw&usqp=CAU',
            images: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Reef_manta_ray_-_Kaafu_Atoll%2C_Maldives.jpg/640px-Reef_manta_ray_-_Kaafu_Atoll%2C_Maldives.jpg',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
            ], 
            description: 'Salah satu spesies pari manta yang sering ditemukan di sekitar terumbu karang. Mereka adalah pemakan filter yang menyaring plankton dari air.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Vulnerable (VU)',
            morphology: 'Tubuh berbentuk cakram (disc-shaped) dengan lebar maksimal 5.5 meter dan berat hingga 1.4 ton. Permukaan dorsal berwarna hitam hingga coklat gelap dengan pola bintik dan garis putih yang unik untuk setiap individu (seperti sidik jari). Permukaan ventral berwarna putih dengan bercak hitam di sekitar celah insang dan mulut. Memiliki sepasang cephalic lobes (sirip kepala) yang dapat digulung dan digunakan untuk mengarahkan plankton ke mulut yang lebar. Ekor berbentuk cambuk dengan panjang 2-3 kali lebar cakram, tanpa duri beracun.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Chondrichthyes',
                Order: 'Myliobatiformes',
                Family: 'Mobulidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Mobula alfredi. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/195459/68632178' }
            ]
        },
        { 
            name: 'Hiu Paus', 
            localName: 'Hiu Tutul, Hiu Bodoh',
            latin: 'Rhincodon typus', 
            status: 'Dilindungi Penuh', 
            regulation: 'Kepmen KP No. 18/2013',
            protectionYear: '2013',
            legalRegulations: [
                {
                    name: 'Keputusan Menteri Kelautan dan Perikanan No. 18 Tahun 2013',
                    title: 'Penetapan Status Perlindungan Penuh Terhadap Jenis Ikan Hiu Paus',
                    description: 'Keputusan yang menetapkan Hiu Paus (Rhincodon typus) sebagai ikan yang dilindungi penuh di perairan Indonesia. Merupakan landasan utama perlindungan Hiu Paus.',
                    year: '2013'
                },
                {
                    name: 'Rencana Aksi Nasional (RAN) Konservasi Hiu Paus 2021-2025',
                    title: 'Kepmen KP No. 16/2022 tentang RAN Konservasi Hiu Paus',
                    description: 'Rencana aksi nasional untuk konservasi Hiu Paus periode 2021-2025 yang mencakup strategi perlindungan, monitoring, dan pengelolaan berkelanjutan populasi Hiu Paus di Indonesia.',
                    year: '2022'
                }
            ],
            locations: [
                { name: 'Perairan Gorontalo', coordinates: '0.5435°N, 123.0585°E' },
                { name: 'Teluk Tomini', coordinates: '0.0000°N, 121.0000°E' },
                { name: 'Perairan Kwandang', coordinates: '0.8167°N, 122.9000°E' }
            ],
            image: 'https://picsum.photos/400/300?random=21',
            images: [
                'https://picsum.photos/400/300?random=21',
                'https://picsum.photos/400/300?random=22',
                'https://picsum.photos/400/300?random=23',
                'https://picsum.photos/400/300?random=24'
            ], 
            description: 'Hiu paus adalah ikan terbesar di dunia yang dapat mencapai panjang hingga 18 meter. Mereka adalah pemakan filter yang tidak berbahaya bagi manusia.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Endangered (EN)',
            morphology: 'Tubuh fusiform (torpedo-shaped) dengan panjang maksimal 18-20 meter dan berat hingga 34 ton, menjadikannya ikan terbesar di dunia. Kepala besar dan lebar dengan mulut terminal yang dapat membuka hingga 1.5 meter lebar. Permukaan dorsal berwarna abu-abu kebiruan hingga kehijauan dengan pola checkerboard berupa bintik-bintik putih dan garis-garis horizontal yang unik untuk setiap individu. Permukaan ventral berwarna putih keperakan. Memiliki 5 pasang celah insang besar, sirip dada besar, dan sirip ekor heterocercal dengan lobus atas lebih panjang. Gill rakers berfungsi sebagai penyaring plankton.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Chondrichthyes',
                Order: 'Orectolobiformes',
                Family: 'Rhincodontidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Rhincodon typus. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/19488/2365291' }
            ]
        },
        { 
            name: 'Hiu Martil', 
            localName: 'Hiu Kepala Palu, Martil Laut',
            latin: 'Sphyrna spp.', 
            status: 'Dilindungi Penuh', 
            regulation: 'PP No. 7/1999',
            protectionYear: '1997',
            legalRegulations: [
                {
                    name: 'Peraturan Pemerintah No. 7 Tahun 1999',
                    title: 'Pengawetan Jenis Tumbuhan dan Satwa',
                    description: 'Peraturan yang menetapkan Sphyrna spp. (Hiu Martil) sebagai ikan yang dilindungi di Indonesia. Merupakan landasan utama perlindungan Hiu Martil.',
                    year: '1999'
                },
                {
                    name: 'Peraturan Menteri Kelautan dan Perikanan No. 5 Tahun 2018',
                    title: 'Penetapan Status Perlindungan Penuh Terhadap Jenis Ikan Hiu Martil',
                    description: 'Peraturan yang memperkuat perlindungan Hiu Martil (Sphyrna spp.) dengan status perlindungan penuh di perairan Indonesia.',
                    year: '2018'
                },
                {
                    name: 'Keputusan Menteri Kelautan dan Perikanan No. 18 Tahun 2013',
                    title: 'Penetapan Status Perlindungan Penuh Terhadap Jenis Ikan Hiu Martil',
                    description: 'Keputusan yang menetapkan Hiu Martil (Sphyrna spp.) sebagai ikan yang dilindungi penuh, melengkapi regulasi sebelumnya.',
                    year: '2013'
                }
            ],
            locations: [
                { name: 'Selat Lembeh', coordinates: '1.4500°N, 125.2167°E' },
                { name: 'Perairan Bitung', coordinates: '1.4537°N, 125.1838°E' },
                { name: 'Teluk Manado', coordinates: '1.4748°N, 124.8421°E' }
            ],
            image: 'https://digitani.ipb.ac.id/wp-content/uploads/2025/02/hiu-martil.png',
            images: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Sphyrna_lewini_%28Scalloped_hammerhead%29.jpg/640px-Sphyrna_lewini_%28Scalloped_hammerhead%29.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ],
            description: 'Hiu martil yang ditemukan di perairan Sulawesi. Memiliki kepala berbentuk martil yang memberikan keunggulan sensorik untuk mendeteksi mangsa.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Critically Endangered (CR)',
            morphology: 'Tubuh fusiform dengan cephalophoil (kepala martil) yang sangat khas, melebar secara lateral dengan mata dan lubang hidung di ujung-ujungnya. Panjang maksimal 4.3 meter dengan berat hingga 152 kg. Permukaan dorsal berwarna abu-abu hingga coklat kekuningan, ventral putih keperakan. Ujung sirip pectoral, dorsal, dan caudal berwarna hitam atau gelap (terutama pada individu muda). Cephalophoil berfungsi meningkatkan kemampuan elektro-resepsi dan hidrodinamika. Memiliki gigi berbentuk segitiga dengan tepi bergerigi, tersusun dalam 15-17 baris di rahang atas dan 14-16 baris di rahang bawah.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Chondrichthyes',
                Order: 'Carcharhiniformes',
                Family: 'Sphyrnidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Sphyrna lewini. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/39385/2918526' }
            ]
        },
        { 
            name: 'Hiu Koboi', 
            localName: 'Hiu Sirip Putih, Hiu Layang',
            latin: 'Carcharhinus longimanus', 
            status: 'Dilindungi Penuh', 
            regulation: 'Permen KKP No. 5/2018',
            protectionYear: '2018',
            legalRegulations: [
                {
                    name: 'Peraturan Menteri Kelautan dan Perikanan No. 5 Tahun 2018',
                    title: 'Penetapan Status Perlindungan Penuh Terhadap Jenis Ikan Hiu Koboi',
                    description: 'Peraturan yang menetapkan Carcharhinus longimanus (Hiu Koboi) sebagai ikan yang dilindungi penuh di perairan Indonesia. Merupakan landasan utama perlindungan Hiu Koboi.',
                    year: '2018'
                }
            ],
            locations: [
                { name: 'Perairan Sangihe-Talaud', coordinates: '4.0667°N, 125.4833°E' },
                { name: 'Laut Sulawesi', coordinates: '2.0000°N, 123.0000°E' },
                { name: 'Perairan Siau', coordinates: '2.7667°N, 125.4167°E' }
            ],
            image: 'https://image.idntimes.com/post/20240528/oceanic-whitetip-shark-at-elphinstone-reef-726107e6cb24f94eb96bf875ffbf43f3-c90c2834059a7e235c0fbb90a43d0d3c.jpg?tr=w-1200,f-webp,q-75&width=1200&format=webp&quality=75',
            description: 'Hiu koboi atau oceanic whitetip shark adalah hiu pelagis yang dikenal dengan sirip putih yang khas dan sifat agresifnya.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Critically Endangered (CR)',
            morphology: 'Tubuh fusiform dengan panjang maksimal 4 meter dan berat hingga 170 kg. Karakteristik utama adalah ujung sirip pectoral, dorsal pertama, dan caudal yang berwarna putih cerah. Tubuh berwarna abu-abu kecoklatan di bagian dorsal dan putih di ventral. Sirip pectoral sangat panjang dan bulat. Kepala tumpul dengan mata kecil. Gigi rahang atas berbentuk segitiga dengan tepi bergerigi, gigi rahang bawah lebih sempit dan runcing.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Chondrichthyes',
                Order: 'Carcharhiniformes',
                Family: 'Carcharhinidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Carcharhinus longimanus. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/39374/2915850' }
            ]
        }
    ],
    'Actinopterygii (Ikan Bertulang Keras)': [
        { 
            name: 'Ikan Napoleon', 
            localName: 'Ikan Maming, Napoleon Wrasse',
            latin: 'Cheilinus undulatus', 
            status: 'Dilindungi Terbatas', 
            regulation: 'Permen Pertanian No. 375/1995',
            protectionYear: '1995',
            legalRegulations: [
                {
                    name: 'Peraturan Menteri Pertanian Nomor 375/Kpts/IK.250/5/95',
                    title: 'Penetapan Jenis Ikan yang Dilindungi',
                    description: 'Peraturan yang menetapkan Cheilinus undulatus (Ikan Napoleon) sebagai ikan yang dilindungi di Indonesia. Merupakan landasan utama perlindungan Ikan Napoleon.',
                    year: '1995'
                },
                {
                    name: 'Keputusan Menteri Kelautan dan Perikanan Nomor 37/KEPMEN-KP/2013',
                    title: 'Penetapan Status Perlindungan Terbatas Terhadap Jenis Ikan Napoleon',
                    description: 'Keputusan yang memperkuat perlindungan Ikan Napoleon (Cheilinus undulatus) dengan status perlindungan terbatas di perairan Indonesia.',
                    year: '2013'
                },
                {
                    name: 'CITES Appendix II Tahun 2004',
                    title: 'Convention on International Trade in Endangered Species',
                    description: 'Ikan Napoleon (Cheilinus undulatus) dimasukkan dalam Appendix II CITES pada tahun 2004, mengatur perdagangan internasional spesies ini.',
                    year: '2004'
                }
            ],
            locations: [
                { name: 'Taman Nasional Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Pulau Siladen', coordinates: '1.6333°N, 124.7833°E' },
                { name: 'Pulau Manado Tua', coordinates: '1.6500°N, 124.7167°E' }
            ],
            image: 'https://api.gardaanimalia.com/storage/articles/featured/featured_ikan-napoleon-sang-top-predator-yang-bisa-berubah-jenis-kelaminnya_1748515588.webp',
            images: [
                'https://api.gardaanimalia.com/storage/articles/featured/featured_ikan-napoleon-sang-top-predator-yang-bisa-berubah-jenis-kelaminnya_1748515588.webp',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ], 
            description: 'Dikenal juga sebagai Ikan Napoleon, merupakan ikan karang terbesar dengan benjolan khas di kepalanya yang akan semakin membesar seiring bertambahnya usia.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Endangered (EN)',
            morphology: 'Tubuh memanjang dan compressed laterally dengan panjang maksimal 2.3 meter dan berat hingga 191 kg. Ciri khas berupa prominent nuchal hump (punuk di kepala) yang berkembang pada individu dewasa, terutama jantan. Bibir sangat tebal dan menonjol. Warna tubuh bervariasi dari hijau kebiruan hingga biru tua dengan irregular wavy lines berwarna biru atau hijau di kepala dan tubuh. Individu dewasa memiliki warna lebih cerah. Memiliki gigi pharyngeal yang kuat untuk menghancurkan karang dan moluska. Sirip caudal berbentuk lunate (bulan sabit).',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Actinopterygii',
                Order: 'Labriformes',
                Family: 'Labridae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Cheilinus undulatus. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/187752/1820623' }
            ]
        },
        { 
            name: 'Ikan Belida', 
            localName: 'Ikan Belida, Giant Featherback, Notopterus chitala',
            latin: 'Notopterus chitala', 
            status: 'Dilindungi Penuh', 
            regulation: 'Permen LHK P.106/2018',
            protectionYear: '2018',
            legalRegulations: [
                {
                    name: 'Peraturan Menteri Lingkungan Hidup dan Kehutanan Nomor P.106 Tahun 2018',
                    title: 'Jenis Tumbuhan dan Satwa yang Dilindungi',
                    description: 'Peraturan yang menetapkan Notopterus chitala (Ikan Belida) sebagai satwa yang dilindungi di Indonesia. Merupakan landasan utama perlindungan Ikan Belida.',
                    year: '2018'
                },
                {
                    name: 'Peraturan Presiden Nomor 34 Tahun 2022',
                    title: 'Rencana Aksi Nasional Konservasi Ikan Belida',
                    description: 'Peraturan presiden yang mengatur strategi konservasi dan perlindungan Ikan Belida (Notopterus chitala) di Indonesia melalui rencana aksi nasional.',
                    year: '2022'
                },
                {
                    name: 'Keputusan Menteri Kelautan dan Perikanan Nomor 1 Tahun 2021',
                    title: 'Jenis Ikan yang Dilindungi',
                    description: 'Keputusan yang memperkuat perlindungan Ikan Belida (Notopterus chitala) dengan status perlindungan penuh di perairan Indonesia.',
                    year: '2021'
                }
            ],
            locations: [
                { name: 'Sungai Mahakam', coordinates: '0.5000°S, 117.1500°E' },
                { name: 'Sungai Kapuas', coordinates: '0.0000°N, 109.3333°E' },
                { name: 'Sungai Barito', coordinates: '3.0000°S, 114.4167°E' }
            ],
            image: 'https://rsum.bandaacehkota.go.id/wp-content/uploads/2025/01/ikan-belinda.webp',
            description: 'Ikan air tawar endemik Indonesia yang memiliki bentuk tubuh unik dengan sirip punggung yang sangat kecil dan sirip anal yang memanjang.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Vulnerable (VU)',
            morphology: 'Tubuh pipih lateral dengan panjang maksimal 120 cm dan berat hingga 20 kg. Kepala kecil dengan moncong runcing dan mulut terminal. Sirip punggung sangat kecil dan terletak di belakang kepala, sementara sirip anal memanjang dari tengah tubuh hingga ekor. Warna tubuh abu-abu keperakan dengan bintik-bintik hitam yang tersebar. Sisik cycloid berukuran kecil. Memiliki organ Weber yang menghubungkan kantung udara dengan telinga dalam untuk pendengaran yang lebih baik.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Actinopterygii',
                Order: 'Osteoglossiformes',
                Family: 'Notopteridae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Notopterus chitala. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/166444/1104950' }
            ]
        },
        { 
            name: 'Ikan Coelacanth', 
            localName: 'Ikan Raja Laut, Coelacanth Sulawesi',
            latin: 'Latimeria menadoensis', 
            status: 'Dilindungi Penuh', 
            regulation: 'Permen Kehutanan No. 7/1999',
            protectionYear: '1999',
            legalRegulations: [
                {
                    name: 'Peraturan Menteri Kehutanan Nomor 7 Tahun 1999',
                    title: 'Penetapan Jenis Satwa yang Dilindungi',
                    description: 'Peraturan yang menetapkan Latimeria menadoensis (Ikan Coelacanth) sebagai satwa yang dilindungi di Indonesia. Merupakan landasan utama perlindungan Ikan Coelacanth.',
                    year: '1999'
                },
                {
                    name: 'Appendix I CITES (Convention on International Trade in Endangered Species)',
                    title: 'Convention on International Trade in Endangered Species of Wild Fauna and Flora',
                    description: 'Latimeria menadoensis (Ikan Coelacanth) dimasukkan dalam Appendix I CITES, memberikan perlindungan tertinggi terhadap perdagangan internasional spesies ini.',
                    year: '1999'
                }
            ],
            locations: [
                { name: 'Perairan Manado Tua', coordinates: '1.6500°N, 124.7167°E' },
                { name: 'Perairan Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Perairan Lembeh', coordinates: '1.4500°N, 125.2167°E' }
            ],
            image: 'https://asset.kompas.com/crops/wUsvHUbRK9Kv_tBro-IkME3d-_U=/10x10:740x497/1200x800/data/photo/2023/05/08/6458772a04483.jpeg',
            description: 'Ikan purba yang dianggap punah hingga ditemukan kembali. Coelacanth Sulawesi merupakan spesies endemik Indonesia.',
            appendix: 'CITES Appendix I',
            conservationStatus: 'Vulnerable (VU)',
            morphology: 'Tubuh memanjang dengan panjang maksimal 2 meter dan berat hingga 90 kg. Memiliki sisik cycloid yang tebal dan keras. Sirip berpasangan memiliki struktur seperti tungkai dengan basis berdaging. Ekor diphycercal dengan sirip tambahan di ujung. Warna tubuh coklat kebiruan dengan bintik-bintik putih.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Sarcopterygii',
                Order: 'Coelacanthiformes',
                Family: 'Latimeriidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Latimeria menadoensis. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/11375/3275427' }
            ]
        },
        { 
            name: 'Ikan Kakap Merah', 
            localName: 'Kakap Merah, Red Snapper',
            latin: 'Lutjanus spp.', 
            status: 'Dilindungi Terbatas', 
            regulation: 'Kepmen KP No. 79/2016',
            protectionYear: '2016',
            legalRegulations: [
                {
                    name: 'Keputusan Menteri Kelautan dan Perikanan Nomor 79/KEPMEN-KP/2016',
                    title: 'Penetapan Status Perlindungan Terbatas Terhadap Jenis Ikan Kakap',
                    description: 'Keputusan yang menetapkan Lutjanus spp. (Ikan Kakap Merah) sebagai ikan yang dilindungi terbatas di perairan Indonesia. Merupakan landasan utama perlindungan Ikan Kakap Merah.',
                    year: '2016'
                },
                {
                    name: 'Keputusan Menteri Kelautan dan Perikanan Nomor 123 Tahun 2021',
                    title: 'Rencana Pengelolaan Perikanan Kakap dan Kerapu',
                    description: 'Keputusan yang mengatur strategi pengelolaan perikanan kakap dan kerapu, termasuk Lutjanus spp. (Ikan Kakap Merah) untuk memastikan kelestarian dan pemanfaatan berkelanjutan.',
                    year: '2021'
                }
            ],
            locations: [
                { name: 'Taman Nasional Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Perairan Lembeh', coordinates: '1.4500°N, 125.2167°E' },
                { name: 'Pulau Siladen', coordinates: '1.6333°N, 124.7833°E' }
            ],
            image: 'https://e7.pngegg.com/pngimages/648/754/png-clipart-northern-red-snapper-fish-seafood-vermilion-snapper-fishing-food-orange-thumbnail.png',
            description: 'Kelompok ikan kakap merah yang penting secara ekonomis dan ekologis di perairan Indonesia.',
            appendix: 'Non-CITES',
            conservationStatus: 'Near Threatened (NT)',
            morphology: 'Tubuh compressed laterally dengan panjang maksimal 1 meter. Warna merah hingga merah muda dengan gradasi ke putih di bagian ventral. Mulut terminal dengan gigi runcing. Sirip dorsal kontinyu dengan bagian anterior berduri.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Actinopterygii',
                Order: 'Perciformes',
                Family: 'Lutjanidae'
            },
            references: [
                { text: 'FishBase. (2023). Lutjanus spp.', url: 'https://www.fishbase.org/' },
                { text: 'IUCN. (2023). Lutjanus species. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/' }
            ]
        },
        { 
            name: 'Ikan Sidat', 
            localName: 'Sidat, Belut Laut',
            latin: 'Anguilla spp.', 
            status: 'Dilindungi Terbatas', 
            regulation: 'Permen KP PER.18/2009',
            protectionYear: '2009',
            legalRegulations: [
                {
                    name: 'Peraturan Menteri Kelautan dan Perikanan Nomor PER.18/MEN/2009',
                    title: 'Penetapan Status Perlindungan Terbatas Terhadap Jenis Ikan Sidat',
                    description: 'Peraturan yang menetapkan Anguilla spp. (Ikan Sidat) sebagai ikan yang dilindungi terbatas di perairan Indonesia. Merupakan landasan utama perlindungan Ikan Sidat.',
                    year: '2009'
                },
                {
                    name: 'Peraturan Menteri Kelautan dan Perikanan Nomor PER.19/MEN/2012',
                    title: 'Pengelolaan Perikanan Sidat',
                    description: 'Peraturan yang mengatur pengelolaan perikanan sidat untuk memastikan kelestarian dan pemanfaatan berkelanjutan Anguilla spp. di perairan Indonesia.',
                    year: '2012'
                },
                {
                    name: 'Keputusan Menteri Kelautan dan Perikanan Nomor 118 Tahun 2021',
                    title: 'Rencana Pengelolaan Perikanan Sidat',
                    description: 'Keputusan yang mengatur strategi pengelolaan perikanan sidat, termasuk Anguilla spp. untuk memastikan kelestarian dan pemanfaatan berkelanjutan.',
                    year: '2021'
                },
                {
                    name: 'CITES Appendix II Tahun 2007 (Berlaku Maret 2009)',
                    title: 'Convention on International Trade in Endangered Species',
                    description: 'Anguilla anguilla (sidat Eropa) telah dimasukkan dalam Appendix II CITES sejak tahun 2007 dan berlaku sejak Maret 2009, mengatur perdagangan internasional spesies sidat.',
                    year: '2009'
                }
            ],
            locations: [
                { name: 'Perairan Manado', coordinates: '1.4748°N, 124.8421°E' },
                { name: 'Perairan Lembeh', coordinates: '1.4500°N, 125.2167°E' },
                { name: 'Teluk Manado', coordinates: '1.4748°N, 124.8421°E' }
            ],
            image: 'https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/harianmerapi/2021/04/09sidate.jpg',
            description: 'Ikan sidat adalah ikan katadromus yang bermigrasi dari air tawar ke laut untuk berkembang biak.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Endangered (EN)',
            morphology: 'Tubuh memanjang seperti ular dengan panjang maksimal 1.5 meter. Kulit licin dengan sisik kecil tertanam dalam kulit. Sirip dorsal dan anal memanjang hingga menyatu dengan sirip caudal. Warna coklat gelap hingga kehitaman.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Actinopterygii',
                Order: 'Anguilliformes',
                Family: 'Anguillidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Anguilla species. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/' }
            ]
        },
        { 
            name: 'Kerapu Tikus', 
            localName: 'Kerapu Tikus, Humpback Grouper',
            latin: 'Cromileptes altivelis', 
            status: 'Dilindungi Terbatas', 
            regulation: 'UU No. 7/2016',
            protectionYear: '2016',
            legalRegulations: [
                {
                    name: 'Peraturan Pemerintah Nomor 60 Tahun 2007',
                    title: 'Konservasi Sumber Daya Ikan',
                    description: 'Peraturan yang mengatur konservasi sumber daya ikan, termasuk Cromileptes altivelis (Kerapu Tikus) sebagai ikan yang dilindungi di perairan Indonesia.',
                    year: '2007'
                },
                {
                    name: 'Peraturan Menteri Kelautan dan Perikanan Nomor 61/PERMEN-KP/2018',
                    title: 'Penetapan Status Perlindungan Terbatas Terhadap Jenis Ikan Kerapu',
                    description: 'Peraturan yang menetapkan Cromileptes altivelis (Kerapu Tikus) sebagai ikan yang dilindungi terbatas di perairan Indonesia.',
                    year: '2018'
                },
                {
                    name: 'Undang-Undang Nomor 7 Tahun 2016',
                    title: 'Perlindungan dan Pemberdayaan Nelayan, Pembudi Daya Ikan, dan Petambak Garam',
                    description: 'Undang-undang yang mengatur perlindungan dan pemberdayaan nelayan serta pembudi daya ikan, termasuk perlindungan terhadap jenis ikan seperti Kerapu Tikus.',
                    year: '2016'
                }
            ],
            locations: [
                { name: 'Taman Nasional Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Perairan Lembeh', coordinates: '1.4500°N, 125.2167°E' },
                { name: 'Pulau Siladen', coordinates: '1.6333°N, 124.7833°E' }
            ],
            image: 'https://unair.ac.id/wp-content/uploads/2021/03/Ikan-Kerapu-Tikus.png',
            description: 'Ikan kerapu yang memiliki pola bintik hitam khas dan bentuk tubuh yang tinggi.',
            appendix: 'Non-CITES',
            conservationStatus: 'Near Threatened (NT)',
            morphology: 'Tubuh compressed dan tinggi dengan panjang maksimal 70 cm. Warna putih dengan bintik-bintik hitam berukuran besar yang tersebar di seluruh tubuh. Sirip dorsal tinggi dengan spina yang kuat.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Actinopterygii',
                Order: 'Perciformes',
                Family: 'Serranidae'
            },
            references: [
                { text: 'FishBase. (2023). Cromileptes altivelis.', url: 'https://www.fishbase.org/' },
                { text: 'IUCN. (2023). Cromileptes altivelis. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/' }
            ]
        },
        { 
            name: 'Kuda Laut', 
            localName: 'Jareng Laut, Kuda-kuda Laut',
            latin: 'Hippocampus spp.', 
            status: 'Dilindungi Penuh', 
            regulation: 'CITES Appendix II 2002',
            protectionYear: '2002',
            legalRegulations: [
                {
                    name: 'CITES Appendix II Tahun 2002',
                    title: 'Convention on International Trade in Endangered Species',
                    description: 'Hippocampus spp. (Kuda Laut) dimasukkan dalam Appendix II CITES pada tahun 2002, mengatur perdagangan internasional spesies kuda laut untuk memastikan kelestariannya.',
                    year: '2002'
                },
                {
                    name: 'Peraturan Menteri Kelautan dan Perikanan Nomor 35 Tahun 2013',
                    title: 'Penetapan Status Perlindungan Penuh Terhadap Jenis Ikan Kuda Laut',
                    description: 'Peraturan yang menetapkan Hippocampus spp. (Kuda Laut) sebagai ikan yang dilindungi penuh di perairan Indonesia, mengikuti ketentuan CITES Appendix II.',
                    year: '2013'
                },
                {
                    name: 'Peraturan Menteri Perdagangan No. 50/M-DAG/PER/9/2013',
                    title: 'Perdagangan Kuda Laut',
                    description: 'Peraturan yang mengatur perdagangan kuda laut (Hippocampus spp.) sesuai dengan ketentuan CITES Appendix II untuk memastikan perdagangan yang berkelanjutan.',
                    year: '2013'
                }
            ],
            locations: [
                { name: 'Selat Lembeh', coordinates: '1.4500°N, 125.2167°E' },
                { name: 'Perairan Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Pulau Gangga', coordinates: '1.7333°N, 124.7000°E' }
            ],
            image: 'https://asset.kompas.com/crops/VxgNcWYJwH0-U56QrWr0zJupS9w=/0x30:800x564/1200x800/data/photo/2022/07/27/62e1318acccd4.jpg',
            description: 'Ikan unik dengan kepala menyerupai kuda dan kemampuan berenang vertikal. Jantan yang mengandung telur.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Vulnerable (VU)',
            morphology: 'Tubuh compressed laterally dengan kepala berbentuk seperti kuda. Panjang 5-35 cm tergantung spesies. Ekor prehensile tanpa sirip caudal. Tubuh tertutup cincin tulang. Mata dapat bergerak independen.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Actinopterygii',
                Order: 'Syngnathiformes',
                Family: 'Syngnathidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Hippocampus species. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/' }
            ]
        }
    ],
    'Reptilia (Penyu)': [
        { 
            name: 'Penyu Hijau', 
            localName: 'Penyu Agar, Penyu Sup',
            latin: 'Chelonia mydas', 
            status: 'Dilindungi Penuh', 
            regulation: 'UU No. 5/1990',
            protectionYear: '1990',
            legalRegulations: [
                {
                    name: 'Undang-Undang No. 5 Tahun 1990',
                    title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya',
                    description: 'Landasan utama perlindungan satwa liar di Indonesia, melarang penangkapan, melukai, membunuh, menyimpan, memiliki, memelihara, mengangkut, dan memperdagangkan satwa yang dilindungi. Merupakan regulasi utama perlindungan Penyu Hijau.',
                    year: '1990'
                },
                {
                    name: 'Peraturan Pemerintah No. 7 Tahun 1999',
                    title: 'Pengawetan Jenis Tumbuhan dan Satwa',
                    description: 'Turunan dari UU No. 5/1990 yang menjelaskan kriteria penetapan satwa sebagai jenis yang dilindungi dan mengatur upaya pengawetan di dalam dan di luar habitatnya. Memperkuat perlindungan Penyu Hijau.',
                    year: '1999'
                }
            ],
            locations: [
                { name: 'Pantai Pangalisang', coordinates: '1.7167°N, 125.1833°E' },
                { name: 'Pulau Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Pantai Palippis', coordinates: '1.0833°N, 124.9167°E' }
            ],
            image: 'https://images.unsplash.com/photo-1593535189253-e35a163a3e61?w=400&h=300&fit=crop', 
            images: [
                'https://images.unsplash.com/photo-1593535189253-e35a163a3e61?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ], 
            description: 'Penyu laut besar yang dapat ditemukan di perairan tropis dan subtropis. Dinamakan penyu hijau karena lapisan lemak di bawah cangkangnya yang berwarna hijau.',
            appendix: 'CITES Appendix I',
            conservationStatus: 'Endangered (EN)',
            morphology: 'Karapas (carapace) berbentuk oval hingga heart-shaped dengan panjang maksimal 153 cm dan berat hingga 230 kg. Permukaan karapas halus dengan 4 pasang scutes costales dan tidak memiliki overlap. Warna karapas bervariasi dari hijau zaitun, coklat, hingga hitam dengan radiating streaks. Plastron (cangkang bawah) berwarna kuning hingga putih. Kepala relatif kecil dengan single pair of prefrontal scales. Paruh tidak hooked. Sirip depan panjang dengan 1-2 cakar, sirip belakang dengan 2 cakar. Terdapat 4 pasang scutes inframarginales tanpa pori.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Reptilia',
                Order: 'Testudines',
                Family: 'Cheloniidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Chelonia mydas. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/4615/11037468' }
            ]
        },
        { 
            name: 'Penyu Sisik', 
            localName: 'Penyu Carey, Penyu Tempurung',
            latin: 'Eretmochelys imbricata', 
            status: 'Dilindungi Penuh', 
            regulation: 'UU No. 5/1990',
            protectionYear: '1990',
            legalRegulations: [
                {
                    name: 'Undang-Undang Nomor 5 Tahun 1990',
                    title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya',
                    description: 'Landasan utama perlindungan satwa liar di Indonesia, melarang penangkapan, melukai, membunuh, menyimpan, memiliki, memelihara, mengangkut, dan memperdagangkan satwa yang dilindungi. Merupakan regulasi utama perlindungan Penyu Sisik.',
                    year: '1990'
                },
                {
                    name: 'Peraturan Pemerintah Nomor 7 Tahun 1999',
                    title: 'Pengawetan Jenis Tumbuhan dan Satwa',
                    description: 'Turunan dari UU No. 5/1990 yang menjelaskan kriteria penetapan satwa sebagai jenis yang dilindungi dan mengatur upaya pengawetan di dalam dan di luar habitatnya. Memperkuat perlindungan Penyu Sisik.',
                    year: '1999'
                },
                {
                    name: 'Surat Edaran Menteri Kelautan dan Perikanan RI Nomor 526/MEN-KP/VIII/2015',
                    title: 'Perlindungan Penyu Laut',
                    description: 'Surat edaran yang mengatur perlindungan penyu laut termasuk Penyu Sisik (Eretmochelys imbricata) di perairan Indonesia, melengkapi regulasi sebelumnya.',
                    year: '2015'
                },
                {
                    name: 'CITES (Convention on International Trade in Endangered Species) Tahun 1978',
                    title: 'Convention on International Trade in Endangered Species of Wild Flora and Fauna',
                    description: 'Eretmochelys imbricata (Penyu Sisik) telah dimasukkan dalam CITES sejak tahun 1978, mengatur perdagangan internasional spesies penyu untuk memastikan kelestariannya.',
                    year: '1978'
                }
            ],
            locations: [
                { name: 'Pulau Siladen', coordinates: '1.6333°N, 124.7833°E' },
                { name: 'Perairan Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Pulau Manado Tua', coordinates: '1.6500°N, 124.7167°E' }
            ],
            image: 'https://images.unsplash.com/photo-1548678533-a6b444521438?w=400&h=300&fit=crop', 
            images: [
                'https://images.unsplash.com/photo-1548678533-a6b444521438?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ], 
            description: 'Dikenal karena cangkangnya yang indah dengan sisik-sisik (scutes) yang tumpang tindih, yang sayangnya membuatnya menjadi target perburuan liar.',
            appendix: 'CITES Appendix I',
            conservationStatus: 'Critically Endangered (CR)',
            morphology: 'Karapas berbentuk heart-shaped dengan panjang maksimal 114 cm dan berat hingga 127 kg. Ciri khas berupa posterior margin yang strongly serrated (bergerigi) dan overlapping scutes yang memberikan penampilan shingle-like. Warna karapas amber dengan radiating streaks berwarna kuning, oranye, dan coklat yang sangat mencolok. Kepala relatif kecil dengan paruh hawk-like (seperti elang) yang tajam dan melengkung, ideal untuk mengekstrak spons dari celah karang. Memiliki 2 pairs of prefrontal scales dan 4 pasang scutes costales dengan thick overlapping edges. Sirip depan dengan 2 cakar.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Reptilia',
                Order: 'Testudines',
                Family: 'Cheloniidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Eretmochelys imbricata. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/8005/12881238' }
            ]
        },
        { 
            name: 'Penyu Lekang', 
            localName: 'Penyu Lekang, Olive Ridley Turtle',
            latin: 'Lepidochelys olivacea', 
            status: 'Dilindungi Penuh', 
            regulation: 'UU No. 5/1990',
            protectionYear: '1990',
            legalRegulations: [
                {
                    name: 'Undang-Undang Nomor 5 Tahun 1990',
                    title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya',
                    description: 'Landasan utama perlindungan satwa liar di Indonesia, melarang penangkapan, melukai, membunuh, menyimpan, memiliki, memelihara, mengangkut, dan memperdagangkan satwa yang dilindungi. Merupakan regulasi utama perlindungan Penyu Lekang.',
                    year: '1990'
                },
                {
                    name: 'Peraturan Pemerintah Nomor 7 Tahun 1999',
                    title: 'Pengawetan Jenis Tumbuhan dan Satwa',
                    description: 'Turunan dari UU No. 5/1990 yang menjelaskan kriteria penetapan satwa sebagai jenis yang dilindungi dan mengatur upaya pengawetan di dalam dan di luar habitatnya. Memperkuat perlindungan Penyu Lekang.',
                    year: '1999'
                },
                {
                    name: 'Undang-Undang Nomor 31 Tahun 2004',
                    title: 'Perikanan',
                    description: 'Undang-undang yang mengatur pengelolaan perikanan di Indonesia, termasuk perlindungan terhadap spesies laut yang dilindungi seperti Penyu Lekang dalam konteks perikanan berkelanjutan.',
                    year: '2004'
                },
                {
                    name: 'Undang-Undang Nomor 45 Tahun 2009',
                    title: 'Perikanan',
                    description: 'Revisi UU Perikanan yang memperkuat perlindungan sumber daya perikanan dan ekosistem laut, termasuk spesies penyu yang dilindungi seperti Penyu Lekang.',
                    year: '2009'
                },
                {
                    name: 'Surat Edaran Menteri Kelautan dan Perikanan Nomor 526/MEN-KP/VIII/2015',
                    title: 'Perlindungan Penyu Laut',
                    description: 'Surat edaran yang mengatur perlindungan penyu laut termasuk Penyu Lekang (Lepidochelys olivacea) di perairan Indonesia, melengkapi regulasi sebelumnya.',
                    year: '2015'
                },
                {
                    name: 'CITES (Convention on International Trade in Endangered Species) Tahun 1973',
                    title: 'Convention on International Trade in Endangered Species of Wild Fauna and Flora',
                    description: 'Lepidochelys olivacea (Penyu Lekang) telah dimasukkan dalam CITES sejak tahun 1973, mengatur perdagangan internasional spesies penyu untuk memastikan kelestariannya.',
                    year: '1973'
                }
            ],
            locations: [
                { name: 'Pantai Pangalisang', coordinates: '1.7167°N, 125.1833°E' },
                { name: 'Pulau Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Pantai Palippis', coordinates: '1.0833°N, 124.9167°E' }
            ],
            image: 'https://unair.ac.id/wp-content/uploads/2021/09/Foto-by-4muda.jpg', 
            description: 'Dikenal dengan perilaku bersarang massal yang disebut "arribada", di mana ribuan betina datang ke pantai yang sama untuk bertelur secara bersamaan.',
            appendix: 'CITES Appendix I',
            conservationStatus: 'Vulnerable (VU)',
            morphology: 'Penyu berukuran kecil hingga sedang dengan karapas panjang maksimal 75 cm dan berat hingga 50 kg. Karapas berbentuk rounded hingga oval dengan warna hijau zaitun hingga abu-abu. Ciri diagnostik berupa 6-8 (biasanya 7) pairs of costal scutes dan 5-9 pairs of lateral scutes di bridge. Kepala relatif besar dengan paruh slightly hooked. Memiliki 1-2 cakar pada setiap sirip. Scutes tidak overlap. Dikenal dengan synchronized nesting behavior (arribada) dimana ribuan betina bertelur bersamaan di pantai yang sama.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Reptilia',
                Order: 'Testudines',
                Family: 'Cheloniidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Lepidochelys olivacea. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/11534/3292503' }
            ]
        },
        { 
            name: 'Penyu Tempayan', 
            localName: 'Penyu Merah, Loggerhead',
            latin: 'Caretta caretta', 
            status: 'Dilindungi Penuh', 
            regulation: 'UU No. 5/1990',
            protectionYear: '1990',
            legalRegulations: [
                {
                    name: 'Undang-Undang Nomor 5 Tahun 1990',
                    title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya',
                    description: 'Landasan utama perlindungan satwa liar di Indonesia, melarang penangkapan, melukai, membunuh, menyimpan, memiliki, memelihara, mengangkut, dan memperdagangkan satwa yang dilindungi. Merupakan regulasi utama perlindungan Penyu Tempayan.',
                    year: '1990'
                },
                {
                    name: 'Peraturan Pemerintah Nomor 7 Tahun 1999',
                    title: 'Pengawetan Jenis Tumbuhan dan Satwa',
                    description: 'Turunan dari UU No. 5/1990 yang menjelaskan kriteria penetapan satwa sebagai jenis yang dilindungi dan mengatur upaya pengawetan di dalam dan di luar habitatnya. Memperkuat perlindungan Penyu Tempayan.',
                    year: '1999'
                },
                {
                    name: 'Peraturan Pemerintah Nomor 8 Tahun 1999',
                    title: 'Pemanfaatan Jenis Tumbuhan dan Satwa Liar',
                    description: 'Peraturan yang mengatur pemanfaatan jenis tumbuhan dan satwa liar secara lestari, termasuk perlindungan terhadap Penyu Tempayan dalam konteks pemanfaatan berkelanjutan.',
                    year: '1999'
                },
                {
                    name: 'Surat Edaran Menteri Kelautan dan Perikanan RI Nomor 526/MEN-KP/VIII/2015',
                    title: 'Perlindungan Penyu Laut',
                    description: 'Surat edaran yang mengatur perlindungan penyu laut termasuk Penyu Tempayan (Caretta caretta) di perairan Indonesia, melengkapi regulasi sebelumnya.',
                    year: '2015'
                }
            ],
            locations: [
                { name: 'Perairan Sangihe', coordinates: '3.5833°N, 125.5000°E' },
                { name: 'Teluk Tomini', coordinates: '0.0000°N, 121.0000°E' },
                { name: 'Laut Maluku', coordinates: '1.0000°N, 127.0000°E' }
            ],
            image: 'https://static.republika.co.id/uploads/images/inpicture_slide/penyu-tempayan-_120702174348-735.jpg',
            description: 'Penyu tempayan yang ditemukan di perairan Sulawesi. Memiliki kepala besar dan rahang yang kuat untuk memakan kerang dan krustasea.',
            appendix: 'CITES Appendix I',
            conservationStatus: 'Vulnerable (VU)',
            morphology: 'Penyu berukuran sedang hingga besar dengan karapas panjang maksimal 120 cm dan berat hingga 200 kg. Ciri khas berupa kepala yang sangat besar (proportionally largest head among sea turtles) dengan rahang yang sangat kuat untuk menghancurkan moluska dan krustasea. Karapas berbentuk heart-shaped dengan warna coklat kemerahan hingga mahogany. Memiliki 5 pairs of costal scutes dengan first pair touching nuchal scute. Plastron berwarna kuning hingga oranye. Paruh tidak hooked tetapi kuat. Sirip depan dengan 2 cakar, sirip belakang dengan 2-3 cakar.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Reptilia',
                Order: 'Testudines',
                Family: 'Cheloniidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Caretta caretta. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/3897/119333685' }
            ]
        }
    ],
    'Anthozoa (Karang)': [
        { 
            name: 'Karang Hitam', 
            localName: 'Karang Akar, Black Coral',
            latin: 'Antipatharia', 
            status: 'Dilindungi Penuh', 
            regulation: 'UU No. 5/1990',
            protectionYear: '1990',
            legalRegulations: [
                {
                    name: 'Undang-Undang Nomor 5 Tahun 1990',
                    title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya',
                    description: 'Landasan utama perlindungan satwa liar di Indonesia, melarang penangkapan, melukai, membunuh, menyimpan, memiliki, memelihara, mengangkut, dan memperdagangkan satwa yang dilindungi. Merupakan regulasi utama perlindungan Karang Hitam.',
                    year: '1990'
                },
                {
                    name: 'Undang-Undang Nomor 32 Tahun 2009',
                    title: 'Perlindungan dan Pengelolaan Lingkungan Hidup',
                    description: 'Undang-undang yang mengatur perlindungan dan pengelolaan lingkungan hidup, termasuk perlindungan ekosistem laut dan terumbu karang seperti Karang Hitam.',
                    year: '2009'
                },
                {
                    name: 'Undang-Undang Nomor 31 Tahun 2004',
                    title: 'Perikanan',
                    description: 'Undang-undang yang mengatur pengelolaan perikanan di Indonesia, termasuk perlindungan terhadap ekosistem laut dan terumbu karang seperti Karang Hitam dalam konteks perikanan berkelanjutan.',
                    year: '2004'
                },
                {
                    name: 'Undang-Undang Nomor 45 Tahun 2009',
                    title: 'Perikanan',
                    description: 'Revisi UU Perikanan yang memperkuat perlindungan sumber daya perikanan dan ekosistem laut, termasuk perlindungan terumbu karang seperti Karang Hitam.',
                    year: '2009'
                },
                {
                    name: 'Undang-Undang Nomor 11 Tahun 2019',
                    title: 'Sistem Nasional Ilmu Pengetahuan dan Teknologi',
                    description: 'Undang-undang yang mengatur sistem nasional ilmu pengetahuan dan teknologi, termasuk penelitian dan konservasi keanekaragaman hayati laut seperti Karang Hitam.',
                    year: '2019'
                },
                {
                    name: 'Peraturan Pemerintah Nomor 60 Tahun 2007',
                    title: 'Konservasi Sumber Daya Ikan',
                    description: 'Peraturan pemerintah yang mengatur konservasi sumber daya ikan dan ekosistem perairan, termasuk perlindungan terumbu karang seperti Karang Hitam sebagai habitat penting bagi ikan.',
                    year: '2007'
                }
            ],
            locations: [
                { name: 'Taman Nasional Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Perairan Lembeh', coordinates: '1.4500°N, 125.2167°E' },
                { name: 'Selat Bangka', coordinates: '1.7500°N, 125.1333°E' }
            ],
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxTnFe2vnj12eDDDkL6fa41rcd3gphQ51Y3Q&s',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxTnFe2vnj12eDDDkL6fa41rcd3gphQ51Y3Q&s',
                'https://deltagardens.com/cdn/shop/products/CaribbeanSet_BlackCoral_505.jpg?v=1522254029',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop'
            ], 
            description: 'Kelompok karang yang membentuk kerangka dari protein berwarna hitam atau coklat. Tumbuh sangat lambat dan dapat hidup ribuan tahun, sering dimanfaatkan untuk perhiasan.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Not Evaluated (NE) / Varies by species',
            morphology: 'Koloni berbentuk fan-like, whip-like, atau bushy dengan tinggi dapat mencapai 3 meter. Memiliki central axis (aksis) yang fleksibel terbuat dari protein gorgonin berwarna hitam atau coklat gelap yang memberikan kekuatan struktural. Polyps kecil (1-2 mm diameter) tersebar di sepanjang cabang, dapat ditarik masuk saat terancam. Warna koloni bervariasi: merah, kuning, oranye, ungu, atau putih tergantung spesies dan kedalaman. Memiliki sclerites (spikula kalsium karbonat) mikroskopis untuk dukungan struktural. Tidak memiliki zooxanthellae sehingga bergantung pada filter feeding.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Cnidaria',
                Class: 'Anthozoa',
                Order: 'Antipatharia'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'NOAA. (2023). Black Corals. National Oceanic and Atmospheric Administration.', url: 'https://oceanexplorer.noaa.gov/edu/learning/9_coral_ecosystem/activities/black_corals.html' }
            ]
        },
        { 
            name: 'Karang Meja', 
            localName: 'Karang Bercabang, Staghorn Coral',
            latin: 'Acropora spp.', 
            status: 'Dilindungi Terbatas', 
            regulation: 'Kepmen KP No. 37/2013',
            protectionYear: '2004',
            legalRegulations: [
                {
                    name: 'Keputusan Menteri Kelautan dan Perikanan Nomor 37/KEPMEN-KP/2013',
                    title: 'Penetapan Status Perlindungan Ikan',
                    description: 'Keputusan menteri yang menetapkan status perlindungan ikan dan biota laut lainnya, termasuk perlindungan terumbu karang seperti Acropora spp. (Karang Meja) sebagai habitat penting bagi ikan.',
                    year: '2013'
                },
                {
                    name: 'Peraturan Pemerintah Nomor 60 Tahun 2007',
                    title: 'Konservasi Sumber Daya Ikan',
                    description: 'Peraturan pemerintah yang mengatur konservasi sumber daya ikan dan ekosistem perairan, termasuk perlindungan terumbu karang seperti Karang Meja sebagai habitat penting bagi ikan.',
                    year: '2007'
                },
                {
                    name: 'Undang-Undang Nomor 31 Tahun 2004',
                    title: 'Perikanan',
                    description: 'Undang-undang yang mengatur pengelolaan perikanan di Indonesia, termasuk perlindungan terhadap ekosistem laut dan terumbu karang seperti Karang Meja dalam konteks perikanan berkelanjutan.',
                    year: '2004'
                },
                {
                    name: 'Undang-Undang Nomor 32 Tahun 2009',
                    title: 'Perlindungan dan Pengelolaan Lingkungan Hidup',
                    description: 'Undang-undang yang mengatur perlindungan dan pengelolaan lingkungan hidup, termasuk perlindungan ekosistem laut dan terumbu karang seperti Karang Meja.',
                    year: '2009'
                },
                {
                    name: 'Undang-Undang Nomor 27 Tahun 2007',
                    title: 'Pengelolaan Wilayah Pesisir dan Pulau-Pulau Kecil',
                    description: 'Undang-undang yang mengatur pengelolaan wilayah pesisir dan pulau-pulau kecil, termasuk perlindungan ekosistem terumbu karang seperti Karang Meja di wilayah pesisir.',
                    year: '2007'
                }
            ],
            locations: [
                { name: 'Taman Nasional Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Perairan Lembeh', coordinates: '1.4500°N, 125.2167°E' },
                { name: 'Pulau Siladen', coordinates: '1.6333°N, 124.7833°E' }
            ],
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Acropora_pulchra.jpg',
            description: 'Karang bercabang yang umum ditemukan di terumbu karang Sulawesi. Merupakan pembentuk terumbu karang yang penting dan habitat bagi banyak spesies ikan.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Critically Endangered (CR)',
            morphology: 'Koloni hard coral dengan struktur bercabang (branching) yang menyerupai antlers (tanduk rusa). Dapat tumbuh hingga 2 meter tinggi dan 3 meter lebar dengan growth rate 10-20 cm per tahun. Skeleton terbuat dari kalsium karbonat (aragonite). Cabang-cabang cylindrical dengan diameter 1-3 cm, ujung cabang tumpul dan membulat. Polyps kecil (2-3 mm diameter) dengan 6 septa primer. Warna bervariasi dari coklat, hijau zaitun, hingga kuning keemasan tergantung densitas zooxanthellae symbiotik. Memiliki nematocysts untuk menangkap plankton dan pertahanan.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Cnidaria',
                Class: 'Anthozoa',
                Order: 'Scleractinia',
                Family: 'Acroporidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Acropora cervicornis. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/133381/3716457' }
            ]
        }
    ],
    'Bivalvia (Kerang)': [
        { 
            name: 'Kima Raksasa', 
            localName: 'Kima Raksasa, Giant Clam',
            latin: 'Tridacna gigas', 
            status: 'Dilindungi Penuh', 
            regulation: 'SK Menhut No. 12/1987',
            protectionYear: '1987',
            legalRegulations: [
                {
                    name: 'Surat Keputusan Menteri Kehutanan No. 12/KPTS-II/1987',
                    title: 'Penetapan Jenis Satwa yang Dilindungi',
                    description: 'Keputusan menteri yang menetapkan jenis satwa yang dilindungi, termasuk Tridacna gigas (Kima Raksasa) sebagai salah satu spesies yang perlu dilindungi sejak tahun 1987.',
                    year: '1987'
                },
                {
                    name: 'Undang-Undang No. 5 Tahun 1990',
                    title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya',
                    description: 'Landasan utama perlindungan satwa liar di Indonesia, melarang penangkapan, melukai, membunuh, menyimpan, memiliki, memelihara, mengangkut, dan memperdagangkan satwa yang dilindungi. Memperkuat perlindungan Kima Raksasa.',
                    year: '1990'
                },
                {
                    name: 'Peraturan Pemerintah No. 7 Tahun 1999',
                    title: 'Pengawetan Jenis Tumbuhan dan Satwa',
                    description: 'Turunan dari UU No. 5/1990 yang menjelaskan kriteria penetapan satwa sebagai jenis yang dilindungi dan mengatur upaya pengawetan di dalam dan di luar habitatnya. Memperkuat perlindungan Kima Raksasa.',
                    year: '1999'
                },
                {
                    name: 'CITES (Convention on International Trade in Endangered Species)',
                    title: 'Convention on International Trade in Endangered Species of Wild Fauna and Flora',
                    description: 'Tridacna gigas (Kima Raksasa) telah dimasukkan dalam CITES, mengatur perdagangan internasional spesies kerang untuk memastikan kelestariannya.',
                    year: '1975'
                }
            ],
            locations: [
                { name: 'Taman Nasional Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Perairan Lembeh', coordinates: '1.4500°N, 125.2167°E' },
                { name: 'Pulau Siladen', coordinates: '1.6333°N, 124.7833°E' }
            ],
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmiFh-PY_bgNC6zlODxedtws2GsS_GAVqT8g&s', 
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmiFh-PY_bgNC6zlODxedtws2GsS_GAVqT8g&s',
                'https://images.unsplash.com/photo-1629733221948-4171e5b853d0?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop'
            ], 
            description: 'Spesies kerang terbesar di dunia, dapat tumbuh hingga lebih dari satu meter dan berat ratusan kilogram. Hidup bersimbiosis dengan alga fotosintetik (zooxanthellae).',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Vulnerable (VU)',
            morphology: 'Bivalve terbesar di dunia dengan shell panjang maksimal 120 cm dan berat hingga 200 kg. Cangkang tebal dan berat dengan 4-5 distinctive radial ribs (lipatan vertikal) dan scalloped margins. Warna shell putih hingga kekuningan dengan growth rings. Mantle (jaringan lunak) sangat besar dan berwarna-warni cerah: biru, hijau, ungu, atau coklat dengan iridescent spots, disebabkan oleh millions of zooxanthellae symbiotik. Memiliki byssal gland yang menghasilkan byssus threads untuk attachment. Inhalant dan exhalant siphons terpisah. Adductor muscles sangat kuat untuk menutup cangkang.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Mollusca',
                Class: 'Bivalvia',
                Order: 'Cardiida',
                Family: 'Cardiidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Tridacna gigas. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/22137/9362283' }
            ]
        },
        {
            name: 'Kima Kecil',
            localName: 'Kima Kecil, Small Giant Clam',
            latin: 'Tridacna crocea',
            status: 'Dilindungi Penuh',
            regulation: 'SK Menhut No. 12/1987',
            protectionYear: '1987',
            legalRegulations: [
                {
                    name: 'Surat Keputusan Menteri Kehutanan No. 12/KPTS/II/1987',
                    title: 'Penetapan Jenis Satwa yang Dilindungi',
                    description: 'Keputusan menteri yang menetapkan jenis satwa yang dilindungi, termasuk Tridacna crocea (Kima Kecil) sebagai salah satu spesies yang perlu dilindungi sejak tahun 1987.',
                    year: '1987'
                },
                {
                    name: 'Undang-Undang Nomor 5 Tahun 1990',
                    title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya',
                    description: 'Landasan utama perlindungan satwa liar di Indonesia, melarang penangkapan, melukai, membunuh, menyimpan, memiliki, memelihara, mengangkut, dan memperdagangkan satwa yang dilindungi. Memperkuat perlindungan Kima Kecil.',
                    year: '1990'
                },
                {
                    name: 'Peraturan Pemerintah Nomor 7 Tahun 1999',
                    title: 'Pengawetan Jenis Tumbuhan dan Satwa',
                    description: 'Turunan dari UU No. 5/1990 yang menjelaskan kriteria penetapan satwa sebagai jenis yang dilindungi dan mengatur upaya pengawetan di dalam dan di luar habitatnya. Memperkuat perlindungan Kima Kecil.',
                    year: '1999'
                }
            ],
            locations: [
                { name: 'Taman Nasional Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Perairan Lembeh', coordinates: '1.4500°N, 125.2167°E' },
                { name: 'Pulau Siladen', coordinates: '1.6333°N, 124.7833°E' }
            ],
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNRXOgL9uOJCi31GXY0cAavFf7-lZAqBXZmLXjDgu3t9HBhwWDdYwXOyLnXrP6kw6WdW0IZr2RETZI1-JnDO3EpHz4wZlH0RE89k39cT5Ij8TqnfDnWBV24KqoTSZnN95N3ImR7A9sfGUW/s1600/Kima+12.jpg',
            images: [
                'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNRXOgL9uOJCi31GXY0cAavFf7-lZAqBXZmLXjDgu3t9HBhwWDdYwXOyLnXrP6kw6WdW0IZr2RETZI1-JnDO3EpHz4wZlH0RE89k39cT5Ij8TqnfDnWBV24KqoTSZnN95N3ImR7A9sfGUW/s1600/Kima+12.jpg',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ],
            description: 'Kima kecil yang hidup dengan cara mengebor ke dalam substrat karang keras. Spesies terkecil dalam genus Tridacna.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Least Concern (LC)',
            morphology: 'Shell kecil dengan panjang maksimal 15 cm. Bentuk triangular hingga oval dengan radial ribs yang menonjol. Byssal orifice besar untuk attachment yang kuat. Mantle berwarna-warni dengan pola biru, hijau, dan coklat. Kemampuan boring untuk mengebor ke dalam karang hidup.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Mollusca',
                Class: 'Bivalvia',
                Order: 'Cardiida',
                Family: 'Cardiidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Tridacna crocea. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/22137/9362283' }
            ]
        },
        {
            name: 'Kima Gigi',
            localName: 'Kima Gigi, Fluted Giant Clam',
            latin: 'Tridacna squamosa',
            status: 'Dilindungi Penuh',
            regulation: 'SK Menhut No. 12/1987',
            protectionYear: '1987',
            legalRegulations: [
                {
                    name: 'Surat Keputusan Menteri Kehutanan No. 12/Kpts/II/1987',
                    title: 'Penetapan Jenis Satwa yang Dilindungi',
                    description: 'Keputusan menteri yang menetapkan jenis satwa yang dilindungi, termasuk Tridacna squamosa (Kima Gigi) sebagai salah satu spesies yang perlu dilindungi sejak tahun 1987.',
                    year: '1987'
                },
                {
                    name: 'Peraturan Pemerintah No. 7 Tahun 1999',
                    title: 'Pengawetan Jenis Tumbuhan dan Satwa',
                    description: 'Turunan dari UU No. 5/1990 yang menjelaskan kriteria penetapan satwa sebagai jenis yang dilindungi dan mengatur upaya pengawetan di dalam dan di luar habitatnya. Memperkuat perlindungan Kima Gigi.',
                    year: '1999'
                },
                {
                    name: 'Undang-Undang No. 5 Tahun 1990',
                    title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya',
                    description: 'Landasan utama perlindungan satwa liar di Indonesia, melarang penangkapan, melukai, membunuh, menyimpan, memiliki, memelihara, mengangkut, dan memperdagangkan satwa yang dilindungi. Memperkuat perlindungan Kima Gigi.',
                    year: '1990'
                }
            ],
            locations: [
                { name: 'Taman Nasional Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Perairan Lembeh', coordinates: '1.4500°N, 125.2167°E' },
                { name: 'Pulau Siladen', coordinates: '1.6333°N, 124.7833°E' }
            ],
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg1yuRB6GaYbUI_2vPh5H63Rs3Vcg3TJKTft-8_NicznEg2DCMa9iPtk95fCDVm7Xb0XI&usqp=CAU',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg1yuRB6GaYbUI_2vPh5H63Rs3Vcg3TJKTft-8_NicznEg2DCMa9iPtk95fCDVm7Xb0XI&usqp=CAU',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
            ],
            description: 'Kima dengan shell yang memiliki sisik-sisik khas pada permukaannya, memberikan nama "kima gigi".',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Lower Risk/Conservation Dependent (LR/cd)',
            morphology: 'Shell berukuran sedang hingga besar (maksimal 40 cm) dengan scaly projections pada radial ribs yang memberikan tekstur kasar. Warna shell putih hingga kuning. Mantle berwarna coklat, hijau, atau biru dengan pola yang bervariasi.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Mollusca',
                Class: 'Bivalvia',
                Order: 'Cardiida',
                Family: 'Cardiidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Tridacna squamosa. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/22142/9363375' }
            ]
        }
    ],
    'Cephalopoda (Gurita & Cumi)': [
        { 
            name: 'Nautilus', 
            localName: 'Nautilus, Chambered Nautilus, Siput Laut Berbilik',
            latin: 'Nautilus pompilius', 
            status: 'Dilindungi Penuh', 
            regulation: 'UU No. 5/1990',
            protectionYear: '1990',
            locations: [
                { name: 'Taman Nasional Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Perairan Lembeh', coordinates: '1.4500°N, 125.2167°E' },
                { name: 'Pulau Siladen', coordinates: '1.6333°N, 124.7833°E' },
                { name: 'Perairan Raja Ampat', coordinates: '0.5000°S, 130.0000°E' },
                { name: 'Perairan Maluku', coordinates: '3.0000°S, 128.0000°E' }
            ],
            image: 'https://www.greeners.co/wp-content/uploads/2018/01/Fauna-Nautilus-Chepalopoda-Bercangkang-yang-Bertahan-dari-Zaman-Purba.jpg',
            images: [
                'https://www.greeners.co/wp-content/uploads/2018/01/Fauna-Nautilus-Chepalopoda-Bercangkang-yang-Bertahan-dari-Zaman-Purba.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaBvz8wQ_2V-vC_QdHUppJS0KGrPcSBoYXeEFxIHY2pLrd2l5BNk54gvWmUkuFg-a1XRs&usqp=CAU',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Nautilus_diagram-en.svg/500px-Nautilus_diagram-en.svg.png',
                'https://images.unsplash.com/photo-1601131422475-1051510d48f7?w=400&h=300&fit=crop'
            ], 
            description: 'Nautilus adalah moluska cephalopoda primitif yang dianggap sebagai "fosil hidup" karena bentuknya tidak banyak berubah selama 500 juta tahun. Berbeda dengan ikan, nautilus adalah hewan invertebrata yang memiliki cangkang luar berbilik (chambered shell) yang berfungsi sebagai alat bantu apung. Hewan ini hidup di perairan dalam (200-600 meter) dan merupakan predator yang memakan krustasea dan ikan kecil.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Vulnerable (VU)',
            morphology: 'Cephalopoda primitif dengan cangkang luar berbilik (external chambered shell) berdiameter maksimal 25 cm. Cangkang berbentuk spiral planispiral dengan 4-5 putaran sempurna, berwarna putih krem dengan garis-garis api (flame-like stripes) berwarna oranye hingga coklat kemerahan. Ruang-ruang dipisahkan oleh sekat (septa) dengan siphuncle di tengah untuk mengontrol daya apung. Tubuh lunak menempati ruang terbesar (living chamber). Memiliki 60-90 tentakel yang dapat ditarik tanpa pengisap, hanya memiliki tonjolan perekat (adhesive ridges). Mata primitif tanpa lensa, hanya mampu membedakan terang dan gelap. Bergerak dengan jet propulsion menggunakan hyponome (corong). Tidak memiliki kantung tinta atau kromatofor seperti cephalopoda modern.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Mollusca',
                Class: 'Cephalopoda',
                Order: 'Nautilida',
                Family: 'Nautilidae'
            },
            legalRegulations: [
                {
                    name: 'Undang-Undang Nomor 5 Tahun 1990',
                    title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya',
                    description: 'Landasan utama perlindungan satwa liar di Indonesia, melarang penangkapan, melukai, membunuh, menyimpan, memiliki, memelihara, mengangkut, dan memperdagangkan satwa yang dilindungi. Merupakan regulasi utama perlindungan Nautilus.',
                    year: '1990'
                },
                {
                    name: 'Peraturan Menteri Lingkungan Hidup dan Kehutanan Nomor P.106/MENLHK/SETJEN/KUM.1/12/2018',
                    title: 'Jenis Tumbuhan dan Satwa yang Dilindungi',
                    description: 'Peraturan menteri yang berisi daftar detail spesies satwa dan tumbuhan yang dilindungi secara hukum di Indonesia, termasuk Nautilus pompilius sebagai spesies yang dilindungi penuh.',
                    year: '2018'
                },
                {
                    name: 'Peraturan Pemerintah Nomor 8 Tahun 1999',
                    title: 'Pemanfaatan Jenis Tumbuhan dan Satwa Liar',
                    description: 'Peraturan yang mengatur pemanfaatan jenis tumbuhan dan satwa liar secara lestari, termasuk perlindungan terhadap Nautilus dalam konteks pemanfaatan berkelanjutan.',
                    year: '1999'
                }
            ],
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Nautilus pompilius. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/14252/21413338' },
                { text: 'Ward, P.D. (1987). The Natural History of Nautilus. Allen & Unwin, London.', url: '' },
                { text: 'Saunders, W.B. & Landman, N.H. (2010). Nautilus: The Biology and Paleobiology of a Living Fossil. Springer, Dordrecht.', url: '' }
            ]
        },
        { 
            name: 'Gurita Pasir', 
            localName: 'Gurita Pasir, Big Blue Octopus',
            latin: 'Octopus cyanea', 
            status: 'Dilindungi Terbatas', 
            regulation: 'UU No. 31/2004',
            protectionYear: '2004',
            locations: [
                { name: 'Taman Nasional Bunaken', coordinates: '1.6167°N, 124.7583°E' },
                { name: 'Perairan Lembeh', coordinates: '1.4500°N, 125.2167°E' },
                { name: 'Pulau Siladen', coordinates: '1.6333°N, 124.7833°E' }
            ],
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6rA78I16IxaAQ7wMPN-7rVJZZCXDwKsosCe9rYI2y95Q61xXTY6zwy4NLFVSJTlcHP0Y&usqp=CAU',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6rA78I16IxaAQ7wMPN-7rVJZZCXDwKsosCe9rYI2y95Q61xXTY6zwy4NLFVSJTlcHP0Y&usqp=CAU',
                'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJYpFqhORglMoGozTKTGOArPUny7vCXI38C9CG4VJCxRICAt1mTCMcVQ42u-6ZaTMTm6C4HusxA28zHm96rRobBbeMZNfD4z4GuXUeWTQc41k0iAQFHkf-Jan0J6MS7pzobgu31bM6lbE/w1200-h630-p-k-no-nu/GURITA.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mimic_Octopus2.jpg/250px-Mimic_Octopus2.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcBTq-dOoOnTTzp0Q9gQhIEpf2COwV4V7hw&s'
            ],
            description: 'Gurita besar yang umum ditemukan di perairan Sulawesi. Memiliki kemampuan kamuflase yang luar biasa dan merupakan predator penting di ekosistem terumbu karang.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Least Concern (LC)',
            morphology: 'Cephalopoda besar dengan mantle length maksimal 60 cm dan arm span hingga 9 meter, berat dapat mencapai 15 kg. Memiliki 8 muscular arms dengan double rows of suckers (2 baris pengisap) per lengan, total sekitar 2000 suckers. Body berbentuk saccular dengan head yang distinct. Mata besar dan complex dengan lens, memberikan penglihatan tajam. Memiliki advanced chromatophore system untuk rapid color change dan texture modification untuk kamuflase sempurna. Skin dapat mengubah tekstur dari smooth hingga papillate. Memiliki ink sac untuk defense mechanism. Beak (paruh) keras untuk memotong mangsa. Tidak memiliki internal atau external shell.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Mollusca',
                Class: 'Cephalopoda',
                Order: 'Octopoda',
                Family: 'Octopodidae'
            },
            legalRegulations: [
                {
                    name: 'Undang-Undang No. 31 Tahun 2004',
                    title: 'Perikanan',
                    description: 'Undang-undang yang mengatur pengelolaan perikanan yang berkelanjutan, melarang penangkapan ikan dengan cara yang merugikan kelestarian sumber daya ikan. Merupakan regulasi utama perlindungan Gurita Pasir.',
                    year: '2004'
                },
                {
                    name: 'Peraturan Menteri Kelautan dan Perikanan No. 35/PERMEN-KP/2013',
                    title: 'Penetapan Status Perlindungan Ikan',
                    description: 'Peraturan menteri yang menetapkan status perlindungan ikan dan biota laut lainnya, termasuk perlindungan terhadap Gurita Pasir (Octopus cyanea) sebagai spesies yang dilindungi terbatas.',
                    year: '2013'
                },
                {
                    name: 'Peraturan Menteri Kelautan dan Perikanan No. 61/PERMEN-KP/2018',
                    title: 'Jenis Ikan yang Dilindungi',
                    description: 'Peraturan menteri yang mengatur perlindungan terhadap jenis-jenis ikan dan biota laut, termasuk Gurita Pasir yang memiliki status perlindungan terbatas.',
                    year: '2018'
                }
            ],
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Octopus cyanea. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/163075/978123' }
            ]
        }
    ],
    'Mammalia (Mamalia Laut)': [
        { 
            name: 'Paus Pilot Sirip Pendek', 
            localName: 'Paus Pilot, Lumba-lumba Pilot',
            latin: 'Globicephala macrorhynchus', 
            status: 'Dilindungi Penuh', 
            regulation: 'PP No. 7/1999',
            protectionYear: '1999',
            legalRegulations: [
                {
                    name: 'Peraturan Pemerintah Nomor 7 Tahun 1999',
                    title: 'Pengawetan Jenis Tumbuhan dan Satwa',
                    description: 'Peraturan yang menjelaskan kriteria penetapan satwa sebagai jenis yang dilindungi dan mengatur upaya pengawetan di dalam dan di luar habitatnya. Merupakan regulasi utama perlindungan Paus Pilot Sirip Pendek.',
                    year: '1999'
                },
                {
                    name: 'Rencana Aksi Nasional (RAN) Konservasi Cetacea',
                    title: 'Rencana Aksi Nasional Konservasi Cetacea',
                    description: 'Rencana aksi nasional yang mengatur strategi konservasi cetacea (paus dan lumba-lumba) di Indonesia, termasuk Paus Pilot Sirip Pendek (Globicephala macrorhynchus) sebagai spesies yang dilindungi penuh.',
                    year: '2019'
                },
                {
                    name: 'Peraturan Menteri Kelautan dan Perikanan No. 1 Tahun 2021',
                    title: 'Jenis Ikan yang Dilindungi',
                    description: 'Peraturan khusus yang mengatur perlindungan terhadap jenis-jenis ikan, termasuk mamalia laut seperti Paus Pilot yang memiliki status perlindungan penuh.',
                    year: '2021'
                },
                {
                    name: 'Undang-Undang No. 18 Tahun 2012',
                    title: 'Pangan dan Keamanan Pangan',
                    description: 'Mengatur keamanan pangan termasuk produk perikanan, melarang produksi dan peredaran pangan yang tidak aman dan dapat membahayakan kesehatan.',
                    year: '2012'
                },
                {
                    name: 'Undang-Undang No. 32 Tahun 2009',
                    title: 'Perlindungan dan Pengelolaan Lingkungan Hidup',
                    description: 'Mengatur perlindungan lingkungan hidup termasuk ekosistem laut, melarang perbuatan yang dapat mencemari dan merusak lingkungan hidup.',
                    year: '2009'
                },
                {
                    name: 'Undang-Undang No. 31 Tahun 2004',
                    title: 'Perikanan',
                    description: 'Mengatur pengelolaan perikanan yang berkelanjutan, melarang penangkapan ikan dengan cara yang merugikan kelestarian sumber daya ikan.',
                    year: '2004'
                },
                {
                    name: 'Undang-Undang No. 16 Tahun 1992',
                    title: 'Karantina Hewan, Ikan, dan Tumbuhan',
                    description: 'Mengatur karantina untuk mencegah masuk dan tersebarnya hama dan penyakit hewan karantina, termasuk ikan dan satwa laut.',
                    year: '1992'
                }
            ],
            locations: [
                { name: 'Laut Sulawesi', coordinates: '2.0000°N, 123.0000°E' },
                { name: 'Perairan Sangihe-Talaud', coordinates: '4.0667°N, 125.4833°E' },
                { name: 'Selat Makassar', coordinates: '1.0000°S, 118.0000°E' }
            ],
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48246E9B5El6yBZBMNCpjwT6HiCpRUZpUwiokoGvwpMQsavm0k8oNo1mJ5CgA_ovVIdA&usqp=CAU',
            description: 'Paus pilot dengan sirip pectoral yang relatif pendek. Hidup dalam kelompok besar dan memiliki struktur sosial yang kompleks.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Least Concern (LC)',
            morphology: 'Panjang tubuh 3.5-7 meter dengan berat 1-4 ton. Kepala bulat dengan melon yang menonjol. Warna hitam hingga abu-abu gelap dengan patch putih di dada. Sirip dorsal tinggi dan melengkung ke belakang.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Mammalia',
                Order: 'Cetacea',
                Family: 'Delphinidae'
            },
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Globicephala macrorhynchus. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/9250/50356660' }
            ]
        },
        { 
            name: 'Lumba-lumba Spinner', 
            localName: 'Lumba-lumba Spinner, Spinner Dolphin',
            latin: 'Stenella longirostris', 
            status: 'Dilindungi Penuh', 
            regulation: 'Permen LHK P.20/2018',
            protectionYear: '2018',
            locations: [
                { name: 'Laut Sulawesi', coordinates: '2.0000°N, 123.0000°E' },
                { name: 'Perairan Sangihe-Talaud', coordinates: '4.0667°N, 125.4833°E' },
                { name: 'Selat Makassar', coordinates: '1.0000°S, 118.0000°E' }
            ],
            image: 'https://i.natgeofe.com/n/629f7a07-0d0f-457d-96af-67f5c6ed997b/spinner-dolphin_16x9.jpg?w=1200',
            images: [
                'https://i.natgeofe.com/n/629f7a07-0d0f-457d-96af-67f5c6ed997b/spinner-dolphin_16x9.jpg?w=1200',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnqd5-H31wqRvftoOyhOUbL6lTBpxtplK4JQ&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0U19NGdNHfMi4JSRVikTkANGgQHtgRC1ieA&s',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Spinner_dolphin.jpg/640px-Spinner_dolphin.jpg'
            ],
            description: 'Lumba-lumba yang terkenal dengan kemampuan melompat dan berputar di udara hingga 7 kali.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Least Concern (LC)',
            morphology: 'Panjang tubuh 1.3-2.4 meter dengan berat 23-79 kg. Rostrum panjang dan ramping. Warna abu-abu gelap di punggung, abu-abu muda di sisi, dan putih di perut. Sirip dorsal triangular dengan ujung runcing.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Mammalia',
                Order: 'Cetacea',
                Family: 'Delphinidae'
            },
            legalRegulations: [
                {
                    name: 'Peraturan Menteri LHK No. P.20 Tahun 2018',
                    title: 'Jenis Tumbuhan dan Satwa yang Dilindungi',
                    description: 'Peraturan menteri yang menetapkan jenis tumbuhan dan satwa yang dilindungi di Indonesia, termasuk Lumba-lumba Spinner (Stenella longirostris) sebagai spesies yang dilindungi penuh. Merupakan regulasi utama perlindungan Lumba-lumba Spinner.',
                    year: '2018'
                }
            ],
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Stenella longirostris. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/20731/9223785' }
            ]
        },
        { 
            name: 'Lumba-lumba Fraser', 
            localName: 'Lumba-lumba Fraser, Fraser\'s Dolphin',
            latin: 'Lagenodelphis hosei', 
            status: 'Dilindungi Penuh', 
            regulation: 'Permen LHK P.20/2018',
            protectionYear: '2018',
            locations: [
                { name: 'Laut Sulawesi', coordinates: '2.0000°N, 123.0000°E' },
                { name: 'Perairan Sangihe-Talaud', coordinates: '4.0667°N, 125.4833°E' },
                { name: 'Selat Makassar', coordinates: '1.0000°S, 118.0000°E' }
            ],
            image: 'https://i.pinimg.com/736x/da/ae/a2/daaea2a69e256357f13efba8e9831245.jpg',
            images: [
                'https://i.pinimg.com/736x/da/ae/a2/daaea2a69e256357f13efba8e9831245.jpg',
                'https://ars.els-cdn.com/content/image/3-s2.0-B9780128043271001345-f06-31-9780128043271.jpg',
                'https://car-spaw-rac.org/local/cache-vignettes/L650xH207/lagenodelphis_hosei_femelle_v3_png-71a05.png?1736361830',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Fraser%27s_dolphin.jpg/640px-Fraser%27s_dolphin.jpg'
            ],
            description: 'Lumba-lumba dengan garis hitam khas dari mata hingga anus. Hidup di perairan dalam.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Least Concern (LC)',
            morphology: 'Panjang tubuh 2-2.7 meter dengan berat 160-210 kg. Tubuh robust dengan rostrum pendek. Warna abu-abu kebiruan dengan garis hitam dari mata ke anus. Sirip dorsal kecil dan melengkung.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Mammalia',
                Order: 'Cetacea',
                Family: 'Delphinidae'
            },
            legalRegulations: [
                {
                    name: 'Peraturan Menteri Lingkungan Hidup dan Kehutanan No. P.20 Tahun 2018',
                    title: 'Jenis Tumbuhan dan Satwa yang Dilindungi',
                    description: 'Peraturan menteri yang menetapkan jenis tumbuhan dan satwa yang dilindungi di Indonesia, termasuk Lumba-lumba Fraser (Lagenodelphis hosei) sebagai spesies yang dilindungi penuh. Merupakan regulasi utama perlindungan Lumba-lumba Fraser.',
                    year: '2018'
                }
            ],
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Lagenodelphis hosei. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/11140/3255830' }
            ]
        },
        { 
            name: 'Lumba-lumba Hidung Botol', 
            localName: 'Lumba-lumba Hidung Botol, Bottlenose Dolphin',
            latin: 'Tursiops truncatus', 
            status: 'Dilindungi Penuh', 
            regulation: 'UU No. 5/1990',
            protectionYear: '1990',
            locations: [
                { name: 'Laut Sulawesi', coordinates: '2.0000°N, 123.0000°E' },
                { name: 'Perairan Sangihe-Talaud', coordinates: '4.0667°N, 125.4833°E' },
                { name: 'Selat Makassar', coordinates: '1.0000°S, 118.0000°E' }
            ],
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNZrGf3yRN7Vs3K-TBoP8lSQDo0bD2SdFHYQ&s',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNZrGf3yRN7Vs3K-TBoP8lSQDo0bD2SdFHYQ&s',
                'https://animalfactguide.com/wp-content/uploads/2024/11/bottlenose-dolphin-underwater.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmX3LABbJeLR81D8lc6JFFAxe1r4CC54Uheg&s',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tursiops_truncatus_01.jpg/640px-Tursiops_truncatus_01.jpg'
            ],
            description: 'Spesies lumba-lumba yang paling dikenal, dengan kecerdasan tinggi dan kemampuan adaptasi yang baik.',
            appendix: 'CITES Appendix II',
            conservationStatus: 'Least Concern (LC)',
            morphology: 'Panjang tubuh 1.9-4 meter dengan berat 150-650 kg. Rostrum pendek dan tumpul. Warna abu-abu dengan gradasi dari gelap di punggung ke terang di perut. Sirip dorsal tinggi dan melengkung.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Mammalia',
                Order: 'Cetacea',
                Family: 'Delphinidae'
            },
            legalRegulations: [
                {
                    name: 'Undang-Undang Nomor 5 Tahun 1990',
                    title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya',
                    description: 'Landasan utama perlindungan satwa liar di Indonesia, melarang penangkapan, melukai, membunuh, menyimpan, memiliki, memelihara, mengangkut, dan memperdagangkan satwa yang dilindungi. Merupakan regulasi utama perlindungan Lumba-lumba Hidung Botol.',
                    year: '1990'
                },
                {
                    name: 'Peraturan Pemerintah Nomor 7 Tahun 1999',
                    title: 'Pengawetan Jenis Tumbuhan dan Satwa',
                    description: 'Turunan dari UU No. 5/1990 yang menjelaskan kriteria penetapan satwa sebagai jenis yang dilindungi dan mengatur upaya pengawetan di dalam dan di luar habitatnya. Memperkuat perlindungan Lumba-lumba Hidung Botol.',
                    year: '1999'
                },
                {
                    name: 'Peraturan Menteri Lingkungan Hidup dan Kehutanan Nomor P.106/MENLHK/SETJEN/KUM.1/12/2018',
                    title: 'Jenis Tumbuhan dan Satwa yang Dilindungi',
                    description: 'Peraturan menteri yang menetapkan jenis tumbuhan dan satwa yang dilindungi di Indonesia, termasuk Lumba-lumba Hidung Botol (Tursiops truncatus) sebagai spesies yang dilindungi penuh.',
                    year: '2018'
                }
            ],
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Tursiops truncatus. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/22563/9381168' }
            ]
        },
        { 
            name: 'Paus Bryde', 
            localName: 'Paus Bryde, Bryde\'s Whale',
            latin: 'Balaenoptera edeni', 
            status: 'Dilindungi Penuh', 
            regulation: 'UU No. 5/1990',
            protectionYear: '1990',
            locations: [
                { name: 'Laut Sulawesi', coordinates: '2.0000°N, 123.0000°E' },
                { name: 'Perairan Sangihe-Talaud', coordinates: '4.0667°N, 125.4833°E' },
                { name: 'Selat Makassar', coordinates: '1.0000°S, 118.0000°E' }
            ],
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Baleia_de_Bryde.jpg/250px-Baleia_de_Bryde.jpg',
            description: 'Paus baleen yang hidup di perairan tropis dan subtropis. Memiliki tiga ridge di kepala.',
            appendix: 'CITES Appendix I',
            conservationStatus: 'Least Concern (LC)',
            morphology: 'Panjang tubuh 11.5-15 meter dengan berat 12-25 ton. Tubuh ramping dengan kepala yang memiliki 3 ridge longitudinal. Warna abu-abu gelap hingga biru kehitaman. Memiliki 250-370 baleen plates.',
            taxonomy: {
                Kingdom: 'Animalia',
                Phylum: 'Chordata',
                Class: 'Mammalia',
                Order: 'Cetacea',
                Family: 'Balaenopteridae'
            },
            legalRegulations: [
                {
                    name: 'Undang-Undang Nomor 5 Tahun 1990',
                    title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya',
                    description: 'Landasan utama perlindungan satwa liar di Indonesia, melarang penangkapan, melukai, membunuh, menyimpan, memiliki, memelihara, mengangkut, dan memperdagangkan satwa yang dilindungi. Merupakan regulasi utama perlindungan Paus Bryde.',
                    year: '1990'
                },
                {
                    name: 'Peraturan Pemerintah Nomor 7 Tahun 1999',
                    title: 'Pengawetan Jenis Tumbuhan dan Satwa',
                    description: 'Turunan dari UU No. 5/1990 yang menjelaskan kriteria penetapan satwa sebagai jenis yang dilindungi dan mengatur upaya pengawetan di dalam dan di luar habitatnya. Memperkuat perlindungan Paus Bryde.',
                    year: '1999'
                },
                {
                    name: 'Peraturan Menteri Lingkungan Hidup dan Kehutanan Nomor P.20/MENLHK/SETJEN/KUM.1/6/2018',
                    title: 'Jenis Tumbuhan dan Satwa yang Dilindungi',
                    description: 'Peraturan menteri yang menetapkan jenis tumbuhan dan satwa yang dilindungi di Indonesia, termasuk Paus Bryde (Balaenoptera edeni) sebagai spesies yang dilindungi penuh.',
                    year: '2018'
                },
                {
                    name: 'Keputusan Menteri Kelautan dan Perikanan Nomor 79 Tahun 2018',
                    title: 'Rencana Aksi Nasional (RAN) Konservasi Mamalia Laut',
                    description: 'Keputusan menteri yang mengatur rencana aksi nasional untuk konservasi mamalia laut di Indonesia, termasuk Paus Bryde sebagai spesies yang dilindungi penuh.',
                    year: '2018'
                }
            ],
            references: [
                { text: 'CITES. (2023). Appendices.', url: 'https://cites.org/eng/app/appendices.php' },
                { text: 'IUCN. (2023). Balaenoptera edeni. The IUCN Red List of Threatened Species.', url: 'https://www.iucnredlist.org/species/2476/156923585' }
            ]
        }
    ]
};

let filteredAnimals = { ...protectedAnimals };
let currentView = 'phylum';
let currentPhylum = null;

// Fungsi untuk render grid filum
function renderPhylumGrid() {
    currentView = 'phylum';
    const container = document.getElementById('dashboard-content');
    const loadingState = document.getElementById('loading-state');

    if (!container) {
        return;
    }

    if (loadingState) {
        loadingState.innerHTML = ''; // Hapus skeleton
    }

    const phylaWithAnimals = Object.keys(filteredAnimals).filter(phylum => filteredAnimals[phylum] && filteredAnimals[phylum].length > 0);
    
    // Definisi ikon dan warna untuk setiap filum (desain minimalis)
    const phylumDetails = {
        'Chondrichthyes (Hiu & Pari)': { icon: 'shark', color: 'blue', hex: '#3b82f6' },
        'Actinopterygii (Ikan Bertulang Keras)': { icon: 'fish', color: 'orange', hex: '#f97316' },
        'Reptilia (Penyu)': { icon: 'turtle', color: 'green', hex: '#22c55e' },
        'Anthozoa (Karang)': { icon: 'coral', color: 'rose', hex: '#f43f5e' },
        'Bivalvia (Kerang)': { icon: 'shell', color: 'purple', hex: '#8b5cf6' },
        'Cephalopoda (Gurita & Cumi)': { icon: 'octopus', color: 'pink', hex: '#ec4899' },
        'Mammalia (Mamalia Laut)': { icon: 'whale', color: 'cyan', hex: '#06b6d4' }
    };

    let html = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">`;
    if (phylaWithAnimals.length > 0) {
        phylaWithAnimals.forEach((phylum, index) => {
            const details = phylumDetails[phylum] || { icon: 'box', color: 'gray', hex: '#6b7280' };
            // Tentukan emoji animasi berdasarkan filum
            let animationEmoji = '';
            let animationClass = '';
            if (phylum.includes('Chondrichthyes')) {
                animationEmoji = '🐋'; // Paus
                animationClass = 'shark';
            } else if (phylum.includes('Actinopterygii')) {
                animationEmoji = '🐠'; // Ikan
                animationClass = 'fish';
            } else if (phylum.includes('Reptilia')) {
                animationEmoji = '🐢'; // Penyu
                animationClass = 'turtle';
            } else if (phylum.includes('Anthozoa')) {
                animationEmoji = '🪸'; // Karang
                animationClass = 'coral';
            } else if (phylum.includes('Bivalvia')) {
                animationEmoji = '🐚'; // Kerang
                animationClass = 'shell';
            } else if (phylum.includes('Cephalopoda')) {
                animationEmoji = '🐙'; // Gurita
                animationClass = 'octopus';
            } else if (phylum.includes('Mammalia')) {
                animationEmoji = '🐋'; // Paus
                animationClass = 'whale';
            }

            // Tentukan apakah filum ini hanya menggunakan animasi (tanpa ikon Lucide)
            const useAnimationOnly = phylum.includes('Actinopterygii') || 
                                   phylum.includes('Reptilia') || 
                                   phylum.includes('Bivalvia') ||
                                   phylum.includes('Mammalia');

            html += `
                <div class="phylum-card text-center hover-scale" 
                     style="background-color: ${details.hex}1A;"
                     onclick="showAnimalsFor('${phylum}')">
                    <div class="phylum-card-icon mx-auto relative" style="background-color: ${details.hex}33;">
                        ${!useAnimationOnly ? `<i data-lucide="${details.icon}" style="color: ${details.hex};"></i>` : ''}
                        ${animationEmoji ? `<div class="phylum-animation ${animationClass}">${animationEmoji}</div>` : ''}
                    </div>
                    <h3 class="phylum-card-title">${phylum}</h3>
                    <div class="species-count mx-auto" style="background-color: ${details.hex};">
                        <i data-lucide="list" class="w-4 h-4"></i>
                        <span>${filteredAnimals[phylum].length} spesies</span>
                    </div>
                </div>
            `;
        });
    } else {
        html += `
            <div class="col-span-full text-center py-16">
                <h3 class="text-2xl font-semibold text-gray-700">Tidak ada hasil yang ditemukan</h3>
                <p class="text-gray-500 mt-2">Silakan coba kata kunci pencarian atau filter yang berbeda.</p>
            </div>
        `;
    }
    html += `</div>`;
    
    // Tambahkan informasi total spesies
    const totalSpecies = Object.values(filteredAnimals).reduce((total, animals) => total + animals.length, 0);
    html += `<div class="col-span-full text-center mt-8 mb-16">
        <p class="text-gray-600 text-lg">Total: ${totalSpecies} spesies satwa akuatik dilindungi dalam ${phylaWithAnimals.length} filum</p>
    </div>`;
    
    container.innerHTML = html;

    // Refresh Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Fungsi untuk menampilkan grid hewan
function showAnimalsFor(phylumName) {
    currentView = 'animal';
    currentPhylum = phylumName;
    renderAnimalGrid(phylumName);
}

// Fungsi untuk render grid hewan
function renderAnimalGrid(phylumName) {
    const container = document.getElementById('dashboard-content');
    if (!container) return;

    const animals = filteredAnimals[phylumName] || [];
    let html = `
        <div class="mb-8" data-aos="fade-down">
            <button onclick="backToPhylumView()" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center shadow-md">
                <i data-lucide="arrow-left" class="mr-2"></i> Kembali ke Filum
            </button>
        </div>
        <h3 class="text-3xl font-bold text-gray-800 mb-8 font-inter border-b-2 border-blue-500 pb-3" data-aos="fade-right">
            Filum ${phylumName}
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
    `;
    
    animals.forEach((animal, index) => {
        // Gunakan data gambar dari animalImages jika tersedia, jika tidak gunakan data asli
        const imageData = animalImages[phylumName]?.find(img => img.latin === animal.latin);
        const displayImage = imageData ? imageData.image : ((animal.images && animal.images.length > 0) ? animal.images[0] : animal.image);
        
        html += `
            <div class="animal-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer hover-scale" 
                 onclick="navigateToAnimalDetail('${phylumName}', '${animal.latin}')"
                 data-aos="fade-up" style="animation-delay: ${index * 0.05}s">
                <div class="relative overflow-hidden">
                    <img src="${displayImage}" 
                         alt="${animal.name}" 
                         class="w-full h-48 object-contain bg-gray-50 hover:scale-105 transition-transform duration-300"
                         onerror="this.src='https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=' + encodeURIComponent('${animal.name}')"
                         loading="lazy">
                    <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <span class="text-xs font-medium text-slate-700">Klik untuk detail</span>
                    </div>
                </div>
                <div class="p-6">
                    <h4 class="text-xl font-bold text-gray-900 mb-1">${animal.name}</h4>
                    <p class="text-sm italic text-gray-500 mb-3">(${animal.latin})</p>
                    <span class="inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(animal.status)}">
                        ${animal.status}
                    </span>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    if (typeof AOS !== 'undefined') AOS.refresh();
}

// Fungsi untuk kembali ke tampilan filum
function backToPhylumView() {
    currentView = 'phylum';
    currentPhylum = null;
    renderPhylumGrid();
}

// Fungsi untuk navigasi ke halaman detail hewan
function navigateToAnimalDetail(phylumName, latinName) {
    const encodedPhylum = encodeURIComponent(phylumName);
    const encodedLatin = encodeURIComponent(latinName);
    console.log('Navigating to:', `animal-detail.html?phylum=${encodedPhylum}&latin=${encodedLatin}`);
    window.location.href = `animal-detail.html?phylum=${encodedPhylum}&latin=${encodedLatin}`;
}

// Fungsi untuk menampilkan detail hewan
function loadAnimalDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const phylumName = decodeURIComponent(urlParams.get('phylum') || '');
    const latinName = decodeURIComponent(urlParams.get('animal') || '');
    
    if (!phylumName || !latinName) {
        showErrorPage();
        return;
    }
    
    const animal = protectedAnimals[phylumName]?.find(a => a.latin === latinName);
    if (!animal) {
        showErrorPage();
        return;
    }
    
    // Update breadcrumb dengan fungsi klik
    const breadcrumbPhylum = document.getElementById('breadcrumb-phylum');
    breadcrumbPhylum.textContent = phylumName;
    breadcrumbPhylum.onclick = () => {
        window.location.href = `dashboard.html?phylum=${encodeURIComponent(phylumName)}`;
    };
    breadcrumbPhylum.style.cursor = 'pointer';
    breadcrumbPhylum.classList.add('hover:text-blue-600');
    
    document.getElementById('breadcrumb-animal').textContent = animal.name;
    document.getElementById('animal-name').textContent = animal.name;
    document.getElementById('animal-latin').textContent = animal.latin;
    document.getElementById('animal-status').textContent = animal.status;
    document.getElementById('animal-regulation').textContent = animal.regulation;
    
    // Update legal basis berdasarkan regulasi
    const legalBasis = document.getElementById('legal-basis');
    if (legalBasis) {
        if (animal.regulation.includes('Permen KP 1/2021')) {
            legalBasis.textContent = 'Permen KP 1/2021';
        } else if (animal.regulation.includes('Permen LHK P.106/2018')) {
            legalBasis.textContent = 'Permen LHK P.106/2018';
        } else {
            legalBasis.textContent = 'UU No. 5 Tahun 1990 tentang Konservasi Sumber Daya Alam Hayati';
        }
    }
    
    // Gallery dengan lightbox effect
    const galleryContainer = document.getElementById('animal-gallery');
    galleryContainer.innerHTML = animal.gallery.map((imgUrl, index) => `
        <div class="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" onclick="openImageModal('${imgUrl}', '${animal.name} - Gambar ${index + 1}')">
            <img src="${imgUrl}" alt="${animal.name}" class="w-full h-40 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <i data-lucide="zoom-in" class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
            </div>
        </div>
    `).join('');
    
    // Information
    document.getElementById('conservation-details').textContent = `Status: ${animal.status} | Regulasi: ${animal.regulation}`;
    document.getElementById('year-protected').textContent = animal.yearProtected;
    document.getElementById('full-description').textContent = animal.description;
    
    // Characteristics
    const characteristicsList = document.getElementById('characteristics-list');
    characteristicsList.innerHTML = animal.characteristics.map(char => `
        <li class="flex items-start">
            <span class="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
            <span>${char}</span>
        </li>
    `).join('');
    
    // Load similar species
    loadSimilarSpecies(phylumName, animal.latin);
    
    document.title = `${animal.name} - Detail Satwa - Lestari Bahari`;
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Fungsi untuk membuka modal gambar
function openImageModal(imageSrc, caption) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="relative max-w-4xl max-h-full">
            <img src="${imageSrc}" alt="${caption}" class="max-w-full max-h-full object-contain rounded-lg">
            <button class="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            <div class="absolute bottom-4 left-4 right-4 text-white bg-black/50 rounded-lg p-3">
                <p class="text-center font-medium">${caption}</p>
            </div>
        </div>
    `;
    
    // Add close functionality
    modal.onclick = (e) => {
        if (e.target === modal || e.target.closest('button')) {
            document.body.removeChild(modal);
        }
    };
    
    // Add to body
    document.body.appendChild(modal);
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Fungsi untuk memuat spesies terkait
function loadSimilarSpecies(currentPhylum, currentLatinName) {
    const similarContainer = document.getElementById('similar-species');
    if (!similarContainer) return;
    
    similarContainer.innerHTML = '';
    
    const currentPhylumAnimals = protectedAnimals[currentPhylum];
    if (!currentPhylumAnimals) return;
    
    // Filter untuk menghilangkan spesies saat ini dan ambil maksimal 4
    const similarSpecies = currentPhylumAnimals
        .filter(animal => animal.latin !== currentLatinName)
        .slice(0, 4);
    
    if (similarSpecies.length === 0) {
        similarContainer.innerHTML = `
            <div class="col-span-full text-center text-gray-500 py-8">
                <p>Tidak ada spesies terkait lainnya dalam filum ini.</p>
            </div>
        `;
        return;
    }
    
    similarSpecies.forEach(animal => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer';
        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" class="w-full h-32 object-contain bg-gray-50">
            <div class="p-3">
                <h4 class="font-semibold text-gray-800 text-sm mb-1">${animal.name}</h4>
                <p class="text-xs text-gray-500 italic mb-2">${animal.latin}</p>
                <span class="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    ${animal.status}
                </span>
            </div>
        `;
        
        // Add click event untuk navigasi ke detail spesies lain
        card.onclick = () => {
            window.location.href = `animal-detail.html?phylum=${encodeURIComponent(currentPhylum)}&animal=${encodeURIComponent(animal.latin)}`;
        };
        
        similarContainer.appendChild(card);
    });
}

// Fungsi untuk menampilkan halaman error
function showErrorPage() {
    const container = document.getElementById('animal-detail-content');
    if (container) {
        container.innerHTML = `
            <div class="text-center py-16">
                <div class="text-6xl mb-4">🐠</div>
                <h1 class="text-3xl font-bold text-gray-800 mb-4">Satwa Tidak Ditemukan</h1>
                <p class="text-gray-600 mb-8">Maaf, informasi satwa yang Anda cari tidak tersedia.</p>
                <a href="dashboard.html" class="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <i data-lucide="arrow-left" class="w-5 h-5 mr-2"></i>
                    Kembali ke Satwa Dilindungi
                </a>
            </div>
        `;
    }
}

// Fungsi untuk mendapatkan class CSS berdasarkan status
function getStatusClass(status) {
    switch(status) {
        case 'Dilindungi Penuh': return 'bg-green-200 text-green-800';
        case 'Dilindungi Terbatas': return 'bg-yellow-200 text-yellow-800';
        case 'Rentan': return 'bg-red-200 text-red-800';
        case 'Bervariasi': return 'bg-purple-200 text-purple-800';
        default: return 'bg-gray-200 text-gray-800';
    }
}

// Fungsi untuk menangani gaya header
function handleHeaderStyle() {
    const header = document.querySelector('header');
    if (!header) return;

    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    
    if (!isHomePage) {
        header.classList.remove('glass-effect');
        header.classList.add('header-solid');
    }
}

// Fungsi untuk render dashboard
function renderDashboard() {
    // Selalu mulai dengan tampilan filum
    currentView = 'phylum';
    renderPhylumGrid();
}

// Fungsi pencarian dan filter
function filterAnimals() {
    const searchInput = document.getElementById('search-input');
    const statusFilter = document.getElementById('status-filter');
    const yearFilter = document.getElementById('year-filter');

    // Pastikan elemen filter ada sebelum melanjutkan
    if (!searchInput || !statusFilter || !yearFilter) {
        // Jika elemen tidak ada (misalnya di halaman detail), hentikan fungsi
        return;
    }
    
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;
    const yearValue = yearFilter.value;
    
    const newFilteredAnimals = {};
    
    for (const phylum in protectedAnimals) {
        const filtered = protectedAnimals[phylum].filter(animal => {
            const matchesSearch = animal.name.toLowerCase().includes(searchTerm) || 
                                animal.latin.toLowerCase().includes(searchTerm) ||
                                animal.description.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusValue || animal.status === statusValue;
            const matchesYear = !yearValue || animal.protectionYear === yearValue;
            
            return matchesSearch && matchesStatus && matchesYear;
        });
        
        if (filtered.length > 0) {
            newFilteredAnimals[phylum] = filtered;
        }
    }
    
    filteredAnimals = newFilteredAnimals;
    renderDashboard();
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Event listeners
function initializeEventListeners() {
    const searchInput = document.getElementById('search-input');
    const statusFilter = document.getElementById('status-filter');
    const yearFilter = document.getElementById('year-filter');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (searchInput) searchInput.addEventListener('input', filterAnimals);
    if (statusFilter) statusFilter.addEventListener('change', filterAnimals);
    if (yearFilter) yearFilter.addEventListener('change', filterAnimals);
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Fungsi inisialisasi utama
function initializeApp() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initializeEventListeners();
    handleHeaderStyle();
    initializeVisitorCounter(); // Initialize visitor counter
    
    // Check for dashboard page
    const dashboardContent = document.getElementById('dashboard-content');
    
    if (window.location.pathname.includes('animal-detail.html')) {
        loadAnimalDetail();
    } else if (dashboardContent) {
        // Render dashboard langsung
        filteredAnimals = { ...protectedAnimals };
        renderDashboard();
    }
}

// Jalankan aplikasi setelah DOM siap
document.addEventListener('DOMContentLoaded', initializeApp);

// Visitor Counter Function
function updateVisitorCounter() {
    // Get current visitor count from localStorage
    let visitorCount = localStorage.getItem('visitorCount');
    
    // If no count exists, initialize to 0
    if (visitorCount === null) {
        visitorCount = 0;
    } else {
        visitorCount = parseInt(visitorCount);
    }
    
    // Increment visitor count
    visitorCount++;
    
    // Save updated count to localStorage
    localStorage.setItem('visitorCount', visitorCount.toString());
    
    // Update the display
    const visitorElement = document.getElementById('visitor-count');
    if (visitorElement) {
        visitorElement.textContent = visitorCount.toLocaleString('id-ID');
    }
}

// Initialize visitor counter when page loads
function initializeVisitorCounter() {
    updateVisitorCounter();
}

// Export data and functions for global access
window.protectedAnimals = protectedAnimals;
window.showAnimalsFor = showAnimalsFor;
window.backToPhylumView = backToPhylumView;
window.navigateToAnimalDetail = navigateToAnimalDetail;
window.loadAnimalDetail = loadAnimalDetail;
window.toggleMobileMenu = toggleMobileMenu;
window.filterAnimals = filterAnimals;
window.openImageModal = openImageModal;
window.loadSimilarSpecies = loadSimilarSpecies;
window.initializeVisitorCounter = initializeVisitorCounter;
