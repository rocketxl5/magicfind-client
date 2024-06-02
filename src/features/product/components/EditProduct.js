import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Success from './Success'
import Loader from '../../../layout/Loader';
import Option from '../../../components/Option';
import data from '../../../data/EDIT.json';
import errorHandler from '../services/editErrorHandler';
import useAuth from '../../../hooks/contexthooks/useAuth';
import useSearch from '../../../hooks/contexthooks/useSearch';
import { api } from '../../../api/resources';
import { v4 as uuidv4 } from 'uuid';

const INIT = {
    quantity: '',
    price: '',
    condition: '',
    language: ''
}

const EditProduct = (props) => {
    // Props
    const { product, search, handleClick } = props;
    // States
    const [errors, setErrors] = useState(INIT);
    const [values, setValues] = useState(INIT);
    const [isPublished, setIsPublished] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    // Refs
    const btnRef = useRef(null);
    const priceRef = useRef(null);

    // Hooks
    const { auth } = useAuth();
    const { setUpdateCatalog } = useSearch();
    const navigate = useNavigate();
    const location = useLocation();
    const { query } = useParams();

    const { languages, conditions } = data;

    // Triggers click event on button to close modal
    const closeModal = (result) => {
        // If publish state has changed, trigger catalog update to reflect product change
        product._is_published !== isPublished && setUpdateCatalog(true);
        setTimeout(() => {
            navigate(`${location.pathname}`,
                {
                    state: result,
                });
            localStorage.setItem('search-results', JSON.stringify(result));
            btnRef.current?.click();
        }, 1500);
    }

    useEffect(() => {
        if (isValidForm) {
            setLoading(true);
            // Set product current published state
            setIsPublished(product._is_published);
            const price = parseFloat(values.price);
            const input = {
                cardName: product.name?.trim(),
                price: price.toFixed(2),
                quantity: parseInt(values.quantity),
                condition: values.condition,
                language: values.language,
                comment: values.comment?.trim(),
                published: values.published,
                datePublished: Date.now(),
                publishedID: values.publishedID
            }

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('auth-token', auth.token);
            const options = {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(input),
            };
            fetch(`${api.serverURL}/api/cards/edit/${product._id}/${auth.user.id}`, options)
                .then((res) => res.json())
                .then((data) => {
                    const { cards } = data;
                    let result;

                    setIsUpdated(true);

                    if (query !== 'all-cards') {
                        // filter for cards with cardName
                        const updatedCards = cards.filter(cardObj => cardObj.name.toLowerCase() === product.name.toLowerCase());
                        result = { cards: updatedCards, search: search, query: product.name };
                    } else {
                        result = { cards: cards, search: search, query: product.name };
                    }

                    setLoading(false);
                    localStorage.setItem('search-results', JSON.stringify(result));
                    setUpdateCatalog(true);
                    closeModal(result);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log('error', error)
                });
        }
    }, [isValidForm])

    useEffect(() => {
        priceRef.current?.focus();
        const publishedID = product['_published_id'] ? product['_published_id'] : uuidv4();
        setValues({
            price: product['_price'] ? product['_price'] : '',
            quantity: product['_quantity'] ? product['_quantity'] : '',
            condition: product['_condition'] ? product['_condition'] : '',
            language: product['_language'] ? product['_language'] : '',
            comment: product['_comment'],
            published: product['_is_published'],
            publishedID: publishedID
        });
    }, [])

    // Error handler 
    useEffect(() => {
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

    // Radio button handler
    const handleRadioChange = (e) => {
        setValues({ ...values, published: !values.published })
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
        const { comment, published, ...updatedValues } = values;
        const inputErrors = errorHandler(updatedValues)
        setIsSubmit(true)
        setErrors(inputErrors)
    }

    return (
        <div className="modal-state">
            <div className={`modal-state-content`}>
                {loading && <Loader />}
                {isUpdated && <Success message={'Card successfully updated'} handleClick={handleClick} ref={btnRef} />}
                <>
                    <header className="modal-header bg-primary">
                        <div className="modal-title">
                            <h2 className="fw-500">Add To Store</h2>
                        </div>
                    </header>
                    <div className="scroll">
                        <div className="modal-body">
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
                                            />
                                        </div>
                                    </div>
                                    <div className="form-element">
                                        <label htmlFor="condition" className={errors.condition && 'color-danger'}>{errors.condition ? errors.condition : 'Card Condition'}</label>
                                        <select
                                            className={errors.condition ? 'border-danger danger-padding' : ''}
                                            id="condition"
                                            type="text"
                                            name="condition"
                                            value={values.condition}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                        >
                                            {
                                                conditions.map((condition, i) => {
                                                    return (
                                                        <Option key={i} value={condition.value}>
                                                            {condition.text}
                                                        </Option>
                                                    )
                                                }
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="form-element">
                                        <label htmlFor="language" className={errors.language && 'color-danger'}>{errors.language ? errors.language : 'Card Condition'}</label>
                                        <select
                                            className={errors.language ? 'border-danger danger-padding' : ''}
                                            id="language"
                                            name="language"
                                            value={values.language}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                        >
                                            {
                                                languages.map((language, i) => {
                                                    return (
                                                        <Option key={i} value={language.value}>
                                                            {language.text}
                                                        </Option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-element">
                                        <label htmlFor="comment" className={errors.comment && 'color-danger'}>{errors.comment ? errors.comment : 'Additional Information'}</label>
                                        <textarea
                                            className={`comment ${errors.comment && 'border-danger danger-padding'}`}
                                            id="comment"
                                            name="comment"
                                            value={values.comment}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            placeholder=""
                                        >
                                        </textarea>
                                    </div>
                                    <div className="form-element">
                                        <p>Card Status</p>
                                        <div className="card-status flex gap-1">
                                            <div className="edit-option status flex align-center space-between">
                                                <label htmlFor="published">Published</label>
                                                <input type="radio" name="published" id="published" onChange={handleRadioChange} checked={values.published} />

                                            </div>
                                            <div className="edit-option status flex align-center space-between">
                                                <label htmlFor="unpublished">Unpublished</label>
                                                <input type="radio" name="published" id="unpublished" onChange={handleRadioChange} checked={!values.published} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <footer className="modal-footer">
                            <div className="flex space-between">
                                < button
                                    id="cancel"
                                    className="btn bg-primary color-light"
                                    type="button"
                                    onClick={handleClick}
                                >
                                    Go Back
                                </button>
                                < button
                                    id="confirm-publish"
                                    className="btn bg-success color-light"
                                    type="button"

                                    onClick={handleSubmit} >
                                    Submit
                                </button>
                            </div>
                        </footer>
                    </div>
                </>
            </div>
        </div >
    )
}

export default EditProduct
