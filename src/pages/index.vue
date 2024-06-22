<!-- eslint-disable vue/valid-v-slot -->
<template>
	<v-container class="mt-15">
		<v-row>
			<v-col cols="12" md="6">
				<v-card>
					<v-carousel height="400" show-arrows="hover" hide-delimiter-background>
						<v-carousel-item v-for="i in slides" :key="i">
							<v-img aspect-ratio="16/9" cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
						</v-carousel-item>
					</v-carousel>
					<v-card-title class="text-h5 mt-5">Projetor de luz de galáxia em forma de astronauta</v-card-title>
					<v-card-subtitle>R$ 100,00</v-card-subtitle>
					<v-card-text>
						<p class="text-subtitle-1">Este item também acompanha:</p>
						<v-list :items="colors">
							<template v-slot:prepend>
								<v-icon>mdi-circle-small</v-icon>
							</template>
						</v-list>
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-stepper
					alt-labels
					editable
					color="primary"
					prev-text="Anterior"
					next-text="Próximo"
					:items="['Dados pessoais', 'Entrega', 'Pagamento']">
					<template v-slot:item.1>
						<v-form fast-fail>
							<v-text-field v-model="personalData.name" label="Nome completo"></v-text-field>

							<v-text-field v-model="personalData.email" label="Email"></v-text-field>
							<v-text-field v-model="personalData.phone" label="Telefone"></v-text-field>
						</v-form>
					</template>

					<template v-slot:item.2>
						<v-form fast-fail>
							<v-text-field v-model="deliveryData.cep" label="CEP"></v-text-field>

							<v-row>
								<v-col cols="12" sm="8">
									<v-text-field v-model="deliveryData.logradouro" label="Rua"></v-text-field>
								</v-col>
								<v-col cols="12" sm="4">
									<v-text-field v-model="deliveryData.numero" label="Número"></v-text-field>
								</v-col>
							</v-row>
							<v-text-field v-model="deliveryData.bairro" label="Bairro"></v-text-field>
							<v-row>
								<v-col cols="12" sm="8">
									<v-text-field v-model="deliveryData.localidade" label="Cidade"></v-text-field>
								</v-col>
								<v-col cols="12" sm="4">
									<v-text-field v-model="deliveryData.uf" label="UF"></v-text-field>
								</v-col>
							</v-row>
							<v-text-field v-model="deliveryData.complemento" label="Complemento"></v-text-field>
						</v-form>
					</template>

					<template v-slot:item.3>
						<v-radio-group v-model="paymentData.paymentType" inline>
							<v-radio color="primary" label="PIX" value="pix"></v-radio>
							<v-radio color="primary" label="Cartão de crédito" value="credito"></v-radio>
							<v-radio color="primary" label="Boleto" value="boleto"></v-radio>
						</v-radio-group>

						<v-form fast-fail>
							<v-text-field v-model="paymentData.cpf" label="CPF"></v-text-field>

							<div v-if="paymentData.paymentType === 'credito'">
								<v-text-field v-model="paymentData.cardNumber" label="Número do cartão"></v-text-field>

								<v-text-field v-model="paymentData.cardOwnerName" label="Nome no cartão"></v-text-field>

								<v-row>
									<v-col cols="12" sm="8">
										<v-text-field v-model="paymentData.cardExpirationDate" label="Data de validade"></v-text-field>
									</v-col>
									<v-col cols="12" sm="4">
										<v-text-field v-model="paymentData.cardSecurityCode" label="CVV"></v-text-field>
									</v-col>
								</v-row>
							</div>
							<v-row>
								<v-col cols="12" class="d-flex justify-end">
									<v-btn color="primary" @click="finalizeOrder">Finalizar pedido</v-btn>
								</v-col>
							</v-row>
						</v-form>
					</template>
				</v-stepper>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
import DeliveryAddress from '@/types/DeliveryAddress';
import PaymentData from '@/types/PaymentData';
import PersonalData from '@/types/PersonalData';
import { ref } from 'vue';

const personalData = ref<PersonalData>({
	name: '',
	email: '',
	phone: '',
});

const deliveryData = ref<DeliveryAddress>({
	cep: '',
	logradouro: '',
	numero: null,
	bairro: '',
	localidade: '',
	uf: '',
	complemento: '',
});

const paymentData = ref<PaymentData>({
	paymentType: 'pix',
	cpf: '',
});

const colors = ref(['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4']);
const slides = ref(['First', 'Second', 'Third', 'Fourth', 'Fifth']);

function finalizeOrder() {
	console.log('Personal data');
	console.log(personalData.value);
	console.log('Delivery data');
	console.log(deliveryData.value);
	console.log('Payment data');
	console.log(paymentData.value);
}
</script>
