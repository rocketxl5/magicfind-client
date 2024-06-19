import CloseBtn from '../buttons/CloseBtn';

const SlideView = ({ children, handleClick }) => {
    return (
        <div className={"modal"}>
            <div className={"slide-btn"}>
                <CloseBtn classList={`slide-close-btn close-btn slide-btn`} name={'close-btn'} handleClick={handleClick} />
            </div>
            {children}
        </div>
    )
}

export default SlideView
