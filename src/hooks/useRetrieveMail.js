import { useState, useEffect } from 'react';
import { mailReducer } from '../features/mail/services/mailReducer';
import useFetchData from './useFetchData';

const useRetrieveMail = () => {
    const { fetchData, result } = useFetchData();

    const mailRetriever = (type, userID) => {
        fetchData(`/api/mail/${type}/${userID}`);
        //    switch (type) {
        //     case 'unread':
        //         break;

        //     default:
        //         break;
        //    }
    }

    return { mailRetriever, result }
}

export default useRetrieveMail
