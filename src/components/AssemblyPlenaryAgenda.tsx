import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { PlenaryType } from '../index.d';
import { Card } from '../items/Card';
import { AgendaCard } from '../items/AgendaCard';
import { IssueCard } from '../items/IssueCard';
import { Spinner } from '../items/Spinner';
import { ErrorMessage } from '../items/ErrorMessage';
import './AssemblyPlenaryAgenda.css'

const ASSEMBLY_PLENARIES = gql`
query AssemblyPlenary ($assembly: ID! $plenary: ID){
  AssemblyPlenary (assembly: $assembly, plenary: $plenary) {
    ... plenary
  }
}

fragment plenary on Plenary {
    id
    name
    assembly {id}
  agenda {
    id
    issue {id category name subName typeName typeSubName status}
    iterationType
    iterationContinue
    iterationComment
    comment
    commentType

  }
}
`;

export const AssemblyPlenaryAgenda = () => {
    const { assembly_id, plenary_id } = useParams();

    const { loading, error, data } = useQuery<{
        AssemblyPlenary: PlenaryType,
    }>(
        ASSEMBLY_PLENARIES,
        { variables: { assembly: assembly_id, plenary: plenary_id || null } }
    );

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <>
        <h3>{data?.AssemblyPlenary.name}</h3>
            <ul className="assembly-plenary-agenda__list">
            {data?.AssemblyPlenary.agenda.map(agenda => (
                <li key={agenda.id}>
                    <Card>
                        <AgendaCard agenda={agenda}>
                            <Link to={`/loggjafarthing/${data.AssemblyPlenary.assembly.id}/thingmal/${agenda.issue.category}/${agenda.issue.id}`}>
                                <IssueCard issue={agenda.issue} />
                            </Link>
                        </AgendaCard>
                    </Card>
                </li>
            ))}
        </ul>
        </>
    )
}

