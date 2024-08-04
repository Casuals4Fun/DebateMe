import "./explore.css"
import { useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { IoSearch } from "react-icons/io5"
import { categoriesData } from "../../data/categories-data"

interface ExploreProps {
    term?: string
}

const Explore: React.FC<ExploreProps> = ({ term }) => {
    const navigate = useNavigate()

    const inputRef = useRef<HTMLInputElement | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!searchTerm.trim()) {
            setFormSubmitted(true)
            setTimeout(() => setFormSubmitted(false), 500)
            return
        }
        navigate(`/search?term=${searchTerm.trim()}`)
        setFormSubmitted(true)
        inputRef.current?.blur()
    }

    return (
        <div id='explore'>
            <form id='explore-form' className='explore-input' onSubmit={handleSearch}>
                <div style={{ flex: '1' }}>
                    <input
                        name='search'
                        ref={inputRef}
                        type='text'
                        placeholder='Explore...'
                        value={searchTerm}
                        onChange={e => {
                            setSearchTerm(e.target.value)
                            setFormSubmitted(false)
                        }}
                        style={{ borderColor: formSubmitted && searchTerm.trim() === '' ? 'var(--body_color)' : '' }}
                        className={formSubmitted && searchTerm.trim() === '' ? 'shake' : ''}
                        autoFocus={location.pathname === '/search'}
                    />
                </div>
                <div>
                    <button type='submit'>
                        <IoSearch size={15} />
                    </button>
                </div>
            </form>
            {!term && (
                <div className='explore-btns'>
                    {categoriesData.map((item, index) => (
                        <Link to={`/search?category=${item}`} key={index}>
                            {item}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Explore