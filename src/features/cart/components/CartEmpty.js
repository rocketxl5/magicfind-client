import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/contexthooks/useAuth';

const CartEmpty = () => {
    const { isAuth } = useAuth();

    return (
        <div className='padding-1 bg-light flex column gap-3'>
            <h2 className='color-dark text-center fs-200 fw-700'>Your Cart is empty</h2>
            <div>
                <>
                    {!isAuth ?
                        <div className='flex gap-1 justify-center'>
                            <Link className="btn bg-primary col-2 flex justify-center align-center" to="/login">Sign in</Link>
                            <Link className="btn bg-primary col-2 flex justify-center align-center" to="/signup">Sign up</Link>
                        </div>

                        :
                        <div className='flex gap-1 justify-center'>
                            <Link className="btn bg-primary col-10 flex justify-center align-center" to="/me/collection">Browse your collection</Link>
                        </div>

                    }
                </>
            </div>
        </div>
    )
}

export default CartEmpty
