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

export default async function Profile() {
  const session = await auth();
  const userId = session?.user.id;
  const result = await getVisitedProperties({ userId: session?.user.id ?? "" });
  console.log(result);
  return (
    <main className="mx-auto w-full max-w-5xl">
      <ProfileCard />
      <Tabs defaultValue="properties" className="border-b">
        <TabsList className="flex">
          <TabsTrigger value="properties">Your properties</TabsTrigger>
          <TabsTrigger value="favourites">Favourites</TabsTrigger>
          <TabsTrigger value="visited">Visited</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="properties">
          <YourPropertiesTab />
        </TabsContent>
        <TabsContent value="visited">
          {result?.map((property) => (
            <VisitedTab key={property.id} property={property} userId={userId} />
          ))}
          {/* <VisitedTab userId={session?.user.id} /> */}
        </TabsContent>
        <TabsContent value="favourites">
          <div className="grid gap-4 p-4 sm:p-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">Olivia Davis</div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <StarIcon className="h-4 w-4 fill-primary" />
                    4.9
                  </div>
                  <div className="text-sm text-muted-foreground">
                    This place was amazing! The views were incredible and the
                    house was very clean. We had a great time.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">John Doe</div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <StarIcon className="h-4 w-4 fill-primary" />
                    4.8
                  </div>
                  <div className="text-sm text-muted-foreground">
                    We had a great time and would definitely stay again!
                    Gorgeous views and a beautiful home.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">Sarah Miller</div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <StarIcon className="h-4 w-4 fill-primary" />
                    4.7
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Super clean, great location, and amazing views. We had a
                    great time and wish we could have stayed longer!
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="justify-self-start">
              View all favourites
            </Button>
          </div>
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
            <Settings />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
