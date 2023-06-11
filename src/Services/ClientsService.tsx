import Client from "../Models/Client";
import fetch from 'node-fetch';
import {SearchClientsRequest} from "./Requests/SearchClientsRequest";


class ClientsService {
    static BasePath = "http://localhost:5000/clients/";

    public static async GetClient(id: string): Promise<Client> {
        const response = await fetch(
            `${this.BasePath}${id}`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                }
            });

        return (await response.json()) as Client;
    }

    public static async GetClients(skip: number, take: number): Promise<GetClientsResponse> {
        const response = await fetch(
            `${this.BasePath}?skip=${skip}&take=${take}`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                }
            });

        return (await response.json()) as GetClientsResponse;
    }

    public static async SearchClients(request: SearchClientsRequest): Promise<SearchClientsResponse> {
        const response = await fetch(
            `${this.BasePath}search/?like=${request.like}`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                }
            });

        return (await response.json()) as SearchClientsResponse;
    }

    public static async AddClient(client: Client) {
        await fetch(
            `${this.BasePath}add`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(client)
            });
    }

    public static async UpdateClient(client: Client) {
        await fetch(
            `${this.BasePath}update`,
            {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(client)
            });
    }
}

interface GetClientsResponse {
    clients: Client[];
    totalCount: number;
}

interface SearchClientsResponse {
    clients: Client[];
    totalCount: number;
}

export default ClientsService;