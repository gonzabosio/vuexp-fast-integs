<script setup>
import { loginUser } from '@/composables/userRegister';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')

const handleLoginForm = async () => {
    console.log('Logging In...')
    const res = await loginUser(username.value, password.value)
    if (res.error) {
        console.error(res.error)
    } else {
        console.log(res.message)
        const redirect = route.query.redirect || '/menu'
        router.push(redirect)
    }
}
</script>

<template>
    <div>
        <h1>Log In</h1>
        <form @submit.prevent="handleLoginForm">
            <label for="username">Username</label>
            <input type="text" name="username" v-model="username" required>
            <label for="password">Password</label>
            <input type="password" name="password" v-model="password" required>
            <button type="submit">Log In</button>
        </form>
    </div>
</template>

<style scoped></style>