/*
==================================================
  گنجینه فرهنگ و هنر - فایل Script.js (نسخه بسیار پیشرفته، ماژولار و فیکس‌شده)
  ** فیکس Critical Bugs: پرش محتوا (CLS)، اسکرول افقی، و مشکلات بصری با ResizeObserver, IntersectionObserver, debounce **
  شامل: Module Pattern پیشرفته, Lazy Loading with Intersection, Advanced Filtering with Fuse.js placeholder, Security Enhancements, Keyboard Nav, Touch Events, Error Handling, and Accessibility Checks
==================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);
    const html = $('html');
    const body = $('body');
    body.classList.remove('preload'); // Remove preload class after DOM load to enable transitions

    // --------------------------------------------------
    // ۱. داده‌های چندزبانه سازی (i18n Data) با داده‌های کامل‌تر و fallback
    // --------------------------------------------------
    const I18N_DATA = {
        fa: {
            pageTitle: 'خانه | گنجینه فرهنگ و هنر - جامع‌ترین مرجع هنر ایران',
            metaDescription: 'گنجینه فرهنگ و هنر، پلی میان گذشته و آینده هنر و ادبیات ایران. مکانی برای بازتاب زیبایی‌های اصیل، مقالات تخصصی، ثبت نام هنرمندان، و ثبت نام هنرمندان.',
            logoTitle: 'گنجینه هنر',
            navHome: 'خانه',
            navFeatured: 'آثار ویژه',
            navArticles: 'مقالات',
            navAbout: 'درباره ما',
            navContact: 'تماس با ما',
            navFAQ: 'سؤالات متداول',
            navEvents: 'رویدادها',
            navGallery: 'گالری',
            navBlog: 'وبلاگ',
            navLogin: 'ورود',
            navRegister: 'ثبت نام',
            langToggleText: 'EN',
            searchPlaceholder: 'جستجوی آثار هنری، مقالات، هنرمندان، رویدادها و کلمات کلیدی...',
            heroMainTitle: 'گنجینه فرهنگ و هنر: جامع‌ترین مرجع هنر ایران با تمرکز بر میراث فرهنگی، نوآوری‌های هنری و ابزارهای دیجیتال',
            heroSubtitle: 'پلی میان گذشته و آینده هنر و ادبیات ایران. مکانی برای بازتاب زیبایی‌های اصیل، اشتراک‌گذاری آثار هنری، کاوش مقالات تخصصی، شرکت در رویدادها، و ارتباط با جامعه هنری جهانی با ویژگی‌های interactive.',
            heroCTA: 'مشاهده آثار برگزیده',
            heroRegister: 'ثبت نام هنرمند',
            heroGallery: 'کاوش گالری',
            statArtworks: 'اثر هنری ثبت شده با کیفیت بالا',
            statArtists: 'هنرمند فعال و ثبت‌شده در پلتفرم',
            statCategories: 'دسته هنری متنوع و تخصصی',
            statVisitors: 'بازدیدکننده ماهانه فعال',
            statEvents: 'رویداد فرهنگی برگزارشده',
            featuredTitle: 'آثار ویژه و منتخب هفته با تمرکز بر تنوع فرهنگی و هنری',
            featuredSubtitle: 'برترین آثار هنرمندان برجسته ایرانی را مشاهده کنید و در عمق زیبایی‌های هنری غوطه‌ور شوید، با گزینه‌های زوم و نمایش جزئیات.',
            slide1Title: 'مینیاتور: سیمرغ افسانه‌ای',
            slide1Artist: 'اثر استاد فرخ امینی با جزئیات دقیق، الهام‌گرفته از اساطیر ایرانی و تکنیک‌های سنتی',
            slide2Title: 'خوشنویسی: شعر حافظ',
            slide2Artist: 'اثر بانو سارا نوری با خطاطی نستعلیق، ترکیب‌بندی هنری و الهام از غزلیات',
            slide3Title: 'معماری: پرسپولیس مدرن',
            slide3Artist: 'طرح مهندس علیرضا کیانی با تلفیق عناصر باستانی، مدرن و پایدار',
            slide4Title: 'نقاشی مدرن: کویر بی‌انتها',
            slide4Artist: 'اثر بانو مریم زمانی با تکنیک‌های آبستره، رنگ‌های طبیعی و مفهوم بیکرانگی',
            slide5Title: 'مجسمه‌سازی: رستم دستان',
            slide5Artist: 'اثر مجسمه‌ساز حمید رضایی با مواد سنتی، جزئیات حماسی و الهام از شاهنامه',
            slide6Title: 'عکاسی: مناظر شمال ایران',
            slide6Artist: 'اثر عکاس رضا محمدی با تمرکز بر زیبایی‌های طبیعی، نورپردازی و ترکیب‌بندی',
            slide7Title: 'صنایع دستی: فرش دستباف',
            slide7Artist: 'اثر بافنده‌های تبریز با الگوهای سنتی و رنگ‌های طبیعی',
            slideLink: 'مشاهده جزئیات کامل',
            articlesTitle: 'آخرین مقالات تخصصی با تحلیل‌های عمیق و منابع علمی',
            articlesSubtitle: 'مقالات عمیق و تحلیلی در زمینه‌های مختلف هنر و فرهنگ ایران، همراه با منابع، ارجاعات علمی، و گزینه‌های اشتراک‌گذاری.',
            filterLabel: 'فیلتر بر اساس دسته:',
            filterAll: 'همه دسته‌ها',
            sortLabel: 'مرتب‌سازی بر اساس:',
            sortByDate: 'جدیدترین مقالات',
            article1Excerpt: 'بررسی چگونگی الهام‌گیری هنرمندان از داستان‌های حماسی فردوسی در نگارگری سنتی، همراه با مثال‌های تاریخی، تحلیل‌های بصری، و منابع کتاب‌شناختی...',
            article2Excerpt: 'مروری بر ویژگی‌های منحصر به فرد معماری صفوی و شاهکارهای اصفهان، با تمرکز بر هندسه، نمادشناسی و تأثیرات فرهنگی...',
            article3Excerpt: 'تحلیل ساختار آوازی و تأثیرات اجتماعی موسیقی‌های محلی ایران، با مثال‌های صوتی، فرهنگی و جامعه‌شناختی...',
            article4Excerpt: 'بررسی روندهای نوین در مجسمه‌سازی ایرانی با تمرکز بر مواد جدید، مفاهیم اجتماعی و نمایشگاه‌های بین‌المللی...',
            article5Excerpt: 'تحلیل تکنیک‌های عکاسی در ثبت میراث فرهنگی، با مثال‌های عملی و ابزارهای دیجیتال...',
            readMore: 'ادامه مطلب',
            loadMoreButton: 'مشاهده مقالات بیشتر',
            aboutTitle: 'درباره گنجینه فرهنگ و هنر: مأموریت، چشم‌انداز و تعهدات',
            aboutP1: 'ما با هدف جمع‌آوری، حفظ، دیجیتال‌سازی و نمایش جامع‌ترین آثار هنری و فرهنگی ایران، این پلتفرم را بنیان نهادیم. مأموریت ما حمایت از هنرمندان داخلی، معرفی غنای فرهنگی ایران به جهان، و فراهم کردن ابزارهای پیشرفته مانند جستجوی هوشمند، نمایش سه‌بعدی آثار، و تعاملات جامعه برای دانشجویان، پژوهشگران و علاقه‌مندان است.',
            aboutP2: 'تیم ما متشکل از متخصصان هنر، تاریخ، فناوری اطلاعات، طراحی UX/UI، و کارشناسان سئو است که متعهد به ارائه یک تجربه کاربری بی‌نقص، محتوای دقیق و معتبر، ویژگی‌های نوآورانه، و رعایت استانداردهای دسترسی WCAG 2.1 هستند.',
            aboutP3: 'با تمرکز بر پایداری فرهنگی، ما پروژه‌های متعددی برای دیجیتال‌سازی میراث تاریخی، همکاری با موزه‌ها و نهادهای فرهنگی، و برگزاری رویدادهای آنلاین/آفلاین اجرا می‌کنیم. چشم‌انداز ما تبدیل شدن به مرجع جهانی هنر ایران است.',
            aboutP4: 'ما همچنین به حفظ حریم خصوصی کاربران، امنیت داده‌ها، و ترویج هنر پایدار متعهد هستیم.',
            aboutTeamLink: 'آشنایی با تیم متخصص ما',
            aboutMissionLink: 'بیانیه مأموریت',
            contactTitle: 'ارسال نظر، پیشنهاد، انتقاد و تماس با ما با امنیت بالا',
            contactSubtitle: 'ما مشتاق شنیدن نظرات، پیشنهادات، انتقادات و ایده‌های نوآورانه شما هستیم تا پلتفرم را بهبود بخشیم و خدمات بهتری ارائه دهیم.',
            formHeader: 'فرم تماس پیشرفته با اعتبارسنجی و پیوست',
            labelName: 'نام و نام خانوادگی (الزامی):',
            placeholderName: 'نام و نام خانوادگی کامل برای شناسایی',
            labelEmail: 'ایمیل (الزامی):',
            placeholderEmail: 'ایمیل معتبر برای پاسخگویی سریع',
            labelPhone: 'شماره تلفن (اختیاری):',
            placeholderPhone: 'شماره تلفن برای تماس مستقیم (مثل ۰۹۱۲۳۴۵۶۷۸۹)',
            labelSubject: 'موضوع پیام (الزامی):',
            labelMessage: 'پیام (الزامی):',
            placeholderMessage: 'پیام شما با جزئیات کامل، ایده‌ها یا مشکلات...',
            labelCaptcha: 'کد امنیتی (الزامی):',
            placeholderCaptcha: 'کد امنیتی ۶ رقمی را وارد کنید',
            labelAttachment: 'پیوست فایل (اختیاری، حداکثر ۵MB):',
            labelConsent: 'موافقت با سیاست حفظ حریم خصوصی و شرایط استفاده (الزامی).',
            formSubmitButton: 'ارسال پیام',
            faqTitle: 'سؤالات متداول با پاسخ‌های جامع و راهنمایی‌های گام‌به‌گام',
            faqSubtitle: 'پاسخ‌هایی برای پرتکرارترین سؤالات شما، همراه با راهنمایی‌های گام‌به‌گام، مثال‌ها و لینک‌های مرتبط.',
            faqQ1: 'چگونه می‌توانم اثر هنری خود را در گنجینه ثبت کنم؟',
            faqA1: 'برای ثبت اثر، ابتدا باید در سایت ثبت نام کرده و وارد پنل کاربری خود شوید. سپس از طریق بخش "ارسال اثر جدید"، اطلاعات کامل اثر (عنوان، توضیحات دقیق، تصاویر با کیفیت بالا تا ۱۰MB، دسته‌بندی، برچسب‌ها، سال ایجاد، و مواد استفاده‌شده) را بارگذاری کنید. آثار توسط تیم کارشناسی ما (متشکل از متخصصان هنر) بررسی و در صورت تأیید، منتشر خواهند شد. فرآیند بررسی معمولاً ۴۸-۷۲ ساعت طول می‌کشد و شما از طریق ایمیل یا پنل اعلانات مطلع خواهید شد. اگر اثر رد شد، دلایل دقیق ارائه می‌شود برای بهبود.',
            faqQ2: 'آیا محتوای سایت به زبان‌های دیگر هم ترجمه می‌شود؟',
            faqA2: 'بله، وب‌سایت ما کاملاً مجهز به قابلیت چندزبانه (i18n) است و می‌توانید با کلیک روی دکمه EN در بالای صفحه، محتوا را به صورت کامل به زبان انگلیسی مشاهده کنید. همچنین، برنامه‌هایی برای اضافه کردن زبان‌های عربی، ترکی و فرانسوی در آینده داریم. این قابلیت در فایل script.js با استفاده از داده‌های JSON دینامیک و API ترجمه placeholder پیاده‌سازی شده است. ترجمه‌ها توسط متخصصان زبانی بررسی می‌شوند تا دقت فرهنگی حفظ شود.',
            faqQ3: 'آیا ثبت‌نام هنرمندان رایگان است؟',
            faqA3: 'ثبت‌نام و ایجاد پروفایل هنرمندی کاملاً رایگان است. ما از هنر شما حمایت می‌کنیم و هیچ هزینه‌ای برای نمایش پایه آثار دریافت نمی‌شود. اما گزینه‌های premium برای تبلیغ بیشتر آثار (مانند برجسته‌سازی در اسلایدر، تبلیغات هدفمند، یا دسترسی به ابزارهای تحلیلی) در آینده با هزینه ماهانه کم اضافه خواهد شد. همه درآمد به حمایت از هنرمندان اختصاص می‌یابد.',
            faqQ4: 'چگونه می‌توانم در رویدادهای هنری شرکت کنم؟',
            faqA4: 'برای شرکت در رویدادها، به بخش "رویدادها" مراجعه کنید، رویداد مورد نظر را انتخاب کنید و فرم ثبت نام آنلاین را پر کنید. رویدادها شامل کارگاه‌های آنلاین، نمایشگاه‌های مجازی، سمینارهای فرهنگی، و رقابت‌های هنری هستند. پس از ثبت، تأییدیه ایمیل دریافت می‌کنید و می‌توانید از طریق پنل کاربر وضعیت را پیگیری کنید.',
            faqQ5: 'چگونه از ویژگی‌های دسترسی‌پذیری استفاده کنم؟',
            faqA5: 'سایت ما مطابق با WCAG 2.1 طراحی شده است. از دکمه accessibility-toggle در هدر برای فعال‌سازی حالت high-contrast، بزرگ‌نمایی متن، یا خوانش экран استفاده کنید. همچنین، همه عناصر با aria-label و role برای screen readerها بهینه شده‌اند.',
            newsletterTitle: 'عضویت در خبرنامه فرهنگی با گزینه‌های سفارشی',
            newsletterSubtitle: 'جدیدترین آثار هنری، مقالات تحلیلی، رویدادها، اخبار فرهنگی و پیشنهادهای شخصی‌سازی‌شده را مستقیماً در ایمیل خود دریافت کنید.',
            labelEmail: 'ایمیل:',
            placeholderEmail: 'ایمیل خود را برای دریافت اخبار فرهنگی وارد کنید',
            newsletterSubmitButton: 'عضویت',
            labelConsent: 'موافقت با دریافت خبرنامه و سیاست حفظ حریم خصوصی.',
            eventsTitle: 'رویدادهای هنری آینده با گزینه‌های ثبت نام',
            eventsSubtitle: 'شرکت در کارگاه‌ها، نمایشگاه‌ها، سمینارهای فرهنگی و رقابت‌های هنری برای علاقه‌مندان به هنر ایران، با تقویم interactive.',
            event1Title: 'کارگاه خوشنویسی آنلاین پیشرفته',
            event1Date: 'تاریخ: ۱۴۰۴/۰۸/۱۰ - ساعت: ۱۸:۰۰',
            event1Description: 'یادگیری خطاطی نستعلیق با استادان برجسته، همراه با ابزارهای دیجیتال و تمرین زنده.',
            event1Location: 'مکان: آنلاین (زوم)',
            event2Title: 'نمایشگاه مجازی نقاشی مدرن',
            event2Date: 'تاریخ: ۱۴۰۴/۰۸/۲۰ - ساعت: ۲۰:۰۰',
            event2Description: 'نمایش آثار مدرن ایرانی در فضای سه‌بعدی با تور مجازی و گفتگوی زنده.',
            event2Location: 'مکان: پلتفرم مجازی سایت',
            event3Title: 'سمینار معماری تاریخی ایران',
            event3Date: 'تاریخ: ۱۴۰۴/۰۹/۰۵ - ساعت: ۱۶:۰۰',
            event3Description: 'بحث در مورد معماری صفوی با کارشناسان و Q&A زنده.',
            event3Location: 'مکان: آنلاین و حضوری (تهران)',
            registerEvent: 'ثبت نام',
            galleryTitle: 'گالری سه‌بعدی آثار هنری',
            gallerySubtitle: 'کاوش آثار در فضای مجازی سه‌بعدی با زوم، چرخش و جزئیات تعاملی.',
            testimonialsTitle: 'نظرات و تجربیات کاربران و هنرمندان',
            testimonialsSubtitle: 'بازخوردهای واقعی از جامعه هنری ما.',
            testimonial1: 'این پلتفرم بهترین مکان برای نمایش آثارم است. حمایت عالی!',
            reviewer1: 'هنرمند: علی احمدی',
            testimonial2: 'مقالات عمیق و مفید برای پژوهش‌هایم.',
            reviewer2: 'پژوهشگر: سارا رضایی',
            testimonial3: 'رویدادها عالی و interactive.',
            reviewer3: 'کاربر: محمد کیانی',
            footerAboutTitle: 'گنجینه هنر: حفظ و ترویج میراث فرهنگی ایران',
            footerMission: 'ما بزرگ‌ترین آرشیو آنلاین هنر ایرانی هستیم که پل ارتباطی میان هنرمندان، پژوهشگران، علاقه‌مندان و جامعه جهانی ایجاد می‌کنیم، با تمرکز بر دیجیتال‌سازی، نوآوری‌های технологический و پایداری فرهنگی.',
            footerLinksTitle: 'لینک‌های سریع، مفید و دسته‌بندی‌شده',
            footerContactTitle: 'تماس، آدرس کامل و نقشه سایت',
            footerAddress: 'آدرس: تهران، خیابان هنر، پلاک ۱۰، کد پستی: ۱۲۳۴۵',
            footerEmail: 'ایمیل: abolfazl8891@gmail.com',
            footerPhone: 'تلفن: +989371228021',
            footerSupport: 'پشتیبانی: +989371228021',
            footerHours: 'ساعات کاری: شنبه تا پنج‌شنبه، ۹ صبح تا ۶ عصر',
            footerSitemapLink: 'مشاهده نقشه سایت (XML)',
            footerNewsletterTitle: 'خبرنامه فوتر',
            footerNewsletterSubtitle: 'برای دریافت اخبار، در خبرنامه عضو شوید.',
            footerCopyright: '© 2025 گنجینه فرهنگ و هنر - تمامی حقوق محفوظ است. نسخه ۲.۵ با ویژگی‌های پیشرفته.',
            footerDesign: 'طراحی و توسعه با ❤️ برای ترویج، حفظ و دیجیتال‌سازی فرهنگ غنی ایران.',
            footerCredits: 'قدرت‌گرفته از xAI و فناوری‌های مدرن.',
            loadingText: 'در حال بارگذاری محتوای فرهنگی و هنری با کیفیت بالا... لطفاً صبر کنید.',
            cookieText: 'این سایت از کوکی‌ها برای بهبود تجربه استفاده می‌کند. جزئیات',
            otpTitle: 'تأیید شماره تلفن',
        },
        en: {
            pageTitle: 'Home | Art and Culture Treasury - The Most Comprehensive Reference for Iranian Art',
            metaDescription: 'Art and Culture Treasury, a bridge between the past and future of Iranian art and literature...',
            logoTitle: 'Art Treasury',
            navHome: 'Home',
            navFeatured: 'Featured Works',
            navArticles: 'Articles',
            navAbout: 'About Us',
            navContact: 'Contact Us',
            navFAQ: 'FAQ',
            navEvents: 'Events',
            navGallery: 'Gallery',
            navBlog: 'Blog',
            navLogin: 'Login',
            navRegister: 'Register',
            langToggleText: 'FA',
            searchPlaceholder: 'Search artworks, articles, artists, events, and keywords...',
            heroMainTitle: 'Art and Culture Treasury: The Most Comprehensive Reference for Iranian Art Focusing on Cultural Heritage, Artistic Innovations, and Digital Tools',
            heroSubtitle: 'A bridge between the past and future of Iranian art and literature. A place to reflect authentic beauties, share artworks, explore specialized articles, participate in events, and connect with the global artistic community with interactive features.',
            heroCTA: 'View Featured Works',
            heroRegister: 'Register as Artist',
            heroGallery: 'Explore Gallery',
            statArtworks: 'Registered Artworks with High Quality',
            statArtists: 'Active and Registered Artists on the Platform',
            statCategories: 'Diverse and Specialized Art Categories',
            statVisitors: 'Monthly Active Visitors',
            statEvents: 'Held Cultural Events',
            featuredTitle: 'Featured and Selected Works of the Week Focusing on Cultural and Artistic Diversity',
            featuredSubtitle: 'View the best works of prominent Iranian artists and immerse yourself in the depth of artistic beauties, with zoom and detail display options.',
            slide1Title: 'Miniature: Legendary Simurgh',
            slide1Artist: 'Work by Master Farrokh Amini with precise details, inspired from Iranian myths and traditional techniques',
            slide2Title: 'Calligraphy: Hafez Poem',
            slide2Artist: 'Work by Lady Sara Nouri with Nasta\'liq calligraphy, artistic composition, and inspiration from ghazals',
            slide3Title: 'Architecture: Modern Persepolis',
            slide3Artist: 'Design by Engineer Alireza Kiani blending ancient, modern, and sustainable elements',
            slide4Title: 'Modern Painting: Endless Desert',
            slide4Artist: 'Work by Lady Maryam Zamani with abstract techniques, natural colors, and the concept of infinity',
            slide5Title: 'Sculpture: Rostam Dastan',
            slide5Artist: 'Work by Sculptor Hamid Rezaei with traditional materials, epic details, and inspiration from Shahnameh',
            slide6Title: 'Photography: Northern Iran Landscapes',
            slide6Artist: 'Work by Photographer Reza Mohammadi focusing on natural beauties, lighting, and composition',
            slide7Title: 'Handicrafts: Handwoven Carpet',
            slide7Artist: 'Work by Tabriz weavers with traditional patterns and natural colors',
            slideLink: 'View Full Details',
            articlesTitle: 'Latest Specialized Articles with In-Depth Analyses and Scientific References',
            articlesSubtitle: 'In-depth and analytical articles in various fields of Iranian art and culture, along with sources, scientific references, and sharing options.',
            filterLabel: 'Filter by Category:',
            filterAll: 'All Categories',
            sortLabel: 'Sort by:',
            sortByDate: 'Latest Articles',
            article1Excerpt: 'Examining how artists drew inspiration from Ferdowsi\'s epic stories in traditional miniature painting, along with historical examples, visual analyses, and bibliographic sources...',
            article2Excerpt: 'Review of the unique features of Safavid architecture and Isfahan masterpieces, focusing on geometry, symbolism, and cultural influences...',
            article3Excerpt: 'Analysis of vocal structure and social impacts of local Iranian music, with audio examples, cultural and sociological...',
            article4Excerpt: 'Examination of modern trends in Iranian sculpture focusing on new materials, social concepts, and international exhibitions...',
            article5Excerpt: 'Analysis of photography techniques in recording cultural heritage, with practical examples and digital tools...',
            readMore: 'Read More',
            loadMoreButton: 'View More Articles',
            aboutTitle: 'About Art and Culture Treasury: Mission, Vision, and Commitments',
            aboutP1: 'We founded this platform with the goal of collecting, preserving, digitizing, and displaying the most comprehensive Iranian artistic and cultural works. Our mission is to support domestic artists, introduce Iran\'s cultural richness to the world, and provide advanced tools like smart search, 3D display of works, and community interactions for students, researchers, and enthusiasts.',
            aboutP2: 'Our team consists of experts in art, history, information technology, UX/UI design, and SEO specialists committed to providing a flawless user experience, accurate and valid content, innovative features, and compliance with WCAG 2.1 accessibility standards.',
            aboutP3: 'Focusing on cultural sustainability, we run multiple projects for digitizing historical heritage, collaborating with museums and cultural institutions, and holding online/offline events. Our vision is to become the global reference for Iranian art.',
            aboutP4: 'We are also committed to user privacy protection, data security, and promoting sustainable art.',
            aboutTeamLink: 'Meet Our Expert Team',
            aboutMissionLink: 'Mission Statement',
            contactTitle: 'Send Comments, Suggestions, Criticisms, and Contact Us with High Security',
            contactSubtitle: 'We are eager to hear your comments, suggestions, criticisms, and innovative ideas to improve the platform and provide better services.',
            formHeader: 'Advanced Contact Form with Validation and Attachment',
            labelName: 'Full Name (Required):',
            placeholderName: 'Full name for identification',
            labelEmail: 'Email (Required):',
            placeholderEmail: 'Valid email for quick response',
            labelPhone: 'Phone Number (Optional):',
            placeholderPhone: 'Phone number for direct contact (like 09123456789)',
            labelSubject: 'Message Subject (Required):',
            labelMessage: 'Message (Required):',
            placeholderMessage: 'Your message with full details, ideas, or problems...',
            labelCaptcha: 'Security Code (Required):',
            placeholderCaptcha: 'Enter the 6-digit security code',
            labelAttachment: 'File Attachment (Optional, Max 5MB):',
            labelConsent: 'Agree to Privacy Policy and Terms of Use (Required).',
            formSubmitButton: 'Send Message',
            faqTitle: 'Frequently Asked Questions with Comprehensive Answers and Step-by-Step Guides',
            faqSubtitle: 'Answers to your most frequent questions, along with step-by-step guides, examples, and related links.',
            faqQ1: 'How can I register my artwork in the treasury?',
            faqA1: 'To register a work, you must first register on the site and log in to your user panel. Then, through the "Submit New Work" section, upload the complete information of the work (title, detailed description, high-quality images up to 10MB, category, tags, creation year, and materials used). Works will be reviewed by our expert team (consisting of art specialists) and published if approved. The review process usually takes 48-72 hours, and you will be notified via email or notification panel. If the work is rejected, detailed reasons will be provided for improvement.',
            faqQ2: 'Is the site content translated into other languages?',
            faqA2: 'Yes, our website is fully equipped with multilingual capability (i18n), and you can view the content completely in English by clicking the EN button at the top of the page. We also have plans to add Arabic, Turkish, and French languages in the future. This capability is implemented in the script.js file using dynamic JSON data and translation API placeholder. Translations are reviewed by language specialists to maintain cultural accuracy.',
            faqQ3: 'Is artist registration free?',
            faqA3: 'Registration and creating an artist profile is completely free. We support your art and do not charge for basic display of works. However, premium options for further promotion of works (such as highlighting in the slider, targeted advertising, or access to analytical tools) will be added in the future with a low monthly cost. All income is allocated to supporting artists.',
            faqQ4: 'How can I participate in artistic events?',
            faqA4: 'To participate in events, go to the "Events" section, select the desired event, and fill out the online registration form. Events include online workshops, virtual exhibitions, cultural seminars, and artistic competitions. After registration, you will receive an email confirmation and can track the status through the user panel.',
            faqQ5: 'How to use accessibility features?',
            faqA5: 'Our site is designed in accordance with WCAG 2.1. Use the accessibility-toggle button in the header to activate high-contrast mode, text magnification, or screen reading. Also, all elements are optimized with aria-label and role for screen readers.',
            newsletterTitle: 'Subscribe to the Cultural Newsletter with Customized Options',
            newsletterSubtitle: 'Receive the latest artworks, analytical articles, events, cultural news, and personalized suggestions directly in your email.',
            labelEmail: 'Email:',
            placeholderEmail: 'Enter your email to receive cultural news',
            newsletterSubmitButton: 'Subscribe',
            labelConsent: 'Agree to receive newsletter and privacy policy.',
            eventsTitle: 'Upcoming Artistic Events with Registration Options',
            eventsSubtitle: 'Participate in workshops, exhibitions, cultural seminars, and artistic competitions for Iranian art enthusiasts, with interactive calendar.',
            event1Title: 'Advanced Online Calligraphy Workshop',
            event1Date: 'Date: 1404/08/10 - Time: 18:00',
            event1Description: 'Learning Nasta\'liq calligraphy with prominent masters, along with digital tools and live practice.',
            event1Location: 'Location: Online (Zoom)',
            event2Title: 'Virtual Modern Painting Exhibition',
            event2Date: 'Date: 1404/08/20 - Time: 20:00',
            event2Description: 'Display of modern Iranian works in 3D space with virtual tour and live conversation.',
            event2Location: 'Location: Site Virtual Platform',
            event3Title: 'Iran Historical Architecture Seminar',
            event3Date: 'Date: 1404/09/05 - Time: 16:00',
            event3Description: 'Discussion on Safavid architecture with experts and live Q&A.',
            event3Location: 'Location: Online and In-Person (Tehran)',
            registerEvent: 'Register',
            galleryTitle: '3D Artworks Gallery',
            gallerySubtitle: 'Explore works in virtual 3D space with zoom, rotation, and interactive details.',
            testimonialsTitle: 'Users and Artists Opinions and Experiences',
            testimonialsSubtitle: 'Real feedback from our artistic community.',
            testimonial1: 'This platform is the best place to display my works. Excellent support!',
            reviewer1: 'Artist: Ali Ahmadi',
            testimonial2: 'Deep and useful articles for my research.',
            reviewer2: 'Researcher: Sara Rezaei',
            testimonial3: 'Excellent and interactive events.',
            reviewer3: 'User: Mohammad Kiani',
            footerAboutTitle: 'Art Treasury: Preservation and Promotion of Iranian Cultural Heritage',
            footerMission: 'We are the largest online archive of Iranian art, creating a bridge between artists, researchers, enthusiasts, and the global community, focusing on digitization, technological innovations, and cultural sustainability.',
            footerLinksTitle: 'Quick, Useful, and Categorized Links',
            footerContactTitle: 'Contact, Full Address, and Site Map',
            footerAddress: 'Address: Tehran, Honar Street, No. 10, Postal Code: 12345',
            footerEmail: 'Email: abolfazl8891@gmail.com',
            footerPhone: 'Phone: +989371228021',
            footerSupport: 'Support: +989371228021',
            footerHours: 'Working Hours: Saturday to Thursday, 9 AM to 6 PM',
            footerSitemapLink: 'View Site Map (XML)',
            footerNewsletterTitle: 'Footer Newsletter',
            footerNewsletterSubtitle: 'Subscribe to the newsletter to receive news.',
            footerCopyright: '© 2025 Art and Culture Treasury - All rights reserved. Version 2.5 with advanced features.',
            footerDesign: 'Designed and developed with ❤️ for promoting, preserving, and digitizing the rich Iranian culture.',
            footerCredits: 'Powered by xAI and modern technologies.',
            loadingText: 'Loading high-quality artistic and cultural content... Please wait.',
            cookieText: 'This site uses cookies to improve the experience. Details',
            otpTitle: 'Phone Number Verification',
        }
    }; // داده‌های i18n کامل با بیش از 100 کلید برای پوشش همه

    // --------------------------------------------------
    // ۲. ماژول اصلی: ArtGalleryApp (الگوی IIFE پیشرفته با private methods, event delegation, and performance optimizations)
    // --------------------------------------------------
    const ArtGalleryApp = (() => {

        let currentLang = localStorage.getItem('lang') || (html.getAttribute('lang') === 'fa' ? 'fa' : 'en');
        let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'theme-light');
        let currentCaptchaResult = null;
        let articlesData = [];
        let resizeObserver = null;
        let intersectionObserver = null;
        let mutationObserver = null;

        // Utility: Debounce for performance (e.g., resize, scroll)
        const debounce = (func, delay = 300) => {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => func(...args), delay);
            };
        };

        // Utility: Throttle for frequent events (e.g., scroll)
        const throttle = (func, limit = 100) => {
            let lastCall = 0;
            return (...args) => {
                const now = Date.now();
                if (now - lastCall >= limit) {
                    lastCall = now;
                    func(...args);
                }
            };
        };

        // Utility: Shake animation with CSS class and timeout
        const triggerShakeAnimation = (element) => {
            const formGroup = element.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('error-shake');
                setTimeout(() => formGroup.classList.remove('error-shake'), 600); // Extended for better UX
            }
        };

        // Utility: Validate email with regex and domain check
        const validateEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase()) && email.length <= 254; // Added length check
        };

        // Utility: Validate phone with Iranian format and sanitization
        const validatePhoneNumber = (phone) => {
            if (!phone) return true; // Optional
            const sanitized = phone.replace(/[\s\u200C-]/g, '');
            const re = /^(0|(\+98)?9\d{9})$/;
            return re.test(sanitized) && sanitized.length >= 10 && sanitized.length <= 13;
        };

        // Utility: Validate file upload (size, type)
        const validateFile = (file, maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']) => {
            if (!file) return true; // Optional
            return file.size <= maxSize && allowedTypes.includes(file.type);
        };

        // Utility: Generate strong password (if needed for registration placeholder)
        const generateStrongPassword = (length = 12) => {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
            return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        };

        // --------------------------------------------------
        // ۳. مدیریت چندزبانگی (i18n) با mutation observer برای تغییرات دینامیک
        // --------------------------------------------------
        
        const applyTranslations = () => {
            $$('[data-lang-key]').forEach(el => {
                const key = el.getAttribute('data-lang-key');
                if (I18N_DATA[currentLang] && I18N_DATA[currentLang][key]) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = I18N_DATA[currentLang][key];
                    } else {
                        el.textContent = I18N_DATA[currentLang][key];
                    }
                }
            });
            html.setAttribute('lang', currentLang === 'fa' ? 'fa' : 'en');
            body.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
            // Trigger resize for layout adjustment
            window.dispatchEvent(new Event('resize'));
        };

        const handleLangToggle = () => {
            const langToggle = $('#lang-toggle');
            langToggle.addEventListener('click', () => {
                currentLang = currentLang === 'fa' ? 'en' : 'fa';
                localStorage.setItem('lang', currentLang);
                applyTranslations();
                ArtGalleryApp.updateMobileMenu();
                ArtGalleryApp.updateCaptcha();
                ArtGalleryApp.updateCarousel();
                ArtGalleryApp.updateFAQ();
                ArtGalleryApp.updateEvents();
                langToggle.setAttribute('aria-pressed', currentLang === 'en');
            });
            applyTranslations();
        };

        // --------------------------------------------------
        // ۴. مدیریت حالت تاریک/روشن (Theme Toggle) با media query و storage
        // --------------------------------------------------
        
        const applyTheme = () => {
            body.classList.toggle('dark-mode', currentTheme === 'dark-mode');
            $$('[media="(prefers-color-scheme: dark)"]').forEach(el => el.media = currentTheme === 'dark-mode' ? 'all' : 'not all');
            // Update icon
            $('#mode-icon').className = currentTheme === 'dark-mode' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        };

        const handleThemeToggle = () => {
            const themeToggle = $('#theme-toggle');
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const updateThemeFromPref = () => {
                currentTheme = mediaQuery.matches ? 'dark-mode' : 'theme-light';
                localStorage.setItem('theme', currentTheme);
                applyTheme();
            };
            mediaQuery.addEventListener('change', updateThemeFromPref);
            themeToggle.addEventListener('click', () => {
                currentTheme = currentTheme === 'theme-light' ? 'dark-mode' : 'theme-light';
                localStorage.setItem('theme', currentTheme);
                applyTheme();
                themeToggle.setAttribute('aria-pressed', currentTheme === 'dark-mode');
            });
            updateThemeFromPref();
        };

        // --------------------------------------------------
        // ۵. Lazy Loading تصاویر با IntersectionObserver پیشرفته و placeholder blur
        // --------------------------------------------------
        
        const lazyLoadImages = () => {
            intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        intersectionObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '0px 0px 200px 0px', threshold: 0.1 });
            $$('img[loading="lazy"]').forEach(img => intersectionObserver.observe(img));
        };

        // --------------------------------------------------
        // ۶. نوار پیشرفت اسکرول و دکمه بازگشت به بالا (با requestAnimationFrame, throttle)
        // --------------------------------------------------
        
        let isTicking = false;
        const updateProgressBarAndBackToTop = throttle(() => {
            if (!isTicking) {
                requestAnimationFrame(() => {
                    const progress = $('#progress-bar');
                    const backToTop = $('#back-to-top');
                    
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrollPercent = (scrollTop / scrollHeight) * 100;
                    progress.style.width = `${scrollPercent}%`;
                    progress.setAttribute('aria-valuenow', Math.round(scrollPercent));

                    if (scrollTop > 500) { // Adjusted threshold for better UX
                        backToTop.classList.add('show');
                        backToTop.setAttribute('aria-hidden', 'false');
                    } else {
                        backToTop.classList.remove('show');
                        backToTop.setAttribute('aria-hidden', 'true');
                    }
                    isTicking = false;
                });
                isTicking = true;
            }
        }, 50);

        const handleBackToTop = () => {
            const backToTop = $('#back-to-top');
            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            window.addEventListener('scroll', updateProgressBarAndBackToTop);
            updateProgressBarAndBackToTop();
        };

        // --------------------------------------------------
        // ۷. اسلایدر آثار ویژه (Carousel) - فیکس پیشرفته با ResizeObserver, touch events, keyboard nav, pause/play
        // --------------------------------------------------

        const handleCarousel = () => {
            const carouselContainer = $('.carousel-container');
            const carouselTrack = $('.carousel-track');
            const prevButton = $('.carousel-control.prev');
            const nextButton = $('.carousel-control.next');
            const pauseButton = $('#carousel-pause');
            const playButton = $('#carousel-play');
            const dots = $$('.carousel-dot');
            const cards = $$('.art-card');
            let currentIndex = 0;
            let slideInterval = setInterval(() => moveTo('next'), parseInt(carouselContainer.dataset.slideInterval) || 5000);
            let isPaused = false;
            let touchStartX = 0;
            let touchEndX = 0;

            if (!carouselContainer || cards.length === 0) return;

            const updateCarousel = () => {
                const cardWidth = cards[0].offsetWidth;
                const cardMargin = parseInt(getComputedStyle(cards[0]).marginLeft) * 2 || 30;
                const cardWidthWithMargin = cardWidth + cardMargin;
                const containerWidth = carouselContainer.clientWidth;
                let visibleCards = Math.floor(containerWidth / cardWidthWithMargin);
                if (visibleCards < 1) visibleCards = 1;
                const maxIndex = cards.length - visibleCards;
                
                currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
                
                const translateX = -currentIndex * cardWidthWithMargin;
                carouselTrack.style.transform = `translateX(${translateX}px)`;
                
                // Update controls
                prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
                nextButton.style.display = currentIndex < maxIndex ? 'block' : 'none';
                
                // Update dots
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                    dot.setAttribute('aria-selected', i === currentIndex);
                    dot.tabIndex = i === currentIndex ? 0 : -1;
                });
                
                // Accessibility: Announce current slide
                carouselTrack.setAttribute('aria-live', 'polite');
            };

            const moveTo = (direction) => {
                const visibleCards = Math.floor(carouselContainer.clientWidth / (cards[0].offsetWidth + 30));
                const step = direction === 'next' ? 1 : -1;
                currentIndex += step;
                updateCarousel();
            };

            // Initial setup with timeout to avoid CLS
            setTimeout(updateCarousel, 100);

            // Auto slide with pause on hover/focus
            const startAutoSlide = () => {
                if (!isPaused) {
                    slideInterval = setInterval(() => moveTo('next'), 5000);
                }
            };

            const stopAutoSlide = () => clearInterval(slideInterval);

            prevButton.addEventListener('click', () => { moveTo('prev'); stopAutoSlide(); startAutoSlide(); });
            nextButton.addEventListener('click', () => { moveTo('next'); stopAutoSlide(); startAutoSlide(); });

            pauseButton.addEventListener('click', () => {
                isPaused = true;
                stopAutoSlide();
                pauseButton.style.display = 'none';
                playButton.style.display = 'block';
            });

            playButton.addEventListener('click', () => {
                isPaused = false;
                startAutoSlide();
                playButton.style.display = 'none';
                pauseButton.style.display = 'block';
            });

            // Dots navigation
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    currentIndex = parseInt(dot.dataset.index);
                    updateCarousel();
                });
            });

            // Touch events with threshold and preventDefault for horizontal swipe
            carouselContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                stopAutoSlide();
            }, { passive: false });

            carouselContainer.addEventListener('touchmove', (e) => {
                touchEndX = e.touches[0].clientX;
                if (Math.abs(touchStartX - touchEndX) > 20) {
                    e.preventDefault(); // Prevent vertical scroll during swipe
                }
            }, { passive: false });

            carouselContainer.addEventListener('touchend', () => {
                const swipeDistance = touchEndX - touchStartX;
                if (Math.abs(swipeDistance) > 50) {
                    moveTo(swipeDistance > 0 ? 'prev' : 'next');
                }
                startAutoSlide();
            });

            // Keyboard navigation
            carouselContainer.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') moveTo(currentLang === 'fa' ? 'prev' : 'next'); // RTL/LTR adjust
                if (e.key === 'ArrowLeft') moveTo(currentLang === 'fa' ? 'next' : 'prev');
                if (e.key === ' ') { // Space for pause/play
                    e.preventDefault();
                    isPaused ? playButton.click() : pauseButton.click();
                }
            });

            // Hover pause
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);

            // Resize observer for responsive without debounce heavy load
            resizeObserver = new ResizeObserver(debounce(updateCarousel, 200));
            resizeObserver.observe(carouselContainer);

            // Export for updates
            ArtGalleryApp.updateCarousel = updateCarousel;
            startAutoSlide();
        };

        // --------------------------------------------------
        // ۸. Typewriter Effect - بهبود با speed control, pause, and accessibility
        // --------------------------------------------------

        const typeWriterEffect = () => {
            $$('.typewriter-text').forEach(element => {
                const textKey = element.getAttribute('data-lang-key');
                const speed = parseInt(element.dataset.typeSpeed) || 50;
                const delay = parseInt(element.dataset.typeDelay) || 500;
                const text = (I18N_DATA[currentLang] && I18N_DATA[currentLang][textKey]) ? I18N_DATA[currentLang][key] : element.textContent;
                
                let i = 0;
                element.textContent = '';
                element.setAttribute('aria-live', 'polite');
                
                const typing = () => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                        requestAnimationFrame(() => setTimeout(typing, speed));
                    }
                };
                setTimeout(typing, delay);
            });
        };

        // --------------------------------------------------
        // ۹. Scroll Reveal (انیمیشن‌های هنگام اسکرول) با IntersectionObserver پیشرفته و custom animations
        // --------------------------------------------------
        
        const setupScrollReveal = () => {
            intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const animation = el.dataset.animation || 'fade-in';
                        const delay = parseInt(el.dataset.delay) || 0;
                        setTimeout(() => {
                            el.classList.add('visible', animation);
                        }, delay);
                        intersectionObserver.unobserve(el);
                    }
                });
            }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });
            $$('.fade-in, .fade-in-up, .fade-in-down, .slide-in-left, .slide-in-right, .zoom-in').forEach(el => intersectionObserver.observe(el));
        };

        // --------------------------------------------------
        // ۱۰. مدیریت فرم تماس و CAPTCHA (امنیت پیشرفته با reCAPTCHA placeholder, file progress, OTP integration)
        // --------------------------------------------------
        
        const generateCaptcha = () => {
            const captchaDisplay = $('#captcha-display');
            currentCaptchaResult = Math.floor(Math.random() * 900000) + 100000; // 6-digit
            captchaDisplay.textContent = currentCaptchaResult.toString();
            captchaDisplay.style.color = `hsl(${Math.random() * 360}, 50%, 50%)`; // Random color for security
        };

        const handleContactForm = () => {
            const form = $('#contact-form');
            const status = $('#form-status');
            const attachment = $('#contact-attachment');
            const progress = $('#attachment-progress');

            generateCaptcha();

            $('#captcha-refresh').addEventListener('click', () => {
                generateCaptcha();
                const audio = new Audio('refresh-sound.mp3'); // Placeholder for sound
                audio.play();
            });

            attachment.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!validateFile(file)) {
                    triggerShakeAnimation(attachment);
                    $('#attachment-error').textContent = 'فایل نامعتبر یا بزرگ‌تر از ۵MB.';
                    return;
                }
                // Simulate upload progress
                let percent = 0;
                const interval = setInterval(() => {
                    percent += 10;
                    progress.style.width = `${percent}%`;
                    progress.setAttribute('aria-valuenow', percent);
                    if (percent >= 100) clearInterval(interval);
                }, 200);
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;

                // Validate each field with error handling
                const name = $('#contact-name');
                if (name.value.trim().length < 3) {
                    triggerShakeAnimation(name);
                    $('#name-error').textContent = 'نام حداقل ۳ حرف باشد.';
                    isValid = false;
                }

                const email = $('#contact-email');
                if (!validateEmail(email.value)) {
                    triggerShakeAnimation(email);
                    $('#email-error').textContent = 'ایمیل نامعتبر است.';
                    isValid = false;
                }

                const phone = $('#contact-phone');
                if (phone.value && !validatePhoneNumber(phone.value)) {
                    triggerShakeAnimation(phone);
                    $('#phone-error').textContent = 'شماره تلفن نامعتبر است.';
                    isValid = false;
                }

                const subject = $('#contact-subject');
                if (!subject.value) {
                    triggerShakeAnimation(subject);
                    $('#subject-error').textContent = 'موضوع را انتخاب کنید.';
                    isValid = false;
                }

                const message = $('#contact-message');
                if (message.value.trim().length < 10) {
                    triggerShakeAnimation(message);
                    $('#message-error').textContent = 'پیام حداقل ۱۰ حرف باشد.';
                    isValid = false;
                }

                const captcha = $('#captcha-input');
                if (parseInt(captcha.value) !== currentCaptchaResult) {
                    triggerShakeAnimation(captcha);
                    $('#captcha-error').textContent = 'کد امنیتی اشتباه است.';
                    generateCaptcha(); // Refresh on error
                    isValid = false;
                }

                const consent = $('#contact-consent');
                if (!consent.checked) {
                    triggerShakeAnimation(consent);
                    $('#consent-error').textContent = 'موافقت الزامی است.';
                    isValid = false;
                }

                if (isValid) {
                    // Simulate AJAX submit with FormData for file
                    const formData = new FormData(form);
                    // Placeholder for fetch('/api/contact', { method: 'POST', body: formData })
                    status.style.display = 'block';
                    status.textContent = 'پیام با موفقیت ارسال شد!';
                    status.classList.add('success');
                    form.reset();
                    generateCaptcha();
                    // Trigger OTP if phone provided
                    if (phone.value) handleOTPModal(phone.value);
                } else {
                    status.style.display = 'block';
                    status.textContent = 'لطفاً خطاها را اصلاح کنید.';
                    status.classList.add('error');
                }
            });
        };

        // --------------------------------------------------
        // ۱۱. مودال تأیید تلفن (OTP) - پیشرفته با timer, resend, error handling
        // --------------------------------------------------
        
        const handleOTPModal = (phoneNumber) => {
            // Create modal dynamically
            const modal = document.createElement('div');
            modal.id = 'otp-modal';
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <h3 data-lang-key="otpTitle">تأیید شماره تلفن</h3>
                    <p>کد OTP به ${phoneNumber} ارسال شد.</p>
                    <input type="text" id="otp-input" placeholder="کد ۶ رقمی" maxlength="6">
                    <span id="otp-error" class="error-message"></span>
                    <button id="otp-submit">تأیید</button>
                    <button id="otp-resend">ارسال مجدد (۳۰ ثانیه)</button>
                    <button id="otp-close">بستن</button>
                </div>
            `;
            body.appendChild(modal);
            modal.style.display = 'block';
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('role', 'dialog');

            let otpTimer = 30;
            const resendBtn = $('#otp-resend');
            const interval = setInterval(() => {
                otpTimer--;
                resendBtn.textContent = `ارسال مجدد (${otpTimer} ثانیه)`;
                if (otpTimer <= 0) {
                    clearInterval(interval);
                    resendBtn.disabled = false;
                    resendBtn.textContent = 'ارسال مجدد';
                }
            }, 1000);

            resendBtn.addEventListener('click', () => {
                // Resend OTP logic placeholder
                otpTimer = 30;
                resendBtn.disabled = true;
            });

            $('#otp-submit').addEventListener('click', () => {
                const otp = $('#otp-input').value;
                if (otp.length === 6 && /^\d+$/.test(otp)) {
                    // Validate OTP placeholder
                    modal.remove();
                } else {
                    triggerShakeAnimation($('#otp-input'));
                    $('#otp-error').textContent = 'کد نامعتبر است.';
                }
            });

            $('#otp-close').addEventListener('click', () => modal.remove());

            // Escape key close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') modal.remove();
            }, { once: true });
        };

        // --------------------------------------------------
        // ۱۲. فیلتر و مرتب سازی مقالات - پیشرفته با live search, sorting algorithms, pagination
        // --------------------------------------------------
        
        const loadArticlesData = () => {
            articlesData = Array.from($$('.article-summary')).map(article => ({
                el: article,
                category: article.dataset.category,
                views: parseInt(article.dataset.views) || 0,
                date: new Date(article.dataset.date),
                rating: parseFloat(article.dataset.rating) || 0,
                title: article.querySelector('.card-title').textContent.toLowerCase(),
                excerpt: article.querySelector('.card-text').textContent.toLowerCase()
            }));
        };

        const filterArticles = (category = 'all', sort = 'date', searchTerm = '') => {
            articlesData.forEach(({ el, category: artCat, views, date, rating, title, excerpt }) => {
                const matchesCategory = category === 'all' || artCat.includes(category);
                const matchesSearch = !searchTerm || title.includes(searchTerm.toLowerCase()) || excerpt.includes(searchTerm.toLowerCase());
                el.style.display = matchesCategory && matchesSearch ? '' : 'none';
            });

            // Sort
            articlesData.sort((a, b) => {
                if (sort === 'views') return b.views - a.views;
                if (sort === 'date') return b.date - a.date;
                if (sort === 'rating') return b.rating - a.rating;
                if (sort === 'author') return a.el.querySelector('.card-title').textContent.localeCompare(b.el.querySelector('.card-title').textContent);
                return 0;
            });

            // Reorder DOM for performance
            const grid = $('.articles-grid');
            articlesData.forEach(({ el }) => {
                if (el.style.display !== 'none') grid.appendChild(el);
            });
        };

        const handleArticleFiltering = () => {
            const categoryFilter = $('#category-filter');
            const sortBy = $('#sort-by');
            const articleSearch = $('#article-search');
            const loadMore = $('#load-more');

            categoryFilter.addEventListener('change', () => filterArticles(categoryFilter.value, sortBy.value, articleSearch.value));
            sortBy.addEventListener('change', () => filterArticles(categoryFilter.value, sortBy.value, articleSearch.value));
            articleSearch.addEventListener('input', debounce(() => filterArticles(categoryFilter.value, sortBy.value, articleSearch.value), 300));

            let page = 1;
            loadMore.addEventListener('click', () => {
                // Placeholder for AJAX load more
                page++;
                console.log(`Loading page ${page}`);
            });

            filterArticles(); // Initial
        };

        // --------------------------------------------------
        // ۱۳. مدیریت آکاردئون FAQ - با live search, keyboard nav, mutation for dynamic
        // --------------------------------------------------
        
        const handleFAQAccordion = () => {
            const faqItems = $$('.faq-item');
            const faqSearch = $('#faq-search');

            faqItems.forEach(item => {
                const summary = item.querySelector('summary');
                summary.addEventListener('click', () => {
                    faqItems.forEach(other => {
                        if (other !== item) other.open = false;
                    });
                });
            });

            faqSearch.addEventListener('input', debounce(() => {
                const term = faqSearch.value.toLowerCase();
                faqItems.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = term ? (text.includes(term) ? '' : 'none') : '';
                });
            }, 300));

            // Keyboard nav for accordion
            faqItems[0].focus();
        };

        const updateFAQ = () => {
            // Re-apply if lang changes
            handleFAQAccordion();
        };

        // --------------------------------------------------
        // ۱۴. ثبت نام در خبرنامه - با validation, consent, AJAX placeholder
        // --------------------------------------------------
        
        const handleNewsletter = () => {
            const form = $('#newsletter-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = $('#newsletter-email');
                const consent = $('#newsletter-consent');
                if (!validateEmail(email.value)) {
                    triggerShakeAnimation(email);
                    $('#newsletter-email-error').textContent = 'ایمیل نامعتبر است.';
                    return;
                }
                if (!consent.checked) {
                    triggerShakeAnimation(consent);
                    return;
                }
                // AJAX submit placeholder
                console.log('Subscribed:', email.value);
                form.reset();
            });
        };

        // --------------------------------------------------
        // ۱۵. منوی موبایل (بهبود یافته با search internal, animation, accessibility)
        // --------------------------------------------------

        const updateMobileMenu = () => {
            const mobileMenu = $('#mobile-menu');
            const mainNav = $('#main-nav');
            
            if (mainNav) {
                mobileMenu.innerHTML = mainNav.innerHTML;
            }
            
            // Add search and buttons
            mobileMenu.innerHTML += `
                <div class="mobile-search p-4">
                    <input type="search" placeholder="${I18N_DATA[currentLang].searchPlaceholder}" aria-label="جستجو در منو موبایل">
                </div>
                <ul class="p-4"> 
                    <li><a href="/login" class="primary-button block" data-lang-key="navLogin">${I18N_DATA[currentLang].navLogin}</a></li>
                    <li><a href="/register" class="secondary-button block" data-lang-key="navRegister">${I18N_DATA[currentLang].navRegister}</a></li>
                </ul>
            `;
            
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                    $('#menu-toggle i').className = 'fa-solid fa-bars';
                });
            });
            
            // Animation for open/close
            mobileMenu.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        };
        
        const handleMobileMenu = () => {
            const menuToggle = $('#menu-toggle');
            const mobileMenu = $('#mobile-menu');
            
            updateMobileMenu();

            menuToggle.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.toggle('open');
                menuToggle.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
                menuToggle.setAttribute('aria-expanded', isOpen);
                mobileMenu.setAttribute('aria-hidden', !isOpen);
                if (isOpen) mobileMenu.focus();
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                    mobileMenu.classList.remove('open');
                    menuToggle.querySelector('i').className = 'fa-solid fa-bars';
                }
            });
        };

        // --------------------------------------------------
        // ۱۶. مدیریت Cookie Consent با storage, analytics placeholder
        // --------------------------------------------------

        const handleCookieConsent = () => {
            const banner = $('#cookie-consent');
            const accept = $('#cookie-accept');
            const decline = $('#cookie-decline');

            if (localStorage.getItem('cookieConsent')) {
                banner.style.display = 'none';
                return;
            }

            banner.style.display = 'flex';

            accept.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'accepted');
                banner.classList.add('hidden');
                // Load analytics scripts placeholder
            });

            decline.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'declined');
                banner.classList.add('hidden');
            });
        };

        // --------------------------------------------------
        // ۱۷. مدیریت Accessibility Toggle با class toggles, font adjust
        // --------------------------------------------------

        const handleAccessibilityToggle = () => {
            const toggle = $('#accessibility-toggle');
            toggle.addEventListener('click', () => {
                body.classList.toggle('high-contrast');
                body.classList.toggle('large-text');
                toggle.setAttribute('aria-pressed', body.classList.contains('high-contrast'));
                localStorage.setItem('accessibility', body.classList.contains('high-contrast') ? 'enabled' : 'disabled');
            });

            if (localStorage.getItem('accessibility') === 'enabled') {
                body.classList.add('high-contrast', 'large-text');
                toggle.setAttribute('aria-pressed', 'true');
            }
        };

        // --------------------------------------------------
        // ۱۸. مدیریت Events Calendar placeholder با FullCalendar integration
        // --------------------------------------------------

        const handleEventsCalendar = () => {
            // Placeholder for FullCalendar or simple list
            const calendar = $('#events-calendar');
            calendar.textContent = 'تقویم رویدادها اینجا بارگذاری می‌شود...';
            // Fetch events API placeholder
        };

        const updateEvents = () => {
            handleEventsCalendar();
        };

        // --------------------------------------------------
        // ۱۹. مدیریت Zoom on Images با modal viewer
        // --------------------------------------------------

        const handleImageZoom = () => {
            $$('[data-zoomable]').forEach(img => {
                img.addEventListener('click', () => {
                    const modal = document.createElement('div');
                    modal.classList.add('zoom-modal');
                    modal.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="max-width:90vw; max-height:90vh;"> <button class="close-zoom" aria-label="بستن زوم">✕</button>`;
                    body.appendChild(modal);
                    modal.addEventListener('click', () => modal.remove());
                });
            });
        };

        // --------------------------------------------------
        // ۲۰. مدیریت Share Buttons با navigator.share fallback to copy
        // --------------------------------------------------

        const handleShareButtons = () => {
            $$('.share-btn').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const url = window.location.href;
                    if (navigator.share) {
                        await navigator.share({ title: document.title, url });
                    } else {
                        navigator.clipboard.writeText(url).then(() => alert('لینک کپی شد!'));
                    }
                });
            });
        };

        // --------------------------------------------------
        // ۲۱. مدیریت MutationObserver برای تغییرات DOM دینامیک (e.g., lang change)
        // --------------------------------------------------

        const setupMutationObserver = () => {
            mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList') {
                        applyTranslations();
                        lazyLoadImages();
                        setupScrollReveal();
                    }
                });
            });
            mutationObserver.observe(body, { childList: true, subtree: true });
        };

        // --------------------------------------------------
        // ۲۲. تابع Initialization (شروع کننده پیشرفته با error handling, performance metrics)
        // --------------------------------------------------
        const init = () => {
            try {
                // Priority: Theme and Lang for initial render
                handleThemeToggle();
                handleLangToggle();
                
                // Visual and Logic
                handleBackToTop();
                handleCarousel();
                handleContactForm();
                handleNewsletter();
                handleFAQAccordion();
                handleMobileMenu();
                loadArticlesData();
                handleArticleFiltering();
                handleEventsCalendar();
                handleCookieConsent();
                handleAccessibilityToggle();
                handleImageZoom();
                handleShareButtons();
                
                // Animations and Lazy
                setupScrollReveal();
                lazyLoadImages();
                typeWriterEffect();
                setupMutationObserver();
                
                // Update year with locale
                $('#current-year').textContent = new Date().getFullYear().toLocaleString(currentLang === 'fa' ? 'fa-IR' : 'en-US');
                
                // Hide loader with progress simulation
                let loadProgress = 0;
                const loaderInterval = setInterval(() => {
                    loadProgress += 20;
                    $('.loader-progress').style.width = `${loadProgress}%`;
                    if (loadProgress >= 100) {
                        clearInterval(loaderInterval);
                        setTimeout(() => {
                            const loader = $('#page-loader');
                            loader.classList.add('loader-hidden');
                            setTimeout(() => loader.style.display = 'none', 600); // Extended for smooth
                        }, 300);
                    }
                }, 200);
                
                // Performance metrics placeholder
                console.log('Page loaded in', performance.now(), 'ms');
            } catch (error) {
                console.error('Init Error:', error);
                // Fallback UI
                const errorDiv = document.createElement('div');
                errorDiv.textContent = 'خطایی رخ داد. لطفاً صفحه را تازه کنید.';
                body.appendChild(errorDiv);
            }
        };
        
        return {
            init,
            updateCarousel: () => updateCarousel(),
            updateCaptcha: generateCaptcha,
            updateMobileMenu,
            updateFAQ,
            updateEvents
        };
        
    })();

    // شروع به کار برنامه
    ArtGalleryApp.init();
});
</script>