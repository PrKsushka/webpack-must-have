import { DropdownAndCategory } from "../types/dropDownMenu.types";

export const data: Array<DropdownAndCategory> = [
  {
    id: 1,
    link: "pc",
  },
  {
    id: 2,
    link: "playstation",
  },
  {
    id: 3,
    link: "xbox",
  },
];
export const links = {
  home: "/",
  products: "/products",
  about: "/about",
  profile: "/profile",
  cart: "/cart",
};
const menuData = {
  home: {
    id: 0,
    label: "Home",
    path: "/",
  },
  products: {
    base: {
      id: 1,
      label: "Products",
      path: "/products",
    },
    xbox: {
      id: 2,
      label: "XBOX",
      path: "/products/xbox",
    },
    pc: {
      id: 3,
      label: "PC",
      path: "/products/pc",
    },
    playStation: {
      id: 4,
      label: "Playstation",
      path: "/products/playstation",
    },
  },
  about: {
    id: 4,
    label: "About",
    path: "/about",
  },
};

export const headerData = [
  menuData.home,
  {
    ...menuData.products.base,
    sub: [menuData.products.pc, menuData.products.xbox, menuData.products.playStation],
  },
  menuData.about,
];
