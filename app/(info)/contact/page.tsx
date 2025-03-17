import ContactForm from "./ContactForm";

function Page() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mx-auto w-full max-w-5xl py-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 text-lg font-medium">Address</h3>
                <p className="text-muted-foreground">
                  Poznańska 201, 62-800 Kalisz
                </p>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium">Phone</h3>
                <p className="text-muted-foreground">(+48) 700 600 500</p>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium">Email</h3>
                <p className="text-muted-foreground">
                  32422@uniwersytetkaliski.edu.pl
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-bold">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
