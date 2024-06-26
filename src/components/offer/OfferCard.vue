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
				<v-img class="align-end text-white" rounded="lg" height="200" :src="offer.imagesPaths[0]" cover> </v-img>
				<v-card-title>{{ offer.name }}</v-card-title>

				<v-card-subtitle class="pt-4"> {{ formatPrice(offer.price) }} </v-card-subtitle>
			</v-card>
		</template>
	</v-hover>
</template>

<script lang="ts" setup>
import Offer from '@/types/Offer';
import { formatPrice } from '@/utils/formatters';
defineProps<{
	offer: Offer;
}>();
</script>
