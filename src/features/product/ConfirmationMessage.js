import { useNavigate, useLocation } from 'react-router-dom';
import { FaRegCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";
const ConfirmationMessage = (props) => {
    const { message, cards, isDeleted } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (cards) {

            navigate(`${location.pathname}`,
                {
                    state: { cards: cards, type: location.state.type, search: `/${location.state.type}` },
                });
        }
    }
    return (
        <div className="modal-container flex column justify-between">
            {
                isDeleted ? (
                    <>
                        <header className="card-header">
                            <h2 className="color-green fw-500">{message}</h2>
                        </header>
                        <section className="response-body">
                            <FaRegCheckCircle className="color-green" />
                        </section>
                        <footer className="card-footer">
                            <div className="btn-container">
                                <button id="back-to-search" className="btn bg-success color-light" type="button" onClick={handleClick}>Back to Search Collection Page </button>
                            </div>
                        </footer>
                    </>
                ) : (
                    <>
                        <header className="card-header">
                            <h2 className="color-danger">{message}</h2>
                        </header>
                        <section className="response-body">
                            <FaBan className="color-danger" />
                        </section>
                        <footer className="card-footer">
                            <div className="btn-container">
                                    <button id="back-to-search" className="btn bg-danger color-light" type="button" onClick={handleClick}>Back to Search Collection Page </button>
                            </div>
                        </footer>
                    </>
                )
            }
        </div>
    )
}

export default ConfirmationMessage;
