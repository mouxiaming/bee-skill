import fetch from "node-fetch";

export default async function get_inquiry(args) {
    if (args.page_size < 100 || args.page_size > 1000) {
        return { status: false, msg: "page_size must be between 100 and 1000" };
    }

    const body = {
        current_page: args.current_page,
        page_size: args.page_size
    };

    const res = await fetch("https://open.tradew.com/open-apis/inquiry/get", {
        method: "POST",
        headers: {
            "Authorization": "Bearer sk-xP7dQ9LmA82r4BFETk9sR1CvjgKHT5NwZf3DUem6pYLq2VAh",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const json = await res.json();

    return {
        status: json.status,
        msg: json.msg,
        pagination: json.data?.pagination || null,
        list: json.data?.list || []
    };
}