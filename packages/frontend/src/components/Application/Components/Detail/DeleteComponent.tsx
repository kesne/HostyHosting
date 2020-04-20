import React from 'react';
import { useDeleteComponentMutation } from '../../../../queries';
import { useApplicationID } from '../../ApplicationContext';
import Button from '../../../ui/Button';
import { Redirect } from 'react-router-dom';

type Props = {
    id: number;
};

export default function DeleteComponent({ id }: Props) {
    const applicationID = useApplicationID();
    const [deleteComponent, { data }] = useDeleteComponentMutation({
        variables: {
            applicationID,
            id,
        },
        update(cache, { data }) {
            if (!data) return;

            cache.evict(`Component:${id}`);
        },
    });

    // NOTE: doing the redirection at this state (after state has propogated through react)
    // causes a warning because we've already evicted all of the cached data. It might be
    // better to imperatively redirect rather than doing it declarively.
    if (data) {
        return <Redirect to={`/applications/${applicationID}/components`} />;
    }

    return (
        <Button variant="danger" onClick={() => deleteComponent()}>
            Delete
        </Button>
    );
}
