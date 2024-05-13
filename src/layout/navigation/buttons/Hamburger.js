import useNav from '../../../hooks/contexthooks/useNavbar';
import useNavButton from '../../../hooks/useNavButton';

const Hamburger = () => {
    const { hamburgerRef,  displayMenu, displaySearchBar} = useNav();
    const { handleMenu, handleSearchBar } = useNavButton();

    const handleClick = () => {
        if(displaySearchBar) {
            handleSearchBar(false);
        }
        else if(displayMenu) {
            handleMenu(false);
        }
        else {
            handleMenu(true);
        }
    }

    return (
        <button
            id='hamburger-btn'
            className='hamburger-btn nav-btn'
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
