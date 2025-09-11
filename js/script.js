// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    // Welcome Popup functionality
    const welcomePopup = document.getElementById('welcomePopup');
    const closeWelcome = document.querySelector('.close-welcome');
    const continueButton = document.getElementById('continueToSite');
    
    console.log('Welcome popup element found:', welcomePopup !== null);
    console.log('Close welcome button found:', closeWelcome !== null);
    console.log('Continue button found:', continueButton !== null);
    
    // Always show welcome popup when page loads
    if (welcomePopup) {
        // Use setTimeout to ensure the popup shows after the page has fully loaded
        setTimeout(function() {
            welcomePopup.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind popup
            console.log('Welcome popup displayed');
        }, 500);
    }
    
    // Close popup when X is clicked
    if (closeWelcome) {
        closeWelcome.addEventListener('click', function() {
            console.log('Close welcome button clicked');
            welcomePopup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Close popup when continue button is clicked
    if (continueButton) {
        continueButton.addEventListener('click', function() {
            console.log('Continue button clicked');
            welcomePopup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Get the menu toggle and navigation menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    console.log('Menu toggle element found:', menuToggle !== null);
    console.log('Nav menu element found:', navMenu !== null);
    
    // Toggle the navigation menu when the menu icon is clicked
    menuToggle.addEventListener('click', function(e) {
        console.log('Menu toggle clicked');
        e.stopPropagation();
        navMenu.classList.toggle('show');
        menuToggle.classList.toggle('open');
        body.classList.toggle('menu-open');
    });
    
    // Close the menu when a menu item is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                menuToggle.classList.remove('open');
                body.classList.remove('menu-open');
            }
        });
    });
    
    // Close the menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            menuToggle.classList.remove('open');
            body.classList.remove('menu-open');
        }
    });
    
    // Add animation delay for nav items on page load
    setTimeout(function() {
        const headerElement = document.querySelector('header');
        headerElement.classList.add('loaded');
    }, 100);
    
    // Function to check window width and adjust menu accordingly
    function checkWindowSize() {
        if (window.innerWidth > 768) {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                menuToggle.classList.remove('open');
                body.classList.remove('menu-open');
            }
        }
    }
    
    // Call on resize
    window.addEventListener('resize', checkWindowSize);
    
    // Handle Buy Now button clicks
    const buyButtons = document.querySelectorAll('.buy-now-btn');
    const buyNowModal = document.getElementById('buyNowModal');
    const closeBuyNowModal = document.querySelector('#buyNowModal .close-modal');
    let currentProduct = '';
    
    console.log('Buy Now buttons found:', buyButtons.length);
    console.log('Buy Now modal found:', buyNowModal !== null);
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Buy Now button clicked');
            e.preventDefault();
            const productName = this.closest('.product-item').querySelector('.product-name').textContent;
            currentProduct = productName;
            
            // Add a visual feedback for the button click
            this.classList.add('clicked');
            
            // Show modal
            buyNowModal.style.display = 'block';
            
            // Use setTimeout to ensure CSS transition works properly
            setTimeout(() => {
                buyNowModal.classList.add('show');
            }, 10);
            
            // Disable button temporarily
            this.disabled = true;
            
            // Create and display a floating animation effect
            const floatingIcon = document.createElement('div');
            floatingIcon.innerHTML = '🛒';
            floatingIcon.style.position = 'absolute';
            floatingIcon.style.fontSize = '24px';
            floatingIcon.style.left = '50%';
            floatingIcon.style.top = '50%';
            floatingIcon.style.transform = 'translate(-50%, -50%)';
            floatingIcon.style.zIndex = '100';
            floatingIcon.style.opacity = '1';
            floatingIcon.style.transition = 'all 1s ease-out';
            
            this.parentNode.appendChild(floatingIcon);
            
            setTimeout(() => {
                floatingIcon.style.top = '-30px';
                floatingIcon.style.opacity = '0';
            }, 10);
            
            // Reset after animation completes
            setTimeout(() => {
                this.classList.remove('clicked');
                this.disabled = false;
                if (floatingIcon && floatingIcon.parentNode) {
                    floatingIcon.parentNode.removeChild(floatingIcon);
                }
            }, 1000);
        });
        
        // Add ripple effect on button click
        button.addEventListener('mousedown', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.className = 'ripple';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Modal close functionality for Buy Now modal
    closeBuyNowModal.addEventListener('click', function() {
        console.log('Close Buy Now modal clicked');
        buyNowModal.classList.remove('show');
        setTimeout(() => {
            buyNowModal.style.display = 'none';
        }, 300);
    });
    
    // Close Buy Now modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === buyNowModal) {
            buyNowModal.classList.remove('show');
            setTimeout(() => {
                buyNowModal.style.display = 'none';
            }, 300);
        }
    });
    
    // Add animation to WhatsApp button
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    }
    
    // Handle See Video button clicks
    const videoButtons = document.querySelectorAll('.see-video-btn');
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.querySelector('#videoModal .close-modal');
    const productVideo = document.getElementById('productVideo');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const videoProductName = document.getElementById('videoProductName');
    const videoProductDescription = document.getElementById('videoProductDescription');
    const galleryImages = document.getElementById('galleryImages');
    
    // Add video error handling
    if (productVideo) {
        productVideo.addEventListener('error', function(e) {
            console.error('Video error event:', e);
            console.error('Video error message:', productVideo.error ? productVideo.error.message : 'Unknown error');
        });
    }
    
    console.log('See Video buttons found:', videoButtons.length);
    console.log('Video modal found:', videoModal !== null);
    console.log('Product video element found:', productVideo !== null);
    console.log('Gallery images container found:', galleryImages !== null);
    
    // Function to find all images with matching prefix in the image folder
    function findMatchingImages(prefix) {
        // List of known image extensions for each prefix (from workspace info)
        const knownImages = {
            '1st': ['images/1st.jpg'],
            '2nd': ['images/2nd.jpg', 'images/2nd+.jpg'],
            '3rd': ['images/3rd.jpg'],
            '4th': ['images/4th.jpg', 'images/4th+.jpg'],
            '5th': ['images/5th.jpg', 'images/5th+.jpg'],
            '6th': ['images/6th.jpg', 'images/6th+.jpg'],
            '7th': ['images/7th.jpg', 'images/7th+.jpg'],
            '8th': ['images/8th.jpg', 'images/8th+.jpg', 'images/8th++.jpg'],
            '9th': ['images/9th.jpg', 'images/9th+.jpg'],
            '10th': ['images/10th.jpg', 'images/10th+.jpg'],
            '11th': ['images/11th.jpg', 'images/11th+.jpg', 'images/11th++.jpg'],
            '12th': ['images/12th.jpg', 'images/12th+.jpg'],
            '13th': ['images/13th.jpg', 'images/13th+.jpg'],
            '14th': ['images/14th.jpg', 'images/14th+.jpg', 'images/14th++.jpg'],
            '15th': ['images/15th.jpg', 'images/15th+.jpg', 'images/15th++.jpg'],
            '16th': ['images/16th.jpg', 'images/16th+.jpg', 'images/16th++.jpg'],
            '17th': ['images/17th.jpg', 'images/17th+.jpg', 'images/17th++.jpg'],
            '18th': ['images/18th.jpg', 'images/18th+.jpg', 'images/18th++.jpg'],
            '19th': ['images/19th.jpg', 'images/19th+.jpg', 'images/19th++.jpg'],
            '20th': ['images/20th.jpg', 'images/20th+.jpg', 'images/20th++.jpg', 'images/20th+++++.jpg', 'images/20+++.jpg', 'images/20yh++++.jpg']
        };
        
        // Log what images we're finding for debugging
        console.log(`Finding images for prefix: ${prefix}`);
        console.log(`Found images:`, knownImages[prefix] || []);
        
        return knownImages[prefix] || [];
    }
    
    // Function to generate video source path for a product key
    function getVideoSource(key) {
        return `VIDEO/${key}.mp4`;
    }
    
    // Sample product data (in a real site, this would come from a database)
    const productData = {
        '1st': {
            videoSrc: getVideoSource('1st'),
            images: findMatchingImages('1st'),
            description: 'Latest waterproof tuya smart lock with active video surveillance.'
        },
        '2nd': {
            videoSrc: getVideoSource('2nd'),
            images: findMatchingImages('2nd'),
            description: 'Full automatic tuya smart lock with 3d facial recognition, 4.5-inch hd display active cctv video surveillance.'
        },
        '3rd': {
            videoSrc: getVideoSource('3rd'),
            images: findMatchingImages('3rd'),
            description: 'Most unique tuya rolex design smart lock with 3d facial recognition, video intercome, and active video monitoring.'
        },
        '4th': {
            videoSrc: getVideoSource('4th'),
            images: findMatchingImages('4th'),
            description: 'Most unique smart lock with double display screens,batteries,camera lens, support fingerprint/pasword unlock, ic card unlock, nanual key unlock and remote unlock.'
        },
        '5th': {
            videoSrc: getVideoSource('5th'),
            images: findMatchingImages('5th'),
            description: '(HY09)model. the only semi autoatic smart lock with 5inch hd screen display. design with tuya app, suppport remote unlock via app, figerprint, password, ic card,and manual key unlock.'
        },
        '6th': {
            videoSrc: getVideoSource('6th'),
            images: findMatchingImages('6th'),
            description: 'Semi automatic smart lock design with durable and long lasting zinc alloy material. suitable for use in rooms and office doors.'
        },
        '7th': {
            videoSrc: getVideoSource('7th'),
            images: findMatchingImages('7th'),
            description: 'P3pro tuya 4.5-inch hd display lock with 3d facial recognition,video active cctv surveillance, video calling with otp enabled.'
        },
        '8th': {
            videoSrc: getVideoSource('8th'),
            images: findMatchingImages('8th'),
            description: 'most unique smart locks with front luminious keypad.designed to be used in all existin doors'
        },
        '9th': {
            videoSrc: getVideoSource('9th'),
            images: findMatchingImages('9th'),
            description: 'tuya smart locks designed for aluinum slim doors.suitable for all doors with slim frame structure.'
        },
        '10th': {
            videoSrc: getVideoSource('10th'),
            images: findMatchingImages('10th'),
            description: 'newly improved hotel locks.design durability and unique appearance, perfectly configured to make your hotel manage ment very easy.'
        },
        '11th': {
            videoSrc: getVideoSource('11th'),
            images: findMatchingImages('11th'),
            description: '4G solar PTZ camera with solar street light,design with 3 lenses that allow you to veiw all angles at the same time.'
        },
        '12th': {
            videoSrc: getVideoSource('12th'),
            images: findMatchingImages('12th'),
            description: 'Solar 4G PTZ Camera'
        },
        '13th': {
            videoSrc: getVideoSource('13th'),
            images: findMatchingImages('13th'),
            description: 'tripple lens solar 4G PTZ cameras, support multiple veiws at the same time.'
        },
        '14th': {
            videoSrc: getVideoSource('14th'),
            images: findMatchingImages('14th'),
            description: 'Designed for executives with discerning taste.'
        },
        '15th': {
            videoSrc: getVideoSource('15th'),
            images: findMatchingImages('15th'),
            description: 'Masterfully crafted with exceptional attention to detail.'
        },
        '16th': {
            videoSrc: getVideoSource('16th'),
            images: findMatchingImages('16th'),
            description: 'Our platinum-tier product with superior features and unmatched quality.'
        },
        '17th': {
            videoSrc: getVideoSource('17th'),
            images: findMatchingImages('17th'),
            description: 'Carefully selected premium materials and exceptional craftsmanship.'
        },
        '18th': {
            videoSrc: getVideoSource('18th'),
            images: findMatchingImages('18th'),
            description: 'Designed by award-winning artisans, offers unique appeal with distinctive aesthetics and superior quality.'
        },
        '19th': {
            videoSrc: getVideoSource('19th'),
            images: findMatchingImages('19th'),
            description: 'The prestige choice with exceptional quality standards.'
        },
        '20th': {
            videoSrc: getVideoSource('20th'),
            images: findMatchingImages('20th'),
            description: 'Our flagship product, representing the perfect blend of innovation, craftsmanship, and exclusive design elements.'
        }
    };
    
    console.log('Available product keys:', Object.keys(productData));
    
    // Define the click handler function separately for better organization
    function handleVideoButtonClick(e) {
            console.log('See Video button clicked');
            e.stopPropagation(); // Prevent event bubbling
            const productItem = this.closest('.product-item');
            const productDesc = productItem.querySelector('.product-description').textContent;
            const productImageSrc = productItem.querySelector('.product-image img').src;
            
            // Extract image filename to identify the product
            const imgSrc = productImageSrc.split('/').pop();
            let productKey = '';
            
            // Get the index of this product item among all product items
    // This will give us a zero-based index, so the first product is 0, second is 1, etc.
    const allProducts = document.querySelectorAll('.product-item');
    let productIndex = 0;
    
    for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i] === productItem) {
            productIndex = i;
            break;
        }
    }
    
    // Convert to the numbered format (1st, 2nd, etc.) based on position in the grid
    const productNumber = productIndex + 1; // Convert to 1-based index
    
    // Map the number to the corresponding key format
    if (productNumber === 1) productKey = '1st';
    else if (productNumber === 2) productKey = '2nd';
    else if (productNumber === 3) productKey = '3rd';
    else if (productNumber >= 4 && productNumber <= 20) productKey = productNumber + 'th';
    else productKey = 'unknown';
    
    console.log(`Product index: ${productIndex}, Product number: ${productNumber}, Product key: ${productKey}`);
            
            console.log('Product details - Product Key:', productKey, 'Description:', productDesc, 'Image:', productImageSrc);
            
            // Add a visual feedback for the button click
            this.classList.add('clicked');
            
            // Set video modal content (removed since we no longer show product name and description)
            
            // Set video source using the videos from the VIDEO folder
            if (productData[productKey] && productData[productKey].videoSrc) {
                try {
                    // Get the video source element
                    const videoSource = document.getElementById('videoSource');
                    if (videoSource) {
                        const videoSrc = productData[productKey].videoSrc;
                        
                        // Clear any previous sources and errors
                        if (productVideo) {
                            productVideo.pause();
                            productVideo.removeAttribute('src');
                            productVideo.load();
                        }
                        
                        // Set the new source
                        videoSource.setAttribute('src', videoSrc);
                        console.log("Setting video source to:", videoSrc);
                        
                        // Force the video to reload with the new source
                        if (productVideo) {
                            productVideo.load();
                            
                            // Try to play the video automatically
                            const playPromise = productVideo.play();
                            if (playPromise !== undefined) {
                                playPromise.catch(error => {
                                    console.log("Auto-play prevented:", error);
                                    // Show play button or other UI to indicate user needs to click play
                                });
                            }
                        }
                        
                        // Add an event listener to check if the video can play
                        productVideo.addEventListener('error', function(e) {
                            console.error("Video error:", e);
                            // Try alternative path if original fails
                            const altPath = videoSrc.replace('VIDEO/', 'videos/');
                            videoSource.setAttribute('src', altPath);
                            productVideo.load();
                            console.log("Trying alternative video path:", altPath);
                        }, { once: true });
                    }
                    productVideo.style.display = 'block';
                    console.log("Loading video:", productData[productKey].videoSrc);
                } catch (err) {
                    console.log("Video not available: ", err);
                    productVideo.style.display = 'none';
                }
            } else {
                productVideo.style.display = 'none';
                console.log("No video data for product key:", productKey);
            }
            
            // Populate gallery images - make sure to fully clear it first
            galleryImages.innerHTML = '';
            
            // Always use the product key to find images from our data, this ensures we show
            // exactly the images that match the product number (1st, 2nd, etc.)
            // Fall back to the main image only if no matching images found
            let imagesToUse = [];
            
            if (productData[productKey] && productData[productKey].images && 
                productData[productKey].images.length > 0) {
                imagesToUse = productData[productKey].images;
                console.log(`Using ${imagesToUse.length} images for product ${productKey}`);
            } else {
                imagesToUse = [productImageSrc];
                console.log(`No product data images found for ${productKey}, using main image`);
            }
            
            imagesToUse.forEach((imgSrc, index) => {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'gallery-image-wrapper';
                
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = `Product ${productKey} Image ${index + 1}`;
                img.className = 'gallery-image';
                
                imgDiv.appendChild(img);
                galleryImages.appendChild(imgDiv);
                
                // Make gallery images clickable to show them full screen
                img.addEventListener('click', function() {
                    // Simple full-screen view for the image
                    const fullImg = document.createElement('div');
                    fullImg.className = 'fullscreen-image';
                    fullImg.style.position = 'fixed';
                    fullImg.style.top = '0';
                    fullImg.style.left = '0';
                    fullImg.style.width = '100%';
                    fullImg.style.height = '100%';
                    fullImg.style.backgroundColor = 'rgba(0,0,0,0.9)';
                    fullImg.style.zIndex = '10000';
                    fullImg.style.display = 'flex';
                    fullImg.style.alignItems = 'center';
                    fullImg.style.justifyContent = 'center';
                    
                    const imgElement = document.createElement('img');
                    imgElement.src = this.src;
                    imgElement.style.maxWidth = '90%';
                    imgElement.style.maxHeight = '90%';
                    imgElement.style.objectFit = 'contain';
                    
                    fullImg.appendChild(imgElement);
                    document.body.appendChild(fullImg);
                    
                    fullImg.addEventListener('click', function() {
                        document.body.removeChild(fullImg);
                    });
                });
            });
            
            // Show video modal
            videoModal.style.display = 'block';
            
            // Use setTimeout to ensure CSS transition works properly
            setTimeout(() => {
                videoModal.classList.add('show');
            }, 10);
            
            // Reset button after click
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 500);
        }
    
    // Attach the click handler to all video buttons
    videoButtons.forEach(button => {
        console.log('Adding click event to video button');
        button.addEventListener('click', handleVideoButtonClick);
    });
    
    // Handle Buy Now button in the video modal
    const videoBuyNowBtn = document.querySelector('.video-buy-now-btn');
    if (videoBuyNowBtn) {
        videoBuyNowBtn.addEventListener('click', function() {
            console.log('Video modal Buy Now button clicked');
            
            // Close the video modal
            videoModal.classList.remove('show');
            setTimeout(() => {
                videoModal.style.display = 'none';
                // Stop the video when modal is closed
                if (productVideo) {
                    productVideo.pause();
                    productVideo.currentTime = 0;
                }
                
                // Show the Buy Now modal
                buyNowModal.style.display = 'block';
                setTimeout(() => {
                    buyNowModal.classList.add('show');
                }, 10);
                
            }, 300);
            
            // Add a visual feedback for the button click
            this.classList.add('clicked');
            
            // Reset button after click
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 500);
        });
    }
    
    // Close video modal when clicking the close button
    if (closeVideoModal) {
        console.log('Close video modal button found');
        closeVideoModal.addEventListener('click', function() {
            console.log('Close video modal clicked');
            videoModal.classList.remove('show');
            setTimeout(() => {
                videoModal.style.display = 'none';
                // Stop the video when modal is closed
                if (productVideo) {
                    productVideo.pause();
                    productVideo.currentTime = 0;
                }
            }, 300);
        });
    } else {
        console.log('Warning: Close video modal button not found');
    }
    
    // Close video modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === videoModal) {
            videoModal.classList.remove('show');
            setTimeout(() => {
                videoModal.style.display = 'none';
                // Stop the video when modal is closed
                if (productVideo) {
                    productVideo.pause();
                    productVideo.currentTime = 0;
                }
            }, 300);
        }
    });
});
