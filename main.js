const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768;

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".hero-delay-spacer",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  })
  .to(".hero-bg", { scale: 1.15 }, 0)
  .to(".hero-content, .scroll-hint", { opacity: 0 }, 0)
  .to("#main-header", { opacity: 1, pointerEvents: "auto" }, 0.2);

gsap.to(".fixed-hero", {
  yPercent: -15,
  ease: "none",
  scrollTrigger: {
    trigger: ".second-section",
    start: "top bottom",
    end: "top top",
    scrub: true,
  },
});

// Sun Animation (с возвращенным блюром)
gsap.set(".sun-circle", { xPercent: -50, scale: 75 });
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".second-section",
      start: "top bottom",
      end: "bottom center",
      scrub: 1,
    },
  })
  .to(".sun-circle", {
    scale: 12.5,
    filter: "blur(10px)",
    duration: 1,
  })
  .to(".sun-circle", {
    scale: 0.5,
    filter: "blur(0px)",
    ease: "power2.inOut",
    duration: 1.5,
  });

if (!isMobile) {
  const setHeaderTheme = (theme) => {
    const body = document.body;
    if (theme === "dark") {
      body.classList.remove("header-on-light");
      body.classList.add("header-on-dark");
    } else {
      body.classList.remove("header-on-dark");
      body.classList.add("header-on-light");
    }
  };

  document.querySelectorAll("[data-header]").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 80px",
      end: "bottom 80px",
      onEnter: () => setHeaderTheme(section.dataset.header),
      onEnterBack: () => setHeaderTheme(section.dataset.header),
    });
  });

  ScrollTrigger.create({
    trigger: "#dark-theme-trigger",
    start: "top center",
    onEnter: () =>
      document.querySelector(".third-section").classList.add("is-dark"),
    onLeaveBack: () =>
      document.querySelector(".third-section").classList.remove("is-dark"),
  });
}

gsap.utils.toArray(".m-row").forEach((row, i) => {
  row.style.zIndex = i + 1;
  gsap.fromTo(
    row.querySelectorAll(".m-row-text > *"),
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: row,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    },
  );
});

document.querySelectorAll(".transparent-text").forEach((el) => {
  const text = el.textContent.trim();
  el.innerHTML = "";
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = char === " " ? "\u00A0" : char;
    el.appendChild(span);
  });
});

const s4Tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".s4-wrapper",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

const s4Chars = document.querySelectorAll(".s4 .char");
if (s4Chars.length) {
  s4Tl.to(
    s4Chars,
    { opacity: 1, stagger: 0.05, duration: 0.33, ease: "none" },
    0,
  );
}
s4Tl.to(".bg-s4", { scale: 1.15, duration: 0.67, ease: "none" }, 0.33);
s4Tl.to(
  ".s4-inner",
  { yPercent: -20, duration: 0.67, ease: "power2.in" },
  0.33,
);

const s5Chars = document.querySelectorAll(".s5 .char");
if (s5Chars.length) {
  gsap.to(s5Chars, {
    opacity: 1,
    stagger: 0.05,
    ease: "none",
    scrollTrigger: {
      trigger: ".s5",
      start: "top 75%",
      end: "top 25%",
      scrub: true,
    },
  });
}

document.querySelectorAll(".parallax-bg-inner").forEach((bg) => {
  gsap.fromTo(
    bg,
    { yPercent: -15 },
    {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: bg.closest(".m-row") || bg.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
});

if (!isMobile) {
  const pfTexts = gsap.utils.toArray(".pf-text-block");
  const pfImages = gsap.utils.toArray(".pf-img");

  pfTexts.forEach((text, index) => {
    ScrollTrigger.create({
      trigger: text,
      start: "top center",
      end: "bottom center",
      onEnter: () => toggleImage(index),
      onEnterBack: () => toggleImage(index),
    });
  });

  function toggleImage(index) {
    pfImages.forEach((img, i) => {
      if (i === index) {
        img.classList.add("active");
      } else {
        img.classList.remove("active");
      }
    });
  }
}
