import Breadcrumbs from "@/components/facilities/breadcrumbs";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchReportedReviewById } from "@/lib/actions/admin/reportedReviews";
import EditUserStatus from "@/components/bannedUsers/forms/edit-form";

export const metadata: Metadata = {
  title: "Edit status of the Review",
};

export default async function Page({
  params,
}: {
  params: { id: string; userId: string };
}) {
  const id = params.id;

  const result = await fetchReportedReviewById(id);

  if (!result) {
    return notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Banned users", href: "/admin/banned-users" },
          {
            label: "Edit Status of the User",
            href: `/admin/banned-users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditUserStatus review={result} />
    </main>
  );
}
