import './style.css'
import { useRef, useState } from 'react'
import { RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor'
import { toast } from 'sonner'
import Editor from './editor'
import Preview from './preview'

interface CreateDebateProps {
    isScrolling: boolean
}

const CreateDebatePage: React.FC<CreateDebateProps> = ({ isScrolling }) => {
    const editorRef = useRef<RichTextEditorComponent>(null)
    const [debateData, setDebateData] = useState({ title: '', body: '' })
    const [isPreview, setIsPreview] = useState<boolean>(false)

    const handlePreviewToggle = () => {
        if (!debateData.title.trim()) return toast.warning('Enter debate title')

        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = editorRef.current?.value || ''
        const bodyText = tempDiv.textContent?.replace(/\u200B/g, '').trim()

        if (!bodyText) return toast.warning('Enter debate body')

        setIsPreview(!isPreview)
    }

    return (
        <div id='create'>
            {!isPreview ? (
                <form id='create-debate'>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h2>Title</h2>
                        <textarea
                            name='title'
                            className='title__input'
                            placeholder='Your debate topic'
                            value={debateData.title}
                            onChange={e => setDebateData({ ...debateData, title: e.target.value })}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h2>Body</h2>
                        <Editor
                            editorRef={editorRef}
                            isEditable={true}
                            setDebateData={setDebateData}
                        />
                    </div>
                </form>
            ) : (
                <Preview
                    editorRef={editorRef}
                    debateData={debateData}
                />
            )}

            <div className={`debate-btns ${isScrolling ? 'hide' : 'reveal'}`}>
                <button
                    type='button'
                    onClick={handlePreviewToggle}
                >
                    {isPreview ? 'BACK' : 'PREVIEW'}
                </button>
                <button type='submit' onClick={() => toast.warning('Currently under development')}>
                    PUBLISH
                </button>
            </div>
        </div>
    )
}

export default CreateDebatePage