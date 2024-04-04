import { NavigationCtx } from "@/context/navigationContext";

export const personalBankingNavigation: NavigationCtx = [
  {
    _type: "dropdown",
    name: "Products",
    items: [
      { url: "/product/saving", name: "Savings" },
      { url: "/product/checking", name: "Checking" },
      { url: "/product/Cards", name: "Credit Cards" },
    ],
  },
  {
    _type: "dropdown",
    name: "Services",
    items: [
      { url: "/services/online banking", name: "Online Banking" },
      { url: "/services/mobile banking", name: "Mobile Banking" },
      { url: "/services/student banking", name: "Student Banking" },
    ],
  },
  {
    _type: "link",
    name: "Learning",
    url: "/learning",
  },
];

export const bankingNavigation: NavigationCtx = [
  {
    _type: "dropdown",
    name: "My TD",
    items: [
      { url: "/product/accounts", name: "Accounts" },
      { url: "/product/transfer", name: "Transfer" },
    ],
  },
  {
    _type: "dropdown",
    name: "Products",
    items: [
      { url: "/product/saving", name: "Savings" },
      { url: "/product/checking", name: "Checking" },
      { url: "/product/Cards", name: "Credit Cards" },
    ],
  },
  {
    _type: "dropdown",
    name: "Services",
    items: [
      { url: "/services/online banking", name: "Online Banking" },
      { url: "/services/mobile banking", name: "Mobile Banking" },
      { url: "/services/student banking", name: "Student Banking" },
    ],
  },
];
