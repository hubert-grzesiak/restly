import { auth } from "@/lib/auth";
import getVisitedProperties from "@/lib/actions/getVisitedProperties";
import VisitedTab from "../components/tabs/VisitedTab";
import Image from "next/image";
import Button from "@/components/Button";

export default async function page() {
  const session = await auth();
  const userId = session?.user.id ?? "";
  const result = await getVisitedProperties({ userId: session?.user.id ?? "" });
  console.log(result);
  return (
    <div className="mx-auto w-full max-w-5xl rounded-xl bg-white/80 backdrop-blur-[15px]">
      {result.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Image
            src="https://res.cloudinary.com/dev6yhoh3/image/upload/v1721144595/restly/states/no-visited-state_ufbavt.png"
            alt="No visited properties"
            height={300}
            width={300}
          />
          <Button className="mb-6 mt-2" href="/">
            Book first property!
          </Button>
        </div>
      ) : (
        <div className="px-4 pb-6">
          {result?.map((property) => (
            <VisitedTab key={property.id} property={property} userId={userId} />
          ))}
        </div>
      )}
    </div>
  );
}
