export async function processCallback(
  params: URLSearchParams,
  provider: string
) {
  const url = new URL(
    `/api/v1/auth/oidc/callback/${provider}`,
    window.location.origin
  );
  url.search = params.toString();

  try {
    const result = await fetch(url);
    const message = await result.json();

    if (result.status !== 200) {
      return { type: 'error', message: message.message };
    }
    return {
      type: 'success',
      message,
    };
  } catch (e) {
    return {
      type: 'error',
      message: e.message,
    };
  }
}
