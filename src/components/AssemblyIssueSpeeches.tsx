import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { SpeechType } from "../index.d";
import { Spinner } from "../items/Spinner";

const ASSEMBLY_ISSUE_SPEECHES_QUERY = gql`
query AssemblyIssueSpeeches ($assembly: ID!, $issue: ID!, $category: IssueCategory!) {
  AssemblyIssueSpeeches (assembly: $assembly, issue: $issue, category: $category) {
    ... speech
  }
}

fragment speech on Speech {
  id
  text
  congressman {id name}
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
        <ul>
            {data?.AssemblyIssueSpeeches.map(issue => (
                <li key={issue.id}>
                    <h4>{issue.id}</h4>
                    <h5>{issue.congressman?.name}</h5>
                    <div>{issue.text}</div>
                </li>
            ))}
        </ul>
    )
}
