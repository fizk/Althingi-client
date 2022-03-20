import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Spinner } from "../items/Spinner";
import { CongressmanSittingCard } from "../items/CongressmanSittingCard";
import { Card } from "../items/Card";
import type { PartySessionsType } from '../index.d';
import './AssemblyParties.css';

const QUERY = gql`
query assemblyParties($assembly: ID!) {
    AssemblyParties(assembly: $assembly) {
        id
        name
        color
        abbrShort
        abbrLong
        assembly {id}
        sessions {
            person {id name}
            assembly {id from to}
            sessions {
                id
                from
                to
                type
                abbr
                constituency {id name}
            }
        }
    }
}
`;

export const AssemblyParties = () => {
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{ AssemblyParties: PartySessionsType[] }>(
        QUERY,
        { variables: { assembly: assembly_id } }
    );

    if (loading) return <Spinner />;
    if (error) return <pre>{JSON.stringify(error, undefined, 4)}(</pre>;

    return (
        <ul className="assembly-parties__list">
            {data?.AssemblyParties.map(party => (
                <li key={party.id}>
                    <h3>
                        <svg viewBox="0 0 32 32" width={32} height={32}>
                            <circle cy={16} cx={16} r={16} fill={party.color || 'gray'} />
                        </svg>
                        {party.name}
                    </h3>

                    <ul className="assembly-parties__congressmen">
                        {party.sessions.map((session, i) => (
                            <li key={i}>
                                <Card>
                                    <CongressmanSittingCard
                                        assembly={session.assembly}
                                        person={session.person}
                                        sessions={session.sessions} />
                                </Card>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )

}
