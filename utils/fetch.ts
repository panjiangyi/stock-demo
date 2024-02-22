export function fetchWithQueryParams<T>(url: string, params?: Record<string, string>): Promise<T> {
    // 将对象转换为查询参数字符串
    const queryParams = new URLSearchParams().toString();

    // 如果存在查询参数，则将其附加到 URL 中
    const fullUrl = queryParams ? `${url}?${queryParams}` : url;

    // 使用 fetch 进行网络请求
    return fetch(fullUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}