import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { TabNav, TabNavItem } from '../items/TabNav';

export const AssemblySessions = () => {
    const { assembly_id } = useParams();

    return (
        <>
            <TabNav title="Þingmenn eftir mismunandi flokkum">
                <TabNavItem to={`/loggjafarthing/${assembly_id}/thingseta`}>
                    Þingmenn
                </TabNavItem>
                <TabNavItem to={`/loggjafarthing/${assembly_id}/thingseta/kjordaemi`}>
                    Kjördœmi
                </TabNavItem>
                <TabNavItem to={`/loggjafarthing/${assembly_id}/thingseta/flokkar`}>
                    Þingflokkar
                </TabNavItem>
            </TabNav>
            <Outlet />
        </>
    )
}

