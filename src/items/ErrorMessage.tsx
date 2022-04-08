import React from 'react';
import { FunctionComponent } from 'react';

interface Props {
    error: Error
}

export const ErrorMessage: FunctionComponent<Props> = ({ error }) => {
    return (
        <>
        {PRODUCTION && (<div>Eitthvad er bilad</div>)}
        {!PRODUCTION && (<pre>{JSON.stringify(error, undefined, 4)}</pre>)}
        </>
    )
}
