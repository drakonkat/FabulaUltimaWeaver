
import { createContext, useContext } from 'react';

export const ThemeContext = createContext(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeContext.Provider');
    }
    return context;
};
