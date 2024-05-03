import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Page from '../components/Page';

const Checkout = () => {
    const navigate = useNavigate();

    return (
        <Page
            name={'checkout'}
            hasHeader={false}
        >
            <div className='flex column align-center justify-center'>
                <div className='col-12 min-height-half flex column align-center gap-2'>
                    <h1 className='fs-200 fw-500 color-primary'>Checkout</h1>
                    <p></p>
                    <Button
                        classList='btn color-light bg-success'
                        handleClick={() => navigate('/', { replace: true })}
                        status={false}
                    >
                        {'Submit'}
                    </Button>
                </div>
            </div>

        </Page>
    )
}

export default Checkout
