import { components } from '../types/schema';
import { Dispatch, SetStateAction } from 'react';

export function getFollowedArtists(
  setState: Dispatch<SetStateAction<components['schemas']['FollowedArtistsResponse'] | undefined>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) {
  setLoading(true);
  fetchData().catch(console.error);

  async function fetchData() {
    const data = await fetch(`${process.env.BE_BASE_URL}/me/followed-artists`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await data.json();
    setState(json);
    setLoading(false);
  }
}
