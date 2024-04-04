import { useRouter } from "next/router";
import React, { ComponentType } from "react";
import { IconBaseProps } from "react-icons";
import Link from "next/link";

type NavbarItemProps = {
  name: string;
  url: string;
  icon?: ComponentType<IconBaseProps>;
};

const NavbarItem = (props: NavbarItemProps) => {
  const router = useRouter();
  let isActive = false;
  if (router.asPath === props.url) {
    isActive = true;
  }
  return (
    <Link href={props.url} className="flex items-stretch">
      <li
        className={`px-4 flex items-center gap-2 ${
          isActive ? "text-green-600 border-green-600 border-b-4" : ""
        }`}
      >
        {props.icon && <props.icon />}
        {props.name}
      </li>
    </Link>
  );
};

export default NavbarItem;
