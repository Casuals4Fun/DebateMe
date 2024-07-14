import "./style.css";
import { useRef, useState } from "react";
import { RichTextEditorComponent } from "@syncfusion/ej2-react-richtexteditor";
import Editor from "./editor";
import Preview from "./preview";

interface CreateProps {
    isVisible: boolean;
    isFullscreen: boolean;
}

const CreateDebatePage: React.FC<CreateProps> = ({ isVisible, isFullscreen }) => {
    const editorRef = useRef<RichTextEditorComponent>(null);
    const [debateData, setDebateData] = useState({ title: 'Sony is the best camera of all time', body: '' });
    const [isPreview, setIsPreview] = useState<boolean>(false);

    const handlePreviewToggle = () => {
        if (!isPreview) {
            if (editorRef.current) {
                const content = editorRef.current.getHtml();
                setDebateData({ ...debateData, body: content });
            }
        }
        setIsPreview(!isPreview);
    };

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
                <div className='space' />
            </form>

            <Preview isPreview={isPreview} editorRef={editorRef} debateData={debateData} />

            <div className={`debate-btns ${isVisible ? 'reveal' : 'hide'} ${isFullscreen ? 'w-full' : ''}`}>
                <button
                    type='button'
                    onClick={handlePreviewToggle}
                >
                    {isPreview ? 'BACK' : 'PREVIEW'}
                </button>
                <button type='submit' onClick={() => { }}>PUBLISH</button>
            </div>
        </div>
    );
}

export default CreateDebatePage;