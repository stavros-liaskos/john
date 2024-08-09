import type { NextApiRequest, NextApiResponse } from 'next';
import artistSearch from '../../../mocks/fixtures/responses/artist-search.json';
import { components } from '../../../types/schema';
import withDelay from '../../../utils/withDelay';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<components['schemas']['ArtistSearchResponse']>,
) {
  if (process.env.IS_SERVER_MOCKED === 'true' || !req.query.pattern) {
    withDelay(() => {
      res.status(200).json(artistSearch);
    });
    return;
  }

  console.warn(JSON.stringify(req.headers));
  const { accessToken } = await getAccessToken(req, res);
  console.warn('ACCESS_TOKEN : \n', accessToken);

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
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      },
    );
    // const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    console.log('RESPONSE:\n');
    console.warn(response);
    const artistsJson = await response.json();
    console.log('ARTIST JSON:\n');
    console.warn(artistsJson);

    res.status(200).json(artistsJson);
  } catch (err) {
    console.error('ERROR\n');
    console.error(err);
    // @ts-ignore
    res.status(500).json(err);
  }
});
