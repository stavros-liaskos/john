import type { NextApiRequest, NextApiResponse } from 'next';
import raccoonUser from '../../mocks/fixtures/responses/raccoon-user.json';
import withDelay from '../../utils/withDelay';

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  withDelay(() => {
    res.status(200).json(raccoonUser);
  });
}
