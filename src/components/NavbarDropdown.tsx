import React from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./NavbarDropdown.module.css";
import Link from "next/link";


type NavbarDropdownProps = {
  name: string;
  items: { name: string; url: string }[];
};

const NavbarDropdown = (props: NavbarDropdownProps) => {
  return (
    <li
      className={
        "relative text-green-600 flex items-center gap-2 px-4 " + styles.navbar
      }
    >
      {props.name}
      <FaChevronDown />
      <ul className="absolute top-full left-0 px-4 py-4 gap-4">
        {props.items.map((item) => {
          return (
            <Link href={item.url} key={item.url}>
              <li className="whitespace-nowrap">{item.name}</li>
            </Link>
          );
        })}
      </ul>
    </li>
  );
};

export default NavbarDropdown;
