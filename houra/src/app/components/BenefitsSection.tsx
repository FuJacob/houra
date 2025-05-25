import { FaRegClock, FaChartLine, FaRegBell } from "react-icons/fa6";

const BenefitsSection = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center bg-gray-50 w-screen ">
        <div className="w-full max-w-7xl px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                Why choose Houra?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <FaRegClock className="w-4 h-4 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Real-time Tracking
                    </h3>
                    <p className="text-gray-500">
                      Monitor your time usage as it happens with our intuitive
                      interface
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <FaChartLine className="w-4 h-4 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Detailed Analytics
                    </h3>
                    <p className="text-gray-500">
                      Get comprehensive insights into your time spending habits
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <FaRegBell className="w-4 h-4 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Smart Notifications
                    </h3>
                    <p className="text-gray-500">
                      Receive timely reminders to help you stay on track with
                      your goals
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-white shadow-xl p-8">
                {/* Placeholder for app screenshot or illustration */}
                <div className="w-full h-full rounded-xl bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
