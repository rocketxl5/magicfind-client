import { forwardRef } from 'react';
import { FaRegCheckCircle } from "react-icons/fa";

const Success = forwardRef(function Success(props, ref) {
    const { message, handleClick } = props;
    return (
        <div className="modal-message">
            <header className="modal-header bg-success">
                <div className="modal-title">
                    <h2 className="color-light fw-500">{message}</h2>
                </div>
            </header>
            <section className="modal-check">
                <FaRegCheckCircle className="color-success" />
            </section>
            <footer className="card-footer">
                <div className="hide">
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
