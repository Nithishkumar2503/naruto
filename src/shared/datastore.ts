import { useState } from "react";

interface DataStoreItemType<T> {
  records: T;
  currentPage: number;
  pageSize: number;
  total: number;
}
export const createDataStore = <T extends DataStoreItemType<T>>() => {
  const [store, setStoreState] = useState<T>({
    records: [],
    pageSize: 1,
    total: 0,
    currentPage: 1,
  });

  const setStore = (
    items: T[],
    pageSize: number,
    total: number,
    currentPage: number
  ) => {
    setStoreState((prev) => {
      return {
        records: [...prev.records, ...items],
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
  };
};
