import { RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor'
import Editor from './editor'

interface PreviewProps {
    isPreview: boolean
    editorRef: React.RefObject<RichTextEditorComponent>
    debateData: { title: string, body: string }
}

const Preview: React.FC<PreviewProps> = ({ isPreview, editorRef, debateData }) => {
    return (
        <div className={`preview ${isPreview ? 'shift-left' : 'shift-right'}`}>
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