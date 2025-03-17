import { SearchParamsProps } from "@/app/page";
import DeletedPropertiesTab from "../components/tabs/DeletedPropertiesTab";

export default async function page({ searchParams }: SearchParamsProps) {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-xl bg-white/80 backdrop-blur-[15px]">
      <DeletedPropertiesTab searchParams={searchParams} />
    </div>
  );
}
