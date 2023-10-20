import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';

const Predictions = (props) => {
  const {
    prediction,
    index
  } = props;

  const { marker, searchTerm, setCardName } = useContext(SearchContext);

  const [firstTier, setFirstTier] = useState('');
  const [secondTier, setSecondTier] = useState('');
  const [thirdTier, setThirdTier] = useState('');

  // Builds card name string segments when searchTerm changes
  // Boldens the part of card name matching the search text
  useEffect(() => {
    // Gets the index of the first letter matching searchTerm in name string
    const firstIndex = prediction.toLowerCase().indexOf(searchTerm.toLowerCase());
    // Gets the index of the last letter matching searchTerm in name string
    const lastIndex = firstIndex + searchTerm.length;
    setFirstTier(prediction.substring(0, firstIndex));
    setSecondTier(prediction.substring(firstIndex, lastIndex));
    setThirdTier(prediction.substring(lastIndex, prediction.length));
  }, [searchTerm]);

  const handleMouseEnter = (e) => {
    console.log(e.target)
    e.target.classList.add('bg-grey');
    setCardName(prediction);
  };

  const handleMouseOut = (e) => {
    e.target.classList.remove('bg-grey');
    setCardName('')
  };
  return (
    <li
      className={index === marker ? 'suggestion bg-grey' : 'suggestion'}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseOut={(e) => handleMouseOut(e)}
    >
      {firstTier}
      <strong>{secondTier}</strong>
      {thirdTier}
    </li>
  );
};

export default Predictions;
