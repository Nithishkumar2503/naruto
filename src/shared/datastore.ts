import { useState } from "react";

interface DataStoreItemType<T> {
  records: T;
  currentPage: number;
  pageSize: number;
  total: number;
}
export const createDataStore = <T extends DataStoreItemType<T>>() => {
  //Store variable
  const [store, setStoreState] = useState<T>({
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
    currentPage: number
  ) => {
    setStoreState((prev) => {
      if(!items) return
      return {
        records: [
    ...new Map(
      [...prev.records, ...items].map(item => [item.id, item])
    ).values()],
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
