import './debate.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoCaretUpSharp } from 'react-icons/io5'
import { MdModeComment } from 'react-icons/md'
import { IoMdArrowBack } from 'react-icons/io'
import Editor from '../create-debate/editor'

export default function DebatePage() {
    const navigate = useNavigate()
    const { user_id, debate_id } = useParams()

    const [tab, setTab] = useState<'debate' | 'comment'>('debate')

    console.log({ user_id, debate_id })

    return (
        tab === 'debate' ? (
            <div id='debate'>
                <h1>{debate_id}</h1>
                <div className='detail'>
                    <div className='user-info'>
                        <img src='/user2.jpeg' alt='avatar' loading='lazy' onClick={() => navigate('/julieroberts')} />
                        <div className='user-detail'>
                            <p onClick={() => navigate('/julieroberts')}>Pratik Prasad</p>
                            <p onClick={() => navigate('/julieroberts')}>pratikprasad</p>
                        </div>
                    </div>
                    <div className='debate-detail'>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <IoCaretUpSharp size={25} color='var(--body_color)' />
                            <p>4500</p>
                        </button>
                        <button
                            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                            onClick={() => setTab('comment')}
                        >
                            <MdModeComment size={15} color='var(--body_color)' />
                            <p>1300</p>
                        </button>
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
        ) : (
            <div id='comment'>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'center'}}>
                    <button title='Back to debate' onClick={() => setTab('debate')} className='back-btn'>
                        <IoMdArrowBack size={20} />
                    </button>
                    <p style={{ fontSize: '20px', textAlign: 'center' }}>Discussions</p>
                </div>
            </div>
        )
    )
}