document.getElementById("year").textContent = new Date().getFullYear();

// Scroll-reveal: fade + rise elements into view as they enter the viewport.
const revealables = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealables.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("is-visible"), i * 90);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  revealables.forEach((el) => observer.observe(el));
}
