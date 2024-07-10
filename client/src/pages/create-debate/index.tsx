import "./style.css"
import { useEffect, useRef, useState } from "react"

export default function CreateDebatePage() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        const loadSCEditor = async () => {
            try {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'node_modules/sceditor/minified/themes/default.min.css';
                document.head.appendChild(link);

                const sceditorScript = document.createElement('script');
                sceditorScript.src = 'node_modules/sceditor/minified/sceditor.min.js';
                sceditorScript.onload = () => {
                    const formatScript = document.createElement('script');
                    formatScript.src = 'node_modules/sceditor/minified/formats/xhtml.js';
                    formatScript.onload = () => {
                        if (textareaRef.current) {
                            fetch('/src/pages/create-debate/emoticons.json')
                                .then(response => response.json())
                                .then((emoticons: string[]) => {
                                    const emoticonsConfig: { dropdown: { [key: string]: string } } = { dropdown: {} };

                                    emoticons.forEach(emoticon => {
                                        const name = `:${emoticon.split('.')[0]}`;
                                        emoticonsConfig.dropdown[name] = emoticon;
                                    });

                                    (window as any).sceditor.create(textareaRef.current, {
                                        format: 'xhtml',
                                        style: 'node_modules/sceditor/minified/themes/default.min.css',
                                        emoticonsRoot: 'node_modules/sceditor/emoticons/',
                                        emoticons: emoticonsConfig
                                    });

                                    setEditorLoaded(true);
                                });
                        }
                    };
                    document.body.appendChild(formatScript);
                };
                document.body.appendChild(sceditorScript);
            } catch (error) {
                console.error('Failed to load SCEditor:', error);
            }
        };

        loadSCEditor();

        return () => {
            if (textareaRef.current && (window as any).sceditor) {
                (window as any).sceditor.instance(textareaRef.current).destroy();
            }
        };
    }, []);

    return (
        <div id='create'>
            <textarea ref={textareaRef} className={editorLoaded ? '' : 'hidden'}></textarea>
        </div>
    )
}