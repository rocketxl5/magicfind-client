import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';

const Predictions = (props) => {
  const {
    handleSubmit,
    prediction,
    index
  } = props;

  const { marker, searchTerm, setCardName } = useContext(SearchContext);

  const [head, setHead] = useState('');
  const [body, setBody] = useState('');
  const [tail, setTail] = useState('');

  // Builds card name string segments when searchTerm changes
  // Boldens the part of card name matching the search text
  useEffect(() => {
    // Gets the index of the first letter matching searchTerm in name string
    const firstIndex = prediction.toLowerCase().indexOf(searchTerm.toLowerCase());
    // Gets the index of the last letter matching searchTerm in name string
    const lastIndex = firstIndex + searchTerm.length;
    setHead(prediction.substring(0, firstIndex));
    setBody(prediction.substring(firstIndex, lastIndex));
    setTail(prediction.substring(lastIndex, prediction.length))
  }, [searchTerm]);

  const handleMouseEnter = (e) => {
    e.target.classList.add('bg-grey');
    console.log(prediction)
    setCardName(prediction);
  };

  const handleMouseOut = (e) => {
    e.target.classList.remove('bg-grey');
    console.log(e.target)
    setCardName('')
  };

  // mouseDown event has priority over blur event.
  // Allows for selected list item value to be query without
  // triggering onBlur event in searchInput component
  const handleMouseDown = (e) => {
    // console.log(prediction)
    setCardName(prediction)
    handleSubmit(e);
    // localStorage.setItem('searchTerm', JSON.stringify(content));
  };

  return (
    <li
      className={index === marker ? 'suggestion bg-grey' : 'suggestion'}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
      onMouseDown={handleMouseDown}
    >
      {head}
      <strong>{body}</strong>
      {tail}
    </li>
  );
};

export default Predictions;
// const [head, setHead] = useState('');
// const [body, setBody] = useState('');
// const [tail, setTail] = useState('');
// setHead(prediction.substring(0, firstIndex));
// setBody(prediction.substring(firstIndex, lastIndex));
// setTail(prediction.substring(lastIndex, prediction.length))