import { z } from "zod";

export const ObiektSchema = z.object({
  kraj: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." }),
  miejscowosc: z
    .string()
    .min(2, { message: "City must be at least 2 characters." }),
  ulica: z.string().optional(),
  nazwa: z.string().min(2, { message: "Name must be at least 2 characters." }),
  opis: z.string().optional(),
  liczba_sypialni: z
    .number()
    .min(0, { message: "Number of bedrooms must be a non-negative number." }),
  kod_pocztowy: z.string().optional(),
  numer_domu: z.string().optional(),
  numer_mieszkania: z.string().optional(),
  minimalny_czas_pobytu: z
    .number()
    .min(0, { message: "Minimum stay must be a non-negative number." }),
  maksymalny_czas_pobytu: z
    .number()
    .min(0, { message: "Maximum stay must be a non-negative number." }),
  maksymalna_ilosc_osob: z
    .number()
    .min(1, { message: "Maximum number of people must be at least 1." }),
});
export const UdoqodnienieSchema = z.object({
  nazwa: z
    .string()
    .min(2, { message: "Facility name must be at least 2 characters." }),
});

export const KalendarzSchema = z.object({
  data_od: z.string(),
  data_do: z.string(),
  godzina_zameldowania: z.string().optional(),
  godzina_wymeldowania: z.string().optional(),
  cena_za_dobe: z
    .number()
    .min(0, { message: "Price per day must be a non-negative number." }),
});

export const ZdjecieSchema = z.object({
  opis: z.string().optional(),
  czy_glowne: z.boolean(),
});

// Combine schemas
export const FormSchema = z.object({
  obiekt: ObiektSchema,
  udoqodnienie: UdoqodnienieSchema,
  kalendarz: KalendarzSchema,
  zdjecie: ZdjecieSchema,
});
