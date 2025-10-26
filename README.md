# گنجینه فرهنگ و هنر - README.md (نسخه بسیار پیشرفته، جامع و بهینه‌شده)

![لوگو پروژه](https://abolfazlsoltan.github.io/my_art_site/images/logo.png)

## مقدمه و概述 پروژه

**گنجینه فرهنگ و هنر** یک پلتفرم وب پیشرفته و پویا است که به عنوان جامع‌ترین مرجع آنلاین برای هنر و فرهنگ ایران عمل می‌کند. این پروژه با تمرکز بر حفظ میراث فرهنگی، ترویج نوآوری‌های هنری، و فراهم کردن ابزارهای دیجیتال مدرن (مانند جستجوی هوشمند، نمایش سه‌بعدی آثار، و تعاملات جامعه هنری) طراحی شده است. سایت از فناوری‌های前端 مدرن مانند HTML5، CSS3، و JavaScript خالص استفاده می‌کند تا تجربه کاربری بی‌نقص، responsive، و دسترسی‌پذیر (مطابق با WCAG 2.1) ارائه دهد.

این README به عنوان راهنمای کامل پروژه عمل می‌کند و شامل جزئیات فنی، ساختار کد، راه‌اندازی، ویژگی‌های کلیدی، بهترین شیوه‌ها، و برنامه‌های آینده است. پروژه بر پایه اصول modular، performance-optimized، و security-focused ساخته شده و از الگوهای طراحی مانند IIFE برای JS، CSS variables برای تم‌ها، و semantic HTML برای سئو بهره می‌برد.

### اهداف اصلی پروژه
- **حفظ و دیجیتال‌سازی**: جمع‌آوری و نمایش آثار هنری ایران با ابزارهای نوین مانند زوم، چرخش سه‌بعدی، و AR/VR (placeholder برای ادغام آینده).
- **حمایت از هنرمندان**: ثبت نام رایگان، پنل کاربری پیشرفته، و گزینه‌های premium برای تبلیغ آثار.
- **آموزش و پژوهش**: مقالات تحلیلی با فیلتر، مرتب‌سازی، و اشتراک‌گذاری؛ رویدادهای فرهنگی با ثبت نام آنلاین.
- **دسترسی‌پذیری جهانی**: پشتیبانی چندزبانه (fa/en با برنامه برای ar/tr/fr)، تم dark/light، و ویژگی‌های WCAG مانند high-contrast و large-text.
- **سئو و PWA**: آماده برای نصب به عنوان اپ، با schema.org، manifest.json، و sitemap.xml برای ایندکس بهتر.

پروژه روی GitHub Pages میزبانی شده (https://abolfazlsoltan.github.io/my_art_site/) و برای توسعه محلی یا سرورهای دیگر قابل تنظیم است.

## وضعیت پروژه و نسخه
- **نسخه فعلی**: 2.5 (با فیکس‌های critical مانند CLS، horizontal scroll، و بهینه‌سازی بصری).
- **تاریخ آخرین بروزرسانی**: 2025-10-26.
- **لایسنس**: MIT License (برای استفاده آزاد با ذکر منبع).
- **وابستگی‌ها**: بدون library خارجی سنگین؛ فقط Font Awesome (CDN) و Google Fonts (برای Vazirmatn/Roboto).
- **محیط توسعه**: Node.js (اختیاری برای minify)، Browser DevTools برای تست.

## ویژگی‌های کلیدی (با جزئیات فنی)
این پروژه بیش از ۵۰ ویژگی پیشرفته دارد که در ادامه دسته‌بندی شده‌اند:

### ۱. **رابط کاربری و UX**
- **Responsive Design**: استفاده از media queries گسترده (breakpoints: 576px, 768px, 992px, 1200px) با clamp/minmax برای جلوگیری از overflow و اسکرول افقی.
- **انیمیشن‌ها**: Fade-in/up/down, slide-in-left/right, zoom-in با IntersectionObserver برای scroll reveal؛ typewriter effect با requestAnimationFrame برای smoothness.
- **تم‌ها**: Light/Dark mode با CSS variables و media prefers-color-scheme؛ toggle با localStorage برای حفظ حالت.
- **چندزبانگی (i18n)**: پشتیبانی fa/en با data-lang-key و JSON data؛ RTL/LTR adjust با dir attribute و resize trigger.

### ۲. **عناصر تعاملی**
- **کاروسل اسلایدر**: Infinite loop, auto-slide (۵۰۰۰ms), touch swipe با preventDefault, keyboard nav (Arrow keys با RTL adjust), pause/play buttons, dots navigation.
- **فرم تماس**: Validation سمت کلاینت (regex برای email/phone, file size/type), CAPTCHA دینامیک (۶ رقمی با refresh و random color), file upload progress bar, consent checkbox, shake animation برای errors.
- **OTP Modal**: Timer (۳۰s), resend, validation, escape close.
- **جستجو و فیلتر**: Live search در header/articles/FAQ با debounce (۳۰۰ms), category/sort filters, pagination placeholder.
- **خبرنامه**: Validation email/consent, AJAX placeholder.
- **رویدادها**: لیست با reminder buttons, calendar placeholder (برای FullCalendar).

### ۳. **عملکرد و فیکس باگ‌ها**
- **CLS Fix**: Preload fonts/scripts, fixed heights (e.g., header 75px), critical CSS inline, lazy load images با IntersectionObserver.
- **Horizontal Scroll Fix**: overflow-x: hidden جهانی, max-content در carousel-track, clamp widths, flex-shrink: 0 در cards.
- **بصری**: Parallax sections, hover/focus effects (scale, shadow), GPU acceleration با will-change: transform.
- **دسترسی‌پذیری**: Aria attributes کامل (labels, live, roles), keyboard nav, high-contrast/large-text modes, WCAG compliance.

### ۴. **سئو و PWA**
- **سئو**: Meta tags پیشرفته (og/twitter/schema.org), canonical/alternate, robots index/follow, sitemap.xml link.
- **PWA**: Manifest.json, theme-color (light/dark), icons, service worker placeholder.
- **کوکی Consent**: Banner با accept/decline, localStorage, analytics placeholder.

### ۵. **امنیت و بهترین شیوه‌ها**
- **امنیت**: CAPTCHA ضداسپم, file validation, no CSRF (برای backend placeholder), HTTPS recommend.
- **عملکرد**: Debounce/throttle برای events, requestAnimationFrame برای animations, minify recommend.

## ساختار فایل‌ها و دایرکتوری‌ها
پروژه با ساختار modular سازمان‌دهی شده برای نگهداری آسان:

```
my_art_site/
├── index.html          # صفحه اصلی با ساختار semantic و aria attributes
├── script.js           # منطق JS با IIFE, utilities (debounce/throttle), و handlers
├── style.css           # استایل‌ها با variables, responsive queries, و animations
├── images/             # تصاویر (logo.png, slides, articles, events)
│   ├── logo.png
│   ├── slide-1-placeholder.jpg (و غیره تا 7)
│   ├── article-1-placeholder.jpg (و غیره تا 5)
│   └── event-1-placeholder.jpg (و غیره تا 3)
├── icons/              # آیکون‌های PWA و favicon
│   ├── apple-touch-icon.png
│   ├── favicon-32x32.png
│   ├── favicon-16x16.png
│   ├── safari-pinned-tab.svg
│   └── mstile-144x144.png
├── manifest.json       # برای PWA
├── sitemap.xml         # برای سئو
├── privacy-policy.html # صفحه سیاست حفظ حریم خصوصی (placeholder)
├── terms-of-service.html # صفحه شرایط استفاده
├── accessibility.html  # صفحه دسترسی‌پذیری
├── team.html           # صفحه تیم
├── mission.html        # بیانیه مأموریت
└── README.md           # این فایل
```

- **فایل‌های اصلی**: index.html (ساختار), script.js (رفتار), style.css (ظاهر).
- **پوشه images**: همه placeholderها را با تصاویر واقعی جایگزین کنید.
- **پوشه icons**: از ابزار favicon generator بسازید.

## نصب و راه‌اندازی (Deployment)
1. **پیش‌نیازها**:
   - مرورگر مدرن (Chrome/Firefox/Edge).
   - Git برای clone (اختیاری).
   - Node.js اگر بخواهید minify کنید (با uglify-js/cssnano).

2. **کلون پروژه**:
   ```
   git clone https://github.com/abolfazlsoltan/my_art_site.git
   cd my_art_site
   ```

3. **راه‌اندازی محلی**:
   - فایل index.html را در مرورگر باز کنید (یا از live server استفاده کنید: `npx live-server`).
   - تست responsive با DevTools.

4. **Deployment روی GitHub Pages**:
   - Push به repo.
   - در Settings > Pages, branch main/root انتخاب کنید.
   - URL: https://abolfazlsoltan.github.io/my_art_site/.

5. **بهینه‌سازی (اختیاری)**:
   - Minify JS/CSS: `uglifyjs script.js -c -m > script.min.js`.
   - Compress images با tools مثل TinyPNG.
   - Add service worker برای offline PWA.

6. **تست**:
   - Lighthouse (در DevTools) برای عملکرد/سئو/دسترسی (>90 امتیاز هدف).
   - Cross-browser: Chrome, Firefox, Safari, Edge.
   - Devices: Mobile (no horizontal scroll), Tablet, Desktop.
   - RTL/LTR switch.

## راهنمایی استفاده و توسعه
- **تغییر زبان**: دکمه EN/FA در هدر؛ ترجمه‌ها در I18N_DATA JS.
- **افزودن آثار/مقالات**: در HTML اضافه کنید، JS به طور دینامیک مدیریت می‌کند.
- **فرم‌ها**: برای واقعی، backend (e.g., Node.js/Express) اضافه کنید با email sending (Nodemailer).
- **رویدادها**: برای calendar واقعی، FullCalendar integrate کنید.
- **سئو پیشرفته**: Google Analytics اضافه کنید (script tag در HTML).
- **امنیت**: برای production, HTTPS force, CSRF tokens در فرم‌ها.

### بهترین شیوه‌ها برای توسعه‌دهندگان
- **کدینگ**: ESLint/Prettier برای JS, Stylelint برای CSS.
- **نسخه‌گیری**: Git branches (main/dev/feature).
- **Error Handling**: Try/catch در init JS, console.error.
- **Performance**: Lazy load, debounce heavy events, GPU animations.

## تغییرات (Changelog)
- **v2.5 (2025-10-26)**: فیکس CLS با preload/critical CSS, horizontal scroll با clamp/overflow, بصری با parallax/high-contrast.
- **v2.0**: اضافه i18n کامل, OTP modal, share buttons.
- **v1.0**: پایه سایت با carousel/form.

## مشکلات شناخته‌شده و TODO
- Placeholder تصاویر: جایگزین با واقعی.
- Backend integration: برای فرم‌ها/رویدادها.
- AR/VR: placeholder برای آینده.
- GDPR: compliance کامل برای EU users.

## لایسنس و اعتبار
MIT License - آزاد برای استفاده/تغییر با ذکر منبع.

- توسعه‌دهنده: Abolfazl Soltani (abolfazl8891@gmail.com).
- الهام‌گرفته از: xAI tools, Bootstrap concepts (بدون dependency).
- فونت: Vazirmatn (Google Fonts).
- آیکون‌ها: Font Awesome.

اگر سؤال/پیشنهادی دارید، از بخش تماس استفاده کنید یا issue باز کنید. خوشحالیم از حمایت شما! ❤️