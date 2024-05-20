import CloseBtn from '../buttons/CloseBtn';

const SlideView = ({ children, handleClick }) => {
    return (
        <div classList={"slide-view"}>
            <div classList={"slide-frame"}>
                <CloseBtn classList={`slide-close-btn close-btn card-btn`} name={'close-btn'} handleClick={handleClick} />
            </div>
            <>
                {children}
            </>
        </div>
    )
}

export default SlideView
