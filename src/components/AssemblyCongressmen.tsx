import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Spinner } from "../items/Spinner";
import { Card } from "../items/Card";
import { CongressmanSittingCard } from "../items/CongressmanSittingCard";
import type { CongressmanSessionsType } from "../index.d";
import './AssemblyCongressmen.css';

const ASSEMBLY_CONGRESSMEN_QUERY = gql`
query AssemblyCongressmen($assembly: ID!) {

  Primaries: AssemblyCongressmen(assembly: $assembly, type: PRIMARY) {
    ...congressmanSessions
  }
  Substitutes: AssemblyCongressmen(assembly: $assembly, type: SUBSTITUTE) {
    ...congressmanSessions
  }
  Presidents: AssemblyCongressmen(assembly: $assembly, type: PRESIDENT) {
    ...congressmanSessions
  }
}


fragment congressmanSessions on CongressmanSessions {
  person { id name }
  assembly { id from to }
  sessions {
      id
    from
    to
    abbr
    type
    constituency { id name }
    party { id name color }
  }
}
`;

export function AssemblyCongressmen () {
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{
        Primaries: Array<CongressmanSessionsType> ,
        Substitutes: Array<CongressmanSessionsType> ,
        Presidents: Array<CongressmanSessionsType> ,
    }>(
        ASSEMBLY_CONGRESSMEN_QUERY,
        {variables: {assembly: assembly_id}}
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <section className="assembly-congressmen__section">
                <h3>Primaries</h3>
                <ul className="assembly-congressmen__list">
                    {data?.Primaries.map(({id, assembly, person, sessions}) => (
                        <li key={id} className="assembly-congressmen__list-item">
                            <Card>
                                <CongressmanSittingCard
                                    person={person}
                                    sessions={sessions}
                                    assembly={assembly} />
                            </Card>
                        </li>
                    ))}
                </ul>
                <h3>Substitutes</h3>
                <ul className="assembly-congressmen__list">
                    {data?.Substitutes.map(({id, assembly, person, sessions}) => (
                        <li key={id} className="assembly-congressmen__list-item">
                            <Card>
                                <CongressmanSittingCard
                                    person={person}
                                    sessions={sessions}
                                    assembly={assembly} />
                            </Card>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}
