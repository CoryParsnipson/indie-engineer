import { assess } from '$lib/services/recaptcha';

export async function post({ request }) {
  let data = await request.json();
  let res = await assess(data.token, data.action);

  return {
    status: 200,
    body: res,
  };
}
