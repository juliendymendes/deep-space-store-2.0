import { Offer } from '@/types/Offer';
import { OrderCreated } from '@/types/Order';

import { http, HttpResponse } from 'msw';

const allOffers: Offer[] = [
	{
		code: 'SMART101',
		price: 1199,
		product: {
			code: 'SMART5',
			name: 'Smartwatch Galaxy Watch5 Pro 45mm Bluetooth - Preto',
			price: 1999,
			paymentOptions: ['pix', 'credito', 'boleto'],
			itens: [
				'Smartwatch Galaxy Watch5 Pro 45mm Bluetooth - Preto',
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
	},
	{
		code: 'PRO123',
		price: 4999,
		product: {
			code: 'SMART23',
			name: 'Smartphone Galaxy S23 Ultra 5G 12GB/512GB',
			price: 5999,
			paymentOptions: ['pix', 'credito', 'boleto'],
			itens: ['Cabo de carregamento', 'Manual do usuário', 'Certificado de garantia'],
			imagesPaths: [
				'https://samsungbrshop.vtexassets.com/arquivos/ids/219667-600-auto?v=638514816133800000&width=600&height=auto&aspect=true',
				'https://samsungbrshop.vtexassets.com/arquivos/ids/219671-600-auto?v=638514816211870000&width=600&height=auto&aspect=true',
			],
		},
	},
	{
		code: 'NOTE234',
		price: 3999,
		product: {
			code: 'NOT5',
			name: 'Notebook Gamer Acer Nitro 5 i5-12500H 8GB/512GB GTX 1650',
			price: 4999,
			paymentOptions: ['pix', 'credito', 'boleto'],
			itens: ['Cabo de carregamento', 'Manual do usuário', 'Certificado de garantia'],
			imagesPaths: [
				'https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/214619',
				'https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/214573',
				'https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/214595',
			],
		},
	},
	{
		code: 'TV345',
		price: 2399,
		product: {
			code: 'TVLG4',
			name: 'Smart TV LG 55UQ7500 4K UHD',
			price: 2999,
			paymentOptions: ['pix', 'credito', 'boleto'],
			itens: ['Manual do usuário', 'Certificado de garantia'],
			imagesPaths: [
				'https://a-static.mlcdn.com.br/1500x1500/smart-tv-55-4k-led-lg-55uq8050-ai-processor-wi-fi-bluetooth-hdr-alexa-google-assistente-3-hdmi/magazineluiza/235289100/26b1e287394afb128b066623960168b0.jpg',
				'https://a-static.mlcdn.com.br/1500x1500/smart-tv-55-4k-led-lg-55uq8050-ai-processor-wi-fi-bluetooth-hdr-alexa-google-assistente-3-hdmi/magazineluiza/235289100/5ef8c1fcbe4b2dc258522aba2b938423.jpg',
			],
		},
	},
];

const allOrders = new Map<string, OrderCreated>();

export const handlers = [
	// Return an offer by code
	http.get('/offers/:offerCode', ({ params }) => {
		const { offerCode } = params;

		const offer = allOffers.find((offer) => offer.code === offerCode.toString());

		if (!offer) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Oferta não encontrada.',
			});
		}
		return HttpResponse.json(offer);
	}),

	// Return all offers
	http.get('/offers', () => {
		return HttpResponse.json(allOffers);
	}),

	// Return new product
	http.get('/newProduct', () => {
		return HttpResponse.json({ offer_code: allOffers[1].code, product: allOffers[1].product });
	}),

	// Create an order
	http.post('/offers/:offerCode/create_order', async ({ request, params }) => {
		const newOrder = (await request.json()) as OrderCreated;
		if (newOrder.paymentData.cpf === '00000000000' || newOrder.paymentData.cpf === '000.000.000-00') {
			return HttpResponse.json(null, { status: 400, statusText: 'CPF incorreto. Por favor, tente novamente.' });
		}

		const { offerCode } = params;
		const id = self.crypto.randomUUID();
		newOrder.orderCode = id;
		const offer = allOffers.find((offer) => offer.code === offerCode);
		newOrder.offer = offer!;

		switch (newOrder.paymentData.paymentType) {
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

		allOrders.set(newOrder.orderCode, newOrder);
		return HttpResponse.json(newOrder, {
			status: 201,
			statusText: 'Pedido realizado com sucesso!',
		});
	}),

	// Return an order by code
	http.get('/orders/:orderCode', ({ params }) => {
		const { orderCode } = params;

		const order = allOrders.get(orderCode.toString());

		if (!order) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Pedido não encontrado.',
			});
		}
		return HttpResponse.json(order);
	}),
];
