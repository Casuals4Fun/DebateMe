import './style.css'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNavStore } from '../../store/useNavStore'
import Explore from '../../components/sidebar/explore'
import { IoMdClose } from 'react-icons/io'
import { PiArrowBendUpRightBold } from 'react-icons/pi'

export default function SearchPage() {
    const location = useLocation()
    const navigate = useNavigate()

    const { isSidebarClose } = useNavStore()

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const termValue = urlParams.get('term')
        const categoryValue = urlParams.get('category')

        if (termValue === '' || categoryValue === '') navigate('/')
        else {
            const searchValue = termValue ?? categoryValue ?? ''
            setSearchTerm(searchValue)
        }
    }, [location.search, navigate])

    return (
        <div id='search'>
            <div className={`explore__container ${isSidebarClose ? 'visible' : 'hidden'}`}>
                <Explore term={searchTerm} />
            </div>

            {searchTerm ? (
                <>
                    <div className='search-term'>
                        <h1>
                            Showing results for <span>{searchTerm}</span>
                        </h1>
                        <button className='clear-term' onClick={() => navigate('/search')}>
                            <IoMdClose size={20} />
                        </button>
                    </div>
                    <p>No debates found</p>
                </>
            ) : (
                <div className={`search-here ${isSidebarClose ? 'hidden' : ''}`}>
                    <PiArrowBendUpRightBold size={50} />
                    <h2>Search here</h2>
                </div>
            )}
        </div>
    )
}