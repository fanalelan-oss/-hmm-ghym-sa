/* =========================================================
   شركة همم غيم — السكربت الرئيسي (Vanilla JS، بدون مكتبات)
   ---------------------------------------------------------
   1. الإعدادات (رقم واتساب، Google Analytics، استقبال النماذج)
   2. Google Analytics 4 وتتبع الأحداث
   3. روابط واتساب والاتصال
   4. الترويسة وزر واتساب العائم عند التمرير
   5. قائمة الجوال (Drawer)
   6. ظهور العناصر عند التمرير
   7. شريط شعارات الشركاء المتحرك
   8. فلترة معرض الأعمال وفيديوهات المشاريع
   9.التحقق من النماذج وإرسالها
   10. نافذة طلب عرض السعر (صفحة الخدمات)
   11. تعبئة نموذج التواصل من الرابط
   12. التنقل الفرعي في صفحة الخدمات
   ========================================================= */
(function () {
  'use strict';

  /* -------------------------------------------------------
     1. الإعدادات
     تأتي القيم من لوحة التحكم (window.SITE_CONFIG في ترويسة كل صفحة)،
     والقيم أدناه احتياطية فقط عند غيابها.
     ------------------------------------------------------- */
  const CONFIG = Object.assign({
    companyName: 'شركة همم غيم',
    phone: '+966546774905',
    // رقم واتساب بالصيغة الدولية بدون + أو 00 (مطلوب لروابط wa.me)
    whatsappNumber: '966546774905',
    whatsappGreeting: 'السلام عليكم، أرغب في الاستفسار عن خدمات شركة همم غيم.',
    // معرّف Google Analytics 4 (يبدأ بـ G-). يبقى التتبع معطلاً حتى تعيينه.
    gaMeasurementId: '',
    // رابط حفظ الطلبات في لوحة التحكم
    leadEndpoint: '',
    // whatsapp: يحفظ الطلب ويفتح واتساب برسالة جاهزة | server: يحفظ الطلب ويعرض رسالة تأكيد
    formMode: 'whatsapp',
    // اختياري: رابط خارجي لاستقبال الطلبات (مثل Formspree) بدل لوحة التحكم
    formEndpoint: ''
  }, window.SITE_CONFIG || {});

  const SERVICE_LABELS = CONFIG.serviceLabels || {
    signage: 'الدعاية والإعلان (أحرف بارزة، واجهات، لوحات)',
    stickers: 'الاستيكرات والتغليف (زجاج، جدران، سيارات، واجهات)',
    hoarding: 'تسوير المشاريع (أسوار مطبوعة لمواقع المشاريع)',
    exhibitions: 'تجهيز المعارض والفعاليات (أجنحة، منصات عرض، أكشاك)',
    shades: 'المظلات والسواتر',
    interiors: 'الديكور والتشطيبات الداخلية',
    contracting: 'المقاولات العامة',
    safety: 'الأمن والسلامة (كاميرات مراقبة، أنظمة إطفاء، أدوات السلامة)',
    other: 'خدمة أخرى'
  };

  const SERVICE_SHORT = CONFIG.serviceShort || {
    signage: 'الدعاية والإعلان',
    stickers: 'الاستيكرات والتغليف',
    hoarding: 'تسوير المشاريع',
    exhibitions: 'تجهيز المعارض',
    shades: 'المظلات والسواتر',
    interiors: 'الديكور والتشطيبات',
    contracting: 'المقاولات العامة',
    safety: 'الأمن والسلامة'
  };

  const REQUEST_LABELS = { quote: 'عرض سعر', consultation: 'استشارة' };
  const CUSTOMER_LABELS = { b2c: 'فرد (B2C)', b2b: 'شركة / جهة (B2B)' };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* -------------------------------------------------------
     2. Google Analytics 4 وتتبع الأحداث
     ------------------------------------------------------- */
  function initAnalytics() {
    const id = CONFIG.gaMeasurementId;
    if (!/^G-[A-Z0-9]{4,}$/.test(id) || id === 'G-XXXXXXXXXX') return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id);

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
  }

  // الأحداث المرسلة: whatsapp_click, phone_click, quote_open, portfolio_filter, generate_lead
  function track(eventName, params) {
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params || {});
  }


  /* -------------------------------------------------------
     3. روابط واتساب والاتصال
     أي رابط يحمل data-wa يتحول إلى رابط wa.me مع رسالة جاهزة.
     data-wa="نص الرسالة" (فارغ = رسالة الترحيب الافتراضية)
     ------------------------------------------------------- */
  function whatsappUrl(text) {
    return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(text || CONFIG.whatsappGreeting);
  }

  function initContactLinks() {
    $$('[data-wa]').forEach((link) => {
      link.href = whatsappUrl(link.dataset.wa);
      link.target = '_blank';
      link.rel = 'noopener';
      link.addEventListener('click', () => {
        track('whatsapp_click', { link_location: link.dataset.waLocation || 'page' });
      });
    });

    $$('a[href^="tel:"]').forEach((link) => {
      link.addEventListener('click', () => {
        track('phone_click', { link_location: link.dataset.telLocation || 'page' });
      });
    });

    $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  }


  /* -------------------------------------------------------
     4. الترويسة وزر واتساب العائم عند التمرير
     ------------------------------------------------------- */
  function initHeader() {
    const header = $('[data-header]');
    const waFloat = $('.wa-float');
    const update = () => {
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
      if (waFloat) waFloat.classList.toggle('is-visible', window.scrollY > 320);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }


  /* -------------------------------------------------------
     5. قائمة الجوال (Drawer)
     ------------------------------------------------------- */
  function initDrawer() {
    const drawer = $('[data-drawer]');
    const openButton = $('[data-drawer-open]');
    if (!drawer || !openButton) return;

    const panel = $('.drawer__panel', drawer);

    const focusables = () => $$('a[href], button:not([disabled])', panel);
    const isOpen = () => drawer.classList.contains('is-open');

    function open() {
      drawer.removeAttribute('inert');
      drawer.setAttribute('aria-hidden', 'false');
      drawer.classList.add('is-open');
      openButton.setAttribute('aria-expanded', 'true');
      document.body.classList.add('is-locked');
      requestAnimationFrame(() => {
        const first = focusables()[0];
        if (first) first.focus();
      });
    }

    function close(restoreFocus = true) {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.setAttribute('inert', '');
      openButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
      if (restoreFocus) openButton.focus();
    }

    openButton.addEventListener('click', open);
    $$('[data-drawer-close]', drawer).forEach((el) => el.addEventListener('click', () => close()));
    $$('a[href]', panel).forEach((link) => link.addEventListener('click', () => close(false)));

    document.addEventListener('keydown', (event) => {
      if (!isOpen()) return;
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      // إبقاء التركيز داخل القائمة
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    const desktop = window.matchMedia('(min-width: 1100px)');
    desktop.addEventListener('change', (event) => {
      if (event.matches && isOpen()) close(false);
    });
  }


  /* -------------------------------------------------------
     6. ظهور العناصر عند التمرير
     ------------------------------------------------------- */
  function initReveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    items.forEach((el) => observer.observe(el));
  }


  /* -------------------------------------------------------
     7. شريط شعارات الشركاء المتحرك
     ينسخ الشعارات مرة واحدة ليدور الشريط بلا انقطاع.
     ------------------------------------------------------- */
  function initMarquee() {
    if (prefersReducedMotion) return;

    $$('[data-marquee]').forEach((marquee) => {
      const trackEl = $('.logo-marquee__track', marquee);
      if (!trackEl) return;

      Array.from(trackEl.children).forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        $$('a, button', clone).forEach((el) => { el.tabIndex = -1; });
        trackEl.appendChild(clone);
      });

      marquee.classList.add('is-animated');
    });
  }


  /* -------------------------------------------------------
     8. فلترة معرض الأعمال
     الأزرار: data-filter="all|signage|stickers|hoarding|exhibitions|interiors|shades|contracting|safety"
     المشاريع: data-category="signage" ...
     يدعم الروابط المباشرة مثل portfolio.html#shades
     ------------------------------------------------------- */
  function initPortfolioFilter() {
    const bar = $('[data-filter-bar]');
    const grid = $('[data-portfolio-grid]');
    if (!bar || !grid) return;

    const buttons = $$('[data-filter]', bar);
    const items = $$('[data-category]', grid);
    const status = $('[data-filter-status]');
    const empty = $('[data-portfolio-empty]');
    const filters = buttons.map((btn) => btn.dataset.filter);

    // عدد المشاريع في كل قسم
    buttons.forEach((btn) => {
      const filter = btn.dataset.filter;
      const count = filter === 'all' ? items.length : items.filter((item) => item.dataset.category === filter).length;
      const badge = $('.filter-btn__count', btn);
      if (badge) badge.textContent = count;
    });

    function apply(filter, fromUser) {
      if (!filters.includes(filter)) filter = 'all';
      let shown = 0;

      buttons.forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter)));

      items.forEach((item) => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.hidden = !match;
        item.classList.remove('is-entering');
        if (!match) return;
        if (!prefersReducedMotion && fromUser) {
          item.style.animationDelay = (shown * 45) + 'ms';
          void item.offsetWidth; // إعادة تشغيل الحركة
          item.classList.add('is-entering');
        }
        shown += 1;
      });

      if (empty) empty.hidden = shown > 0;

      if (status) {
        const activeButton = buttons.find((btn) => btn.dataset.filter === filter);
        const label = activeButton ? activeButton.firstChild.textContent.trim() : '';
        status.textContent = 'القسم: ' + label + ' — عدد المشاريع المعروضة: ' + shown;
      }

      if (fromUser) {
        const url = filter === 'all' ? location.pathname + location.search : '#' + filter;
        history.replaceState(null, '', url);
        track('portfolio_filter', { category: filter });
      }
    }

    bar.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (button) apply(button.dataset.filter, true);
    });

    const fromHash = () => decodeURIComponent(location.hash.slice(1));
    apply(fromHash() || 'all', false);
    window.addEventListener('hashchange', () => apply(fromHash() || 'all', false));
  }

  // فيديوهات المشاريع: تعمل بلا صوت عند ظهورها وتتوقف عند خروجها من الشاشة (أو إخفائها بالفلترة).
  // مع تقليل الحركة أو المتصفحات القديمة تظهر أزرار التحكم بدلاً من التشغيل التلقائي.
  function initPortfolioVideos() {
    const videos = $$('video[data-autoplay]');
    if (!videos.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      videos.forEach((video) => { video.controls = true; });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.muted = true;
          video.play().catch(() => { video.controls = true; });
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 });

    videos.forEach((video) => observer.observe(video));
  }


  /* -------------------------------------------------------
     9. التحقق من النماذج وإرسالها
     ------------------------------------------------------- */
  function toLatinDigits(value) {
    return value
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
      .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06F0));
  }

  function normalizePhone(value) {
    return toLatinDigits(value).replace(/[\s\-().]/g, '');
  }

  // يقبل: جوال سعودي (05 / 5 / 966 / +966 / 00966)، هاتف ثابت 01، أو رقم دولي يبدأ بـ + أو 00
  function isValidPhone(value) {
    const phone = normalizePhone(value);
    return /^(?:\+966|00966|966|0)?5\d{8}$/.test(phone)
      || /^01\d{8}$/.test(phone)
      || /^(?:\+|00)[1-9]\d{7,14}$/.test(phone);
  }

  function getValue(form, name) {
    const control = form.elements[name];
    if (!control) return '';
    if (control instanceof RadioNodeList || control.type === 'radio') {
      const checked = form.querySelector('input[name="' + name + '"]:checked');
      return checked ? checked.value : '';
    }
    return control.value;
  }

  const validators = {
    name(value) {
      const v = value.trim();
      if (!v) return 'أدخل اسمك الكامل.';
      if (v.length < 3) return 'الاسم قصير جداً. اكتب 3 أحرف على الأقل.';
      if (/[0-9٠-٩۰-۹]/.test(v)) return 'اكتب الاسم بالحروف فقط، بدون أرقام.';
      return '';
    },
    phone(value) {
      if (!value.trim()) return 'أدخل رقم الجوال لنتواصل معك.';
      if (!isValidPhone(value)) return 'رقم الجوال غير صحيح. اكتبه بصيغة 05XXXXXXXX أو ‎+9665XXXXXXXX.';
      return '';
    },
    customer_type(value) {
      return value ? '' : 'اختر نوع العميل: فرد أو شركة.';
    },
    company(value, form) {
      if (getValue(form, 'customer_type') !== 'b2b') return '';
      return value.trim().length >= 2 ? '' : 'أدخل اسم الشركة أو الجهة.';
    },
    service(value) {
      return value ? '' : 'اختر الخدمة المطلوبة.';
    },
    details(value) {
      const v = value.trim();
      if (!v) return 'اكتب تفاصيل طلبك.';
      if (v.length < 15) return 'أضف تفاصيل أكثر (15 حرفاً على الأقل) ليكون عرض السعر أدق.';
      return '';
    }
  };

  function setFieldState(form, name, message) {
    const control = form.elements[name];
    if (!control) return;
    const inputs = control instanceof RadioNodeList ? Array.from(control) : [control];
    const wrapper = inputs[0].closest('[data-field]');
    const error = wrapper ? $('.field__error', wrapper) : null;

    if (wrapper) wrapper.classList.toggle('is-invalid', Boolean(message));
    inputs.forEach((input) => {
      if (message) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    });
    if (error) error.textContent = message;
  }

  function focusControl(form, name) {
    const control = form.elements[name];
    if (!control) return;
    const target = control instanceof RadioNodeList ? control[0] : control;
    target.focus();
  }

  function showStatus(form, type, text, link) {
    const box = $('[data-form-status]', form);
    if (!box) return;
    box.className = 'form-status form-status--' + type;
    box.textContent = '';

    const message = document.createElement('p');
    message.textContent = text;
    box.appendChild(message);

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.target = '_blank';
      anchor.rel = 'noopener';
      anchor.textContent = link.label;
      box.appendChild(anchor);
    }
  }

  function clearStatus(form) {
    const box = $('[data-form-status]', form);
    if (box) {
      box.textContent = '';
      box.className = 'form-status';
    }
  }

  function buildMessage(form) {
    const value = (name) => getValue(form, name).trim();
    const lines = [
      'طلب ' + (REQUEST_LABELS[value('request_type')] || 'خدمة') + ' — من موقع ' + CONFIG.companyName,
      '',
      'الاسم: ' + value('name'),
      'الجوال: ' + normalizePhone(value('phone')),
      'نوع العميل: ' + (CUSTOMER_LABELS[value('customer_type')] || '-')
    ];
    if (value('customer_type') === 'b2b' && value('company')) lines.push('الشركة / الجهة: ' + value('company'));
    lines.push('الخدمة: ' + (SERVICE_LABELS[value('service')] || '-'));
    if (value('city')) lines.push('المدينة / موقع المشروع: ' + value('city'));
    lines.push('', 'التفاصيل:', value('details'));
    return lines.join('\n');
  }

  function initForm(form) {
    const names = Object.keys(validators).filter((name) => form.elements[name]);
    const touched = new Set();
    const companyField = $('[data-show-when="b2b"]', form);
    const submitButton = $('[type="submit"]', form);
    const saveUrl = (CONFIG.leadEndpoint || '').trim();
    const external = (form.dataset.endpoint || CONFIG.formEndpoint || '').trim();
    // مع وضع server (أو رابط خارجي) يُرسل الطلب مباشرة، وإلا يُحفظ ويفتح واتساب
    const endpoint = external || (CONFIG.formMode === 'server' ? saveUrl : '');
    const waNote = $('[data-wa-note]', form);

    if (endpoint && waNote) waNote.hidden = true;

    const formData = () => {
      const data = new FormData(form);
      data.append('source', form.id);
      return data;
    };

    const validate = (name) => {
      const message = validators[name](getValue(form, name), form);
      setFieldState(form, name, message);
      return message;
    };

    function syncCustomerType() {
      if (!companyField) return;
      const isB2B = getValue(form, 'customer_type') === 'b2b';
      companyField.hidden = !isB2B;
      if (!isB2B) setFieldState(form, 'company', '');
    }

    form.addEventListener('change', (event) => {
      const name = event.target.name;
      if (name === 'customer_type') {
        syncCustomerType();
        touched.add(name);
      }
      if (validators[name] && (touched.has(name) || event.target.tagName === 'SELECT')) {
        touched.add(name);
        validate(name);
      }
    });

    form.addEventListener('focusout', (event) => {
      const name = event.target.name;
      if (!validators[name] || event.target.type === 'radio') return;
      // لا نُظهر خطأ لحقل لم يكتب فيه المستخدم شيئاً بعد
      if (!touched.has(name) && !event.target.value.trim()) return;
      touched.add(name);
      validate(name);
    });

    form.addEventListener('input', (event) => {
      const name = event.target.name;
      if (validators[name] && touched.has(name)) validate(name);
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      clearStatus(form);

      // حقل الحماية من الرسائل الآلية
      if (form.elements.website && form.elements.website.value) return;

      let firstInvalid = null;
      names.forEach((name) => {
        touched.add(name);
        if (validate(name) && !firstInvalid) firstInvalid = name;
      });

      if (firstInvalid) {
        focusControl(form, firstInvalid);
        showStatus(form, 'error', 'راجع الحقول المعلّمة باللون الأحمر ثم أعد الإرسال.');
        return;
      }

      const message = buildMessage(form);
      const waLink = whatsappUrl(message);
      const eventParams = {
        form_id: form.id,
        service: getValue(form, 'service'),
        customer_type: getValue(form, 'customer_type'),
        request_type: getValue(form, 'request_type')
      };

      // وضع واتساب: يُحفظ الطلب في لوحة التحكم بالخلفية، ويُفتح واتساب برسالة جاهزة
      if (!endpoint) {
        if (saveUrl) {
          fetch(saveUrl, { method: 'POST', body: formData(), keepalive: true, headers: { Accept: 'application/json' } }).catch(() => {});
        }
        window.open(waLink, '_blank', 'noopener');
        track('generate_lead', Object.assign({ method: 'whatsapp' }, eventParams));
        showStatus(form, 'success', 'جهّزنا رسالة طلبك في واتساب. اضغط «إرسال» في المحادثة ليصلنا الطلب.', {
          href: waLink,
          label: 'لم تُفتح المحادثة؟ افتح واتساب'
        });
        return;
      }

      // وضع server أو Formspree: إرسال مباشر
      submitButton.setAttribute('aria-busy', 'true');
      fetch(endpoint, {
        method: 'POST',
        body: formData(),
        headers: { Accept: 'application/json' }
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().catch(() => ({})).then((body) => {
              const error = new Error('HTTP ' + response.status);
              error.userMessage = body && body.message;
              throw error;
            });
          }
          track('generate_lead', Object.assign({ method: 'form' }, eventParams));
          form.reset();
          touched.clear();
          syncCustomerType();
          showStatus(form, 'success', 'وصلنا طلبك. سنتواصل معك على رقم جوالك في أقرب وقت.');
        })
        .catch((error) => {
          showStatus(form, 'error', error.userMessage || 'لم يُرسل الطلب بسبب مشكلة في الاتصال. أعد المحاولة، أو أرسله عبر واتساب.', {
            href: waLink,
            label: 'أرسل الطلب عبر واتساب'
          });
        })
        .finally(() => submitButton.removeAttribute('aria-busy'));
    });

    syncCustomerType();
  }


  /* -------------------------------------------------------
     10. نافذة طلب عرض السعر (صفحة الخدمات)
     الأزرار: data-quote="signage" و data-request="consultation" (اختياري)
     بدون JavaScript تعمل الأزرار كروابط لصفحة التواصل.
     ------------------------------------------------------- */
  function initQuoteDialog() {
    const dialog = $('[data-quote-dialog]');
    const triggers = $$('[data-quote]');
    if (!dialog || !triggers.length || typeof dialog.showModal !== 'function') return;

    const form = $('form', dialog);
    const title = $('[data-quote-title]', dialog);

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const service = trigger.dataset.quote;
        const request = trigger.dataset.request || 'quote';

        if (form.elements.service) {
          form.elements.service.value = SERVICE_LABELS[service] ? service : '';
          form.elements.service.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const radio = form.querySelector('input[name="request_type"][value="' + request + '"]');
        if (radio) radio.checked = true;

        title.textContent = (request === 'consultation' ? 'طلب استشارة' : 'طلب عرض سعر')
          + (SERVICE_SHORT[service] ? ' — ' + SERVICE_SHORT[service] : '');

        clearStatus(form);
        dialog.showModal();
        track('quote_open', { service: service, request_type: request });
      });
    });

    $$('[data-dialog-close]', dialog).forEach((button) => button.addEventListener('click', () => dialog.close()));

    // الإغلاق بالنقر خارج النافذة
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }


  /* -------------------------------------------------------
     11. تعبئة نموذج التواصل من الرابط
     مثال: contact.html?service=shades&request=consultation#request
     ------------------------------------------------------- */
  function initPrefill() {
    const form = $('#contact-form');
    if (!form) return;
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    const request = params.get('request');

    if (service && SERVICE_LABELS[service] && form.elements.service) form.elements.service.value = service;
    if (request && REQUEST_LABELS[request]) {
      const radio = form.querySelector('input[name="request_type"][value="' + request + '"]');
      if (radio) radio.checked = true;
    }
  }


  /* -------------------------------------------------------
     12. التنقل الفرعي في صفحة الخدمات
     ------------------------------------------------------- */
  function initSubnav() {
    const links = $$('[data-subnav] a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const sections = new Map();
    links.forEach((link) => {
      const section = document.getElementById(link.getAttribute('href').slice(1));
      if (section) sections.set(section, link);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.remove('is-active'));
        const active = sections.get(entry.target);
        if (active) active.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((_, section) => observer.observe(section));
  }


  /* ------------------------------------------------------- */
  initAnalytics();
  initContactLinks();
  initHeader();
  initDrawer();
  initReveal();
  initMarquee();
  initPortfolioFilter();
  initPortfolioVideos();
  initPrefill();
  $$('[data-request-form]').forEach(initForm);
  initQuoteDialog();
  initSubnav();
})();
