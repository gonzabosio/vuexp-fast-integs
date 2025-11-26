<script setup>
import { useUserStore } from '@/store/userStore.js';

const userStore = useUserStore()
const username = userStore.userData.username
</script>

<template>
    <div>
        <h1>Menu</h1>
        <p>{{ username }}</p>
    </div>
</template>

<style scoped></style>