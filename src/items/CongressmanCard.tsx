import React from 'react';
import type { FunctionComponent } from 'react';
import { CongressmanAvatar } from './CongressmanAvatar';
import { Link } from 'react-router-dom';
import type { PersonType, PartyType } from '../index.d';
import './CongressmanCard.css';

interface Props {
    congressman: PersonType,
    to?: string | null
    party?: PartyType
}

export const CongressmanCard: FunctionComponent<Props> = ({ congressman, party, children, to = null }) => {
    return (
        <section className="congressman-card">
            <aside className="congressman-card__aside">
                <CongressmanAvatar congressman={congressman} party={party} />
            </aside>
            <header className="congressman-card__header">
                <h4 className="congressman-card__title">
                    {to && (
                    <Link to={to}>
                        {congressman.name}
                    </Link>
                    )}
                    {!to && congressman.name}
                </h4>
            </header>
            <div className="congressman-card__content">{ children }</div>
        </section>
    )
}
