class Visit {
    public VisitorSurname: string;
    public VisitorName: string;
    public VisitorPatronymic: string;
    public Date: Date;

    constructor(
        visitorSurname: string,
        visitorName: string,
        visitorPatronymic: string,
        date: Date) {
        this.VisitorSurname = visitorSurname;
        this.VisitorName = visitorName;
        this.VisitorPatronymic = visitorPatronymic;
        this.Date = date;
    }

}

export default Visit;