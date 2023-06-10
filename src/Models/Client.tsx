class Client {
    constructor(
        public id: string,
        public surname: string,
        public name: string,
        public patronymic: string,
        public birthDate: string,
        public phone: string | null
    ) {}
}

export default Client;