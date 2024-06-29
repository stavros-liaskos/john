import type { NextApiRequest, NextApiResponse } from 'next';
import raccoonUser from '../../mocks/fixtures/responses/raccoon-user.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  res.status(200).json(raccoonUser);
}
