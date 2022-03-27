import React from "react";
import type { FunctionComponent } from "react";
import type { ConstituencyType } from "../index.d";
import './ConstituencyBadge.css';

interface Props {
    constituency: ConstituencyType
}

export const ConstituencyBadge: FunctionComponent<Props> = ({ constituency }) => {
    return (
        <span className="constituency-badge">
            <svg className="constituency-badge__marker" width="16" height="16" viewBox="0 0 16 16">
                <circle cy="8" cx="8" r="4" fill={'gray'} />
            </svg>{constituency?.name}
        </span>
    )
}
