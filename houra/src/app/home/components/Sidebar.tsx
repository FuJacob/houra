"use client";
import Link from "next/link";
import { useContext } from "react";
import {
  FaAngleRight,
  FaHome,
  FaUniversity,
  FaCreditCard,
  FaList,
} from "react-icons/fa";
import { HomeContext } from "../page";
import SidebarButton from "./SidebarButton";
const sidebarItems = [
  {
    id: "Home",
    icon: FaHome,
    label: "Home",
  },
  {
    id: "Cards",
    icon: FaCreditCard,
    label: "Cards",
  },
  {
    id: "Transactions",
    icon: FaList,
    label: "Transactions",
  },
  {
    id: "Payments",
    icon: FaList,
    label: "Payments",
  },
  {
    id: "Recipients",
    icon: FaList,
    label: "Recipients",
  },
  {
    id: "Insights",
    icon: FaList,
    label: "Insights",
  },
];
export default function Sidebar() {
  const { selectedPage, setSelectedPage } = useContext(HomeContext);
  return (
    <div className="w-1/5">
      <ul className="py-12">
        <li className="font-black font-sans text-4xl italic">HOURA</li>
      </ul>
      <ul className="space-y-2 bg-primary text-xl">
        {sidebarItems.map((item) => (
          <SidebarButton
            key={item.id}
            id={item.id}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </ul>
    </div>
  );
}
