export async function fetchWithQueryParams<T>(url: string, params?: Record<string, string>): Promise<T> {
  // token 移到 Authorization header 中
  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN
  if (typeof token !== 'string') {
    throw new Error('NEXT_PUBLIC_ACCESS_TOKEN is not set')
  }

  // 将对象转换为查询参数字符串（不包含 token）
  const queryParams = params ? new URLSearchParams(params).toString() : ''

  // 如果存在查询参数，则将其附加到 URL 中
  const fullUrl = queryParams ? `${url}?${queryParams}` : url

  // 使用 fetch 进行网络请求，添加 Authorization header
  const response = await fetch(fullUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const json = await response.json()
  return json.data
}
