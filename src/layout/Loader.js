import Loading from './Loading'

const Loader = ({ children }) => {
    return (
        <div className="loader">
            <Loading />
            {children}
        </div>
    )
}

export default Loader
