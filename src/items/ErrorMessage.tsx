import React from 'react';
import { FunctionComponent } from 'react';
import { WifiOff } from '../icons/WifiOff';

interface Props {
    error: Error
}

export const ErrorMessage: FunctionComponent<Props> = ({ error }) => {
    return (
        <>
        {navigator.onLine === false && <WifiOff />}
        {PRODUCTION && (navigator.onLine === true) && (<div>Eitthvad er bilad</div>)}
        {!PRODUCTION && (<pre>{JSON.stringify(error, undefined, 4)}</pre>)}
        </>
    )
}
