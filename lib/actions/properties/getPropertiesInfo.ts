import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

interface GetPropertiesInfoParams {
  softDeleted?: boolean;
  currentPage?: number;
  searchQuery?: string;
}

interface GetPropertiesInfoResponse {
  propertiesWithUrls: any[];
  propertiesCount: number;
}

const getPropertiesInfo = cache(
  async ({
    softDeleted = false,
    currentPage = 1,
    searchQuery = "",
  }: GetPropertiesInfoParams): Promise<GetPropertiesInfoResponse> => {
    try {
      const session = await auth();

      if (!session?.user?.email) {
        console.log("No user session found.");
        return { propertiesWithUrls: [], propertiesCount: 0 };
      }

      // Tworzymy obiekt query z podstawowymi warunkami
      const query: Record<string, any> = {
        ownerId: session.user.id,
        softDeleted: softDeleted,
      };

      // Dodajemy warunki wyszukiwania, jeśli podano searchQuery
      if (searchQuery) {
        query.OR = [
          { name: { contains: searchQuery, mode: "insensitive" } },
          { city: { contains: searchQuery, mode: "insensitive" } },
          { country: { contains: searchQuery, mode: "insensitive" } },
          { description: { contains: searchQuery, mode: "insensitive" } },
        ];
      }

      const ITEMS_PER_PAGE = 9;
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;

      // Pobierz łączną liczbę obiektów dla paginacji
      const propertiesCount = await db.property.count({
        where: query,
      });

      // Pobierz obiekty z uwzględnieniem paginacji
      const properties = await db.property.findMany({
        where: query,
        include: {
          images: true,
          facility: true,
          geometry: true,
        },
        take: ITEMS_PER_PAGE,
        skip: offset,
      });

      if (!properties.length) {
        console.log("No properties found in the database.");
        return { propertiesWithUrls: [], propertiesCount };
      }

      // Dodaj URL-e obrazów do każdego obiektu
      const propertiesWithUrls = properties.map((property) => ({
        ...property,
        urls: property.images.map((image) => image.urls).flat(),
      }));

      return { propertiesWithUrls, propertiesCount };
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      return { propertiesWithUrls: [], propertiesCount: 0 };
    }
  },
);

export default getPropertiesInfo;
