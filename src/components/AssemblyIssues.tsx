import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { IssueType } from "../index.d";
import { Spinner } from "../items/Spinner";

const ASSEMBLY_ISSUE_QUERY = gql`
query AssemblyIssues ($assembly: ID!) {
  AssemblyIssues (assembly: $assembly) {
    ... issue
  }
}

fragment issue on Issue {
  id
  name
  category
}
`;

export function AssemblyIssues () {
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyIssues: Array<IssueType>,
    }>(
        ASSEMBLY_ISSUE_QUERY,
        { variables: { assembly: assembly_id } }
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <ul>
            {data?.AssemblyIssues.map(issue => (
                <li key={issue.id}>
                    <Link to={`/loggjafarthing/${assembly_id}/thingmal/${issue.category}/${issue.id}`}>
                        <h4>{issue.id}</h4>
                        <p>{issue.name}</p>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
