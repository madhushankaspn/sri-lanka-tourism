
document.addEventListener('DOMContentLoaded', function() {
    
    initNavigation();
    initImageSliders();
    initVideoPlayer();
    initSearchFunctionality();
    initFiltering();
    initGallery();
    initForms();
    initFAQs();
    initLightbox();
    
    
    setActiveNavLink();
});


function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}


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


function initImageSliders() {
    
    const homeSlider = document.querySelector('.slider');
    if (homeSlider) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        
        let slideInterval = setInterval(nextSlide, 5000);
        
        
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        
        if (nextBtn) nextBtn.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
        
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                resetInterval();
            });
        });
        
        
        showSlide(0);
    }
    
    
    const placeSlider = document.querySelector('.place-main-slider');
    if (placeSlider) {
        const placeSlides = document.querySelectorAll('.place-slide');
        const placeThumbs = document.querySelectorAll('.thumb');
        const placePrevBtn = document.querySelector('.place-slider-btn.prev-btn');
        const placeNextBtn = document.querySelector('.place-slider-btn.next-btn');
        
        let currentPlaceSlide = 0;
        const totalPlaceSlides = placeSlides.length;
        
        
        function showPlaceSlide(n) {
            placeSlides.forEach(slide => slide.classList.remove('active'));
            placeThumbs.forEach(thumb => thumb.classList.remove('active'));
            
            currentPlaceSlide = (n + totalPlaceSlides) % totalPlaceSlides;
            placeSlides[currentPlaceSlide].classList.add('active');
            placeThumbs[currentPlaceSlide].classList.add('active');
        }
        
        
        if (placeNextBtn) placeNextBtn.addEventListener('click', function() {
            showPlaceSlide(currentPlaceSlide + 1);
        });
        
        if (placePrevBtn) placePrevBtn.addEventListener('click', function() {
            showPlaceSlide(currentPlaceSlide - 1);
        });
        
        
        placeThumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                showPlaceSlide(index);
            });
        });
        
        
        showPlaceSlide(0);
    }
}


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
        
        
        promoVideo.addEventListener('ended', function() {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }
}


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


function performSearch(query) {
    if (query.trim() !== '') {
        alert(`Searching for: "${query}"\nIn a real implementation, this would redirect to search results.`);
        
        
    } else {
        alert('Please enter a search term');
    }
}


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


function initFiltering() {
    
    const categoryTabs = document.querySelectorAll('.category-tab');
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                
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
    
    
    const serviceTabs = document.querySelectorAll('.service-tab');
    if (serviceTabs.length > 0) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                
                serviceTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                
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
    
    
    const galleryFilterBtns = document.querySelectorAll('.filter-btn');
    if (galleryFilterBtns.length > 0) {
        galleryFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                
                galleryFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                
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
    
    
    const resetFiltersBtn = document.getElementById('resetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            document.getElementById('categoryFilter').value = 'all';
            document.getElementById('regionFilter').value = 'all';
            document.getElementById('placesSearch').value = '';
            
            
            document.querySelectorAll('.category-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-category') === 'all') {
                    tab.classList.add('active');
                }
            });
            
            
            document.querySelectorAll('.place-card').forEach(card => {
                card.style.display = 'block';
            });
        });
    }
}


function initGallery() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        
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
        
        
        fileInput.addEventListener('change', function() {
            if (this.files.length) {
                alert(`Selected ${this.files.length} file(s) for upload`);
            }
        });
    }
    
    
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
            
            
            document.getElementById('uploadTitle').value = '';
            document.getElementById('uploadDesc').value = '';
            document.getElementById('uploadCategory').value = '';
            document.getElementById('uploadLocation').value = '';
            fileInput.value = '';
        });
    }
    
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            alert('Loading more content... In a real implementation, this would load additional gallery items.');
        });
    }
}


function initForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            
            alert(`Thank you for your message, ${name}! We will get back to you soon.`);
            
            
            contactForm.reset();
        });
    }
}


function initFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
}


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
                
                
                
                document.getElementById('lightboxTitle').textContent = title;
                document.getElementById('lightboxAuthor').textContent = author;
                
                
                lightboxModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        
        if (closeLightbox) {
            closeLightbox.addEventListener('click', function() {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightboxModal.style.display === 'flex') {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}


document.addEventListener('click', function(e) {
    if (e.target.closest('.like-btn')) {
        const likeBtn = e.target.closest('.like-btn');
        const icon = likeBtn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            
            
            const countSpan = likeBtn.querySelector('span') || likeBtn;
            let currentCount = parseInt(countSpan.textContent.match(/\d+/)) || 0;
            countSpan.textContent = countSpan.textContent.replace(/\d+/, currentCount + 1);
            
            
            likeBtn.style.color = '#e4405f';
            
            
        }
    }
});




function checkLoginStatus() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userLoggedIn === 'true' && userEmail) {
        
        updateNavbarForLoggedInUser(userEmail);
    }
}


function updateNavbarForLoggedInUser(email) {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    
    const loginLink = navMenu.querySelector('a[href="login.html"]');
    if (loginLink) {
        loginLink.remove();
    }
    
    
    const userProfile = document.createElement('a');
    userProfile.href = '#';
    userProfile.className = 'nav-link user-profile';
    userProfile.innerHTML = `
        <div class="user-avatar-small">
            <i class="fas fa-user"></i>
        </div>
        <span>${email.split('@')[0]}</span>
    `;
    
    navMenu.appendChild(userProfile);
    
    
    userProfile.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userEmail');
            window.location.reload();
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    
    
});