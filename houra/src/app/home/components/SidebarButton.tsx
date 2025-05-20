import { useContext } from "react";
import { HomeContext } from "../page";
import { SidebarButtonProps } from "@/types/types";

const SidebarButton = ({ id, icon: Icon, label }: SidebarButtonProps) => {
  const { selectedPage, setSelectedPage } = useContext(HomeContext);

  return (
    <li>
      <button
        className={`${
          selectedPage === id && "bg-gray-200"
        } w-full flex items-center p-4 gap-4 rounded-full`}
        onClick={() => setSelectedPage(id)}
      >
        <Icon />
        {label}
      </button>
    </li>
  );
};

export default SidebarButton;
