function Page() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">
          At Restly, we care about your privacy and the security of your
          personal data. This Privacy Policy describes what information we
          collect, how we process it, and how we protect it.
        </p>
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Collected Information</h2>
            <p className="text-gray-500 mb-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, payment information.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our
                  application, including IP address, device type, browser data.
                </li>
              </ul>
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Use of Information</h2>
            <p className="text-gray-500 mb-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>To Provide Services:</strong> We process your data to
                  enable booking accommodations and provide other services
                  offered by Restly.
                </li>
                <li>
                  <strong>Communication:</strong> We use your contact
                  information to send you information about reservations,
                  promotions, and updates.
                </li>
              </ul>
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Sharing of Information</h2>
            <p className="text-gray-500 mb-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Trusted Partners:</strong> We may share your data with
                  our trusted payment partners and service providers.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your data
                  if required by law or in the context of legal proceedings.
                </li>
              </ul>
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p className="text-gray-500 mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal data from unauthorized access, loss, or
              destruction.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">User Rights</h2>
            <p className="text-gray-500 mb-4">
              You have the right to access, correct, delete, and restrict the
              processing of your personal data. To exercise your rights, please
              contact us at privacy@restly.com.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Cookies</h2>
            <p className="text-gray-500 mb-4">
              Our website uses cookies to enhance your browsing experience.
              Cookies are small text files that are stored on your device when
              you visit our website. They help us understand how you use our
              site and improve its functionality. You can manage your cookie
              preferences through your browser settings.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Changes to the Privacy Policy
            </h2>
            <p className="text-gray-500 mb-4">
              We may periodically update our Privacy Policy. Any changes will be
              posted on our website and in the app.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-500 mb-4">
              If you have any questions about our Privacy Policy, please contact
              us at privacy@restly.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
