import React, { useContext } from 'react';

type AppAndOrg = {
    application: string;
};

const ApplicationContext = React.createContext<AppAndOrg | null>(null);

// TODO: This really needs a better name at some point:
export function useApplicationParams() {
    const data = useContext(ApplicationContext);

    if (!data) {
        throw new Error(
            'No application was found. Please render this component under an ApplicationContext.Provider.'
        );
    }

    return data;
}

export default ApplicationContext;
