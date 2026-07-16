import { getPaymentsApiUrl } from '@/lib/payments';

export async function adminFetch(path, { token, method = 'GET', body } = {}) {
  let response;
  try {
    response = await fetch(`${getPaymentsApiUrl()}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(
      `Cannot reach backend API at ${getPaymentsApiUrl()}. Is the server running on port 8080?`
    );
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return data;
}
