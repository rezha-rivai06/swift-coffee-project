<script setup>
import { onMounted, defineAsyncComponent } from 'vue';
import { initScrollAnimation } from '../utils/scrollAnimation.js';

import Navbar from '../components/shared/Navbar.vue';
import HeroSection from '../features/landing/components/HeroSection.vue';

const AboutSection = defineAsyncComponent(() => import('../features/landing/components/AboutSection.vue'));
const MenuSection = defineAsyncComponent(() => import('../features/menu/components/MenuSection.vue'));
const ReservasiSection = defineAsyncComponent(() => import('../features/reservasi/components/ReservasiSection.vue'));
const GallerySection = defineAsyncComponent(() => import('../features/landing/components/GallerySection.vue'));
const ContactSection = defineAsyncComponent(() => import('../features/landing/components/ContactSection.vue'));
const Footer = defineAsyncComponent(() => import('../components/shared/Footer.vue'));
const KeranjangDrawerView = defineAsyncComponent(() => import('../features/checkout/components/KeranjangDrawerView.vue'));

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
