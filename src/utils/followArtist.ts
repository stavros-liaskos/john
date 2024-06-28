import { components } from '../types/schema';

export async function followArtist(artist: components['schemas']['SearchResultArtistDto'], cb: () => void) {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  await fetch(`${process.env.BE_BASE_URL}/me/follow`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify(artist),
  })
    .then(() => {
      console.log(`${artist.name} followed successfully`);
    })
    .catch(error => {
      console.error('Error:', JSON.stringify(error));
    })
    .finally(() => {
      cb();
    });
}
