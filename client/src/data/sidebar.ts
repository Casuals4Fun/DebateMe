import { RiHome2Line, RiHome2Fill, RiFireLine, RiSearchLine, RiSearchFill, RiFireFill, RiNotification4Line, RiNotification4Fill } from 'react-icons/ri'
import { IoMdCreate } from 'react-icons/io'
import { MdOutlineCreate } from 'react-icons/md'

export const navLinks = [
    {
        id: 1,
        name: 'Home',
        href: '/',
        icon1: RiHome2Line,
        icon2: RiHome2Fill
    },
    {
        id: 2,
        name: 'Search',
        href: '/search',
        icon1: RiSearchLine,
        icon2: RiSearchFill
    },
    {
        id: 3,
        name: 'New Debate',
        href: '/create',
        icon1: MdOutlineCreate,
        icon2: IoMdCreate
    },
    {
        id: 4,
        name: 'Trending',
        href: '/trending',
        icon1: RiFireLine,
        icon2: RiFireFill
    },
    {
        id: 5,
        name: 'New Debate',
        href: '/create',
        icon1: MdOutlineCreate,
        icon2: IoMdCreate
    },
    {
        id: 6,
        name: 'Notifications',
        href: '/notifications',
        icon1: RiNotification4Line,
        icon2: RiNotification4Fill
    }
]

export const categoriesData = [
    'Arts',
    'Agriculture',
    'Business',
    'Education',
    'Entertainment',
    'Environment',
    'Fashion',
    'Finance',
    'Games',
    'Health',
    'Law',
    'Lifestyle',
    'Marketing',
    'Music',
    'News',
    'Parenting',
    'Politics',
    'Science',
    'Sports',
    'Technology',
    'Travel',
    'Writing'
]