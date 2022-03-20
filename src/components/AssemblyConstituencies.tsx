import React from "react";
import { gql, useQuery } from "@apollo/client";
import { NavLink, Outlet, useParams } from "react-router-dom";
import type { AssemblyType, ConstituencySessionsType } from '../index.d';
import { Spinner } from "../items/Spinner";
import { CongressmanSittingCard } from "../items/CongressmanSittingCard";
import './AssemblyConstituencies.css';
import { Card } from "../items/Card";

const ASSEMBLY_QUERT = gql`
query assemblyConstituencies ($assembly: ID!){
  AssemblyConstituencies(assembly: $assembly) {
    id
    name
    assembly {
      id
    }
    sessions {
      person {
        id
        name
      }
      assembly {
        id
        from
        to
      }
      sessions {
        id
        party {id name}
        from
        to
        type
        abbr
      }
    }
    abbrShort
    abbrLong
    description
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
            {data?.AssemblyConstituencies.map(constituency => (
                <li>
                    <h3>{constituency.name}</h3>
                    <p>{constituency.description}</p>
                    <ul className="assembly-constituencies__congressmen">
                        {constituency.sessions.map(congressman => (
                            <li>
                                <Card>
                                    <CongressmanSittingCard
                                        assembly={congressman.assembly}
                                        person={congressman.person}
                                        sessions={congressman.sessions}/>
                                </Card>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )

}
