<template>
	<v-container>
		<v-sheet class="pa-4 text-center mx-auto" elevation="12" max-width="700" rounded="lg" width="100%">
			<v-icon class="mb-5" color="success" icon="mdi-check-circle" size="112"></v-icon>

			<h2 class="text-h5 mb-5">Pedido realizado com sucesso!</h2>

			<p class="mb-2 text-medium-emphasis text-subtitle-1">Total: R$ {{ order?.offer.price }}</p>
			<p v-if="order?.paymentType === 'credito'" class="mb-4 text-medium-emphasis text-h6">
				{{ order?.paymentStatus }}
			</p>
			<div v-else>
				<p class="mb-4 text-medium-emphasis text-h6">Escaneie o código abaixo para finalizar o pagamento</p>

				<v-img max-width="500" class="mx-auto" :src="order?.paymentCodePath"></v-img>
			</div>

			<div class="text-start mt-5 ms-sm-11">
				<p class="mb-4 text-medium-emphasis text-subtitle-2">Informações do pedido</p>
				<p class="mb-4 text-medium-emphasis text-body-2"><strong>Item:</strong> {{ order?.offer.name }}</p>

				<p class="mb-4 text-medium-emphasis text-body-2"><strong>Valor: </strong>R$ {{ order?.offer.price }}</p>
				<p class="mb-4 text-medium-emphasis text-body-2"><strong>Itens:</strong></p>
				<ul class="mb-4 ms-4 text-medium-emphasis text-body-2">
					<li v-for="item in order?.offer.itens" :key="item">{{ item }}</li>
				</ul>
			</div>

			<div class="text-start mt-5 ms-sm-11">
				<p class="mb-4 text-medium-emphasis text-subtitle-2">Informações para entrega</p>
				<p class="mb-4 text-medium-emphasis text-body-2">
					{{ order?.logradouro }}, {{ order?.numero }} - {{ order?.cep }}, {{ order?.localidade }}, {{ order?.uf }}
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
import OrderCreated from '@/types/OrderCreated';
import { onMounted } from 'vue';
const route = useRoute();
// @ts-ignore
const { order_code } = route.params;
const order = ref<OrderCreated | null>(null);
onMounted(() => {
	getOrder();
	console.log(order);
});
async function getOrder() {
	const response = await fetch(`/orders/${order_code}`, {
		method: 'GET',
	});
	if (response.ok) {
		const data = await response.json();
		order.value = data;
	} else {
		console.error(response);
	}
}
</script>
