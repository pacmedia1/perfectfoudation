// Perfect Foundation Academy Website
// Enhanced Main JavaScript File with Image Optimizations

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Image Loading and Animation System
    initImageAnimations();
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when clicking on menu items
        const menuLinks = mainMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
                mainMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Enhanced Image Loading and Animation System
    function initImageAnimations() {
        // Lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('image-loading');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.classList.add('image-loading');
            imageObserver.observe(img);
        });

        // Enhanced hover animations with performance optimization
        const animatedCards = document.querySelectorAll(
            '.program-card, .class-card, .gallery-item, .testimonial-card, .value-card, .news-item, .team-card'
        );

        animatedCards.forEach(card => {
            // Add focus support for accessibility
            card.setAttribute('tabindex', '0');
            
            // Throttled hover events for better performance
            let hoverTimeout;
            
            card.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                card.style.willChange = 'transform';
            });
            
            card.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    card.style.willChange = 'auto';
                }, 300);
            });
        });

        // Staggered animation entrance
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll(
                        '.program-card, .class-card, .gallery-item, .testimonial-card, .value-card'
                    );
                    
                    cards.forEach((card, index) => {
                        card.style.animationDelay = `${index * 0.1}s`;
                        card.classList.add('animate-in');
                    });
                    
                    animationObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll(
            '.programs-wrapper, .classes-wrapper, .gallery-wrapper, .testimonials-wrapper, .values-wrapper'
        );
        
        sections.forEach(section => {
            animationObserver.observe(section);
        });

        // Add CSS for entrance animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: slideInUp 0.8s ease forwards;
                opacity: 0;
                transform: translateY(30px);
            }
            
            @keyframes slideInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const icon = otherItem.querySelector('.toggle-icon i');
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                const icon = item.querySelector('.toggle-icon i');
                
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });
    }
    
    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let count = 0;
                    const updateCounter = () => {
                        if (count < target) {
                            count++;
                            counter.innerText = count;
                            setTimeout(updateCounter, 30);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mainMenu && mainMenu.classList.contains('active')) {
                    mainMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Form Submission
    const forms = document.querySelectorAll('form');
    
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // In a real implementation, you would send the form data to a server
                // For now, just show an alert
                alert('Form submitted successfully! In a real implementation, this would be sent to the school email.');
                form.reset();
            });
        });
    }
    
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const menuItems = document.querySelectorAll('.main-menu li a');
    
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            const itemPath = item.getAttribute('href');
            if (currentLocation.includes(itemPath) && itemPath !== 'index.html') {
                item.parentElement.classList.add('active');
            } else if (currentLocation.endsWith('/') || currentLocation.endsWith('index.html')) {
                if (itemPath === 'index.html') {
                    item.parentElement.classList.add('active');
                }
            }
        });
    }
    
    // Scroll to Top Button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add scroll-top-btn styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-pink);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: var(--shadow-md);
        }
        
        .scroll-top-btn.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-top-btn:hover {
            background: var(--secondary-pink);
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);

    // News Filter Functionality
    const newsFilterBtns = document.querySelector('.news-filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    if (newsFilterBtns) {
        newsFilterBtns.addEventListener('click', function() {
            newsFilterBtns.classList.remove('active');
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            newsCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('animate-on-scroll', 'fade-in-up');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Gallery Filter Functionality
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryFilterBtns.length > 0) {
        galleryFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                galleryFilterBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.classList.add('animate-on-scroll', 'fade-in-up');
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Lightbox Functionality
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (galleryImages.length > 0 && lightbox) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                const src = this.src;
                const caption = this.alt;
                
                lightboxImg.src = src;
                lightbox.querySelector('.lightbox-caption h3').textContent = caption;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        if (closeLightbox) {
            closeLightbox.addEventListener('click', function() {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Load more gallery items (demo functionality)
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            setTimeout(() => {
                this.textContent = 'Load More';
            }, 1000);
        });
    }

    // Timetable Filter Functionality
    const timetableFilterBtns = document.querySelectorAll('.filter-btn');
    const timetableSections = document.querySelectorAll('.timetable-section');
    
    if (timetableFilterBtns.length > 0) {
        timetableFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                timetableFilterBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                timetableSections.forEach(section => {
                    const sectionClass = section.getAttribute('data-class');
                    
                    if (filter === 'all' || sectionClass === filter) {
                        section.classList.remove('hidden');
                        section.style.display = 'block';
                    } else {
                        section.classList.add('hidden');
                        setTimeout(() => {
                            section.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }

    // Enhanced Animation on Scroll
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Stagger animations for cards
    function staggerAnimations() {
        const cardGroups = document.querySelectorAll('.card, .news-card, .class-card, .gallery-item, .hours-card');
        cardGroups.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-on-scroll', 'fade-in-up');
        });
    }
    
    // Initialize animations
    staggerAnimations();
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Enhanced Form Validation and Submission for General Forms
    const generalAdmissionForm = document.querySelector('.admission-form form');
    if (generalAdmissionForm) {
        generalAdmissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(generalAdmissionForm);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Basic validation
            const requiredFields = ['childName', 'childAge', 'parentName', 'parentEmail', 'parentPhone'];
            let isValid = true;
            let errorMessages = [];
            
            requiredFields.forEach(field => {
                if (!formObject[field] || formObject[field].trim() === '') {
                    isValid = false;
                    errorMessages.push(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formObject.parentEmail && !emailRegex.test(formObject.parentEmail)) {
                isValid = false;
                errorMessages.push('Please enter a valid email address');
            }
            
            // Phone validation
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (formObject.parentPhone && !phoneRegex.test(formObject.parentPhone)) {
                isValid = false;
                errorMessages.push('Please enter a valid phone number');
            }
            
            // Age validation
            if (formObject.childAge && (isNaN(formObject.childAge) || formObject.childAge < 1 || formObject.childAge > 18)) {
                isValid = false;
                errorMessages.push('Please enter a valid age between 1 and 18');
            }
            
            if (isValid) {
                // Success message
                showMessage('Application submitted successfully! We will contact you soon.', 'success');
                generalAdmissionForm.reset();
            } else {
                // Error message
                showMessage('Please fix the following errors:\n' + errorMessages.join('\n'), 'error');
            }
        });
    }

    // Enhanced Form Validation and Submission (Legacy)
    const legacyAdmissionForm = document.querySelector('.admission-form form');
    if (legacyAdmissionForm) {
        legacyAdmissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formElements = this.querySelectorAll('input, select, textarea');
            let isValid = true;
            
            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(error => error.remove());
            document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));
            
            // Validate each field
            formElements.forEach(element => {
                const value = element.value.trim();
                const fieldName = element.name;
                const formGroup = element.closest('.form-group');
                
                if (element.hasAttribute('required') && !value) {
                    showError(formGroup, `${getFieldLabel(fieldName)} is required`);
                    isValid = false;
                    return;
                }
                
                if (element.type === 'email' && value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        showError(formGroup, 'Please enter a valid email address');
                        isValid = false;
                        return;
                    }
                }
                
                if (element.type === 'tel' && value) {
                    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                    if (!phoneRegex.test(value)) {
                        showError(formGroup, 'Please enter a valid phone number');
                        isValid = false;
                        return;
                    }
                }
                
                if (fieldName === 'child_age' && value) {
                    const age = parseInt(value);
                    if (age < 2 || age > 14) {
                        showError(formGroup, 'Child age must be between 2 and 14 years');
                        isValid = false;
                        return;
                    }
                }
            });
            
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showSuccessMessage('Application submitted successfully! We will contact you within 24 hours.');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
    
    function showError(formGroup, message) {
        formGroup.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }
    
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            successDiv.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(successDiv);
            }, 300);
        }, 5000);
    }
    
    function getFieldLabel(fieldName) {
        const labels = {
            'parent_name': 'Parent Name',
            'parent_email': 'Email Address',
            'parent_phone': 'Phone Number',
            'child_name': 'Child Name',
            'child_age': 'Child Age',
            'preferred_class': 'Preferred Class',
            'start_date': 'Preferred Start Date',
            'message': 'Additional Information'
        };
        return labels[fieldName] || fieldName.replace('_', ' ');
    }

    // Social Media Integration
    function initSocialSharing() {
        const shareButtons = document.querySelectorAll('.social-share-btn');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const platform = this.classList.contains('facebook-share') ? 'facebook' :
                               this.classList.contains('twitter-share') ? 'twitter' :
                               this.classList.contains('whatsapp-share') ? 'whatsapp' :
                               this.classList.contains('linkedin-share') ? 'linkedin' : '';
                
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Check out Perfect Foundation Academy - Quality education for children aged 2-14 years!');
                
                let shareUrl = '';
                
                switch(platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://wa.me/?text=${text}%20${url}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }
    
    initSocialSharing();

    // Enhanced Button Animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.classList.add('pulse-animation');
        });
        
        btn.addEventListener('mouseleave', function() {
            this.classList.remove('pulse-animation');
        });
        
        btn.addEventListener('click', function() {
            this.classList.add('bounce-animation');
            setTimeout(() => {
                this.classList.remove('bounce-animation');
            }, 1000);
        });
    });

    // Floating Social Media Buttons
    function createFloatingSocial() {
        const floatingDiv = document.createElement('div');
        floatingDiv.className = 'floating-social';
        floatingDiv.innerHTML = `
            <a href="https://facebook.com/perfectfoundationacademy" target="_blank" class="social-link facebook">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com/perfectfoundationacademy" target="_blank" class="social-link instagram">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/233244986221" target="_blank" class="social-link whatsapp">
                <i class="fab fa-whatsapp"></i>
            </a>
            <a href="https://youtube.com/@perfectfoundationacademy" target="_blank" class="social-link youtube">
                <i class="fab fa-youtube"></i>
            </a>
        `;
        
        document.body.appendChild(floatingDiv);
    }

    // File Upload Functionality
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        const wrapper = input.closest('.file-upload-wrapper');
        const uploadArea = wrapper.querySelector('.file-upload-area');
        const preview = wrapper.querySelector('.file-preview');
        const fileName = preview.querySelector('.file-name');
        const removeBtn = preview.querySelector('.remove-file');

        // Handle file selection
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validate file size (5MB limit)
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size must be less than 5MB');
                    input.value = '';
                    return;
                }

                // Validate file type
                const allowedTypes = input.accept.split(',').map(type => type.trim());
                const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                const mimeType = file.type;
                
                if (!allowedTypes.some(type => 
                    type === fileExtension || type === mimeType || 
                    (type.startsWith('.') && fileExtension === type)
                )) {
                    alert('Invalid file type. Please select a valid file.');
                    input.value = '';
                    return;
                }

                // Show preview
                fileName.textContent = file.name;
                uploadArea.style.display = 'none';
                preview.style.display = 'flex';
            }
        });

        // Handle drag and drop
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-color)';
            uploadArea.style.background = 'rgba(255, 107, 107, 0.1)';
        });

        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = '#ddd';
            uploadArea.style.background = 'var(--bg-light)';
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = '#ddd';
            uploadArea.style.background = 'var(--bg-light)';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                input.files = files;
                input.dispatchEvent(new Event('change'));
            }
        });

        // Handle remove file
        removeBtn.addEventListener('click', function() {
            input.value = '';
            uploadArea.style.display = 'block';
            preview.style.display = 'none';
        });
    });

    // Enhanced Form Validation for Admission Form
    const admissionForm = document.querySelector('#admissionForm');
    if (admissionForm) {
        // Add real-time validation for file uploads
        const requiredFileInputs = admissionForm.querySelectorAll('input[type="file"][required]');
        const termsCheckboxes = admissionForm.querySelectorAll('input[name="terms_conditions"], input[name="privacy_policy"]');
        
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Always prevent default to handle via AJAX
            
            let isValid = true;
            let errorMessages = [];

            // Validate required file uploads
            requiredFileInputs.forEach(input => {
                if (!input.files || input.files.length === 0) {
                    isValid = false;
                    const label = input.closest('.upload-group').querySelector('.upload-label');
                    const fieldName = label.textContent.replace(' *', '');
                    errorMessages.push(`${fieldName} is required`);
                    
                    // Highlight the upload area
                    const uploadArea = input.closest('.file-upload-wrapper').querySelector('.file-upload-area');
                    uploadArea.style.borderColor = '#e74c3c';
                    uploadArea.style.background = 'rgba(231, 76, 60, 0.1)';
                }
            });

            // Validate terms and conditions
            let termsAccepted = true;
            termsCheckboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    termsAccepted = false;
                }
            });

            if (!termsAccepted) {
                isValid = false;
                errorMessages.push('Please accept the Terms and Conditions and Privacy Policy');
            }

            if (!isValid) {
                // Show error messages
                showFormErrors(errorMessages);
                return;
            }

            // Submit form via AJAX
            submitAdmissionForm(this);
        });

        // Clear validation errors when files are selected
        requiredFileInputs.forEach(input => {
            input.addEventListener('change', function() {
                if (this.files && this.files.length > 0) {
                    const uploadArea = this.closest('.file-upload-wrapper').querySelector('.file-upload-area');
                    uploadArea.style.borderColor = '#ddd';
                    uploadArea.style.background = 'var(--bg-light)';
                }
            });
        });
    }

    // Show form errors
    function showFormErrors(errorMessages) {
        let errorHtml = '<div class="form-errors" style="background: #fee; border: 1px solid #e74c3c; color: #e74c3c; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><h4>Please fix the following errors:</h4><ul>';
        errorMessages.forEach(msg => {
            errorHtml += `<li>${msg}</li>`;
        });
        errorHtml += '</ul></div>';

        // Remove existing error messages
        const existingErrors = admissionForm.querySelector('.form-errors');
        if (existingErrors) {
            existingErrors.remove();
        }

        // Insert error messages at the top of the form
        admissionForm.insertAdjacentHTML('afterbegin', errorHtml);
        
        // Scroll to top of form
        admissionForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Submit admission form via AJAX
    function submitAdmissionForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Prepare form data
        const formData = new FormData(form);

        // Submit via fetch
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success message
                showSuccessMessage(data.message, data.admission_id);
                form.reset();
                
                // Clear file previews
                form.querySelectorAll('.file-preview').forEach(preview => {
                    preview.style.display = 'none';
                });
                form.querySelectorAll('.file-upload-area').forEach(area => {
                    area.style.display = 'block';
                });
            } else {
                // Show error messages
                if (data.errors && Array.isArray(data.errors)) {
                    showFormErrors(data.errors);
                } else {
                    showFormErrors([data.error || 'An error occurred while submitting your application']);
                }
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            showFormErrors(['Network error. Please check your connection and try again.']);
        })
        .finally(() => {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    // Show success message
    function showSuccessMessage(message, admissionId) {
        const successHtml = `
            <div class="form-success" style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                <h4><i class="fas fa-check-circle"></i> Application Submitted Successfully!</h4>
                <p>${message}</p>
                <p><strong>Application ID: #${admissionId}</strong></p>
                <p>Please save this ID for your records. You will receive a confirmation email shortly.</p>
            </div>
        `;

        // Remove existing messages
        const existingMessages = admissionForm.querySelectorAll('.form-errors, .form-success');
        existingMessages.forEach(msg => msg.remove());

        // Insert success message at the top of the form
        admissionForm.insertAdjacentHTML('afterbegin', successHtml);
        
        // Scroll to top of form
        admissionForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    createFloatingSocial();
    
    // Initialize Slideshow
    initSlideshow();
});

// ===== IMAGE SLIDESHOW FUNCTIONALITY =====
let currentSlideIndex = 0;
let slideInterval;
let isAutoPlaying = true;
let progressInterval;
const slideShowDuration = 5000; // 5 seconds per slide
let slides, indicators, currentSlideElement, totalSlidesElement, progressFill;

function initSlideshow() {
    // Get slideshow elements
    slides = document.querySelectorAll('.slide');
    indicators = document.querySelectorAll('.indicator');
    currentSlideElement = document.querySelector('.current-slide');
    totalSlidesElement = document.querySelector('.total-slides');
    progressFill = document.querySelector('.progress-fill');
    
    if (!slides.length) return; // No slideshow on this page
    
    // Set total slides count
    if (totalSlidesElement) {
        totalSlidesElement.textContent = slides.length;
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Start auto-play
    startAutoPlay();
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Pause auto-play when user hovers over slideshow
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', pauseAutoPlay);
        slideshowContainer.addEventListener('mouseleave', () => {
            if (isAutoPlaying) startAutoPlay();
        });
    }
    
    // Handle swipe gestures for mobile
    if (slideshowContainer) {
        let startX, startY, distX, distY;
        const threshold = 50; // Minimum distance for swipe
        
        slideshowContainer.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
        });
        
        slideshowContainer.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling while swiping
        });
        
        slideshowContainer.addEventListener('touchend', (e) => {
            const touch = e.changedTouches[0];
            distX = touch.clientX - startX;
            distY = touch.clientY - startY;
            
            // Check if horizontal swipe is longer than vertical
            if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
                if (distX > 0) {
                    changeSlide(-1); // Swipe right - previous slide
                } else {
                    changeSlide(1);  // Swipe left - next slide
                }
            }
        });
    }
    
    // Intersection Observer to pause/resume when slideshow is not visible
    const slideshowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (isAutoPlaying) startAutoPlay();
            } else {
                pauseAutoPlay();
            }
        });
    }, { threshold: 0.1 });
    
    if (slideshowContainer) {
        slideshowObserver.observe(slideshowContainer);
    }
}

function showSlide(index) {
    if (!slides.length) return;
    
    // Remove active class from all slides and indicators
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i < index) {
            slide.classList.add('prev');
        }
    });
    
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    // Update slide counter
    if (currentSlideElement) {
        currentSlideElement.textContent = index + 1;
    }
    
    currentSlideIndex = index;
    
    // Reset progress bar
    resetProgressBar();
}

function changeSlide(direction) {
    let newIndex = currentSlideIndex + direction;
    
    if (newIndex >= slides.length) {
        newIndex = 0; // Loop to first slide
    } else if (newIndex < 0) {
        newIndex = slides.length - 1; // Loop to last slide
    }
    
    showSlide(newIndex);
    
    // Restart auto-play if active
    if (isAutoPlaying) {
        restartAutoPlay();
    }
}

function currentSlide(index) {
    showSlide(index - 1); // Convert to 0-based index
    
    // Restart auto-play if active
    if (isAutoPlaying) {
        restartAutoPlay();
    }
}

function startAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
    if (progressInterval) clearInterval(progressInterval);
    
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, slideShowDuration);
    
    // Start progress bar animation
    startProgressBar();
}

function pauseAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

function restartAutoPlay() {
    pauseAutoPlay();
    if (isAutoPlaying) {
        startAutoPlay();
    }
}

function toggleAutoPlay() {
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const icon = playPauseBtn.querySelector('i');
    const text = playPauseBtn.querySelector('.control-text');
    
    isAutoPlaying = !isAutoPlaying;
    
    if (isAutoPlaying) {
        startAutoPlay();
        icon.className = 'fas fa-pause';
        text.textContent = 'Pause';
    } else {
        pauseAutoPlay();
        icon.className = 'fas fa-play';
        text.textContent = 'Play';
    }
}

function startProgressBar() {
    if (!progressFill) return;
    
    let progress = 0;
    const increment = 100 / (slideShowDuration / 100); // Update every 100ms
    
    progressFill.style.width = '0%';
    
    progressInterval = setInterval(() => {
        progress += increment;
        if (progress <= 100) {
            progressFill.style.width = progress + '%';
        }
    }, 100);
}

function resetProgressBar() {
    if (progressFill) {
        progressFill.style.width = '0%';
    }
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

function handleKeyboardNavigation(e) {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (!slideshowContainer || !slides.length) return;
    
    // Only handle keys when slideshow is in viewport or focused
    const rect = slideshowContainer.getBoundingClientRect();
    const inViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
    
    if (!inViewport && document.activeElement !== slideshowContainer) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            changeSlide(-1);
            break;
        case 'ArrowRight':
            e.preventDefault();
            changeSlide(1);
            break;
        case ' ': // Spacebar
            e.preventDefault();
            toggleAutoPlay();
            break;
        case 'Home':
            e.preventDefault();
            currentSlide(1);
            break;
        case 'End':
            e.preventDefault();
            currentSlide(slides.length);
            break;
    }
}

// Page Visibility API - pause slideshow when tab is not active
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseAutoPlay();
    } else if (isAutoPlaying) {
        startAutoPlay();
    }
});

// Preload images for better performance
function preloadSlideImages() {
    const images = document.querySelectorAll('.slide img');
    images.forEach(img => {
        const imagePreloader = new Image();
        imagePreloader.src = img.src;
    });
}

// Initialize preloading when slideshow is detected
if (document.querySelector('.slideshow-container')) {
    preloadSlideImages();
}