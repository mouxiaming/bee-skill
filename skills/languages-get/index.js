import { httpRequest } from "../../shared/httpClient.js";

export default async function LanguagesGet() {
    const API_KEY = process.env.TRADEW_API_KEY;

    if (!API_KEY) {
        return {
            status: false,
            msg: "Missing environment variable: TRADEW_API_KEY"
        };
    }

    const res = await httpRequest(
        "https://platform.tradew.com/openapis/languages",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    if (!res.status) return res;

    return {
        status: true,
        msg: res.msg,
        list: res.data?.list || []
    };
}