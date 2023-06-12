import fetch from "node-fetch";

export class StatisticsService {
    static BasePath = "http://localhost:5000/statistics/";

    public static async GetVisits(): Promise<VisitsStatistic[]> {
        const response = await fetch(
            `${this.BasePath}last-visits`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json'
                }
            });

        return (await response.json()) as VisitsStatistic[];
    }

    public static async GetSubscriptions(): Promise<SubscriptionStatistic[]> {
        const response = await fetch(
            `${this.BasePath}subscriptions`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json'
                }
            });

        return (await response.json()) as SubscriptionStatistic[];
    }

    public static async GetPayments(): Promise<PaymentsStatistic[]> {
        const response = await fetch(
            `${this.BasePath}payments`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json'
                }
            });

        return (await response.json()) as PaymentsStatistic[];
    }
}

export interface VisitsStatistic {
    day: string;
    visitsCount: number
}

export interface SubscriptionStatistic {
    subscriptionName: string;
    count: number
}

export interface PaymentsStatistic {
    sumTotal: number;
    month: string;
}