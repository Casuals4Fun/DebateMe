import "./debate-bar.css";
import React from "react";
import useFormatNumber from "../../utils/useFormatNumber";

interface BarProps {
    debateFrom: number;
    debateBy: number;
}

const DebateBar: React.FC<BarProps> = ({ debateFrom, debateBy }) => {
    const totalVotes = debateFrom + debateBy;
    const leftPercentage = (debateFrom / totalVotes) * 100;
    const rightPercentage = (debateBy / totalVotes) * 100;

    return (
        <div className='debate-bar'>
            <>
                <div
                    className='left-side'
                    style={{
                        width: `${leftPercentage}%`,
                        borderRight: `${debateFrom !== 0 && debateBy !== 0 ? "2.5px solid var(--card_background)" : ""}`
                    }}
                />
                <p className='from-vote'>{useFormatNumber(debateFrom)}</p>
            </>
            <>
                <div
                    className='right-side'
                    style={{ width: `${rightPercentage}%` }}
                />
                <p className='to-vote'>{useFormatNumber(debateBy)}</p>
            </>
        </div>
    );
};

export default DebateBar;