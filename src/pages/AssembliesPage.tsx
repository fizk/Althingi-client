import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import type {AssemblyType} from '../index.d';

const EXCHANGE_RATES = gql`
query assemblies {
  Assemblies {
    id
    from
    to
  }
}
`;

export const AssembliesPage = () => {
    const { loading, error, data } = useQuery<{ Assemblies: Array<AssemblyType> }>(EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <ul>
            {data?.Assemblies.map(assembly => (
                <li key={assembly.id}>
                    <Link to={`/loggjafarthing/${assembly.id}`}>
                        <strong>{assembly.id}</strong> <time>{assembly.from}</time> <time>{assembly.to}</time>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
