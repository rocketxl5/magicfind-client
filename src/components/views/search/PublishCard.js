import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CardImage from './CardImage';
import { FiArrowLeftCircle } from "react-icons/fi";
import CollectionCardDetail from './CollectionCardDetail';
import Loading from '../../layout/Loading';
import errorHandler from './helpers/publishErrorHandler';
import { FaRegCheckCircle } from "react-icons/fa";
// import { FaBan } from "react-icons/fa6";
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';

const INIT = {
    quantity: '',
    price: '',
    condition: '',
    language: '',
    comment: ''
}

const PublishCard = (props) => {
    const { attributes, card, handleClick } = props;

    // States
    const [errors, setErrors] = useState(INIT);
    const [values, setValues] = useState(INIT);
    const [loading, setLoading] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [response, setResponse] = useState({
        isPublished: false,
        message: ''
    });

    // Routing
    const navigate = useNavigate();
    const location = useLocation();

    // Refs
    const btnRef = useRef(null);
    const priceRef = useRef(null);
    const conditionRef = useRef(null);
    const quantityRef = useRef(null);
    const languageRef = useRef(null);
    const commentRef = useRef(null);

    // Hooks
    const { auth } = useAuth();

    const inputs = {
        price: priceRef.current,
        condition: conditionRef.current,
        quantity: quantityRef.current,
        language: languageRef.language,
        comment: commentRef.current,
    }

    // Triggers click event on button to close modal
    const closeModal = (button) => {
        setTimeout(() => {
            button.click();
        }, 1500)
    }

    useEffect(() => {
        console.log(values)
        if (isValidForm) {

            const input = {
                price: values.price,
                quantity: values.quantity,
                condition: values.condition,
                language: values.language,
                comment: values.comment,
                isPublished: true,
                datePublished: Date.now()
            }

            setLoading(true);
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('auth-token', auth.token);
            const options = {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(input),
            };
            fetch(`${api.serverURL}/api/cards/edit/${card.id}/${auth.id}`, options)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    // setCardContext(false);

                })
                .catch((error) => console.log('error', error));
        }

        // const input = {
        //     cardID: card._id,
        //     userID: auth.id,
        // }
        // const options = {
        //     method: 'DELETE',
        //     headers: headers,
        //     body: JSON.stringify(input)
        // }

        // fetch(`${api.serverURL}/api/cards/`, options)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setLoading(false);
        //         const { cards, isPublished, message } = data;
        //         const { cardName, type } = location.state;
        //         setResponse({ isPublished: isPublished, message: message })
        //         // If cardName is set
        //         if (cardName) {
        //             // filter for cards with cardName
        //             const updatedCards = cards.filter(card => card.name.toLowerCase() === cardName.toLowerCase());
        //             const result = { cards: updatedCards, cardName: cardName, type: type, search: `/${type}` };

        //             navigate(`${location.pathname}`,
        //                 {
        //                     state: result,
        //                 });
        //             localStorage.setItem('search-result', JSON.stringify(result));
        //             closeModal(btnRef.current)
        //         } else {
        //             const result = { cards: cards, cardName: undefined, type: type, search: `/${type}` };

        //             navigate(`${location.pathname}`,
        //                 {
        //                     state: result,
        //                 });
        //             localStorage.setItem('search-result', JSON.stringify(result));
        //             closeModal(btnRef.current)
        //         }

        //     })
        //     .catch((error) => {
        //         setLoading(false);
        //         console.log('error', error)
        //     })

    }, [isValidForm])



    // Error handler 
    useEffect(() => {
        console.log(errors)
        if (Object.keys(errors).length === 0 && isSubmit) {
            // Trigger Form request handler
            setIsValidForm(true)
        } else {
            setIsSubmit(false)
        }
    }, [errors]);

    /**********************
    *** Event handlers ***
    **********************/

    // Change handler
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    // Focus handler
    const handleFocus = (e) => {
        // Remove submit error prop if present
        if (errors[e.target.name]) {
            const cloneErrors = { ...errors }
            delete cloneErrors[e.target.name]
            setErrors(cloneErrors)
        }
    }

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const inputErrors = (errorHandler(values, inputs))
        setIsSubmit(true)
        setErrors(inputErrors)
    }

    return (
        <div className="modal-content">
            {
                loading ? (
                    <Loading />
                ) : (
                        <>
                        {
                            !response.isPublished ? (
                                <>
                                        <header className="modal-header">
                                            <div className="modal-title">

                                        <h2 className="color-red fw-500">Publish Card</h2>
                                            </div>
                                    </header>
                                        <div className="modal-body">
                                    <div className="card-body">
                                        <section className="card-section">
                                            <CardImage attributes={attributes} />
                                        </section>
                                        <section className="card-section">
                                            <CollectionCardDetail card={card} />
                                        </section>
                                    </div>
                                    <div className="publish-card">
                                        <form className="publish-form" id="publish-form" name="publish-form" onSubmit={handleSubmit} noValidate>
                                            <div className="form-element flex gap-1">
                                                <div className="number-container">

                                                    <label htmlFor="quantity" className={errors.quantity && 'color-danger'}>{errors.quantity ? errors.quantity : 'Quantity'}</label>
                                                    <input
                                                        className={errors.quantity ? 'border-danger danger-padding' : ''}
                                                        id="quantity"
                                                        type="number"
                                                        name="quantity"
                                                        value={values.quantity}
                                                        onChange={handleChange}
                                                        onFocus={handleFocus}

                                                        min="0"
                                                        max="1000"
                                                        placeholder="Quantity"
                                                        ref={quantityRef}
                                                    />

                                                </div>
                                                <div className="number-container">
                                                    <label htmlFor="price" className={errors.price && 'color-danger'}>{errors.price ? errors.price : 'Price'}</label>
                                                    <input
                                                        className={errors.price ? 'border-danger danger-padding' : ''}
                                                        id="price"
                                                        type="number"
                                                        name="price"
                                                        value={values.price}
                                                        onChange={handleChange}
                                                        onFocus={handleFocus}

                                                        min="0.25"
                                                        max="10000"
                                                        placeholder="Price"
                                                        ref={priceRef}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-element">
                                                        <label htmlFor="condition" className={errors.condition && 'color-danger'}>{errors.condition ? errors.condition : 'Condition'}</label>
                                                <select
                                                    className={errors.condition ? 'border-danger danger-padding' : ''}
                                                    id="condition"
                                                    type="text"
                                                    name="condition"
                                                    value={values.condition}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                    ref={conditionRef}
                                                >
                                                    <option value="">Choose a condition</option>
                                                    <option value='m'>Mint</option>
                                                    <option value='nm'>Near Mint</option>
                                                    <option value="lp">Lightly Played</option>
                                                    <option value="mp">Moderatly Played</option>
                                                    <option value="hp">Heavely Played</option>
                                                    <option value="d">Damaged</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-element">
                                                        <label htmlFor="language" className={errors.language && 'color-danger'}>{errors.language ? errors.language : 'Language'}</label>
                                                        <select
                                                            className={errors.language ? 'border-danger danger-padding' : ''}
                                                            id="language"
                                                            type="text"
                                                            name="language"
                                                            value={values.language}
                                                            onChange={handleChange}
                                                            onFocus={handleFocus}
                                                            ref={languageRef}
                                                        >
                                                            <option value="">Choose a language</option>
                                                            <option value='m'>Mint</option>
                                                            <option value='nm'>Near Mint</option>
                                                            <option value="lp">Lightly Played</option>
                                                            <option value="mp">Moderatly Played</option>
                                                            <option value="hp">Heavely Played</option>
                                                            <option value="d">Damaged</option>
                                                        </select>
                                                    </div>
                                            <div className="form-element">
                                                <label htmlFor="comment" className={errors.comment && 'color-danger'}>{errors.comment ? errors.comment : 'Additional Information'}</label>
                                                <textarea
                                                    className={errors.comment && 'border-danger danger-padding'}
                                                    id="comment"
                                                    name="comment"
                                                    value={values.comment}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                    placeholder="Additional Information"
                                                    ref={commentRef}
                                                >
                                                </textarea>
                                            </div>
                                        </form>
                                    </div>

                                        </div>
                                        <footer className="modal-footer">
                                        <div className="card-btns-wrapper">
                                            <div className="btn-container">
                                                < button
                                                    id="go-back"
                                                    className="btn bg-blue color-light"
                                                    type="button"
                                                    onClick={handleClick}
                                                >
                                                    Go Back
                                                </button>
                                            </div>
                                            <div className="btn-container">
                                                < button
                                                    id="confirm-publish"
                                                    className="btn bg-green color-light"
                                                    type="button"

                                                    onClick={handleSubmit} >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </footer>
                                </>
                            ) : (
                                <></>
                                // <div className="confirmation">
                                //     <header className="card-header">
                                //         <h2 className="color-green fw-500">{response.message}</h2>
                                //     </header>
                                //     <section className="response-body">
                                //         <FaRegCheckCircle className="color-green" />
                                //     </section>
                                //     <footer className="card-footer">
                                //         <div className="btn-container hide">
                                //             <button id="back-to-search" type="button" onClick={handleClick} ref={btnRef}></button>
                                //         </div>
                                //     </footer>
                                // </div>
                            )
                        }
                        </>
                )
            }
        </div>
    )
}

export default PublishCard
