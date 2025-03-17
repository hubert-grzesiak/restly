import { Suspense } from "react";
import HostStepper from "./components/HostStepper";

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
function Page() {
  return (
    <main className="background-login min-h-[93vh] w-full px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center">
        <Suspense fallback={<Loading />}>
          <HostStepper />
        </Suspense>
      </section>
    </main>
  );
}

export default Page;
