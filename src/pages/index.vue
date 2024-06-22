<!-- eslint-disable vue/valid-v-slot -->
<template>
	<v-container class="mt-15">
		<v-row>
			<v-col cols="12" md="6">
				<v-card>
					<v-carousel height="400" show-arrows="hover" hide-delimiter-background>
						<v-carousel-item v-for="i in slides" :key="i">
							<v-img aspect-ratio="16/9" cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
						</v-carousel-item>
					</v-carousel>
					<v-card-title class="text-h5 mt-5">Projetor de luz de galáxia em forma de astronauta</v-card-title>
					<v-card-subtitle>R$ 100,00</v-card-subtitle>
					<v-card-text>
						<p class="text-subtitle-1">Este item também acompanha:</p>
						<v-list :items="colors">
							<template v-slot:prepend>
								<v-icon>mdi-circle-small</v-icon>
							</template>
						</v-list>
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-stepper alt-labels editable color="primary" v-model="stepper">
					<v-stepper-header>
						<v-stepper-item title="Dados pessoais" value="1" complete editable> </v-stepper-item>

						<v-stepper-item title="Entrega" value="2" complete editable> </v-stepper-item>

						<v-stepper-item title="Pagamento" value="3" complete editable> </v-stepper-item>
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
									v-maska="'(##) ####-####'"
									v-model="personalData.phone"
									:rules="[rules.required]"
									label="Telefone"></v-text-field>
							</v-form>
						</v-stepper-window-item>

						<!-- DELIVERY DATA FORM -->
						<v-stepper-window-item value="2">
							<v-form ref="deliveryDataForm">
								<v-text-field
									v-maska="'#####-###'"
									v-model="deliveryData.cep"
									:rules="[rules.required]"
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
											:rules="[rules.required]"
											label="UF"></v-text-field>
									</v-col>
								</v-row>
								<v-text-field v-model="deliveryData.complemento" label="Complemento"></v-text-field>
							</v-form>
						</v-stepper-window-item>

						<!-- PAYMENT DATA FORM -->
						<v-stepper-window-item value="3">
							<v-radio-group v-model="paymentData.paymentType" inline>
								<v-radio color="primary" label="PIX" value="pix"></v-radio>
								<v-radio color="primary" label="Cartão de crédito" value="credito"></v-radio>
								<v-radio color="primary" label="Boleto" value="boleto"></v-radio>
							</v-radio-group>

							<v-form ref="paymentDataForm">
								<v-text-field
									v-model="paymentData.cpf"
									v-maska="'###.###.###-##'"
									:rules="[rules.required]"
									label="CPF"></v-text-field>

								<div v-if="paymentData.paymentType === 'credito'">
									<v-text-field
										v-maska="'####.####.####.####'"
										v-model="paymentData.cardNumber"
										:rules="[rules.required]"
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
												:rules="[rules.required]"
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
const stepper = ref(0);
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
});

const personalDataForm = ref<HTMLFormElement>();
const deliveryDataForm = ref<HTMLFormElement>();
const paymentDataForm = ref<HTMLFormElement>();

const colors = ref(['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4']);
const slides = ref(['First', 'Second', 'Third', 'Fourth', 'Fifth']);

async function finalizeOrder() {
	const valid = await validateForms();
	if (valid) {
		console.log('Personal data');
		console.log(personalData.value);
		console.log('Delivery data');
		console.log(deliveryData.value);
		console.log('Payment data');
		console.log(paymentData.value);
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
</script>
