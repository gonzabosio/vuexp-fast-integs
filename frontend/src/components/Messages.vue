<script setup>
import { ref } from 'vue';

const msgMockList = ref(['hi', 'ok', 'bye'])
const newMsg = ref('')

const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}/send-msg`)
ws.onopen = () => {
    console.log('Websocket connection open')
}
ws.onmessage = (event) => {
    const body = JSON.parse(event.data)
    console.log("Server:", body.message)
    msgMockList.value.push(body.message)
}

const handleMessage = () => {
    ws.send(JSON.stringify({ message: newMsg.value }))
}
</script>

<template>
    <div class="chat-view"></div>
    <div v-for="msg in msgMockList" class="messages">
        <div class="msg-card">
            <p>{{ msg }}</p>
        </div>
    </div>
    <form @submit.prevent="handleMessage" class="input-wrap">
        <input type="text" name="new-message" v-model="newMsg">
        <button type="submit" style="cursor: pointer;">></button>
    </form>
</template>

<style scoped>
.chat-view {
    display: flex;
    flex-direction: column;
    background: #f7f7f8;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

.messages {
    flex: 1 1 auto;
    overflow: auto;
}

.msg-card {
    width: max-content;
    color: aliceblue;
    background-color: black;
    margin-bottom: 1em;
    padding: 0.7em;
    border-radius: 1em;
}

.input-wrap {
    position: fixed;
    bottom: 0;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px;
    height: var(--input-height);
    box-sizing: border-box;
    backdrop-filter: blur(6px);
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
}

.send-msg {
    background-color: antiquewhite;
    flex: 1 1 auto;
    height: 44px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #e2e2e5;
    font-size: 15px;
    outline: none;
    box-sizing: border-box;
}
</style>