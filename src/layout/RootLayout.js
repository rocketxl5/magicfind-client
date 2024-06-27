// source @ https://www.youtube.com/watch?v=5s57C7leXc4&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=3
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter'
import Modal from '../features/modal/Modal';
import useAuthContext from '../hooks/contexthooks/useAuthContext';
import useModalContext from '../hooks/contexthooks/useModalContext';

const RootLayout = () => {
    const { pathname } = useLocation();

    const { isAuth } = useAuthContext();
    const { open, content, handleClearModal } = useModalContext();

    useEffect(() => {
        // if modal is open and pathname changes
        if (pathname && open) {
            // clear modal
            handleClearModal();
        }
    }, [pathname])

    return (
        <div className={`root-layout ${isAuth || pathname === '/login' || pathname === '/signup' ? 'bg-light' : 'bg-night'}`}>

            {
                pathname === '/login' || pathname === '/signup' ? (

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
