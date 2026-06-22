

  /* ---------- Sticky nav shadow on scroll ---------- */
  const siteNav = document.getElementById('siteNav');
  if (siteNav) {
    const onScroll = () => {
      siteNav.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  /* ---------- Active nav link highlighting on scroll (home page) ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[data-section]');
  if (sections.length && navAnchors.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id === 'heroSlider' ? 'home' : entry.target.id;
          navAnchors.forEach(a => a.classList.toggle('active', a.dataset.section === id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('#heroSlider, #message').forEach(s => spy.observe(s));
  }

  /* ---------- Hero slider ---------- */
  const track = document.getElementById('heroTrack');
  if (track) {
    const slides = Array.from(track.children);
    const dotsWrap = document.getElementById('heroDots');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    let index = 0;
    let timer = null;
    const AUTOPLAY_MS = 5500;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.role = 'tab';
      dot.setAttribute('aria-label', `الشريحة ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i, true));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      track.style.transform = `translateX(${-index * 100}%)`;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function goTo(i, userTriggered) {
      index = (i + slides.length) % slides.length;
      render();
      if (userTriggered) restartAutoplay();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function startAutoplay() {
      timer = setInterval(next, AUTOPLAY_MS);
    }
    function restartAutoplay() {
      clearInterval(timer);
      startAutoplay();
    }

    nextBtn.addEventListener('click', () => goTo(index + 1, true));
    prevBtn.addEventListener('click', () => goTo(index - 1, true));

    const heroSlider = document.getElementById('heroSlider');
    heroSlider.addEventListener('mouseenter', () => clearInterval(timer));
    heroSlider.addEventListener('mouseleave', startAutoplay);
    heroSlider.addEventListener('focusin', () => clearInterval(timer));
    heroSlider.addEventListener('focusout', startAutoplay);

    /* touch swipe */
    let startX = 0;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? goTo(index - 1, true) : goTo(index + 1, true);
      }
    }, { passive: true });

    /* keyboard arrows */
    heroSlider.setAttribute('tabindex', '0');
    heroSlider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(index + 1, true);
      if (e.key === 'ArrowRight') goTo(index - 1, true);
    });

    render();
    startAutoplay();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      clearInterval(timer);
    }
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

/* ===========================
   إنشاء حساب جديد
=========================== */

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    if (fullName.length < 2) {
      alert("يرجى إدخال الاسم الكامل");
      return;
    }

    if (email === "") {
      alert("يرجى إدخال البريد الإلكتروني");
      return;
    }

    if (password.length < 6) {
      alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    if (password !== confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }

    if (!terms) {
      alert("يجب الموافقة على الشروط والأحكام");
      return;
    }

    // حفظ البيانات
    localStorage.setItem("userName", fullName);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("تم إنشاء الحساب بنجاح");

    window.location.href = "login.html";
  });
}

/* ===========================
   تسجيل الدخول
=========================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (!savedEmail || !savedPassword) {
      alert("لا يوجد حساب مسجل، قم بإنشاء حساب أولاً");
      return;
    }

    if (email === savedEmail && password === savedPassword) {
      alert("تم تسجيل الدخول بنجاح");

      window.location.href = "groups.html";
    } else {
      alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  });
}

// إظهار وإخفاء كلمة المرور لجميع الحقول

function setupPasswordToggle(buttonId, inputId, iconId) {
  const button = document.getElementById(buttonId);
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (button && input && icon) {
    button.addEventListener("click", function () {
      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  }
}

// صفحة تسجيل الدخول
setupPasswordToggle(
  "togglePassword",
  "password",
  "toggleIcon"
);

// صفحة إنشاء الحساب - كلمة المرور
setupPasswordToggle(
  "toggleSignupPassword",
  "signupPassword",
  "toggleSignupIcon"
);

// صفحة إنشاء الحساب - تأكيد كلمة المرور
setupPasswordToggle(
  "toggleConfirmPassword",
  "confirmPassword",
  "toggleConfirmIcon"
);
