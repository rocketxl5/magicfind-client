// source @ https://github.com/react-icons/react-icons#configuration
import { createContext } from 'react';
import { IconContext } from 'react-icons';

// export const ReactIconsContext = createContext(null);

export const IconProvider = ({ children }) => {
    // stroke fill strokeWidth heigth width
    return (
        <IconContext.Provider
            value={{
                style: {
                    // verticalAlign: 'middle',
                    // stroke: 'rgb(219, 219, 219)',

                    width: '100%',
                    height: '100%'
                }
            }}
        >
            {children}
        </IconContext.Provider>
    )
}
