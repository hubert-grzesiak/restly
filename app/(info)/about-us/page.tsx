function Page() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-gray-500 mb-8">
          Welcome to Restly! We are a modern platform for booking accommodations
          that connects travelers with unique places around the world. Our goal
          is to make travel simpler, more accessible, and enjoyable.
        </p>
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-500 mb-4">
              Our mission is to enable everyone to explore the world in a way
              that is authentic and tailored to individual needs. We believe
              that travel broadens horizons and enriches life, so we strive to
              provide our users with the best possible experiences.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">How We Operate</h2>
            <p className="text-gray-500 mb-4">
              Restly allows you to:
              <ul className="list-disc pl-6 space-y-2">
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
                  verification to ensure your experience is safe and
                  comfortable.
                </li>
              </ul>
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Choose Restly?</h2>
            <p className="text-gray-500 mb-4">
              <ul className="list-disc pl-6 space-y-2">
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
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-500 mb-4">
              Have questions or need assistance? Contact us:
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: support@restly.com</li>
                <li>Phone: +48 123 456 789</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
