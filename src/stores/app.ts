// Utilities
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
	state: () => ({
		loaderState: false,
	}),
});
