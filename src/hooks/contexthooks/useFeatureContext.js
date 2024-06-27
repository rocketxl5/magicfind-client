import { useContext } from 'react';
import { FeatureContext } from '../../contexts/FeatureContext';

const useFeatureContext = () => {
    return useContext(FeatureContext);
}

export default useFeatureContext;