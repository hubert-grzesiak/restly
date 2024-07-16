import { auth } from "@/lib/auth";
import getVisitedProperties from "@/lib/actions/getVisitedProperties";
import VisitedTab from "../components/tabs/VisitedTab";

export default async function page() {
  const session = await auth();
  const userId = session?.user.id;
  const result = await getVisitedProperties({ userId: session?.user.id ?? "" });
  console.log(result);
  return (
    <div className="mx-auto w-full max-w-5xl rounded-xl bg-white/80 backdrop-blur-[15px]">
      {result.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <h1>No visited yet</h1>
        </div>
      ) : (
        result?.map((property) => (
          <VisitedTab key={property.id} property={property} userId={userId} />
        ))
      )}
    </div>
  );
}
