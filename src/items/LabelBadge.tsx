import React from 'react';
import type { FunctionComponent } from 'react';
import './LabelBadge.css';

export const LabelBadge: FunctionComponent = ({ children }) => {
    return (
        <span className="label-badge">
            <svg className="label-badge__marker" width="10" height="10" viewBox="0 0 10 10">
                <rect y="4" x="4" width="2" height="2" />
            </svg>{children}
        </span>
    )
}
