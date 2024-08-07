import { fetchFilteredReportedReviews } from "@/lib/actions/admin/reportedReviews";
import {
  UpdateReviewStatus,
  DeleteReview,
  DeleteFacility,
  UpdateFacility,
  BanUser,
} from "./buttons";
import ReviewStatus from "./status";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function FacilitiesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const reportedReviews = await fetchFilteredReportedReviews(
    query,
    currentPage,
  );

  return (
    <div className="mt-6 flow-root">
      {reportedReviews?.length === 0 ? (
        <div className="w-full rounded-md bg-white p-4">
          <p className="text-center">No reviews found.</p>
        </div>
      ) : (
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {reportedReviews?.map((review) => (
                <div
                  key={review.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p>{review.status}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateFacility id={review.id} />
                      <DeleteFacility id={review.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Table className="hidden min-w-full text-gray-900 md:table">
              <TableCaption>Reported Reviews</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Reported by</TableHead>
                  <TableHead>Body</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Negative Reputation</TableHead>
                  <TableHead>
                    <span className="sr-only">Edit</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportedReviews?.map((review) => (
                  <TableRow
                    key={review.id}
                    className="border-b last:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <TableCell className="whitespace-nowrap p-3">
                      {review.review.user.email}
                    </TableCell>
                    <TableCell className="whitespace-nowrap p-3">
                      {review.reportedBy}
                    </TableCell>
                    <TableCell className="whitespace-nowrap p-3">
                      {review.review.body}
                    </TableCell>
                    <TableCell className="whitespace-nowrap p-3">
                      <ReviewStatus status={review.status} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap p-3">
                      {review.review.user?.reputation}
                    </TableCell>
                    <TableCell className="whitespace-nowrap p-3">
                      <div className="flex justify-end gap-3">
                        <UpdateReviewStatus
                          id={review.id}
                          userId={review.review.userId}
                        />
                        <DeleteReview
                          reportedReviewId={review.id}
                          reviewId={review.review.id}
                        />
                        <BanUser userId={review.review.userId}  reviewId={review.id}/>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
