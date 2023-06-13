import fetch from "node-fetch";
import Visit from "../Models/Visit";

export class MinioService {
    static BasePath = "http://localhost:5000/minio/";

    public static async GetImageOrDefault(fileName: string) {
        const response = await fetch(
            `${this.BasePath}get-image/${fileName}`,
            {
                method: "GET",
                headers: {
                    Accept: '*/*'
                }
            });

        if (response.status === 204) {

            const responseDefault = await fetch(
                `${this.BasePath}get-image/8rOGTkX6KZk.jpg`,
                {
                    method: "GET",
                    headers: {
                        Accept: '*/*'
                    }
                });

            return (await responseDefault.blob()) as Blob;
        }

        return (await response.blob()) as Blob;
    }
}