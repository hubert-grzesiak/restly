import Breadcrumbs from "@/components/facilities/breadcrumbs";
import FacilityForm from "@/components/facilities/forms/create-form";

import { fetchFacilityById } from "@/lib/actions/admin/facilities";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Facility",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const result = await fetchFacilityById(id);

  if (!result) {
    return notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Facilities", href: "/admin/facilities" },
          {
            label: "Edit Facility",
            href: `/admin/facilities/${id}/edit`,
            active: true,
          },
        ]}
      />
      <FacilityForm type="Edit" facilityDetails={JSON.stringify(result)} />
    </main>
  );
}
