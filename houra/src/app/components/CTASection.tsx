import Link from "next/link";

const CTASection = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-4xl px-4 py-32">
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-3xl rounded-3xl transform -rotate-1"></div>

              <div className="relative bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl p-16 shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-3xl pointer-events-none"></div>

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-8 leading-tight">
                    Ready to make the most of your time?
                  </h2>
                  <p className="text-gray-600 mb-12 text-xl font-light max-w-2xl mx-auto leading-relaxed">
                    Join thousands of users who are already managing their time
                    more effectively with Houra's innovative approach
                  </p>

                  <Link
                    href="/signup"
                    className="group inline-flex px-12 py-5 bg-gray-900/90 backdrop-blur-sm text-white rounded-full hover:bg-gray-900 transition-all duration-300 text-lg font-medium shadow-lg shadow-gray-900/25 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.05] border border-gray-800/20"
                  >
                    <span className="group-hover:text-white/90 transition-colors">
                      Get Started Now
                    </span>
                  </Link>
                </div>

                <div className="absolute top-8 right-8 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-12 left-12 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/4 left-8 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-1/4 right-12 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
