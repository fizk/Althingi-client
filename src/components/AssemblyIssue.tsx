import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { IssueType } from "../index.d";

// const CONGRESSMEN_QUERY = gql`
// query AssemblyIssue ($assembly: ID!, $issue: ID!, $type: IssueType!) {
//   AssemblyIssue (assembly: $assembly, issue: $issue, type: $type) {
//     ... issue
//   }
// }

// fragment issue on Issue {
//   id
//   title
//   type
// }
// `;

export function AssemblyIssue () {
    const { assembly_id, issue_id, type} = useParams();
    // const { loading, error, data } = useQuery<{
    //     AssemblyIssue: IssueType,
    // }>(CONGRESSMEN_QUERY, { variables: { assembly: assembly_id, issue: issue_id, type: type?.toUpperCase() } });

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    return (
        <div>
            Samantekt {assembly_id} {issue_id} {type}
        </div>
    )
}
