/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

async function enableMocking() {
	const { worker } = await import('./mocks/browser');

	return worker.start();
}

enableMocking().then(() => {
	const app = createApp(App);

	registerPlugins(app);
	app.mount('#app');
});
