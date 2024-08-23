import { useParams } from 'react-router-dom'

export default function DebatePage() {
    const { user_id, debate_id } = useParams()

    return (
        <div>
            <h1>{debate_id}</h1>
            <p>By {user_id}</p>
        </div>
    )
}