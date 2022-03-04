import { gql, useQuery } from "@apollo/client";
import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { IssueType } from "../index.d";
import { Spinner } from "../items/Spinner";
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
    if (error) return <p>Error :(</p>;

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
                <nav className="assembly-issue__navigation">
                    {data?.AssemblyIssue.category.toLowerCase() === 'a' && (
                        <ul className="assembly-issue__navigation-list">
                            <li className="assembly-issue__navigation-list-item">
                                <NavLink to={`/loggjafarthing/${assembly_id}/thingmal/${category}/${issue_id}`}
                                    end
                                    style={({ isActive }) => isActive ? { textDecoration: 'underline'} : {}}>
                                    ræður
                                </NavLink>
                            </li>
                            <li className="assembly-issue__navigation-list-item">
                                <NavLink to={`/loggjafarthing/${assembly_id}/thingmal/${category}/${issue_id}/skjol`}
                                    end
                                    style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                                    skjöl
                                </NavLink>
                            </li>
                        </ul>
                    )}
                    {data?.AssemblyIssue.category.toLowerCase() === 'b' && (
                        <ul style={{ display: 'flex', listStyle: 'none' }}>
                            <li className="assembly-issue__navigation-list-item">
                                rædur
                            </li>
                        </ul>
                    )}
                </nav>
                <Outlet />
            </div>
        </section>
    )
}
