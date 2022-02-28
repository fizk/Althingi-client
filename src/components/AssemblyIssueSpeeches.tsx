import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { SpeechType } from "../index.d";

const CONGRESSMEN_QUERY = gql`
query AssemblyIssueSpeeches ($assembly: ID!, $issue: ID!, $type: IssueType!) {
  AssemblyIssueSpeeches (assembly: $assembly, issue: $issue, type: $type) {
    ... speech
  }
}

fragment speech on Speech {
  id
  text
}
`;

export function AssemblyIssueSpeeches () {
    const { assembly_id, issue_id, type} = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyIssueSpeeches: Array<SpeechType>,
    }>(CONGRESSMEN_QUERY, { variables: { assembly: assembly_id, issue: issue_id, type: type?.toUpperCase() } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <ul>
            {data?.AssemblyIssueSpeeches.map(issue => (
                <li>
                    {issue.id}
                    {issue.text}
                </li>
            ))}
        </ul>
    )
}
