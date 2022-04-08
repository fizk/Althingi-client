import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Spinner } from '../items/Spinner';
import { DateDisplay } from '../items/DateDisplay';
import { ErrorMessage } from "../items/ErrorMessage";
import type { AssemblyType } from '../index.d';

const ASSEMBLIES_QUERY = gql`
query assemblies {
  Assemblies {
    id
    from
    to
  }
}
`;

export const Assemblies = () => {
    const { loading, error, data } = useQuery<{ Assemblies: Array<AssemblyType> }>(
        ASSEMBLIES_QUERY
    );

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage error={error} />;

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
                    </Link>
                </li>
            ))}
        </ul>
    )
}
