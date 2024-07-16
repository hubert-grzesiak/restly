import FavouritesTab from "../components/tabs/FavouritesTab";

export default async function page() {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-xl bg-white/80 backdrop-blur-[15px]">
      <FavouritesTab />
    </div>
  );
}
