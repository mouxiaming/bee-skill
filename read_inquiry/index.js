import fetch from "node-fetch";

export default async function TradewReadInquiry(args = {}) {
    const API_KEY = process.env.TRADEW_API_KEY;

    if (!API_KEY) {
        return {
            status: false,
            msg: "TRADEW_API_KEY environment variable is not set"
        };
    }

    const current_page = args.current_page || 1;
    const page_size = args.page_size || 10;

    if (page_size < 10 || page_size > 50) {
        return {
            status: false,
            msg: "page_size must be between 10 and 50"
        };
    }

    const body = {
        language: args.language || "en",
        fields: args.fields || [
            "inquiry_id",
            "language",
            "is_read",
            "title",
            "content",
            "country_code",
            "ip",
            "contact",
            "source",
            "target_products",
            "create_time"
        ],
        pagination: {
            current_page,
            page_size
        }
    };

    try {
        const res = await fetch("https://platform.tradew.com/openapis/inquiry/read", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
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
            pagination: json.data?.pagination || null,
            list: json.data?.list || []
        };

    } catch (err) {
        return {
            status: false,
            msg: err.message
        };
    }
}