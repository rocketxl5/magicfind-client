import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Page from '../../components/Page';

const Checkout = () => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/', { replace: true })
    }

    return (
        <Page
            name={'checkout'}
            title={'Checkout'}
        >
            <div className='flex column align-center justify-center'>
                <div className='col-12 min-height-half flex column align-center gap-2'>
                    <Button
                        id={'confirm-btn'}
                        type={'submit'}
                        classList='btn color-light bg-success'
                        handleClick={() => handleClick('/', { replace: true })}
                    >
                        {'Submit'}
                    </Button>
                </div>
            </div>

        </Page>
    )
}

export default Checkout
