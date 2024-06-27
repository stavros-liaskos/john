import ScrapeButton from './components/ScrapeButton';
import React from 'react';

const Scrapers = () => {
  return (
    <div className="flex lg:justify-center gap-2 mb-2 w-full">
      <ScrapeButton buttonText={'Connect'} musicService={'Spotify'} iconName={'Spotify'} />
      <ScrapeButton buttonText={'Connect'} musicService={'LastFm'} iconName={'LastFm'} />
    </div>
  );
};

export default Scrapers;
