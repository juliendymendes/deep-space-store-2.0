import Offer from '@/types/Offer';
import OrderResquest from '@/types/OrderCreated';

import { http, HttpResponse } from 'msw';

const allOffers = new Map<number, Offer>([
	[
		1,
		{
			code: 1,
			name: 'Projetor de luz de galáxia em forma de astronauta',
			price: 88,
			itens: ['Carregador', 'Suporte'],
			paymentOptions: ['pix', 'credito', 'boleto'],
			imagesPaths: ['/projetor/image1.jpg', '/projetor/image2.jpg', '/projetor/image3.jpg'],
		},
	],
]);
const allOrders = new Map();

export const handlers = [
	http.get('/offers/:offerCode', ({ params }) => {
		const { offerCode } = params;

		const offer = allOffers.get(Number(offerCode));

		if (!offer) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Oferta não encontrada.',
			});
		}
		return HttpResponse.json(offer);
	}),

	http.post('/offers/:offerCode/create_order', async ({ request, params }) => {
		const newOrder = (await request.json()) as OrderResquest;
		if (newOrder.cpf === '00000000000') {
			return HttpResponse.json(null, { status: 400, statusText: 'CPF incorreto. Por favor, tente novamente.' });
		}

		const { offerCode } = params;
		const id = Math.floor(Math.random() * 1000); // TODO change for uuid when possible
		newOrder.orderCode = id;
		const offer = allOffers.get(Number(offerCode));
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
