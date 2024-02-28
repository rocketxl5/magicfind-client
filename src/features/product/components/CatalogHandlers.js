import Loading from '../../../layout/Loading';
import Select from '../../../components/Select';
import Label from '../../../components/Label';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import useFetch from '../../../hooks/useFetch';
import data from '../../../data/SEARCH.json';


const CatalogHandlers = ({ product, loading, setLoading }) => {
    const { conditions, finishes, languages } = data.product;
    const { set_name, price, language, userName, comment, country, condition, card_faces, oversized, avatar, rating } = product;

    const { cartItems } = useCart();
    // const {data, loading, error } = useFetch 
    console.log(cartItems)
    return (
        <>
            {
                loading ? (
                        <Loading />
                ) : (
                        <div className="catalog-handlers">
                            <div className="">
                                <p><span className="">Condition:</span>  <span className="">{conditions[condition]}</span></p>
                            </div>
                            <div className="">
                                <p><span className="">Language:</span>  <span className="">{languages[language]}</span></p>
                            </div>
                            <div className="">
                                <p><span className="">Price:</span>  <span className="">{product.price}</span></p>
                            </div>
                            <div className="">
                                <p><span className="">Quantity Available:</span>  <span className="">{product.quantity}</span></p>
                            </div>
                            <div className="">
                                <p><span className="">Quantity Selected:</span>  <span className="">{product.quantity}</span></p>
                            </div>
                            {
                                product?.quantity &&
                                <div>
                                    <Label htmlFor={'quantity-selector'} label={'Choose Quantity:'}>
                                        <Select id={'quantity-selector'} className={'catalog-item-quantity'} product={product} setLoading={(value) => setLoading(value)} />
                                    </Label>
                                </div>
                            }
                        </div>
                    )
            }

        </>
    )
}


export default CatalogHandlers
