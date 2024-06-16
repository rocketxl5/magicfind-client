// source @ https://github.com/react-icons/react-icons#configuration
import { IconContext } from 'react-icons';

export const IconProvider = ({ children }) => {

    return (
        <IconContext.Provider
            value={{
                style: { verticalAling: 'middle' }
            }}
        >
            {children}
        </IconContext.Provider>
    )
}
