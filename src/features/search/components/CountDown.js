const CountDown = ({ count, unit, type, classList }) => {
    return (
        <div className={classList}>
            <p><span>{unit}</span> of <span>{count}</span> {count > 1 ? `${type}s` : type}</p>
        </div>
    )
}

export default CountDown