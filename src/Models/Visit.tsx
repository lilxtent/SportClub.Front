import Client from "./Client";

class Visit {
    constructor(
        public client: Client,
        public dateTime: string
    ) {
    }

}

export default Visit;