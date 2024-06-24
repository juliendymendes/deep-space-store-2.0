<template>
	<v-overlay :model-value="appStore.loaderState" class="align-center justify-center">
		<v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
	</v-overlay>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';
const appStore = useAppStore();
</script>
