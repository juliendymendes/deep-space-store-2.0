export default interface DeliveryAddress {
	bairro: string;
	cep: string;
	complemento: string;
	localidade: string;
	logradouro: string;
	uf: string;
	numero: number | null;
}
