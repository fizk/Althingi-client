import React from 'react';
import type { FunctionComponent } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Spinner } from '../items/Spinner';
import { GovernmentTimeline } from '../items/GovernmentTimeline';
import { InflationTimeline } from '../items/InflationTimeline';
import { ErrorMessage } from '../items/ErrorMessage';
import type { GovernmentSession, InflationType } from '../index.d';

const ASSEMBLIES_QUERY = gql`
query assemblies ($assembly: ID!){
    AssemblyInflation (assembly: $assembly) {
        id date value
    }

    AssemblyGovernment (assembly: $assembly) {
        id
        name
        congressmen {
            id
            from
            to
            person { id name}
            assembly { to from }
            party { id name }
        }
    }
}
`;

export const AssemblySummary: FunctionComponent = () => {
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyGovernment: GovernmentSession[] ,
        AssemblyInflation: InflationType[] ,
    }>(
        ASSEMBLIES_QUERY,
        { variables: { assembly: assembly_id } }
    );

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <>
            <InflationTimeline data={data?.AssemblyInflation!} />
            <GovernmentTimeline sessions={data?.AssemblyGovernment!} />
        </>
    )
}
