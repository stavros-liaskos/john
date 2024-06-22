import type { NextApiRequest, NextApiResponse } from 'next';
import followedArtists from '../../../mocks/responses/followed-artists.json';
import { components } from '../../../types/schema';

// TODO 404 for some reason
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<components['schemas']['FollowedArtistsResponse']>,
) {
  res.status(200).json(followedArtists);
}
