<template>
	<v-container>
		<OrderNotFound v-if="!order" />
		<v-sheet v-else class="pa-4 text-center mx-auto" elevation="12" max-width="700" rounded="lg" width="100%">
			<v-icon class="mb-5" color="success" icon="mdi-check-circle" size="112"></v-icon>

			<h2 class="text-h5 mb-5">Pedido realizado com sucesso!</h2>

			<p class="mb-2 text-medium-emphasis text-subtitle-1">Total: {{ formatPrice(order.offer.price) }}</p>
			<p v-if="order?.paymentData.paymentType === 'credito'" class="mb-4 text-medium-emphasis text-h6">
				{{ order?.paymentStatus }}
			</p>
			<div v-else>
				<p class="mb-4 text-medium-emphasis text-h6">Escaneie o código abaixo para finalizar o pagamento</p>
				<QRCode :width="280" v-if="order?.paymentData.paymentType === 'pix'" :data="order?.orderCode || ''" />

				<v-img
					v-if="order?.paymentData.paymentType === 'boleto'"
					max-width="500"
					class="mx-auto"
					src="/barcode.png"></v-img>
			</div>

			<div class="text-start mt-5 ms-sm-11">
				<p class="mb-4 text-medium-emphasis text-subtitle-2">Informações do pedido</p>
				<p class="mb-4 text-medium-emphasis text-body-2"><strong>Item:</strong> {{ order?.offer.product.name }}</p>

				<p class="mb-4 text-medium-emphasis text-body-2">
					<strong>Valor: </strong>{{ formatPrice(order.offer.price) }}
				</p>
				<p class="mb-4 text-medium-emphasis text-body-2"><strong>Itens:</strong></p>
				<ul class="mb-4 ms-4 text-medium-emphasis text-body-2">
					<li v-for="item in order?.offer.product.itens" :key="item">{{ item }}</li>
				</ul>
			</div>

			<div class="text-start mt-5 ms-sm-11">
				<p class="mb-4 text-medium-emphasis text-subtitle-2">Informações para entrega</p>
				<p class="mb-4 text-medium-emphasis text-body-2">
					{{ order?.deliveryData.logradouro }}, {{ order?.deliveryData.numero }} - {{ order?.deliveryData.cep }},
					{{ order?.deliveryData.localidade }}, {{ order?.deliveryData.uf }}
				</p>
			</div>

			<v-divider class="mb-4"></v-divider>

			<div class="text-end">
				<v-btn to="/" class="text-none" color="primary" variant="flat" rounded> Voltar para o ínicio </v-btn>
			</div>
		</v-sheet>
	</v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
import { OrderCreated } from '@/types/Order';
import { formatPrice } from '@/utils/formatters';
import { onMounted } from 'vue';
import OrderNotFound from './components/OrderNotFound.vue';
import { CheckoutService } from '@/services/checkout';
const route = useRoute();
const appStore = useAppStore();
// @ts-ignore
const { order_code } = route.params;
const order = ref<OrderCreated | null>(null);
onMounted(() => {
	getOrder();
});

async function getOrder() {
	const response = await CheckoutService.getOrderByCode(order_code);
	if (response instanceof Error) {
		console.error(response.message);
	} else {
		order.value = response;
	}
	appStore.loaderState = false;
}
</script>
