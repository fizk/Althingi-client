import React from "react";
import type { FunctionComponent } from "react";
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
        'sm': 37,
        'md': 91,
        'lg': 143,
    }
    return (
        <div className={classVariants('congressman-avatar', [size])}>
            <img width={sizeMap[size]} height={sizeMap[size]}
                alt={congressman.name}
                loading="lazy"
                className={classVariants('congressman-avatar__image', party ? ['cutout'] : ['oval'])}
                src={`/myndir/unsafe/120x120/www.althingi.is/myndir/mynd/thingmenn/${congressman.id}/org/mynd.jpg`} />
            {party && (
                <div className="congressman-avatar__color"
                    style={{backgroundColor: `#${party.color || 'gray'}`}}
                    title={party.name}
                />
            )}
        </div>
    )
}
