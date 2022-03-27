import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Spinner } from '../items/Spinner';
import { DateDisplay } from '../items/DateDisplay';
import { PartyBadge } from '../items/PartyBadge';
import type { AssemblyType } from '../index.d';

const ASSEMBLIES_QUERY = gql`
query assemblies {
  Assemblies {
    id
    from
    to
    governmentParties {
      id name color
    }
  }
}
`;

export const Assemblies = () => {
    const { loading, error, data } = useQuery<{ Assemblies: Array<AssemblyType> }>(
        ASSEMBLIES_QUERY
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <ul>
            {data?.Assemblies.map(assembly => (
                <li key={assembly.id}>
                    <Link to={`/loggjafarthing/${assembly.id}`}>
                        <h3>{assembly.id}</h3>
                        <ul>
                            <li><DateDisplay date={new Date(assembly.from)} /></li>
                            {assembly.to && <li><DateDisplay date={new Date(assembly.to)} /></li>}
                        </ul>
                        <ul>
                            {assembly.governmentParties.map(party => (
                                <li>
                                    <PartyBadge party={party} />
                                </li>
                            ))}
                        </ul>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
