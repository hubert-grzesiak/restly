import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import Image from "next/image";
import Settings from "./components/Settings";
import ProfileCard from "./components/ProfileCard";
import VisitedTab from "./components/tabs/VisitedTab";
import { auth } from "@/lib/auth";
import getVisitedProperties from "@/lib/actions/getVisitedProperties";
import YourPropertiesTab from "./components/tabs/YourPropertiesTab";
import { StarIcon } from "@/components/icons";
import FavouritesTab from "./components/tabs/FavouritesTab";
import { property } from "lodash";
import Link from "next/link";

export default async function Profile() {
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
          <Link href={"/profile/favourites"}>
            <TabsTrigger value="favourites">Favourites</TabsTrigger>
          </Link>
          <TabsTrigger value="visited">Visited</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="properties">
          <YourPropertiesTab />
        </TabsContent>
        {/* <TabsContent value="visited">
          {result.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <h1>No visited yet</h1>
            </div>
          ) : (
            result?.map((property) => (
              <VisitedTab
                key={property.id}
                property={property}
                userId={userId}
              />
            ))
          )}
        </TabsContent>
        <TabsContent value="favourites">
          <FavouritesTab />
        </TabsContent>
        <TabsContent value="settings">
          <div className="grid gap-6 p-4 sm:p-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update your profile information here.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={3}
                    defaultValue="I love hosting and meeting new people from around the world!"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Update your account information here.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card> */}
        {/* <Settings />
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
