import React, { useRef, useContext } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';
import SearchField from '../SearchField';

const SearchForm = ({
    handleClick,
    setRequestSent,
    requestSent,
    cardNames,
    isOn
}) => {
    // Remove slash bar form pathname
    const pathname = window.location.pathname.replace(/\//, '');
    const { previousFormID } = useContext(SearchContext);
    // setForm saves form ref to SearchContext
    // for respective parent search component (Catalog, Store, API)
    const form = useRef(null);

    return (
        <form id={pathname} onSubmit={handleClick} ref={form} >
            {!previousFormID || previousFormID === pathname ? (
                <SearchField
                    setRequestSent={setRequestSent}
                    requestSent={requestSent}
                    cardNames={cardNames}
                    isOn={isOn}
                    form={form}
                />
            ) : (
                <SearchField form={form} />
            )}
        </form>
    )
}

export default SearchForm;
