import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Cloudflare Worker owns general canonical slash handling. Disabling the
  // framework default prevents /guides/ <-> /guides redirect conflicts.
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
      { source: "/guides/index.html", destination: "/guides/", permanent: true },
      { source: "/robot.txt", destination: "/robots.txt", permanent: true },

      // The Worker handles canonical trailing slashes for real pages. Keeping
      // those redirects here also catches Vinext's internal *.rsc requests and
      // creates a redirect loop during Next Link prefetching.
      { source: "/find", destination: "/search/", permanent: true },
      { source: "/latest", destination: "/updates/", permanent: true },
      { source: "/news", destination: "/updates/", permanent: true },
      { source: "/farming-finder", destination: "/tools/farming-target-finder/", permanent: true },
      { source: "/monster-finder", destination: "/tools/farming-target-finder/", permanent: true },
      { source: "/pc", destination: "/guides/play-on-pc/", permanent: true },
      { source: "/play-on-pc", destination: "/guides/play-on-pc/", permanent: true },
      { source: "/emulator", destination: "/guides/emulator-settings/", permanent: true },
      { source: "/top-up", destination: "/guides/top-up-safely/", permanent: true },
      { source: "/topup", destination: "/guides/top-up-safely/", permanent: true },
      { source: "/cloud-gaming", destination: "/guides/cloud-gaming/", permanent: true },
      { source: "/tools/pc-checker", destination: "/tools/pc-setup-checker/", permanent: true },
      { source: "/tools/topup-calculator", destination: "/tools/top-up-calculator/", permanent: true },
    ];
  },
};

export default nextConfig;
