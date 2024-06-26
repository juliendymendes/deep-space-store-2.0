import DeliveryAddress from '@/types/DeliveryAddress';
import PaymentData from '@/types/PaymentData';
import PersonalData from '@/types/PersonalData';
import { defineStore } from 'pinia';

let personalData: PersonalData = {
	name: '',
	email: '',
	phone: '',
};

let deliveryData: DeliveryAddress = {
	cep: '',
	logradouro: '',
	numero: null,
	bairro: '',
	localidade: '',
	uf: '',
	complemento: '',
};

let paymentData: PaymentData = {
	paymentType: 'pix',
	cpf: '',
};
export const useOrderStore = defineStore('order', {
	state: () => ({
		personalData,
		deliveryData,
		paymentData,
		personalDataRef: ref(),
	}),
	actions: {
		clearForms() {
			personalData = {
				name: '',
				email: '',
				phone: '',
			};
			deliveryData = {
				cep: '',
				logradouro: '',
				numero: null,
				bairro: '',
				localidade: '',
				uf: '',
				complemento: '',
			};
			paymentData = {
				paymentType: 'pix',
				cpf: '',
			};
		},
	},
});
