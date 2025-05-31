"use client";
import { FaHome, FaCreditCard, FaList } from "react-icons/fa";
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
  return (
    <div className="w-1/5">
      <ul className="py-12">
        <li className="font-black font-sans text-4xl italic">HOURA</li>
      </ul>
      <ul className="text-xl rounded-full mr-3">
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
