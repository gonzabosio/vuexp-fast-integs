<script setup>
import { ref } from 'vue';
import { signupUser } from '@/composables/userRegister';
import { useRouter } from 'vue-router';

const router = useRouter()

const username = ref('')
const password = ref('')

const handleSignUpForm = async () => {
    // console.log('Signing Up...')
    const res = await signupUser(username.value, password.value)
    if (res.error) {
        console.log(res.error)
    } else {
        console.log(res.message)
        router.push('/menu')

    }
}
</script>

<template>
    <div>
        <h1>Sign Up</h1>
        <form @submit.prevent="handleSignUpForm">
            <label for="username">Username</label>
            <input type="text" name="username" v-model="username" required>
            <label for="password">Password</label>
            <input type="password" name="password" v-model="password" required>
            <button type="submit">Sign Up</button>
        </form>
    </div>
</template>

<style scoped></style>