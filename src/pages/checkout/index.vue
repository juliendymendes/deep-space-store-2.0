<!-- eslint-disable vue/valid-v-slot -->
<template>
	<v-container class="mt-15">
		<v-row class="mb-5">
			<v-col cols="12" md="6">
				<OfferCard :offer="offer" />
			</v-col>

			<v-col cols="12" md="6">
				<v-stepper alt-labels color="primary" v-model="stepper">
					<v-stepper-header>
						<v-stepper-item title="Dados pessoais" value="1" complete> </v-stepper-item>

						<v-stepper-item title="Entrega" value="2" complete> </v-stepper-item>

						<v-stepper-item title="Pagamento" value="3" complete> </v-stepper-item>
					</v-stepper-header>

					<v-stepper-window v-model="stepper">
						<!-- PERSONAL DATA FORM -->
						<v-stepper-window-item value="1">
							<PersonalDataForm />
						</v-stepper-window-item>

						<!-- DELIVERY DATA FORM -->
						<v-stepper-window-item value="2">
							<DeliveryDataForm />
						</v-stepper-window-item>

						<!-- PAYMENT DATA FORM -->
						<v-stepper-window-item value="3">
							<PaymentDataForm />
							<v-row>
								<v-col cols="12" class="d-flex justify-end">
									<v-btn id="finalizeOrder" color="primary" @click="finalizeOrder">Finalizar pedido</v-btn>
								</v-col>
							</v-row>
						</v-stepper-window-item>
					</v-stepper-window>
					<v-stepper-actions next-text="Próximo" prev-text="Anterior" @click:next="next" @click:prev="stepper--">
					</v-stepper-actions>
				</v-stepper>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Offer from '@/types/Offer';

import { useAppStore } from '@/stores/app';
import { useAlertStore } from '@/stores/alertStore';
import OfferCard from '@/components/offer/OfferCard.vue';

import PersonalDataForm from '@/components/forms/PersonalDataForm.vue';
import { useOrderStore } from '@/stores/orderStore';
import DeliveryDataForm from '@/components/forms/DeliveryDataForm.vue';

const stepper = ref(0);
const appStore = useAppStore();
const alertStore = useAlertStore();

const route = useRoute();
const router = useRouter();
const offer = ref<Offer>({
	code: '',
	name: '',
	imagesPaths: [],
	paymentOptions: [],
	price: 0,
	itens: [],
});
const orderStore = useOrderStore();

const personalDataForm = ref<HTMLFormElement>();
const deliveryDataForm = ref<HTMLFormElement>();
const paymentDataForm = ref<HTMLFormElement>();

provide('personalDataFormRef', personalDataForm);
provide('deliveryDataFormRef', deliveryDataForm);
provide('paymentDataFormRef', paymentDataForm);
// @ts-ignore
const { offer_code } = route.params;

onMounted(() => {
	getOffer();
});

// FUNCTIONS
async function getOffer() {
	appStore.loaderState = true;
	const response = await fetch(process.env.VITE_API_URL + `/offers/${offer_code}`, {
		method: 'GET',
	});
	if (response.ok) {
		const data = await response.json();
		offer.value = data;
	} else {
		alertStore.showAlert({
			icon: 'mdi-alert-circle',
			title: 'Erro',
			text: response.statusText,
			visible: true,
			type: 'error',
		});
		console.error(response);
	}
	appStore.loaderState = false;
}

async function finalizeOrder() {
	const isFormValid = await validateForms();
	if (isFormValid) {
		const bodyContent = {
			...orderStore.personalData,
			...orderStore.deliveryData,
			...orderStore.paymentData,
		};
		const response = await fetch(process.env.VITE_API_URL + `/offers/${offer_code}/create_order`, {
			method: 'POST',
			body: JSON.stringify(bodyContent),
		});

		if (response.ok) {
			orderStore.clearForms();
			const order = await response.json();
			router.push(`/thankyou/${order.orderCode}`);
		} else {
			alertStore.showAlert({
				icon: 'mdi-alert-circle',
				title: 'Erro',
				text: response.statusText,
				visible: true,
				type: 'error',
			});
			console.error(response);
		}
	} else {
		alertStore.showAlert({
			icon: 'mdi-alert',
			title: 'Dados inválidos',
			text: 'Preencha todos os campos',
			visible: true,
			type: 'warning',
		});
		console.log('dados inválidos');
	}
}

// Valida o formulário antes de passar para o próximo
async function next() {
	console.log(personalDataForm.value);

	switch (stepper.value) {
		case 0: {
			const result = await personalDataForm.value?.validate();
			result.valid ? stepper.value++ : console.log('Personal data não válido');
			break;
		}

		case 1: {
			const result = await deliveryDataForm.value?.validate();
			result.valid ? stepper.value++ : console.log('Delivery data não válido');
			break;
		}

		case 2: {
			const result = await paymentDataForm.value?.validate();
			result.valid ? stepper.value++ : console.log('payment data não válido');
			break;
		}
	}
}

async function validateForms() {
	const personalDataResult = await personalDataForm.value?.validate();
	const deliveryDataResult = await deliveryDataForm.value?.validate();
	const paymentDataResult = await paymentDataForm.value?.validate();
	if (personalDataResult.valid && deliveryDataResult.valid && paymentDataResult.valid) return true;
	return false;
}
</script>
