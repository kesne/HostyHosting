import React, { useContext } from 'react';

type AppAndOrg = {
    organization: string;
    application: string;
};

const ApplicationContext = React.createContext<AppAndOrg | null>(null);

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
