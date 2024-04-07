import "./style.css";

interface Props {
    size: number
}

const LoadingSVG: React.FC<Props> = ({ size }) => {
    return (
        <svg className="loading-spinner" width={size} height={size} viewBox={`0 0 16 16`} fill="none" data-view-component="true">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none"></circle>
            <path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path>
        </svg>
    )
}

const LoadingComponent = () => {
    return (
        <div className="loading-component">
            <LoadingSVG
                size={30}
            />
        </div>
    )
}

export { LoadingSVG, LoadingComponent }