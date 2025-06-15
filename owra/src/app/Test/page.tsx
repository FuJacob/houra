import Link from "next/link";

import React from "react";

const Test = () => {
  let seconds = 500;
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-9/10 ">
      <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
        Why not spend, save, and budget it like it?
      </p>{" "}
      <div className="border border-white/20 mt-8 z-10 bg-white/10 backdrop-blur-2xl rounded-2xl shadow-lg shadow-black/5 w-72 h-[26rem] px-6 flex flex-col gap-4 p-6 items-center justify-between mx-auto">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col ">
              <p className="text-gray-500 font-light text-4xl mb-2">owra</p>
              <Link
                href="/sign-in"
                className=" flex-1 max-w-2/3 transition-colors text-sm font-medium"
              >
                It&apos;s been{" "}
                <span className="font-bold">{seconds} seconds</span>.
              </Link>
            </div>
            <img src="logo.svg" className="w-12" />
          </div>
        </div>
        <div className="flex justify-end w-full px-6">
          <img src="vertical_card.png" alt="" className="w-12" />
        </div>
        <div className="flex flex-col w-full gap-1">
          <Link
            href="/sign-in"
            className="w-full px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-1xl font-medium text-center"
          >
            Signup
          </Link>
          <Link
            href="/flex-mode"
            className="w-full px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:border-gray-400 hover:text-gray-900 transition-colors text-1xl font-medium text-center"
          >
            Or try as a guest
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Test;
