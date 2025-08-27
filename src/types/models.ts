// Modèle local (base de données)
export interface Movie {
  id: number;
  title: string;
  tmdbId?: number;
  rating?: number;
  wishlist: boolean;
  review?: string;
  viewCount: number;
  watched: boolean;
  createdAt: string;
  updatedAt: string;
  tmdb?: {
    poster_path?: string;
  };
}

export interface Serie {
  id: number;
  title: string;
  tmdbId?: number;
  rating?: number;
  wishlist: boolean;
  review?: string;
  viewCount: number;
  watched: boolean;
  createdAt: string;
  updatedAt: string;
  tmdb?: {
    poster_path?: string;
  };
}

// Interfaces pour les données TMDB détaillées
export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface TMDBProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface TMDBSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMDBCastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface TMDBCrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface TMDBCredits {
  cast: TMDBCastMember[];
  crew: TMDBCrewMember[];
}

export interface TMDBCollection {
  id: number;
  name: string;
  poster_path?: string;
  backdrop_path?: string;
}

// Modèle TMDB enrichi avec données locales
export interface TMDBMovie {
  type: 'movie';
  tmdbId: number;
  title: string;
  original_title?: string;
  overview?: string;
  tagline?: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  adult?: boolean;
  video?: boolean;
  runtime?: number;
  budget?: number;
  revenue?: number;
  status?: string;
  imdb_id?: string;
  homepage?: string;
  original_language?: string;
  origin_country?: string[];
  genres?: TMDBGenre[];
  production_companies?: TMDBProductionCompany[];
  production_countries?: TMDBProductionCountry[];
  spoken_languages?: TMDBSpokenLanguage[];
  belongs_to_collection?: TMDBCollection;
  credits?: TMDBCredits;
  director?: string;
  local?: Movie | null;
}

export interface TMDBSerie {
  type: 'serie';
  tmdbId: number;
  title: string;
  name?: string;
  original_name?: string;
  overview?: string;
  tagline?: string;
  poster_path?: string;
  backdrop_path?: string;
  first_air_date?: string;
  last_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  adult?: boolean;
  in_production?: boolean;
  number_of_episodes?: number;
  number_of_seasons?: number;
  episode_run_time?: number[];
  status?: string;
  type_series?: string;
  homepage?: string;
  original_language?: string;
  origin_country?: string[];
  genres?: TMDBGenre[];
  production_companies?: TMDBProductionCompany[];
  production_countries?: TMDBProductionCountry[];
  spoken_languages?: TMDBSpokenLanguage[];
  networks?: TMDBProductionCompany[];
  created_by?: Array<{
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path?: string;
  }>;
  credits?: TMDBCredits;
  director?: string;
  local?: Serie | null;
}

// Réponse de recherche unifiée
export interface SearchResponse {
  query: string;
  limit: number;
  total: number;
  results: (TMDBMovie | TMDBSerie)[];
}

// DTOs pour création/mise à jour
export interface CreateMovieDto {
  title: string;
  tmdbId?: number;
  rating?: number;
  wishlist?: boolean;
  review?: string;
  viewCount?: number;
  watched?: boolean;
}

export interface CreateMovieFromTMDBDto {
  tmdbId: number;
  rating?: number;
  wishlist?: boolean;
  review?: string;
  viewCount?: number;
  watched?: boolean;
  titleOverride?: string;
}

export interface CreateSerieDto {
  title: string;
  tmdbId?: number;
  rating?: number;
  wishlist?: boolean;
  review?: string;
  viewCount?: number;
  watched?: boolean;
}

export interface CreateSerieFromTMDBDto {
  tmdbId: number;
  rating?: number;
  wishlist?: boolean;
  review?: string;
  viewCount?: number;
  watched?: boolean;
  titleOverride?: string;
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
