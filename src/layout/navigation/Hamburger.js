import { useState, useEffect } from 'react';
import useNav from '../../hooks/contexthooks/useNav';

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [stateChanged, setStateChanged] = useState(false);
    const { hamburgerRef } = useNav();


    const handleClick = (e) => {
        console.log(e.target)
        const state = hamburgerRef.current?.getAttribute('aria-expanded');

        if (state === 'true') {
            setIsOpen(true);
        }
        else {
            setIsOpen(false);
        }

        setStateChanged(true);
    }

    useEffect(() => {
        if (stateChanged) {
            if (!isOpen) {
                console.log('isNotOpen', isOpen)
                hamburgerRef.current?.setAttribute('aria-expanded', 'true');
            }
            else {
                console.log('isOpen', isOpen)
                hamburgerRef.current?.setAttribute('aria-expanded', 'false');
            }
            setStateChanged(false);
        }
    }, [stateChanged, isOpen, hamburgerRef])

    return (
        <button
            className='hamburger-btn nav-icon'
            type='button'
            aria-controls='navigation'
            aria-expanded='false'
            onClick={handleClick}
            ref={hamburgerRef}
        >
            <svg className='hamburger' fill='var(--clr-grey)' viewBox='0 0 100 100' width='30'>
                <rect className='line top'
                    width='90'
                    height='12'
                    x='5'
                    y='15'
                    rx='5'
                ></rect>
                <rect className='line middle'
                    width='90'
                    height='12'
                    x='5'
                    y='45'
                    rx='5'
                ></rect>
                <rect className='line bottom'
                    width='90'
                    height='12'
                    x='5'
                    y='75'
                    rx='5'
                ></rect>
            </svg>
        </button>
    )
}

export default Hamburger;
