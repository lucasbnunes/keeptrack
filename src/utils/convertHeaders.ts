import { IncomingHttpHeaders } from 'http2';

// temp function to map the headers from NextJS req to the headers expected by better-auth
export function convertIncomingHttpHeadersToHeaders(
  incoming: IncomingHttpHeaders,
): Headers {
  const headers = new Headers();

  for (const [key, value] of Object.entries(incoming)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        headers.append(key, v);
      }
    } else if (typeof value === 'string') {
      headers.set(key, value);
    }
  }

  return headers;
}
