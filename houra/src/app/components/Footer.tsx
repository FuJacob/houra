import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full border-t border-gray-100">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-7xl px-4 py-12">
          {/* Creator Section */}
          <div className="flex flex-col items-center mb-16">
            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6">
              <Image
                src="/jacob.JPG"
                alt="Jacob Fu"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h3 className="text-2xl font-light text-gray-900 mb-2">
              Built by Jacob Fu
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Make random things.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="https://twitter.com/jacobfu"
                className="text-gray-400 hover:text-gray-900 transition-all transform hover:scale-110"
                target="_blank"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href="https://github.com/jacobfu"
                className="text-gray-400 hover:text-gray-900 transition-all transform hover:scale-110"
                target="_blank"
              >
                <FaGithub size={24} />
              </Link>
              <Link
                href="https://linkedin.com/in/jacobfu"
                className="text-gray-400 hover:text-gray-900 transition-all transform hover:scale-110"
                target="_blank"
              >
                <FaLinkedin size={24} />
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

          {/* Bottom Section */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Houra · Built with ❤️ by Jacob Fu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
