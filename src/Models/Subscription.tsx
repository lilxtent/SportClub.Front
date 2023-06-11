export class Subscription {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public daysLong: number,
        public description?: string | null
    ) {
    }
}