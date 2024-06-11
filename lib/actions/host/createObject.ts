import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { FormSchema } from "@/app/become-a-host/components/HostForm.schema";
import { z } from "zod";

const createObject = async (rawData: unknown) => {
  try {
    const data = FormSchema.parse(rawData); // Validate data with Zod
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const newObiekt = await db.obiekt.create({
      data: {
        kraj: data.obiekt.kraj,
        miejscowosc: data.obiekt.miejscowosc,
        ulica: data.obiekt.ulica,
        nazwa: data.obiekt.nazwa,
        opis: data.obiekt.opis,
        liczba_sypialni: data.obiekt.liczba_sypialni,
        kod_pocztowy: data.obiekt.kod_pocztowy,
        numer_domu: data.obiekt.numer_domu,
        numer_mieszkania: data.obiekt.numer_mieszkania,
        minimalny_czas_pobytu: data.obiekt.minimalny_czas_pobytu,
        maksymalny_czas_pobytu: data.obiekt.maksymalny_czas_pobytu,
        maksymalna_ilosc_osob: data.obiekt.maksymalna_ilosc_osob,
        prices: {
          create: data.kalendarz.ceny.map((cena) => ({
            year: cena.rok,
            month: cena.miesiac,
            dailyRate: cena.cena_za_dobe,
          })),
        },
      },
    });

    return newObiekt;
  } catch (error: any) {
    console.error("Error creating object:", error);
    return null;
  }
};

export default createObject;
