export interface Movie {
  id: number;
  title: string;
  src: string;
  rating?: number;
  lastModified?: string;
}

export interface Serie extends Movie {
  followed: boolean;
}

export interface Sort {
  id: number;
  value: SortOption;
  label: string;
}

export enum SortOption {
  LASTMODIFIED = 'lastModified',
  TITLE = 'titleAsc',
  RATING_DESC = 'ratingDesc',
  RATING_ASC = 'ratingAsc',
}

export enum Context {
  MOVIE = 'movie',
  SERIE = 'serie',
}
