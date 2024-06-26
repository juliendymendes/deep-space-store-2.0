import PaymentOptions from './PaymentOptions';

export interface Product {
	code: string;
	name: string;
	price: number;
	itens?: string[];
	paymentOptions: PaymentOptions[];
	imagesPaths: string[];
}

export interface Offer {
	code: string;
	product: Product;
	price: number;
}
