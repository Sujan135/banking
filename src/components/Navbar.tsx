import React, { FC, useContext } from "react";
import Image from "next/image";
import {
  FaLocationPin,
  FaMagnifyingGlass,
  FaUserLock,
  FaUserPlus,
} from "react-icons/fa6";
import { BiSolidHelpCircle } from "react-icons/bi";
import NavbarItem from "./NavbarItem";
import NavbarDropdown from "./NavbarDropdown";
import NavbarIconLabel from "./NavbarIconLabel";
import { navigationContext } from "@/context/navigationContext";
import { FaSignOutAlt } from "react-icons/fa";

type NavbarProps = {
  isAuthenticated: boolean;
};

const Navbar: FC<NavbarProps> = ({ isAuthenticated }) => {
  const nav = useContext(navigationContext);
  return (
    <div className="shadow-md z-50">
      <div className="flex container mx-auto ">
        <div className="my-4">
          <Image
            src={"/tdLogo.png"}
            alt="logo"
            width={201}
            height={41}
            priority={true}
          />
        </div>
        <ol className="flex gap-3 flex-1 items-stretch ml-6 font-semibold  ">
          {nav.map((item, key) => {
            if (item._type === "dropdown") {
              return (
                <NavbarDropdown key={key} name={item.name} items={item.items} />
              );
            } else {
              return <NavbarItem key={key} name={item.name} url={item.url} />;
            }
          })}
        </ol>
        <ol className="flex gap-4 items-stretch text-green-600 text-lg">
          <NavbarIconLabel name="Find Us" icon={FaLocationPin} />
          <NavbarIconLabel name="Help" icon={BiSolidHelpCircle} />
          <NavbarIconLabel name="Search" icon={FaMagnifyingGlass} />

          <li className="flex items-center">
            <div className="w-[1px] h-[50%] bg-gray-300"></div>
          </li>
          {isAuthenticated ? (
            <NavbarItem name="Sign Out" url="/logout" icon={FaSignOutAlt} />
          ) : (
            <>
              <NavbarItem name="Log In" url="/login" icon={FaUserLock} />
              <NavbarItem name="Register" url="/register" icon={FaUserPlus} />
            </>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Navbar;


