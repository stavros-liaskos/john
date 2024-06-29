import type { NextApiRequest, NextApiResponse } from 'next';
import { components } from '../../../types/schema';
import follow from '../../../mocks/fixtures/responses/follow.json';
import withDelay from '../../../utils/withDelay';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<components['schemas']['SearchResultArtistDto']>,
) {
  withDelay(() => {
    res.status(200).json(follow);
  });
}
