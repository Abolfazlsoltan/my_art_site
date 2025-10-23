/*
==================================================
  گنجینه فرهنگ و هنر - فایل Script.js (ماژولار و پیشرفته)
  شامل: Module Pattern, Lazy Loading, Advanced Filtering, & Security Enhancements
==================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------
    // توابع کمکی عمومی
    // --------------------------------------------------
    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);
    const html = $('html');
    const body = $('body');

    // --------------------------------------------------
    // ۱. داده‌های چندزبانه سازی (i18n Data)
    // --------------------------------------------------
    const I18N_DATA = {
        fa: {
            pageTitle: "خانه | گنجینه فرهنگ و هنر - جامع‌ترین مرجع هنر ایران", metaDescription: "گنجینه فرهنگ و هنر، پلی میان گذشته و آینده هنر و ادبیات ایران. مکانی برای بازتاب زیبایی‌های اصیل، مقالات تخصصی، و ثبت نام هنرمندان.", logoTitle: "گنجینه هنر", logoSubtitle: "گنجینه ایران",
            navHome: "خانه", navFeatured: "آثار ویژه", navArticles: "مقالات", navAbout: "درباره ما", navContact: "تماس با ما", navFAQ: "سؤالات متداول", navLogin: "ورود", navRegister: "ثبت نام", searchPlaceholder: "جستجوی آثار و مقالات...", langToggleText: "EN",
            heroMainTitle: "گنجینه فرهنگ و هنر: جامع‌ترین مرجع هنر ایران", heroSubtitle: "پلی میان گذشته و آینده هنر و ادبیات ایران. مکانی برای بازتاب زیبایی‌های اصیل و اشتراک‌گذاری آثار هنری.", heroCTA: "مشاهده آثار برگزیده",
            stat1: "اثر ثبت شده", stat2: "هنرمند فعال", stat3: "دسته هنری",
            featuredTitle: "آثار ویژه و منتخب هفته", featuredSubtitle: "برترین آثار هنرمندان برجسته ایرانی را مشاهده کنید.", viewDetails: "مشاهده جزئیات",
            articlesTitle: "آخرین مقالات تخصصی", articlesSubtitle: "مقالات عمیق و تحلیلی در زمینه‌های مختلف هنر و فرهنگ ایران.", filterBy: "فیلتر بر اساس:", sortBy: "مرتب‌سازی:", catAll: "همه دسته‌ها", catPainting: "نقاشی", catLiterature: "ادبیات", catArchitecture: "معماری", catCalligraphy: "خوشنویسی", sortNewest: "جدیدترین", sortPopular: "پر بازدیدترین", readMore: "ادامه مطلب", viewMoreArticles: "مشاهده مقالات بیشتر",
            testimonialsTitle: "نظرات کاربران برجسته", testimonial1Content: "\"این سایت یک مرجع بی‌نظیر برای تحقیق در مورد هنر ایران است. سرعت بارگذاری و دقت مقالات فوق‌العاده است.\"", testimonial1Name: "دکتر ن. احمدی، پژوهشگر تاریخ هنر", testimonial2Content: "\"بهترین پلتفرمی که برای نمایش آثارم پیدا کرده‌ام. تیم پشتیبانی بسیار حرفه‌ای و دلسوز هستند.\"", testimonial2Name: "سارا نوری، هنرمند خوشنویس", testimonial3Content: "\"به عنوان یک دانشجوی معماری، این مجموعه مقالات تخصصی، منبع اصلی من برای پروژه‌های دانشگاهی است.\"", testimonial3Name: "علیرضا کیانی، دانشجوی معماری",
            aboutTitle: "درباره گنجینه فرهنگ و هنر", aboutContent1: "ما با هدف جمع‌آوری و نمایش جامع‌ترین آثار هنری و فرهنگی ایران، این پلتفرم را بنیان نهادیم. مأموریت ما حمایت از هنرمندان داخلی و معرفی غنای فرهنگی ایران به جهان است.", aboutContent2: "تیم ما متشکل از متخصصان هنر، تاریخ و فناوری است که متعهد به ارائه یک تجربه کاربری بی‌نقص و محتوای دقیق و معتبر هستند. ما یک مرجع تخصصی برای دانشجویان، پژوهشگران و علاقه‌مندان به هنر هستیم.", aboutTeamLink: "آشنایی با تیم ما",
            contactTitle: "ارسال نظر و تماس با ما", contactPitch: "ما مشتاق شنیدن نظرات، پیشنهادات و انتقادات شما هستیم. از طریق فرم زیر یا راه‌های ارتباطی با ما تماس بگیرید.", contactFormTitle: "فرم تماس", formLabelName: "نام و نام خانوادگی:", formLabelEmail: "ایمیل:", formLabelPhone: "شماره تلفن (اختیاری):", formLabelMessage: "پیام:", formLabelCaptcha: "کد امنیتی:", formSubmit: "ارسال پیام",
            otpTitle: "تأیید شماره تلفن", otpMessage: "کد ۴ رقمی به شماره [PHONE_NUMBER] ارسال شد.", otpVerify: "تأیید", otpClose: "بستن",
            faq1Q: "چگونه می‌توانم اثر هنری خود را در گنجینه ثبت کنم؟", faq1A: "برای ثبت اثر، ابتدا باید در سایت ثبت نام کرده و وارد پنل کاربری خود شوید. سپس از طریق بخش \"ارسال اثر جدید\"، اطلاعات و تصاویر اثر خود را بارگذاری کنید. آثار توسط تیم کارشناسی ما بررسی و در صورت تأیید، منتشر خواهند شد.",
            faq2Q: "آیا محتوای سایت به زبان‌های دیگر هم ترجمه می‌شود؟", faq2A: "بله، وب‌سایت ما کاملاً مجهز به قابلیت چندزبانه (i18n) است و می‌توانید با کلیک روی دکمه EN/FA در بالای صفحه، محتوا را به زبان انگلیسی یا فارسی مشاهده کنید.",
            faq3Q: "آیا ثبت‌نام هنرمندان رایگان است؟", faq3A: "ثبت‌نام و ایجاد پروفایل هنرمندی کاملاً رایگان است. ما از هنر شما حمایت می‌کنیم. در حال حاضر هیچ هزینه اشتراکی برای نمایش آثار دریافت نمی‌شود.",
            faq4Q: "سیاست حفظ حریم خصوصی شما چگونه است؟", faq4A: "ما متعهد به حفظ اطلاعات شخصی کاربران هستیم. تمام داده‌ها بر اساس استانداردهای بین‌المللی رمزگذاری و ذخیره می‌شوند. برای جزئیات بیشتر، لطفاً به صفحه سیاست حفظ حریم خصوصی مراجعه کنید.", privacyPolicyLink: "سیاست حفظ حریم خصوصی",
            faq5Q: "چگونه می‌توانم گزارش تخلف یا کپی رایت را ارسال کنم؟", faq5A: "لطفاً با استفاده از فرم تماس (بخش بالا) یا ایمیل مستقیم، جزئیات اثر و دلیل تخلف را برای ما ارسال کنید. تیم حقوقی ما در اسرع وقت موضوع را بررسی و پیگیری خواهد کرد.",
            newsletterTitle: "عضویت در خبرنامه", newsletterSubtitle: "جدیدترین آثار و مقالات را مستقیماً در ایمیل خود دریافت کنید.", newsletterPlaceholder: "ایمیل خود را وارد کنید...", newsletterSubmit: "عضویت",
            footerMission: "ما بزرگ‌ترین آرشیو آنلاین هنر ایرانی هستیم که پل ارتباطی میان هنرمندان و جامعه جهانی ایجاد می‌کنیم.", footerQuickLinks: "لینک‌های سریع", footerContact: "تماس و نقشه سایت", footerPrivacy: "سیاست حفظ حریم خصوصی", footerTerms: "شرایط استفاده از خدمات", footerAddress: "آدرس:", footerEmail: "ایمیل:", footerPhone: "تلفن:", footerSitemapLink: "مشاهده نقشه سایت (XML)", footerCopyright: "گنجینه فرهنگ و هنر - تمامی حقوق محفوظ است.", footerDesign: "طراحی و توسعه با ❤️ برای ترویج فرهنگ ایران.",
            errorMessage: "لطفاً خطاهای موجود در فرم را برطرف نمایید.", successMessage: "پیام شما با موفقیت ارسال شد. از صبر و همراهی شما سپاسگزاریم.", errorEmailInvalid: "فرمت ایمیل نامعتبر است.", errorPhoneInvalid: "فرمت شماره تلفن نامعتبر است. (مثال: ۰۹۱۲۳۴۵۶۷۸۹)", errorCaptchaInvalid: "پاسخ کد امنیتی اشتباه است.", errorRequiredField: "این فیلد اجباری است.",
            // داده‌های مقالات شبیه‌سازی شده
            article1Title: "تاثیر شاهنامه بر هنر مینیاتور ایرانی", article2Title: "مکتب اصفهان در معماری اسلامی", article3Title: "نقش موسیقی مقامی در فرهنگ بختیاری"
        },
        en: {
            pageTitle: "Home | Iranian Art Treasury - The most comprehensive Iranian Art Reference", metaDescription: "Iranian Art Treasury, a bridge between the past and future of Iranian art and literature. A place to reflect authentic beauties, specialized articles, and artist registration.", logoTitle: "Art Treasury", logoSubtitle: "Iran's Treasury",
            navHome: "Home", navFeatured: "Featured Works", navArticles: "Articles", navAbout: "About Us", navContact: "Contact Us", navFAQ: "FAQ", navLogin: "Login", navRegister: "Register", searchPlaceholder: "Search for works and articles...", langToggleText: "FA",
            heroMainTitle: "Iranian Art & Culture Treasury: The Most Comprehensive Reference", heroSubtitle: "A bridge between the past and future of Iranian art and literature. A place to reflect authentic beauties and share artwork.", heroCTA: "View Featured Works",
            stat1: "Registered Works", stat2: "Active Artists", stat3: "Art Categories",
            featuredTitle: "Featured Artworks of the Week", featuredSubtitle: "View the best works by prominent Iranian artists.", viewDetails: "View Details",
            articlesTitle: "Latest Specialized Articles", articlesSubtitle: "In-depth and analytical articles on various fields of Iranian art and culture.", filterBy: "Filter By:", sortBy: "Sort By:", catAll: "All Categories", catPainting: "Painting", catLiterature: "Literature", catArchitecture: "Architecture", catCalligraphy: "Calligraphy", sortNewest: "Newest", sortPopular: "Most Popular", readMore: "Read More", viewMoreArticles: "View More Articles",
            testimonialsTitle: "Prominent User Testimonials", testimonial1Content: "\"This site is an unparalleled reference for research on Iranian art. The loading speed and accuracy of the articles are superb.\"", testimonial1Name: "Dr. N. Ahmadi, Art History Researcher", testimonial2Content: "\"The best platform I have found to display my works. The support team is very professional and caring.\"", testimonial2Name: "Sara Nouri, Calligraphy Artist", testimonial3Content: "\"As an architecture student, this collection of specialized articles is my main source for university projects.\"", testimonial3Name: "Alireza Kiani, Architecture Student",
            aboutTitle: "About Iranian Art & Culture Treasury", aboutContent1: "We established this platform with the goal of collecting and showcasing the most comprehensive Iranian artistic and cultural works. Our mission is to support domestic artists and introduce the cultural richness of Iran to the world.", aboutContent2: "Our team is composed of art, history, and technology specialists committed to providing a flawless user experience and accurate, reliable content. We are a specialized reference for students, researchers, and art enthusiasts.", aboutTeamLink: "Meet Our Team",
            contactTitle: "Send Feedback and Contact Us", contactPitch: "We are eager to hear your opinions, suggestions, and criticisms. Contact us through the form below or the communication channels.", contactFormTitle: "Contact Form", formLabelName: "Full Name:", formLabelEmail: "Email:", formLabelPhone: "Phone Number (Optional):", formLabelMessage: "Message:", formLabelCaptcha: "Security Code:", formSubmit: "Send Message",
            otpTitle: "Phone Number Verification", otpMessage: "A 4-digit code was sent to [PHONE_NUMBER].", otpVerify: "Verify", otpClose: "Close",
            faq1Q: "How can I register my artwork in the Treasury?", faq1A: "To register, you must first register on the site and log in to your user panel. Then, upload your artwork details and images via the 'Submit New Work' section. Works will be reviewed by our expert team and published if approved.",
            faq2Q: "Is the site content translated into other languages?", faq2A: "Yes, our website is fully equipped with multilingual capability (i18n), and you can view the content in English or Persian by clicking the EN/FA button at the top of the page.",
            faq3Q: "Is artist registration free?", faq3A: "Registration and creating an artist profile are completely free. We support your art. Currently, no subscription fee is charged for displaying works.",
            faq4Q: "What is your privacy policy?", faq4A: "We are committed to protecting users' personal information. All data is encrypted and stored according to international standards. For more details, please refer to the Privacy Policy page.", privacyPolicyLink: "Privacy Policy",
            faq5Q: "How can I report a violation or copyright infringement?", faq5A: "Please send us the details of the work and the reason for the violation using the contact form (above section) or direct email. Our legal team will investigate and follow up as soon as possible.",
            newsletterTitle: "Join Our Newsletter", newsletterSubtitle: "Receive the latest works and articles directly in your email.", newsletterPlaceholder: "Enter your email...", newsletterSubmit: "Subscribe",
            footerMission: "We are the largest online archive of Iranian art, creating a bridge between artists and the global community.", footerQuickLinks: "Quick Links", footerContact: "Contact & Sitemap", footerPrivacy: "Privacy Policy", footerTerms: "Terms of Service", footerAddress: "Address:", footerEmail: "Email:", footerPhone: "Phone:", footerSitemapLink: "View Sitemap (XML)", footerCopyright: "Iranian Art Treasury - All rights reserved.", footerDesign: "Designed and developed with ❤️ to promote Iranian culture.",
            errorMessage: "Please fix the errors in the form.", successMessage: "Your message was sent successfully. Thank you for your patience and cooperation.", errorEmailInvalid: "Invalid email format.", errorPhoneInvalid: "Invalid phone number format. (Example: 09123456789)", errorCaptchaInvalid: "Incorrect security code answer.", errorRequiredField: "This field is required.",
            // داده‌های مقالات شبیه‌سازی شده
            article1Title: "Impact of Shahnameh on Iranian Miniature Art", article2Title: "Isfahan School in Islamic Architecture", article3Title: "The Role of Local Music in Bakhtiari Culture"
        }
    };
    
    // --------------------------------------------------
    // ۲. ماژول اصلی: ArtGalleryApp (پیاده سازی با الگوی IIFE)
    // --------------------------------------------------
    const ArtGalleryApp = (() => {

        let currentLang = localStorage.getItem('lang') || (html.getAttribute('lang') === 'fa' ? 'fa' : 'en');
        let currentTheme = localStorage.getItem('theme') || 'theme-light';
        let currentCaptchaResult = null;
        let articlesData = []; // برای نگهداری داده‌های شبیه‌سازی شده مقالات

        // --------------------------------------------------
        // توابع Utility (کمکی)
        // --------------------------------------------------

        /**
         * اعتبارسنجی ایمیل
         * @param {string} email
         * @returns {boolean}
         */
        const validateEmail = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };

        /**
         * اعتبارسنجی شماره تلفن ایران (مثال: 0912...)
         * @param {string} phone
         * @returns {boolean}
         */
        const validatePhoneNumber = (phone) => {
            if (!phone) return true; // اختیاری
            const re = /^(0|(\+98)?9\d{9})$/;
            return re.test(phone.replace(/[\s\u200C]/g, '')); // حذف فاصله و نیم فاصله
        };

        /**
         * تولید رمز عبور قوی
         * @returns {string}
         */
        const generateStrongPassword = () => {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
            let password = '';
            for (let i = 0; i < 12; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
        };
        
        /**
         * نمایش انیمیشن لرزش (Shake) برای یک المان
         * @param {HTMLElement} element
         */
        const triggerShakeAnimation = (element) => {
            const formGroup = element.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('error');
                setTimeout(() => formGroup.classList.remove('error'), 500);
            }
        }
        
        // --------------------------------------------------
        // ۳. مدیریت چندزبانگی (i18n)
        // --------------------------------------------------

        /**
         * اعمال ترجمه‌ها بر اساس زبان فعلی
         */
        const applyTranslations = () => {
            const data = I18N_DATA[currentLang];
            const isRTL = currentLang === 'fa';
            
            // 1. جهت‌دهی و زبان HTML
            html.setAttribute('lang', currentLang);
            html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
            body.classList.remove(isRTL ? 'ltr' : 'rtl');
            body.classList.add(isRTL ? 'rtl' : 'ltr');
            
            // 2. ترجمه متادیتا
            $('title').textContent = data.pageTitle;
            $('meta[name="description"]').setAttribute('content', data.metaDescription);
            
            // 3. ترجمه متن المان‌ها
            $$('[data-lang-key]').forEach(el => {
                const key = el.getAttribute('data-lang-key');
                if (data[key]) {
                    if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                        el.setAttribute('placeholder', data[key]);
                    } else {
                        el.textContent = data[key];
                    }
                }
            });
            
            // 4. به‌روزرسانی دکمه تغییر زبان
            $('#lang-toggle span').textContent = currentLang === 'fa' ? 'EN' : 'FA';
            
            // 5. به‌روزرسانی عنوان دکمه بازگشت به بالا
            $('#back-to-top').setAttribute('aria-label', currentLang === 'fa' ? 'بازگشت به بالای صفحه' : 'Back to Top');
        };

        /**
         * مدیریت رویداد تغییر زبان
         */
        const handleLangToggle = () => {
            const langToggle = $('#lang-toggle');
            langToggle.addEventListener('click', () => {
                currentLang = currentLang === 'fa' ? 'en' : 'fa';
                localStorage.setItem('lang', currentLang);
                applyTranslations();
                ArtGalleryApp.updateMobileMenu(); // به‌روزرسانی منوی موبایل
                ArtGalleryApp.updateCaptcha(); // به‌روزرسانی کپچا
                ArtGalleryApp.updateCarousel(); // به‌روزرسانی اسلاید
            });
            applyTranslations(); // اجرای اولیه
        };

        // --------------------------------------------------
        // ۴. مدیریت حالت تاریک/روشن (Theme Toggle)
        // --------------------------------------------------

        /**
         * اعمال تم فعلی
         */
        const applyTheme = () => {
            html.classList.remove('theme-light', 'dark-mode');
            if (currentTheme === 'dark-mode') {
                html.classList.add('dark-mode');
                $('#theme-toggle i').className = 'fa-solid fa-sun';
            } else {
                html.classList.add('theme-light');
                $('#theme-toggle i').className = 'fa-solid fa-moon';
            }
        };

        /**
         * مدیریت رویداد تغییر تم
         */
        const handleThemeToggle = () => {
            const themeToggle = $('#theme-toggle');
            
            // بررسی ترجیحات سیستمی هنگام شروع
            if (localStorage.getItem('theme') === null) {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    currentTheme = 'dark-mode';
                }
            }

            themeToggle.addEventListener('click', () => {
                currentTheme = currentTheme === 'theme-light' ? 'dark-mode' : 'theme-light';
                localStorage.setItem('theme', currentTheme);
                applyTheme();
            });
            applyTheme(); // اجرای اولیه
        };
        
        // --------------------------------------------------
        // ۵. Lazy Loading تصاویر (جدید)
        // --------------------------------------------------

        /**
         * بارگذاری تنبل (Lazy Loading) برای تصاویر دارای data-src
         */
        const lazyLoadImages = () => {
            const lazyImages = $$('.lazy-image');
            
            if ('IntersectionObserver' in window) {
                const lazyImageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const lazyImage = entry.target;
                            const src = lazyImage.getAttribute('data-src');
                            if (src) {
                                lazyImage.src = src;
                                lazyImage.onload = () => lazyImage.classList.add('loaded'); // اضافه کردن کلاس برای انیمیشن
                                lazyImage.removeAttribute('data-src');
                                observer.unobserve(lazyImage);
                            }
                        }
                    });
                }, {
                    rootMargin: '0px 0px 50px 0px', // شروع بارگذاری قبل از ورود کامل به محدوده دید
                    threshold: 0.01 // بارگذاری با کوچکترین درصد
                });

                lazyImages.forEach((lazyImage) => {
                    lazyImageObserver.observe(lazyImage);
                });
            } else {
                // فال‌بک برای مرورگرهای قدیمی
                lazyImages.forEach(img => {
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.onload = () => img.classList.add('loaded');
                    }
                });
            }
        };


        // --------------------------------------------------
        // ۶. نوار پیشرفت اسکرول و دکمه بازگشت به بالا
        // --------------------------------------------------

        /**
         * محاسبه و به‌روزرسانی نوار پیشرفت
         */
        const updateProgressBarAndBackToTop = () => {
            const progress = $('#progress-bar');
            const backToTop = $('#back-to-top');
            
            // نوار پیشرفت
            const scrollPercent = (document.documentElement.scrollTop / 
                (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
            progress.style.width = scrollPercent + '%';

            // دکمه بازگشت به بالا
            if (document.documentElement.scrollTop > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        };

        /**
         * مدیریت رویداد بازگشت به بالا
         */
        const handleBackToTop = () => {
            const backToTop = $('#back-to-top');
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            window.addEventListener('scroll', updateProgressBarAndBackToTop);
            updateProgressBarAndBackToTop(); // اجرای اولیه
        };
        
        // --------------------------------------------------
        // ۷. اسلایدر آثار ویژه (Carousel)
        // --------------------------------------------------

        /**
         * منطق اصلی اسلایدر (قبلی)
         */
        const handleCarousel = () => {
            const carouselContainer = $('.carousel-container');
            const carouselTrack = $('.carousel-track');
            const prevButton = $('.carousel-control.prev');
            const nextButton = $('.carousel-control.next');
            let currentIndex = 0;
            let slideInterval = null;
            
            if (!carouselContainer) return;

            const updateCarousel = () => {
                const card = $('.art-card');
                if (!card) return;

                // محاسبه تعداد کارت‌های قابل نمایش بر اساس عرض
                const containerWidth = carouselContainer.offsetWidth;
                let visibleCards = 1;
                
                // بر اساس CSS Media Queries
                if (containerWidth > 992) {
                    visibleCards = 3;
                } else if (containerWidth > 768) {
                    visibleCards = 2;
                } else {
                    visibleCards = 1;
                }
                
                // عرض هر کارت با احتساب margin
                const cardWidth = card.offsetWidth + (15 * 2); 
                const totalCards = $$('.art-card').length;
                const maxIndex = totalCards - visibleCards;
                
                if (currentIndex < 0) {
                    currentIndex = maxIndex;
                } else if (currentIndex > maxIndex) {
                    currentIndex = 0;
                }
                
                // اعمال ترنسفورم
                carouselTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
                
                // نمایش/پنهان کردن کنترل‌ها
                prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
                nextButton.style.display = currentIndex < maxIndex ? 'block' : 'none';
            };

            const moveToNext = () => {
                const totalCards = $$('.art-card').length;
                const visibleCards = carouselContainer.offsetWidth > 992 ? 3 : (carouselContainer.offsetWidth > 768 ? 2 : 1);
                const maxIndex = totalCards - visibleCards;
                currentIndex = (currentIndex < maxIndex) ? currentIndex + 1 : 0;
                updateCarousel();
            };

            const moveToPrev = () => {
                const totalCards = $$('.art-card').length;
                const visibleCards = carouselContainer.offsetWidth > 992 ? 3 : (carouselContainer.offsetWidth > 768 ? 2 : 1);
                const maxIndex = totalCards - visibleCards;
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : maxIndex;
                updateCarousel();
            };

            const startAutoSlide = () => {
                if (slideInterval) clearInterval(slideInterval);
                slideInterval = setInterval(moveToNext, 5000);
            };

            prevButton.addEventListener('click', moveToPrev);
            nextButton.addEventListener('click', moveToNext);
            
            carouselContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carouselContainer.addEventListener('mouseleave', startAutoSlide);

            window.addEventListener('load', updateCarousel);
            window.addEventListener('resize', updateCarousel);
            
            // تابع updateCarousel را به ماژول export می‌کنیم
            ArtGalleryApp.updateCarousel = updateCarousel;
            
            startAutoSlide();
        };

        // --------------------------------------------------
        // ۸. Typewriter Effect
        // --------------------------------------------------

        /**
         * افکت تایپ رایتینگ برای تیتر اصلی
         */
        const typeWriterEffect = () => {
            const element = $('.typewriter-text');
            if (!element) return;
            
            // گرفتن متن از داده‌های i18n
            const textKey = element.getAttribute('data-lang-key');
            const text = I18N_DATA[currentLang][textKey] || 'Loading...';
            
            let i = 0;
            element.textContent = ''; // خالی کردن متن
            
            const typing = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typing, 50); // سرعت تایپ
                }
            }
            // اطمینان از اعمال ترجمه قبل از شروع
            setTimeout(typing, 500); 
        };

        // --------------------------------------------------
        // ۹. Scroll Reveal (انیمیشن‌های هنگام اسکرول)
        // --------------------------------------------------

        /**
         * نمایش انیمیشن برای المان‌های .scroll-reveal و .stat-item
         */
        const setupScrollReveal = () => {
            const elements = $$('.scroll-reveal, .stat-item, .article-card, .testimonial-card');
            
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const target = entry.target;
                            const delay = parseFloat(target.getAttribute('data-delay')) || 0;
                            
                            setTimeout(() => {
                                target.classList.add('visible');
                                target.classList.remove('scroll-reveal');
                                observer.unobserve(target);
                            }, delay * 1000);
                        }
                    });
                }, {
                    rootMargin: '0px 0px -100px 0px', // کمی قبل از وسط صفحه نمایش داده شود
                    threshold: 0.1
                });
                
                elements.forEach(el => {
                    el.classList.add('scroll-reveal'); // کلاس اولیه برای پنهان کردن
                    observer.observe(el);
                });
            } else {
                // فال‌بک: نمایش همه المان‌ها بلافاصله
                elements.forEach(el => el.classList.add('visible'));
            }
        };
        
        // --------------------------------------------------
        // ۱۰. مدیریت فرم تماس و CAPTCHA (امنیت)
        // --------------------------------------------------

        /**
         * تولید کد امنیتی (CAPTCHA)
         */
        const generateCaptcha = () => {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const operator = ['+', '-'][Math.floor(Math.random() * 2)];
            let result = 0;

            if (operator === '+') {
                result = num1 + num2;
            } else {
                // اطمینان از مثبت بودن نتیجه در فارسی
                if (num1 < num2) {
                    [num1, num2] = [num2, num1]; // جابه‌جایی
                }
                result = num1 - num2;
            }

            const captchaDisplay = $('#captcha-display');
            captchaDisplay.textContent = `${num1} ${operator} ${num2} = ؟`;
            currentCaptchaResult = result;
            $('#captcha-input').value = '';
        };

        /**
         * مدیریت رویداد فرم تماس
         */
        const handleContactForm = () => {
            const form = $('#contact-form');
            if (!form) return;

            const fullNameInput = $('#full-name');
            const emailInput = $('#email');
            const phoneInput = $('#phone-number');
            const messageInput = $('#message');
            const captchaInput = $('#captcha-input');

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;

                // تابع اعتبارسنجی فیلد
                const validateField = (input, validator, errorElId) => {
                    const errorEl = $(errorElId);
                    errorEl.textContent = '';
                    input.closest('.form-group').classList.remove('error');

                    if (input.hasAttribute('required') && !input.value.trim()) {
                        errorEl.textContent = I18N_DATA[currentLang].errorRequiredField;
                        input.closest('.form-group').classList.add('error');
                        triggerShakeAnimation(input);
                        isValid = false;
                    } else if (!validator(input.value.trim())) {
                        errorEl.textContent = errorElId.includes('email') ? I18N_DATA[currentLang].errorEmailInvalid : I18N_DATA[currentLang].errorPhoneInvalid;
                        input.closest('.form-group').classList.add('error');
                        triggerShakeAnimation(input);
                        isValid = false;
                    }
                };

                // اعتبارسنجی فیلدها
                validateField(fullNameInput, (val) => true, '#full-name-error');
                validateField(emailInput, validateEmail, '#email-error');
                validateField(phoneInput, validatePhoneNumber, '#phone-number-error');
                validateField(messageInput, (val) => true, '#message-error');
                
                // اعتبارسنجی کپچا
                const captchaErrorEl = $('#captcha-error');
                captchaErrorEl.textContent = '';
                captchaInput.closest('.form-group').classList.remove('error');
                
                if (parseInt(captchaInput.value.trim()) !== currentCaptchaResult) {
                    captchaErrorEl.textContent = I18N_DATA[currentLang].errorCaptchaInvalid;
                    captchaInput.closest('.form-group').classList.add('error');
                    triggerShakeAnimation(captchaInput);
                    generateCaptcha(); // تولید مجدد در صورت خطا
                    isValid = false;
                }

                if (isValid) {
                    // شبیه‌سازی ارسال موفقیت آمیز
                    alert(I18N_DATA[currentLang].successMessage);
                    form.reset();
                    generateCaptcha(); // تولید مجدد برای ارسال بعدی
                    
                    // اگر شماره تلفن وارد شده باشد، مودال تأیید را نمایش بده
                    if (phoneInput.value.trim() && validatePhoneNumber(phoneInput.value.trim())) {
                        handleOTPModal(phoneInput.value.trim());
                    }
                } else {
                    alert(I18N_DATA[currentLang].errorMessage);
                }
            });
            
            // تولید کپچا هنگام بارگذاری و همچنین برای استفاده در i18n
            generateCaptcha();
            ArtGalleryApp.updateCaptcha = generateCaptcha;
        };
        
        // --------------------------------------------------
        // ۱۱. مودال تأیید تلفن (OTP)
        // --------------------------------------------------
        
        /**
         * نمایش و مدیریت مودال OTP
         * @param {string} phoneNumber
         */
        const handleOTPModal = (phoneNumber) => {
            const modal = $('#otp-modal');
            const phoneDisplay = $('#otp-phone-number');
            const otpCodeInput = $('#otp-code');
            const otpVerifyButton = $('#otp-verify-button');
            const otpCloseButton = $('#otp-close-button');
            const otpErrorEl = $('#otp-error');
            const correctCode = '1234'; // کد ثابت برای شبیه‌سازی

            // تنظیم متن و نمایش مودال
            phoneDisplay.textContent = phoneNumber;
            modal.querySelector('p').textContent = I18N_DATA[currentLang].otpMessage.replace('[PHONE_NUMBER]', phoneNumber);
            otpCodeInput.value = '';
            otpErrorEl.textContent = '';
            modal.style.display = 'flex';
            
            const close = () => {
                modal.style.display = 'none';
                otpVerifyButton.removeEventListener('click', verifyHandler);
            };
            
            const verifyHandler = () => {
                otpErrorEl.textContent = '';
                if (otpCodeInput.value === correctCode) {
                    alert('تأیید شماره تلفن موفقیت آمیز بود! (نمایشی)');
                    close();
                } else {
                    otpErrorEl.textContent = 'کد وارد شده اشتباه است.';
                }
            };

            otpVerifyButton.addEventListener('click', verifyHandler);
            otpCloseButton.addEventListener('click', close);
            // بستن با کلیک بیرون از مودال
            modal.addEventListener('click', (e) => {
                if (e.target === modal) close();
            });
        };

        // --------------------------------------------------
        // ۱۲. فیلتر و مرتب سازی مقالات (جدید)
        // --------------------------------------------------

        /**
         * شبیه‌سازی دریافت داده از API و ذخیره در articlesData
         */
        const loadArticlesData = () => {
             // داده‌های اولیه (باید از index.html استخراج شود، اما برای سادگی، داده‌های شبیه‌سازی شده را در اینجا تعریف می‌کنیم)
             // در حالت واقعی، این داده‌ها از یک فایل JSON یا API دریافت می‌شوند.
             articlesData = [
                { id: 1, category: 'painting', date: new Date('2025-10-15'), views: 2500, element: $('.article-painting') },
                { id: 2, category: 'architecture', date: new Date('2025-10-20'), views: 1800, element: $('.article-architecture') },
                { id: 3, category: 'literature', date: new Date('2025-10-25'), views: 1500, element: $('.article-literature') },
                { id: 4, category: 'calligraphy', date: new Date('2025-08-01'), views: 5000, element: null } // این مقاله در HTML نیست، صرفا برای تست فیلتر
             ].filter(item => item.element); // فقط آنهایی که در DOM وجود دارند

             // مرتب‌سازی اولیه (جدیدترین)
             articlesData.sort((a, b) => b.date - a.date);
        };

        /**
         * اعمال فیلتر و مرتب سازی بر روی مقالات
         */
        const filterArticles = () => {
            const selectedCategory = $('#category-filter').value;
            const selectedSort = $('#sort-order').value;
            const articleList = $('#articles-list');

            // 1. فیلتر کردن
            const filtered = articlesData.filter(article => {
                return selectedCategory === 'all' || article.category === selectedCategory;
            });
            
            // 2. مرتب سازی
            filtered.sort((a, b) => {
                if (selectedSort === 'newest') {
                    return b.date - a.date; // جدیدترین به قدیمی‌ترین
                } else if (selectedSort === 'popular') {
                    return b.views - a.views; // بیشترین بازدید
                }
                return 0;
            });

            // 3. اعمال تغییرات در DOM (شامل نمایش/پنهان کردن و ترتیب)
            
            // ابتدا همه را پنهان می‌کنیم
            $$('.article-card').forEach(card => card.classList.add('hidden'));

            // DOM را به ترتیب جدید مرتب می‌کنیم
            const fragment = document.createDocumentFragment();
            filtered.forEach(article => {
                article.element.classList.remove('hidden');
                fragment.appendChild(article.element);
            });
            
            // برای مقالات پنهان، نمایش را مجاز می‌کنیم
            if (filtered.length > 0) {
                 articleList.appendChild(fragment);
            }
        };
        
        /**
         * مدیریت رویدادهای فیلتر
         */
        const handleArticleFiltering = () => {
            if ($('#category-filter')) {
                $('#category-filter').addEventListener('change', filterArticles);
            }
            if ($('#sort-order')) {
                $('#sort-order').addEventListener('change', filterArticles);
            }
        };
        
        // --------------------------------------------------
        // ۱۳. مدیریت آکاردئون FAQ
        // --------------------------------------------------
        
        /**
         * منطق آکاردئون برای سوالات متداول
         */
        const handleFAQAccordion = () => {
            $$('.faq-question').forEach(button => {
                button.addEventListener('click', () => {
                    const answer = $(button.getAttribute('aria-controls'));
                    const isExpanded = button.getAttribute('aria-expanded') === 'true';
                    
                    // بستن همه موارد دیگر
                    $$('.faq-question[aria-expanded="true"]').forEach(openButton => {
                        if (openButton !== button) {
                            openButton.setAttribute('aria-expanded', 'false');
                            $(openButton.getAttribute('aria-controls')).style.maxHeight = '0';
                        }
                    });

                    // باز یا بسته کردن مورد فعلی
                    if (!isExpanded) {
                        button.setAttribute('aria-expanded', 'true');
                        answer.style.maxHeight = answer.scrollHeight + 30 + 'px'; // +30 برای padding
                    } else {
                        button.setAttribute('aria-expanded', 'false');
                        answer.style.maxHeight = '0';
                    }
                });
            });
        };

        // --------------------------------------------------
        // ۱۴. ثبت نام در خبرنامه
        // --------------------------------------------------
        
        const handleNewsletter = () => {
            const newsletterForm = $('#newsletter-form');
            if (!newsletterForm) return;
            
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = $('#newsletter-email');
                const errorEl = $('#newsletter-email-error');
                errorEl.textContent = '';
                
                if (validateEmail(emailInput.value.trim())) {
                    // شبیه‌سازی ارسال
                    alert(`${I18N_DATA[currentLang].successMessage.replace('پیام', 'ایمیل')} ${emailInput.value} با موفقیت در خبرنامه ثبت شد. (نمایشی)`);
                    newsletterForm.reset();
                } else {
                    errorEl.textContent = I18N_DATA[currentLang].errorEmailInvalid;
                    triggerShakeAnimation(emailInput);
                }
            });
        };
        
        // --------------------------------------------------
        // ۱۵. منوی موبایل (بهبود یافته)
        // --------------------------------------------------

        const updateMobileMenu = () => {
            const mobileMenu = $('#mobile-menu');
            const mainNav = $('#main-nav');
            
            // کپی کردن محتوای منوی دسکتاپ به منوی موبایل
            if (mainNav) {
                mobileMenu.innerHTML = mainNav.innerHTML; 
            }
            
            // افزودن دکمه‌های ورود و ثبت نام
            mobileMenu.innerHTML += `
                <ul>
                    <li><a href="/login" class="primary-button" style="margin-top: 10px; display: block;" data-lang-key="navLogin">${I18N_DATA[currentLang].navLogin}</a></li>
                    <li><a href="/register" class="secondary-button" style="margin-top: 10px; display: block;" data-lang-key="navRegister">${I18N_DATA[currentLang].navRegister}</a></li>
                </ul>
            `;
            
            // بستن منو پس از کلیک روی لینک‌ها
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                    $('#menu-toggle i').className = 'fa-solid fa-bars';
                });
            });
        }
        
        const handleMobileMenu = () => {
            const menuToggle = $('#menu-toggle');
            const mobileMenu = $('#mobile-menu');
            
            updateMobileMenu(); // تنظیم اولیه

            menuToggle.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.toggle('open');
                menuToggle.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            });
        };


        // --------------------------------------------------
        // ۱۶. تابع Initialization (شروع کننده)
        // --------------------------------------------------
        const init = () => {
            // ترتیب اهمیت دارد:
            handleThemeToggle();       // 4. تم
            handleLangToggle();        // 3. چندزبانگی
            typeWriterEffect();        // 8. افکت تایپ رایتینگ
            handleBackToTop();         // 6. نوار پیشرفت و دکمه بالا
            handleCarousel();          // 7. اسلایدر
            handleContactForm();       // 10. فرم تماس و کپچا
            handleNewsletter();        // 14. خبرنامه
            handleFAQAccordion();      // 13. آکاردئون
            handleMobileMenu();        // 15. منوی موبایل
            
            // بهینه‌سازی و تعاملات
            loadArticlesData();        // 12. بارگذاری داده‌های اولیه
            filterArticles();          // 12. اعمال فیلتر اولیه
            handleArticleFiltering();  // 12. تنظیم رویدادهای فیلتر
            
            // عملکرد و UX (باید در انتها اجرا شوند)
            setupScrollReveal();       // 9. انیمیشن‌های اسکرول
            lazyLoadImages();          // 5. بارگذاری تنبل تصاویر

            // نمایش سال جاری در فوتر
            $('#current-year').textContent = new Date().getFullYear().toLocaleString('fa-IR');
            
            // پنهان کردن Loader پس از 500 میلی‌ثانیه برای اطمینان از لود شدن اولیه
            setTimeout(() => {
                const loader = $('#page-loader');
                if (loader) {
                    loader.style.opacity = 0;
                    setTimeout(() => loader.style.display = 'none', 300);
                }
            }, 500);
        };
        
        // خروجی توابع کلیدی برای دسترسی بیرونی (در صورت نیاز)
        return {
            init: init,
            updateCarousel: () => {}, // placeholder
            updateCaptcha: () => {},  // placeholder
            updateMobileMenu: updateMobileMenu
        };
        
    })();

    // شروع به کار برنامه
    ArtGalleryApp.init();
});
