import Client from "./Client";
import {Subscription} from "./Subscription";

export class PaymentFullInfo {
    constructor(
        public id: number,
        public client: Client,
        public subscription: Subscription,
        public paymentDate: string,
        public subscriptionStartTime: string,
        public subscriptionEndTime: string,
        public paymentAmount: number
    ) {
    }
}