import fetch from "node-fetch";
import Visit from "../Models/Visit";

export class VisitsService {
    static BasePath = "http://localhost:5000/visits/";

    public static async GetVisits(skip: number, take: number): Promise<GetVisitsResponse> {
        const response = await fetch(
            `${this.BasePath}last?skip=${skip}&take=${take}`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json'
                }
            });

        return (await response.json()) as GetVisitsResponse;
    }
}

interface GetVisitsResponse {
    visits: Visit[];
    totalVisitsCount: number;
}