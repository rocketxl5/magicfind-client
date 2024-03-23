import { forwardRef } from 'react';
import { FaRegCheckCircle } from "react-icons/fa";

const Success = forwardRef(function Success(props, ref) {
    const { response, handleClick } = props;
    return (
        <div className="modal-message">
            <header className="modal-header bg-success">
                <div className="modal-title">
                    <h2 className="clr-success fw-500">{response.message}</h2>
                </div>
            </header>
            <section className="modal-check">
                <FaRegCheckCircle className="color-success" />
            </section>
            <footer className="card-footer">
                <div className="btn-container hide">
                    <button
                        id="back-to-search"
                        type="button"
                        onClick={handleClick}
                        ref={ref}>
                    </button>
                </div>
            </footer>
        </div>
    )
})

export default Success
