import type { NextApiRequest, NextApiResponse } from 'next';
import headers from '../pages/api/headers';

export default async function requestProxy(req: NextApiRequest, res: NextApiResponse<unknown>) {
  const requestOptions = {
    method: req.method,
    headers,
    ...(req.body && { body: JSON.stringify(req.body) }),
  };

  try {
    const response = await fetch(process.env.BE_BASE_URL as unknown as URL, requestOptions);
    const result = await response.json();
    console.log(result);
    res.status(200).json(JSON.parse(result));
  } catch (e) {
    console.error('error', e);
  }
}
