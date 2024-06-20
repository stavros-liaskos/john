import ScrapeButton from './components/ScrapeButton';
import React from 'react';

const Scrapers = () => {
  return (
    <div className="relative flex lg:justify-center items-center mb-2 h-20 md:h-40 border-b-2 rr-border w-full">
      <ScrapeButton buttonText={'Connect Spotify'} musicService={'Spotify'} iconName={'Spotify'} />
      <ScrapeButton buttonText={'Connect LastFm'} musicService={'LastFm'} iconName={'LastFm'} />
    </div>
  );
};

export default Scrapers;
