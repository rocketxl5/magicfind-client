// source @ https://www.youtube.com/watch?v=5s57C7leXc4&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=3
import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter'
import Modal from '../features/modal/Modal';
import useAuth from '../hooks/contexthooks/useAuth';
import useModal from '../hooks/contexthooks/useModal';

const RootLayout = () => {
    const location = useLocation();
    const path = location.pathname;

    const { isAuth } = useAuth();
    const { open, content } = useModal();

    return (
        <div className={`root-layout ${isAuth || path === '/login' || path === '/signup' ? 'bg-light' : 'bg-night'}`}>

            {
                path === '/login' || path === '/signup' ? (

                    <Outlet />

                ) : (
                        <>      
                            {
                                !open ?
                                    <>
                                        <MainHeader />
                                        <Outlet />
                                        <MainFooter />
                                    </>
                                    :
                                    <Modal open={open}>
                                        {content}
                                    </Modal>
                            }
                    </>
                )
            }
        </div>
    )
}

export default RootLayout
