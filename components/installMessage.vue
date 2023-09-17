<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useMessage } from "naive-ui"
useRegisterSW({
    immediate: true,
    onOfflineReady: notifyOfflineReady
})
const message = useMessage()
function notifyOfflineReady() {
    message.info('Сайт может работать Offline!', {
        keepAliveOnHover: true,
        closable: true,
        duration: 4000
    })
}
</script>

<template></template>

<style scoped></style>