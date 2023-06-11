export class Payment {
    constructor(
        public id: number,
        public clientId: string,
        public subscriptionId : string,
        public paymentDate: string,
        public subscriptionStartTime: string,
        public subscriptionEndTime: string,
        public paymentAmount: number
    ) {
    }
}