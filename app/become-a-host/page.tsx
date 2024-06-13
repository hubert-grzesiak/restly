import HostStepper from "./components/HostStepper";
function Page() {
  return (
    <main className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-gray-100 min-h-[93vh]">
      <section className="max-w-6xl mx-auto w-full flex justify-center flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          Become a Host
        </h1>
        <HostStepper />
      </section>
    </main>
  );
}

export default Page;
