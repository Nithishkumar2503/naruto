export interface TeamsProps{
    teams: TeamsItemProps[];
   "kekkei-genkai":TeamsItemProps[];
    currentPage: number;
  pageSize: number;
  total: number;
}

export interface TeamsItemProps{
    characters:number
    id:number
    name:string
}