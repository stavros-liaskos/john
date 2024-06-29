import type { NextApiRequest, NextApiResponse } from 'next';
import artistSearch from '../../../mocks/fixtures/responses/artist-search.json';
import { components } from '../../../types/schema';
import withDelay from '../../../utils/withDelay';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<components['schemas']['ArtistSearchResponse']>,
) {
  withDelay(() => {
    res.status(200).json(artistSearch);
  });
}
