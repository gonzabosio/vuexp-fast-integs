<script setup>
import { logoutUser } from '@/composables/userRegister.js';
import { useUserStore } from '@/store/userStore.js';
import { useRouter } from 'vue-router';

const router = useRouter()

const userStore = useUserStore()
const username = userStore.userData.username

const logoutHandler = async () => {
    const res = await logoutUser()
    if (res.error) {
        console.error('could not logout user:', res.error)
        return
    }
    router.replace('/login')
}
</script>

<template>
    <div>
        <h1>Menu</h1>
        <p>{{ username }}</p>
        <button @click="logoutHandler">Logout</button>
    </div>
</template>

<style scoped></style>