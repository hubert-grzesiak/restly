import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { auth } from "@/lib/auth";
import getVisitedProperties from "@/lib/actions/getVisitedProperties";
import FavouritesTab from "../components/tabs/FavouritesTab";
import ProfileCard from "../components/ProfileCard";

export default async function page() {
  const session = await auth();
  const userId = session?.user.id;
  const result = await getVisitedProperties({ userId: session?.user.id ?? "" });
  console.log(result);
  return (
    <div className="mx-auto w-full max-w-5xl rounded-xl bg-white/80 backdrop-blur-[15px]">
      <ProfileCard />
      <Tabs defaultValue="properties">
        <TabsList className="flex">
          <TabsTrigger value="properties">Your properties</TabsTrigger>
          <TabsTrigger value="favourites">Favourites</TabsTrigger>
          <TabsTrigger value="visited">Visited</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="favourites">
          <FavouritesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
