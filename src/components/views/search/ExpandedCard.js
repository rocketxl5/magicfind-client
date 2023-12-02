const ExpandedCard = ({ id, style, src, alt }) => {
    return (
        <img id={id} className={style} src={src} alt={alt} />
    )
}

export default ExpandedCard;
