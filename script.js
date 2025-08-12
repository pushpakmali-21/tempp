document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- PEAKS DATA ---
    const peaks = [
        {
            name: 'Mount Everest',
            height: '8,848m',
            description: "Earth's highest mountain.",
            imageUrls: [
                'images/everest1.jpg', 'images/everest2.jpg', 'images/everest3.jpg'
            ],
            altText: 'A breathtaking view of Mount Everest.',
            region: 'Nepal',
            coordinates: '27°59\'17"N 86°55\'31"E',
            firstAscent: '1953',
            difficulty: 'Extreme',
            bestSeason: 'Spring (Apr-May)',
            detailedDescription: 'Mount Everest, known as Sagarmatha in Nepal and Chomolungma in Tibet, is Earth\'s highest mountain above sea level. Located in the Mahalangur Himal sub-range of the Himalayas, it represents the ultimate mountaineering challenge.',
            mapPosition: { x: 60, y: 40 }
        },
        {
            name: 'K2',
            height: '8,611m',
            description: 'The savage mountain.',
            imageUrls: [
                'images/K2_3.jpg', 'images/K2_1.jpg', 'images/K2_3.jpg'
            ],
            altText: 'The imposing and difficult K2 mountain.',
            region: 'Pakistan',
            coordinates: '35°52\'57"N 76°30\'48"E',
            firstAscent: '1954',
            difficulty: 'Extreme',
            bestSeason: 'Summer (Jul-Aug)',
            detailedDescription: 'K2, located on the China-Pakistan border, is the second-highest mountain on Earth. Known as "The Savage Mountain" due to its extreme difficulty and high fatality rate, it is considered by many climbers to be the ultimate prize.',
            mapPosition: { x: 25, y: 35 }
        },
        {
            name: 'Kangchenjunga',
            height: '8,586m',
            description: 'The five treasures of snow.',
            imageUrls: [
                'images/kangchenjunga1.jpg', 'images/kangchenjunga2.jpg', 'images/kangchenjunga3.jpg'
            ],
            altText: 'The five peaks of Kangchenjunga at sunrise.',
            region: 'Nepal',
            coordinates: '27°42\'09"N 88°08\'54"E',
            firstAscent: '1955',
            difficulty: 'Very Difficult',
            bestSeason: 'Spring (Apr-May)',
            detailedDescription: 'Kangchenjunga is the third highest mountain in the world. Its name means "The Five Treasures of Snows", as it contains five peaks. It is located on the border of Nepal and Sikkim, India.',
            mapPosition: { x: 75, y: 45 }
        },
        {
            name: 'Lhotse',
            height: '8,516m',
            description: 'The south peak.',
            imageUrls: [
                'images/Lhotse1.jpg', 'images/Lhotse2.jpg', 'images/Lhotse3.jpg'
            ],
            altText: 'Lhotse peak standing tall next to Everest.',
            region: 'Nepal',
            coordinates: '27°57\'42"N 86°55\'59"E',
            firstAscent: '1956',
            difficulty: 'Very Difficult',
            bestSeason: 'Spring (Apr-May)',
            detailedDescription: 'Lhotse is the fourth-highest mountain in the world. It is connected to Everest via the South Col. Lhotse means "South Peak" in Tibetan. In addition to the main summit, the mountain has two subsidiary peaks, Lhotse Middle and Lhotse Shar.',
            mapPosition: { x: 65, y: 42 }
        },
        {
            name: 'Makalu',
            height: '8,485m',
            description: 'The great black.',
            imageUrls: [
                'images/makalu1.jpg', 'images/makalu2.jpg', 'images/makalu3.jpg'
            ],
            altText: 'The majestic four-sided peak of Makalu.',
            region: 'Nepal',
            coordinates: '27°53\'23"N 87°05\'20"E',
            firstAscent: '1955',
            difficulty: 'Very Difficult',
            bestSeason: 'Spring (Apr-May)',
            detailedDescription: 'Makalu is the fifth highest mountain in the world. It is an isolated peak whose shape is a four-sided pyramid. Its name "Makalu" is derived from the Sanskrit "Maha Kala," a name for the Hindu god Shiva that translates "Great Black."',
            mapPosition: { x: 70, y: 55 }
        },
        {
            name: 'Cho Oyu',
            height: '8,188m',
            description: 'The turquoise goddess.',
            imageUrls: [
                'images/ChoOyu2.jpg', 'images/ChoOyu1.jpg', 'images/ChoOyu3.jpg'
            ],
            altText: 'The beautiful Cho Oyu, the Turquoise Goddess.',
            region: 'China',
            coordinates: '28°05\'39"N 86°39\'39"E',
            firstAscent: '1954',
            difficulty: 'Difficult',
            bestSeason: 'Autumn (Sep-Oct)',
            detailedDescription: 'Cho Oyu is the sixth-highest mountain in the world. Its name means "Turquoise Goddess" in Tibetan. It is considered the least technically difficult 8,000-meter peak, making it a popular objective for guided expeditions.',
            mapPosition: { x: 50, y: 30 }
        }
    ];

    const peaksGrid = document.getElementById('peaks-grid');

    function renderPeaks(peakArray) {
        peaksGrid.innerHTML = '';

        peakArray.forEach(peak => {
            const card = document.createElement('div');
            card.className = 'peak-card';
            card.dataset.peakName = peak.name;
            card.innerHTML = `
                <img src="${peak.imageUrls[0]}" alt="${peak.altText}" loading="lazy">
                <div class="peak-info">
                    <h4>${peak.name}</h4>
                    <p>${peak.height} - ${peak.description}</p>
                    <button class="explore-btn">Click to Explore</button>
                </div>
            `;
            
            card.addEventListener('click', () => {
                showPeakModal(peak);
            });
            
            peaksGrid.appendChild(card);
        });
    }

    // --- Filter button logic ---
    const filterButtons = document.querySelectorAll('.filters .btn');
    const peaksByRegion = peaks.reduce((acc, peak) => {
        (acc[peak.region] = acc[peak.region] || []).push(peak);
        return acc;
    }, {});

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            if (filter === 'all') {
                renderPeaks(peaks);
            } else {
                renderPeaks(peaksByRegion[filter] || []);
            }
        });
    });

    // --- Interactive Map ---
    const mapContainer = document.getElementById('himalayan-map');
    
    function createInteractiveMap() {
        peaks.forEach(peak => {
            const mountainMarker = document.createElement('div');
            mountainMarker.className = 'map-mountain';
            mountainMarker.style.left = `${peak.mapPosition.x}%`;
            mountainMarker.style.top = `${peak.mapPosition.y}%`;
            mountainMarker.textContent = peak.name.split(' ')[0];
            mountainMarker.dataset.peakName = peak.name;
            
            mountainMarker.addEventListener('click', () => {
                showPeakModal(peak);
            });
            
            mapContainer.appendChild(mountainMarker);
        });
    }

    // --- Modal Functionality ---
    const modal = document.getElementById('peak-modal');
    const closeModal = document.getElementById('close-modal');
    
    function showPeakModal(peak) {
        document.getElementById('modal-title').textContent = peak.name;
        document.getElementById('modal-height').textContent = peak.height;
        document.getElementById('modal-location').textContent = peak.region;
        document.getElementById('modal-first-ascent').textContent = peak.firstAscent;
        document.getElementById('modal-difficulty').textContent = peak.difficulty;
        document.getElementById('modal-coordinates').textContent = peak.coordinates;
        document.getElementById('modal-season').textContent = peak.bestSeason;
        document.getElementById('modal-description').textContent = peak.detailedDescription;
        
        const gallery = document.getElementById('modal-gallery');
        gallery.innerHTML = '';
        peak.imageUrls.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = peak.altText;
            img.className = 'gallery-image';
            img.addEventListener('click', () => {
                window.open(imageUrl, '_blank');
            });
            gallery.appendChild(img);
        });
        
        modal.classList.add('active');
    }
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // --- Initial render ---
    renderPeaks(peaks);
    createInteractiveMap();
});