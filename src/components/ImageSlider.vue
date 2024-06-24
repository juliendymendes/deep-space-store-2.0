<template>
	<v-sheet class="mx-auto w-100" elevation="8" max-width="700">
		<v-expand-transition>
			<v-img v-if="currentImage != null" :src="images[currentImage]" cover max-width="700" max-height="500"></v-img>
		</v-expand-transition>
		<v-slide-group v-model="currentImage" class="pa-4" selected-class="bg-primary" show-arrows>
			<v-slide-group-item v-for="i in images" :key="i" v-slot="{ isSelected, toggle, selectedClass }">
				<v-img :src="i" :class="['ma-4', selectedClass]" cover @click="toggle" max-width="150">
					<div class="d-flex fill-height align-center justify-center">
						<v-scale-transition>
							<v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48"></v-icon>
						</v-scale-transition>
					</div>
				</v-img>
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
