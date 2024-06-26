<template>
	<v-radio-group id="paymentType" v-model="orderStore.paymentData.paymentType" inline>
		<v-radio color="primary" label="PIX" value="pix" @click="clearCreditCardData"></v-radio>
		<v-radio color="primary" label="Cartão de crédito" value="credito"></v-radio>
		<v-radio color="primary" label="Boleto" value="boleto" @click="clearCreditCardData"></v-radio>
	</v-radio-group>

	<v-form ref="paymentDataForm">
		<v-text-field
			id="cpf"
			v-model="orderStore.paymentData.cpf"
			v-maska="'###.###.###-##'"
			:rules="[rules.required, rules.cpf]"
			label="CPF"></v-text-field>

		<div v-if="orderStore.paymentData.paymentType === 'credito'">
			<v-text-field
				id="cardNumber"
				v-maska="'####.####.####.####'"
				v-model="orderStore.paymentData.cardNumber"
				:rules="[rules.required, rules.cardNumber]"
				label="Número do cartão"></v-text-field>

			<v-text-field
				id="cardOwnerName"
				v-model="orderStore.paymentData.cardOwnerName"
				:rules="[rules.required]"
				label="Nome no cartão"></v-text-field>

			<v-row>
				<v-col cols="12" sm="8">
					<v-text-field
						id="cardExpirationDate"
						v-model="orderStore.paymentData.cardExpirationDate"
						v-maska="'##/####'"
						:rules="[rules.required, rules.cardExpirationDate]"
						label="Data de validade"></v-text-field>
				</v-col>
				<v-col cols="12" sm="4">
					<v-text-field
						id="cardSecurityCode"
						type="number"
						v-model="orderStore.paymentData.cardSecurityCode"
						:rules="[rules.required]"
						label="CVV"></v-text-field>
				</v-col>
			</v-row>
		</div>
	</v-form>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore';
import { validateCardExpirationDate, validateCpf, validateCardNumber } from '@/utils/validators';

import { vMaska } from 'maska/vue';
const orderStore = useOrderStore();
const paymentDataForm = inject('paymentDataFormRef');

const rules = ref({
	required: (value: string) => {
		if (value) return true;
		return 'Campo obrigatório.';
	},

	cardExpirationDate: (value: string) => {
		if (validateCardExpirationDate(value)) return true;
		return 'Data de validade inválida';
	},
	cpf: (value: string) => validateCpf(value) || 'CPF inválido',

	cardNumber: (value: string) => validateCardNumber(value) || 'Número do cartão inválido',
});

function clearCreditCardData() {
	orderStore.paymentData.cardExpirationDate = '';
	orderStore.paymentData.cardNumber = '';
	orderStore.paymentData.cardOwnerName = '';
	orderStore.paymentData.cardSecurityCode = null;
}
</script>
