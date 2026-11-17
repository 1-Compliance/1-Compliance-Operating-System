import { handler } from '../../netlify/functions/scan.mjs';

export async function onRequest(context) {
  const { request, env } = context;

  // Sync Cloudflare environment variables to process.env if running under nodejs_compat
  if (typeof process !== 'undefined' && process.env && env) {
    for (const [key, value] of Object.entries(env)) {
      if (typeof value === 'string') {
        process.env[key] = value;
      }
    }
  }

  const headers = {};
  request.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });
  if (headers['cf-connecting-ip'] && !headers['client-ip']) {
    headers['client-ip'] = headers['cf-connecting-ip'];
  }

  const body = request.method === 'POST' ? await request.text() : '';
  const result = await handler({
    httpMethod: request.method,
    headers,
    body,
  });

  return new Response(result.body, {
    status: result.statusCode || 200,
    headers: result.headers || { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
