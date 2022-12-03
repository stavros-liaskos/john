import type { NextApiRequest, NextApiResponse } from 'next';
import followedArtists from '../../../../mocks/responses/followed-artists.json';

export default function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  res.status(200).json(followedArtists);
}
