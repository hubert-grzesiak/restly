"use server";

import { currentRole } from "@/lib/actualUserInfo";
import { UserRole } from "@prisma/client";
import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from 'next/cache';

const FormSchema = z.object({
  name: z.string(),
});

const CreateFacilty = FormSchema.omit({ name: true, date: true });
const UpdateFacility = FormSchema.omit({ name: true, date: true });

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" };
};
export const getAllFacilities = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    try {
      const facilities = await db.facilities.findMany();
      return { facilities };
    } catch(error){
      return { error: "Error fetching all facilities" };
    }
  }
}

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export const createFacility = async (prevState: State, formData: FormData) => {
  const role = await currentRole();

  const validatedFields = CreateFacilty.safeParse({
    name: formData.get('name'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Facility.',
    };
  }
  const { name } = validatedFields.data;

  if (role === UserRole.ADMIN) {
    try {
      await db.facilities.create({
        data: {
          name,
        },
      });
      return { success: "Facility deleted" };
    } catch(error){
      return { error: "Error deleting facility" };
    }
  }
}

export async function updateFacility(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const role = await currentRole();

  const validatedFields = UpdateFacility.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Facility.',
    };
  }

  const { name } = validatedFields.data;

  if (role === UserRole.ADMIN) {
    try {
      await db.facilities.update({
        where: { id: String(id) },
        data: {
          name,
        },
      });
      return { success: "Facility updated" };
    } catch(error){
      return { error: "Error updating facility" };
    }
  }

  revalidatePath('/dashboard/facilities');
  redirect('/dashboard/facilities');
}

export const deleteFacility = async (id: string) => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    try {
      await db.facilities.delete({
        where: { id: String(id) },
      });
      return { success: "Facility deleted" };
    } catch(error){
      return { error: "Error deleting facility" };
    }
  }
  revalidatePath('/dashboard/facilities');
  redirect('/dashboard/facilities');
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredFacilities(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const facilities = await db.facilities.findMany({
      where: {
        OR: [
          { name: { contains: query } },
        ],
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });
    return facilities;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFacilitysPages(query: string) {
  noStore();
  try {
    const count = await db.facilities.count({
      where: {
        OR: [
          { name: { contains: query } },
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchFacilityById(id: string) {
  noStore();
  try {
    const facility = await db.facilities.findUnique({
      where: { id },
    });

    return facility;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}