import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { LayoutContext } from '../context/LayoutContext';
import { Spinner } from '../items/Spinner';
import { CongressmanSittingCard } from '../items/CongressmanSittingCard';
import { Card } from '../items/Card';
import { LayoutSwitch } from '../items/LayoutSwitch';
import { Search } from '../icons/Search';
import { ErrorMessage } from '../items/ErrorMessage';
import type { CommitteeSessionsType } from '../index.d';
import './AssemblyCommittees.css';

const QUERY = gql`
query assemblyCommittees ($assembly: ID!) {
  AssemblyCommittees(assembly: $assembly) {
    id
    name
    assembly {id from to}
    firstAssembly {id from}
    lastAssembly {id to}
    sessions {
      id
      person {id name}
      assembly {id from to}
      sessions {
        id
        party {id name color}
        constituency {id name}
        from
        to
        type
      }
    }
  }
}
`;

export const AssemblyCommittees = () => {
    const { layout } = useContext(LayoutContext);
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{ AssemblyCommittees: CommitteeSessionsType[] }>(
        QUERY,
        { variables: { assembly: assembly_id } }
    );

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <>
            <div className="assembly-committees__controls">
                <LayoutSwitch>
                    <button className="assembly-committees__search">
                        <Search />
                    </button>
                </LayoutSwitch>
            </div>
            <ul className="assembly-committees__list">
                {data?.AssemblyCommittees.map(committee => (
                    <li key={committee.id} className="assembly-committees__list-item">
                        <h3 className="assembly-committees__title">
                            {committee.name}
                        </h3>

                        <ul className="assembly-committees__congressmen">
                            {committee.sessions.map((session, i) => (
                                <li key={i}>
                                    <Card>
                                        <CongressmanSittingCard
                                            variation={layout === 'grid' ? 'vertical' : 'horizontal'}
                                            assembly={committee.assembly}
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
