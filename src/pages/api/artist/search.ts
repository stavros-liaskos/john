import type { NextApiRequest, NextApiResponse } from 'next';
import artistSearch from '../../../mocks/fixtures/responses/artist-search.json';
import { components } from '../../../types/schema';
import withDelay from '../../../utils/withDelay';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<components['schemas']['ArtistSearchResponse']>,
) {
  if (process.env.IS_SERVER_MOCKED) {
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
      `${process.env.BE_BASE_URL}/artist/search?${new URLSearchParams({ pattern: 'Led Zeppelin' })}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );
    const artistsJson = await response.json();

    res.status(200).json(artistsJson.artists);
  } catch (error) {
    // @ts-ignore
    res.status(400).json(JSON.stringify(error));
  }
}
