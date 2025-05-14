import { useContext } from "react";
import { HomeContext } from "../page";

import { IconType } from "react-icons";

interface SidebarButtonProps {
  id: string;
  icon: any;
  label: string;
}

const SidebarButton = ({ id, icon: Icon, label }: SidebarButtonProps) => {
  const { selectedPage, setSelectedPage } = useContext(HomeContext);
  return (
    <li>
       
      <button
        className={` ${
          selectedPage === id && "bg-gray-500"
        } w-full flex items-center p-4 gap-4 rounded-full`}
        onClick={() => {
          setSelectedPage(id);
          console.log(selectedPage);
        }}
      >
        <Icon />
        {label}
      </button>
    </li>
  );
};
export default SidebarButton;
