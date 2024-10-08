import './bar.css'
import { IoCaretUpSharp } from 'react-icons/io5'
import useFormatNumber from '../../hooks/useFormatNumber'

interface BarProps {
    debateFrom: number
    debateBy: number
}

const DebateBar: React.FC<BarProps> = ({ debateFrom, debateBy }) => {
    const totalVotes = debateFrom + debateBy
    const leftPercentage = (debateFrom / totalVotes) * 100
    const rightPercentage = (debateBy / totalVotes) * 100

    return (
        <div className='debate-bar'>
            <>
                <div
                    className='left-side'
                    style={{ width: `${leftPercentage}%` }}
                />
                <div className='from-vote'>
                    <IoCaretUpSharp size={20} />
                    <p>{useFormatNumber(debateFrom)}</p>
                </div>
            </>
            <>
                <div
                    className='right-side'
                    style={{ width: `${rightPercentage}%` }}
                />
                <div className='to-vote'>
                    <IoCaretUpSharp size={20} />
                    <p>{useFormatNumber(debateBy)}</p>
                </div>
            </>
        </div>
    )
}

export default DebateBar