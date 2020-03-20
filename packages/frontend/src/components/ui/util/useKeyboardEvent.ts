import { useEffect } from 'react';

export default function useKeyboardEvent(key: string, callback: () => void) {
    useEffect(() => {
        const handler = function(event: KeyboardEvent) {
            if (event.key === key) {
                callback();
            }
        };
        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
        };
    }, []);
}
