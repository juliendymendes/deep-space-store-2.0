<!-- eslint-disable vue/valid-v-slot -->
<template>
	<v-container class="mt-15">
		<v-row class="mb-5">
			<v-col cols="12" md="6">
				<v-card>
					<v-carousel height="400" touch show-arrows="hover" hide-delimiter-background>
						<v-carousel-item v-for="i in offer?.imagesPaths" :key="i">
							<v-img aspect-ratio="16/9" cover :src="i"></v-img>
						</v-carousel-item>
					</v-carousel>
					<v-card-title class="text-h5 mt-5">{{ offer?.name }}</v-card-title>
					<v-card-subtitle>R$ {{ offer?.price.toLocaleString() }}</v-card-subtitle>
					<v-card-text>
						<p class="text-subtitle-1">Este item também acompanha:</p>
						<v-list :items="offer?.itens">
							<template v-slot:prepend>
								<v-icon icon="mdi mdi-circle-small"></v-icon>
							</template>
						</v-list>
					</v-card-text>
					<div class="ma-4 mt-0">
						<p class="text-subtitle-1 mb-4">Formas de pagamento</p>
						<v-chip color="primary me-3" v-for="item in paymentOptions" :key="item">
							{{ item }}
						</v-chip>
					</div>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-stepper alt-labels color="primary" v-model="stepper">
					<v-stepper-header>
						<v-stepper-item title="Dados pessoais" value="1" complete> </v-stepper-item>

						<v-stepper-item title="Entrega" value="2" complete> </v-stepper-item>

						<v-stepper-item title="Pagamento" value="3" complete> </v-stepper-item>
					</v-stepper-header>

					<v-stepper-window v-model="stepper">
						<!-- PERSONAL DATA FORM -->
						<v-stepper-window-item value="1">
							<v-form ref="personalDataForm">
								<v-text-field
									v-model="personalData.name"
									:rules="[rules.required]"
									label="Nome completo"></v-text-field>

								<v-text-field
									type="email"
									v-model="personalData.email"
									:rules="[rules.email]"
									label="Email"></v-text-field>
								<v-text-field
									v-maska="'(##) #####-####'"
									v-model="personalData.phone"
									:rules="[rules.required, rules.phone]"
									label="Telefone"></v-text-field>
							</v-form>
						</v-stepper-window-item>

						<!-- DELIVERY DATA FORM -->
						<v-stepper-window-item value="2">
							<v-form ref="deliveryDataForm">
								<v-text-field
									v-maska="'#####-###'"
									v-model="deliveryData.cep"
									:rules="[rules.required, rules.cep]"
									label="CEP"
									@change="() => searchAddressByCep(deliveryData.cep)"></v-text-field>

								<v-row>
									<v-col cols="12" sm="8">
										<v-text-field
											v-model="deliveryData.logradouro"
											:rules="[rules.required]"
											label="Rua"></v-text-field>
									</v-col>
									<v-col cols="12" sm="4">
										<v-text-field v-model="deliveryData.numero" :rules="[rules.required]" label="Número"></v-text-field>
									</v-col>
								</v-row>
								<v-text-field v-model="deliveryData.bairro" :rules="[rules.required]" label="Bairro"></v-text-field>
								<v-row>
									<v-col cols="12" sm="8">
										<v-text-field
											v-model="deliveryData.localidade"
											:rules="[rules.required]"
											label="Cidade"></v-text-field>
									</v-col>
									<v-col cols="12" sm="4">
										<v-text-field
											v-model="deliveryData.uf"
											v-maska="'@@'"
											:rules="[rules.required, rules.uf]"
											label="UF"></v-text-field>
									</v-col>
								</v-row>
								<v-text-field v-model="deliveryData.complemento" label="Complemento"></v-text-field>
							</v-form>
						</v-stepper-window-item>

						<!-- PAYMENT DATA FORM -->
						<v-stepper-window-item value="3">
							<v-radio-group v-model="paymentData.paymentType" inline>
								<v-radio color="primary" label="PIX" value="pix" @click="clearCreditCardData"></v-radio>
								<v-radio color="primary" label="Cartão de crédito" value="credito"></v-radio>
								<v-radio color="primary" label="Boleto" value="boleto" @click="clearCreditCardData"></v-radio>
							</v-radio-group>

							<v-form ref="paymentDataForm">
								<v-text-field
									v-model="paymentData.cpf"
									v-maska="'###.###.###-##'"
									:rules="[rules.required, rules.cpf]"
									label="CPF"></v-text-field>

								<div v-if="paymentData.paymentType === 'credito'">
									<v-text-field
										v-maska="'####.####.####.####'"
										v-model="paymentData.cardNumber"
										:rules="[rules.required, rules.cardNumber]"
										label="Número do cartão"></v-text-field>

									<v-text-field
										v-model="paymentData.cardOwnerName"
										:rules="[rules.required]"
										label="Nome no cartão"></v-text-field>

									<v-row>
										<v-col cols="12" sm="8">
											<v-text-field
												v-model="paymentData.cardExpirationDate"
												v-maska="'##/####'"
												:rules="[rules.required, rules.cardExpirationDate]"
												label="Data de validade"></v-text-field>
										</v-col>
										<v-col cols="12" sm="4">
											<v-text-field
												type="number"
												v-model="paymentData.cardSecurityCode"
												:rules="[rules.required]"
												label="CVV"></v-text-field>
										</v-col>
									</v-row>
								</div>
								<v-row>
									<v-col cols="12" class="d-flex justify-end">
										<v-btn color="primary" @click="finalizeOrder">Finalizar pedido</v-btn>
									</v-col>
								</v-row>
							</v-form>
						</v-stepper-window-item>
					</v-stepper-window>
					<v-stepper-actions next-text="Próximo" prev-text="Anterior" @click:next="next" @click:prev="stepper--">
					</v-stepper-actions>
				</v-stepper>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
import DeliveryAddress from '@/types/DeliveryAddress';
import PaymentData from '@/types/PaymentData';
import PersonalData from '@/types/PersonalData';
import { ref } from 'vue';
import { vMaska } from 'maska/vue';
import Offer from '@/types/Offer';
const stepper = ref(0);
const route = useRoute();
const router = useRouter();
const offer = ref<Offer | null>(null);
const personalData = ref<PersonalData>({
	name: '',
	email: '',
	phone: '',
});

const deliveryData = ref<DeliveryAddress>({
	cep: '',
	logradouro: '',
	numero: null,
	bairro: '',
	localidade: '',
	uf: '',
	complemento: '',
});

const paymentData = ref<PaymentData>({
	paymentType: 'pix',
	cpf: '',
});

const rules = ref({
	required: (value: string) => {
		if (value) return true;
		return 'Campo obrigatório.';
	},
	email: (value: string) => {
		if (value) {
			const pattern =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return pattern.test(value) || 'E-mail inválido';
		}
	},
	cardExpirationDate: (value: string) => {
		if (validateCardExpirationDate(value)) return true;
		return 'Data de validade inválida';
	},
	cpf: (value: string) => validateCpf(value) || 'CPF inválido',
	cep: (value: string) => validateCep(value) || 'CEP inválido',
	cardNumber: (value: string) => validateCardNumber(value) || 'Número do cartão inválido',
	phone: (value: string) => validatePhone(value) || 'Número de telefone inválido',
	uf: (value: string) => value.length === 2 || 'UF precisa conter 2 caracteres',
});

const personalDataForm = ref<HTMLFormElement>();
const deliveryDataForm = ref<HTMLFormElement>();
const paymentDataForm = ref<HTMLFormElement>();

// @ts-ignore
const { offer_code } = route.params;

onMounted(() => {
	getOffer();
});

const paymentOptions = computed(() => {
	const options: string[] = [];
	offer.value?.paymentOptions.map((opt) => {
		switch (opt) {
			case 'boleto':
				options.push('Boleto');
				break;
			case 'credito':
				options.push('Cartão de crédito');
				break;
			case 'pix':
				options.push('PIX');
				break;
		}
		return true;
	});

	return options;
});
// FUNCTIONS
async function getOffer() {
	const response = await fetch(`/offers/${offer_code}`, {
		method: 'GET',
	});
	if (response.ok) {
		const data = await response.json();
		offer.value = data;
	} else {
		console.error(response);
	}
}

async function finalizeOrder() {
	const isFormValid = await validateForms();
	if (isFormValid) {
		const bodyContent = {
			...personalData.value,
			...deliveryData.value,
			...paymentData.value,
		};
		const response = await fetch(`/offers/${offer_code}/create_order`, {
			method: 'POST',
			body: JSON.stringify(bodyContent),
		});

		if (response.ok) {
			const order = await response.json();
			router.push(`/thankyou/${order.orderCode}`);
		} else {
			console.error(response);
		}
	} else {
		console.log('dados inválidos');
	}
}

// Valida o formulário antes de passar para o próximo
async function next() {
	switch (stepper.value) {
		case 0: {
			const result = await personalDataForm.value?.validate();
			result.valid ? stepper.value++ : console.log('Personal data não válido');
			break;
		}

		case 1: {
			const result = await deliveryDataForm.value?.validate();
			result.valid ? stepper.value++ : console.log('Delivery data não válido');
			break;
		}

		case 2: {
			const result = await paymentDataForm.value?.validate();
			result.valid ? stepper.value++ : console.log('payment data não válido');
			break;
		}
	}
}

async function validateForms() {
	const personalDataResult = await personalDataForm.value?.validate();
	const deliveryDataResult = await deliveryDataForm.value?.validate();
	const paymentDataResult = await paymentDataForm.value?.validate();
	if (personalDataResult.valid && deliveryDataResult.valid && paymentDataResult.valid) return true;
	return false;
}

function searchAddressByCep(value: string) {
	if (/^(\d{5}-\d{3})$/.test(value)) {
		fetch(`https://viacep.com.br/ws/${value}/json/`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				console.log(data);
				deliveryData.value.bairro = data.bairro;
				deliveryData.value.cep = data.cep;
				deliveryData.value.logradouro = data.logradouro;
				deliveryData.value.localidade = data.localidade;
				deliveryData.value.uf = data.uf;
			});
	} else {
		console.log('CEP inválido');
	}
}

function clearCreditCardData() {
	paymentData.value.cardExpirationDate = '';
	paymentData.value.cardNumber = '';
	paymentData.value.cardOwnerName = '';
	paymentData.value.cardSecurityCode = null;
}

function validateCardExpirationDate(date: string) {
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

function validateCpf(cpf: string) {
	return cpf.length === 14;
}

function validateCep(cep: string) {
	return cep.length === 9;
}

function validateCardNumber(cardNumber: string) {
	return cardNumber.length === 19;
}
function validatePhone(phone: string) {
	return phone.length === 15;
}
</script>
