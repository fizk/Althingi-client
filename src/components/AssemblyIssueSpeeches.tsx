import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { Spinner } from "../items/Spinner";
import { CongressmanCard } from "../items/CongressmanCard";
import type { SpeechType } from "../index.d";
import './AssemblyIssueSpeeches.css';

const ASSEMBLY_ISSUE_SPEECHES_QUERY = gql`
query AssemblyIssueSpeeches ($assembly: ID!, $issue: ID!, $category: IssueCategory!) {
  AssemblyIssueSpeeches (assembly: $assembly, issue: $issue, category: $category) {
    ... speech
  }
}

fragment speech on Speech {
  id
  assembly {id}
  text
  type
  from
  congressman {
      id
      name
      parties {id name color}
  }
}
`;

export function AssemblyIssueSpeeches () {
    const { assembly_id, issue_id, category} = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyIssueSpeeches: Array<SpeechType>,
    }>(
        ASSEMBLY_ISSUE_SPEECHES_QUERY,
        { variables: { assembly: assembly_id, issue: issue_id, category: category?.toUpperCase() } }
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <ul className="assembly-issue-speech__list">
            {data?.AssemblyIssueSpeeches.map(speech => (
                <li key={speech.id} className="assembly-issue-speech__list-item">
                    <Link to={`/loggjafarthing/${speech.assembly.id}/thingmenn/${speech.congressman.id}`}>
                        <CongressmanCard congressman={speech.congressman}
                            party={speech.congressman.parties.at(0)}>
                            <div className="assembly-issue-speech__properties">
                                <h5 className="assembly-issue-speech__property">{speech.type}</h5>
                                <h5 className="assembly-issue-speech__property">{speech.from}</h5>
                            </div>
                        </CongressmanCard>
                    </Link>
                    <div>
                        {speech.text && (
                            <ReactMarkdown>
                            {speech.text}
                            </ReactMarkdown>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}
