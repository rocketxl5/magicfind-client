import { useNavigate, useLocation } from 'react-router-dom';
import { FaRegCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";
const ConfirmationMessage = (props) => {
    const { message, cards, isDeleted, setDeleteCardOverlay } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (cards) {
            console.log(location)
            navigate(`${location.pathname}`,
                {
                    state: { cards: cards, type: location.state.type, search: `/${location.state.type}` },
                });

            setDeleteCardOverlay(false)
        }
    }
    return (
        <div className="card-delete-container flex flex-column justify-between">
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
                                <button id="unpublish-card" className="card-btn bg-green color-light" type="button" onClick={handleClick}>Back to Search Collection Page </button>
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
                                <button id="unpublish-card" className="card-btn bg-danger color-light" type="button" onClick={setDeleteCardOverlay(false)}>Back to Search Collection Page </button>
                            </div>
                        </footer>
                    </>
                )
            }

        </div>
    )
}

export default ConfirmationMessage;
