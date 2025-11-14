import { useCallback, useState } from "react";

interface DataStoreItemType<T> {
  records: T;
  page: number;
}
export const createDataStore = <T extends DataStoreItemType>() => {
  const [store, setStoreState] = useState<DataStoreItemType>({
    records: [],
    page: 1,
  });

  const setStore = useCallback((items: T[], page: number) => {
  });
  const eliminateDuplicateRecords=(records:DataStoreItemType,data:T[]): T[]=>{
		const duplicateArray: T[] = [];
		const eliminatedArray: Array<T> = [];
    
  }
};
