// @ts-nocheck
import { mount } from '@vue/test-utils';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { expect, it, vi, beforeAll, afterAll, afterEach, describe } from 'vitest';
import { createVuetify } from 'vuetify';
import { createTestingPinia } from '@pinia/testing';

import Checkout from '@/pages/checkout/index.vue';
import { handlers } from '@/mocks/handlers';
import { setupServer } from 'msw/node';
import { useOrderStore } from '@/stores/orderStore';
import { useAlertStore } from '@/stores/alertStore';

// Vuetify config
const vuetify = createVuetify({
	components,
	directives,
});
global.ResizeObserver = require('resize-observer-polyfill');
const server = setupServer(...handlers);

// Component mocks
const OfferCard = { template: '<div>Offer Card</div>' };
const PersonalDataForm = {
	template: '<form ref="personalDataForm"></form>',
};
const DeliveryDataForm = {
	template: '<form ref="deliveryDataForm"></form>',
};
const PaymentDataForm = {
	template: '<form ref="paymentDataForm"></form>',
};

// Router mock
vi.mock('vue-router', () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(() => ({
		push: () => {},
	})),
}));

describe('[offer_code].vue', () => {
	beforeAll(() => {
		// Initiate msw server
		server.listen();
		vi.clearAllMocks();
	});

	afterAll(() => server.close());

	afterEach(() => server.resetHandlers());

	it('should fill form inputs and clicks finalizar pedido button', async () => {
		// Implement useRoute mocks
		useRoute.mockImplementationOnce(() => ({
			params: {
				offer_code: 'SMART101',
			},
		}));

		// Implement useRoute mocks
		const push = vi.fn();
		useRouter.mockImplementationOnce(() => ({
			push,
		}));
		// Mount component
		const wrapper = mount(Checkout, {
			components: { OfferCard, PersonalDataForm, DeliveryDataForm, PaymentDataForm },
			global: {
				plugins: [vuetify, createTestingPinia()],
			},
		});
		const orderStore = useOrderStore();
		const alertStore = useAlertStore();

		const finalizeOrderMock = vi.spyOn(wrapper.vm, 'finalizeOrder');

		// Fill form inputs
		wrapper.vm.stepper = 0;
		await wrapper.vm.$nextTick();
		await wrapper.find('#name').setValue('Juliendy Mendes');
		await wrapper.find('#email').setValue('juliendy@mail.com');
		await wrapper.find('#phone').setValue('(34) 99236-4632');
		wrapper.vm.stepper = 1;
		await wrapper.vm.$nextTick();
		await wrapper.find('#cep').setValue('79070-120');
		await wrapper.find('#street').setValue('Rua Joaquim Alves Pereira');
		await wrapper.find('#number').setValue(32);
		await wrapper.find('#neighborhood').setValue('Pioneiros');
		await wrapper.find('#city').setValue('Campo Grande');
		await wrapper.find('#state').setValue('MS');
		await wrapper.find('#complement').setValue('Casa');
		wrapper.vm.stepper = 2;
		await wrapper.vm.$nextTick();
		await wrapper.find('input[type=radio][value=pix]').setValue();
		await wrapper.find('#cpf').setValue('324.533.625-23');

		await wrapper.get('#finalizeOrder').trigger('click');
		await new Promise((resolve) => setTimeout(resolve, 3000)); // wait 3 seconds for fetch to run

		expect(finalizeOrderMock).toHaveBeenCalled();
		expect(alertStore.showAlert).not.toHaveBeenCalled();
		expect(orderStore.clearForms).toHaveBeenCalled();
		expect(push).toHaveBeenCalled();
	});
});
