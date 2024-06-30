const Paths = {
  Auth: '/api/auth/me',
  Search: `/artist/search`,
  Recommended: `/artists/recommended`,
  Follow: `/me/follow`,
  FollowedArtists: `/me/followed-artists`,
  UnfollowArtist: `/me/unfollow`,
  RaccoonUser: `/raccoon-user`,
  ScrapeLastFM: `/scrape-taste/lastfm`,
  ScrapeSpotify: `/scrape-taste/spotify`,
};

const Endpoints: Record<string, string> = {
  Auth: `${process.env.BE_BASE_URL}${Paths.Auth}`,
  Search: `${process.env.BE_BASE_URL}${Paths.Search}`,
  Recommended: `${process.env.BE_BASE_URL}${Paths.Recommended}`,
  Follow: `${process.env.BE_BASE_URL}${Paths.Follow}`,
  FollowedArtists: `${process.env.BE_BASE_URL}${Paths.FollowedArtists}`,
  UnfollowArtist: `${process.env.BE_BASE_URL}${Paths.UnfollowArtist}`,
  RaccoonUser: `${process.env.BE_BASE_URL}${Paths.RaccoonUser}`,
  ScrapeLastFM: `${process.env.BE_BASE_URL}${Paths.ScrapeLastFM}`,
  ScrapeSpotify: `${process.env.BE_BASE_URL}${Paths.ScrapeSpotify}`,
};

export default Endpoints;

export { Paths };
