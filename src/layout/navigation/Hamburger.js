import useNavbar from '../../hooks/contexthooks/useNavbar';
import useHamburger from '../../hooks/useHamburger';

const Hamburger = () => {
    const { hamburgerRef } = useNavbar();
    const { hamburgerHandler } = useHamburger(hamburgerRef)

    return (
        <button
            id='hamburger-btn'
            className='hamburger-btn nav-btn'
            type='button'
            aria-controls='navigation'
            aria-expanded='false'
            onClick={() => hamburgerHandler()}
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
