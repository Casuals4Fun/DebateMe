import { RiHome2Fill } from "react-icons/ri";
import { RiFireFill } from "react-icons/ri";
import { FaFeather } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { PiBellSimpleFill } from "react-icons/pi";

export const leftSidebarLinks = [
    {
        id: 1,
        name: "Home",
        href: "/",
        icon: RiHome2Fill
    },
    {
        id: 2,
        name: "Hot Topics",
        href: "/hot-topics",
        icon: RiFireFill
    },
    {
        id: 3,
        name: "Open Topics",
        href: "/open-topics",
        icon: FaFeather
    },
    {
        id: 4,
        name: "Notifications",
        href: "/notifications",
        icon: PiBellSimpleFill
    },
    {
        id: 5,
        name: "Search",
        href: "/search",
        icon: IoSearch
    },
]