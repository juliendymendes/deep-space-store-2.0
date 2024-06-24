//@ts-nocheck
import {
	validatePhone,
	validateCep,
	validateCpf,
	validateCardNumber,
	validateCardExpirationDate,
} from '../../../utils/validators';

describe('validatePhone', () => {
	it('should return true because it has 15 caracteres', () => {
		expect(validatePhone('(67) 99236-8745')).toBeTruthy();
	});

	it('should return false because it has less than 15 caracteres', () => {
		expect(validatePhone('(67) 99236-874')).toBeFalsy();
	});
	it('should return false because it has more than 15 caracteres', () => {
		expect(validatePhone('(67) 99236-87444')).toBeFalsy();
	});
	// falso positivo
	it('should return false because value is an empty string', () => {
		expect(validatePhone('')).toBeFalsy();
	});
	it('should return false because value is a string out of format (##) #####-####', () => {
		expect(validatePhone('3ufudk74;d74nf9')).toBeFalsy();
	});
});

describe('validateCep', () => {
	it('should return true because it has 9 caracteres', () => {
		expect(validateCep('79018-321')).toBeTruthy();
	});

	it('should return false because it has less than 9 caracteres', () => {
		expect(validateCep('79018-32')).toBeFalsy();
	});
	it('should return false because it has more than 9 caracteres', () => {
		expect(validateCep('79018-3213')).toBeFalsy();
	});
	// falso positivo
	it('should return false because value is an empty string', () => {
		expect(validateCep('')).toBeFalsy();
	});
	it('should return false because value is a string out of format #####-###', () => {
		expect(validateCep('abc123def')).toBeFalsy();
	});
});

describe('validateCpf', () => {
	it('should return true because it has 14 caracteres', () => {
		expect(validateCpf('321.432.342-23')).toBeTruthy();
	});

	it('should return false because it has less than 14 caracteres', () => {
		expect(validateCpf('321.432.342-2')).toBeFalsy();
	});
	it('should return false because it has more than 14 caracteres', () => {
		expect(validateCpf('321.432.342-234')).toBeFalsy();
	});
	// falso positivo
	it('should return false because value is an empty string', () => {
		expect(validateCpf('')).toBeFalsy();
	});
	it('should return false because value is a string out of format ###.###.###-##', () => {
		expect(validateCpf('abc123defr4rt5')).toBeFalsy();
	});
});

describe('validateCardNumber', () => {
	it('should return true because it has 19 caracteres', () => {
		expect(validateCardNumber('3214.4324.3424.4345')).toBeTruthy();
	});

	it('should return false because it has less than 19 caracteres', () => {
		expect(validateCardNumber('3214.4324.3424.434')).toBeFalsy();
	});
	it('should return false because it has more than 19 caracteres', () => {
		expect(validateCardNumber('3214.4324.3424.43453')).toBeFalsy();
	});
	// falso positivo
	it('should return false because value is an empty string', () => {
		expect(validateCardNumber('')).toBeFalsy();
	});
	it('should return false because value is a string out of format ####.####.####.####', () => {
		expect(validateCardNumber('3ufudk74;d74nf9r45y')).toBeFalsy();
	});
});

describe('validateCardExpirationDate', () => {
	const today = new Date();
	const currentMonth = today.getMonth() + 1;
	const currentYear = today.getFullYear();
	it('should return true because date is superior than the current date', () => {
		expect(validateCardExpirationDate(`${currentMonth + 1}/${currentYear}`)).toBeTruthy();
	});

	it('should return true because date is equal to the current date', () => {
		expect(validateCardExpirationDate(`${currentMonth}/${currentYear}`)).toBeTruthy();
	});
	it('should return false because date is inferior than the current date', () => {
		expect(validateCardExpirationDate(`${currentMonth - 1}/${currentYear}`)).toBeFalsy();
	});
	it('should return false because date is null', () => {
		expect(validateCardExpirationDate(null)).toBeFalsy();
	});
	//falso positivo
	it('should return false because date is a empty string', () => {
		expect(validateCardExpirationDate('')).toBeFalsy();
	});
	// falso positivo
	it('should return false because date format is invalid', () => {
		expect(validateCardExpirationDate('12/ab')).toBeFalsy();
	});
});
