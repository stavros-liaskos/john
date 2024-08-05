import type { NextApiRequest, NextApiResponse } from 'next';
import artistSearch from '../../../mocks/fixtures/responses/artist-search.json';
import { components } from '../../../types/schema';
import withDelay from '../../../utils/withDelay';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<components['schemas']['ArtistSearchResponse']>,
) {
  if (process.env.IS_SERVER_MOCKED === 'true' || !req.query.pattern) {
    withDelay(() => {
      res.status(200).json(artistSearch);
    });
    return;
  }

  try {
    const query = req.query.pattern;
    console.warn(`query: ${query}`);

    if (typeof query !== 'string') {
      throw new Error('Wrong input type, only string allowed');
    }
    const response = await fetch(
      `https://api.releaseraccoon.online/artist/search?${new URLSearchParams({ pattern: query })}`,
      {
        method: 'GET',
        // headers: req.headers,
        // bearer token
        credentials: 'include',
      },
    );
    const artistsJson = await response.json();

    res.status(200).json(artistsJson.artists);
  } catch (err) {
    // @ts-ignore
    res.status(500).json(err);
  }
}
