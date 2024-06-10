import Image from "next/image";
import { UpdateFacility, DeleteFacility } from "./buttons";
import FacilityStatus from "./status";
import { fetchFilteredFacilities } from "@/lib/actions/admin";
export default async function FacilitiesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const facilitys = await fetchFilteredFacilities(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {facilitys?.map((facility) => (
              <div
                key={facility.id}
                className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{facility.name}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateFacility id={facility.id} />
                    <DeleteFacility id={facility.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {facilitys?.map((facility) => (
                <tr
                  key={facility.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="whitespace-nowrap px-3 py-3">
                    {facility.name}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateFacility id={facility.id} />
                      <DeleteFacility id={facility.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
