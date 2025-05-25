import Link from "next/link";

const CTASection = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-3xl px-4 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Ready to make the most of your time?
            </h2>
            <p className="text-gray-500 mb-8">
              Join thousands of users who are already managing their time more
              effectively
            </p>
            <Link
              href="/signup"
              className="inline-flex px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
