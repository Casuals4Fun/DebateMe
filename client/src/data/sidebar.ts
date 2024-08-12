import { RiHome2Fill, RiFireFill } from 'react-icons/ri'
import { FaFeather } from 'react-icons/fa6'
import { IoSearch } from 'react-icons/io5'
import { IoMdCreate } from 'react-icons/io'

export const navLinks = [
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
        name: 'Create Debate',
        href: '/create',
        icon: IoMdCreate
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