import React from "react";
import type { FunctionComponent } from "react";
import type { PersonType, PartyType } from '../index.d';
import { classVariants } from '../utils/classVariants';
import './CongressmanAvatar.css';

interface Props {
    congressman: PersonType
    party?: PartyType
}

export const CongressmanAvatar: FunctionComponent<Props> = ({ congressman, party }) => {
    return (
        <div className="congressman-avatar">
            <img width={80} height={80}
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
