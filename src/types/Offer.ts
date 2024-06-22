import PaymentOptions from './PaymentOptions';

export default interface Offer {
	code: string;
	name: string;
	price: number;
	itens?: string[];
	paymentOptions: PaymentOptions[];
	imagesPaths: string[];
}
