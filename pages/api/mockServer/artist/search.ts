import type { NextApiRequest, NextApiResponse } from 'next';
import artistSearch from '../../../../mocks/responses/artist-search.json';

export default function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  res.status(200).json(artistSearch);
}
