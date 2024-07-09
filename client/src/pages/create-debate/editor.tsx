import { useState, useRef } from 'react';

export default function CreateDebatePage() {
    const [content, setContent] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const applyFormatting = (tag: string) => {
        const textarea = textAreaRef.current;
        if (textarea) {
            const start = textarea.selectionStart || 0;
            const end = textarea.selectionEnd || 0;

            const selectedText = content.substring(start, end);
            let newText;

            switch (tag) {
                case 'p':
                case 'b':
                case 'i':
                case 's':
                case 'code':
                case 'pre':
                    newText = content.slice(0, start) + `<${tag}>${selectedText}</${tag}>` + content.slice(end);
                    break;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    newText = content.slice(0, start) + `<${tag}>${selectedText}</${tag}>` + content.slice(end);
                    break;
                case 'ul':
                    newText = content.slice(0, start) + `<ul><li>${selectedText}</li></ul>` + content.slice(end);
                    break;
                case 'ol':
                    newText = content.slice(0, start) + `<ol><li>${selectedText}</li></ol>` + content.slice(end);
                    break;
                default:
                    newText = content;
                    break;
            }

            setContent(newText);

            setTimeout(() => {
                let newCursorPosition;
                switch (tag) {
                    case 'p':
                    case 'b':
                    case 'i':
                    case 's':
                        newCursorPosition = start === end ? start + tag.length + 2 : start + 6 + selectedText.length + tag.length;
                        break;
                    case 'code':
                        newCursorPosition = start === end ? start + tag.length + 2 : start + 13 + selectedText.length;
                        break;
                    case 'pre':
                        newCursorPosition = start === end ? start + tag.length + 8 : start + 24 + selectedText.length;
                        break;
                    case 'h1':
                    case 'h2':
                    case 'h3':
                    case 'h4':
                    case 'h5':
                    case 'h6':
                        newCursorPosition = start === end ? start + tag.length + 2 : start + selectedText.length + tag.length + 7;
                        break;
                    case 'ul':
                    case 'ol':
                        newCursorPosition = start === end ? start + 8 : start + 13 + selectedText.length;
                        break;
                    default:
                        newCursorPosition = start;
                        break;
                }

                if (textarea) {
                    textarea.focus();
                    textarea.setSelectionRange(newCursorPosition, newCursorPosition);
                }
            }, 0);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => applyFormatting('p')}>Paragraph</button>
                <button onClick={() => applyFormatting('b')}>Bold</button>
                <button onClick={() => applyFormatting('i')}>Italic</button>
                <button onClick={() => applyFormatting('s')}>Strikethrough</button>
                <button onClick={() => applyFormatting('code')}>Code</button>
                <button onClick={() => applyFormatting('pre')}>Code Block</button>
                <button onClick={() => applyFormatting('h1')}>H1</button>
                <button onClick={() => applyFormatting('h2')}>H2</button>
                <button onClick={() => applyFormatting('h3')}>H3</button>
                <button onClick={() => applyFormatting('h4')}>H4</button>
                <button onClick={() => applyFormatting('h5')}>H5</button>
                <button onClick={() => applyFormatting('h6')}>H6</button>
                <button onClick={() => applyFormatting('ul')}>Bulleted List</button>
                <button onClick={() => applyFormatting('ol')}>Ordered List</button>
            </div>
            <textarea
                ref={textAreaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ width: '100%', height: '200px' }}
            />
            <div
                dangerouslySetInnerHTML={{ __html: content }}
                style={{ border: '1px solid #ccc', marginTop: '20px', padding: '10px', whiteSpace: 'pre-wrap' }}
            />
        </div>
    );
}