export function initScrollAnimation() {
  const semuaElemenAnimasi = document.querySelectorAll(".anim-hidden");
  
  if (!semuaElemenAnimasi || semuaElemenAnimasi.length === 0) {
    return;
  }

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

  semuaElemenAnimasi.forEach((elemen) => {
    animasi.observe(elemen);
  });
}
