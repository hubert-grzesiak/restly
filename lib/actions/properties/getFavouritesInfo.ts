import { cache } from "react";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

interface GetFavouritesInfoParams {
  currentPage?: number;
  searchQuery?: string;
}

interface GetFavouritesInfoResponse {
  propertiesWithUrls: any[];
  favouritesCount: number;
}

const getFavouritesInfo = cache(
  async ({
    currentPage = 1,
    searchQuery = "",
  }: GetFavouritesInfoParams): Promise<GetFavouritesInfoResponse> => {
    try {
      const session = await auth();

      if (!session?.user?.email) {
        console.log("No user session found.");
        return { propertiesWithUrls: [], favouritesCount: 0 };
      }

      const ITEMS_PER_PAGE = 9; // Możesz dostosować tę wartość
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;

      // Tworzenie obiektu query z podstawowymi warunkami
      const query: Record<string, any> = {
        userId: session.user.id,
      };

      // Dodawanie warunków wyszukiwania, jeśli podano searchQuery
      if (searchQuery) {
        query.property = {
          OR: [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { city: { contains: searchQuery, mode: "insensitive" } },
            { country: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
          ],
        };
      }

      // Pobierz łączną liczbę ulubionych obiektów dla paginacji
      const favouritesCount = await db.favourite.count({
        where: query,
      });

      // Pobierz ulubione obiekty z uwzględnieniem paginacji i wyszukiwania
      const favourites = await db.favourite.findMany({
        where: query,
        include: {
          property: {
            include: {
              images: true,
            },
          },
        },
        take: ITEMS_PER_PAGE,
        skip: offset,
      });

      if (!favourites.length) {
        console.log("No favourites found in the database.");
        return { propertiesWithUrls: [], favouritesCount };
      }

      // Wyciąganie URL-i z powiązanych obrazów
      const propertiesWithUrls = favourites.map((favourite) => ({
        ...favourite.property,
        urls: favourite.property.images.map((image) => image.urls).flat(),
      }));

      return { propertiesWithUrls, favouritesCount };
    } catch (error) {
      console.error("Failed to fetch favourites:", error);
      return { propertiesWithUrls: [], favouritesCount: 0 };
    }
  },
);

export default getFavouritesInfo;
