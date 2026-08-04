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

      { source: "/search", destination: "/search/", permanent: true },
      { source: "/updates", destination: "/updates/", permanent: true },
      { source: "/guides/technical", destination: "/guides/technical/", permanent: true },
      { source: "/guides/play-on-pc", destination: "/guides/play-on-pc/", permanent: true },
      { source: "/guides/emulator-settings", destination: "/guides/emulator-settings/", permanent: true },
      { source: "/guides/top-up-safely", destination: "/guides/top-up-safely/", permanent: true },
      { source: "/guides/cloud-gaming", destination: "/guides/cloud-gaming/", permanent: true },
      { source: "/tools/farming-target-finder", destination: "/tools/farming-target-finder/", permanent: true },
      { source: "/tools/pc-setup-checker", destination: "/tools/pc-setup-checker/", permanent: true },
      { source: "/tools/top-up-calculator", destination: "/tools/top-up-calculator/", permanent: true },

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
