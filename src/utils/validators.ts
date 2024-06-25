export function validatePhone(phone: string) {
	const regex = /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}-[0-9]{4}$/i;

	if (phone != '' && phone && regex.test(phone)) return true;
	return false;
}

export function validateCep(cep: string) {
	const regex = /^\d{5}-\d{3}$/i;

	if (cep != '' && cep && regex.test(cep)) return true;
	return false;
}

export function validateCardExpirationDate(date: string) {
	if (date != '' && date) {
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
	return false;
}

export function validateCpf(cpf: string) {
	const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
	if (cpf != '' && cpf && regex.test(cpf)) return true;
	return false;
}

export function validateCardNumber(cardNumber: string) {
	const regex = /^\d{4}\.\d{4}\.\d{4}\.\d{4}$/;
	if (cardNumber != '' && cardNumber && regex.test(cardNumber)) return true;
	return false;
}
