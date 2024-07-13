import "./style.css"
import { useRef, useState } from "react"
import { RichTextEditorComponent } from "@syncfusion/ej2-react-richtexteditor"
import Editor from "./editor";

interface CreateProps {
    isVisible: boolean
    isFullscreen: boolean
}

const CreateDebatePage: React.FC<CreateProps> = ({ isVisible, isFullscreen }) => {
    const editorRef = useRef<RichTextEditorComponent>(null);
    const [editorContent, setEditorContent] = useState<string>('');

    const saveEditorContent = () => {
        if (editorRef.current) {
            const content = editorRef.current.value;
            setEditorContent(content);
        }
    }; console.log(editorContent);

    return (
        <form id='create'>
            <div className='vertical-space'>
                <h2>Title</h2>
                <textarea
                    className='title__input'
                    placeholder='Your debate topic'
                />
            </div>
            <div className='vertical-space'>
                <h2>Body</h2>
                <Editor
                    editorRef={editorRef}
                    rteValue=""
                />
            </div>
            <div className='space' />
            <div className={`debate-btns ${isVisible ? 'reveal' : 'hide'} ${isFullscreen ? 'w-full' : ''}`}>
                <button type='button' onClick={saveEditorContent}>PREVIEW</button>
                <button type='submit' onClick={() => { }}>PUBLISH</button>
            </div>
        </form>
    );
}

export default CreateDebatePage;