export function validatePhone(phone: string) {
	return phone.length === 15;
}

export function validateCep(cep: string) {
	return cep.length === 9;
}

export function validateCardExpirationDate(date: string) {
	const [month, year] = date.split('/');
	const monthNum = parseInt(month);
	const yearNum = parseInt(year);
	if (monthNum > 12 || monthNum < 0) return false;

	const today = new Date();
	const currentMonth = today.getMonth() + 1;
	const currentYear = today.getFullYear();

	if (monthNum >= currentMonth && yearNum >= currentYear) {
		return true;
	} else if (monthNum < currentMonth && yearNum > currentYear) {
		return true;
	}

	return false;
}

export function validateCpf(cpf: string) {
	return cpf.length === 14;
}

export function validateCardNumber(cardNumber: string) {
	return cardNumber.length === 19;
}
