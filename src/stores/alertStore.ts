import { AlertOptions } from '@/types/AlertOptions';
import { defineStore } from 'pinia';

const options: AlertOptions = {
	icon: '',
	text: '',
	title: '',
	type: 'error',
	visible: false,
};
export const useAlertStore = defineStore('alert', {
	state: () => ({
		options,
	}),
	actions: {
		showAlert(options: AlertOptions) {
			this.options = options;
			setTimeout(() => {
				this.options = {
					icon: '',
					text: '',
					title: '',
					type: 'error',
					visible: false,
				};
			}, 2000);
		},
	},
});
