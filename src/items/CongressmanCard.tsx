import React from "react";
import type { FunctionComponent } from "react";
import type { PersonType, PartyType } from '../index.d';
import { CongressmanAvatar } from './CongressmanAvatar';
import { classVariants } from '../utils/classVariants';
import './CongressmanCard.css';

interface Props {
    congressman: PersonType
    party?: PartyType
}

export const CongressmanCard: FunctionComponent<Props> = ({ congressman, party, children }) => {
    return (
        <div className="congressman-card">
            <div>
                <CongressmanAvatar congressman={congressman} party={party} />
            </div>
            <div>
                <h4 className="congressman-card__title">{congressman.name}</h4>
                {party?.name && (
                    <h5 className="congressman-card__subtitle">{party.name}</h5>
                )}
                {children}
            </div>
        </div>
    )
}
