import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from 'react-icons/io'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { MdOutlineModeComment } from 'react-icons/md'

interface CommentsProps {
    setTab: React.Dispatch<React.SetStateAction<'debate' | 'comment'>>
}

const Comments: React.FC<CommentsProps> = ({ setTab }) => {
    const navigate = useNavigate()

    return (
        <div>
            <div id='comment'>
                <div className='header'>
                    <button title='Back to debate' onClick={() => setTab('debate')} className='back-btn'>
                        <IoMdArrowBack size={25} />
                    </button>
                    <p style={{ fontSize: '20px', textAlign: 'center' }}>Discussions</p>
                </div>
                <div className='comment-box'>
                    <div className='user-info'>
                        <img src='/user2.jpeg' alt='avatar' loading='lazy' onClick={() => navigate('/pratikprasad')} />
                        <div className='user-detail'>
                            <p onClick={() => navigate('/pratikprasad')}>Pratik Prasad</p>
                            <p onClick={() => navigate('/pratikprasad')}>pratikprasad</p>
                        </div>
                    </div>
                    <p className='content'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt saepe accusantium necessitatibus quisquam, consequatur debitis sunt cum, molestias culpa minima dignissimos vitae ratione aliquid ex repudiandae harum dicta consectetur omnis!
                        Ducimus, ex amet ratione libero illo cupiditate error quia similique beatae. Soluta fuga aliquam at rerum consequuntur nemo a iure. Vero, incidunt iusto! Aliquid quidem laborum veritatis quae molestiae fugiat.
                    </p>
                    <div className='comment-btns'>
                        <button>
                            <AiOutlineLike size={25} />
                            <p>250</p>
                        </button>
                        <button>
                            <AiOutlineDislike size={25} />
                            <p>100</p>
                        </button>
                        <button>
                            <MdOutlineModeComment size={25} />
                            <p>70</p>
                        </button>
                    </div>
                </div>
                <div className='comment-box'>
                    <div className='user-info'>
                        <img src='/user1.webp' alt='avatar' loading='lazy' onClick={() => navigate('/aniketdas')} />
                        <div className='user-detail'>
                            <p onClick={() => navigate('/aniketdas')}>Pratik Prasad</p>
                            <p onClick={() => navigate('/aniketdas')}>pratikprasad</p>
                        </div>
                    </div>
                    <p className='content'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore consectetur quam laudantium unde recusandae non dolore, explicabo quaerat repudiandae quae eum minima expedita ipsa facilis deserunt eligendi accusantium. Porro, recusandae.
                    </p>
                    <div className='comment-btns'>
                        <button>
                            <AiOutlineLike size={25} />
                            <p>50</p>
                        </button>
                        <button>
                            <AiOutlineDislike size={25} />
                            <p>30</p>
                        </button>
                        <button>
                            <MdOutlineModeComment size={25} />
                            <p>5</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments