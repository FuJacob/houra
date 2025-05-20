import React from "react";
import Link from "next/link";
const Navigation = () => {
  return (
    <div className="sticky top-0 z-50 flex-col flex justify-center items-center">
      <nav className=" py-8 font-semibold bg-background w-screen flex items-center justify-center">
        <div className="max-w-7xl w-full px-4">
          <div className="flex justify-between items-center">
            <ul className="flex gap-4 items-center">
              <li className="font-black font-sans text-2xl italic mr-6">
                <Link href="">HOURA</Link>
              </li>
              <li className="rounded-full px-4 py-1 bg-primary">
                <Link href="">Home</Link>
              </li>
              <li>
                <Link href="">Features</Link>
              </li>
              <li>
                <Link href="">Support the Team</Link>
              </li>
            </ul>
            <ul className="flex gap-4 items-center">
              <li>
                <Link href="">How it works</Link>
              </li>
              <li>
                <Link href="">About</Link>
              </li>
              <li>
                <Link href="/login">Log in</Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="bg-primary px-4 py-2 rounded-full"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
