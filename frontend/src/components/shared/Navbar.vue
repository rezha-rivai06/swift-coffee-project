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
      <button type="button" id="btn-keranjang" aria-label="Keranjang Belanja" @click="openCart">
        <img src="/svg/cart-shopping-svgrepo-com.svg" alt="Keranjang Belanja" class="cart-icon" />
        <span v-if="totalItemKeranjang > 0" id="cart-badge" class="cart-badge">{{ totalItemKeranjang }}</span>
      </button>
    </div>
  </nav>
</template>
