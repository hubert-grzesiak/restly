import getFacilities from "@/lib/actions/host/getFacilities";
import getPropertyInfo from "@/lib/actions/properties/getPropertyInfo";
import GuestsTable from "./components/GuestsTable";
import getGuestsOfProperty from "@/lib/actions/properties/getGuestsOfProperty";
import Link from "next/link";

async function Page({ params }: { params: { id: string } }) {
  const property = await getPropertyInfo({ id: params.id });
  console.log("property", property);

  const { users, usersCount } = await getGuestsOfProperty({
    propertyId: params.id,
    ownerId: property?.ownerId,
  });

  //   console.log("users", users);

  return (
    <main className="background-login flex min-h-[93vh] w-full items-center justify-center px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <section className="mx-auto mt-10 flex w-full max-w-6xl flex-col items-center justify-center rounded-[20px] bg-white/90 p-6 backdrop-blur-lg">
        <h1 className="mb-4 text-3xl font-bold">
          Guests of{" "}
          <Link href={`/properties/${property?.id}`} className="text-[#f2a3a3]">
            {property?.name}
          </Link>
        </h1>
        <GuestsTable
          guests={users}
          usersCount={usersCount}
          propertyId={params.id}
        />
      </section>
    </main>
  );
}

export default Page;
