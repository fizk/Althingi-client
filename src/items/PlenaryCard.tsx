import React from 'react';
import { FunctionComponent } from 'react';
import type { PlenaryType } from '../index.d';
import './PlenaryCard.css';

interface Props {
    plenary: PlenaryType
}

export const PlenaryCard: FunctionComponent<Props> = ({ plenary }) => {
    return (
        <div className="plenary-card">
            <h3 className="plenary-title">
                {plenary.id} - {plenary.name}
            </h3>
            <time className="plenary-subtitle">
                {plenary.from}
            </time>
        </div>
    )
}
