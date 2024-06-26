<template>
	<v-container>
		<v-row>
			<v-col v-for="offer in offers" :key="offer.code">
				<OfferCard :offer="offer" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Offer from '@/types/Offer';
import OfferCard from '@/components/offer/OfferCard.vue';
const offers = ref<Offer[]>();
onMounted(() => {
	getOffers();
});

async function getOffers() {
	const response = await fetch(`/offers`, { method: 'GET' });
	if (response.ok) {
		offers.value = await response.json();
	} else {
		console.error(response);
	}
}
</script>
