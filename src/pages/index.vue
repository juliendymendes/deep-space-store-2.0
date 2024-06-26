<template>
	<v-container>
		<div class="my-10">
			<p class="text-h5 my-5">Navegue por nossas categorias!</p>
			<div>
				<v-chip v-for="category in categories" color="primary" class="ma-3" :key="category">{{ category.name }}</v-chip>
			</div>
		</div>
		<div>
			<v-row>
				<v-col cols="12" sm="6" class="d-flex flex-column flex-wrap justify-center">
					<p class="text-subtitle-1 my-2">Novidades em smartphones</p>
					<p class="text-h4 font-weight-medium my-2">Confira o novo {{ newProduct?.name }}</p>

					<p class="text-h6 my-2">Não perca, compre agora!</p>
					<v-btn color="primary" rounded="lg" max-width="300" :to="`/${newProduct?.code}`">Comprar agora</v-btn>
				</v-col>
				<v-col cols="12" sm="6" class="d-flex justify-center">
					<v-img :src="newProduct?.imagesPaths[0]" max-width="500"></v-img>
				</v-col>
			</v-row>
		</div>

		<div>
			<p class="text-h5 my-5">Mais vendidos</p>
			<v-row>
				<v-col v-for="offer in offers" :key="offer.code">
					<OfferCard :offer="offer" />
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Offer from '@/types/Offer';
import OfferCard from '@/components/offer/OfferCard.vue';
const offers = ref<Offer[]>();
const newProduct = ref<Offer>({
	code: '',
	name: '',
	price: 0,
	imagesPaths: [],
	paymentOptions: [],
	itens: [],
});
const categories = ref([
	{
		name: 'Presentes',
	},
	{
		name: 'Celulares',
	},
	{
		name: 'Smartwatches',
	},
	{
		name: 'Notebooks',
	},
	{
		name: 'TVs',
	},
	{
		name: 'Tablets',
	},
	{
		name: 'Gaming',
	},
	{
		name: 'Colecionáveis',
	},
]);
onMounted(() => {
	getOffers();
	getNewProduct();
});

async function getOffers() {
	const response = await fetch(`/offers`, { method: 'GET' });
	if (response.ok) {
		offers.value = await response.json();
	} else {
		console.error(response);
	}
}

async function getNewProduct() {
	const response = await fetch(`/newProduct`, { method: 'GET' });
	if (response.ok) {
		newProduct.value = await response.json();
	} else {
		console.error(response);
	}
}
</script>
