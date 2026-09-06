<script setup>
import { ref } from 'vue'
import { totalItemKeranjang, openCart } from '../../stores/cartStore.js';

const isMenuOpen = ref(false)
</script>

<template>
  <nav class="navbar" id="navbar">
    <span>Swift Coffee</span>

    <div class="hamburger" id="hamburger" @click="isMenuOpen = !isMenuOpen" :class="{ active: isMenuOpen }">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
      <span v-if="totalItemKeranjang > 0" id="humberger-badge" class="humberger-badge">{{ totalItemKeranjang }}</span>
    </div>

    <div class="link" id="link" :class="{ active: isMenuOpen }">
      <ul>
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#galeri">Gallery</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button type="button" id="btn-keranjang" @click="openCart" aria-label="Keranjang Belanja">
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span v-if="totalItemKeranjang > 0" id="cart-badge" class="cart-badge">{{ totalItemKeranjang }}</span>
      </button>
    </div>
  </nav>
</template>
