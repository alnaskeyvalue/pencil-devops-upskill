'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function ThemeToggle({ initialTheme }: { initialTheme: string }) {
    const router = useRouter();

    const toggleTheme = useCallback(() => {
        const newTheme = initialTheme === 'dark' ? 'light' : 'dark';
        document.cookie = `theme=${newTheme}; path=/; max-age=31536000`; // 1 year
        router.refresh();
    }, [initialTheme, router]);

    return (
        <button
            onClick={toggleTheme}
            style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: initialTheme === 'dark' ? '#333' : '#ddd',
                color: initialTheme === 'dark' ? '#fff' : '#000',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
            }}
        >
            {initialTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
    );
}
