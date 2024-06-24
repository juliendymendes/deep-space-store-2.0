<template>
	<v-form ref="deliveryDataForm">
		<v-text-field
			v-maska="'#####-###'"
			v-model="orderStore.deliveryData.cep"
			:rules="[rules.required, rules.cep]"
			label="CEP"
			@change="() => searchAddressByCep(orderStore.deliveryData.cep)"></v-text-field>

		<v-row>
			<v-col cols="12" sm="8">
				<v-text-field v-model="orderStore.deliveryData.logradouro" :rules="[rules.required]" label="Rua"></v-text-field>
			</v-col>
			<v-col cols="12" sm="4">
				<v-text-field v-model="orderStore.deliveryData.numero" :rules="[rules.required]" label="Número"></v-text-field>
			</v-col>
		</v-row>
		<v-text-field v-model="orderStore.deliveryData.bairro" :rules="[rules.required]" label="Bairro"></v-text-field>
		<v-row>
			<v-col cols="12" sm="8">
				<v-text-field
					v-model="orderStore.deliveryData.localidade"
					:rules="[rules.required]"
					label="Cidade"></v-text-field>
			</v-col>
			<v-col cols="12" sm="4">
				<v-text-field
					v-model="orderStore.deliveryData.uf"
					v-maska="'@@'"
					:rules="[rules.required, rules.uf]"
					label="UF"></v-text-field>
			</v-col>
		</v-row>
		<v-text-field v-model="orderStore.deliveryData.complemento" label="Complemento"></v-text-field>
	</v-form>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore';
import { validateCep } from '@/utils/validators';

import { vMaska } from 'maska/vue';
const orderStore = useOrderStore();
const deliveryDataForm = inject('deliveryDataFormRef');
const rules = ref({
	required: (value: string) => {
		if (value) return true;
		return 'Campo obrigatório.';
	},

	cep: (value: string) => validateCep(value) || 'CEP inválido',

	uf: (value: string) => value.length === 2 || 'UF precisa conter 2 caracteres',
});

function searchAddressByCep(value: string) {
	if (/^(\d{5}-\d{3})$/.test(value)) {
		fetch(`https://viacep.com.br/ws/${value}/json/`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				orderStore.deliveryData.bairro = data.bairro;
				orderStore.deliveryData.cep = data.cep;
				orderStore.deliveryData.logradouro = data.logradouro;
				orderStore.deliveryData.localidade = data.localidade;
				orderStore.deliveryData.uf = data.uf;
			});
	} else {
		console.log('CEP inválido');
	}
}
</script>
