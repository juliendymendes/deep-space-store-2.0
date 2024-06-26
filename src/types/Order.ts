import DeliveryAddress from './DeliveryAddress';
import { Offer } from './Offer';
import PaymentData from './PaymentData';

import PersonalData from './PersonalData';

export interface Order {
	clientData: PersonalData;
	deliveryData: DeliveryAddress;
	paymentData: PaymentData;
}

export interface OrderCreated {
	orderCode: string;
	offer: Offer;
	clientData: PersonalData;
	paymentData: PaymentData;
	deliveryData: DeliveryAddress;
	paymentCodePath: string;
	paymentStatus: string;
}
