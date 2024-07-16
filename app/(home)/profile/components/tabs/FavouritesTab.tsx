import getFavouritesInfo from "@/lib/actions/properties/getFavouritesInfo";
import PropertyCard from "../PropertyCard";

const FavouritesTab = async () => {
  const result = await getFavouritesInfo();
  console.log(result);
  return (
    <div className="grid gap-4 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {result.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h1>No favourites yet</h1>
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
