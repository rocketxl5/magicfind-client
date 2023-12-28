const ExpandedCardContent = ({ children, transform, handleClick }) => {

    const handleFlipCard = (e) => {
        if (e.target.id === 'reduce-card') {
            handleClick(e)
        }
        else if (e.target.classList.contains('flip-card-btn')) {
            document.querySelector('.flip-card-inner').classList.toggle('rotate-y');
            setTimeout(() => {
                document.getElementsByClassName('flip-card-btn')[0].classList.toggle('d-none');
            }, 100);
        }

    }
    return (
        <>
            {!transform ?
                (
                    <div className="expanded-card" onClick={handleClick}>
                        {children}
                    </div>
                ) : (

                    <div className="expanded-card flip-card" onClick={(e) => { handleFlipCard(e) }} >
                        <div className="flip-card-inner">
                            <div className="flip-card-recto">
                                {children[0][0]}
                                {children[1]}
                            </div>
                            <div className="flip-card-verso">
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
