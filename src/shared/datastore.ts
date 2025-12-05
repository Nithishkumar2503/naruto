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
      return {
        records: [...prev.records, ...items],
        pageSize,
        total,
        currentPage,
      };
    });
  };

  const removeDuplicate = (prevItems: T[], newItems: T[]) => {
    for (let i = 0; i < prevItems.length; i++) {
      for (let j = 0; j < newItems.length; j++) {
        newItems.splice(j, 1);
      }
    }
    return [...prevItems, ...newItems];
  };

  return {
    setStoreState,
    store,
    setStore,
    dataStore: store?.records,
    pageSize: store?.pageSize,
  };
};
