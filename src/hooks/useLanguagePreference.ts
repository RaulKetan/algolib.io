"use client";

import { useState, useEffect, useCallback } from 'react';
import { Language } from '@/types/algorithm';

const STORAGE_KEY = 'preferredLanguage';
const SYNC_EVENT = 'language-preference-changed';

export function useLanguagePreference() {
    const [preferredLanguage, setPreferredLanguageState] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY);
            // Validate that the saved value is a valid Language
            if (['cpp', 'java', 'python', 'typescript', 'javascript', 'c'].includes(saved || '')) {
                return saved as Language;
            }
            return 'typescript';
        }
        return 'typescript';
    });

    const setPreferredLanguage = useCallback((lang: Language) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, lang);
            setPreferredLanguageState(lang);
            // Dispatch event to sync other instances of this hook
            window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: lang }));
        }
    }, []);

    useEffect(() => {
        const handleSync = (event: Event) => {
            const customEvent = event as CustomEvent<Language>;
            if (customEvent.detail && customEvent.detail !== preferredLanguage) {
                setPreferredLanguageState(customEvent.detail);
            }
        };

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY && event.newValue) {
                const newValue = event.newValue as Language;
                if (newValue !== preferredLanguage) {
                    setPreferredLanguageState(newValue);
                }
            }
        };

        window.addEventListener(SYNC_EVENT, handleSync);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener(SYNC_EVENT, handleSync);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [preferredLanguage]);

    return {
        preferredLanguage,
        setPreferredLanguage
    };
}
