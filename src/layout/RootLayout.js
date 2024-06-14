// source @ https://www.youtube.com/watch?v=5s57C7leXc4&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=3
import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter'
import Modal from '../features/modal/Modal';
import useAuthContext from '../hooks/contexthooks/useAuthContext';
import useModal from '../hooks/useModal';

const RootLayout = () => {
    const location = useLocation();
    const path = location.pathname;

    const { isAuth } = useAuthContext();
    const { open, content } = useModal();

    return (
        <div className={`root-layout ${isAuth || path === '/login' || path === '/signup' ? 'bg-light' : 'bg-night'}`}>

            {
                path === '/login' || path === '/signup' ? (

                    <Outlet />

                ) : (
                        <>   
                            {
                                <Modal open={open}>
                                    {content}
                                </Modal>
                            }
                            <MainHeader />
                            <Outlet />
                            <MainFooter />                   
                        </>
                )
            }
        </div>
    )
}

export default RootLayout
