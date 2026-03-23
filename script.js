/* ===============================
   بيانات المخطط الزمني
================================ */
const timelineData = [
    { label: "قبل الولادة", type: "special", desc: "التقييم الأولي والتخطيط للعلاج" },
    { label: "الولادة", type: "special", desc: "الفحص بعد الولادة والتقييم الشامل" },

    { label: "٣", type: "month", desc: "الفحص الشامل وبدء المتابعة الدورية" },
    { label: "٦", type: "month", desc: "متابعة النمو وفحص السمع الأولي" },
    { label: "٩", type: "month", desc: "بدء جلسات التخاطب المبكرة" },
    { label: "١٢", type: "month", desc: "فحص السمع الشامل والتقييم النمائي", year: "السنة ١" },
    { label: "١٨", type: "month", desc: "نهاية المرحلة الشهرية وبدء المتابعة السنوية", year: "السنة ١.٥" },

    { label: "٢ – ٥", type: "year", desc: "متابعة السمع – جلسات التخاطب – عمليات الأذن عند الحاجة", year: "مرحلة سنوية" },
    { label: "٦ – ١٠", type: "year", desc: "تقويم الأسنان والمتابعة الجراحية الثانوية", year: "مرحلة سنوية" },
    { label: "١١ – ١٧", type: "year", desc: "تحسين النطق والشكل الوظيفي والمتابعة النفسية", year: "مرحلة سنوية" },
    { label: "+١٨", type: "year", desc: "العمليات التجميلية الثانوية النهائية عند الحاجة", year: "مرحلة سنوية" }
];

/* ===============================
   إنشاء المخطط الزمني
================================ */
const timelineContainer = document.getElementById("monthlyTimeline");

timelineData.forEach(item => {
    let titleText =
        item.type === "month" ? `شهر ${item.label}` :
        item.type === "year" ? `${item.label} سنوات` :
        item.label;

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

/* ===============================
   القصص (Stories)
================================ */
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
    }

    darkToggle.onclick = () => {
        document.body.classList.toggle("dark");
        const enabled = document.body.classList.contains("dark");
        localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
        darkToggle.textContent = enabled ? "☀️ الوضع النهاري" : "🌙 الوضع الليلي";
    };
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
