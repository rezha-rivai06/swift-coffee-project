<script setup>
import { onMounted } from 'vue';
import { initScrollAnimation } from '../utils/scrollAnimation.js';

import Navbar from '../components/shared/Navbar.vue';
import HeroSection from '../features/landing/components/HeroSection.vue';
import AboutSection from '../features/landing/components/AboutSection.vue';
import MenuSection from '../features/menu/components/MenuSection.vue';
import ReservasiSection from '../features/reservasi/components/ReservasiSection.vue';
import GallerySection from '../features/landing/components/GallerySection.vue';
import ContactSection from '../features/landing/components/ContactSection.vue';
import Footer from '../components/shared/Footer.vue';
import KeranjangDrawerView from '../features/checkout/components/KeranjangDrawerView.vue';

onMounted(() => {
  initScrollAnimation();
});
</script>

<template>
  <div class="konektor-page">
    <Navbar />
    <KeranjangDrawerView />
    <HeroSection />
    <AboutSection />
    <MenuSection />
    <ReservasiSection />
    <GallerySection />
    <ContactSection />
    <Footer />
  </div>
</template>
