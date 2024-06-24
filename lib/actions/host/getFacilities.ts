import {cache} from 'react';
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const getFacilities = cache(async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      console.log("No user session found.");
      return [];
    }

    const facilities = await db.facilities.findMany({});

    if (!facilities.length) {
      console.log("No facilities found in the database.");
      return [];
    }

    return facilities.map((facility) => ({
      value: facility.name,
      label: facility.name,
    }));
  } catch (error) {
    console.error("Failed to fetch facilities:", error);
    return [];
  }
});

export default getFacilities;
