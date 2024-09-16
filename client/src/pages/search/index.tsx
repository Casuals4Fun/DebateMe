import './style.css'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoMdClose } from 'react-icons/io'
import { useNavStore } from '../../store/nav'
import Explore from '../../components/sidebar/explore'
import Debate from '../../components/debate'
import { DebateCard, DebateLoadingCard } from '../../components/debate/card'

export default function SearchPage() {
    const location = useLocation()
    const navigate = useNavigate()

    const { isScrolling } = useNavStore()

    const [searchTerm, setSearchTerm] = useState<string | null>('')

    const handleClearSearch = () => {
        setSearchTerm('')
        navigate('/search')
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const termValue = urlParams.get('term')
        const categoryValue = urlParams.get('category')

        if (termValue || categoryValue) {
            setSearchTerm(termValue || categoryValue)
        }
    }, [location.search, navigate])

    return (
        <div id='search'>
            {!searchTerm ? (
                <Explore />
            ) : (
                (
                    <>
                        <div className={`header ${isScrolling ? 'hide' : 'reveal'}`}>
                            <h1>Showing results for <span>{searchTerm}</span></h1>
                            <button onClick={handleClearSearch}>
                                <IoMdClose size={25} />
                            </button>
                        </div>
                        <Debate>
                            <DebateCard />
                            <DebateLoadingCard />
                            <DebateCard />
                            <DebateLoadingCard />
                            <DebateCard />
                            <DebateLoadingCard />
                            <DebateCard />
                            <DebateLoadingCard />
                        </Debate>
                    </>
                )
            )}
        </div>
    )
}