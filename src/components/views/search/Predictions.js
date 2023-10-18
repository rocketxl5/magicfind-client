import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';

const Predictions = (props) => {
  const {
    setHoverTarget,
    cardName,
    index
  } = props;

  const { searchTerm, setTracker, setCardName } = useContext(SearchContext);

  const [firstTier, setFirstTier] = useState('');
  const [secondTier, setSecondTier] = useState('');
  const [thirdTier, setThirdTier] = useState('');

  // console.log(cardName);
  // Builds card name string segments when searchTerm changes
  // Boldens the part of card name matching the search text
  useEffect(() => {
    // Gets the index of the first letter matching searchTerm in name string
    const firstIndex = cardName.toLowerCase().indexOf(searchTerm.toLowerCase());
    // Gets the index of the last letter matching searchTerm in name string
    const lastIndex = firstIndex + searchTerm.length;
    setFirstTier(cardName.substring(0, firstIndex));
    setSecondTier(cardName.substring(firstIndex, lastIndex));
    setThirdTier(cardName.substring(lastIndex, cardName.length));
  }, [searchTerm]);

  const handleMouseEnter = (e) => {
    // setIsActiveMouse(true);
    console.log(e.target)
    setHoverTarget(e.target);
    setTracker(e.target.tabIndex + 1);
    setCardName(e.target.textContent)
    // setPower(true);
  };

  const handleMouseOut = () => {
    // setHoverTarget(null);

  };
  return (
    <li
      className="suggestion"
      tabIndex={index}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseOut={() => handleMouseOut()}
    >
      {firstTier}
      <strong>{secondTier}</strong>
      {thirdTier}
    </li>
  );
};

export default Predictions;
