import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CardImage from './CardImage';
import CollectionCardDetail from './CollectionCardDetail';
import Success from './Success';
import Loading from '../../layout/Loading';
import errorHandler from './helpers/publishErrorHandler';
import useAuth from '../../../hooks/useAuth';
import { api } from '../../../api/resources';

const INIT = {
    quantity: '',
    price: '',
    condition: '',
    comment: ''
}

const EditCard = (props) => {
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
    const commentRef = useRef(null);

    // Hooks
    const { auth } = useAuth();

    const inputs = {
        price: priceRef.current,
        condition: conditionRef.current,
        quantity: quantityRef.current,
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
            setLoading(true);

            const input = {
                price: parseFloat(values.price),
                quantity: parseInt(values.quantity),
                condition: values.condition,
                comment: values.comment,
                isPublished: true,
                datePublished: Date.now()
            }


            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('auth-token', auth.token);
            const options = {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(input),
            };
            fetch(`${api.serverURL}/api/cards/edit/${card._id}/${auth.id}`, options)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setLoading(false);
                    const { card, isPublished, message } = data;
                    // const { cardName, type } = location.state;
                    setResponse({ isPublished: isPublished, message: message })
                    closeModal(btnRef.current)
                })
                .catch((error) => console.log('error', error));
        }
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
        <div className={`modal-content overflow-y ${loading ? 'border-light' : response.isDeleted ? 'border-success' : 'border-blue'}`}>
            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        {
                            !response.isPublished ? (
                                <>
                                    <header className="modal-header">
                                        <div className="modal-title border-blue">

                                            <h2 className="color-blue fw-500">Edit Card</h2>
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
                                        <div className="edit-card">
                                            <form className="edit-form" id="edit-form" name="edit-form" onSubmit={handleSubmit} noValidate>
                                                <div className="form-element flex gap-1">
                                                    <div className="edit-option">
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
                                                    <div className="edit-option">
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
                                                <div className="form-element">
                                                    <p>Card Status</p>
                                                    <div className="card-status flex gap-1">
                                                        <div className="edit-option status flex align-center space-between">
                                                            <label htmlFor="publish">Publish</label>
                                                            <input type="radio" name="publish" id="publish" value={true} />

                                                        </div>
                                                        <div className="edit-option status flex align-center space-between">
                                                            <label htmlFor="unpublish">Unpublish</label>
                                                            <input type="radio" name="publish" id="unpublish" value={false} />
                                                        </div>
                                                    </div>
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
                                <Success response={response} handleClick={handleClick} ref={btnRef} />
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default EditCard
