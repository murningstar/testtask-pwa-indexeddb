<script setup lang="ts">
import { NMessageProvider, NConfigProvider } from 'naive-ui';

</script>

<template>
  <VitePwaManifest />
  <ClientOnly>
    <n-config-provider preflight-style-disabled>
      <n-message-provider>
        <!-- (naiveui) Pop-up сообщение, вылезающее при событии installed -->
        <InstallMessage />
        <NuxtPage />
      </n-message-provider>
    </n-config-provider>
  </ClientOnly>
</template>

<style scoped lang="scss"></style>