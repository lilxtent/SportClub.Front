class Client {
    public Id: string;
    public Surname: string;
    public Name: string;
    public Patronymic: string;
    public BirthDate: Date;

    constructor(
        id: string,
        surname: string,
        name: string,
        patronymic: string,
        birthDate: Date
    ) {
        this.Id = id;
        this.Surname = surname;
        this.Name = name;
        this.Patronymic = patronymic;
        this.BirthDate = birthDate;
    }
}

export default Client;