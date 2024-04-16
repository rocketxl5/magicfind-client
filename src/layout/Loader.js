import { ImSpinner2 } from "react-icons/im";

const Loader = ({ classList = '' }) => {
    return (
        <div className={`loader ${classList}`}>

            <ImSpinner2 className='color-primary' />

        </div>
    )
}

export default Loader
