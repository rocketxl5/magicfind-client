import CloseBtn from '../buttons/CloseBtn';
import useModalContext from '../../../hooks/contexthooks/useModalContext';

const Slide = ({ children }) => {
    const { handleOpenModal } = useModalContext();
    return (
        <div className={"slide-view"}>
            <div className={"modal-frame"}>
                <CloseBtn classList={`slide-close-btn close-btn card-btn`} name={'close-btn'} handleClick={() => handleOpenModal(false)} />
            </div>
            {children}
        </div>
    )
}

export default Slide