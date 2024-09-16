import './explore.css'
import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GrLinkNext } from 'react-icons/gr'
import { categoriesData } from '../../data/sidebar'

const Explore = () => {
    const navigate = useNavigate()

    const inputRef = useRef<HTMLInputElement | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!searchTerm.trim()) return

        navigate(`/search?term=${searchTerm.trim()}`)
        setSearchTerm('')
        inputRef.current?.blur()
    }

    return (
        <div id='explore'>
            <form id='explore-form' className='explore-input' onSubmit={handleSearch}>
                <input
                    name='search'
                    ref={inputRef}
                    type='text'
                    placeholder='Explore...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    autoFocus={location.pathname === '/search'}
                />
                {searchTerm.trim() && (
                    <button type='submit'>
                        <GrLinkNext size={15} />
                    </button>
                )}
            </form>
            <div className='explore-btns'>
                {categoriesData.map((item, index) => (
                    <Link
                        key={index}
                        to={`/search?category=${item.toLowerCase()}`}
                        style={{ textDecoration: location.search.split('?category=')[1] === item ? 'underline' : '' }}
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Explore