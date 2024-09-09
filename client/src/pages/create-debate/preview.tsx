import { RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor'
import Editor from './editor'

interface PreviewProps {
    editorRef: React.RefObject<RichTextEditorComponent>
    debateData: { title: string, body: string }
}

const Preview: React.FC<PreviewProps> = ({ editorRef, debateData }) => {
    return (
        <div className='preview'>
            <h1>{debateData.title}</h1>
            <Editor
                editorRef={editorRef}
                rteValue={debateData.body}
                isEditable={false}
            />
        </div>
    )
}

export default Preview