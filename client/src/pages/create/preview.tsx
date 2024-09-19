import { RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor'
import Editor from './editor'
import { IoCaretUpSharp } from 'react-icons/io5'
import { MdModeComment } from 'react-icons/md'

interface PreviewProps {
    editorRef: React.RefObject<RichTextEditorComponent>
    debateData: { title: string, body: string }
}

const Preview: React.FC<PreviewProps> = ({ editorRef, debateData }) => {
    return (
        <div className='preview'>
            <h1>{debateData.title}</h1>
            <div className='detail'>
                <div className='user-info'>
                    <img src='/user2.jpeg' alt='avatar' loading='lazy' />
                    <div className='user-detail'>
                        <p>Pratik Prasad</p>
                        <p>pratikprasad</p>
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
                editorRef={editorRef}
                rteValue={debateData.body}
                isEditable={false}
            />
        </div>
    )
}

export default Preview