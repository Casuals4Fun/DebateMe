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
    Resize,
} from "@syncfusion/ej2-react-richtexteditor"

interface EditorProps {
    editorRef: React.RefObject<RichTextEditorComponent>
    rteValue: string
}

const Editor: React.FC<EditorProps> = ({ editorRef, rteValue }) => {
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
            showCharCount={true}
            toolbarSettings={toolbarSettings}
            quickToolbarSettings={quickToolbarSettings}
            enableTabKey={true}
            enableXhtml={true}
            placeholder="Your debate body"
            enableResize={true}
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