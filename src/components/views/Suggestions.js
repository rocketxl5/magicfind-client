import React, { useContext, useState, useEffect } from 'react';
import { CardContext } from '../../contexts/CardContext';
import styled from 'styled-components';

const Suggestions = ({
  searchTerm,
  setPower,
  setHoverTarget,
  setHoverList,
  cardName,
  index
}) => {
  const [firstTier, setFirstTier] = useState('');
  const [secondTier, setSecondTier] = useState('');
  const [thirdTier, setThirdTier] = useState('');
  const { tracker, setTracker } = useContext(CardContext);
  // const { setIsSubmitted } = useContext(SearchContext);
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

    setHoverList(true);
    setHoverTarget(e.target);
    setTracker(e.target.tabIndex + 1);
    setPower(true);
  };

  const handleMouseOut = () => {
    // setHoverTarget(null);
    setHoverList(false);
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

export default Suggestions;
