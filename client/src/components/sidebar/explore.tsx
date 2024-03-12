import "./explore.css";
import { IoSearch } from "react-icons/io5";

const Explore = () => {
    return (
        <div id='explore'>
            <div className='explore-input'>
                <div style={{ flex: "1" }}>
                    <input
                        type='text'
                        placeholder='Explore'
                    />
                </div>
                <div>
                    <button>
                        <IoSearch size={15} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Explore