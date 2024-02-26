import Loading from '../../../layout/Loading';
import Select from '../../../components/Select';
import styled from 'styled-components';

const CatalogHandlers = ({ product, loading, setLoading }) => {

    return (
        <>
            {
                loading ? (
                        <Loading />
                ) : (
                        <div className="catalog-handlers">
                            <div className="">
                                <p><span className="">Price:</span>  <span className="card-spec-value">{product.price}</span></p>
                            </div>
                            <div className="">
                                <p><span className="">Quantity Available:</span>  <span className="card-spec-value">{product.quantity}</span></p>
                            </div>
                            {
                                product?.quantity &&
                                <Select className={'catalog-item-quantity'} product={product} setLoading={(value) => setLoading(value)} />
                            }
                        </div>
                    )
            }

        </>
    )
}

const Selector = styled.div`
  display: flex;
  justify-content: space-between;
  width: 10em;
  padding: 0.5em 0;

  select {
    padding: 0.2em;
    width: 4em;
    height: 4rem;

  }
`;

export default CatalogHandlers
