const Count = ({ count, unit, classList }) => {
    return (
        <div className={classList}>
            <p><span>{unit}</span> of <span>{count}</span> {count > 1 ? 'results' : 'result'}</p>
        </div>
    )
}

export default Count