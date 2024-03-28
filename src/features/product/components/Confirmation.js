
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";

const Confirmation = ({ message, isAdded }) => {

    return (
        <div className='loader'>
            <div className='height-100 col-12'>

                <div className={`${isAdded ? 'bg-success' : 'bg-danger'} flex align-center justify-center height-15`}>
                    <h2 className='color-light'>{message}</h2>
                </div>
                <div className='flex column align-center justify-center bg-light height-85'>
                    {
                        isAdded ?
                            <FaRegCheckCircle className='color-success d-block square-size-12' /> :
                            <FaRegTimesCircle className="color-danger d-block square-size-12" />
                    }
                </div>
            </div>
        </div >
    )
}

export default Confirmation