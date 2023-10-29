import men1 from "./images/nav/men1.webp";
import men2 from "./images/nav/men2.webp";
import men3 from "./images/nav/men3.webp";
import women1 from "./images/nav/women1.webp";
import women2 from "./images/nav/women2.webp";
import women3 from "./images/nav/women3.webp";
import kid1 from "./images/nav/kid1.webp";
import kid2 from "./images/nav/kid2.webp";
import kid3 from "./images/nav/kid3.webp";
import acc1 from "./images/nav/acc1.webp";
import acc2 from "./images/nav/acc2.webp";
import acc3 from "./images/nav/acc3.png";

import men from "./images/banner/men.webp";
import women from "./images/banner/women.webp";
import kid from "./images/banner/kid.webp";
import menRespon from "./images/banner/men1.webp";
import womenRespon from "./images/banner/women1.webp";
import kidRespon from "./images/banner/kid1.webp";

import menCat from "./images/categories/men.png";
import womenCat from "./images/categories/women.png";
import accCat from "./images/categories/accessories.png";
import kidCat from "./images/categories/kid.png";

export const links = [
  {
    name: "men",
    imgs: [
      {
        src: men1,
        title: "tees",
        link: "/collections?category=men&subCategory=tees",
      },
      {
        src: men2,
        title: "pants",
        link: "/collections?category=men&subCategory=pants",
      },
      {
        src: men3,
        title: "shirts",
        link: "/collections?category=men&subCategory=shirts",
      },
    ],
    submenu: true,
    path: "/collections?category=men",
    sublinks: [
      {
        Head: "Topwear",
        sublink: [
          { name: "Tees" },
          { name: "Shirts" },
          { name: "Knitwear" },
          { name: "Sweats" },
        ],
      },
      {
        Head: "Bottomwear",
        sublink: [{ name: "Pants" }, { name: "Denim" }, { name: "Shorts" }],
      },
      {
        Head: "Outerwear",
        sublink: [{ name: "Jacket" }, { name: "Suiting" }],
      },
    ],
  },
  {
    name: "women",
    imgs: [
      {
        src: women1,
        title: "shirts",
        link: "/collections?category=women&subCategory=shirts",
      },
      {
        src: women2,
        title: "skirts",
        link: "/collections?category=women&subCategory=pants&skirts",
      },
      {
        src: women3,
        title: "dresses",
        link: "/collections?category=women&subCategory=dresses",
      },
    ],
    submenu: true,
    path: "/collections?category=women",
    sublinks: [
      {
        Head: "Topwear",
        sublink: [
          { name: "Tanks&Tees" },
          { name: "Shirts" },
          { name: "Knitwear" },
          { name: "Sweats" },
        ],
      },
      {
        Head: "Bottomwear",
        sublink: [
          { name: "Pants&Skirts" },
          { name: "Denim" },
          { name: "Shorts" },
        ],
      },
      {
        Head: "Outerwear",
        sublink: [{ name: "Dresses" }, { name: "Suiting" }, { name: "Jacket" }],
      },
    ],
  },
  {
    name: "kids",
    imgs: [
      {
        src: kid1,
        title: "Tees",
        link: "/collections?category=kids&subCategory=tees",
      },
      {
        src: kid2,
        title: "Sweats",
        link: "/collections?category=kids&subCategory=sweats",
      },
      {
        src: kid3,
        title: "Bottoms",
        link: "/collections?category=kids&subCategory=bottoms",
      },
    ],
    submenu: true,
    path: "/collections?category=kids",
    sublinks: [
      {
        Head: "",
        sublink: [
          { name: "Tees" },
          { name: "Sweats" },
          { name: "Bottoms" },
          { name: "Knitwear" },
        ],
      },
    ],
  },
  {
    name: "accessories",
    imgs: [
      {
        src: acc1,
        title: "Leather",
        link: "/collections?category=accessories&subCategory=leather",
      },
      {
        src: acc2,
        title: "Bags",
        link: "/collections?category=accessories&subCategory=bags",
      },
      {
        src: acc3,
        title: "Hats",
        link: "/collections?category=accessories&subCategory=hats",
      },
    ],
    submenu: true,
    path: "/collections?category=accessories",
    sublinks: [
      {
        Head: "",
        sublink: [
          { name: "Leather" },
          { name: "Bags" },
          { name: "Hats" },
          { name: "Jewellery" },
          { name: "Socks" },
        ],
      },
    ],
  },
];

export const sizes = [
  {
    id: "XS",
    value: "XS",
  },
  {
    id: "S",
    value: "S",
  },
  {
    id: "M",
    value: "M",
  },
  {
    id: "L",
    value: "L",
  },
  {
    id: "XL",
    value: "XL",
  },
  {
    id: "XXL",
    value: "XXL",
  },
];

export const slides = [
  {
    img: men,
    imgRes: menRespon,
    title: "100% Linen Arrivals",
    decs: "Introducing a new bias cut skirt, relaxed puff sleeve styles and a premium men's suit that's so relaxed you can wear it every day.",
    path: "/collections?category=men",
  },
  {
    img: women,
    imgRes: womenRespon,
    title: "New Season Textures",
    decs: "Introducing naturally lightweight knit styles made for warmer seasons.",
    path: "/collections?category=women",
  },
  {
    img: kid,
    imgRes: kidRespon,
    title: "Spring Kids",
    decs: "This week’s kids arrivals include art print tees and colourful cotton sets. ",
    path: "/collections?category=kids",
  },
];

export const categories = [
  {
    img: menCat,
    btn: "Shop Men",
    link: "/collections?category=men",
  },
  {
    img: womenCat,
    btn: "Shop Women",
    link: "/collections?category=women",
  },
  {
    img: accCat,
    btn: "Shop Accessories",
    link: "/collections?category=accessories",
  },
  {
    img: kidCat,
    btn: "Shop Kid",
    link: "/collections?category=kids",
  },
];

export const filterByPrice =[
  {
    id:'under50',
    value:'Under $50',
  },
  {
    id:'50-100',
    value:'$50-$100',
  },
  {
    id:'100-250',
    value:'$100-$250',
  },
  {
    id:'above250',
    value:'Above $250',
  },
]