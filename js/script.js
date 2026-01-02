// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initImageSliders();
    initVideoPlayer();
    initSearchFunctionality();
    initFiltering();
    initGallery();
    initForms();
    initFAQs();
    initLightbox();
    
    // Set active nav link based on current page
    setActiveNavLink();
});

// Navigation Functionality
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes(linkHref.replace('.html', '')) && linkHref !== 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Image Sliders
function initImageSliders() {
    // Home page slider
    const homeSlider = document.querySelector('.slider');
    if (homeSlider) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Show specific slide
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Next slide
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Previous slide
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Auto slide
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Reset interval on interaction
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                resetInterval();
            });
        });
        
        // Initialize first slide
        showSlide(0);
    }
    
    // Place detail page slider
    const placeSlider = document.querySelector('.place-main-slider');
    if (placeSlider) {
        const placeSlides = document.querySelectorAll('.place-slide');
        const placeThumbs = document.querySelectorAll('.thumb');
        const placePrevBtn = document.querySelector('.place-slider-btn.prev-btn');
        const placeNextBtn = document.querySelector('.place-slider-btn.next-btn');
        
        let currentPlaceSlide = 0;
        const totalPlaceSlides = placeSlides.length;
        
        // Show specific slide
        function showPlaceSlide(n) {
            placeSlides.forEach(slide => slide.classList.remove('active'));
            placeThumbs.forEach(thumb => thumb.classList.remove('active'));
            
            currentPlaceSlide = (n + totalPlaceSlides) % totalPlaceSlides;
            placeSlides[currentPlaceSlide].classList.add('active');
            placeThumbs[currentPlaceSlide].classList.add('active');
        }
        
        // Event listeners
        if (placeNextBtn) placeNextBtn.addEventListener('click', function() {
            showPlaceSlide(currentPlaceSlide + 1);
        });
        
        if (placePrevBtn) placePrevBtn.addEventListener('click', function() {
            showPlaceSlide(currentPlaceSlide - 1);
        });
        
        // Thumbnail navigation
        placeThumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                showPlaceSlide(index);
            });
        });
        
        // Initialize first slide
        showPlaceSlide(0);
    }
}

// Video Player
function initVideoPlayer() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const promoVideo = document.getElementById('promoVideo');
    
    if (playPauseBtn && promoVideo) {
        playPauseBtn.addEventListener('click', function() {
            if (promoVideo.paused) {
                promoVideo.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                promoVideo.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        // Update button when video ends
        promoVideo.addEventListener('ended', function() {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }
}

// Search Functionality
function initSearchFunctionality() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    // Places page search
    const placesSearchBtn = document.getElementById('placesSearchBtn');
    const placesSearchInput = document.getElementById('placesSearch');
    
    if (placesSearchBtn && placesSearchInput) {
        placesSearchBtn.addEventListener('click', function() {
            filterPlaces();
        });
        
        placesSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterPlaces();
            }
        });
    }
}

// Perform search
function performSearch(query) {
    if (query.trim() !== '') {
        alert(`Searching for: "${query}"\nIn a real implementation, this would redirect to search results.`);
        // In a real implementation, you would redirect to search results page
        // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    } else {
        alert('Please enter a search term');
    }
}

// Filter places on places page
function filterPlaces() {
    const searchTerm = document.getElementById('placesSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const regionFilter = document.getElementById('regionFilter').value;
    const placeCards = document.querySelectorAll('.place-card');
    
    placeCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const category = card.getAttribute('data-category');
        const region = card.getAttribute('data-region');
        
        const matchesSearch = searchTerm === '' || 
            title.includes(searchTerm) || 
            description.includes(searchTerm);
            
        const matchesCategory = categoryFilter === 'all' || category === categoryFilter;
        const matchesRegion = regionFilter === 'all' || region === regionFilter;
        
        if (matchesSearch && matchesCategory && matchesRegion) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize filtering functionality
function initFiltering() {
    // Places page category tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active tab
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Filter places
                const category = this.getAttribute('data-category');
                const placeCards = document.querySelectorAll('.place-card');
                
                placeCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Place detail page service tabs
    const serviceTabs = document.querySelectorAll('.service-tab');
    if (serviceTabs.length > 0) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active tab
                serviceTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding service list
                const service = this.getAttribute('data-service');
                const serviceLists = document.querySelectorAll('.service-list');
                
                serviceLists.forEach(list => {
                    list.classList.remove('active');
                    if (list.id === service) {
                        list.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Gallery filtering
    const galleryFilterBtns = document.querySelectorAll('.filter-btn');
    if (galleryFilterBtns.length > 0) {
        galleryFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active filter button
                galleryFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter gallery items
                const filter = this.getAttribute('data-filter');
                const galleryItems = document.querySelectorAll('.gallery-item');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter || 
                        (filter === 'video' && item.classList.contains('video'))) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Reset filters button
    const resetFiltersBtn = document.getElementById('resetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            document.getElementById('categoryFilter').value = 'all';
            document.getElementById('regionFilter').value = 'all';
            document.getElementById('placesSearch').value = '';
            
            // Reset category tabs
            document.querySelectorAll('.category-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-category') === 'all') {
                    tab.classList.add('active');
                }
            });
            
            // Show all places
            document.querySelectorAll('.place-card').forEach(card => {
                card.style.display = 'block';
            });
        });
    }
}

// Gallery functionality
function initGallery() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary)';
            uploadArea.style.background = 'rgba(26, 115, 232, 0.05)';
        });
        
        uploadArea.addEventListener('dragleave', function() {
            uploadArea.style.borderColor = 'var(--gray)';
            uploadArea.style.background = 'transparent';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--gray)';
            uploadArea.style.background = 'transparent';
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                alert(`Selected ${e.dataTransfer.files.length} file(s) for upload`);
            }
        });
        
        // File input change
        fileInput.addEventListener('change', function() {
            if (this.files.length) {
                alert(`Selected ${this.files.length} file(s) for upload`);
            }
        });
    }
    
    // Upload button
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            const title = document.getElementById('uploadTitle').value;
            const category = document.getElementById('uploadCategory').value;
            
            if (!title || !category) {
                alert('Please provide a title and select a category');
                return;
            }
            
            alert('Thank you for sharing your content! In a real implementation, this would upload your file to our server.');
            
            // Reset form
            document.getElementById('uploadTitle').value = '';
            document.getElementById('uploadDesc').value = '';
            document.getElementById('uploadCategory').value = '';
            document.getElementById('uploadLocation').value = '';
            fileInput.value = '';
        });
    }
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            alert('Loading more content... In a real implementation, this would load additional gallery items.');
        });
    }
}

// Form handling
function initForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            alert(`Thank you for your message, ${name}! We will get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
}

// FAQ functionality
function initFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
}

// Lightbox functionality
function initLightbox() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const lightboxModal = document.getElementById('lightboxModal');
    const closeLightbox = document.getElementById('closeLightbox');
    
    if (viewButtons.length > 0 && lightboxModal) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const galleryItem = this.closest('.gallery-item');
                const title = galleryItem.querySelector('h3').textContent;
                const author = galleryItem.querySelector('p').textContent.replace('By: ', '');
                
                // In a real implementation, you would get this data from a database
                // For now, we'll use placeholder data
                document.getElementById('lightboxTitle').textContent = title;
                document.getElementById('lightboxAuthor').textContent = author;
                
                // Show lightbox
                lightboxModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        if (closeLightbox) {
            closeLightbox.addEventListener('click', function() {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close lightbox when clicking outside
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightboxModal.style.display === 'flex') {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Like button functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.like-btn')) {
        const likeBtn = e.target.closest('.like-btn');
        const icon = likeBtn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            
            // Increment like count
            const countSpan = likeBtn.querySelector('span') || likeBtn;
            let currentCount = parseInt(countSpan.textContent.match(/\d+/)) || 0;
            countSpan.textContent = countSpan.textContent.replace(/\d+/, currentCount + 1);
            
            // Add visual feedback
            likeBtn.style.color = '#e4405f';
            
            // In a real implementation, you would update the database
        }
    }
});