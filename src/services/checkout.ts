import { useAppStore } from '@/stores/app';
import { Order } from '@/types/Order';

async function createOrder(offer_code: string, order: Order) {
	const response = await fetch(`/offers/${offer_code}/create_order`, {
		method: 'POST',
		body: JSON.stringify(order),
	});

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		return new Error(response.statusText);
	}
}

async function getOrderByCode(order_code: string) {
	const appStore = useAppStore();
	appStore.loaderState = true;
	const response = await fetch(`/orders/${order_code}`, {
		method: 'GET',
	});
	if (response.ok) {
		const data = await response.json();
		appStore.loaderState = false;
		return data;
	} else {
		appStore.loaderState = false;
		return new Error(response.statusText);
	}
}

export const CheckoutService = {
	createOrder,
	getOrderByCode,
};
