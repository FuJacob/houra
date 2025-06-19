import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => (
  <footer className="py-8 w-full border-t border-white/20 bg-gradient-to-t from-gray-50/50 to-transparent">
    <div className="max-w-2xl flex flex-col items-center justify-center mx-auto">
      {/* Creator Section */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="group relative w-12 h-12 rounded-full overflow-hidden border border-white/30 bg-white/20 backdrop-blur-sm shadow-lg shadow-black/5 text-gray-600 hover:text-gray-900 hover:bg-white/30 transition duration-300 transform hover:scale-110">
          <Image
            src="/jacob.JPG"
            alt="Jacob Fu"
            fill
            className="object-cover"
            priority
          />
        </div>
        {[
          {
            href: "https://twitter.com/jacobfu",
            icon: FaTwitter,
          },
          {
            href: "https://github.com/jacobfu",
            icon: FaGithub,
          },
          {
            href: "https://linkedin.com/in/jacobfu",
            icon: FaLinkedin,
          },
        ].map(({ href, icon }) => {
          const Icon = icon as React.ComponentType<{
            size?: number;
            className?: string;
          }>;
          return (
            <Link
              key={href}
              href={href}
              target="_blank"
              className="group p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/30 transition duration-300 transform hover:scale-110 shadow-lg shadow-black/5"
            >
              <Icon
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </Link>
          );
        })}
      </div>

      {/* Bottom Section */}
      <p className="text-sm text-gray-600 font-light inline-block px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full shadow-lg shadow-black/5 select-none">
        © {new Date().getFullYear()} Owra. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
