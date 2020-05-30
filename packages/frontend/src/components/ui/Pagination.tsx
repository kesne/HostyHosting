import React, { unstable_useTransition, useState, useCallback, useMemo } from 'react';
import Button, { ButtonGroup } from './Button';

export function usePagination(limit: number, initialOffset = 0) {
    const [offset, setOffset] = useState(initialOffset);

    const onNextPage = useCallback(() => {
        setOffset(prevOffset => prevOffset + limit);
    }, [setOffset]);

    const onPreviousPage = useCallback(() => {
        setOffset(prevOffset => prevOffset - limit);
    }, [setOffset]);

    const args = useMemo(() => ({
        limit, offset
    }), [limit, offset]);

    const props = useMemo(() => ({
        onNextPage,
        onPreviousPage
    }), [onNextPage, onPreviousPage]);

    return [
        args,
        props
    ] as const;
}

type Props = {
    timeoutMs?: number;
    pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    };
    onNextPage(): void;
    onPreviousPage(): void;
};

export default function Pagination({
    pageInfo,
    onNextPage,
    onPreviousPage,
    timeoutMs = 5000,
}: Props) {
    const [startTransition, isPending] = unstable_useTransition({
        timeoutMs,
    });

    function handleNext() {
        startTransition(() => {
            onNextPage();
        });
    }

    function handlePrevious() {
        startTransition(() => {
            onPreviousPage();
        });
    }

    return (
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <ButtonGroup>
                <Button disabled={isPending || !pageInfo.hasPreviousPage} onClick={handlePrevious}>
                    Previous
                </Button>
                <Button disabled={isPending || !pageInfo.hasNextPage} onClick={handleNext}>
                    Next
                </Button>
            </ButtonGroup>
        </div>
    );
}
