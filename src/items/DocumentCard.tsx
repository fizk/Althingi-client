import React from "react";
import type { FunctionComponent } from "react";
import type { DocumentType } from "../index.d";
import './DocumentCard.css';

interface Props {
    document: DocumentType
}

export const DocumentCard: FunctionComponent<Props> = ({ document }) => {
    return (
        <article className="document-card">
            <header className="document-card__header">
                <h4 className="document-card__title">{document.type}</h4>
            </header>
            <main className="document-card__content">
                <h5  className="document-card__subtitle">{document.date}</h5>
            </main>
            <footer className="document-card__footer">
                {document.url && <a href={document.url} target="_blank">hlekkur</a>}
            </footer>
        </article>
    )
}
