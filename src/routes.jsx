import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
import { RiBriefcase2Line } from "react-icons/ri";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { BiTask } from "react-icons/bi";
import { GoPeople } from "react-icons/go";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <RiBriefcase2Line {...icon} />,
        name: "projects",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <BiTask {...icon} />,
        name: "my task",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <GoPeople {...icon} />,
        name: "teams",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <LuCalendarDays {...icon} />,
        name: "calendar",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "insights",
    layout: "auth",
    pages: [
      {
        icon: <HiOutlineChatBubbleBottomCenterText {...icon} />,
        name: "inbox",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
