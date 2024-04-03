import "./style.css";

interface SkeletonProps {
  style?: React.CSSProperties
}

const LoadingSkeleton: React.FC<SkeletonProps> = ({ style }) => {
  return (
    <div className='loading-skeleton' style={style} />
  )
}

export default LoadingSkeleton