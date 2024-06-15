import type { NextApiRequest, NextApiResponse } from 'next';
import headers from '../headers';

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  const requestOptions = {
    method: 'GET',
    headers,
  };

  try {
    const response = await fetch(process.env.BE_BASE_URL as unknown as URL, requestOptions);
    const result = await response.text();
    res.status(200).json(JSON.parse(result));
  } catch (e) {
    console.error('error', e);
  }
}
