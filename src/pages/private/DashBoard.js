import Page from '../../components/Page'
import { Outlet } from 'react-router-dom'

const DashBoard = () => {
    return (
        // <Page name={'dashboard'} title={'Dashboard'}>

        // </Page>
        <>
            <Outlet />
        </>
    )
}

export default DashBoard
