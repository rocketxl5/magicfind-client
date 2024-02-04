import data from '../../../../assets/data/SEARCH';

const Detail = ({ product }) => {
    return (
        <div className="product-detail">
            <div className="">
                <p><span className="">Condition:</span><span className="card-spec-value">{data.product.conditions[`${product.condition}`]}</span></p>
            </div>
            <div className="">
                <p><span className="">Set:</span><span className="card-spec-value">{product.set_name}</span></p>
            </div>
            <div className="">
                <p><span className="">Language:</span><span className="card-spec-value">{data.product.languages[`${product.language}`]}</span></p>
            </div>
        </div>
    )
}

export default Detail
