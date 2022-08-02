module.exports = {
  async redirects() {
    return [
      {
        source: '/cover-story-becky-g',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cover-story-damelio',
        destination: '/',
        permanent: true,
      }
    ];
  },
};
