import fetch, {BodyInit} from "node-fetch";
import {Form} from "rsuite";

export class MinioService {
    static BasePath = "http://localhost:5000/minio/";

    public static async AddImage(fileName: string, imgSrc: string) {
        const blob = await fetch(imgSrc).then(x => x.blob());
        const formData = new FormData();

        formData.append("image", blob as Blob);

        await fetch(
            `${this.BasePath}add-image/${fileName}.jpg`,
            {
                method: "PUT",
                headers: {
                    Accept: '*/*',
                },
                body: formData as BodyInit,
            });
    }

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