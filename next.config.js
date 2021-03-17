module.exports = (config) => {
    return {
      ...config,
      async redirects() {
        return []
      },
    //   images: {
    //     deviceSizes: [320, 420, 768, 1024, 1200],
    //     iconSizes: [],
    //     domains: ["prismic-io.s3.amazonaws.com", "images.prismic.io"],
    //     path: '/_next/image',
    //     loader: 'default',
    //   }
    }
  };
