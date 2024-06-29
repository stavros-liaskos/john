import { components } from '../types/schema';

interface IResources {
  fetch: (url: string) => void;
}

class Resources implements IResources {
  private cacheMap: Map<string, unknown>;

  constructor() {
    this.cacheMap = new Map();
  }

  fetch(url: string) {
    if (this.cacheMap.has(url)) {
      return this.cacheMap.get(url);
    }

    const promise = fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        return response.json();
      })
      .then((data: components['schemas']['FollowedArtistsResponse']) => {
        this.cacheMap.set(url, data);
        return data;
      });

    throw promise;
  }
}

const resources = new Resources();

export default resources;
