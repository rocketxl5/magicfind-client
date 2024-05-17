import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import Button from '../../components/Button';

const Checkout = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();


    }

    return (
        <Page
            name={'checkout'}
            title={'Checkout'}
        >
            <div className='flex column align-center justify-center'>
                <div className='col-12 min-height-half flex column align-center gap-2'>
                    <form id='checkout-form' onSubmit={handleSubmit}>

                        <Button
                        id={'confirm-btn'}
                        type={'submit'}
                            classList={'btn color-light bg-success'}
                            handleClick={(e) => handleSubmit(e)}
                    >
                        {'Submit'}
                        </Button>
                    </form>
                </div>
            </div>

        </Page>
    )
}

export default Checkout
