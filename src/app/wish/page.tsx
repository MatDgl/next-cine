'use client';

import MediaTabs from '@/components/shared/MediaTabs';
import WishMoviesPage from '@/components/pages/WishMoviesPage';
import WishlistSeriesPage from '@/components/pages/WishSeriesPage';

export default function WishPage() {
  return (
    <MediaTabs
      title="Envie de voir"
      tabContents={[<WishMoviesPage key="movies" />, <WishlistSeriesPage key="series" />]}
    />
  );
}
