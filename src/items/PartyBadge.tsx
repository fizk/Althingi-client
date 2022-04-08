import React from 'react';
import type { FunctionComponent } from 'react';
import type { PartyType } from '../index.d';
import './PartyBadge.css';

interface Props {
    party: PartyType
}

export const PartyBadge: FunctionComponent<Props> = ({ party }) => {
    return (
        <span className="party-badge">
            <svg className="party-badge__marker" width="10" height="10" viewBox="0 0 10 10">
                <circle cy="5" cx="5" r="5"
                    fill={party.color ? `#${party.color}` : undefined }
                />
            </svg>{party?.name}
        </span>
    )
}
