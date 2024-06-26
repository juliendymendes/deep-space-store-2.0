import { useAppStore } from '@/stores/app';

async function getOfferByCode(product_code: string) {
	const appStore = useAppStore();
	appStore.loaderState = true;
	const response = await fetch(`/offers/${product_code}`, {
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

export const OfferService = { getOfferByCode };
