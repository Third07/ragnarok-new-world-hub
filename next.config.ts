import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Cloudflare Worker owns canonical slash handling. Disabling the
  // framework redirect prevents /guides/ <-> /guides redirect conflicts.
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/guides/index.html",
        destination: "/guides/",
        permanent: true,
      },
      {
        source: "/robot.txt",
        destination: "/robots.txt",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
