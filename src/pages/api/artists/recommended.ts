import type { NextApiRequest, NextApiResponse } from 'next';
import followedArtists from '../../../mocks/fixtures/responses/followed-artists.json';
import { components } from '../../../types/schema';
import withDelay from '../../../utils/withDelay';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<components['schemas']['FollowedArtistsResponse']>,
) {
  withDelay(() => {
    res.status(200).json(followedArtists);
  });
}
