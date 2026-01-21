import { useState } from "react";
export type DataStoreState<T> = {
  records: T[];
  pageSize: number;
  total: number;
  currentPage: number;
};
type WithId = { id: string | number };

export const createDataStore = <T extends WithId>() => {
  //Store variable
  const [store, setStoreState] = useState<DataStoreState<T>>({
    records: [],
    pageSize: 1,
    total: 0,
    currentPage: 1,
  });

  // Assign the value in store from API response
 const setStore = (
    items: T[],
    pageSize: number,
    total: number,
    currentPage: number,
  ) => {
    setStoreState((prev) => {
      if (!items || items.length === 0) return prev;

      const merged = Array.from(
        new Map<string | number, T>(
          [...prev.records, ...items].map((item) => [item.id, item])
        ).values()
      );

      return {
        ...prev,
        records: merged,
        pageSize,
        total,
        currentPage,
      };
    });
  };


  return {
    setStoreState,
    store,
    setStore,
    dataStore: store?.records,
    pageSize: store?.pageSize,
  };
};
