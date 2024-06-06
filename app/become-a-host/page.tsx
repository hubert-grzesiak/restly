import HostForm from "./components/HostForm";

function Page() {
  return (
    <main className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
        Become a Host
      </h1>
      <HostForm />
    </main>
  );
}

export default Page;
