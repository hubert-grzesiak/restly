import Breadcrumbs from "@/components/facilities/breadcrumbs";
import EditReviewStatusForm from "@/components/reportedReviews/forms/edit-form";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchReportedReviewById } from "@/lib/actions/admin/reportedReviews";
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
          { label: "Reported reviews", href: "/admin/reported-reviews" },
          {
            label: "Edit Status of the Review",
            href: `/admin/reported-reviews/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditReviewStatusForm review={result} />
    </main>
  );
}
