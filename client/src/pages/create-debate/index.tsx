import "./style.css"
import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useNavStore } from "../../store/useNavStore"

export default function CreateDebatePage() {
    const { sidebar } = useNavStore();

    const [value, setValue] = useState('');
    console.log(value);

    return (
        <div id="create">
            <ReactQuill
                className={sidebar ? '' : 'h-full'}
                theme="snow"
                value={value}
                onChange={setValue}
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        ['link', 'formula'],

                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],

                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'font': [] }],
                        [{ 'align': [] }],

                        ['clean']
                    ],
                    clipboard: {
                        matchVisual: false,
                    }
                }}
                bounds={`#create`}
            />
        </div >
    );
}