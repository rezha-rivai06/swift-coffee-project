<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const instruksifooter = defineProps({
  buka: { type: Boolean, required: true }
});

const instruksiLoginModal= defineEmits(['close']);
const password = ref('');
const Loading = ref(false);
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
    errorMessage.value = '';
    Loading.value = true;
    
    try {
        const request = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password.value })
        });
        
        const data = await request.json();
        
        if (request.ok) {
            localStorage.setItem('adminToken', data.token);
            password.value = '';
            instruksiLoginModal('close');
            router.push('/admin');
        } else {
            errorMessage.value = 'Password salah!';
        }
    } catch (error) {
        errorMessage.value = 'Gagal terhubung';
    } finally {
        Loading.value = false;
    }
};
</script>

<template>
  <div class="google-modal-overlay" v-if="buka" @click.self="instruksiLoginModal('close')">
    <div class="google-modal-card">
      <button class="close-btn" @click="instruksiLoginModal('close')">&times;</button>
      
      <div class="google-modal-header">
        <h1 class="logo-text">Swift<span>Cafe</span></h1>
        <h2>Sign in</h2>
        <p>Use your Administrator account</p>
      </div>

      <form @submit.prevent="handleLogin" class="google-form">
        <div class="input-group">
          <input 
            type="password" 
            v-model="password" 
            placeholder="Masukkan" 
            required 
            autocomplete="new-password"
            :class="{ 'input-error': errorMessage }"
          />
        </div>
        
        <div v-if="errorMessage" class="error-message">
          <svg aria-hidden="true" class="stUf5b qpSchb" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
          {{ errorMessage }}
        </div>

        <div class="form-actions">
          <button type="button" class="btn-text" @click="instruksiLoginModal('close')">Cancel</button>
          <button type="submit" class="btn-primary" :disabled="Loading">
            {{ Loading ? 'Verifying...' : 'Next' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.google-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(2px);
}

.google-modal-card {
    background-color: #ffffff;
    width: 100%;
    max-width: 450px;
    border-radius: 12px;
    padding: 40px;
    position: relative;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    font-family: 'Roboto', 'Outfit', sans-serif;
    animation: slideUp 0.3s ease-out forwards;
}

@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    background: transparent;
    border: none;
    font-size: 24px;
    color: #5f6368;
    cursor: pointer;
    transition: color 0.2s;
}

.close-btn:hover {
    color: #202124;
}

.google-modal-header {
    text-align: center;
    margin-bottom: 30px;
}

.logo-text {
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: -1px;
    color: #1f1f1f;
    margin-bottom: 15px;
    font-family: 'Outfit', sans-serif;
}

.logo-text span {
    color: #D4A373;
}

.google-modal-header h2 {
    font-size: 24px;
    font-weight: 400;
    color: #202124;
    margin-bottom: 10px;
}

.google-modal-header p {
    font-size: 16px;
    color: #202124;
    letter-spacing: 0.1px;
}

.google-form {
    display: flex;
    flex-direction: column;
}

.input-group {
    position: relative;
    margin-bottom: 10px;
}

.input-group input {
    width: 100%;
    padding: 13px 15px;
    font-size: 16px;
    border: 1px solid #dadce0;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s;
}

.input-group input:focus {
    border: 2px solid #1a73e8;
    padding: 12px 14px; /* compensate for 2px border */
}

.input-group input.input-error {
    border-color: #d93025;
}

.input-group input.input-error:focus {
    border: 2px solid #d93025;
    padding: 12px 14px;
}

.error-message {
    color: #d93025;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
}

.btn-text {
    background: transparent;
    border: none;
    color: #1a73e8;
    font-weight: 500;
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.btn-text:hover {
    background-color: #f8faff;
}

.btn-primary {
    background-color: #1a73e8;
    color: white;
    border: none;
    font-weight: 500;
    font-size: 14px;
    padding: 10px 24px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
    background-color: #1b66c9;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
}

.btn-primary:disabled {
    background-color: #8ab4f8;
    cursor: not-allowed;
    box-shadow: none;
}
</style>
