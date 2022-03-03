import React from "react";
import type { FunctionComponent } from "react";
import type { CongressmanType, PartyType } from '../index.d';
import { classVariants } from '../utils/classVariants';
import './CongressmanAvatar.css';

interface Props {
    congressman: CongressmanType
    party?: PartyType
}

export const CongressmanAvatar: FunctionComponent<Props> = ({ congressman, party }) => {
    return (
        <div className="congressman-avatar">
            <img width={80} height={80}
                alt={congressman.name}
                loading="lazy"
                className={classVariants('congressman-avatar__image', party?.color ? ['cutout'] : ['oval'])}
                src={`/myndir/unsafe/80x80/www.althingi.is/myndir/mynd/thingmenn/${congressman.id}/org/mynd.jpg`} />
            {party?.color && (
                <div className="congressman-avatar__color"
                    style={{backgroundColor: `#${party.color}`}}
                    title={party.name}
                />
            )}
        </div>
    )
}
