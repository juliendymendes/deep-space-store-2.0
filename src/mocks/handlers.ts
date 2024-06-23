import Offer from '@/types/Offer';
import OrderResquest from '@/types/OrderCreated';

import { http, HttpResponse } from 'msw';

const allOffers = new Map<string, Offer>([
	[
		'KITGAMER20',
		{
			code: 'KITGAMER20',
			name: 'Kit Gamer Completo com Teclado, Mouse, Mousepad e Headset',
			price: 499.9,
			itens: [
				'Teclado Gamer Mecânico RGB',
				'Mouse Gamer com 6 botões',
				'Mousepad Gamer XXL',
				'Headset Gamer com Microfone',
			],
			paymentOptions: ['pix', 'credito', 'boleto'],
			imagesPaths: [
				'https://images.unsplash.com/photo-1626155399627-86488538895d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				'https://images.unsplash.com/photo-1600186279172-fdbaefd74383?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			],
		},
	],

	[
		'SMART101',
		{
			code: 'SMART101',
			name: 'Smartwatch Galaxy Watch5 Pro 45mm Bluetooth - Preto',
			price: 1999,
			paymentOptions: ['pix', 'credito', 'boleto'],
			itens: [
				' Smartwatch Galaxy Watch5 Pro 45mm Bluetooth - Preto',
				'Cabo de carregamento magnético',
				'Manual do usuário',
				'Certificado de garantia',
			],
			imagesPaths: [
				'https://samsungbrshop.vtexassets.com/arquivos/ids/200624-800-auto?v=638053310665170000&width=800&height=auto&aspect=true',
				'https://samsungbrshop.vtexassets.com/arquivos/ids/200625-800-auto?v=638053310765070000&width=800&height=auto&aspect=true',
				'https://samsungbrshop.vtexassets.com/arquivos/ids/200626-800-auto?v=638053310852970000&width=800&height=auto&aspect=true',
			],
		},
	],
]);
const allOrders = new Map();

export const handlers = [
	// Return an offer by code
	http.get('/offers/:offerCode', ({ params }) => {
		const { offerCode } = params;

		const offer = allOffers.get(offerCode.toString());

		if (!offer) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Oferta não encontrada.',
			});
		}
		return HttpResponse.json(offer);
	}),

	// Create an order
	http.post('/offers/:offerCode/create_order', async ({ request, params }) => {
		const newOrder = (await request.json()) as OrderResquest;
		if (newOrder.cpf === '00000000000' || newOrder.cpf === '000.000.000-00') {
			return HttpResponse.json(null, { status: 400, statusText: 'CPF incorreto. Por favor, tente novamente.' });
		}

		const { offerCode } = params;
		const id = self.crypto.randomUUID(); // TODO change for uuid when possible
		newOrder.orderCode = id;
		const offer = allOffers.get(offerCode.toString());
		newOrder.offer = offer!;

		switch (newOrder.paymentType) {
			case 'pix':
				newOrder.paymentCodePath = '/qr_code.jpg';
				break;
			case 'credito':
				newOrder.paymentStatus = 'Pagamento bem sucedido!';
				break;
			case 'boleto':
				newOrder.paymentCodePath = '/barcode.png';
				break;
		}

		allOrders.set(offerCode, newOrder);
		return HttpResponse.json(newOrder, {
			status: 201,
			statusText: 'Pedido realizado com sucesso!',
		});
	}),
];
