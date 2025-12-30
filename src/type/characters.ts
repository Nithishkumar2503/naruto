export interface CharactersProps {
  characters: CharactersItemProps[];
  currentPage: number;
  pageSize: number;
  total: number;
}

export interface CharactersItemProps {
  debut: CharactersDebutProps;
  family: CharactersFamilyProps;
  images: string[];
  jutsu: string[];
  natureType: string[];
  personal: CharactersPersonalProps;
  rank: CharactersRankProps;
  tools: string[];
  voiceActors: { english: string[]; japanese: string[] };
  id: string;
  name: string;
}

export interface CharactersPartProps {
  "Part I": string;
  "Part II": string;
}

export interface CharactersPersonalProps {
  affiliation: string[];
  age: {
    "Academy Graduate": string;
    "Part I": string;
    "Part II": string;
  };
  birthdate: string;
  bloodType: string;
  clan: string;
  classification: string[];
  height: {
    "Blank Period": string;
    "Part I": string;
    "Part II": string;
  };
  kekkeiGenkai: string[];
  occupation: string[];
  sex: string;
  tailedBeast: string;
  team: string[];
  titles: string;
  weight: CharactersPartProps;
}

export interface CharactersDebutProps {
  anime: string;
  appearsIn: string;
  game: string;
  manga: string;
  movie: string;
  novel: string;
  ova: string;
}
export interface CharactersFamilyProps {
  "adoptive son": string;
  daughter: string;
  father: string;
  godfather: string;
  mother: string;
  son: string;
  wife: string;
}

export interface CharactersRankProps {
  ninjaRank: { Gaiden: string; "Part I": string };
  ninjaRegistration: string;
}
