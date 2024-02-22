export async function fetchWithQueryParams<T>(url: string, params?: Record<string, string>): Promise<T> {
    // 将对象转换为查询参数字符串
    const queryParams = new URLSearchParams({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wMi0yMiAxMzo0NToxMSIsInVzZXJfaWQiOiJqYW1lc3BhbiIsImlwIjoiMTAzLjE1Mi4yMjAuNDMifQ.KXuACeKAljDNn38ph0YReGQdPFg0WdM7KR-aMWYq6Ww",
        ...params,
    }).toString();

    // 如果存在查询参数，则将其附加到 URL 中
    const fullUrl = queryParams ? `${url}?${queryParams}` : url;

    // 使用 fetch 进行网络请求
    const response = await fetch(fullUrl)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.data;

}