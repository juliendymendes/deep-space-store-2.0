<template>
	<v-hover>
		<template v-slot:default="{ isHovering, props }">
			<v-card
				v-bind="props"
				:class="isHovering ? 'elevation-24' : 'elevation-0'"
				class="mx-auto pa-3 cursor-pointer"
				color="transparent"
				rounded="lg"
				max-width="300"
				@click="$router.push(`/${offer.code}`)">
				<v-img class="align-end text-white" rounded="lg" height="300" :src="offer.product.imagesPaths[0]" contain>
				</v-img>
				<v-card-title>{{ offer.product.name }}</v-card-title>

				<v-card-subtitle class="pt-4">
					<span class="text-decoration-line-through">De {{ formatPrice(offer.product.price) }}</span>
					<span> por {{ formatPrice(offer.price) }}</span>
				</v-card-subtitle>
				<v-rating v-model="rating" readonly color="yellow-darken-3"></v-rating>
			</v-card>
		</template>
	</v-hover>
</template>

<script lang="ts" setup>
import { Offer } from '@/types/Offer';
import { formatPrice } from '@/utils/formatters';
const rating = ref(4);
defineProps<{
	offer: Offer;
}>();
</script>
