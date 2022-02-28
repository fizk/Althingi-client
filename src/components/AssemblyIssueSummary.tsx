import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { IssueType } from "../index.d";

const CONGRESSMEN_QUERY = gql`
query AssemblyIssue ($assembly: ID!, $issue: ID!, $type: IssueType!) {
  AssemblyIssue (assembly: $assembly, issue: $issue, type: $type) {
    ... issue
  }
}

fragment issue on Issue {
  id
  name
  type
}
`;

export function AssemblyIssueSummary() {
    const { assembly_id, issue_id, type } = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyIssue: IssueType,
    }>(CONGRESSMEN_QUERY, { variables: { assembly: assembly_id, issue: issue_id, type: type?.toUpperCase() } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div style={{display: 'flex'}}>
            <div>
                <h4>Assembly Issues: {data?.AssemblyIssue.name}:</h4>
                <dl>
                    <dt>id</dt>
                    <dd>{data?.AssemblyIssue.id}</dd>
                    <dt>type</dt>
                    <dd>{data?.AssemblyIssue.type}</dd>
                </dl>
            </div>
            <div>
                <nav>
                    {data?.AssemblyIssue.type.toLowerCase() === 'a' && (
                        <ul style={{display: 'flex', listStyle: 'none'}}>
                            <li style={{padding: '0 10px'}}>
                                <Link to={`/loggjafarthing/${assembly_id}/thingmal/${type}/${issue_id}`}>raedur</Link>
                            </li>
                            <li style={{ padding: '0 10px' }}>
                                <Link to={`/loggjafarthing/${assembly_id}/thingmal/${type}/${issue_id}/skjol`}>skjol</Link>
                            </li>
                        </ul>
                    )}
                    {data?.AssemblyIssue.type.toLowerCase() === 'b' && (
                        <ul style={{ display: 'flex', listStyle: 'none' }}>
                            <li style={{ padding: '0 10px' }}>raedur</li>
                        </ul>
                    )}
                </nav>
                <Outlet />
            </div>
        </div>
    )
}
