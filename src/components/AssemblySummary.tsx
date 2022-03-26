import React from "react";
import { FunctionComponent } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { Spinner } from '../items/Spinner';
import { GovernmentTimeline } from '../items/GovernmentTimeline';

import type { GovernmentSession } from '../index.d';

const ASSEMBLIES_QUERY = gql`
query assemblies ($assembly: ID!){
  AssemblyGovernment (assembly: $assembly) {
    id
    name
    congressmen {
      id
      person {
        id
        name
      }
      assembly {
        to
        from
      }
      party {
        id
        name
      }
      from
      to
    }
  }
}
`;

export const AssemblySummary: FunctionComponent = () => {
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{ AssemblyGovernment: Array<GovernmentSession> }>(
        ASSEMBLIES_QUERY,
        { variables: { assembly: assembly_id } }
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <GovernmentTimeline sessions={data?.AssemblyGovernment!} />
            <pre>{JSON.stringify(data?.AssemblyGovernment, undefined, 4)}</pre>
        </>
    )
}
