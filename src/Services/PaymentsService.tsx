import fetch from "node-fetch";
import {PaymentFullInfo} from "../Models/PaymentFullInfo";

export class PaymentsService {
    static BasePath = "http://localhost:5000/payments/";

    public static async AddPayment(clientId: string, subscriptionId: string): Promise<void> {
        await fetch(
            `${this.BasePath}add?clientId=${clientId}&subscriptionId=${subscriptionId}`,
            {
                method: 'POST'
            });

    }

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

    public static async GetClientLastPayment(clientId: string): Promise<PaymentFullInfo | null> {
        const response = await fetch(
            `${this.BasePath}client-last?clientId=${clientId}`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json'
                }
            });

        if (response.status === 204) {
            return null;
        }

        return (await response.json()) as PaymentFullInfo;
    }
}

interface GetLastPaymentsResponse {
    paymentFullInfo: PaymentFullInfo[];
    totalCount: number;
}