import { useState, useRef } from 'react';
import useModalContext from './contexthooks/useModalContext';
import { buttons } from '../features/modal/services/modalBtns';

const useModalFrame = () => {
    const [layout, setLayout] = useState(null);

    const cardRef = useRef(null);
    const btnRef = useRef(null);

    const { handleClearModal } = useModalContext();

    const handlers = {
        normal: [() => handleClearModal()],
        reversible: [
            () => handleClearModal(),
            () => {
                cardRef.current?.classList.toggle('rotate-y-180');
                btnRef.current?.classList.toggle('rotate-y-0');
            }
        ],
        flip: [
            () => handleClearModal(),
            () => {
                cardRef.current?.classList.toggle('rotate-180');
            }
        ],
        split: [
            () => handleClearModal(),
            () => {
                cardRef.current?.classList.toggle('rotate-90');
            }
        ],
    }

    const Frame = () => {
        return (
            <div className='slide-frame'>
                    {
                        buttons[layout]?.map((btn, i) => {
                            const { icon, ...props } = btn;
                            return (
                                <button key={i} {...props} onClick={handlers[layout][i]} ref={btnRef}>
                                    {icon}
                                </button>
                            )
                        })
                }
            </div>
        )
    }
    return { setLayout, Frame, cardRef }
}

export default useModalFrame
