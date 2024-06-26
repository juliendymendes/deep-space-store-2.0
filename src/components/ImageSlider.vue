<template>
	<v-sheet class="mx-auto w-100" max-width="700">
		<v-expand-transition>
			<v-img v-if="currentImage != null" :src="images[currentImage]" cover max-width="500" max-height="600"></v-img>
		</v-expand-transition>
		<v-slide-group v-model="currentImage" class="pa-4" selected-class="bg-primary" show-arrows>
			<v-slide-group-item v-for="i in images" :key="i" v-slot="{ isSelected, toggle }">
				<v-img :src="i" :class="['ma-4', isSelected ? 'border-sm' : '']" cover @click="toggle" max-width="150"> </v-img>
			</v-slide-group-item>
		</v-slide-group>
	</v-sheet>
</template>

<script setup lang="ts">
const currentImage = ref(0);
defineProps<{
	images: string[];
}>();
</script>
