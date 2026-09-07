<script setup>
import { ref, onMounted } from 'vue';
import bgHero from '../../../assets/bg-hero.webp';


const pengunjungCount = ref(2000);

onMounted(async () => {
  const kunjungan = localStorage.getItem('hasVisited');
  let targetCount = 2000;

  try {
    const url = '/api/statistik';
    const res = await fetch(url, {
      method: kunjungan ? 'GET' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (res.ok) {
      const data = await res.json();
      targetCount = data.totalPengunjung;
      if (!kunjungan) {
        localStorage.setItem('hasVisited', 'true');
      }
    }
  } catch (error) {
    console.error('gagal memuat statistik', error);
  }


  const startCount = 2000;
  const duration = 2000; 
  const startTime = performance.now();

  const animate = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easeProgress = progress * (2 - progress);
    
    pengunjungCount.value = Math.floor(startCount + (targetCount - startCount) * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      pengunjungCount.value = targetCount;
    }
  };

  requestAnimationFrame(animate);
});
</script>

<template>

    <section class="hero" id="hero" :style="{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(' + bgHero + ')' }">
      <div class="hero-kiri">
        <div class="thn anim-hidden anim-slide-down delay-1">
          <div class="tahun">
            <span class="tahun-berdiri">Est 2025</span>
          </div>
        </div>
        <span class="slogan anim-hidden anim-slide-down delay-2">Your Everyday Escape</span>
        <p class="anim-hidden anim-slide-right delay-3">
          Ruang untuk bernapas, berpikir, dan menikmati kopi terbaik di setiap momenmu.
        </p>
        <div class="button anim-hidden anim-slide-down delay-4">
          <a href="#menu" class="btn-hero" type="button">Explore Menu</a>
          <a href="#reservasi" class="btn-hero" type="button">Reservasi</a>
        </div>
        <div class="kunjungan anim-hidden anim-slide-down delay-4" id="kunjungan">
          <span class="logo-1">☕</span>
          <span class="logo-2">🥐</span>
          <span class="logo-3">🥗</span>

          <span class="penjelasan">Telah disukai oleh lebih dari <b>{{ pengunjungCount }}+</b> pecinta kopi</span>
        </div>
      </div>

      <div class="hero-kanan anim-hidden anim-slide-left delay-3">
        <div class="image-frame">
          <div class="image-wrapper">
            <img src="https://res.cloudinary.com/rlkcdo3y/image/upload/w_800,q_auto,f_auto/v1786981019/Gemini_Generated_Image_16gp8z16gp8z16gp.jpg" alt="gambar kopi" />
          </div>
        </div>
      </div>
    </section>
</template>
