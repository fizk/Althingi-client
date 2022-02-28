import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { IssueType } from "../index.d";
import { Spinner } from "../items/Spinner";

const ASSEMBLY_ISSUE_QUERY = gql`
query AssemblyIssue ($assembly: ID!, $issue: ID!, $category: IssueCategory!) {
  AssemblyIssue (assembly: $assembly, issue: $issue, category: $category) {
    ... issue
  }
}

fragment issue on Issue {
  id
  name
  category
}
`;

export function AssemblyIssue() {
    const { assembly_id, issue_id, category } = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyIssue: IssueType,
    }>(
        ASSEMBLY_ISSUE_QUERY,
        { variables: { assembly: assembly_id, issue: issue_id, category: category?.toUpperCase() } }
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <div style={{display: 'flex'}}>
            <div>
                <h4>Assembly Issues: {data?.AssemblyIssue.name}:</h4>
                <dl>
                    <dt>id</dt>
                    <dd>{data?.AssemblyIssue.id}</dd>
                    <dt>type</dt>
                    <dd>{data?.AssemblyIssue.category}</dd>
                </dl>
            </div>
            <div>
                <nav>
                    {data?.AssemblyIssue.category.toLowerCase() === 'a' && (
                        <ul style={{display: 'flex', listStyle: 'none'}}>
                            <li style={{padding: '0 10px'}}>
                                <Link to={`/loggjafarthing/${assembly_id}/thingmal/${category}/${issue_id}`}>raedur</Link>
                            </li>
                            <li style={{ padding: '0 10px' }}>
                                <Link to={`/loggjafarthing/${assembly_id}/thingmal/${category}/${issue_id}/skjol`}>skjol</Link>
                            </li>
                        </ul>
                    )}
                    {data?.AssemblyIssue.category.toLowerCase() === 'b' && (
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
