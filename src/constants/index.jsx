import {
  Home,
  Image as BannerIcon,
  Boxes as ProductsIcon,
  Folder as CategoryIcon,
  FolderPlus as SubCategoryIcon,
  Newspaper as BlogIcon,
  MessageSquareQuote as TestimonialIcon,
  ShoppingCart as OrderIcon,
  Users,
  Settings,
} from "lucide-react";

export const navbarLinks = [
  {
    links: [
      {
        label: "Home",
        icon: Home,
        path: "/dashboard", // was "/"
      },
    ],
  },
  {
    title: "Users",
    links: [
        {
        label: "Vendors",
        icon: Users,
        path: "/dashboard/vendors",
      },
        {
        label: "Users",
        icon: Users,
        path: "/dashboard/users",
      },
      {
        label: "Categories",
        icon: CategoryIcon,
        path: "/dashboard/categories",
      },
        {
        label: "Products",
        icon: CategoryIcon,
        path: "/dashboard/products",
      },
    ],
  },
  // {
  //   title: "Settings",
  //   links: [
  //     {
  //       label: "Settings",
  //       icon: Settings,
  //       path: "/dashboard/settings",
  //     },
  //   ],
  // },
];
