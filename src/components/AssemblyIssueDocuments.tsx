import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { DocumentType } from "../index.d";

const CONGRESSMEN_QUERY = gql`
query ($assembly: ID!, $issue: ID!, $type: IssueType!){
  AssemblyIssueDocuments(assembly: $assembly, issue:$issue, type: $type) {
  	... document
  }
}

fragment document on Documents {
  id
  date
}
`;

export function AssemblyIssueDocuments () {
    const { assembly_id, issue_id, type} = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyIssueDocuments: Array<DocumentType>,
    }>(CONGRESSMEN_QUERY, { variables: { assembly: assembly_id, issue: issue_id, type: type?.toUpperCase() } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <ul>
            {data?.AssemblyIssueDocuments.map(document => (
                <li>
                    {document.id}
                    {document.date}
                </li>
            ))}
        </ul>
    )
}
