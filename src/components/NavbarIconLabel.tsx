import React, { ComponentType, FC } from "react";
import { IconBaseProps } from "react-icons";
import styles from "./NavbarIconLabel.module.css";

type NavbarIconLabelProps = {
  icon: ComponentType<IconBaseProps>;
  name: string;
};

const NavbarIconLabel = (props: NavbarIconLabelProps) => {
  return (
    <li
      className={
        " text-green-600 flex items-center gap-2 " + styles.navbarlabel
      }
    >
      <props.icon />
      <div className={styles.label}>{props.name}</div>
    </li>
  );
};

export default NavbarIconLabel;
