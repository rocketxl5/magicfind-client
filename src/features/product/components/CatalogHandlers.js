import Loading from '../../../layout/Loading';
import Container from '../../../components/Container';
import Label from '../../../components/Label';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import { FiPlus } from "react-icons/fi";
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import useFetch from '../../../hooks/useFetch';
import data from '../../../data/SEARCH.json';



const CatalogHandlers = ({ product, loading, setLoading }) => {
    const { conditions, finish, languages } = data.product;
    const { set_name, price, quantity, language, userName, country, condition, finishes, card_faces, oversized, avatar, rating } = product;
    console.log(product)
    const { cartItems } = useCart();
    // const {data, loading, error } = useFetch 
    const specs = [
        {
            title: 'Edition:',
            value: set_name
        },
        {
            title: 'Finish:',
            value: finish[finishes]
        },
        {
            title: 'Condition:',
            value: conditions[condition]
        },
        {
            title: 'Language:',
            value: languages[language]
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

    const credentials = [
        {
            title: 'Seller:',
            value: userName
        },
        // {
        //     title: 'Rating:',
        //     value: rating
        // },
        {
            title: 'Country:',
            value: country
        }
    ]

    console.log(cartItems)
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
                            <Container>
                                {
                                    credentials &&
                                    credentials.map((credential, i) => {
                                        return (
                                            <Container key={i + 1} classList={''}>
                                                <p><span className="">{credential.title}</span>  <span className="">{credential.value}</span></p>
                                            </Container>

                                        )
                                    })
                                }
                            </Container>
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
                                                className={'catalog-item-quantity'}
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
