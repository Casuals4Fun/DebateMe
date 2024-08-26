import './debate.css'
import { useNavigate, useParams } from 'react-router-dom'
import { IoCaretUpSharp } from 'react-icons/io5'
import { MdModeComment } from 'react-icons/md'
import Editor from '../create-debate/editor'

export default function DebatePage() {
    const navigate = useNavigate()
    const { user_id, debate_id } = useParams()

    console.log({ user_id, debate_id })

    return (
        <div id='debate'>
            <h1>{debate_id}</h1>
            <div className='detail'>
                <div className='user-info'>
                    <img src='/user2.jpeg' alt='' loading='lazy' onClick={() => navigate('/julieroberts')} />
                    <div className='user-detail'>
                        <p onClick={() => navigate('/julieroberts')}>Pratik Prasad</p>
                        <p onClick={() => navigate('/julieroberts')}>pratikprasad</p>
                    </div>
                </div>
                <div className='debate-detail'>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <IoCaretUpSharp size={25} color='var(--body_color)' />
                        <p>4500</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <MdModeComment size={15} color='var(--body_color)' />
                        <p>1300</p>
                    </div>
                </div>
            </div>
            <Editor
                editorRef={null}
                rteValue='Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus placeat temporibus voluptatibus facere autem ipsa reprehenderit at nostrum accusamus atque voluptas, illum vitae explicabo soluta, ea rem quas veritatis tempora.
                Veritatis, iusto a architecto odio quaerat dolor aspernatur inventore illo impedit sapiente commodi, exercitationem repellendus sit, veniam dicta ipsa. Vero consequatur iusto odio minus officiis veritatis labore reiciendis molestiae natus?
                Rerum repellendus architecto molestiae ipsam officiis.'
                isEditable={false}
            />
        </div>
    )
}