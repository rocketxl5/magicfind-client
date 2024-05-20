import { useRef } from 'react';
import Loader from '../../../layout/Loader';
import Success from '../../product/components/Success';
import useModalForm from '../../../hooks/useModalForm';

const ModalForm = (children, props) => {
    const {
        handleSubmit
    } = props;

    const btnRef = useRef(null);
    const { loading, error, response, isUpdated } = useModalForm();
    return (
        <div className="modal-state">
            <div className={`modal-state-content`}>
                {loading && <Loader />}
                {isUpdated && <Success message={'Card successfully updated'} handleClick={() => { }} ref={btnRef} />}
                <>
                    <header className="modal-header bg-primary">
                        <div className="modal-title">
                            <h2 className="fw-500">Edit Card</h2>
                        </div>
                    </header>
                    <div className="scroll">
                        <div className="modal-body">
                            <div className="edit-card">
                                <form className="edit-form" id="edit-form" name="edit-form" onSubmit={handleSubmit} noValidate>
                                    <div className="form-element flex gap-1">

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
                                    onClick={() => { }}
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
            </div >
        </div >
    )
}

export default ModalForm
