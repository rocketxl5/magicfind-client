import { useState, useEffect } from 'react';
import Container from '../../../components/Container';
import Label from '../../../components/Label';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import { FiPlus } from "react-icons/fi";
import useAuth from '../../../hooks/contexthooks/useAuth';
import useCart from '../../../hooks/contexthooks/useCart';
import Loader from '../../../layout/Loader';
import useUpdateCart from '../../../hooks/useUpdateCart';
import data from '../../../data/SEARCH.json';

const CatalogHandlers = ({ product }) => {
    const [quantitySelected, setQuantitySelected] = useState(0);
    const [cartIndex, setCartIndex] = useState(undefined);
    const { set_name, price, quantity, language, condition, finishes, seller } = product;
    const { userName, country, avatar, rating, email } = seller;

    const url = `/api/catalog/${seller.userID}/${product._id}/`;
    const headers = {
        'Content-Type': 'application/json'
    };

    const { cartItems } = useCart();

    const { loading, updateCartHandler } = useUpdateCart(url, headers, product, cartIndex);

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
    ];

    useEffect(() => {
        // Check for product match in cartItems 
        const index = cartItems.findIndex((item) => {
            return item.selected._id === product._id;
        });
        // If index >= 0: Product is already in cart
        if (index > -1) {
            setQuantitySelected(cartItems[index].quantity);
            setCartIndex(index);
        }
    }, [cartItems]);

    return (
        <>
            {
                loading ? (
                    <Loader />
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
                                                classList={'dropdown item-dropdown'}
                                                name={'catalog-item'}
                                                // Product already in cart have defined cartIndex
                                                quantitySelected={quantitySelected}
                                                quantityAvailable={quantity}
                                                product={product}
                                                handleChange={updateCartHandler}
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