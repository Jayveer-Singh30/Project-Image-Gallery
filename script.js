 // Gallery functionality
 const gallery = document.getElementById('gallery');
 const galleryItems = document.querySelectorAll('.gallery-item');
 const filterButtons = document.querySelectorAll('.filter-btn');
 const lightbox = document.getElementById('lightbox');
 const lightboxImg = document.getElementById('lightbox-img');
 const lightboxTitle = document.getElementById('lightbox-title');
 const lightboxDescription = document.getElementById('lightbox-description');
 const lightboxClose = document.getElementById('lightbox-close');
 const lightboxPrev = document.getElementById('lightbox-prev');
 const lightboxNext = document.getElementById('lightbox-next');

 let currentImageIndex = 0;
 let currentFilter = 'all';
 let visibleItems = [];

 // Initialize gallery
 updateVisibleItems();

 // Add smooth entrance animation
 window.addEventListener('load', () => {
     galleryItems.forEach((item, index) => {
         setTimeout(() => {
             item.style.opacity = '1';
             item.style.transform = 'translateY(0)';
         }, index * 100);
     });
 });

 // Set initial state for animation
 galleryItems.forEach(item => {
     item.style.opacity = '0';
     item.style.transform = 'translateY(20px)';
     item.style.transition = 'all 0.6s ease';
 });

 // Filter functionality
 filterButtons.forEach(button => {
     button.addEventListener('click', () => {
         const filter = button.getAttribute('data-filter');

         // Update active button
         filterButtons.forEach(btn => btn.classList.remove('active'));
         button.classList.add('active');

         // Filter items
         currentFilter = filter;
         filterItems(filter);
         updateVisibleItems();
     });
 });

 function filterItems(filter) {
     galleryItems.forEach((item, index) => {
         const category = item.getAttribute('data-category');

         if (filter === 'all' || category === filter) {
             item.classList.remove('hide');
             item.classList.add('show');
             item.style.display = 'block';
             
             // Add stagger animation for filtered items
             setTimeout(() => {
                 item.style.opacity = '1';
                 item.style.transform = 'translateY(0) scale(1)';
             }, index * 50);
         } else {
             item.classList.remove('show');
             item.classList.add('hide');
             item.style.opacity = '0';
             item.style.transform = 'translateY(20px) scale(0.8)';
             
             setTimeout(() => {
                 item.style.display = 'none';
             }, 400);
         }
     });
 }

 function updateVisibleItems() {
     visibleItems = Array.from(galleryItems).filter(item => {
         const category = item.getAttribute('data-category');
         return currentFilter === 'all' || category === currentFilter;
     });
 }

 // Lightbox functionality
 galleryItems.forEach((item, index) => {
     item.addEventListener('click', () => {
         const img = item.querySelector('img');
         const title = item.querySelector('h3').textContent;
         const description = item.querySelector('p').textContent;

         // Find the index in visible items
         currentImageIndex = visibleItems.indexOf(item);

         openLightbox(img.src, img.alt, title, description);
     });
 });

 function openLightbox(src, alt, title, description) {
     lightboxImg.src = src;
     lightboxImg.alt = alt;
     lightboxTitle.textContent = title;
     lightboxDescription.textContent = description;
     lightbox.classList.add('active');
     document.body.style.overflow = 'hidden';
     
     // Add fade-in animation
     lightbox.style.opacity = '0';
     setTimeout(() => {
         lightbox.style.opacity = '1';
     }, 10);
 }

 function closeLightbox() {
     lightbox.style.opacity = '0';
     setTimeout(() => {
         lightbox.classList.remove('active');
         document.body.style.overflow = 'auto';
     }, 300);
 }

 function showNextImage() {
     if (visibleItems.length === 0) return;
     
     currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
     const nextItem = visibleItems[currentImageIndex];
     const img = nextItem.querySelector('img');
     const title = nextItem.querySelector('h3').textContent;
     const description = nextItem.querySelector('p').textContent;

     // Add transition effect
     lightboxImg.style.opacity = '0';
     setTimeout(() => {
         lightboxImg.src = img.src;
         lightboxImg.alt = img.alt;
         lightboxTitle.textContent = title;
         lightboxDescription.textContent = description;
         lightboxImg.style.opacity = '1';
     }, 150);
 }

 function showPrevImage() {
     if (visibleItems.length === 0) return;
     
     currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
     const prevItem = visibleItems[currentImageIndex];
     const img = prevItem.querySelector('img');
     const title = prevItem.querySelector('h3').textContent;
     const description = prevItem.querySelector('p').textContent;

     // Add transition effect
     lightboxImg.style.opacity = '0';
     setTimeout(() => {
         lightboxImg.src = img.src;
         lightboxImg.alt = img.alt;
         lightboxTitle.textContent = title;
         lightboxDescription.textContent = description;
         lightboxImg.style.opacity = '1';
     }, 150);
 }

 // Event listeners
 lightboxClose.addEventListener('click', closeLightbox);
 lightboxNext.addEventListener('click', showNextImage);
 lightboxPrev.addEventListener('click', showPrevImage);

 // Close lightbox when clicking outside the image
 lightbox.addEventListener('click', (e) => {
     if (e.target === lightbox) {
         closeLightbox();
     }
 });

 // Keyboard navigation
 document.addEventListener('keydown', (e) => {
     if (lightbox.classList.contains('active')) {
         switch (e.key) {
             case 'Escape':
                 closeLightbox();
                 break;
             case 'ArrowRight':
                 showNextImage();
                 break;
             case 'ArrowLeft':
                 showPrevImage();
                 break;
         }
     }
 });

 // Smooth scrolling parallax effect
 window.addEventListener('scroll', () => {
     const scrolled = window.pageYOffset;
     const parallax = document.querySelector('.header');
     const speed = scrolled * 0.3;
     
     if (parallax) {
         parallax.style.transform = `translateY(${speed}px)`;
     }
 });

 // Add hover effects
 galleryItems.forEach(item => {
     item.addEventListener('mouseenter', () => {
         item.style.filter = 'brightness(1.1)';
     });
     
     item.addEventListener('mouseleave', () => {
         item.style.filter = 'brightness(1)';
     });
 });

 // Intersection Observer for scroll animations
 const observerOptions = {
     threshold: 0.1,
     rootMargin: '0px 0px -50px 0px'
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.style.opacity = '1';
             entry.target.style.transform = 'translateY(0)';
         }
     });
 }, observerOptions);

 // Observe gallery items for scroll animations
 galleryItems.forEach(item => {
     observer.observe(item);
 });

 // Add smooth transitions for lightbox image
 lightboxImg.addEventListener('load', () => {
     lightboxImg.style.transition = 'opacity 0.3s ease';
 });

 // Performance optimization: Lazy loading for images
 const imageObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             const img = entry.target;
             if (img.dataset.src) {
                 img.src = img.dataset.src;
                 img.removeAttribute('data-src');
                 imageObserver.unobserve(img);
             }
         }
     });
 });

 // Apply lazy loading to images
 galleryItems.forEach(item => {
     const img = item.querySelector('img');
     if (img) {
         imageObserver.observe(img);
     }
 });

 // Add loading states for better UX
 galleryItems.forEach(item => {
     const img = item.querySelector('img');
     img.addEventListener('load', () => {
         item.classList.add('loaded');
     });
 });