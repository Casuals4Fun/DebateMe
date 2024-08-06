import './style.css'
import { useRef, useState } from 'react'
import { RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor'
import { toast } from 'sonner'
import Editor from './editor'
import Preview from './preview'

interface CreateProps {
    isScrollingUp: boolean
    isFullscreen: boolean
}

const CreateDebatePage: React.FC<CreateProps> = ({ isScrollingUp, isFullscreen }) => {
    const editorRef = useRef<RichTextEditorComponent>(null)
    const [debateData, setDebateData] = useState({ title: '', body: '' })
    const [isPreview, setIsPreview] = useState<boolean>(false)

    const handlePreviewToggle = () => {
        if (!isPreview) {
            if (editorRef.current) {
                const content = editorRef.current.getHtml()
                setDebateData({ ...debateData, body: content })
            }
        }

        if (!debateData.title.trim()) return toast.warning('Enter debate title')

        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = editorRef.current?.value || ''
        const bodyText = tempDiv.textContent?.replace(/\u200B/g, '').trim()

        if (!bodyText || bodyText === '<br>' || bodyText === '<br><br>' || bodyText === '<br><br><br>') {
            return toast.warning('Enter debate body')
        }

        setIsPreview(!isPreview)
    }

    return (
        <div id='create'>
            <form id='create-debate' className={isPreview ? 'shift-left' : 'shift-right'}>
                <div className='vertical-space'>
                    <h2>Title</h2>
                    <textarea
                        name='title'
                        className='title__input'
                        placeholder='Your debate topic'
                        value={debateData.title}
                        onChange={e => setDebateData({ ...debateData, title: e.target.value })}
                    />
                </div>
                <div className='vertical-space'>
                    <h2>Body</h2>
                    <Editor
                        editorRef={editorRef}
                        isEditable={true}
                        setDebateData={setDebateData}
                    />
                </div>
            </form>

            <Preview isPreview={isPreview} editorRef={editorRef} debateData={debateData} />

            <div className={`debate-btns ${isScrollingUp ? 'reveal' : 'hide'} ${isFullscreen ? '' : 'w-full'}`}>
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