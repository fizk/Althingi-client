import React from "react";
import type { FunctionComponent } from "react";
import type { PartyType } from "../index.d";
import './PartyBadge.css';

interface Props {
    party: PartyType
}

export const PartyBadge: FunctionComponent<Props> = ({ party }) => {
    return (
        <span className="party-badge">
            <svg className="party-badge__marker" width="16" height="16" viewBox="0 0 16 16">
                <circle cy="8" cx="8" r="8" fill={party.color || 'gray'} />
            </svg>{party?.name}
        </span>
    )
}
