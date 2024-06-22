import type { NextApiRequest, NextApiResponse } from 'next';
import { components } from '../../../types/schema';
import follow from '../../../mocks/responses/follow.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<components['schemas']['SearchResultArtistDto']>,
) {
  res.status(200).json(follow);
}
