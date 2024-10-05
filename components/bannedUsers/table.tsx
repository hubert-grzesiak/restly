import {
  UpdateReviewStatus,
  DeleteReview,
  DeleteFacility,
  UpdateFacility,
  BanUser,
  UnbanUser,
} from "./buttons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchFilteredBannedUsers } from "@/lib/actions/admin/bannedUsers";

export default async function FacilitiesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const bannedUsers = await fetchFilteredBannedUsers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      {bannedUsers?.length === 0 ? (
        <div className="w-full rounded-md bg-white p-4">
          <p className="text-center">No users found. Everyone is nice :)</p>
        </div>
      ) : (
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {bannedUsers?.map((user) => (
                <div
                  key={user.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p>{user.name}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateFacility id={user.id} />
                      <DeleteFacility id={user.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Table className="hidden min-w-full text-gray-900 md:table">
              <TableCaption>Banned Users</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Negative Reputation</TableHead>
                  <TableHead>
                    <span className="sr-only">Edit</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bannedUsers?.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-b last:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <TableCell className="whitespace-nowrap p-3">
                      {user?.name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap p-3">
                      {user?.email}
                    </TableCell>
                    <TableCell className="whitespace-nowrap p-3">
                      {user?.reputation}
                    </TableCell>
                    <TableCell className="whitespace-nowrap p-3">
                      <div className="flex justify-end gap-3">
                        <UnbanUser userId={user.id} />
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
