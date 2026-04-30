import { httpRequest } from "../../shared/httpClient.js";

export default async function InquiryRead(args = {}) {
    const API_KEY = process.env.TRADEW_API_KEY;

    if (!API_KEY) {
        return {
            status: false,
            msg: "Missing environment variable: TRADEW_API_KEY"
        };
    }

    const current_page = Number(args.current_page ?? 1);
    const page_size = Number(args.page_size ?? 10);

    if (page_size < 10 || page_size > 50) {
        return {
            status: false,
            msg: "page_size must be between 10 and 50"
        };
    }

    const defaultFields = [
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
    ];

    const body = {
        language: args.language || "en",
        fields: Array.isArray(args.fields) && args.fields.length
            ? args.fields
            : defaultFields,
        pagination: {
            current_page,
            page_size
        }
    };

    const res = await httpRequest(
        "https://platform.tradew.com/openapis/inquiry/read",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body
        }
    );

    if (!res.status) return res;

    return {
        status: true,
        msg: res.msg,
        pagination: res.data?.pagination || null,
        list: res.data?.list || []
    };
}