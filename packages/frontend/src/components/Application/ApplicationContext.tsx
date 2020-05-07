import React, { useContext } from 'react';

const ApplicationContext = React.createContext<string | null>(null);

export function useApplicationID() {
    const id = useContext(ApplicationContext);

    if (!id) {
        throw new Error(
            'No application ID was found. Please render this component under an ApplicationContext.Provider.'
        );
    }

    return id;
}

export default ApplicationContext;
