import React from "react";
import type { FunctionComponent } from "react";
import type { IssueType } from "../index.d";
import './IssueCard.css';

interface Props {
    issue: IssueType
}

export const IssueCard: FunctionComponent<Props> = ({ issue }) => {
    return (
        <article className="issue-card">
            <header className="issue-card__header">
                <h4 className="issue-card__title">{issue.id} {issue.category?.toUpperCase()}</h4>
                <h5  className="issue-card__title">{issue.name}</h5>
            </header>
            <main className="issue-card__content">
                <h5  className="issue-card__subtitle">{issue.subName}</h5>
                <h5  className="issue-card__subtitle">{issue.typeName}</h5>
                <h5  className="issue-card__subtitle">{issue.typeSubName}</h5>
            </main>
            <footer className="issue-card__footer">
                <h5  className="issue-card__subtitle">{issue.status}</h5>
            </footer>
        </article>
    )
}
