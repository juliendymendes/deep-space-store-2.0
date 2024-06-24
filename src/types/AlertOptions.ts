export interface AlertOptions {
	icon: string;
	title: string;
	text: string;
	type: 'success' | 'info' | 'warning' | 'error';
	visible: boolean;
}
