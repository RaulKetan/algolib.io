"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Language } from '@/types/algorithm';

export type PreferenceScope = 'editor' | 'solution';

export function useLanguagePreference(scope: PreferenceScope = 'editor') {
    const storageKey = useMemo(() => {
        // Keep 'preferredLanguage' for editor for backward compatibility
        return scope === 'editor' ? 'preferredLanguage' : `preferredLanguage_${scope}`;
    }, [scope]);

    const syncEvent = useMemo(() => {
        return scope === 'editor' ? 'language-preference-changed' : `language-preference-changed-${scope}`;
    }, [scope]);

    const [preferredLanguage, setPreferredLanguageState] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(storageKey);
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
            localStorage.setItem(storageKey, lang);
            setPreferredLanguageState(lang);
            // Dispatch event to sync other instances of this hook with the same scope
            window.dispatchEvent(new CustomEvent(syncEvent, { detail: lang }));
        }
    }, [storageKey, syncEvent]);

    useEffect(() => {
        const handleSync = (event: Event) => {
            const customEvent = event as CustomEvent<Language>;
            if (customEvent.detail && customEvent.detail !== preferredLanguage) {
                setPreferredLanguageState(customEvent.detail);
            }
        };

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === storageKey && event.newValue) {
                const newValue = event.newValue as Language;
                if (newValue !== preferredLanguage) {
                    setPreferredLanguageState(newValue);
                }
            }
        };

        window.addEventListener(syncEvent, handleSync);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener(syncEvent, handleSync);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [preferredLanguage, storageKey, syncEvent]);

    return {
        preferredLanguage,
        setPreferredLanguage
    };
}
