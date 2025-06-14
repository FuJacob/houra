import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-screen">
        <section className="pt-32 md:pt-64 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="px-8 py-16 text-3xl sm:text-6xl md:text-8xl font-medium font-serif mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight tracking-tight mb-12">
              Think like a <span className="font-black italic">Spender</span>.{" "}
              <br /> <span className="font-serif italic">Live</span> like a{" "}
              <span className="font-curly">Maker</span>.
            </h1>

            <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">
              <div className="w-full flex justify-center mb-16">
                <div className="flex w-full max-w-2xl gap-6 px-4">
                  <Link
                    href="/signup"
                    className="group flex-1 px-8 py-4 bg-gray-900/90 backdrop-blur-sm text-white rounded-full hover:bg-gray-900 transition-all duration-300 text-lg font-medium text-center shadow-lg shadow-gray-900/25 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.02] border border-gray-800/20"
                  >
                    <span className="group-hover:text-white/90 transition-colors">
                      Get Started
                    </span>
                  </Link>
                  <Link
                    href="/timer"
                    className="group flex-1 px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-gray-800 rounded-full hover:bg-white/30 hover:border-white/40 transition-all duration-300 text-lg font-medium text-center shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:scale-[1.02]"
                  >
                    <div className="group-hover:text-gray-900 transition-colors flex items-center gap-2 justify-center">
                      Try
                      <span className="text-2xl font-curly m-0">
                        Flex Mode
                      </span>{" "}
                      as a guest
                    </div>
                  </Link>
                </div>
              </div>

              <div className="relative w-full flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-3xl rounded-3xl transform rotate-1 max-w-5xl mx-auto"></div>

                <div className="relative max-w-5xl w-full p-8 bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-all duration-500 hover:scale-[1.01] rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-3xl pointer-events-none"></div>

                  <video
                    src="/portfoliovideofinal.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-2xl relative z-10 shadow-xl shadow-black/20"
                  />

                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute top-1/3 left-4 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
