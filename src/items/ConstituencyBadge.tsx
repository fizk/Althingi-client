import React from 'react';
import type { FunctionComponent } from 'react';
import type { ConstituencyType } from '../index.d';
import './ConstituencyBadge.css';

interface Props {
    constituency: ConstituencyType
}

export const ConstituencyBadge: FunctionComponent<Props> = ({ constituency }) => {
    return (
        <span className="constituency-badge">
            <svg className="constituency-badge__marker" width="10" height="10" viewBox="0 0 10 10">
                <circle cy="5" cx="5" r="3" />
            </svg>{constituency?.name}
        </span>
    )
}
