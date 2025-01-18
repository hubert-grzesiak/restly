import getFacilities from "@/lib/actions/host/getFacilities";
import EditForm from "./Form";
import getPropertyInfo from "@/lib/actions/properties/getPropertyInfo";
import { currentUser } from "@/lib/actualUserInfo";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  const facilitiesData = await getFacilities();
  const property = await getPropertyInfo({ id: params.id, user: user });

  console.log("searchParams.id", params);

  if (!property) {
    return (
      <main className="background-login min-h-[93vh] w-full px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center">
          <p>Property not found.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="background-login min-h-[93vh] w-full px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center">
        <EditForm property={property} facilities={facilitiesData} />
      </section>
    </main>
  );
}

export default Page;
