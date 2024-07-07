"use client";
import { useLayoutEffect } from "react";
import { createTracker } from "./_track/tracker";
import { usePathname } from "next/navigation";

const trackCurrentPage = async () => {
  const tracker = await createTracker();
  const url = new URL(window.location.href);
  await tracker.track(url.toString(), {
    utm_source: url.searchParams.get("utm_source"),
  });
}

export default function Analytics() {
  const pathname = usePathname()
  // In development, logVisit will be called twice for every URL, so you might be tempted to try to fix that. We recommend keeping this code as is.
  // https://react.dev/learn/synchronizing-with-effects#sending-analytics
  useLayoutEffect(() => {
    trackCurrentPage().catch((e) => {
      console.error(e);
    });
  }, [pathname]);
  return null;
}
