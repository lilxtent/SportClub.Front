import Client from "./Client";

class Visit {
    public Client: Client;
    public Date: Date;

    constructor(
        client: Client,
        date: Date) {
        this.Client = client;
        this.Date = date;
    }

}

export default Visit;