export type StorageSchema = {
  [index: string]: any;
};
// https://twitter.com/rithmety/status/1383300592580186113
type HasIndexSignature<T> = T extends Record<infer K, any> ? K : never
// Require TS 4.1+
// https://stackoverflow.com/questions/51465182/typescript-remove-index-signature-using-mapped-types
// https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#key-remapping-mapped-types
export type RemoveIndex<T> = {
  [K in keyof T as symbol extends K
    ? never : string extends K
      ? never : number extends K
        ? never : K]: T[K];
}
export type KnownKeys<T> = keyof RemoveIndex<T>;
/**
 * Extract known object store names from the DB schema type.
 *
 * @template DBTypes DB schema type, or unknown if the DB isn't typed.
 */
export type StoreNames<DBTypes extends StorageSchema | unknown> =
  DBTypes extends StorageSchema ? // schema-like object ?
    string extends HasIndexSignature<DBTypes> // has index signature
      ? string // does not remove index signature
      : KnownKeys<DBTypes> // if has not index signature, infer all keys
    : string;

/**
 * Extract database value types from the DB schema type.
 *
 * @template DBTypes DB schema type, or unknown if the DB isn't typed.
 * @template StoreName Names of the object stores to get the types of.
 */
export type StoreValue<DBTypes extends StorageSchema | unknown,
  StoreName extends StoreNames<DBTypes>> = DBTypes extends StorageSchema
  ? DBTypes[StoreName]
  : any;

export type AsyncStorage<Schema extends StorageSchema> = {
  /**
   * Returns the value associated to the key.
   * If the key does not exist, returns `undefined`.
   */
  get<K extends StoreNames<Schema>>(key: K): Promise<StoreValue<Schema, K> | undefined>;
  /**
   * Sets the value for the key in the storage.
   */
  set<K extends StoreNames<Schema>>(key: K, value: StoreValue<Schema, K> | undefined): Promise<void>;
  /**
   * Returns a boolean asserting whether a value has been associated to the key in the storage.
   */
  has(key: StoreNames<Schema>): Promise<boolean>;
  /**
   * Returns true if an key in the storage existed and has been removed.
   * Returns false if the key does not exist.
   */
  delete(key: StoreNames<Schema>): Promise<boolean>;
  /**
   * Removes all key-value pairs from the storage.
   * Note: clear method does not delete the storage.
   * In other words, after clear(), the storage still has internal metadata like version.
   */
  clear(): Promise<void>;
  /*
   * Close the KVS connection
   * DB-like KVS close the connection via this method
   * Of course, localStorage-like KVS implement do nothing. It is just noop function
   */
  close(): Promise<void>;
}
