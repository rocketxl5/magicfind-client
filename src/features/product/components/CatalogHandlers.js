import Loading from '../../../layout/Loading';
import Container from '../../../components/Container';
import Label from '../../../components/Label';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import { FiPlus } from "react-icons/fi";
import useAuth from '../../../hooks/contexthooks/useAuth';
import useCart from '../../../hooks/contexthooks/useCart';
import useFetch from '../../../hooks/useFetch';
import data from '../../../data/SEARCH.json';

// userName, country, avatar, rating, email

const CatalogHandlers = ({ product, loading, setLoading }) => {
    // const { conditions, finish, languages } = data.product;
    const { set_name, price, quantity, language, condition, finishes, seller } = product;
    const { userName, country, avatar, rating, email } = seller;

    const { cartItems } = useCart();
    // const {data, loading, error } = useFetch 
    const specs = [
        {
            title: 'Edition:',
            value: set_name
        },
        {
            title: 'Finish:',
            value: data.product.finish[finishes]
        },
        {
            title: 'Condition:',
            value: data.product.conditions[condition]
        },
        {
            title: 'Language:',
            value: data.product.languages[language]
        },
        {
            title: 'Price:',
            value: price
        },
        {
            title: 'Quantity available:',
            value: quantity
        }
    ]

    // console.log(cartItems)
    return (
        <>
            {
                loading ? (
                        <Loading />
                ) : (
                        <>
                            <Container>
                                {
                                    specs &&
                                    specs.map((spec, i) => {
                                        return (
                                            <Container key={i} classList={''}>
                                                <p><span className="">{spec.title}</span>  <span className="">{spec.value}</span></p>
                                            </Container>

                                        )
                                    })
                                }

                            </Container>
                            {/* <Container>
                                <Avatar avatar={product.seller.avatar} handleClick={() => { console.log(seller) }} />
                            </Container> */}
                            <Container>
                                {
                                    quantity &&
                                    <Container>
                                        <Label
                                            htmlFor={'quantity-selector'}
                                            label={'Quantity Selected:'}
                                        >
                                            <Select
                                                    id={'quantity-selector'}
                                                    classList={'catalog-item-quantity'}
                                                    product={product}
                                                    setLoading={(value) => setLoading(value)}
                                            />
                                    </Label>
                                        </Container>
                            }
                            </Container>
                            <Container>
                                <Button>
                                    <FiPlus />
                                </Button>
                            </Container>
                        </>
                    )
            }

        </>
    )
}


export default CatalogHandlers
