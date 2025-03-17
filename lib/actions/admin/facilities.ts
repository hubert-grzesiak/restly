"use server";

import { currentRole } from "@/lib/actualUserInfo";
import { amenities } from "../../consts";
import { Facilities, UserRole } from "@prisma/client";
import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

const FormSchema = z.object({
  name: z.string(),
});

const CreateFacility = FormSchema;
const UpdateFacility = FormSchema;

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" };
};

export const getFacilitiesAmount = async (): Promise<
  number | { error: string; count: number }
> => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    try {
      const facilities = await db.facilities.findMany();
      return facilities.length;
    } catch (error) {
      return { error: "Error fetching all facilities", count: 0 };
    }
  }
  return { error: "Forbidden Server Action!", count: 0 };
};
export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export const createFacility = async ({ name }: { name: string }) => {
  const role = await currentRole();

  const validatedFields = CreateFacility.safeParse({
    name: name,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Facility.",
    };
  }

  const { name: validatedName } = validatedFields.data;

  if (role === UserRole.ADMIN) {
    try {
      const existingFacility = await db.facilities.findUnique({
        where: { name: validatedName },
      });

      if (existingFacility) {
        return {
          error: "A facility with this name already exists.",
        };
      }

      await db.facilities.create({
        data: {
          name: validatedName,
        },
      });
      revalidatePath("/admin/facilities");
      return { success: "Facility created" };
    } catch (error) {
      return { error: "Error creating facility" };
    }
  }
  return { error: "Forbidden Server Power!" };
};

export async function editFacility(params: Facilities) {
  const role = await currentRole();
  const { name, id } = params;

  const validatedFields = UpdateFacility.safeParse({
    name: name,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Facility.",
    };
  }

  if (role === UserRole.ADMIN) {
    try {
      await db.facilities.update({
        where: { id: String(id) },
        data: {
          name,
        },
      });
      revalidatePath("/admin/facilities");
      return { success: "Facility updated" };
    } catch (error) {
      return { error: "Error updating facility" };
    }
  }
  return { error: "Forbidden Server Action!" };
}

export const deleteFacility = async (id: string) => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    try {
      await db.facilities.delete({
        where: { id: String(id) },
      });
      revalidatePath("/admin/facilities");
      return { success: "Facility deleted" };
    } catch (error) {
      return { error: "Error deleting facility" };
    }
  }
  return { error: "Forbidden Server Action!" };
};

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredFacilities(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    try {
      const facilities = await db.facilities.findMany({
        where: {
          OR: [{ name: { contains: query } }],
        },
        take: ITEMS_PER_PAGE,
        skip: offset,
      });
      return facilities;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch facilities.");
    }
  }
  return { error: "Forbidden Server Action!" };
}

export async function fetchFacilitysPages(query: string) {
  noStore();
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    try {
      const count = await db.facilities.count({
        where: {
          OR: [{ name: { contains: query } }],
        },
      });

      const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

      return totalPages;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch total number of facilities.");
    }
  }
  return { error: "Forbidden Server Action!" };
}

export async function fetchFacilityById(id: string) {
  noStore();
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    try {
      const facility = await db.facilities.findUnique({
        where: { id },
      });

      return facility;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch facility.");
    }
  }
  return { error: "Forbidden Server Action!" };
}

export const seedFacilities = async () => {
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    for (const amenity of amenities) {
      const facility = { name: amenity } as Facilities;
      const result = await createFacility(facility);

      if (result.error) {
        console.error(`Error creating facility: ${amenity}`, result.error);
      } else {
        console.log(`Facility created: ${amenity}`);
      }
    }
  }
  return { error: "Forbidden Server Power!" };
};
// seedFacilities();
