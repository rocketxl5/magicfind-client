import CloseBtn from './CloseBtn';

const SlideFrame = ({ children }) => {
    return (
        <div className='modal-frame'>
            <CloseBtn />
            {children}
        </div>
    )
}

export default SlideFrame
