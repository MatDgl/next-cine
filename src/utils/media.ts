import { TMDBCastMember } from '@/types/models';

// Sélectionne 3 acteurs: le premier de la liste puis les deux suivants les plus populaires
export const getFeaturedActors = (
  cast?: TMDBCastMember[]
): TMDBCastMember[] => {
  const list = Array.isArray(cast) ? cast : [];
  if (!list || list.length === 0) return [];
  const [first, ...rest] = list;
  const topTwo = rest
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 2);
  return [first, ...topTwo];
};
