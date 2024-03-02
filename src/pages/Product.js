import React from 'react';
import { useLocation } from 'react-router-dom';
import Page from '../components/Page';

const Product = () => {
    const location = useLocation();
    console.log(location.state)

    return (
        <Page name={'product'} hasHeader={false}>

        </Page>
    )
}

export default Product
