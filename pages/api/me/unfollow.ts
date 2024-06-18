import type { NextApiRequest, NextApiResponse } from 'next';
import requestProxy from '../../../utils/requestProxy';

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  await requestProxy(req, res);
}
