// Main MainHeader search form (search bar)
// Called on browser width <=775px
import getUserAgent from './getUserAgent';
import toggleClass from './toggleClass';

const hideSearchBar = (state) => {
    const userAgent = getUserAgent();

    // Click label attached to checkbox to check it
    document.querySelector('.mobile-nav-label')?.click();
    // Hide search catalog search bar
    document.querySelector('#catalog-container').style.width = 0;
    // Display search icon (magnifier)
    document.querySelector('.search-btn').style.setProperty('display', 'block');

    if (userAgent.toLowerCase().includes('firefox')) {
        toggleClass(document.querySelector('.main-header'), 'checked');
    }
}

export default hideSearchBar;