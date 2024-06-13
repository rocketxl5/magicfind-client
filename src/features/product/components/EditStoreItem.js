import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Select from '../../../components/Select';
import Input from '../../../components/Input';
import Success from './Success'
import Loader from '../../../layout/Loader';
import data from '../../../data/EDIT.json';
import errorHandler from '../services/editErrorHandler';
import useAuthContext from '../../../hooks/contexthooks/useAuthContext';
import useSearchContext from '../../../hooks/contexthooks/useSearchContext';
import useModalForm from '../../../hooks/useModalForm';

const INIT = {
    quantity: '',
    price: '',
    condition: '',
    language: '',
}

const EditStoreItem = (props) => {
    const { product, search, handleClick } = props;

    const {
        handlePrice,
        handleQuantity,
        handleCondition,
        handleLanguage,
        handleComment,
        handlePublished,
        handleIsValid,
        state,
        loading,
        btnRef
    } = useModalForm(product);

    const {
        price,
        quantity,
        condition,
        language,
        comment,
        isPublished,
        isUpdated,
        isValidated,
    } = state;

    const { auth, token } = useAuthContext();

    // States
    const [errors, setErrors] = useState(INIT);

    // Hooks
    const { setUpdateCatalog } = useSearchContext();
    const navigate = useNavigate();
    const location = useLocation();
    const { query } = useParams();
    const { languages, conditions } = data;

    // Triggers click event on button to close modal
    const closeModal = (result) => {
        // If publish state has changed, trigger catalog update to reflect product change
        product.isPublished !== isPublished && setUpdateCatalog(true);
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
        // console.log(errors)
        if (isValidated) {
        // setLoading(true);
            // Set product current published state
            // setIsPublished(product._is_published);
            // handlePublished(product.isPublished);
            // const price = parseFloat(price);
            const input = {
                // cardName: product.name?.trim(),
                // price: price.toFixed(2),
                // quantity: parseInt(values.quantity),
                // condition: values.condition,
                // language: values.language,
                // comment: values.comment?.trim(),
                // published: values.published,
                // datePublished: Date.now(),
                // publishedID: values.publishedID
            }

            // const headers = new Headers();
            // headers.append('Content-Type', 'application/json');
            // headers.append('auth-token', auth.token);
            // const options = {
            //     method: 'PATCH',
            //     headers: headers,
            //     body: JSON.stringify(input),
            // };
            // fetch(`${api.serverURL}/api/cards/edit/${product._id}/${auth.user.id}`, options)
            //     .then((res) => res.json())
            //     .then((data) => {
            //         const { cards } = data;
            //         let result;

            //         handleUpdated(true);

            //         if (query !== 'all-cards') {
            //             // filter for cards with cardName
            //             const updatedCards = cards.filter(cardObj => cardObj.name.toLowerCase() === product.name.toLowerCase());
            //             result = { cards: updatedCards, search: search, query: product.name };
            //         } else {
            //             result = { cards: cards, search: search, query: product.name };
            //         }

            //         // setLoading(false);
            //         localStorage.setItem('search-results', JSON.stringify(result));
            //         setUpdateCatalog(true);
            //         closeModal(result);
            //     })
            //     .catch((error) => {
            //         // setLoading(false);
            //         console.log('error', error)
            //     });
        }
    }, [isValidated]);

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

        setErrors(errorHandler({
            price,
            quantity,
            condition,
            language,
        }));
    }

    useEffect(() => {
        if (!errors) {
            handleIsValid(true);
        }
    }, [errors])

    return (
        <div className="modal-state">
            <div className={`modal-state-content`}>
                {loading && <Loader />}
                {isUpdated && <Success message={'Card successfully updated'} handleClick={handleClick} ref={btnRef} />}
                <>
                    <header className="modal-header bg-primary">
                        <div className="modal-title">
                            <h2 className="fw-500">Edit Card</h2>
                        </div>
                    </header>
                    <div className="scroll">
                        <div className="modal-body">
                            <div className="edit-card">
                                <form className="edit-form" id="edit-form" name="edit-form" onSubmit={(e) => handleSubmit(e)}>
                                    <div className="form-element flex gap-1">
                                        <div className="edit-option">
                                            <label htmlFor="price" className={errors?.price && 'color-danger'}>{errors?.price ? errors.price : 'Price'}</label>
                                            <Input
                                                classList={errors?.price ? 'border-danger danger-padding' : ''}
                                                id={'price'}
                                                type={'number'}
                                                name={'price'}
                                                value={price}
                                                handleChange={(e) => handlePrice(e.target.value)}
                                                handleFocus={handleFocus}
                                                range={{
                                                    min: '0.25',
                                                    max: '10000'
                                                }}
                                                placeholder={'Price'}
                                            />
                                        </div>
                                        <div className="edit-option">
                                            <label htmlFor="quantity" className={errors?.quantity && 'color-danger'}>{errors?.quantity ? errors.quantity : 'Quantity'}</label>
                                            <Input
                                                classList={errors?.quantity ? 'border-danger danger-padding' : ''}
                                                id={'quantity'}
                                                type={'number'}
                                                name={'quantity'}
                                                value={quantity}
                                                handleChange={(e) => handleQuantity(e.target.value)}
                                                handleFocus={handleFocus}
                                                range={{
                                                    min: '0',
                                                    max: '1000'
                                                }}
                                                placeholder={'Quantity'}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-element">
                                        <label htmlFor="condition" className={errors?.condition && 'color-danger'}>{errors?.condition ? errors.condition : 'Card Condition'}</label>
                                        <Select
                                            id={'condition'}
                                            classList={errors?.condition ? 'border-danger danger-padding' : ''}
                                            name={'condition'}
                                            value={condition}
                                            handleChange={(e) => handleCondition(e.target.value)}
                                            handleFocus={handleFocus}
                                            options={conditions}
                                        />
                                    </div>
                                    <div className="form-element">
                                        <label htmlFor="language" className={errors?.language && 'color-danger'}>{errors?.language ? errors.language : 'Card Language'}</label>
                                        <Select
                                            id={'language'}
                                            classList={errors?.language ? 'border-danger danger-padding' : ''}
                                            name={'language'}
                                            value={language}
                                            handleChange={(e) => handleLanguage(e.target.value)}
                                            handleFocus={handleFocus}
                                            options={languages}
                                        />

                                    </div>
                                    <div className="form-element">
                                        <label htmlFor="comment" className={errors?.comment && 'color-danger'}>{errors?.comment ? errors.comment : 'Additional Information'}</label>
                                        <textarea
                                            className={`comment ${errors?.comment && 'border-danger danger-padding'}`}
                                            id="comment"
                                            name="comment"
                                            value={comment}
                                            onChange={(e) => handleComment(e.target.value.trim())}
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
                                                <input type="radio" name="published" id="published" onChange={() => handlePublished(!isPublished)} checked={isPublished} />

                                            </div>
                                            <div className="edit-option status flex align-center space-between">
                                                <label htmlFor="unpublished">Unpublished</label>
                                                <input type="radio" name="published" id="unpublished" onChange={() => handlePublished(isPublished)} checked={!isPublished} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <footer className="modal-footer">
                            <div className="flex space-between">
                                <button
                                    id="cancel"
                                    className="btn bg-primary color-light"
                                    type="button"
                                    onClick={handleClick}
                                >
                                    Go Back
                                </button>
                                <button
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
            </div >
        </div >
    )
}

export default EditStoreItem
