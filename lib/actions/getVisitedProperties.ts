"use server";

import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

interface GetVisitedPropertiesParams {
  userId: string;
  currentPage?: number;
  searchQuery?: string;
}

interface GetVisitedPropertiesResponse {
  visitedProperties: any[];
  totalCount: number;
}

const getVisitedProperties = cache(
  async ({
    userId,
    currentPage = 1,
    searchQuery = "",
  }: GetVisitedPropertiesParams): Promise<GetVisitedPropertiesResponse> => {
    try {
      const session = await auth();

      if (!session?.user?.email) {
        console.log("No user session found.");
        return { visitedProperties: [], totalCount: 0 };
      }

      const ITEMS_PER_PAGE = 2;
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;

      const query: Record<string, any> = {
        userId: userId,
      };

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

      const totalCount = await db.reservation.count({
        where: query,
      });

      const visitedProperties = await db.reservation.findMany({
        where: query,
        include: {
          property: {
            include: {
              images: true,
              Review: true,
            },
          },
        },
        take: ITEMS_PER_PAGE,
        skip: offset,
      });

      if (!visitedProperties.length) {
        console.log("No visited properties found in the database.");
        return { visitedProperties: [], totalCount };
      }

      return { visitedProperties, totalCount };
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      return { visitedProperties: [], totalCount: 0 };
    }
  },
);

export default getVisitedProperties;
