import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
      fileName: true,
      pure: true,
      cssProp: true,
    },
  },
};

export default nextConfig;
