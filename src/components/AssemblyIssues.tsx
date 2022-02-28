import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { IssueType } from "../index.d";

const CONGRESSMEN_QUERY = gql`
query AssemblyIssues ($assembly: ID!) {
  AssemblyIssues (assembly: $assembly) {
    ... issue
  }
}

fragment issue on Issue {
  id
  name
  type
}
`;

export function AssemblyIssues () {
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyIssues: Array<IssueType>,
    }>(CONGRESSMEN_QUERY, { variables: { assembly: assembly_id } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <ul>
            {data?.AssemblyIssues.map(issue => (
                <li key={issue.id}>
                    <Link to={`/loggjafarthing/${assembly_id}/thingmal/${issue.type}/${issue.id}`}>
                    <strong>{issue.id}</strong> {issue.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
