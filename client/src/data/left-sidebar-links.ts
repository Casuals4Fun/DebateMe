import { RiHome2Fill, RiFireFill } from 'react-icons/ri'
import { FaFeather } from 'react-icons/fa6'
import { IoSearch } from 'react-icons/io5'
import { PiBellSimpleFill } from 'react-icons/pi'
import { IoMdCreate } from 'react-icons/io'

export const leftSidebarLinks = [
    {
        id: 1,
        name: 'Home',
        href: '/',
        icon: RiHome2Fill
    },
    {
        id: 2,
        name: 'Search',
        href: '/search',
        icon: IoSearch
    },
    {
        id: 3,
        name: 'Create Debate',
        href: '/create',
        icon: IoMdCreate
    },
    {
        id: 4,
        name: 'Hot Topics',
        href: '/hot-topics',
        icon: RiFireFill
    },
    {
        id: 5,
        name: 'Open Topics',
        href: '/open-topics',
        icon: FaFeather
    },
    {
        id: 6,
        name: 'Notifications',
        href: '/notifications',
        icon: PiBellSimpleFill
    }
]