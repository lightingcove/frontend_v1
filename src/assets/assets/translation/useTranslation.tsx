import React from 'react';

import {
    LanguageContext,
    defaultLocale,
    locales
} from './LanguageContext';

import { LangDict } from './langs';

export default function useTranslation() {
    const [locale, setLocale] = React.useState(LanguageContext);

    function c(key:string) {
        if (!LangDict[
            locale
            ][key]) {
            console.warn(`No string '${key}' for locale '${locale}'`);
        }

        return LangDict[
            locale
            ][key] || LangDict[
                defaultLocale
                ][
                    key
                    ] || '';
    }

    return { c, locale, setLocale, locales };
}
