import { SearchParamsProps } from "@/app/page";
import YourPropertiesTab from "./components/tabs/YourPropertiesTab";

export default async function Profile({ searchParams }: SearchParamsProps) {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-xl bg-white/80 backdrop-blur-[15px]">
      <YourPropertiesTab searchParams={searchParams} />
    </div>
  );
}
