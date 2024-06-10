import { Metadata } from "next";

import Breadcrumbs from "@/components/facilities/breadcrumbs";
import FacilityForm from "@/components/facilities/forms/create-form";


export const metadata: Metadata = {
  title: "Create Facility",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Facilities", href: "/dashboard/facilities" },
          {
            label: "Create Facility",
            href: "/dashboard/facilities/create",
            active: true,
          },
        ]}
      />
      <FacilityForm />
    </main>
  );
}
