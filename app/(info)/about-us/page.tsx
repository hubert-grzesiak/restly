function Page() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-4xl font-bold">About Us</h1>
      <p className="mb-8 text-gray-500">
        Welcome to Restly! We are a modern platform for booking accommodations
        that connects travelers with unique places around the world. Our goal is
        to make travel simpler, more accessible, and enjoyable.
      </p>
      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
          <p className="mb-4 text-gray-500">
            Our mission is to enable everyone to explore the world in a way that
            is authentic and tailored to individual needs. We believe that
            travel broadens horizons and enriches life, so we strive to provide
            our users with the best possible experiences.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold">How We Operate</h2>
          <p className="mb-4 text-gray-500">
            Restly allows you to:
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Easy Search: Find the perfect place to stay using our advanced
                filters and recommendations.
              </li>
              <li>
                Simple Booking: Make reservations quickly and effortlessly
                through our intuitive app.
              </li>
              <li>
                Safety and Trust: We provide secure payments and host
                verification to ensure your experience is safe and comfortable.
              </li>
            </ul>
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold">Why Choose Restly?</h2>
          <p className="mb-4 text-gray-500">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Wide Selection: From cozy apartments to luxurious villas – we
                have accommodations for every occasion.
              </li>
              <li>
                Community: Join our growing community of travelers and hosts,
                share experiences, and inspire others.
              </li>
              <li>
                24/7 Support: Our support team is available 24/7 to help you
                with any questions or issues.
              </li>
            </ul>
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold">Contact Us</h2>
          <p className="mb-4 text-gray-500">
            Have questions or need assistance? Contact us:
            <ul className="list-disc space-y-2 pl-6">
              <li>Email: support@restly.com</li>
              <li>Phone: +48 123 456 789</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
