<template>
	<v-sheet class="pa-4 text-center mx-auto" elevation="12" max-width="700" rounded="lg" width="100%">
		<v-icon class="mb-5" color="error" icon="mdi-alert-circle" size="112"></v-icon>

		<h2 class="text-h5 mb-5">{{ text }}</h2>

		<div class="text-end">
			<v-btn to="/" class="text-none" color="primary" variant="flat" rounded> Voltar para o ínicio </v-btn>
		</div>
	</v-sheet>
</template>

<script lang="ts" setup>
defineProps<{
	text: string;
}>();
</script>
