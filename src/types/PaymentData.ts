import PaymentOptions from './PaymentOptions';

export default interface PaymentData {
	paymentType: PaymentOptions;
	cardNumber?: string;
	cardOwnerName?: string;
	cardExpirationDate?: string;
	cardSecurityCode?: number | null;
	cpf: string;
}
