import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { DocumentType } from "../index.d";
import { Spinner } from "../items/Spinner";

const ASSEMBLY_ISSUE_DOCUMENTS_QUERY = gql`
query ($assembly: ID!, $issue: ID!, $category: IssueCategory!){
  AssemblyIssueDocuments(assembly: $assembly, issue:$issue, category: $category) {
  	... document
  }
}

fragment document on Document {
  id
  date
}
`;

export function AssemblyIssueDocuments () {
    const { assembly_id, issue_id, category} = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyIssueDocuments: Array<DocumentType>,
    }>(
        ASSEMBLY_ISSUE_DOCUMENTS_QUERY,
        { variables: { assembly: assembly_id, issue: issue_id, category: category?.toUpperCase() } }
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <ul>
            {data?.AssemblyIssueDocuments.map(document => (
                <li key={document.id}>
                    <h4>{document.id}</h4>
                    <p>{document.date}</p>
                </li>
            ))}
        </ul>
    )
}
