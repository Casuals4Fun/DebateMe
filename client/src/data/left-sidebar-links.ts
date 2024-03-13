import { RiHome2Fill } from "react-icons/ri";
import { RiFireFill } from "react-icons/ri";
import { FaFeather } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { PiBellSimpleFill } from "react-icons/pi";
import { IoMdCreate } from "react-icons/io";
// import { BiSolidMessageSquareAdd } from "react-icons/bi";

export const leftSidebarLinks = [
    {
        id: 1,
        name: "Home",
        href: "/",
        icon: RiHome2Fill
    },
    {
        id: 2,
        name: "Create Debate",
        href: "/create",
        icon: IoMdCreate
    },
    {
        id: 3,
        name: "Hot Topics",
        href: "/hot-topics",
        icon: RiFireFill
    },
    {
        id: 4,
        name: "Open Topics",
        href: "/open-topics",
        icon: FaFeather
    },
    {
        id: 5,
        name: "Notifications",
        href: "/notifications",
        icon: PiBellSimpleFill
    },
    {
        id: 6,
        name: "Search",
        href: "/search",
        icon: IoSearch
    }
]