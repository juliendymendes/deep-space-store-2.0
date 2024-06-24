<template>
	<v-form ref="personalDataForm">
		<v-text-field v-model="orderStore.personalData.name" :rules="[rules.required]" label="Nome completo"></v-text-field>

		<v-text-field
			type="email"
			v-model="orderStore.personalData.email"
			:rules="[rules.email]"
			label="Email"></v-text-field>
		<v-text-field
			v-maska="'(##) #####-####'"
			v-model="orderStore.personalData.phone"
			:rules="[rules.required, rules.phone]"
			label="Telefone"></v-text-field>
	</v-form>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore';
import { validatePhone } from '@/utils/validators';
import { vMaska } from 'maska/vue';
const orderStore = useOrderStore();
const personalDataForm: Ref = inject('personalDataFormRef')!;
const rules = ref({
	required: (value: string) => {
		if (value) return true;
		return 'Campo obrigatório.';
	},
	email: (value: string) => {
		if (value) {
			const pattern =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return pattern.test(value) || 'E-mail inválido';
		}
	},

	phone: (value: string) => validatePhone(value) || 'Número de telefone inválido',
});
</script>
