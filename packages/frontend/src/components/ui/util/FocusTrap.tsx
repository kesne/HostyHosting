import React, { useRef, useCallback, useEffect } from 'react';

const focusableSelector = `
a[href]:not([tabindex="-1"]),
area[href]:not([tabindex="-1"]),
input:not([disabled]):not([tabindex="-1"]),
select:not([disabled]):not([tabindex="-1"]),
textarea:not([disabled]):not([tabindex="-1"]),
button:not([disabled]):not([tabindex="-1"]),
iframe:not([tabindex="-1"]),
object:not([tabindex="-1"]),
embed:not([tabindex="-1"]),
[tabindex]:not([tabindex="-1"]),
[contenteditable]:not([tabindex="-1"])
`;

export type FocusTrapProps = {
    /** Content to wrap. */
    children: NonNullable<React.ReactNode>;
    /** Disable automatic focusing. */
    disabled?: boolean;
};

function getFocusableElements(element?: Element | null): Element[] {
    if (!element) {
        return [];
    }

    return Array.from(element.querySelectorAll(focusableSelector));
}

export default function FocusTrap({ children, disabled }: FocusTrapProps) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<Element | null>(null);

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (!disabled) {
                previousActiveElement.current = document.activeElement;
                const [firstFocusableElement] = getFocusableElements(nodeRef.current);
                if (firstFocusableElement) {
                    // @ts-ignore: I promise these elements are focusable:
                    firstFocusableElement.focus({ preventScroll: true });
                }
            }
        });

        return () => {
            clearTimeout(timeout);

            if (previousActiveElement.current) {
                // @ts-ignore: I promise these elements are focusable:
                previousActiveElement.current.focus({ preventScroll: true });
                previousActiveElement.current = null;
            }
        };
    }, [disabled]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled || event.key !== 'Tab') {
            return;
        }

        const focusableElements = getFocusableElements(nodeRef.current);

        if (focusableElements.length === 0 || !document.activeElement) {
            return;
        }

        let focusIndex = focusableElements.indexOf(document.activeElement);
        const initialIndex = focusIndex;

        do {
            if (event.shiftKey) {
                if (focusIndex < 1) {
                    // Currently focusing either the first element (focusIndex = 0),
                    // or no element (focusIndex = -1), so jump to the last focusable element.
                    focusIndex = focusableElements.length - 1;
                } else {
                    focusIndex -= 1;
                }
            } else if (focusIndex === focusableElements.length - 1) {
                // Tabbing forward from end of trap, so jump to beginning.
                focusIndex = 0;
            } else {
                // Note that this also catches the case where focusIndex = -1,
                // in which case we focus index 0, which is the correct functionality.
                focusIndex += 1;
            }

            const element = focusableElements[focusIndex];

            if (element instanceof HTMLElement) {
                element.focus();
            }

            // On the off chance that we are able to begin tabbing in a trap with
            // only untabbable elements, we want to break out of an infinite loop.
            if (focusIndex === initialIndex) {
                break;
            }

            // Trying to focus on an element with e.g. display: none or visibility: hidden
            // will fail, so we need to find the next element to focus in that case.
        } while (document.activeElement !== focusableElements[focusIndex]);

        event.preventDefault();
    }, []);

    return (
        <div ref={nodeRef} onKeyDown={handleKeyDown}>
            {children}
        </div>
    );
}
