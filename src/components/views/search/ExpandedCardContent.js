const ExpandedCardContent = ({ children, layout, handleClick }) => {
    console.log(layout)
    const clickHandler = (e) => {
        console.log(e.target.id)
        if (e.target.id === 'reduce-card') {
            handleClick(e)
        }
        else if (e.target.classList.contains('transform-btn')) {
            document.querySelector('.transform-card-inner').classList.toggle('rotate-y');
            setTimeout(() => {
                document.getElementsByClassName('transform-btn')[0].classList.toggle('d-none');
            }, 100);
        }

    }
    return (
        <>
            {layout !== 'transform' ?
                (
                    <div className="modal-view" onClick={handleClick}>
                        {children}
                    </div>
                ) : (
                    <div className="modal-view transform-card" onClick={(e) => { clickHandler(e) }} >
                        <div className="transform-card-inner">
                            <div className="transform-card-recto">
                                {children[0][0]}
                                {children[1]}
                            </div>
                            <div className="transform-card-verso">
                                {children[0][1]}
                                {children[1]}
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}

export default ExpandedCardContent;
