'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import { Alegreya } from 'next/font/google';


// create a type for your props
type ThemeContextProps = {
    lightMode: boolean,
    setLightMode: (value: boolean) => void
}


const alegreya = Alegreya({ weight: ['400'] })


// create a context variable
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

// create a context provider
export function ThemeContextProvider(props: { children: ReactNode }) {
    const [lightMode, setLightMode] = useState<boolean>(true)

    const theme = createTheme({
        typography: {
            fontFamily: alegreya.style.fontFamily,
        },
        palette: {
            mode: lightMode ? "light" : "dark",
            primary: {
                light: '#F2E4F1',
                main: '#BFB4BE',
                dark: '#8D818C',
                contrastText: '#000',
            },
            secondary: {
                light: '#8D818C',
                main: '#6e5b6c',
                dark: '#554454',
                contrastText: '#fff',
            },
            background: {
                default: lightMode ? "#BFB4BE" : "#6e5b6c"
            },
        }
    });

    return (
        <ThemeContext.Provider value={{ lightMode, setLightMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

// create a function to use the context
export function useThemeContext() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider')
    }
    return context
}