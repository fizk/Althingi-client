import React from 'react';
import type { FunctionComponent } from 'react';
import type { PersonType, PartyType } from '../index.d';
import { classVariants } from '../utils/classVariants';
import './CongressmanAvatar.css';

interface Props {
    congressman: PersonType
    party?: PartyType
    size?: 'sm' | 'md' | 'lg'
}

export const CongressmanAvatar: FunctionComponent<Props> = ({ congressman, party, size = 'md' }) => {
    const sizeMap = {
        'sm': 39,
        'md': 61,
        'lg': 95,
    }
    return (
        <div className={classVariants('congressman-avatar', [size])}>
            <img width={sizeMap[size]} height={sizeMap[size]}
                alt={congressman.name}
                loading="lazy"
                className={classVariants('congressman-avatar__image', party ? ['cutout'] : ['oval'])}
                src={`/myndir/unsafe/120x120/www.althingi.is/myndir/mynd/thingmenn/${congressman.id}/org/mynd.jpg`} />
            {party && (
                <>
                    <svg width="0" height="0"
                        role="img"
                        style={{ fill: party?.color ? `#${party?.color}` : undefined}}
                        className="congressman-avatar__color"
                        viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="1" cy="1" r="1" />
                    </svg>
                </>
            )}
        </div>
    )
}
