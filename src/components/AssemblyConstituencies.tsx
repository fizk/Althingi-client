import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { LayoutContext } from "../context/LayoutContext";
import { Spinner } from "../items/Spinner";
import { CongressmanSittingCard } from "../items/CongressmanSittingCard";
import { Card } from "../items/Card";
import { LayoutSwitch } from '../items/LayoutSwitch';
import type { ConstituencySessionsType } from '../index.d';
import './AssemblyConstituencies.css';

const ASSEMBLY_QUERT = gql`
query AssemblyConstituencies($assembly: ID!) {
  AssemblyConstituencies (assembly: $assembly, type: PRIMARY) {
    id
    name
    abbrShort
    abbrLong
    description
    assembly { id from to }
    sessions {
      id
      person { id name}
      sessions {
        id
        party { id name color }
        constituency { id name }
        from
        to
        abbr
        type
      }
    }
  }
}
`;

export const AssemblyConstituencies = () => {
    const { layout } = useContext(LayoutContext);
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{ AssemblyConstituencies: ConstituencySessionsType[] }>(
        ASSEMBLY_QUERT,
        { variables: { assembly: assembly_id } }
    );

    if (loading) return <Spinner />;
    if (error) return <pre>{JSON.stringify(error, undefined, 4)}(</pre>;

    return (
        <>
            <LayoutSwitch />
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
                                            variation={layout === 'grid' ? 'vertical' : 'horizontal'}
                                            assembly={constituency.assembly}
                                            person={session.person}
                                            sessions={session.sessions}/>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    )

}
