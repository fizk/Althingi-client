import React from "react";
import { FunctionComponent } from "react";
import type { AgendaType } from '../index.d';
import './AgendaCard.css';

interface Props {
    agenda: AgendaType
}

export const AgendaCard: FunctionComponent<Props> = ({ agenda, children }) => {
    return (
        <section className="agenda-card">
            <header className="agenda-card__header">
                <h5 className="agenda-card__title">
                    {agenda.iterationComment} - {agenda.iterationType} - {agenda.iterationContinue}
                </h5>
                <p className="agenda-card__subtitle">
                    <strong>{agenda.commentType}</strong> {agenda.comment}
                </p>
            </header>
            <hr className="agenda-card__divide"/>
            <footer className="agenda-card__footer">
                {children}
            </footer>
        </section>
    )
}
