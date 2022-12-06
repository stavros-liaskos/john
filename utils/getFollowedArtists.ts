import { components } from '../types/schema';
import { Dispatch, SetStateAction } from 'react';

export function getFollowedArtists(
  setState: Dispatch<SetStateAction<components['schemas']['FollowedArtistsResponse'] | undefined>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) {
  setLoading(true);
  const fetchData = async () => {
    const data = await fetch(`${process.env.BE_BASE_URL}/me/followed-artists`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    });
    const json = await data.json();
    setState(json);
    setLoading(false);
  };
  fetchData().catch(console.error);
}
