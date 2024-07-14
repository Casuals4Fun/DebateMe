import "./editor.css"
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
    PasteCleanup,
    Resize
} from "@syncfusion/ej2-react-richtexteditor"

interface EditorProps {
    editorRef: React.RefObject<RichTextEditorComponent>
    rteValue?: string
    isEditable: boolean
    setDebateData?: React.Dispatch<React.SetStateAction<{
        title: string;
        body: string;
    }>>
}

const Editor: React.FC<EditorProps> = ({ editorRef, rteValue, isEditable, setDebateData }) => {
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

    return (
        <RichTextEditorComponent
            id="toolsRTE"
            ref={editorRef}
            value={rteValue}
            showCharCount={isEditable}
            toolbarSettings={isEditable ? toolbarSettings : undefined}
            quickToolbarSettings={isEditable ? quickToolbarSettings : undefined}
            enableTabKey={isEditable}
            enableXhtml={isEditable}
            placeholder="Your debate body"
            enableResize={isEditable}
            readonly={!isEditable}
            change={(e: { value: string }) => {
                if (isEditable && setDebateData) {
                    setDebateData(prevState => ({
                        ...prevState,
                        body: e.value
                    }));
                }
            }}
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
                    Resize
                ]}
            />
        </RichTextEditorComponent>
    )
}

export default Editor