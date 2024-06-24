import type { NextApiRequest, NextApiResponse } from 'next';
import artistSearch from '../../../mocks/fixtures/responses/artist-search.json';
import { components } from '../../../types/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<components['schemas']['ArtistSearchResponse']>,
) {
  res.status(200).json(artistSearch);
}
