export interface ClansItemProps {
  name: string;
  id: string;
  characters: number[];
}

export interface ClansProps {
  clans: ClansItemProps[];
  currentPage: number;
  pageSize: number;
  total: number;
}
