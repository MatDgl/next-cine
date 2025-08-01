import { Serie } from "@/types/models";

const mockSeries: Serie[] = [
  {
    id: 1,
    title: "Breaking Bad",
    src: "breaking_bad",
    rating: 5,
    followed: true,
    lastModified: "2024-01-15",
  },
  {
    id: 2,
    title: "Game of Thrones",
    src: "got",
    rating: 4,
    followed: false,
    lastModified: "2024-01-10",
  },
  {
    id: 3,
    title: "The Office",
    src: "the_office",
    rating: 4.5,
    followed: true,
    lastModified: "2024-01-20",
  },
];

export class SerieService {
  static async getSeries(): Promise<Serie[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSeries);
      }, 500);
    });
  }

  static async getSerieById(id: number): Promise<Serie> {
    const serie = mockSeries.find((s) => s.id === id);
    if (!serie) {
      throw new Error("Serie not found");
    }
    return serie;
  }

  static async updateRating(id: number, rating: number): Promise<Serie> {
    const serieIndex = mockSeries.findIndex((s) => s.id === id);
    if (serieIndex === -1) {
      throw new Error("Serie not found");
    }
    mockSeries[serieIndex] = { ...mockSeries[serieIndex], rating };
    return mockSeries[serieIndex];
  }
}
