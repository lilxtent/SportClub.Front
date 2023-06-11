import fetch from "node-fetch";
import {PaymentFullInfo} from "../Models/PaymentFullInfo";

export class PaymentsService {
    static BasePath = "http://localhost:5000/payments/";

    public static async GetLastPayments(skip: number, take: number): Promise<GetLastPaymentsResponse> {
        const response = await fetch(
            `${this.BasePath}last?skip=${skip}&take=${take}`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json'
                }
            });

        return (await response.json()) as GetLastPaymentsResponse;
    }
}

interface GetLastPaymentsResponse {
    paymentFullInfo: PaymentFullInfo[];
    totalCount: number;
}