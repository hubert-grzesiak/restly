import { Metadata } from "next";

import Breadcrumbs from "@/components/facilities/breadcrumbs";
import FacilityForm from "@/components/facilities/forms/create-form";

export const metadata: Metadata = {
  title: "Create Facility",
};

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Facilities", href: "/admin/facilities" },
          {
            label: "Create Facility",
            href: "/admin/facilities/create",
            active: true,
          },
        ]}
      />
      <FacilityForm />
    </main>
  );
}
