import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { LayoutContext } from "../context/LayoutContext";
import { Spinner } from "../items/Spinner";
import { CongressmanSittingCard } from "../items/CongressmanSittingCard";
import { Card } from "../items/Card";
import { LayoutSwitch } from '../items/LayoutSwitch';
import { Search } from "../icons/Search";
import type { PartySessionsType } from '../index.d';
import './AssemblyParties.css';

const QUERY = gql`
query AssemblyParties($assembly: ID!) {
  AssemblyParties (assembly: $assembly, type: PRIMARY) {
    id
    name
    abbrShort
    abbrLong
    color
    assembly {
      id
      from
      to
    }
    sessions {
      id
      person {
        id
        name
        birth
        abbreviation
      }
      sessions {
        id
        party {
          id
          name
          abbrShort
          abbrLong
          color
        }
        constituency {
          id
          name
          abbrShort
          abbrLong
          description
        }
        from
        to
        abbr
      }
    }
  }
}
`;

export const AssemblyParties = () => {
    const { layout } = useContext(LayoutContext);
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{ AssemblyParties: PartySessionsType[] }>(
        QUERY,
        { variables: { assembly: assembly_id } }
    );

    if (loading) return <Spinner />;
    if (error) return <pre>{JSON.stringify(error, undefined, 4)}(</pre>;

    return (
        <>
            <div className="assembly-parties__controls">
                <LayoutSwitch>
                    <button className="assembly-parties__search">
                        <Search />
                    </button>
                </LayoutSwitch>
            </div>
            <ul className="assembly-parties__list">
                {data?.AssemblyParties.map(party => (
                    <li key={party.id} className="assembly-parties__list-item">
                        <h3 className="assembly-parties__title">
                            <svg viewBox="0 0 32 32" width={32} height={32}>
                                <circle cy={16} cx={16} r={16} fill={party.color || 'gray'} />
                            </svg>
                            {party.name} ({party.sessions.length})
                        </h3>

                        <ul className="assembly-parties__congressmen">
                            {party.sessions.map((session, i) => (
                                <li key={i}>
                                    <Card>
                                        <CongressmanSittingCard
                                            variation={layout === 'grid' ? 'vertical' : 'horizontal'}
                                            assembly={party.assembly}
                                            person={session.person}
                                            sessions={session.sessions} />
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
