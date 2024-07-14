import React from "react";
import YourPropertiesTab from "../components/tabs/YourPropertiesTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";


const page = () => {
  return (
    <TabsContent value="properties">
      <YourPropertiesTab />
    </TabsContent>
  );
};

export default page;
