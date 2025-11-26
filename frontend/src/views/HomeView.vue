<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <div>
        <nav>
            <RouterLink class="nav-item" to="/signup">Sign Up</RouterLink>
            <RouterLink class="nav-item" to="/login">Log In</RouterLink>
            <RouterLink class="nav-item" to="/chat">Chat</RouterLink>
        </nav>
    </div>
</template>

<style scoped>
nav {
    display: flex;
    justify-content: start;
    background-color: beige;
    padding: 1em;
}

.nav-item {
    margin-left: 2em;
    text-decoration: none;
    cursor: pointer;
    color: black;

    &:hover {
        color: chocolate;
    }
}
</style>