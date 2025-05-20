"use client";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
const AccountMenuButton = ({ name }: { name: string }) => {
  const [showAccountMenuModal, setShowAccountMenuModal] = useState(false);
  const router = useRouter();
  const logOut = () => {
    try {
      localStorage.removeItem("accessToken");

      router.push("/");
      console.log("Logged out");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <li className=" hover:bg-gray-400 rounded-full px-4 py-2">
        <button
          onClick={() => setShowAccountMenuModal((prev) => !prev)}
          className="flex justify-center items-center gap-3 "
        >
          <img className="w-14 h-14 rounded-full bg-primary" src="" alt="" />
          {name}
          <FaAngleRight />
        </button>
        {showAccountMenuModal && (
          <ul className="font-semibold px-12 py-4 fixed flex justify-center items-center bg-primary rounded-xl">
            <li>
              <button onClick={logOut}>Log out</button>
            </li>
          </ul>
        )}
      </li>
    </>
  );
};

export default AccountMenuButton;
