import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full border-t border-white/20 bg-gradient-to-t from-gray-50/50 to-transparent">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-7xl px-4 py-16">
          {/* Creator Section */}
          <div className="flex flex-col items-center mb-16">
            {/* Enhanced profile image with glass morphism */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/10 backdrop-blur-xl rounded-full transform rotate-2"></div>
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-white/30 shadow-2xl shadow-black/10 bg-white/20 backdrop-blur-sm">
                <Image
                  src="/jacob.JPG"
                  alt="Jacob Fu"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <h3 className="text-2xl font-light bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
              Built by Jacob Fu
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-8 text-lg font-light">
              Make random things.
            </p>

            {/* Enhanced social links with glass morphism */}
            <div className="flex items-center space-x-4">
              <Link
                href="https://twitter.com/jacobfu"
                className="group p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/30 transition-all duration-300 transform hover:scale-110 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10"
                target="_blank"
              >
                <FaTwitter
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </Link>
              <Link
                href="https://github.com/jacobfu"
                className="group p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/30 transition-all duration-300 transform hover:scale-110 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10"
                target="_blank"
              >
                <FaGithub
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </Link>
              <Link
                href="https://linkedin.com/in/jacobfu"
                className="group p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/30 transition-all duration-300 transform hover:scale-110 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10"
                target="_blank"
              >
                <FaLinkedin
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Quick Links
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-lg mx-auto w-full">
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    How it works
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/help"
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}

          {/* Enhanced Bottom Section */}
          <div className="text-center">
            <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full shadow-lg shadow-black/5">
              <p className="text-sm text-gray-600 font-light">
                © {new Date().getFullYear()} Houra · Built with ❤️ by Jacob Fu
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
