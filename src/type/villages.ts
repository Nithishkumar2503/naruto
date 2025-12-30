export interface VillageProps {
  villages: VillageItemProps[];
  currentPage: number;
  pageSize: number;
  total: number;
}

export interface VillageItemProps {
  id: string;
  name: string;
  characters: number[];
}
