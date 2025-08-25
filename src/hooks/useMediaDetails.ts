import { useState, useEffect } from 'react';
import { TMDBMovie, TMDBSerie, CreateMovieFromTMDBDto, CreateSerieFromTMDBDto } from '@/types/models';
import { MovieService } from '@/services/movieService';
import { SerieService } from '@/services/serieService';

type MediaType = 'movie' | 'serie';
type MediaData = TMDBMovie | TMDBSerie;
type CreateDTO = CreateMovieFromTMDBDto | CreateSerieFromTMDBDto;

interface UseMediaDetailsResult {
  media: MediaData | null;
  loading: boolean;
  error: string | null;
  saving: boolean;
  userRating: number;
  userReview: string;
  setUserReview: (review: string) => void;
  handleAddOrUpdateRating: (rating: number) => Promise<void>;
  handleToggleWishlist: () => Promise<void>;
  handleToggleWatched: (event: React.MouseEvent) => Promise<void>;
  handleSaveReview: (review: string) => Promise<void>;
}

export const useMediaDetails = (tmdbId: number, mediaType: MediaType): UseMediaDetailsResult => {
  const [media, setMedia] = useState<MediaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);
  const [userReview, setUserReview] = useState('');

  const isMovie = mediaType === 'movie';
  const service = isMovie ? MovieService : SerieService;

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const response = await (isMovie 
          ? MovieService.getMovieByTmdbId(tmdbId)
          : SerieService.getSerieByTmdbId(tmdbId)
        );
        
        let mediaData: MediaData;
        
        if ('tmdb' in response && typeof response === 'object') {
          const tmdbData = (response as any).tmdb;
          if (isMovie) {
            mediaData = {
              type: 'movie',
              tmdbId: tmdbData.id,
              title: tmdbData.title,
              original_title: tmdbData.original_title,
              overview: tmdbData.overview,
              tagline: tmdbData.tagline,
              poster_path: tmdbData.poster_path,
              backdrop_path: tmdbData.backdrop_path,
              release_date: tmdbData.release_date,
              vote_average: tmdbData.vote_average,
              vote_count: tmdbData.vote_count,
              popularity: tmdbData.popularity,
              adult: tmdbData.adult,
              video: tmdbData.video,
              runtime: tmdbData.runtime,
              budget: tmdbData.budget,
              revenue: tmdbData.revenue,
              status: tmdbData.status,
              imdb_id: tmdbData.imdb_id,
              homepage: tmdbData.homepage,
              original_language: tmdbData.original_language,
              origin_country: tmdbData.origin_country,
              genres: tmdbData.genres,
              production_companies: tmdbData.production_companies,
              production_countries: tmdbData.production_countries,
              spoken_languages: tmdbData.spoken_languages,
              belongs_to_collection: tmdbData.belongs_to_collection,
              credits: tmdbData.credits,
              director: tmdbData.credits?.crew?.find((person: any) => person.job === 'Director')?.name,
              local: (response as any).local
            } as TMDBMovie;
          } else {
            mediaData = {
              type: 'serie',
              tmdbId: tmdbData.id,
              title: tmdbData.name || tmdbData.title,
              poster_path: tmdbData.poster_path,
              backdrop_path: tmdbData.backdrop_path,
              overview: tmdbData.overview,
              first_air_date: tmdbData.first_air_date,
              last_air_date: tmdbData.last_air_date,
              vote_average: tmdbData.vote_average,
              vote_count: tmdbData.vote_count,
              popularity: tmdbData.popularity,
              original_language: tmdbData.original_language,
              original_name: tmdbData.original_name,
              adult: tmdbData.adult,
              genres: tmdbData.genres,
              number_of_seasons: tmdbData.number_of_seasons,
              number_of_episodes: tmdbData.number_of_episodes,
              episode_run_time: tmdbData.episode_run_time,
              status: tmdbData.status,
              tagline: tmdbData.tagline,
              homepage: tmdbData.homepage,
              in_production: tmdbData.in_production,
              networks: tmdbData.networks,
              production_companies: tmdbData.production_companies,
              production_countries: tmdbData.production_countries,
              spoken_languages: tmdbData.spoken_languages,
              created_by: tmdbData.created_by,
              credits: tmdbData.credits,
              director: tmdbData.created_by?.[0]?.name,
              local: (response as any).local
            } as TMDBSerie;
          }
        } else {
          mediaData = response as MediaData;
        }
        
        setMedia(mediaData);
        
        if (mediaData.local) {
          setUserRating(mediaData.local.rating || 0);
          setUserReview(mediaData.local.review || '');
        }
      } catch (error) {
        console.error(`Erreur lors du chargement ${isMovie ? 'du film' : 'de la série'}:`, error);
        setError(`Impossible de charger les détails ${isMovie ? 'du film' : 'de la série'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [tmdbId, isMovie]);

  const handleAddOrUpdateRating = async (rating: number) => {
    if (!media) return;

    try {
      setSaving(true);
      
      if (media.local) {
        const updatedMedia = await service.update(media.local.id, {
          rating: rating,
          review: userReview || undefined,
        });
        setMedia(prev => prev ? { ...prev, local: updatedMedia } : null);
      } else {
        const payload: CreateDTO = {
          tmdbId: media.tmdbId,
          rating: rating,
          review: userReview || undefined,
          wishlist: false,
          watched: false,
        } as CreateDTO;
        const createdMedia = await (isMovie 
          ? MovieService.createFromTMDB(payload as CreateMovieFromTMDBDto)
          : SerieService.createFromTMDB(payload as CreateSerieFromTMDBDto)
        );
        setMedia(prev => prev ? { ...prev, local: createdMedia } : null);
      }
      
      setUserRating(rating);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la note:', error);
      setError('Impossible de sauvegarder la note');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!media) return;

    try {
      setSaving(true);
      
      if (media.local) {
        const updatedMedia = await service.updateWishlist(
          media.local.id,
          !media.local.wishlist
        );
        setMedia(prev => prev ? { ...prev, local: updatedMedia } : null);
      } else {
        const payload: CreateDTO = {
          tmdbId: media.tmdbId,
          wishlist: true,
          watched: false,
        } as CreateDTO;
        const createdMedia = await (isMovie 
          ? MovieService.createFromTMDB(payload as CreateMovieFromTMDBDto)
          : SerieService.createFromTMDB(payload as CreateSerieFromTMDBDto)
        );
        setMedia(prev => prev ? { ...prev, local: createdMedia } : null);
      }
    } catch (error) {
      console.error('Erreur lors de la modification de la wishlist:', error);
      setError('Impossible de modifier la wishlist');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleWatched = async (event: React.MouseEvent) => {
    if (!media) return;

    const isRightClick = event.button === 2;
    
    try {
      setSaving(true);
      
      if (media.local) {
        let newViewCount = media.local.viewCount || 0;
        let newWatched = media.local.watched;
        
        if (isRightClick && newViewCount > 0) {
          newViewCount--;
          newWatched = newViewCount > 0;
        } else if (!isRightClick) {
          newViewCount++;
          newWatched = true;
        }
        
        const updatedMedia = await service.update(media.local.id, {
          watched: newWatched,
          viewCount: newViewCount,
        });
        setMedia(prev => prev ? { ...prev, local: updatedMedia } : null);
      } else {
        const payload: CreateDTO = {
          tmdbId: media.tmdbId,
          wishlist: false,
          watched: true,
          viewCount: 1,
        } as CreateDTO;
        const createdMedia = await (isMovie 
          ? MovieService.createFromTMDB(payload as CreateMovieFromTMDBDto)
          : SerieService.createFromTMDB(payload as CreateSerieFromTMDBDto)
        );
        setMedia(prev => prev ? { ...prev, local: createdMedia } : null);
      }
    } catch (error) {
      console.error('Erreur lors de la modification du statut vu:', error);
      setError('Impossible de modifier le statut');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveReview = async (review: string) => {
    if (!media?.local) return;

    try {
      setSaving(true);
      const updatedMedia = await service.update(media.local.id, {
        review: review || undefined,
      });
      setMedia(prev => prev ? { ...prev, local: updatedMedia } : null);
      setUserReview(review);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la critique:', error);
      setError('Impossible de sauvegarder la critique');
    } finally {
      setSaving(false);
    }
  };

  return {
    media,
    loading,
    error,
    saving,
    userRating,
    userReview,
    setUserReview,
    handleAddOrUpdateRating,
    handleToggleWishlist,
    handleToggleWatched,
    handleSaveReview
  };
};
