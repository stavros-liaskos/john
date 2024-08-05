import type { NextApiRequest, NextApiResponse } from 'next';
import artistSearch from '../../../mocks/fixtures/responses/artist-search.json';
import { components } from '../../../types/schema';
import withDelay from '../../../utils/withDelay';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<components['schemas']['ArtistSearchResponse']>,
) {
  console.warn(req.query)
  if (process.env.IS_SERVER_MOCKED) {
    withDelay(() => {
      res.status(200).json(artistSearch);
    });
    return;
  }

  try {
    const response = await fetch(
      `${process.env.BE_BASE_URL}/artist/search?${new URLSearchParams(req.query)}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );
    const artistsJson = await response.json();

    res.status(200).json(artistsJson.artists);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'An unexpected error occurred';
    // @ts-ignore
    res.status(statusCode).json(message);
  }
}
