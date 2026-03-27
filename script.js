/* ===============================
   بيانات المخطط الزمني
================================ */
const timelineData = [
    { label: "قبل الولادة", type: "special", desc: "التقييم الأولي والتخطيط للعلاج" },
    { label: "الولادة إلى 3 أشهر", type: "special", desc: "تقييم شامل للحالة بعد الولادة مباشرة، مع تدريب الأهل على طرق الرضاعة الخاصة، ومتابعة الوزن والتغذية، وأحيانًا استخدام جهاز تقويمي مبكر لتقريب جانبي الشفة أو اللثة قبل الجراحة." },
    { label: "3–6", title: "عمر 3–6 أشهر", type: "month", desc: "إجراء عملية إصلاح الشفة الأرنبية غالبًا عند عمر 3 أشهر تقريبًا، بهدف إغلاق الشفة وتحسين الشكل والوظيفة.", year: "عملية إصلاح الشفة الأرنبية" },
    { label: "9–12", title: "عمر 9–12 شهرًا", type: "month", desc: "إجراء عملية إصلاح شق سقف الحلق لتحسين النطق مستقبلًا، والمساعدة على البلع والتغذية، وتقليل التهابات الأذن.", year: "عملية إصلاح شق سقف الحلق" },
    { label: "1 – 5", title: "من سنة إلى 5 سنوات", type: "year", desc: "متابعة السمع، وقد يحتاج بعض الأطفال إلى أنابيب تهوية بالأذن بسبب تجمع السوائل، مع بدء جلسات التخاطب عند الحاجة ومتابعة نمو الأسنان والفك.", year: "متابعة السمع والتخاطب" },
    { label: "6 – 9", title: "عمر 6–9 سنوات", type: "year", desc: "ترقيع عظمي للثة عند وجود شق باللثة، باستخدام عظم يؤخذ غالبًا من الحوض للمساعدة على تثبيت الأسنان الدائمة ودعم الأنف والفك.", year: "ترقيع عظمي للثة" },
    { label: "8 – 12", title: "عمر 8–12 سنة", type: "year", desc: "تقويم أسنان مبكر لتصحيح الاصطفاف، مع تقييم الحاجة إلى جراحات تجميلية بسيطة لتحسين شكل الأنف أو الشفة.", year: "مرحلة التقويم والتحسين التجميلي" },
    { label: "15 – 18", title: "عمر 15–18 سنة", type: "year", desc: "في بعض الحالات قد يتم اللجوء إلى جراحة تصحيح الفك إذا وُجد خلل في نمو الفك العلوي، أو إجراء عمليات تجميل نهائية للشفة أو الأنف.", year: "مرحلة المراهقة" }
];

/* ===============================
   إنشاء المخطط الزمني
================================ */
const timelineContainer = document.getElementById("monthlyTimeline");

timelineData.forEach(item => {
    let titleText = item.title || (
        item.type === "month" ? `شهر ${item.label}` :
        item.type === "year" ? `${item.label} سنوات` :
        item.label
    );

    const timelineItem = document.createElement("div");
    timelineItem.className = "timeline-item";

    timelineItem.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
            <div class="timeline-time">
                <div class="timeline-month">${titleText}</div>
                ${item.year ? `<div class="timeline-year">${item.year}</div>` : ""}
            </div>
            <div class="timeline-desc">${item.desc}</div>
        </div>
    `;

    timelineContainer.appendChild(timelineItem);
});

/* ===============================
   دارك مود (آمن بدون Errors)
================================ */

document.addEventListener("DOMContentLoaded", function () {

    const darkToggle = document.getElementById("darkToggle");

    // لو الزرار مش موجود ما نكملش
    if (!darkToggle) return;

    // تحميل الحالة المحفوظة
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
        darkToggle.textContent = "☀️ الوضع النهاري";
    }

    // عند الضغط على الزرار
    darkToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        // حفظ الحالة
        localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");

        // تغيير نص الزرار
        darkToggle.textContent = isDark
            ? "☀️ الوضع النهاري"
            : "🌙 الوضع الليلي";
        // expose state for CSS
        darkToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    });

});

/* ===============================
   تأثير الظهور عند التمرير
================================ */
const timelineObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll(".timeline-item").forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(25px)";
    item.style.transition = "0.6s ease";
    timelineObserver.observe(item);
});

/* ===============================
   زر الرجوع لأعلى
================================ */
window.onscroll = function () {
    const btn = document.getElementById("scrollTopBtn");
    if (document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

document.getElementById("scrollTopBtn").onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// navbar shadow on scroll
document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    function updateNavShadow() {
        if (window.scrollY > 8) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }

    updateNavShadow();
    window.addEventListener('scroll', updateNavShadow, { passive: true });
});

/* ===============================
   القصص (Stories)
================================ */
                /* =====================
                   Generic scroll-triggered animations
                   Elements: add class `animate-on-scroll` and optional `style="--delay:.12s"`
                   ===================== */
                document.addEventListener('DOMContentLoaded', () => {
                    const animated = document.querySelectorAll('.animate-on-scroll');
                    if (!animated || animated.length === 0) return;

                    const io = new IntersectionObserver((entries, obs) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const el = entry.target;
                                // set delay from data-delay or CSS var
                                const delay = el.dataset && el.dataset.delay ? el.dataset.delay : null;
                                if (delay) el.style.setProperty('--delay', delay);
                                el.classList.add('in-view');
                                obs.unobserve(el);
                            }
                        });
                    }, { threshold: 0.12 });

                    animated.forEach((el, i) => {
                        // if no explicit delay, stagger slightly by index
                        if (!el.style.getPropertyValue('--delay')) {
                            const stagger = (i % 6) * 0.06; // up to ~0.36s
                            el.style.setProperty('--delay', `${stagger}s`);
                        }
                        io.observe(el);
                    });
                });
const stories = [
  {
    text: "كانت رحلة يوسف صعبة في البداية، لكن بفضل الله ثم الفريق الطبي أصبح يبتسم بثقة.",
    name: "يوسف أحمد",
    info: "4 سنوات – الغربيه",
    before: "img/before.jpg",
    after: "img/after.jpg"
  },
  {
    text: "ابنتي استعادت ثقتها بنفسها بعد العملية، والفرق كان لا يُصدق.",
    name: "مريم خالد",
    info: "6 سنوات – الصعيد",
    before: "img/before2.jpg",
    after: "img/after2.jpg"
  },
  {
    text: "الابتسامة رجعت لحياة طفلنا من جديد، شكرًا لكل من ساهم.",
    name: "آدم محمد",
    info: "5 سنوات – الإسكندرية",
    before: "img/before3.jpg",
    after: "img/after3.jpg"
  }
];

let current = 0;

const textEl = document.getElementById("storyText");
const nameEl = document.getElementById("storyName");
const infoEl = document.getElementById("storyInfo");
const beforeImg = document.getElementById("beforeImg");
const afterImg = document.getElementById("afterImg");
const dots = document.getElementById("dots");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

function renderStory(i) {
  if (!textEl || !nameEl || !infoEl || !beforeImg || !afterImg) return;
  const s = stories[i];
  textEl.textContent = s.text;
  nameEl.textContent = s.name;
  infoEl.textContent = s.info;
  beforeImg.src = s.before;
  afterImg.src = s.after;

  document.querySelectorAll(".dots span").forEach((d, index) => {
    d.classList.toggle("active", index === i);
  });
}


if (dots) {
  stories.forEach((_, i) => {
    const dot = document.createElement("span");

    dot.onclick = () => {
      current = i;
      renderStory(current);
    };

    dots.appendChild(dot);
  });
}
if (nextBtn) {
  nextBtn.onclick = () => {
    current = (current + 1) % stories.length;
    renderStory(current);
  };
}

if (prevBtn) {
  prevBtn.onclick = () => {
    current = (current - 1 + stories.length) % stories.length;
    renderStory(current);
  };
}

if (textEl && nameEl && infoEl && beforeImg && afterImg) {
  renderStory(current);
}

/* ===============================
   فتح وإغلاق الفورم
================================ */
function openForm(e) {
    if (e) e.preventDefault();
    document.getElementById("waModal").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeForm() {
    document.getElementById("waModal").style.display = "none";
    document.body.style.overflow = "auto";
}

window.addEventListener("click", function (event) {
    const modal = document.getElementById("waModal");
    if (event.target === modal) closeForm();
});

/* ===============================
   FAQ
================================ */
document.addEventListener("click", function (e) {

  const btn = e.target.closest(".faq-question");
  if (!btn) return;

  const item = btn.parentElement;
  const answer = item.querySelector(".faq-answer");

  // اقفل كل الباقي
  document.querySelectorAll(".faq-item").forEach((i) => {
    if (i !== item) {
      i.classList.remove("active");
      const question = i.querySelector(".faq-question");
      if (question) question.classList.remove("active");
      const ans = i.querySelector(".faq-answer");
      if (ans) ans.style.maxHeight = null;
    }
  });

  // toggle الحالي
  item.classList.toggle("active");
  btn.classList.toggle("active", item.classList.contains("active"));

  if (item.classList.contains("active")) {
    answer.style.maxHeight = answer.scrollHeight + "px";
  } else {
    answer.style.maxHeight = null;
  }

});
/* ===============================
   تاريخ الميلاد وحساب العمر
================================ */
const birthDate = document.getElementById("birthDate");
const todayDate = new Date().toISOString().split("T")[0];
if (birthDate) birthDate.max = todayDate;

function calculateExactAge(birth) {
    const b = new Date(birth);
    const t = new Date();

    let years = t.getFullYear() - b.getFullYear();
    let months = t.getMonth() - b.getMonth();
    let days = t.getDate() - b.getDate();

    if (days < 0) {
        months--;
        days += new Date(t.getFullYear(), t.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    return `${years} سنة – ${months} شهر – ${days} يوم`;
}

/* ===============================
   إرسال واتساب
================================ */
function sendWhatsApp() {
    const name = document.getElementById("name").value.trim();
    const cont = document.getElementById("cont").value.trim();
    const birth = document.getElementById("birthDate").value;
    const lip = document.getElementById("lip").checked;
    const palate = document.getElementById("palate").checked;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
    const notes = document.getElementById("notes").value.trim();

    if (!name || !cont || !birth || !gender || !notes || (!lip && !palate)) {
        alert("من فضلك أكمل كل البيانات");
        return;
    }

    const caseType = `${lip ? "شفة أرنبية " : ""}${palate ? "شق سقف الحلق" : ""}`.trim();
    const age = calculateExactAge(birth);

    const msg = `اسم المريض: ${name}
بلد الإقامة: ${cont}
العمر: ${age}
نوع الحالة: ${caseType}
الجنس: ${gender}
الخدمة المطلوبة: ${notes}`;

    window.open(`https://api.whatsapp.com/send?phone=201095715211&text=${encodeURIComponent(msg)}`, "_blank");
    closeForm();
}

/* ===============================
   العداد + الصوت
================================ */
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");
    const dingSound = new Audio("ding-80828.mp3");
    let soundEnabled = false;
    let soundPlayed = false;

    // تفعيل الصوت بعد أول تفاعل مع الصفحة
    function enableSound() {
        dingSound.play().then(() => {
            dingSound.pause();
            dingSound.currentTime = 0;
            soundEnabled = true;
        }).catch(() => {});
        window.removeEventListener("scroll", enableSound);
        window.removeEventListener("click", enableSound);
    }
    window.addEventListener("scroll", enableSound, { once: true });
    window.addEventListener("click", enableSound, { once: true });

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        if (isNaN(target)) return;

        let count = 0;
        const speed = Math.max(target / 200, 1);

        function update() {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target > 100 ? target + "+" : target + "%";
                if (soundEnabled && !soundPlayed) {
                    dingSound.currentTime = 0;
                    dingSound.play();
                    soundPlayed = true;
                }
            }
        }

        update();
    });
});

/* ===============================
   Dark Mode with localStorage
================================ */
document.addEventListener("DOMContentLoaded", () => {
    const darkToggle = document.getElementById("darkToggle");
    if (!darkToggle) return;

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
        darkToggle.textContent = "☀️ الوضع النهاري";
        darkToggle.setAttribute('aria-pressed', 'true');
    }

    darkToggle.onclick = () => {
        document.body.classList.toggle("dark");
        const enabled = document.body.classList.contains("dark");
        localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
        darkToggle.textContent = enabled ? "☀️ الوضع النهاري" : "🌙 الوضع الليلي";
        darkToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    };
});

/* ================================
   Initialize theme switch checkbox (Uiverse)
   Uses same localStorage key `darkMode` (value 'enabled'|'disabled')
================================ */
document.addEventListener('DOMContentLoaded', () => {
    const chk = document.querySelector('.theme-switch__checkbox');
    if (!chk) return;

    function applyFromStorage() {
        const saved = localStorage.getItem('darkMode');
        const isDark = saved === 'enabled' || (saved === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList.toggle('dark', !!isDark);
        document.body.classList.toggle('dark', !!isDark);
        chk.checked = !!isDark;
    }

    applyFromStorage();

    chk.addEventListener('change', () => {
        const on = chk.checked;
        document.documentElement.classList.toggle('dark', !!on);
        document.body.classList.toggle('dark', !!on);
        try { localStorage.setItem('darkMode', on ? 'enabled' : 'disabled'); } catch(e){}
        // try to sync old darkToggle if present
        const oldBtn = document.getElementById('darkToggle');
        if (oldBtn) oldBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const aboutTitle = Array.from(document.querySelectorAll(".site-footer .footer-col h4"))
        .find((heading) => heading.textContent.includes("عن الموقع"));

    const aboutText = aboutTitle?.parentElement?.querySelector("p");
    if (!aboutText) return;

    aboutText.innerHTML = `
        نحن هنا لنمنح أطفالكم ابتسامة كاملة! اكتشفوا برامجنا المجانية لعلاج الشفة الأرنبية وشق سقف الحلق،
        وسهّلوا رحلة علاج طفلكم مع دعمنا الكامل وإرشاداتنا المتخصصة.
        <br><br>
        المبادرة المجانية لعمليات الشفة الارنبية وشق سقف الحلق بالمجان.
        <br>
        أكبر فريق طبي في الشرق الأوسط.
    `;
});

/* ===============================
   تحسينات عامة
================================ */
document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeForm();
});

document.querySelectorAll(".faq-question").forEach(btn => {
    btn.setAttribute("tabindex", "0");
    btn.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            btn.click();
        }
    });
});

/* ===============================
   مزامنة لون النافبار مع السكشن أسفلها
================================ */
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.navbar');
    if (!nav || nav.classList.contains('nav-static')) return;

    let raf = null;
    let resizeTimer = null;

    function updateNavBg() {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            const rect = nav.getBoundingClientRect();
            const x = Math.max(2, Math.min(window.innerWidth - 2, rect.left + rect.width / 2));
            const y = Math.max(2, Math.min(window.innerHeight - 2, rect.bottom + 1));
            const el = document.elementFromPoint(x, y);
            if (!el) return;

            const section = el.closest('.section') || el.closest('section') || el.closest('.hero') || document.body;
            if (!section) return;

            // respect explicit opt-out
            if (section.dataset && section.dataset.navSync === 'false') return;

            // explicit background override
            if (section.dataset && section.dataset.navBg) {
                nav.style.backgroundImage = '';
                nav.style.backgroundColor = section.dataset.navBg;
                return;
            }

            const comp = getComputedStyle(section);
            const bgImage = comp.backgroundImage;
            let bgColor = comp.backgroundColor;

            if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
                bgColor = getComputedStyle(document.body).backgroundColor || '';
            }

            if (bgImage && bgImage !== 'none') {
                nav.style.backgroundImage = bgImage;
                nav.style.backgroundColor = '';
            } else {
                nav.style.backgroundImage = '';
                nav.style.backgroundColor = bgColor || '';
            }
        });
    }

    // initial
    updateNavBg();

    // scroll is throttled via RAF inside
    window.addEventListener('scroll', updateNavBg, { passive: true });

    // debounce resize
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateNavBg, 120);
    });

    // respond to dark-mode/class/dir/lang changes
    const obs = new MutationObserver(updateNavBg);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'dir', 'lang'] });

    // mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const primaryNav = document.getElementById('primaryNav');
    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const open = nav.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            if (open) primaryNav.querySelectorAll('a')[0]?.focus();
        });
    }

    // language toggle (simple): toggle dir + html lang and persist
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        // load translations from external file if present
        const translations = window.siteTranslations || {};

        // helper to set text while preserving child elements like <span>*</span>
        // respects `data-no-translate` on the target element to skip translation
        const isNoTranslate = (el) => el && el.getAttribute && (el.hasAttribute('data-no-translate') || el.classList.contains('no-translate'));

        const setLabelFor = (forId, text) => {
            const lbl = document.querySelector(`label[for="${forId}"]`);
            if (!lbl || isNoTranslate(lbl)) return;
            const span = lbl.querySelector('span');
            if (span) {
                const nodes = Array.from(lbl.childNodes);
                nodes.forEach(n => { if (n.nodeType === Node.TEXT_NODE) lbl.removeChild(n); });
                lbl.insertBefore(document.createTextNode(text + ' '), span);
            } else {
                lbl.textContent = text;
            }
        };

        const setInlineLabel = (labelEl, text) => {
            if (!labelEl || isNoTranslate(labelEl)) return;
            const children = Array.from(labelEl.childNodes);
            children.forEach(node => { if (node.nodeType === Node.TEXT_NODE) labelEl.removeChild(node); });
            labelEl.appendChild(document.createTextNode(' ' + text));
        };

        const setTextIfAllowed = (el, text) => {
            if (!el || isNoTranslate(el)) return;
            el.textContent = text;
        };

        let applyLang = (lang) => {
                const dict = translations[lang] || translations.ar;
                document.documentElement.lang = lang;
                document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
                localStorage.setItem('siteLang', lang);
                // keep Font Awesome icon and update label text
                langToggle.innerHTML = `<i class="fa-solid fa-language"></i> ${lang === 'ar' ? 'English' : 'العربية'}`;
                langToggle.setAttribute('aria-pressed', lang === 'ar' ? 'true' : 'false');

                // NAV links
                const navLinks = document.querySelectorAll('#primaryNav .nav-link');
                navLinks.forEach((a, i) => { if (dict.nav[i]) a.textContent = dict.nav[i]; });

                // HERO
                const heroTag = document.querySelector('.hero-tag'); if (heroTag) heroTag.textContent = dict.heroTag;
                const h1 = document.querySelector('.hero-content h1');
                if (h1) {
                    const sp = h1.querySelector('span');
                    h1.childNodes[0].nodeValue = dict.heroH1Line1 + ' ';
                    if (sp) sp.textContent = dict.heroH1Line2;
                }
                const heroP = document.querySelector('.hero-content p'); if (heroP) heroP.textContent = dict.heroP;
                const primaryBtn = document.querySelector('.hero-actions .btn.primary'); if (primaryBtn) primaryBtn.textContent = dict.heroPrimary;
                const secondaryBtn = document.querySelector('.hero-actions .btn.outline'); if (secondaryBtn) secondaryBtn.textContent = dict.heroSecondary;

                // Initiative
                const initiativeTag = document.querySelector('.initiative-tag'); if (initiativeTag) initiativeTag.textContent = dict.initiativeTag;
                const initiativeH2 = document.querySelector('#initiative h2'); if (initiativeH2) initiativeH2.textContent = dict.initiativeH2;
                const initBtn1 = document.querySelector('.initiative-actions .btn.primary'); if (initBtn1) initBtn1.textContent = dict.initiativeBtn1;
                const initBtn2 = document.querySelector('.initiative-actions .btn.outline'); if (initBtn2) initBtn2.textContent = dict.initiativeBtn2;

                // Modal
                const kicker = document.querySelector('.wa-kicker'); if (kicker) kicker.textContent = dict.modalKicker;
                const waH3 = document.querySelector('.wa-header h3'); if (waH3) waH3.textContent = dict.modalH3;
                const waP = document.querySelector('.wa-header p'); if (waP) waP.textContent = dict.modalP;
                setLabelFor('name', dict.label_name);
                setLabelFor('cont', dict.label_cont);
                setLabelFor('birthDate', dict.label_birth);
                // radio labels
                const radioLabels = document.querySelectorAll('.radio-group label');
                if (radioLabels[0]) setInlineLabel(radioLabels[0], dict.radio_male);
                if (radioLabels[1]) setInlineLabel(radioLabels[1], dict.radio_female);
                // checkboxes
                const cbLip = document.querySelector('input#lip')?.parentElement; if (cbLip) setInlineLabel(cbLip, dict.checkbox_lip);
                const cbPal = document.querySelector('input#palate')?.parentElement; if (cbPal) setInlineLabel(cbPal, dict.checkbox_palate);
                setLabelFor('notes', dict.notes_label);
                const notes = document.getElementById('notes'); if (notes) notes.setAttribute('placeholder', dict.notes_placeholder);
                const waSubmit = document.querySelector('.wa-submit'); if (waSubmit) waSubmit.textContent = dict.wa_submit;

                // Social section header
                const socialH2 = document.querySelector('#social h2'); if (socialH2) socialH2.textContent = dict.social_h2;
        };

        // scan the whole site and assign data-i18n keys for any visible text nodes
        const scanSiteForI18n = () => {
            translations.ar = translations.ar || {};
            translations.en = translations.en || {};
            window.__i18nCounter = window.__i18nCounter || 1;
            const excluded = ['SCRIPT','STYLE','NOSCRIPT','IFRAME','IMG','SVG','CANVAS','VIDEO','AUDIO','LINK','META'];

            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false);
            while (walker.nextNode()) {
                const el = walker.currentNode;
                if (!el || !el.tagName) continue;
                if (isNoTranslate(el)) continue;
                const tag = el.tagName.toUpperCase();
                // handle placeholders for inputs & textareas
                if ((tag === 'INPUT' || tag === 'TEXTAREA') && el.placeholder && !el.dataset.i18nPlaceholder) {
                    const k = 'i18n_ph_' + (window.__i18nCounter++);
                    el.dataset.i18nPlaceholder = k;
                    translations.ar[k] = translations.ar[k] || el.placeholder;
                }
                if (excluded.includes(tag)) continue;
                const textNodes = Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
                if (textNodes.length && !el.dataset.i18n) {
                    const combined = textNodes.map(n => n.textContent.trim()).join(' ').trim();
                    if (combined.length) {
                        const k = 'i18n_tx_' + (window.__i18nCounter++);
                        el.dataset.i18n = k;
                        translations.ar[k] = translations.ar[k] || combined;
                    }
                }
            }
            console.log('i18n scan complete — keys created:', window.__i18nCounter - 1);
        };

        // export translations as a JSON file (ar + en)
        const exportTranslations = () => {
            const out = { ar: translations.ar || {}, en: translations.en || {} };
            const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'site-translations.json';
            document.body.appendChild(a);
            a.click();
            a.remove();
        };

        // expose helpers for manual workflow
        window.i18n = {
            scan: scanSiteForI18n,
            export: exportTranslations,
            translations: translations,
            apply: applyLang
        };

        // Phrase map: prefer external file mapping when available
        const phraseMap = (translations && translations.phraseMap) ? translations.phraseMap : {};

        const applyPhraseMap = (toLang) => {
            if (toLang !== 'en') {
                // revert to originals
                document.querySelectorAll('[data-original-text]').forEach(el => {
                    el.textContent = el.dataset.originalText;
                    el.removeAttribute('data-original-text');
                });
                document.querySelectorAll('[data-original-placeholder]').forEach(el => {
                    el.setAttribute('placeholder', el.dataset.originalPlaceholder);
                    el.removeAttribute('data-original-placeholder');
                });
                return;
            }

            // replace text nodes matching keys
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            const nodes = [];
            while (walker.nextNode()) nodes.push(walker.currentNode);

            nodes.forEach(textNode => {
                const txt = textNode.textContent.trim();
                if (!txt) return;
                const parent = textNode.parentElement;
                if (!parent || isNoTranslate(parent)) return;

                // 1) exact-match replacement
                const mapped = phraseMap[txt];
                if (mapped) {
                    if (!parent.hasAttribute('data-original-text')) parent.setAttribute('data-original-text', parent.textContent);
                    parent.textContent = parent.textContent.replace(txt, mapped);
                    return;
                }

                // 2) substring replacements: try replacing any known key appearing inside the parent's text
                let replaced = false;
                Object.keys(phraseMap).forEach(key => {
                    const normalize = s => (s || '').replace(/\s+/g, ' ').trim();
                    const pTextNorm = normalize(parent.textContent);
                    const keyNorm = normalize(key);
                    if (keyNorm && pTextNorm.includes(keyNorm)) {
                        if (!parent.hasAttribute('data-original-text')) parent.setAttribute('data-original-text', parent.textContent);
                        // perform replacement on the original text to preserve punctuation
                        parent.textContent = parent.textContent.split(key).join(phraseMap[key]);
                        // if direct split didn't work (due to different whitespace forms), use normalized replacement
                        if (!parent.textContent.includes(phraseMap[key]) && pTextNorm.includes(keyNorm)) {
                            parent.textContent = normalize(parent.textContent).split(keyNorm).join(phraseMap[key]);
                        }
                        replaced = true;
                    }
                });
                if (replaced) return;
            });

            // placeholders
            document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
                if (isNoTranslate(el)) return;
                const ph = el.getAttribute('placeholder') || '';
                if (phraseMap[ph]) {
                    if (!el.hasAttribute('data-original-placeholder')) el.setAttribute('data-original-placeholder', ph);
                    el.setAttribute('placeholder', phraseMap[ph]);
                }
            });
        };

        // integrate into applyLang: after applying structured translations, run phrase map
        const oldApplyLang = applyLang;
        applyLang = (lang) => {
            oldApplyLang(lang);
            applyPhraseMap(lang);
        };

        // On initial load: ensure translations objects exist and attempt to auto-fill English
        document.addEventListener('DOMContentLoaded', () => {
            // ensure base objects
            translations.ar = translations.ar || {};
            translations.en = translations.en || {};

            // run a scan to ensure keys exist
            try { scanSiteForI18n(); } catch (e) { console.warn('i18n scan failed', e); }

            // populate translations.en from phraseMap when possible
            let mapped = 0, total = 0;
            Object.keys(translations.ar).forEach(k => {
                total++;
                const arText = translations.ar[k];
                const eng = (phraseMap && phraseMap[arText]) || translations.en[k] || '';
                if (eng) {
                    translations.en[k] = eng;
                    mapped++;
                }
            });
            console.info(`i18n: populated ${mapped}/${total} English entries from phraseMap.`);
        });

        const saved = localStorage.getItem('siteLang') || document.documentElement.lang || 'ar';
        applyLang(saved);

        langToggle.addEventListener('click', () => {
            const current = document.documentElement.lang || 'ar';
            const next = current === 'ar' ? 'en' : 'ar';
            applyLang(next);
            // minor layout fix after dir change
            setTimeout(updateNavBg, 60);
        });
    }
});
