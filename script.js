document.addEventListener('DOMContentLoaded', () => {

    const html = document.documentElement;
    const body = document.body;

    // ----------------------------------------------------
    // ۱. متغیرهای DOM و ثابت‌ها
    // ----------------------------------------------------
    const selectors = {
        // ناوبری و هدر
        header: 'header',
        menuToggle: '#menu-toggle',
        mainNav: '#main-nav',
        langToggle: '#lang-toggle',
        modeToggle: '#mode-toggle',
        modeIcon: '#mode-icon',
        // Scroll & Utility
        backToTopButton: '#back-to-top',
        progressBar: '#progress-bar',
        fadeInElements: '.fade-in',
        // Hero & Counters
        heroTitle: '#hero-title',
        statCounters: '.site-stats .stat-value',
        // گالری و جستجو
        searchBox: '#header-search',
        searchResults: '#search-results-dropdown',
        galleryGrid: '#art-grid',
        categoryFilter: '#category-filter',
        sortBy: '#sort-by',
        loadMoreButton: '#load-more',
        // فرم‌ها
        contactForm: '#contact-form',
        newsletterForm: '#newsletter-form',
        captchaDisplay: '#captcha-display',
        formStatus: '#form-status',
        // اسلایدر
        carouselContainer: '#featured-slider .carousel-container',
        carouselTrack: '#featured-slider .carousel-track',
        carouselPrev: '#featured-slider .prev-button',
        carouselNext: '#featured-slider .next-button',
        carouselDots: '#featured-slider .carousel-dots'
    };
    
    // توابع کمکی DOM
    const $ = (selector, parent = document) => parent.querySelector(selector);
    const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

    // ----------------------------------------------------
    // ۲. داده‌های متنی برای Internationalization (i18n)
    // ----------------------------------------------------
    // استفاده از یک شیء جامع برای مدیریت تمام متون قابل ترجمه
    const I18N_DATA = {
        fa: {
            // Meta & SEO
            pageTitle: "خانه | گنجینه فرهنگ و هنر - جامع‌ترین مرجع هنر ایران",
            metaDescription: "گنجینه فرهنگ و هنر، پلی میان گذشته و آینده هنر و ادبیات ایران. مکانی برای بازتاب زیبایی‌های اصیل و ارائه مقالات تخصصی.",
            // Hero
            heroTitle: "به دنیای فرهنگ و هنر خوش آمدید",
            heroSubtitle: "جامع‌ترین مرجع برای کشف هنر اصیل ایران.",
            heroCTA: "مشاهده آثار جدید",
            // ناوبری
            navHome: "خانه", navAbout: "درباره", navGallery: "گالری", navArticles: "مقالات", navContact: "تماس", navFAQ: "سوالات متداول",
            // فرم تماس
            placeholderName: "نام شما", placeholderEmail: "ایمیل شما", placeholderMessage: "پیام شما", placeholderCaptcha: "کد امنیتی را وارد کنید",
            contactSubmit: "ارسال پیام",
            errorName: "لطفاً نام خود را وارد کنید.", errorEmail: "ایمیل معتبر نیست.", errorMessage: "لطفاً متن پیام خود را وارد کنید.", errorCaptcha: "پاسخ کد امنیتی صحیح نیست.",
            // ... (سایر متون با data-lang-key)
            langButton: "English" // متن دکمه باید به زبانی باشد که کاربر با کلیک روی آن می‌بیند
        },
        en: {
            // Meta & SEO
            pageTitle: "Home | Iranian Culture and Art Treasure - Comprehensive Art Resource",
            metaDescription: "A treasure trove of Iranian culture and art, a bridge between past and future. A place to reflect authentic beauties and provide specialized articles.",
            // Hero
            heroTitle: "Welcome to the world of Culture and Art",
            heroSubtitle: "The most comprehensive resource for discovering authentic Iranian art.",
            heroCTA: "View New Works",
            // ناوبری
            navHome: "Home", navAbout: "About", navGallery: "Gallery", navArticles: "Articles", navContact: "Contact", navFAQ: "FAQ",
            // فرم تماس
            placeholderName: "Your Name", placeholderEmail: "Your Email", placeholderMessage: "Your Message", placeholderCaptcha: "Enter security code",
            contactSubmit: "Send Message",
            errorName: "Please enter your name.", errorEmail: "Invalid email format.", errorMessage: "Please enter your message.", errorCaptcha: "Security code response is incorrect.",
            // ... (سایر متون با data-lang-key)
            langButton: "فارسی"
        }
    };

    // ----------------------------------------------------
    // ۳. انیمیشن تایپ برای تیتر اصلی (Typewriter)
    // ----------------------------------------------------
    let typingText = I18N_DATA[html.lang].heroTitle;
    let charIndex = 0;
    let isTyping = false;

    function typeWriter() {
        const heroTitleElement = $(selectors.heroTitle);
        if (!heroTitleElement) return;

        if (charIndex < typingText.length) {
            heroTitleElement.textContent += typingText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        } else {
            isTyping = false;
            // افکت کرسر (بهتر است با CSS انجام شود، اما برای اطمینان اینجا قرار دارد)
            heroTitleElement.style.borderLeft = '4px solid var(--color-accent)'; 
        }
    }

    // شروع تایپ
    function startTyping() {
        const heroTitleElement = $(selectors.heroTitle);
        if (!heroTitleElement || isTyping) return;
        isTyping = true;
        heroTitleElement.textContent = ''; // ریست کردن متن
        charIndex = 0;
        typeWriter();
    }
    startTyping();


    // ----------------------------------------------------
    // ۴. منطق تغییر زبان (Internationalization - i18n)
    // ----------------------------------------------------
    const langToggle = $(selectors.langToggle);

    function applyLanguage(lang) {
        const texts = I18N_DATA[lang];

        // ۱. تغییر ویژگی‌های HTML
        html.lang = lang;
        html.dir = lang === 'en' ? 'ltr' : 'rtl';
        localStorage.setItem('language', lang);
        
        // ۲. ترجمه محتوای DOM
        $$('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (texts[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = texts[key];
                } else if (el.tagName === 'BUTTON') {
                    el.textContent = texts[key];
                } else if (el.tagName === 'TITLE') {
                    el.textContent = texts[key];
                } else if (el.tagName === 'META' && el.name === 'description') {
                    el.content = texts[key];
                } else if (el.tagName === 'META' && el.property === 'og:description') {
                    el.content = texts[key];
                } else {
                    el.textContent = texts[key];
                }
            }
        });

        // ۳. فعال‌سازی مجدد تایپ برای تیتر جدید
        typingText = texts.heroTitle;
        startTyping();
        
        // ۴. ریست کردن دکمه تغییر زبان
        langToggle.textContent = texts.langButton; 
        langToggle.setAttribute('data-current-lang', lang);

        console.log(`زبان سایت به ${lang === 'en' ? 'انگلیسی' : 'فارسی'} تغییر کرد.`);
    }
    
    if (langToggle) {
        // اعمال زبان ذخیره‌شده یا پیش‌فرض
        const savedLang = localStorage.getItem('language') || 'fa';
        if (savedLang !== 'fa') {
            applyLanguage(savedLang);
        }
        
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLang = html.lang;
            const newLang = currentLang === 'fa' ? 'en' : 'fa';
            applyLanguage(newLang);
        });
    }

    // ----------------------------------------------------
    // ۵. حالت تاریک و روشن (Dark/Light Mode)
    // ----------------------------------------------------
    const modeToggle = $(selectors.modeToggle);
    const modeIcon = $(selectors.modeIcon);

    function applyTheme(theme) {
        if (!modeIcon) return;
        
        if (theme === 'dark') {
            html.classList.add('dark-mode');
            html.classList.remove('theme-light');
            modeIcon.textContent = '☀️'; // آیکون خورشید
            modeToggle.setAttribute('aria-label', 'فعال‌سازی حالت روشن');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark-mode');
            html.classList.add('theme-light');
            modeIcon.textContent = '🌙'; // آیکون ماه
            modeToggle.setAttribute('aria-label', 'فعال‌سازی حالت تاریک');
            localStorage.setItem('theme', 'light');
        }
    }
    
    if (modeToggle) {
        // تشخیص تم ذخیره‌شده یا تم سیستمی
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (prefersDark) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }

        modeToggle.addEventListener('click', () => {
            const currentTheme = html.classList.contains('dark-mode') ? 'dark' : 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    // ----------------------------------------------------
    // ۶. منوی موبایل و ناوبری چسبان (Sticky Header)
    // ----------------------------------------------------
    const menuToggle = $(selectors.menuToggle);
    const mainNav = $(selectors.mainNav);
    const header = $(selectors.header);

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            // تغییر آیکون و ARIA
            menuToggle.querySelector('.icon-bar').textContent = isOpen ? '✕' : '☰';
            menuToggle.setAttribute('aria-expanded', isOpen);
            body.classList.toggle('no-scroll', isOpen); // جلوگیری از اسکرول بدنه در موبایل
        });

        // بستن منو پس از کلیک روی لینک (در حالت موبایل)
        $$('a', mainNav).forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('open');
                    menuToggle.querySelector('.icon-bar').textContent = '☰';
                    menuToggle.setAttribute('aria-expanded', 'false');
                    body.classList.remove('no-scroll');
                }
            });
        });
    }
    
    // ----------------------------------------------------
    // ۷. نوار پیشرفت اسکرول و دکمه بازگشت به بالا
    // ----------------------------------------------------
    const backToTopButton = $(selectors.backToTopButton);
    const progressBar = $(selectors.progressBar);
    const scrollThreshold = 400;

    window.addEventListener('scroll', () => {
        // نوار پیشرفت
        if (progressBar) {
            const scrollHeight = html.scrollHeight - html.clientHeight;
            const scrolled = html.scrollTop;
            const progress = (scrolled / scrollHeight) * 100;
            progressBar.style.width = progress + "%";
            progressBar.setAttribute('aria-valuenow', Math.round(progress));
        }

        // دکمه بازگشت به بالا
        if (backToTopButton) {
            if (html.scrollTop > scrollThreshold) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }
        
        // ناوبری چسبان (افکت سایه یا تغییر پس‌زمینه در اسکرول)
        if (header) {
            if (html.scrollTop > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------
    // ۸. انیمیشن هنگام ورود بخش‌ها (Scroll Reveal)
    // ----------------------------------------------------
    const fadeInElements = $$(selectors.fadeInElements);
    
    if (fadeInElements.length > 0) {
        const observerOptions = {
            root: null, 
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px' // برای فعال شدن زودتر
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
        fadeInElements.forEach(element => sectionObserver.observe(element));
    }
    
    // ----------------------------------------------------
    // ۹. شمارنده آماری (Animated Counters)
    // ----------------------------------------------------
    const counterElements = $$(selectors.statCounters);
    
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target').replace(/\D/g, ''));
        let current = 0;
        const duration = 1500;
        const step = Math.ceil(target / (duration / 16)); // 16ms برای ۶۰ فریم بر ثانیه

        const updateCount = () => {
            current += step;
            if (current < target) {
                el.textContent = current.toLocaleString('fa-IR') + el.textContent.replace(/\d+/g, ''); // حفظ کاراکترهای اضافی مثل '+'
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target.toLocaleString('fa-IR') + el.textContent.replace(/\d+/g, '');
            }
        };

        updateCount();
    }
    
    // استفاده از Intersection Observer برای فعال‌سازی شمارنده
    if (counterElements.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // وقتی ۵۰٪ از بخش قابل مشاهده شد
        
        counterElements.forEach(counter => counterObserver.observe(counter));
    }


    // ----------------------------------------------------
    // ۱۰. اعتبارسنجی فرم تماس (Contact Form Validation)
    // ----------------------------------------------------
    const contactForm = $(selectors.contactForm);
    const formStatus = $(selectors.formStatus);
    let CAPTCHA_ANSWER = 0;
    
    // تابع تولید و نمایش کپچا
    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        CAPTCHA_ANSWER = num1 + num2;
        const display = $(selectors.captchaDisplay);
        if (display) {
            // نمایش اعداد به فارسی
            const faNum1 = num1.toLocaleString('fa-IR');
            const faNum2 = num2.toLocaleString('fa-IR');
            display.textContent = `${faNum1} + ${faNum2} = ؟`;
        }
    }
    
    // تابع اعتبارسنجی ایمیل
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // تابع اعتبارسنجی و نمایش خطا
    function validateInput(input, errorKey) {
        const errorElement = $(`#${input.id}-error`);
        const lang = html.lang;
        
        let isValid = true;
        let errorMessage = '';

        if (input.value.trim() === '') {
            isValid = false;
            errorMessage = I18N_DATA[lang][errorKey];
        } else if (input.id === 'email' && !validateEmail(input.value)) {
            isValid = false;
            errorMessage = I18N_DATA[lang][errorKey];
        } else if (input.id === 'captcha') {
            const userInput = parseInt(input.value.toLocaleString('en-US'));
            if (userInput !== CAPTCHA_ANSWER || isNaN(userInput)) {
                isValid = false;
                errorMessage = I18N_DATA[lang][errorKey];
            }
        }
        
        // نمایش/عدم نمایش خطا
        if (errorElement) {
            if (!isValid) {
                input.classList.add('invalid');
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            } else {
                input.classList.remove('invalid');
                errorElement.style.display = 'none';
            }
        }
        
        return isValid;
    }

    if (contactForm) {
        generateCaptcha(); // تولید کپچای اولیه
        
        // رویداد ارسال فرم
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // اعتبارسنجی تک تک فیلدها
            const isNameValid = validateInput($('#name'), 'errorName');
            const isEmailValid = validateInput($('#email'), 'errorEmail');
            const isMessageValid = validateInput($('#message'), 'errorMessage');
            const isCaptchaValid = validateInput($('#captcha'), 'errorCaptcha');
            
            if (isNameValid && isEmailValid && isMessageValid && isCaptchaValid) {
                // شبیه‌سازی ارسال AJAX
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());
                
                formStatus.style.display = 'block';
                formStatus.textContent = '... در حال ارسال پیام ...';
                
                // شبیه‌سازی تاخیر سرور
                setTimeout(() => {
                    // موفقیت
                    formStatus.textContent = '✅ پیام شما با موفقیت ارسال شد. به زودی پاسخ خواهیم داد.';
                    formStatus.style.color = '#4CAF50';
                    contactForm.reset();
                    generateCaptcha(); // تولید کپچای جدید
                    
                    // مخفی کردن وضعیت پس از چند ثانیه
                    setTimeout(() => formStatus.style.display = 'none', 5000);
                }, 1500);

            } else {
                // در صورت شکست، روی اولین فیلد نامعتبر فوکوس می‌شود
                formStatus.style.display = 'block';
                formStatus.textContent = '❌ لطفاً فیلدهای مشخص شده را تکمیل کنید.';
                formStatus.style.color = '#d9534f';
                generateCaptcha(); // اگر کپچا اشتباه بود، آن را ریست کن
            }
        });
        
        // اعتبارسنجی زنده هنگام تایپ (live validation)
        $$('input, textarea', contactForm).forEach(input => {
            input.addEventListener('blur', () => {
                if (input.id === 'name') validateInput(input, 'errorName');
                else if (input.id === 'email') validateInput(input, 'errorEmail');
                else if (input.id === 'message') validateInput(input, 'errorMessage');
                else if (input.id === 'captcha') validateInput(input, 'errorCaptcha');
            });
        });
    }

    // ----------------------------------------------------
    // ۱۱. فیلتر و مرتب‌سازی گالری
    // ----------------------------------------------------
    const galleryGrid = $(selectors.galleryGrid);
    const categoryFilter = $(selectors.categoryFilter);
    const sortBy = $(selectors.sortBy);
    const loadMoreButton = $(selectors.loadMoreButton);
    const INITIAL_VISIBLE_ITEMS = 6;
    let currentVisibleItems = INITIAL_VISIBLE_ITEMS;
    let allArtworks = Array.from($$('article', galleryGrid)); // آثار اولیه (باید از API بیاید)

    function renderArtworks(artworks) {
        // حذف تمام آثار فعلی
        galleryGrid.innerHTML = ''; 
        
        // نمایش تعداد محدودی از آثار
        artworks.slice(0, currentVisibleItems).forEach(art => galleryGrid.appendChild(art));
        
        // مدیریت دکمه بارگذاری بیشتر
        if (artworks.length > currentVisibleItems) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none';
        }
    }
    
    // تابع فیلتر و مرتب‌سازی اصلی
    function filterAndSortGallery() {
        const selectedCategory = categoryFilter.value;
        const selectedSort = sortBy.value;
        let filteredArtworks = allArtworks;
        
        // فیلترینگ
        if (selectedCategory !== 'all') {
            filteredArtworks = allArtworks.filter(art => art.getAttribute('data-category') === selectedCategory);
        }
        
        // مرتب‌سازی (Placeholder - منطق واقعی نیاز به فیلدهای دیتابیس دارد)
        if (selectedSort === 'newest') {
            // مرتب‌سازی بر اساس یک فیلد تاریخ پنهان در data-*
            filteredArtworks.sort((a, b) => 0); 
        } else if (selectedSort === 'most-viewed') {
            // مرتب‌سازی بر اساس بازدید
            filteredArtworks.sort((a, b) => 0);
        }
        
        renderArtworks(filteredArtworks);
    }
    
    if (categoryFilter && sortBy && galleryGrid) {
        categoryFilter.addEventListener('change', () => {
            currentVisibleItems = INITIAL_VISIBLE_ITEMS; // ریست تعداد نمایش داده شده
            filterAndSortGallery();
        });
        sortBy.addEventListener('change', filterAndSortGallery);
    }
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', () => {
            currentVisibleItems += INITIAL_VISIBLE_ITEMS; // افزایش تعداد
            filterAndSortGallery(); // دوباره رندر کن
        });
    }

    // ----------------------------------------------------
    // ۱۲. جستجوی سریع در نوار هدر (Live Search)
    // ----------------------------------------------------
    const searchBox = $(selectors.searchBox);
    const searchResults = $(selectors.searchResults);
    
    if (searchBox && searchResults) {
        searchBox.addEventListener('input', debounce(handleSearch, 300));
        searchBox.addEventListener('focus', () => {
            if (searchBox.value.length > 0) searchResults.style.display = 'block';
        });
        
        // بستن دراپ‌داون با کلیک بیرون
        document.addEventListener('click', (e) => {
            if (!searchBox.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
    
    // تابع Debounce برای بهبود پرفورمنس جستجوی زنده
    function debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    // تابع شبیه‌سازی جستجو (نیاز به API/Backend واقعی)
    function handleSearch(e) {
        const query = e.target.value.trim().toLowerCase();
        searchResults.innerHTML = ''; 
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        // شبیه‌سازی نتایج جستجو
        const dummyResults = [
            { title: "مقاله: تحلیل شعر حافظ", url: "/article/hafez" },
            { title: "هنرمند: استاد فرشچیان", url: "/artist/farshchian" },
            { title: "گالری: مینیاتورهای قاجار", url: "/gallery/qajar" },
        ];
        
        const filtered = dummyResults.filter(item => item.title.toLowerCase().includes(query));

        if (filtered.length > 0) {
            filtered.forEach(item => {
                const li = document.createElement('li');
                li.setAttribute('role', 'option');
                li.innerHTML = `<a href="${item.url}">${item.title}</a>`;
                searchResults.appendChild(li);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = `<li role="option" disabled>نتیجه‌ای یافت نشد.</li>`;
            searchResults.style.display = 'block';
        }
    }
    
    // ----------------------------------------------------
    // ۱۳. منطق اسلایدر Carousel
    // ----------------------------------------------------
    const carouselContainer = $(selectors.carouselContainer);
    const carouselTrack = $(selectors.carouselTrack);
    const carouselNext = $(selectors.carouselNext);
    const carouselPrev = $(selectors.carouselPrev);
    const carouselDots = $(selectors.carouselDots);
    
    if (carouselTrack) {
        const items = $$('.carousel-item', carouselTrack);
        let currentIndex = 0;
        const totalItems = items.length;
        
        // ساخت دات‌های ناوبری
        for (let i = 0; i < totalItems; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `رفتن به اسلاید ${i + 1}`);
            dot.dataset.index = i;
            carouselDots.appendChild(dot);
        }
        const dots = $$('.carousel-dot', carouselDots);

        function updateCarousel() {
            // انتقال اسلایدر
            const offset = -currentIndex * (100 / totalItems);
            carouselTrack.style.transform = `translateX(${offset}%)`;
            
            // به‌روزرسانی دات‌ها
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
            
            // به‌روزرسانی ARIA برای اسلایدر اصلی
            carouselContainer.setAttribute('aria-roledescription', `اسلاید ${currentIndex + 1} از ${totalItems}`);
        }
        
        // رویدادهای کلیک
        carouselNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        });
        
        carouselPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        });
        
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.dataset.index);
                updateCarousel();
            });
        });

        updateCarousel(); // لود اولیه
        
        // اسلاید خودکار
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 8000); // هر ۸ ثانیه

    }
    
    // ----------------------------------------------------
    // ۱۴. ثبت نام در خبرنامه (Newsletter)
    // ----------------------------------------------------
    const newsletterForm = $(selectors.newsletterForm);
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = $('#newsletter-email');
            
            if (validateEmail(emailInput.value)) {
                alert(`ایمیل ${emailInput.value} با موفقیت در خبرنامه ثبت شد. (نمایشی)`);
                newsletterForm.reset();
            } else {
                alert('لطفاً یک آدرس ایمیل معتبر وارد کنید.');
            }
        });
    }
});