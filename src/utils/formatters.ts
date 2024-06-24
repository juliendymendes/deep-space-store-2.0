export const formatPrice = (value: number) => {
	if (value) return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};
