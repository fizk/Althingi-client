import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Outlet, useParams } from 'react-router-dom';
import { IssueType } from '../index.d';
import { ErrorMessage } from '../items/ErrorMessage';
import { Spinner } from '../items/Spinner';
import { TabNav, TabNavItem, TabNavStaticItem } from '../items/TabNav';
import './AssemblyIssue.css';

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
    if (error) return <ErrorMessage error={error} />;

    return (
        <section className="assembly-issue">
            <header className="assembly-issue__header">
                <h4>Assembly Issues: {data?.AssemblyIssue.name}:</h4>
                <dl>
                    <dt>id</dt>
                    <dd>{data?.AssemblyIssue.id}</dd>
                    <dt>type</dt>
                    <dd>{data?.AssemblyIssue.category}</dd>
                </dl>
            </header>
            <div className="assembly-issue__content">
                <TabNav title="Aukaefni">
                    {data?.AssemblyIssue.category.toLowerCase() === 'a' && (
                        <>
                            <TabNavItem to={`/loggjafarthing/${assembly_id}/thingmal/${category}/${issue_id}`}>
                                ræður
                            </TabNavItem>
                            <TabNavItem to={`/loggjafarthing/${assembly_id}/thingmal/${category}/${issue_id}/skjol`}>
                                skjöl
                            </TabNavItem>
                        </>
                    )}
                    {data?.AssemblyIssue.category.toLowerCase() === 'b' && (
                        <TabNavStaticItem>
                            rædur
                        </TabNavStaticItem>
                    )}
                </TabNav>
                <Outlet />
            </div>
        </section>
    )
}
