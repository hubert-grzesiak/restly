import { fetchFilteredReportedReviews } from "@/lib/actions/admin/reportedReviews";
import { UpdateFacility, DeleteFacility } from "./buttons";
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
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="p-3 font-medium">
                    User
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Body
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {reportedReviews?.map((review) => (
                  <tr
                    key={review.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap px-3 py-3">
                      {review.review.userId}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {review.review.body}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateFacility id={review.id} />
                        <DeleteFacility id={review.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
