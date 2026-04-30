import fetch from "node-fetch";

export default async function TradewGetLanguages(args = {}) {
    const API_KEY = process.env.TRADEW_API_KEY;

    if (!API_KEY) {
        return {
            status: false,
            msg: "TRADEW_API_KEY environment variable is not set"
        };
    }

    try {
        const res = await fetch("https://platform.tradew.com/openapis/languages", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            return {
                status: false,
                msg: `HTTP error: ${res.status}`
            };
        }

        const json = await res.json();

        return {
            status: json.status === "success",
            msg: json.msg,
            list: json.data?.list || []
        };

    } catch (err) {
        return {
            status: false,
            msg: err.message
        };
    }
}