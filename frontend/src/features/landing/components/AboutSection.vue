<script setup>
import { ref } from 'vue';

const laci = ref(false);
const overlay = ref(false);

function bukaStoryDrawer() {
  overlay.value = true;
  laci.value = true;
}

function tutupStoryDrawer() {
  overlay.value = false;
  laci.value = false;
}
</script>

<template>

    <section class="about" id="about">
      <div class="about-kiri">
        <img class="about-1 anim-hidden anim-slide-up" src="https://res.cloudinary.com/rlkcdo3y/image/upload/w_400,q_auto,f_auto/v1786831716/kopi2.jpg" loading="lazy" alt="gambar" />
        <img class="about-2 anim-hidden anim-slide-down delay-1" src="https://res.cloudinary.com/rlkcdo3y/image/upload/w_400,q_auto,f_auto/v1786831716/kopi2.jpg" loading="lazy" alt="gambar" />
      </div>

      <div class="about-kanan">
        <span class="teks-1 anim-hidden anim-slide-down">Tentang kami</span>
        <span class="teks-2 anim-hidden anim-slide-down delay-1">Sejak 2025</span>
        <p class="teks-3 anim-hidden anim-slide-right delay-2">
          Berawal dari sebuah garasi kecil di sudut kota, impian kami sederhana: menyajikan secangkir kopi berkualitas yang bisa menyatukan berbagai lapisan masyarakat. Di tahun 2025, saat dunia sedang bergerak begitu cepat, kami ingin menciptakan sebuah ruang di mana waktu seakan berjalan lebih lambat.
        </p>
        <a class="teks-4 anim-hidden anim-fade delay-3" href="#" id="btn-our-story" @click.prevent="bukaStoryDrawer">Read full story &nbsp; ➜</a>
      </div>
    </section>


  <div class="story-overlay" id="story-overlay" :class="{ active: overlay }" @click="tutupStoryDrawer"></div>

  <div class="story-drawer" id="story-drawer" :class="{ active: laci }">
    <div class="story-header">
      <h3 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: #160e0a;">Tentang kami</h3>
      <button id="close-story-btn" @click="tutupStoryDrawer" aria-label="Tutup Cerita"
        style="background:none; border:none; font-size:24px; cursor:pointer; color:#4e4540;">✕</button>
    </div>

    <div class="story-content">
      <h2 class="story-title" style="font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #160e0a; text-align: center; margin-bottom: 24px;">Sejak 2025</h2>
      <p class="story-paragraph" style="font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.8; color: #4e4540; text-align: justify; margin-bottom: 20px;">
        Berawal dari sebuah garasi kecil di sudut kota, impian kami sederhana: menyajikan secangkir kopi berkualitas yang bisa menyatukan berbagai lapisan masyarakat. Di tahun 2025, saat dunia sedang bergerak begitu cepat, kami ingin menciptakan sebuah ruang di mana waktu seakan berjalan lebih lambat.
      </p>
      <p class="story-paragraph" style="font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.8; color: #4e4540; text-align: justify; margin-bottom: 20px;">
        Setiap biji kopi yang kami sangrai membawa cerita dari para petani lokal. Setiap hidangan yang kami sajikan diracik dengan cinta dan ketelitian oleh koki-koki andal. Bagi kami, kopi bukanlah sekadar minuman, melainkan sebuah seni merawat rasa.
      </p>
      <p class="story-paragraph" style="font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.8; color: #4e4540; text-align: justify; margin-bottom: 30px;">
        Kami bukan sekadar kedai kopi, kami adalah ruang tamu ketiga bagi Anda. Tempat di mana ide-ide besar lahir, pertemanan dirajut, dan lelah sejenak dilupakan.
      </p>
      <p class="story-signature" style="font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: #160e0a; text-align: right; font-style: italic;">
        - Swift coffee
      </p>
    </div>
</div>
</template>
