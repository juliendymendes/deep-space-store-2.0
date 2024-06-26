<template>
	<v-card>
		<ImageSlider :images="offer?.product.imagesPaths" />

		<div class="px-5 pb-3">
			<v-card-title class="text-h5 mt-5">{{ offer.product.name }}</v-card-title>
			<v-card-subtitle>
				<span class="text-decoration-line-through">De {{ formatPrice(offer.product.price) }}</span>
				<span> por {{ formatPrice(offer.price) }}</span>
			</v-card-subtitle>
			<v-card-text>
				<p class="text-subtitle-1">Este item também acompanha:</p>
				<v-list :items="offer.product.itens">
					<template v-slot:prepend>
						<v-icon icon="mdi mdi-circle-small"></v-icon>
					</template>
				</v-list>
			</v-card-text>
			<div class="ma-4 mt-0">
				<p class="text-subtitle-1 mb-4">Formas de pagamento</p>
				<v-chip color="primary me-3" v-for="item in paymentOptions" :key="item">
					{{ item }}
				</v-chip>
			</div>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import { Offer } from '@/types/Offer';
import { formatPrice } from '@/utils/formatters';
import ImageSlider from '@/components/ImageSlider.vue';
import { computed } from 'vue';

const props = defineProps<{
	offer: Offer;
}>();

const paymentOptions = computed(() => {
	const options: string[] = [];
	props.offer.product.paymentOptions.map((opt) => {
		switch (opt) {
			case 'boleto':
				options.push('Boleto');
				break;
			case 'credito':
				options.push('Cartão de crédito');
				break;
			case 'pix':
				options.push('PIX');
				break;
		}
		return true;
	});

	return options;
});
</script>
