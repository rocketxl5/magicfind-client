import { useState, useEffect, useReducer } from 'react'
import useModalContext from './contexthooks/useModalContext';
import Slide from '../features/modal/components/Slide';
const initialState = {
  slide: null,
}
const useModalSlide = () => {
  const [modalSlide, setModalSlide] = useState(null);
  const { images, handleModalContent } = useModalContext();

  // const [state, dispatch] = useReducer(slideReducer, initialState)

  // const slideReducer = () => {

  // }

  function handleFlip(image) {
    // dispatch({
    //   type: 'single-slide',
    //   slide: image
    // });
    console.log('flip', image);
  }

  function handleSplit(image) {
    console.log('split', image)
  }

  function handleReversible(image) {
    console.log('reversible', image)
  }

  function handleNormal(image) {
    console.log('normal', image)
    handleModalContent(<Slide>{image}</Slide>)
  }

  useEffect(() => {
    if (modalSlide) {
      // console.log(modalSlide)
      const { layout, index } = modalSlide;
      switch (layout) {
        case 'flip':
          handleFlip(images[index]);
          break;
        case 'split':
        case 'planar':
          handleSplit(images[index]);
          break;
        case 'transform':
        case 'modal_dfc':
        case 'reversible_card':
        case 'double_faced_token':
        case 'art_series':
          handleReversible(images[index]);
          break;
        case 'normal':
        case 'leveler':
        case 'class':
        case 'saga':
        case 'meld':
        case 'adventure':
        case 'mutate':
        case 'prototype':
        case 'scheme':
        case 'token':
        case 'emblem':
        case 'augment':
        case 'host':
        case 'vanguard':
          handleNormal(images[index]);
          break;
        default:
          // dispatch({
          //   type: null,
          // })
          break;
      }
    }
  }, [modalSlide])

  return { setModalSlide }
}

export default useModalSlide
