import fetch from "node-fetch";
import {Subscription} from "../Models/Subscription";
import {SearchSubscriptionsRequest} from "./Requests/SearchSubscriptionsRequest";

export class SubscriptionsService {
    static BasePath = "http://localhost:5000/subscriptions/";

    public static async GetAllSubscriptions(): Promise<Subscription[]> {
        const response = await fetch(
            `${this.BasePath}all`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                }
            });

        return (await response.json()) as Subscription[];
    }

    public static async GetSubscription(id: string): Promise<Subscription> {
        const response = await fetch(
            `${this.BasePath}${id}`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                }
            });

        return (await response.json()) as Subscription;
    }

    public static async GetSubscriptions(skip: number, take: number): Promise<GetSubscriptionsResponse> {
        const response = await fetch(
            `${this.BasePath}?skip=${skip}&take=${take}`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json'
                }
            });

        return (await response.json()) as GetSubscriptionsResponse;
    }

    public static async UpdateSubscription(subscription: Subscription) {
        await fetch(
            `${this.BasePath}update`,
            {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(subscription)
            });
    }

    public static async AddSubscription(subscription: Subscription) {
        await fetch(
            `${this.BasePath}add`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(subscription)
            });
    }

    public static async SearchSubscriptions(request: SearchSubscriptionsRequest): Promise<SearchSubscriptionsResponse> {
        const response = await fetch(
            `${this.BasePath}search/?like=${request.like}`,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                }
            });

        return (await response.json()) as SearchSubscriptionsResponse;
    }
}

interface GetSubscriptionsResponse {
    subscriptions: Subscription[];
    totalCount: number;
}

interface SearchSubscriptionsResponse {
    subscriptions: Subscription[];
    totalCount: number;
}