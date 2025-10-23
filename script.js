/*
==================================================
  گنجینه فرهنگ و هنر - فایل Script.js
  منطق پیشرفته، امنیت، i18n، و تعاملات UX/UI
==================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);

    const html = $('html');
    const body = $('body');
    let currentLang = html.getAttribute('lang') || 'fa';
    
    // --------------------------------------------------
    // ۱. داده‌های چندزبانه سازی (i18n Data)
    // --------------------------------------------------
    const I18N_DATA = {
        fa: {
            // متادیتا
            pageTitle: "خانه | گنجینه فرهنگ و هنر - جامع‌ترین مرجع هنر ایران",
            metaDescription: "گنجینه فرهنگ و هنر، پلی میان گذشته و آینده هنر و ادبیات ایران. مکانی برای بازتاب زیبایی‌های اصیل، مقالات تخصصی، و ثبت نام هنرمندان.",
            // ناوبری و هدر
            logoTitle: "گنجینه هنر",
            navHome: "خانه", navFeatured: "آثار ویژه", navArticles: "مقالات", navAbout: "درباره ما", navContact: "تماس با ما", navFAQ: "سؤالات متداول",
            navLogin: "ورود", navRegister: "ثبت نام",
            searchPlaceholder: "جستجوی آثار و مقالات...",
            langToggleText: "EN",
            // هیرو
            heroMainTitle: "گنجینه فرهنگ و هنر: جامع‌ترین مرجع هنر ایران",
            heroSubtitle: "پلی میان گذشته و آینده هنر و ادبیات ایران. مکانی برای بازتاب زیبایی‌های اصیل و اشتراک‌گذاری آثار هنری.",
            heroCTA: "مشاهده آثار برگزیده",
            // آمار
            statArtworks: "اثر ثبت شده", statArtists: "هنرمند فعال", statCategories: "دسته هنری",
            // اسلایدر (نمونه)
            featuredTitle: "آثار ویژه و منتخب هفته", featuredSubtitle: "برترین آثار هنرمندان برجسته ایرانی را مشاهده کنید.",
            slideLink: "مشاهده جزئیات",
            // مقالات و فیلتر
            articlesTitle: "آخرین مقالات تخصصی", articlesSubtitle: "مقالات عمیق و تحلیلی در زمینه‌های مختلف هنر و فرهنگ ایران.",
            filterLabel: "فیلتر بر اساس:", filterAll: "همه دسته‌ها", sortLabel: "مرتب‌سازی:", sortByDate: "جدیدترین", 
            readMore: "ادامه مطلب", loadMoreButton: "مشاهده مقالات بیشتر",
            // درباره ما
            aboutTitle: "درباره گنجینه فرهنگ و هنر", aboutP1: "ما با هدف جمع‌آوری و نمایش جامع‌ترین آثار هنری و فرهنگی ایران، این پلتفرم را بنیان نهادیم...",
            aboutP2: "تیم ما متشکل از متخصصان هنر، تاریخ و فناوری است که متعهد به ارائه یک تجربه کاربری بی‌نقص و محتوای دقیق و معتبر هستند.",
            aboutTeamLink: "آشنایی با تیم ما",
            // تماس با ما و فرم
            contactTitle: "ارسال نظر و تماس با ما", contactSubtitle: "ما مشتاق شنیدن نظرات، پیشنهادات و انتقادات شما هستیم.",
            formHeader: "فرم تماس",
            placeholderName: "نام و نام خانوادگی", placeholderEmail: "ایمیل معتبر", placeholderMessage: "پیام شما...",
            placeholderCaptcha: "کد امنیتی را وارد کنید", formSubmitButton: "ارسال پیام",
            // خطاها و پیام‌های سیستم
            errorNameRequired: "وارد کردن نام الزامی است.", errorEmailInvalid: "لطفاً یک آدرس ایمیل معتبر وارد کنید.", 
            errorMessageRequired: "لطفاً پیام خود را وارد کنید.", errorCaptcha: "کد امنیتی وارد شده صحیح نیست.",
            successMessage: "✅ پیام شما با موفقیت ارسال شد. از شما متشکریم.",
            errorSystem: "❌ خطایی در ارسال پیام رخ داد. لطفاً دوباره تلاش کنید.",
            // خبرنامه
            newsletterTitle: "عضویت در خبرنامه", newsletterSubtitle: "جدیدترین آثار و مقالات را مستقیماً در ایمیل خود دریافت کنید.",
            newsletterSubmitButton: "عضویت",
            // فوتر
            footerAboutTitle: "گنجینه هنر", footerMission: "ما بزرگ‌ترین آرشیو آنلاین هنر ایرانی هستیم که پل ارتباطی میان هنرمندان و جامعه جهانی ایجاد می‌کنیم.",
            footerLinksTitle: "لینک‌های سریع", navPrivacy: "سیاست حفظ حریم خصوصی", navTerms: "شرایط استفاده از خدمات",
            footerContactTitle: "تماس و نقشه سایت", footerAddress: "آدرس: تهران، خیابان هنر، پلاک ۱۰",
            footerEmail: "ایمیل:", footerPhone: "تلفن:", footerSitemapLink: "مشاهده نقشه سایت (XML)",
            footerCopyright: "© ۲۰۲۵ گنجینه فرهنگ و هنر - تمامی حقوق محفوظ است.", footerDesign: "طراحی و توسعه با ❤️ برای ترویج فرهنگ ایران.",
            // ورود و ثبت نام (Modal)
            modalLoginTitle: "ورود به حساب کاربری", modalRegisterTitle: "ایجاد حساب کاربری جدید",
            loginButton: "ورود", registerButton: "ثبت نام",
            registerHelp: "با ثبت نام، شما شرایط خدمات ما را می‌پذیرید.",
            placeholderPassword: "گذرواژه", placeholderPhone: "شماره تلفن (اختیاری)",
            forgotPassword: "رمز عبور را فراموش کرده‌اید؟",
            passwordSuggestButton: "پیشنهاد گذرواژه قوی",
            passwordSuggested: "گذرواژه زیر به کلیپ‌بورد کپی شد. لطفاً آن را ذخیره کنید:",
            errorPhoneInvalid: "شماره تلفن وارد شده معتبر نیست. (فرمت: 09xx xxx xx xx)",
            // تأیید تلفن
            verifyPhoneTitle: "تأیید شماره تلفن", verifyPhoneCode: "کد تأیید به شماره شما ارسال شد.",
            placeholderVerificationCode: "کد تأیید ۴ رقمی", verifyButton: "تأیید",
        },
        en: {
            // Metadata
            pageTitle: "Home | Iranian Art and Culture Treasure - Comprehensive Reference",
            metaDescription: "The Iranian Art and Culture Treasure is a bridge between the past and future of Iranian art and literature. A platform for reflecting authentic beauty, specialized articles, and artist registration.",
            // Navigation
            logoTitle: "Art Treasure",
            navHome: "Home", navFeatured: "Featured Works", navArticles: "Articles", navAbout: "About Us", navContact: "Contact Us", navFAQ: "FAQ",
            navLogin: "Login", navRegister: "Register",
            searchPlaceholder: "Search Artworks and Articles...",
            langToggleText: "فارسی",
            // Hero
            heroMainTitle: "Iranian Art and Culture Treasure: The Comprehensive Reference",
            heroSubtitle: "A bridge between the past and future of Iranian art and literature. A place to reflect authentic beauty and share artworks.",
            heroCTA: "View Featured Works",
            // Stats
            statArtworks: "Registered Artworks", statArtists: "Active Artists", statCategories: "Art Categories",
            // Slider (Sample)
            featuredTitle: "Featured and Selected Works of the Week", featuredSubtitle: "View the best works by prominent Iranian artists.",
            slideLink: "View Details",
            // Articles and Filter
            articlesTitle: "Latest Specialized Articles", articlesSubtitle: "In-depth and analytical articles on various fields of Iranian art and culture.",
            filterLabel: "Filter by:", filterAll: "All Categories", sortLabel: "Sort by:", sortByDate: "Newest",
            readMore: "Read More", loadMoreButton: "View More Articles",
            // About Us
            aboutTitle: "About the Art and Culture Treasure", aboutP1: "We founded this platform with the goal of collecting and displaying the most comprehensive Iranian artistic and cultural works...",
            aboutP2: "Our team consists of experts in art, history, and technology committed to providing a flawless user experience and accurate, reliable content.",
            aboutTeamLink: "Meet Our Team",
            // Contact Us and Form
            contactTitle: "Send Feedback and Contact Us", contactSubtitle: "We are eager to hear your opinions, suggestions, and criticisms.",
            formHeader: "Contact Form",
            placeholderName: "Full Name", placeholderEmail: "Valid Email", placeholderMessage: "Your Message...",
            placeholderCaptcha: "Enter Security Code", formSubmitButton: "Send Message",
            // Errors and System Messages
            errorNameRequired: "Name is required.", errorEmailInvalid: "Please enter a valid email address.",
            errorMessageRequired: "Please enter your message.", errorCaptcha: "The entered security code is incorrect.",
            successMessage: "✅ Your message was sent successfully. Thank you.",
            errorSystem: "❌ An error occurred while sending the message. Please try again.",
            // Newsletter
            newsletterTitle: "Subscribe to Newsletter", newsletterSubtitle: "Receive the latest artworks and articles directly in your email.",
            newsletterSubmitButton: "Subscribe",
            // Footer
            footerAboutTitle: "Art Treasure", footerMission: "We are the largest online archive of Iranian art, creating a bridge between artists and the global community.",
            footerLinksTitle: "Quick Links", navPrivacy: "Privacy Policy", navTerms: "Terms of Service",
            footerContactTitle: "Contact and Site Map", footerAddress: "Address: Tehran, Honar Street, Plaque 10",
            footerEmail: "Email:", footerPhone: "Phone:", footerSitemapLink: "View Site Map (XML)",
            footerCopyright: "© 2025 Art and Culture Treasure - All rights reserved.", footerDesign: "Designed and Developed with ❤️ to promote Iranian culture.",
            // Login and Register (Modal)
            modalLoginTitle: "Log in to your Account", modalRegisterTitle: "Create a New Account",
            loginButton: "Login", registerButton: "Register",
            registerHelp: "By registering, you accept our Terms of Service.",
            placeholderPassword: "Password", placeholderPhone: "Phone Number (Optional)",
            forgotPassword: "Forgot Password?",
            passwordSuggestButton: "Suggest Strong Password",
            passwordSuggested: "The following password has been copied to the clipboard. Please save it:",
            errorPhoneInvalid: "The entered phone number is invalid. (Format: 09xx xxx xx xx)",
            // Phone Verification
            verifyPhoneTitle: "Verify Phone Number", verifyPhoneCode: "A verification code has been sent to your number.",
            placeholderVerificationCode: "4-digit Verification Code", verifyButton: "Verify",
        }
    };

    // --------------------------------------------------
    // ۲. توابع کمکی (Utility Functions)
    // --------------------------------------------------

    // اعتبار سنجی ایمیل
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    };
    // اعتبار سنجی شماره تلفن (فقط ایران)
    const validatePhoneNumber = (phone) => {
        // الگو: 09xx xxx xxxx
        const re = /^09\d{9}$/;
        return re.test(String(phone).replace(/\s/g, ''));
    };
    
    // تولید گذرواژه قوی
    const generateStrongPassword = () => {
        const length = 16;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=";
        let password = "";
        
        // اطمینان از وجود حداقل یک حرف بزرگ، کوچک، عدد، و کاراکتر ویژه
        password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
        password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
        password += "0123456789"[Math.floor(Math.random() * 10)];
        password += "!@#$%^&*"[Math.floor(Math.random() * 8)];

        // تکمیل باقی طول
        for (let i = password.length; i < length; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }
        
        // درهم ریختن (shuffle) رشته نهایی
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    };

    // --------------------------------------------------
    // ۳. چندزبانه سازی (Internationalization - i18n)
    // --------------------------------------------------

    const applyLanguage = (lang) => {
        // تغییر ویژگی lang و dir در المان html و body
        html.setAttribute('lang', lang);
        html.setAttribute('dir', (lang === 'fa' ? 'rtl' : 'ltr'));
        body.setAttribute('dir', (lang === 'fa' ? 'rtl' : 'ltr'));

        // اعمال ترجمه بر اساس data-lang-key
        $$('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (I18N_DATA[lang] && I18N_DATA[lang][key]) {
                const translation = I18N_DATA[lang][key];

                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    // برای placeholder
                    el.setAttribute('placeholder', translation);
                } else if (el.tagName === 'TITLE') {
                    // برای title صفحه
                    el.textContent = translation;
                } else if (el.tagName === 'META' && el.getAttribute('name') === 'description') {
                    // برای meta description
                    el.setAttribute('content', translation);
                } else {
                    // برای محتوای متنی
                    el.textContent = translation;
                }
            }
        });
        currentLang = lang;
        localStorage.setItem('siteLang', lang);
        // به‌روزرسانی متن دکمه EN/فارسی
        $('#lang-toggle span').textContent = I18N_DATA[lang].langToggleText;
    };

    // لود زبان ذخیره شده در localStorage یا تعیین زبان پیش‌فرض
    const storedLang = localStorage.getItem('siteLang') || 'fa';
    applyLanguage(storedLang);

    // مدیریت کلیک دکمه تغییر زبان
    $('#lang-toggle').addEventListener('click', () => {
        const newLang = (currentLang === 'fa' ? 'en' : 'fa');
        applyLanguage(newLang);
    });

    // --------------------------------------------------
    // ۴. مدیریت حالت تاریک/روشن (Dark Mode)
    // --------------------------------------------------
    
    const modeToggle = $('#mode-toggle');
    const modeIcon = $('#mode-icon');
    
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            html.classList.add('dark-mode');
            html.classList.remove('theme-light');
            modeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            html.classList.remove('dark-mode');
            html.classList.add('theme-light');
            modeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        localStorage.setItem('siteTheme', theme);
    };

    // لود تم ذخیره شده یا تشخیص تم سیستمی
    const storedTheme = localStorage.getItem('siteTheme');
    if (storedTheme) {
        applyTheme(storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    modeToggle.addEventListener('click', () => {
        const newTheme = html.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // --------------------------------------------------
    // ۵. منوی موبایل (همبرگری)
    // --------------------------------------------------
    const menuToggle = $('#menu-toggle');
    const mainNav = $('#main-nav');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-xmark');
        // بستن منو با کلیک روی هر لینک
        $$('#main-nav a').forEach(link => {
            link.addEventListener('click', () => mainNav.classList.remove('open'));
        });
    });
    
    // --------------------------------------------------
    // ۶. نوار پیشرفت اسکرول و دکمه بازگشت به بالا
    // --------------------------------------------------
    const progressBar = $('#progress-bar');
    const backToTopButton = $('#back-to-top');
    const header = $('header');

    window.addEventListener('scroll', () => {
        // ۱. نوار پیشرفت
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';

        // ۲. دکمه بازگشت به بالا
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
            header.classList.add('scrolled'); // افکت هدر ثابت
        } else {
            backToTopButton.classList.remove('show');
            header.classList.remove('scrolled');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --------------------------------------------------
    // ۷. شمارنده‌های انیمیشنی (Stats Counters)
    // --------------------------------------------------
    
    const statCounters = $$('.stat-value');
    
    const countUp = (el, target) => {
        let count = 0;
        const speed = 200; // سرعت کلی انیمیشن
        const step = target / speed;
        
        const updateCount = () => {
            count += step;
            if (count < target) {
                el.textContent = "+" + Math.floor(count).toLocaleString(currentLang);
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = "+" + target.toLocaleString(currentLang);
            }
        };
        updateCount();
    };

    // استفاده از Intersection Observer برای شروع انیمیشن هنگام ورود به دید
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                if (target) {
                    countUp(entry.target, target);
                }
                observer.unobserve(entry.target); // فقط یکبار اجرا شود
            }
        });
    }, { threshold: 0.5 }); // وقتی ۵۰٪ از المان در دید باشد

    statCounters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // --------------------------------------------------
    // ۸. انیمیشن Typewriter برای تیتر Hero
    // --------------------------------------------------

    const heroTitleEl = $('#hero-title');
    if (heroTitleEl) {
        const text = I18N_DATA[currentLang].heroMainTitle;
        heroTitleEl.textContent = ''; // خالی کردن محتوای اولیه
        let i = 0;
        const speed = 75; // سرعت تایپ

        function typeWriter() {
            if (i < text.length) {
                heroTitleEl.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        // تاخیر برای لود اولیه
        setTimeout(typeWriter, 500); 
    }

    // --------------------------------------------------
    // ۹. Scroll Reveal (Fade In)
    // --------------------------------------------------
    const fadeInElements = $$('.fade-in');

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); 

    fadeInElements.forEach(el => {
        fadeInObserver.observe(el);
    });


    // --------------------------------------------------
    // ۱۰. اعتبارسنجی پیشرفته فرم تماس (Contact Form)
    // --------------------------------------------------

    const contactForm = $('#contact-form');
    const formStatus = $('#form-status');
    let generatedCaptcha = '';

    // تولید کد امنیتی (CAPTCHA)
    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        generatedCaptcha = num1 + num2; // پاسخ صحیح
        $('#captcha-display').textContent = `${num1} + ${num2} = ?`;
        $('#captcha-input').value = '';
    };
    generateCaptcha(); // لود اولیه

    const validateForm = (form, isContact) => {
        let isValid = true;
        const fields = isContact ? ['contact-name', 'contact-email', 'contact-message', 'captcha-input'] : ['newsletter-email'];

        fields.forEach(id => {
            const input = $(`#${id}`);
            const errorEl = $(`#${id.replace('contact-', '').replace('-input', '')}-error`);
            if (!input) return;

            errorEl.textContent = ''; // پاک کردن خطاهای قبلی

            if (input.hasAttribute('required') && input.value.trim() === '') {
                errorEl.textContent = I18N_DATA[currentLang].errorNameRequired; // خطا برای فیلد اول
                if (id.includes('email')) errorEl.textContent = I18N_DATA[currentLang].errorEmailInvalid;
                if (id.includes('message')) errorEl.textContent = I18N_DATA[currentLang].errorMessageRequired;
                isValid = false;
            } else if (id.includes('email') && !validateEmail(input.value)) {
                errorEl.textContent = I18N_DATA[currentLang].errorEmailInvalid;
                isValid = false;
            } else if (id === 'captcha-input') {
                if (parseInt(input.value) !== generatedCaptcha) {
                    errorEl.textContent = I18N_DATA[currentLang].errorCaptcha;
                    generateCaptcha(); // تولید مجدد کپچا
                    isValid = false;
                }
            }
        });
        return isValid;
    };


    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.style.display = 'none';

            if (validateForm(contactForm, true)) {
                // شبیه‌سازی ارسال موفقیت‌آمیز به سرور
                setTimeout(() => {
                    formStatus.textContent = I18N_DATA[currentLang].successMessage;
                    formStatus.style.display = 'block';
                    formStatus.style.color = 'var(--color-success)';
                    contactForm.reset();
                    generateCaptcha(); // تولید مجدد کپچا پس از ارسال موفق
                }, 1000);
            } else {
                formStatus.textContent = I18N_DATA[currentLang].errorSystem; // در صورت خطا، پیام خطا نمایش داده می‌شود
                formStatus.style.display = 'block';
                formStatus.style.color = 'var(--color-error)';
                generateCaptcha();
            }
        });
    }

    // --------------------------------------------------
    // ۱۱. مودال‌های ورود و ثبت نام (Login/Register Modals)
    // --------------------------------------------------
    const loginButton = $('#login-button');
    const registerButton = $('#register-button');

    // تابع تولید محتوای مودال (برای حفظ سادگی، محتوا را در JS تولید می‌کنیم)
    const createAuthModal = (type) => {
        const isLogin = (type === 'login');
        const titleKey = isLogin ? 'modalLoginTitle' : 'modalRegisterTitle';
        const buttonKey = isLogin ? 'loginButton' : 'registerButton';

        // محتوای فرم
        let formContent = `
            <div class="form-group">
                <label for="auth-email" class="sr-only">${I18N_DATA[currentLang].placeholderEmail}</label>
                <input type="email" id="auth-email" name="email" required placeholder="${I18N_DATA[currentLang].placeholderEmail}">
                <span class="error-message" id="auth-email-error"></span>
            </div>
            <div class="form-group">
                <label for="auth-password" class="sr-only">${I18N_DATA[currentLang].placeholderPassword}</label>
                <input type="password" id="auth-password" name="password" required placeholder="${I18N_DATA[currentLang].placeholderPassword}">
                ${!isLogin ? `<button type="button" id="suggest-password-btn" class="secondary-button small-btn">${I18N_DATA[currentLang].passwordSuggestButton}</button>` : ''}
                <span class="error-message" id="auth-password-error"></span>
            </div>
        `;
        
        // فیلدهای اضافی برای ثبت نام
        if (!isLogin) {
             formContent += `
                <div class="form-group">
                    <label for="auth-phone" class="sr-only">${I18N_DATA[currentLang].placeholderPhone}</label>
                    <input type="tel" id="auth-phone" name="phone" placeholder="${I18N_DATA[currentLang].placeholderPhone}" pattern="09[0-9]{9}">
                    <span class="error-message" id="auth-phone-error"></span>
                </div>
                <p class="help-text">${I18N_DATA[currentLang].registerHelp}</p>
            `;
        } else {
            formContent += `<a href="#" class="forgot-password-link">${I18N_DATA[currentLang].forgotPassword}</a>`;
        }


        // ساختار مودال
        const modal = document.createElement('div');
        modal.classList.add('modal-backdrop');
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal-btn" aria-label="بستن"><i class="fa-solid fa-xmark"></i></button>
                <h3 class="modal-title" data-lang-key="${titleKey}">${I18N_DATA[currentLang][titleKey]}</h3>
                <form id="auth-form" data-type="${type}">
                    ${formContent}
                    <button type="submit" class="cta-button full-width">${I18N_DATA[currentLang][buttonKey]}</button>
                </form>
            </div>
        `;

        document.body.appendChild(modal);
        
        // مدیریت رویدادها
        modal.querySelector('.close-modal-btn').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => { if (e.target.classList.contains('modal-backdrop')) modal.remove(); });
        
        // مدیریت پیشنهاد رمز عبور (فقط در حالت ثبت نام)
        const suggestPassBtn = $('#suggest-password-btn');
        if (suggestPassBtn) {
            suggestPassBtn.addEventListener('click', () => {
                const newPass = generateStrongPassword();
                $('#auth-password').value = newPass;
                navigator.clipboard.writeText(newPass).then(() => {
                    alert(`${I18N_DATA[currentLang].passwordSuggested} ${newPass}`);
                });
            });
        }
        
        // اعتبارسنجی فرم ورود/ثبت نام
        const authForm = $('#auth-form');
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (handleAuthSubmit(authForm)) {
                 modal.remove(); // بستن مودال پس از موفقیت
            }
        });
    };
    
    // شبیه‌سازی تأیید تلفن
    const handlePhoneVerification = (phone) => {
        const modal = document.createElement('div');
        modal.classList.add('modal-backdrop');
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal-btn" aria-label="بستن"><i class="fa-solid fa-xmark"></i></button>
                <h3 class="modal-title">${I18N_DATA[currentLang].verifyPhoneTitle}</h3>
                <p>${I18N_DATA[currentLang].verifyPhoneCode} ${phone}</p>
                <form id="verify-form">
                    <div class="form-group">
                        <input type="text" id="verify-code" name="code" required placeholder="${I18N_DATA[currentLang].placeholderVerificationCode}" maxlength="4">
                        <span class="error-message" id="verify-code-error"></span>
                    </div>
                    <button type="submit" class="cta-button full-width">${I18N_DATA[currentLang].verifyButton}</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-modal-btn').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => { if (e.target.classList.contains('modal-backdrop')) modal.remove(); });
        
        $('#verify-form').addEventListener('submit', (e) => {
             e.preventDefault();
             if ($('#verify-code').value === '1234') { // کد ساختگی
                 alert('✅ تأیید شماره تلفن موفقیت‌آمیز بود!');
                 modal.remove();
             } else {
                 $('#verify-code-error').textContent = 'کد وارد شده صحیح نیست.';
             }
        });
    };
    
    // منطق اصلی سابمیت ورود/ثبت نام
    const handleAuthSubmit = (form) => {
        const type = form.getAttribute('data-type');
        const emailInput = $('#auth-email');
        const passInput = $('#auth-password');
        const phoneInput = $('#auth-phone');
        let isValid = true;
        
        // اعتبار سنجی ایمیل و رمز
        if (!validateEmail(emailInput.value)) {
            $('#auth-email-error').textContent = I18N_DATA[currentLang].errorEmailInvalid;
            isValid = false;
        } else {
            $('#auth-email-error').textContent = '';
        }
        if (passInput.value.length < 8) {
            $('#auth-password-error').textContent = 'گذرواژه باید حداقل ۸ کاراکتر باشد.';
            isValid = false;
        } else {
            $('#auth-password-error').textContent = '';
        }
        
        // اعتبار سنجی تلفن (فقط ثبت نام)
        if (type === 'register' && phoneInput && phoneInput.value.trim() !== '') {
            if (!validatePhoneNumber(phoneInput.value)) {
                $('#auth-phone-error').textContent = I18N_DATA[currentLang].errorPhoneInvalid;
                isValid = false;
            } else {
                 $('#auth-phone-error').textContent = '';
            }
        }
        
        if (isValid) {
            if (type === 'login') {
                alert('✅ ورود موفقیت‌آمیز. (شبیه‌سازی)');
                return true;
            } else if (type === 'register') {
                 if (phoneInput && phoneInput.value.trim() !== '' && validatePhoneNumber(phoneInput.value)) {
                    // اگر تلفن معتبر بود، مودال تأیید تلفن را نمایش بده
                    handlePhoneVerification(phoneInput.value);
                    return true;
                 } else {
                    alert('✅ ثبت نام اولیه موفقیت‌آمیز. به پنل کاربری هدایت می‌شوید. (شبیه‌سازی)');
                    return true;
                 }
            }
        }
        return false;
    };
    
    // مدیریت کلیک دکمه‌های ورود و ثبت نام
    loginButton.addEventListener('click', () => createAuthModal('login'));
    registerButton.addEventListener('click', () => createAuthModal('register'));

    // --------------------------------------------------
    // ۱۲. اسلایدر پیشرفته (Carousel)
    // --------------------------------------------------
    const carouselTrack = $('#featured-slider .carousel-track');
    const carouselItems = $$('#featured-slider .carousel-item');
    const carouselPrev = $('#featured-slider .prev-button');
    const carouselNext = $('#featured-slider .next-button');
    const dots = $$('#featured-slider .carousel-dot');
    const totalItems = carouselItems.length;
    let currentIndex = 0;
    let autoSlideInterval;

    if (carouselTrack && totalItems > 0) {
        
        const updateCarousel = () => {
            const offset = currentIndex * (carouselItems[0].offsetWidth + 30); // عرض آیتم + فاصله (gap)
            carouselTrack.style.transform = `translateX(${-offset}px)`;
            
            // به‌روزرسانی نقطه‌ها
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        };
        
        // تابع اسلاید بعدی
        const goToNextSlide = () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        };

        // هندلرهای کلیک
        carouselNext.addEventListener('click', goToNextSlide);
        
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

        // اسلاید خودکار
        const startAutoSlide = () => {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(goToNextSlide, 8000); // هر ۸ ثانیه
        };
        
        // مکث در hover
        const carouselContainer = $('#featured-slider .carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }
        
        // اطمینان از تنظیم اولیه
        window.addEventListener('load', updateCarousel); 
        window.addEventListener('resize', updateCarousel);
        startAutoSlide(); // شروع اسلاید خودکار
    }
    
    // ----------------------------------------------------
    // ۱۳. ثبت نام در خبرنامه (Newsletter)
    // ----------------------------------------------------
    const newsletterForm = $('#newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = $('#newsletter-email');
            const errorEl = $('#newsletter-email-error');
            errorEl.textContent = '';
            
            if (validateEmail(emailInput.value)) {
                // شبیه‌سازی ارسال
                alert(`${I18N_DATA[currentLang].successMessage.replace('پیام', 'ایمیل')} ${emailInput.value} با موفقیت در خبرنامه ثبت شد. (نمایشی)`);
                newsletterForm.reset();
            } else {
                errorEl.textContent = I18N_DATA[currentLang].errorEmailInvalid;
            }
        });
    }

    // ----------------------------------------------------
    // ۱۴. نمایش سال جاری در فوتر
    // ----------------------------------------------------
    $('#current-year').textContent = new Date().getFullYear().toLocaleString('fa-IR');
});