const HowItWorksSection = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-7xl px-4 py-24">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-16">
            How Houra works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="relative pl-8 border-l border-gray-200">
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-900" />
              <span className="text-sm text-gray-500 mb-2 block">Step 1</span>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Create Time Accounts
              </h3>
              <p className="text-gray-500">
                Set up different accounts for various activities like social
                media, gaming, or studying
              </p>
            </div>

            <div className="relative pl-8 border-l border-gray-200">
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-900" />
              <span className="text-sm text-gray-500 mb-2 block">Step 2</span>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Set Time Limits
              </h3>
              <p className="text-gray-500">
                Allocate daily or weekly time budgets for each activity based on
                your goals
              </p>
            </div>

            <div className="relative pl-8 border-l border-gray-200">
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-900" />
              <span className="text-sm text-gray-500 mb-2 block">Step 3</span>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Track & Improve
              </h3>
              <p className="text-gray-500">
                Monitor your usage and get insights to help you make better time
                management decisions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
 