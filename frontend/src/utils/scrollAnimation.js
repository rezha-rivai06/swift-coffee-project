export function initScrollAnimation() {
  const opsiObserver = { threshold: 0.1 };

  const animasi = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, opsiObserver);

  const observeElements = () => {
    const semuaElemenAnimasi = document.querySelectorAll(".anim-hidden:not(.observed)");
    semuaElemenAnimasi.forEach((elemen) => {
      animasi.observe(elemen);
      elemen.classList.add('observed');
    });
  };

  observeElements();

  const observer = new MutationObserver(() => {
    observeElements();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
