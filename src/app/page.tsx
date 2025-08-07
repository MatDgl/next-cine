"use client";
import MoviesPage from "@/components/pages/MoviesPage";
import SeriesPage from "@/components/pages/SeriesPage";
import MediaTabs from "@/components/shared/MediaTabs";

export default function Home() {
  return (
    <MediaTabs
      title="Mes notes"
      tabContents={[
        <MoviesPage key="movies" />,
        <SeriesPage key="series" />,
      ]}
    />
  );
}
