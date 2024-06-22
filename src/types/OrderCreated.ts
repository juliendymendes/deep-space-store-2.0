import Offer from './Offer';
import PaymentOptions from './PaymentOptions';

export default interface OrderCreated {
	orderCode: string;
	offer: Offer;
	name: string;
	email?: string;
	phone: string;
	paymentType: PaymentOptions;
	cardNumber?: string;
	cardOwnerName?: string;
	cardExpirationDate?: string;
	cardSecurityCode?: number;
	cpf: string;
	bairro: string;
	cep: string;
	complemento: string;
	localidade: string;
	logradouro: string;
	uf: string;
	numero: number;
	paymentCodePath: string;
	paymentStatus: string;
}
