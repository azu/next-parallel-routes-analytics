import { AsyncStorage, StorageSchema } from "./AsyncStorage";

export const createLocalStorage = async <Schema extends StorageSchema>(): Promise<AsyncStorage<Schema>> => {
  return {
    async get<K extends keyof Schema>(key: K): Promise<Schema[K] | undefined> {
      const value = localStorage.getItem(String(key));
      if (value === null) {
        return undefined;
      }
      return JSON.parse(value) as Schema[K];
    },
    async set<K extends keyof Schema>(key: K, value: Schema[K] | undefined): Promise<void> {
      if (value === undefined) {
        localStorage.removeItem(String(key));
      } else {
        localStorage.setItem(String(key), JSON.stringify(value));
      }
    },
    async has(key: keyof Schema): Promise<boolean> {
      return localStorage.getItem(key as string) !== null;
    },
    async delete(key: keyof Schema): Promise<boolean> {
      localStorage.removeItem(key as string);
      return true;
    },
    async clear(): Promise<void> {
      localStorage.clear();
    },
    async close(): Promise<void> {
      // noop
    },
  };
}
