(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  const timelineData = [
    {
      ar: { label: 'قبل الولادة', type: 'special', desc: 'التقييم الأولي والتخطيط للعلاج.' },
      en: { label: 'Before Birth', type: 'special', desc: 'Initial assessment and treatment planning.' }
    },
    {
      ar: { label: 'الولادة إلى 3 أشهر', type: 'special', desc: 'متابعة التغذية والنمو وتجهيز خطة العلاج.' },
      en: { label: 'Birth to 3 Months', type: 'special', desc: 'Follow-up for feeding and growth, and treatment plan preparation.' }
    },
    {
      ar: { label: '3-6', title: 'عمر 3-6 أشهر', type: 'month', desc: 'عملية إصلاح الشفة الأرنبية.', year: 'إصلاح الشفة الأرنبية' },
      en: { label: '3-6', title: 'Age 3-6 Months', type: 'month', desc: 'Cleft lip repair surgery.', year: 'Cleft Lip Repair' }
    },
    {
      ar: { label: '9-12', title: 'عمر 9-12 شهرًا', type: 'month', desc: 'عملية إصلاح شق سقف الحلق.', year: 'إصلاح سقف الحلق' },
      en: { label: '9-12', title: 'Age 9-12 Months', type: 'month', desc: 'Cleft palate repair surgery.', year: 'Cleft Palate Repair' }
    },
    {
      ar: { label: '1-5', title: 'من سنة إلى 5 سنوات', type: 'year', desc: 'متابعة السمع والتخاطب ونمو الأسنان.' },
      en: { label: '1-5', title: 'From 1 to 5 Years', type: 'year', desc: 'Follow-up for hearing, speech, and dental growth.' }
    },
    {
      ar: { label: '6-12', title: 'من 6 إلى 12 سنة', type: 'year', desc: 'متابعة الأسنان والتقويم والترقيع العظمي عند الحاجة.' },
      en: { label: '6-12', title: 'From 6 to 12 Years', type: 'year', desc: 'Dental and orthodontic follow-up, and bone grafting when needed.' }
    },
    {
      ar: { label: '15-18', title: 'مرحلة المراهقة', type: 'year', desc: 'تقييم جراحات التجميل أو تصحيح الفك عند الحاجة.' },
      en: { label: '15-18', title: 'Adolescence', type: 'year', desc: 'Assessment for cosmetic or jaw correction surgeries when needed.' }
    }
  ];

  function renderTimeline(lang = 'ar') {
    const container = $('#monthlyTimeline');
    if (!container) return;
    container.innerHTML = '';

    timelineData.forEach((entry) => {
      const item = entry[lang] || entry.ar;
      const title = item.title || (item.type === 'month' ? (lang === 'en' ? `Month ${item.label}` : `شهر ${item.label}`) : item.label);
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-time">
            <div class="timeline-month">${title}</div>
            ${item.year ? `<div class="timeline-year">${item.year}</div>` : ''}
          </div>
          <div class="timeline-desc">${item.desc}</div>
        </div>`;
      container.appendChild(el);
    });
  }

  function setupTheme() {
    const checkbox = $('#themeSwitchCheckbox');
    if (!checkbox) return;

    const applyTheme = (enabled) => {
      document.body.classList.toggle('dark', enabled);
      localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
      checkbox.checked = enabled;
    };

    applyTheme(localStorage.getItem('darkMode') === 'enabled');
    checkbox.addEventListener('change', () => applyTheme(checkbox.checked));
  }

  function setupScrollTop() {
    const btn = $('#scrollTopBtn');
    if (!btn) return;

    const update = () => {
      btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function setupNavbar() {
    const nav = $('.navbar');
    const navToggle = $('#navToggle');
    const primaryNav = $('#primaryNav');
    if (!nav || !navToggle || !primaryNav) return;

    const setIconOpen = (open) => {
      navToggle.classList.toggle('is-open', open);
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-xmark', open);
      }
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'قائمة التنقل');
    };

    const setOpen = (open) => {
      nav.classList.toggle('nav-open', open);
      setIconOpen(open);
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!nav.classList.contains('nav-open'));
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth > 600) return;
      if (!nav.classList.contains('nav-open')) return;
      if (nav.contains(e.target)) return;
      setOpen(false);
    });

    $$('#primaryNav .nav-link').forEach((a) => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 600) setOpen(false);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) setOpen(false);
    });

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function setupFaq() {
    $$('.faq-question').forEach((btn) => {
      btn.setAttribute('tabindex', '0');
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (!item) return;
        const isOpen = item.classList.contains('active');
        $$('.faq-item.active').forEach((el) => el.classList.remove('active'));
        if (!isOpen) item.classList.add('active');
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  function setupLanguage() {
    const langToggle = $('#langToggle');
    const translations = window.siteTranslations || {};
    if (!langToggle || !translations.ar || !translations.en) return;

    const setText = (sel, text) => {
      const el = $(sel);
      if (el && typeof text === 'string') el.textContent = text;
    };

    const textNodeOriginal = new WeakMap();
    const attrOriginal = new WeakMap();

    const normalizeKey = (v) => (v || '')
      .replace(/\u00A0/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const applyPhraseMap = (lang) => {
      const map = translations.phraseMap || {};
      const normalizedMap = {};
      Object.keys(map).forEach((k) => {
        normalizedMap[normalizeKey(k)] = map[k];
      });
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        const parentTag = node.parentElement ? node.parentElement.tagName : '';
        if (!['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parentTag)) {
          if (!textNodeOriginal.has(node)) textNodeOriginal.set(node, node.nodeValue);
          const original = textNodeOriginal.get(node) || '';
          if (lang === 'ar') {
            node.nodeValue = original;
          } else {
            const trimmed = original.trim();
            const mapped = normalizedMap[normalizeKey(trimmed)];
            if (trimmed && mapped) node.nodeValue = original.replace(trimmed, mapped);
          }
        }
        node = walker.nextNode();
      }

      const attrTargets = document.querySelectorAll('[title],[alt],[placeholder]');
      attrTargets.forEach((el) => {
        ['title', 'alt', 'placeholder'].forEach((attr) => {
          if (!el.hasAttribute(attr)) return;
          if (!attrOriginal.has(el)) attrOriginal.set(el, {});
          const bag = attrOriginal.get(el);
          if (!(attr in bag)) bag[attr] = el.getAttribute(attr) || '';
          const original = bag[attr];
          if (lang === 'ar') {
            el.setAttribute(attr, original);
          } else {
            const mapped = normalizedMap[normalizeKey(original)];
            if (mapped) el.setAttribute(attr, mapped);
          }
        });
      });
    };

    const applyLang = (lang) => {
      const dict = translations[lang] || translations.ar;
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('siteLang', lang);

      langToggle.innerHTML = `<i class="fa-solid fa-language"></i> ${lang === 'ar' ? 'English' : 'العربية'}`;
      langToggle.setAttribute('aria-pressed', lang === 'ar' ? 'true' : 'false');

      const navLinks = $$('#primaryNav .nav-link');
      navLinks.forEach((a, i) => { if (dict.nav[i]) a.textContent = dict.nav[i]; });

      setText('.hero-tag', dict.heroTag);
      const heroH1 = $('.hero-content h1');
      if (heroH1) {
        const span = heroH1.querySelector('span');
        if (heroH1.childNodes[0]) heroH1.childNodes[0].nodeValue = `${dict.heroH1Line1} `;
        if (span) span.textContent = dict.heroH1Line2;
      }
      setText('.hero-content p', dict.heroP);
      setText('.hero-actions .btn.primary', dict.heroPrimary);
      setText('.hero-actions .btn.outline', dict.heroSecondary);

      setText('.initiative-tag', dict.initiativeTag);
      setText('#initiative h2', dict.initiativeH2);
      setText('#initiative .initiative-copy > p:nth-of-type(1)', dict.initiativeP1);
      setText('#initiative .initiative-copy > p:nth-of-type(2)', dict.initiativeP2);
      const initiativePoints = $$('#initiative .initiative-point span');
      if (initiativePoints[0]) initiativePoints[0].textContent = dict.initiativePoint1;
      if (initiativePoints[1]) initiativePoints[1].textContent = dict.initiativePoint2;
      if (initiativePoints[2]) initiativePoints[2].textContent = dict.initiativePoint3;
      setText('.initiative-actions .btn.primary', dict.initiativeBtn1);
      setText('.initiative-actions .btn.outline', dict.initiativeBtn2);
      setText('#initiative .initiative-badge', dict.initiativeBadge);
      setText('#initiative .initiative-highlight h3', dict.initiativeHighlightH3);
      setText('#initiative .initiative-highlight p', dict.initiativeHighlightP);

      setText('.wa-kicker', dict.modalKicker);
      setText('.wa-header h3', dict.modalH3);
      setText('.wa-header p', dict.modalP);
      setText('label[for="name"]', `${dict.label_name} *`);
      setText('label[for="cont"]', `${dict.label_cont} *`);
      setText('label[for="birthDate"]', `${dict.label_birth} *`);
      const inputName = $('#name');
      const inputCont = $('#cont');
      if (inputName) inputName.placeholder = dict.placeholder_name;
      if (inputCont) inputCont.placeholder = dict.placeholder_cont;
      const genderGroup = $('.wa-field .radio-group');
      if (genderGroup && genderGroup.previousElementSibling) {
        genderGroup.previousElementSibling.textContent = `${dict.label_gender} *`;
      }

      const radios = $$('.radio-group label');
      if (radios[0]) radios[0].lastChild.textContent = ` ${dict.radio_male}`;
      if (radios[1]) radios[1].lastChild.textContent = ` ${dict.radio_female}`;

      setText('.case-box p', `${dict.case_type} *`);
      const caseLabels = $$('.case-box label');
      if (caseLabels[0]) caseLabels[0].lastChild.textContent = ` ${dict.checkbox_lip}`;
      if (caseLabels[1]) caseLabels[1].lastChild.textContent = ` ${dict.checkbox_palate}`;

      setText('label[for="notes"]', `${dict.notes_label} *`);
      const notes = $('#notes');
      if (notes) notes.placeholder = dict.notes_placeholder;
      setText('.wa-submit', dict.wa_submit);
      setText('#social h2', dict.social_h2);

      renderTimeline(lang);
      applyPhraseMap(lang);
    };

    applyLang(localStorage.getItem('siteLang') || document.documentElement.lang || 'ar');
    langToggle.addEventListener('click', () => {
      const curr = document.documentElement.lang === 'ar' ? 'ar' : 'en';
      applyLang(curr === 'ar' ? 'en' : 'ar');
    });
  }

  function calculateAge(dateString) {
    if (!dateString) return '';
    const birth = new Date(dateString);
    const today = new Date();
    if (Number.isNaN(birth.getTime())) return '';

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += prevMonth;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return `${years} سنة - ${months} شهر - ${days} يوم`;
  }

  function setupModalAndWhatsApp() {
    const modal = $('#waModal');

    window.openForm = (event) => {
      if (event) event.preventDefault();
      if (!modal) return;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };

    window.closeForm = () => {
      if (!modal) return;
      modal.style.display = 'none';
      document.body.style.overflow = '';
    };

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) window.closeForm();
      });
    }

    window.sendWhatsApp = () => {
      const name = ($('#name')?.value || '').trim();
      const cont = ($('#cont')?.value || '').trim();
      const birthDate = ($('#birthDate')?.value || '').trim();
      const gender = $('input[name="gender"]:checked')?.value || '';
      const lip = $('#lip')?.checked;
      const palate = $('#palate')?.checked;
      const notes = ($('#notes')?.value || '').trim();

      if (!name || !cont || !birthDate || !gender || (!lip && !palate) || !notes) {
        alert('من فضلك أكمل كل البيانات');
        return;
      }

      const caseType = `${lip ? 'شفة أرنبية ' : ''}${palate ? 'شق سقف الحلق' : ''}`.trim();
      const age = calculateAge(birthDate);

      const msg = `اسم المريض: ${name}\nبلد الإقامة: ${cont}\nالعمر: ${age}\nنوع الحالة: ${caseType}\nالجنس: ${gender}\nالخدمة المطلوبة: ${notes}`;
      const phone = '201095715211';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    };
  }

  function setupCounters() {
    const counters = $$('.impact-section .counter');
    if (!counters.length) return;

    const animateCounter = (el) => {
      const target = Number(el.dataset.target || 0);
      if (!target) return;
      const duration = 1300;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value.toLocaleString('en-US');
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.35 });

    counters.forEach((c) => io.observe(c));
  }

  function setupStories() {
    const textEl = $('#storyText');
    const nameEl = $('#storyName');
    const infoEl = $('#storyInfo');
    const beforeImg = $('#beforeImg');
    const afterImg = $('#afterImg');
    const dots = $('#dots');
    const nextBtn = $('#next');
    const prevBtn = $('#prev');

    if (!textEl || !nameEl || !infoEl || !beforeImg || !afterImg || !dots) return;

    const stories = [
      { text: 'كانت رحلة يوسف صعبة في البداية، لكن بفضل الله ثم الفريق الطبي أصبح يبتسم بثقة.', name: 'يوسف أحمد', info: '4 سنوات - الغربية', before: 'img/before.jpg', after: 'img/after.jpg' },
      { text: 'ابنتي استعادت ثقتها بنفسها بعد العملية، والفرق كان واضحًا جدًا.', name: 'مريم خالد', info: '6 سنوات - الصعيد', before: 'img/before2.jpg', after: 'img/after2.jpg' },
      { text: 'الابتسامة رجعت لحياة طفلنا من جديد، شكرًا لكل من ساهم.', name: 'آدم محمد', info: '5 سنوات - الإسكندرية', before: 'img/before3.jpg', after: 'img/after3.jpg' }
    ];

    let current = 0;

    const render = (i) => {
      const s = stories[i];
      textEl.textContent = s.text;
      nameEl.textContent = s.name;
      infoEl.textContent = s.info;
      beforeImg.src = s.before;
      afterImg.src = s.after;
      $$('#dots span').forEach((d, idx) => d.classList.toggle('active', idx === i));
    };

    dots.innerHTML = '';
    stories.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => { current = i; render(current); });
      dots.appendChild(dot);
    });

    nextBtn?.addEventListener('click', () => { current = (current + 1) % stories.length; render(current); });
    prevBtn?.addEventListener('click', () => { current = (current - 1 + stories.length) % stories.length; render(current); });

    render(current);
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderTimeline(document.documentElement.lang || 'ar');
    setupTheme();
    setupScrollTop();
    setupNavbar();
    setupFaq();
    setupLanguage();
    setupModalAndWhatsApp();
    setupCounters();
    setupStories();
  });
})();
