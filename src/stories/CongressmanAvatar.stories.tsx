import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { CongressmanAvatar } from '../items/CongressmanAvatar';
import type { PersonType, PartyType } from '../index.d';

const data: {
    congressman: PersonType
    party?: PartyType
    size?: 'sm' | 'md' | 'lg'
} = {
    congressman: {
        abbreviation: 'abbr',
        birth: '2001-01-01',
        death: null,
        id: 690,
        name: 'Ólafur Ragnar Grímsson'
    },
    party: {
        id: 1,
        color: '54ad29',
        abbrLong: 'long',
        abbrShort: 'short',
        name: 'Some Longname'
    }
}

export default {
    title: 'Items/Congressman/Avatar',
    component: CongressmanAvatar
} as ComponentMeta<typeof CongressmanAvatar >;

export const Variants = () => (
    <>
        <ul style={{display: 'flex', gap: '2rem', listStyle: 'none'}}>
            <li><CongressmanAvatar {...data} size="sm" /></li>
            <li><CongressmanAvatar {...data} size="md" /></li>
            <li><CongressmanAvatar {...data} size="lg" /></li>
        </ul>
        <ul style={{display: 'flex', gap: '2rem', listStyle: 'none'}}>
            <li><CongressmanAvatar {...data} party={undefined} size="sm" /></li>
            <li><CongressmanAvatar {...data} party={undefined} size="md" /></li>
            <li><CongressmanAvatar {...data} party={undefined} size="lg" /></li>
        </ul>
    </>
);
