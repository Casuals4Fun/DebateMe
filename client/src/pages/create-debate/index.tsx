import "./style.css"
import { useRef } from "react"
import {
    RichTextEditorComponent,
    Toolbar,
    Inject,
    Image,
    Link,
    HtmlEditor,
    Count,
    QuickToolbar,
    Table,
    EmojiPicker,
    Video,
    Audio,
    FormatPainter,
    PasteCleanup
} from "@syncfusion/ej2-react-richtexteditor"

function CreateDebatePage() {
    const editorRef = useRef<RichTextEditorComponent>(null);
    // const [editorContent, setEditorContent] = useState<string>('');
    const rteValue = ``;
    const hostUrl = 'https://services.syncfusion.com/react/production/';
    const items = [
        'Undo',
        'Redo',
        '|',
        'Bold',
        'Italic',
        'Underline',
        'StrikeThrough',
        'SuperScript',
        'SubScript',
        '|',
        'FontName',
        'FontSize',
        'FontColor',
        'BackgroundColor',
        '|',
        'LowerCase',
        'UpperCase',
        '|',
        'Formats',
        'Alignments',
        'Blockquote',
        '|',
        'NumberFormatList',
        'BulletFormatList',
        '|',
        'Outdent',
        'Indent',
        '|',
        'CreateLink',
        'Image',
        'Video',
        'Audio',
        'CreateTable',
        '|',
        'FormatPainter',
        'ClearFormat',
        '|',
        'EmojiPicker',
    ];
    const toolbarSettings = {
        items: items,
    };
    const quickToolbarSettings = {
        table: [
            'TableHeader',
            'TableRows',
            'TableColumns',
            'TableCell',
            '-',
            'BackgroundColor',
            'TableRemove',
            'TableCellVerticalAlign',
            'Styles',
        ],
        showOnRightClick: true,
    };

    const insertImageSettings = {
        saveUrl: hostUrl + 'api/RichTextEditor/SaveFile',
        removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',
        path: hostUrl + 'RichTextEditor/',
    };

    // const saveEditorContent = () => {
    //     if (editorRef.current) {
    //         const content = editorRef.current.value;
    //         setEditorContent(content);
    //     }
    // };

    return (
        <div className="control-pane">
            <div className="control-section" id="rteTools">
                <div className="rte-control-section">
                    <RichTextEditorComponent
                        id="toolsRTE"
                        ref={editorRef}
                        value={rteValue}
                        showCharCount={true}
                        toolbarSettings={toolbarSettings}
                        quickToolbarSettings={quickToolbarSettings}
                        enableTabKey={true}
                        insertImageSettings={insertImageSettings}
                        enableXhtml={true}
                        placeholder="Type something here..."
                    >
                        <Inject
                            services={[
                                Toolbar,
                                Image,
                                Link,
                                HtmlEditor,
                                Count,
                                QuickToolbar,
                                Table,
                                EmojiPicker,
                                Video,
                                Audio,
                                FormatPainter,
                                PasteCleanup,
                            ]}
                        />
                    </RichTextEditorComponent>
                </div>
            </div>
            {/* <button onClick={saveEditorContent}>Save</button> */}
        </div>
    );
}

export default CreateDebatePage;