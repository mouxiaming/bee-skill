import fetch from "node-fetch";

export async function httpRequest(url, options = {}) {
    const {
        method = "GET",
        headers = {},
        body = null,
        timeout = 10000
    } = options;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
        const res = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
            signal: controller.signal
        });

        const text = await res.text();

        let json;
        try {
            json = JSON.parse(text);
        } catch {
            return {
                status: false,
                msg: "Invalid JSON response",
                raw: text
            };
        }

        if (!res.ok) {
            return {
                status: false,
                msg: `HTTP error: ${res.status}`,
                data: json
            };
        }

        return {
            status: json.status === "success",
            msg: json.msg || "",
            data: json.data ?? json
        };

    } catch (err) {
        return {
            status: false,
            msg: err.name === "AbortError" ? "Request timeout" : err.message
        };
    } finally {
        clearTimeout(timer);
    }
}