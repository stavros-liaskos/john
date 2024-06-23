import ScrapeButton, { getMusicServiceIcon, getMusicServiceUrl, handleScrape, MusicServiceType } from './ScrapeButton';
import { render } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import IconTypes from '../../Icons/iconTypes';
import Spotify from '../../Icons/spotify';
import React from 'react';
import LastFm from '../../Icons/lastfm';

describe('Scrape', () => {
  describe('component', () => {
    it('renders without data without crashing', () => {
      // @ts-ignore
      render(<ScrapeButton />);
    });

    it('scrape button exists', async () => {
      const btnName = 'Scrape Spotify';
      const { findByRole } = render(
        <ScrapeButton iconName={'Spotify'} buttonText={btnName} musicService={'Spotify'} />,
      );
      const scrapeBtn = await findByRole('button');
      expect(scrapeBtn).toHaveTextContent(btnName);
    });

    it('matches snapshot', () => {
      const { container } = render(
        <ScrapeButton iconName={'Spotify'} buttonText={'Scrape Spotify'} musicService={'Spotify'} />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('getMusicServiceIcon', () => {
    it.each<{ iconName: MusicServiceType; component: React.FunctionComponent<IconTypes> }>([
      { iconName: 'Spotify', component: Spotify },
      { iconName: 'LastFm', component: LastFm },
    ])('returns React Icon Component', ({ iconName, component }) => {
      expect(getMusicServiceIcon(iconName)).toBe(component);
    });
  });

  describe('handleScrape', () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');
    it('triggers success notification', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ some: 'response' }));

      await handleScrape('Spotify');
      expect(consoleLogSpy).toHaveBeenCalledWith('Scraped successfully. Show notification');
    });

    it('triggers error notification', async () => {
      await handleScrape('Spotify');
      expect(consoleLogSpy).toHaveBeenCalledWith('Scrape failed. Show notification');
    });
  });

  describe('getMusicServicePath', () => {
    it.each<{ musicService: MusicServiceType; url: string }>([
      { musicService: 'LastFm', url: 'https://release-raccoon.com/scrape-taste/lastfm' },
      { musicService: 'Spotify', url: 'https://release-raccoon.com/scrape-taste/spotify' },
    ])('returns correct path', ({ musicService, url }) => {
      expect(getMusicServiceUrl(musicService)).toBe(url);
    });

    it('throws error when music service does not match', () => {
      expect(() => getMusicServiceUrl('UndefinedFM' as MusicServiceType)).toThrow(
        'Failed to getMusicServicePath for: UndefinedFM',
      );
    });
  });
});
