class Visit {
    public VisitorName: string
    public Date: Date

    constructor(
        visitorName: string,
        date: Date) {
        this.VisitorName = visitorName;
        this.Date = date;
    }

}

export default Visit;