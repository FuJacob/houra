import { FaClock, FaRegLightbulb, FaRegChartBar } from "react-icons/fa6";

const FeaturesSection = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center bg-gray-50 w-screen ">
        <div className="w-full max-w-7xl px-4 py-24">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-16">
            Take control of your time
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6">
                <FaClock className="w-5 h-5 text-gray-900" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Time Tracking
              </h3>
              <p className="text-gray-500">
                Set daily limits for different activities and track your usage
                in real-time
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6">
                <FaRegLightbulb className="w-5 h-5 text-gray-900" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Smart Insights
              </h3>
              <p className="text-gray-500">
                Get personalized insights about your time usage patterns and
                habits
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6">
                <FaRegChartBar className="w-5 h-5 text-gray-900" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Progress Analytics
              </h3>
              <p className="text-gray-500">
                View detailed reports and track your productivity improvements
                over time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
