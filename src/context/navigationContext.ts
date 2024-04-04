import { createContext } from "react";

export type DropdownItem = {
  _type: "dropdown";
  name: string;
  items: { url: string; name: string }[];
};

export type LinkItem = {
  _type: "link";
  name: string;
  url: string;
};

export type NavigationCtx = (DropdownItem | LinkItem)[];

export const navigationContext = createContext<NavigationCtx>([]);
