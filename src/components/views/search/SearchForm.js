import React, { useContext, forwardRef } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';
import SearchInput from './SearchInput';

const SearchForm = forwardRef(function SearchForm(props, ref) {
    const { formId, handleSubmit } = props;
    const { formRef } = ref;
    const { previousFormID } = useContext(SearchContext);

    return (
        <form id={formId} onSubmit={handleSubmit} ref={formRef} >
            {
                (!previousFormID || previousFormID === formId) ? (
                    <SearchInput {...props} ref={ref} />
                ) : (
                        <SearchInput formId={formId} />
                )
            }
        </form>
    )
});

export default SearchForm;



