import { Link } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi";
import message from '../data/MESSAGES.json';
import useSearch from '../hooks/contexthooks/useNavbar';

const Message = ({ type }) => {

    return (
        <div className="message">
            <section className="message-section">
                <div className="message-body">
                    {
                        message[type]['text'].map((line, i) => {
                            return (
                                <p key={i}>{line}</p>
                            )
                        })
                    }
                </div>
            </section>
            <section className="message-section">
                <Link className="message-link" to={message[type]['link']['href']}>  {message[type]['link']['value']} <FiArrowRightCircle /></Link>
            </section>
        </div>
    )
}

export default Message
