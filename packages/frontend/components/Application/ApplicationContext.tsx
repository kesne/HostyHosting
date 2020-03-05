import React from 'react';

// NOTE: I use "null as any" here to make the default value `null`, BUT make the
// consumption of the context always result in `number`.
export default React.createContext<number>(null as any);
