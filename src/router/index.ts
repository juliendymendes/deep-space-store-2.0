/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/index.vue';
import Checkout from '@/pages/checkout/index.vue';
import Thankyou from '@/pages/thankyou/index.vue';
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/:offer_code',
			name: 'checkout',
			component: Checkout,
		},
		{
			path: '/thankyou/:order_code',
			name: 'thankyou',
			component: Thankyou,
		},
	],
});

export default router;
