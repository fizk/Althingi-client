import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Spinner } from "../items/Spinner";
import { CongressmanSittingCard } from "../items/CongressmanSittingCard";
import { Card } from "../items/Card";
import type { ConstituencySessionsType } from '../index.d';
import './AssemblyConstituencies.css';

const ASSEMBLY_QUERT = gql`
query assemblyConstituencies ($assembly: ID!){
    AssemblyConstituencies(assembly: $assembly) {
        id
        name
        abbrShort
        abbrLong
        description
        assembly { id }
        sessions {
            person {id name}
            assembly { id from to }
            sessions {
                id
                from
                to
                type
                abbr
                party {id name}
            }
        }

    }
}
`;

export const AssemblyConstituencies = () => {
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{ AssemblyConstituencies: ConstituencySessionsType[] }>(
        ASSEMBLY_QUERT,
        { variables: { assembly: assembly_id } }
    );

    if (loading) return <Spinner />;
    if (error) return <pre>{JSON.stringify(error, undefined, 4)}(</pre>;

    return (
        <ul className="assembly-constituencies__list">
            {data?.AssemblyConstituencies.map((constituency, i) => (
                <li key={i}>
                    <h3>{constituency.name}</h3>
                    <p>{constituency.description}</p>
                    <ul className="assembly-constituencies__congressmen">
                        {constituency.sessions.map((session, i) => (
                            <li key={i}>
                                <Card>
                                    <CongressmanSittingCard
                                        assembly={session.assembly}
                                        person={session.person}
                                        sessions={session.sessions}/>
                                </Card>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )

}