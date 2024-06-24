<template>
	<VueQrcode :value="data" type="image/jpeg" :color="{ dark: '#000000ff', light: '#ffffffff' }" />
</template>
<script setup lang="ts">
import VueQrcode from 'vue-qrcode';

defineProps<{
	data: string;
}>();
</script>
