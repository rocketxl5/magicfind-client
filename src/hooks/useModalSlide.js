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
      console.log(images)
      console.log(modalSlide)
      const { layout, index } = modalSlide;
      switch (layout) {
        case 'flip':
          handleFlip(images[index]);
          break;
        case 'split':
          handleSplit(images[index]);
          break;
        case 'reversible':
          handleReversible(images[index]);
          break;
        default:
          handleNormal(images[index]);
          break;
      }
    }
  }, [modalSlide])

  return { setModalSlide }
}

export default useModalSlide
