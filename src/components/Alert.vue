<template>
	<v-alert
		:model-value="alertStore.options.visible"
		closable
		style="z-index: 100"
		:icon="alertStore.options.icon"
		min-width="400"
		max-width="700"
		class="position-absolute top-0 right-0 mt-5"
		:title="alertStore.options.title"
		:text="alertStore.options.text"
		:type="alertStore.options.type"></v-alert>
</template>

<script setup lang="ts">
import { useAlertStore } from '@/stores/alertStore';

const alertStore = useAlertStore();
</script>
