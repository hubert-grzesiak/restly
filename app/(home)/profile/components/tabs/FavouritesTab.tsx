import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/Button";
import { StarIcon } from "@/components/icons";
import getReviewsSummary from "@/lib/actions/properties/getNumberOfReviewsForProperty";
import getFavouritesInfo from "@/lib/actions/properties/getFavouritesInfo";

const FavouritesTab = async () => {
  const result = await getFavouritesInfo();
  console.log(result);
  const { averageRating } = await getReviewsSummary();
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
              <Card key={property.id}>
                <Link
                  href={`/properties/${property.id}`}
                  className="group"
                  prefetch={false}
                >
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={property.urls[0] || "/images/placeholder.svg"}
                      alt="property image"
                      //   width={100}
                      className="h-full w-full object-cover transition-all group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="grid gap-1">
                        <div className="line-clamp-1 font-semibold">
                          {property.name}
                        </div>
                        <div className="line-clamp-1 text-sm text-muted-foreground">
                          {property.city}, {property.country}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <StarIcon className="h-4 w-4 fill-orange-400 text-orange-400" />
                        {averageRating}
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FavouritesTab;
