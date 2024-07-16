import YourPropertiesTab from "./components/tabs/YourPropertiesTab";

export default async function Profile() {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-xl bg-white/80 backdrop-blur-[15px]">
      <YourPropertiesTab />
    </div>
  );
}
