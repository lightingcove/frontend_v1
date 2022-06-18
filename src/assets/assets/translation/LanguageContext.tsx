import React, { SetStateAction } from 'react';

export const defaultLocale = 'en';
export const locales = [
    'en','es','de','fr',
    'ar','zh','it','ja',
    'ko','uk','pl','pt'
];
export const LanguageContext = React.createContext([]);

interface LangProps {
    children?: React.ReactNode
    // any props that come into the component
}

type OptionValue = string | number | React.Dispatch<SetStateAction<string>>
var typeArr: OptionValue[]  =[];

export function LanguageProvider({children}: LangProps) {
    const [locale, setLocale] = React.useState('en');

    React.useEffect(()=> {
        if (!window) {
            return;
        }

        const language = localStorage.getItem('lang') || locale;
        setLocale(language);
    }, [locale]);

    typeArr = [locale,setLocale];

    return (
        <LanguageContext.Provider value={typeArr}>
            {children}
        </LanguageContext.Provider>
    );
}