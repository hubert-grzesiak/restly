import getFavouritesInfo from "@/lib/actions/properties/getFavouritesInfo";
import PropertyCard from "../PropertyCard";
import Image from "next/image";
import Button from "@/components/Button";
const FavouritesTab = async () => {
  const result = await getFavouritesInfo();
  console.log(result);
  return (
    <div className="grid gap-4 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {result.length === 0 ? (
          <div className="col-span-3 mx-auto flex flex-col items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dev6yhoh3/image/upload/v1721147685/restly/states/no_fav_yet-removebg-preview_1_f6axwa.png"
              alt="No visited properties"
              height={280}
              width={280}
            />
            <Button className="mt-2" href="/">
              Go, add some properties!
            </Button>
          </div>
        ) : (
          <>
            {result.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FavouritesTab;
