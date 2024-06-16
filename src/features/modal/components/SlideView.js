import CloseBtn from '../buttons/CloseBtn';

const SlideView = ({ children, handleClick }) => {
    return (
        <div className={"slide-view"}>
            <div className={"slide-frame"}>
                <CloseBtn classList={`slide-close-btn close-btn slide-btn`} name={'close-btn'} handleClick={handleClick} />
            </div>
            {children}
        </div>
    )
}

export default SlideView
