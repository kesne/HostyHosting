import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: React.ReactNode }) {
    const portalRef = useRef<HTMLDivElement | null>(null);

    if (!portalRef.current) {
        portalRef.current = document.createElement('div');
    }

    useEffect(() => {
        document.body.appendChild(portalRef.current!);

        return () => {
            document.body.removeChild(portalRef.current!);
        };
    });

    return createPortal(children, portalRef.current);
}
