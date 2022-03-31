import React from "react";
import { FunctionComponent } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { Spinner } from '../items/Spinner';
import { GovernmentTimeline } from '../items/GovernmentTimeline';

import type { GovernmentSession, InflationType } from '../index.d';
import { InflationTimeline } from "../items/InflationTimeline";

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
    if (error) return <p>Error :(</p>;

    return (
        <>
            <InflationTimeline data={data?.AssemblyInflation!} />
            <GovernmentTimeline sessions={data?.AssemblyGovernment!} />
            <pre>{JSON.stringify(data?.AssemblyInflation, undefined, 4)}</pre>
        </>
    )
}
