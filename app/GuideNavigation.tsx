"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function routeMarker(pathname: string) {
  return pathname
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase() || "home";
}

export default function GuideNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.dataset.rtnwRoute = routeMarker(pathname);
  }, [pathname]);

  return null;
}
