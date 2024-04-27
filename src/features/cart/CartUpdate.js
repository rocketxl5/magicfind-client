import useCart from '../../hooks/contexthooks/useCart'
const CartUpdate = ({ updates }) => {
    const { updateRef } = useCart();

    return (
        <div className='cart-update-wrapper' ref={updateRef}>
            <div className='cart-update bg-grey'>
                <h3 className='text-center fw-400 fs-150'>Certain items availability have changed</h3>
                <ul className='flex column gap-1 col-12 margin-auto'>

                    {
                        updates.map((update, i) => {
                            return <li className='update' key={i + 1}>{update}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default CartUpdate
