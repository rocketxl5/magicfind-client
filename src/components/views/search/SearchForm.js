import React, { useContext, forwardRef } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';
import SearchField from './SearchField';

const SearchForm = forwardRef(function SearchForm(props, ref) {
    const { formId, handleSubmit, activeForm } = props;
    const { previousFormID } = useContext(SearchContext);

    return (
        <form id={formId} onSubmit={handleSubmit} ref={activeForm} >
            {
                (!previousFormID || previousFormID === formId) ? (
                    <SearchField {...props} />
                ) : (
                    <SearchField formId={formId} />
                )
            }
        </form>
    )
});

export default SearchForm;



