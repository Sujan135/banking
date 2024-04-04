import React, { ComponentType } from "react";
import styles from "./index.module.css";
import { IconBaseProps } from "react-icons";

type SocialFooterIcon = {
  icon: ComponentType<IconBaseProps>;
};

const SocialFooterIcon = (props: SocialFooterIcon) => {
  return (
    <span
      className={
        "border-green-600 border rounded-full w-11 h-11 flex items-center justify-center " +
        styles.icon
      }
    >
      <props.icon />
      <div className={styles.icon}></div>
    </span>
  );
};

export default SocialFooterIcon;
