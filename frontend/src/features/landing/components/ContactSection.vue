<script setup>
import locationIcon from '../../../assets/location.svg';
import clockIcon from '../../../assets/clock.svg';
import phoneIcon from '../../../assets/phone.svg';
import directionIcon from '../../../assets/direction.svg';
function klikGetDirection() {
    const url = "https://maps.google.com/maps?q=Swift%20Coffee%2C%20Nunukan&t=&z=16&ie=UTF8&iwloc=&output=embed";
    window.open(url, '_blank');
}
</script>

<template>
<section class="contact" id="contact">

      <div class="kotak-besar">
        <div class="k-kiri">
          <span class="title-kiri">Kunjungi Kami</span>
          <p class="penjelasan">Kami selalu siap menyambut kedatangan Anda. Jangan ragu untuk mampir, menikmati secangkir kopi pilihan, dan berbagi cerita hangat bersama kami. Untuk pertanyaan, reservasi khusus, atau sekadar menyapa, silakan hubungi kami melalui kontak di bawah ini.</p>
          <span class="alamat">
            <span><img :src="locationIcon" class="icon-box" alt="Location"> Alamat</span>
            <p>Jl. Pesantren Jl. Imam Bonjol, Nunukan Tim., Kec. Nunukan, Kabupaten Nunukan, Kalimantan Utara 77482</p>
          </span>
          <span class="jam-operasional">
            <span><img :src="clockIcon" class="icon-box" alt="Clock"> Jam operasional</span>
            <p>selasa - minggu 09.00 - 22.00
              sabtu 09.00 - 23.00
              Tutup senin</p>
          </span>
          <span class="contact">
            <span class="contact-title"><img :src="phoneIcon" class="icon-box" alt="Phone"> Contact</span>
            <span class="contact-1">+62 821 9033 4112</span>
            <span class=contact-2>swftcoffee@gmail.com</span>
          </span>

          <button id="get-direction-btn" @click="klikGetDirection" class="get-direction">klik untuk melihat<img :src="directionIcon" class="arrow-icon"
              alt="Arrow"></button>
        </div>

        <div class="maps">
          <iframe src="https://maps.google.com/maps?q=Swift%20Coffee%2C%20Nunukan&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%" height="100%" style="border:0; border-radius: 20px;" allowfullscreen="" loading="lazy" title="Lokasi Swift Coffee di Google Maps"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>
</template>
