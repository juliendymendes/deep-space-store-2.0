<!-- eslint-disable vue/valid-v-slot -->
<template>
	<v-container class="mt-15">
		<v-row class="mb-5">
			<v-col cols="12" md="6">
				<OfferInfo :offer="offer" />
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
import { Offer } from '@/types/Offer';

import { useAppStore } from '@/stores/app';
import { useAlertStore } from '@/stores/alertStore';
import OfferInfo from './components/offer/OfferInfo.vue';
import PaymentDataForm from './components/forms/PaymentDataForm.vue';
import PersonalDataForm from './components/forms/PersonalDataForm.vue';
import { useOrderStore } from '@/stores/orderStore';
import DeliveryDataForm from './components/forms/DeliveryDataForm.vue';
import { OfferService } from '@/services/offer';
import { CheckoutService } from '@/services/checkout';
import { Order } from '@/types/Order';

const stepper = ref(0);
const appStore = useAppStore();
const alertStore = useAlertStore();

const route = useRoute();
const router = useRouter();
const offer = ref<Offer>({
	code: '',
	product: {
		code: '',
		name: '',
		imagesPaths: [],
		paymentOptions: [],
		price: 0,
		itens: [],
	},
	price: 0,
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
	const response = await OfferService.getOfferByCode(offer_code);
	console.log(response);

	if (response instanceof Error) {
		console.log(response.message);
		alertStore.showAlert({
			icon: 'mdi-alert-circle',
			title: 'Erro',
			text: response.message,
			visible: true,
			type: 'error',
		});
	} else {
		offer.value = response;
		console.error(response);
	}
	appStore.loaderState = false;
}

async function finalizeOrder() {
	const isFormValid = await validateForms();
	if (isFormValid) {
		const bodyContent: Order = {
			clientData: orderStore.personalData,
			deliveryData: orderStore.deliveryData,
			paymentData: orderStore.paymentData,
		};
		const response = await CheckoutService.createOrder(offer_code, bodyContent);

		if (response instanceof Error) {
			alertStore.showAlert({
				icon: 'mdi-alert-circle',
				title: 'Erro',
				text: response.message,
				visible: true,
				type: 'error',
			});
		} else {
			orderStore.clearForms();
			const order = response;
			router.push(`/thankyou/${order.orderCode}`);
		}
	} else {
		alertStore.showAlert({
			icon: 'mdi-alert',
			title: 'Dados inválidos',
			text: 'Preencha todos os campos',
			visible: true,
			type: 'warning',
		});
	}
}

// Valida o formulário antes de passar para o próximo
async function next() {
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
