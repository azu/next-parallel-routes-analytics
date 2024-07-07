import { createLocalStorage } from "./storage/localStorage";

type TrackerSchema = {
  url: string;
  utm_source?: string;
}
export type TrackerOptions = {}
export const createTracker = async (_tracker: TrackerOptions = {}) => {
  const storage = await createLocalStorage<TrackerSchema>();
  return {
    async track(url: string, { utm_source }: { utm_source?: string | null }) {
      await storage.set("url", url);
      if (utm_source) {
        await storage.set("utm_source", utm_source);
      }
      // log
      console.log("track", url, { utm_source });
    },
  };
}
