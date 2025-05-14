"use client";
import React, { useState, createContext, useContext } from "react";
import Link from "next/link";
import { FaAngleRight, FaHome, FaUniversity } from "react-icons/fa";
import { FaCalendarDay, FaCreditCard, FaList } from "react-icons/fa6";
import Timer from "./components/Timer";
import Sidebar from "./components/Sidebar";
interface HomeContextType {
  selectedPage: string;
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
}

export const HomeContext = createContext<HomeContextType>({
  selectedPage: "Home",
  setSelectedPage: () => {},
});
const page = () => {
  const [selectedPage, setSelectedPage] = useState("Home");
  return (
    <HomeContext.Provider value={{ selectedPage, setSelectedPage }}>
      <div className="flex">
        <Sidebar />
        {/* Sidebar */}
        <div className="w-4/5 flex-col">
          <nav className="flex justify-end items-center py-12">
            <ul className="flex items-center justify-center gap-8">
              <li className="bg-primary px-4 py-2 rounded-full">Earn CA$115</li>
              <li className="flex justify-center items-center gap-3">
                <img
                  className="w-14 h-14 rounded-full bg-primary"
                  src=""
                  alt=""
                />
                Jacob Fu
                <FaAngleRight />
              </li>
            </ul>
          </nav>

          <div className="flex-col px-36">
            <Timer />
            <p className="text-xl">Total balance</p>
            <h1 className="text-5xl pb-4">40.01 CAD</h1>
            <ul className="flex gap-4 pb-4">
              <li>Send</li>
              <li>Add money</li>
              <li>Request</li>
            </ul>

            <ul className="">
              <li className="p-4 bg-gray-200 w-64 h-54 rounded-2xl flex-col flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-12 h-12 bg-white flex justify-center items-center ">
                    CAD
                  </div>{" "}
                  <h2 className="text-xl font-semibold">CAD</h2>
                </div>{" "}
                <div className="">
                  <p className="flex items-center gap-2 text-gray-500 pb-1">
                    <FaUniversity />
                    31231231
                  </p>
                  <h3 className="font-semibold text-2xl">30.00</h3>
                </div>
              </li>
            </ul>

            <div className="py-12">
              <h2 className="text-2xl pb-4">Tasks</h2>
              <div className="bg-gray-200 w-full flex items-center justify-between p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center text-white">
                    +
                  </div>
                  <div className="flex-col">
                    <h3>Adding money paused</h3>
                    <p>We couldn't add money to your balances</p>
                  </div>
                </div>
                <div className="rounded-full px-4 py-2 bg-primary">Review</div>
              </div>
            </div>

            <div className="py-12">
              <h2 className="text-2xl pb-4">Transactions</h2>
              <div className="bg-gray-200 w-full flex items-center justify-between p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center text-white">
                    +
                  </div>
                  <div className="flex-col">
                    <h3>Adding money paused</h3>
                    <p>We couldn't add money to your balances</p>
                  </div>
                </div>
                <div className="rounded-full px-4 py-2 bg-primary">Review</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeContext.Provider>
  );
};

export default page;
