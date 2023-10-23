import getBrowserWidth from './getBrowserWidth';
import getUserAgent from './getUserAgent';
import toggleClass from './toggleClass';

// Handles Header Search bar and mobile menu behaviour
// [target] node element, [callback] stateSetter (searchTerm), [isOutsideEvent: bool] optional flag for extra Header events
const handleSearchBar = (e, callback, isOutsideEvent = false) => {
// e.stopPropagation();
    const userAgent = getUserAgent();
    const browserWidth = getBrowserWidth();
    const target = e.target;

    // console.log('target', target)
    if (target) {
        // If target is menu link (i.e mobile menu is displayed) or if target is header log
        if (target.classList.contains('nav-link')) {
            // Uncheck checkbox to initiate hamburger animation (from cross to hamburger)
            document.querySelector('#mobile-nav').click();
            // Hide mobile menu
            document.querySelector('.menu').style.setProperty('left', '100%');
            // Display search button (maginifier icon)
            document.querySelector('.search-btn').style.setProperty('display', 'block');
            if (userAgent.toLocaleLowerCase().includes.firefox) {
                // Remove 'checked' class from main header
                toggleClass(document.querySelector('.main-header'), 'checked');
            }
        }

        // If Search button (magnifier icon)
        if (target.classList.contains('search-btn')) {
            // Show Search bar 
            document.querySelector('#search-catalog-container').style.setProperty('width', 'calc(100% - 5rem)');
            // Hide Search button
            document.querySelector('.search-btn').style.setProperty('display', 'none');
            // Add input field focus
            document.querySelector('#search-catalog').focus();
        }

        // If Logo
        if (target.classList.contains('logo-btn')) {
            if (browserWidth <= 775) {
                // If mobile menu is displayed
                if (document.querySelector('#mobile-nav').checked) {
                    // Uncheck checkbox to initiate hamburger animation (from cross to hamburger)
                    document.querySelector('#mobile-nav').click();
                    // Hide mobile menu
                    document.querySelector('.menu').style.setProperty('left', '100%');
                    // Display search button (maginifier icon)
                    document.querySelector('.search-btn').style.setProperty('display', 'block');
                    if (userAgent.toLocaleLowerCase().includes.firefox) {
                        // Remove 'checked' class from main header
                        toggleClass(document.querySelector('.main-header'), 'checked');
                    }
                }
            }
        }

        // If Hamburger button
        if (target.classList.contains('hamburger-btn')) {
            // Handle Search bar
            if (document.querySelector('#mobile-nav').checked) {
                if (browserWidth <= 775) {
                    console.log('hamburger-btn', target)

                    // If Search bar is displayed
                    if (document.querySelector('#search-catalog-container').style.width === 'calc(100% - 5rem)') {
                        // Hide Search bar
                        document.querySelector('#search-catalog-container').style.setProperty('width', '0');
                        // Show Search button icon
                        document.querySelector('.search-btn').style.setProperty('display', 'block');
                        // Clear Search filed
                        callback('');
                        // Empty search input
                        document.querySelector('#search-catalog').value = '';
                    }
                }
                // If menu is displayed
                if (document.querySelector('.menu').style.left !== '100%') {
                    // Hide menu
                    document.querySelector('.menu').style.setProperty('left', '100%');
                    // Show Search button icon
                    document.querySelector('.search-btn').style.setProperty('display', 'block');
                }
            } else {
                // Hide menu
                document.querySelector('.menu').style.setProperty('left', '100%');
            }
            if (!document.querySelector('#mobile-nav').checked) {
                if (browserWidth <= 775) {
                    // Hide Search button icon
                    document.querySelector('.search-btn').style.setProperty('display', 'none');
                }
                // Show Menu
                document.querySelector('.menu').style.setProperty('left', '0');
            }
        }
        // If event is triggered outside of Main Header
        if (isOutsideEvent) {
            if (browserWidth <= 775) {
                // Clear search catalog search bar
                document.querySelector('#search-catalog-container').style.width = 0;
                // Display search icon (magnifier)
                document.querySelector('.search-btn').style.setProperty('display', 'block');
            }
            // Click label attached to checkbox to check it
            target.click();
            if (userAgent.toLowerCase().includes('firefox')) {
                toggleClass(document.querySelector('.main-header'), 'checked');
            }
        }
    }
}

export default handleSearchBar;