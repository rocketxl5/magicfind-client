const Result = ({ count, result }) => {
    return (
        <div className="product-result">
            <p><span>{result}</span> of <span>{count}</span> {count > 1 ? 'results' : 'result'}</p>
        </div>
    )
}

export default Result