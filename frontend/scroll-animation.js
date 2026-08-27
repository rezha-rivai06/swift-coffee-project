const semuaElemenAnimasi = document.querySelectorAll(".anim-hidden");

const opsiObserver = { threshold: 0.1 };

const animasi = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            animasi.unobserve(entry.target);
        }
    });
}, opsiObserver);

semuaElemenAnimasi.forEach((elemen) => {
    animasi.observe(elemen);
});
