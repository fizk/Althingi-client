import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { CongressmanCard } from '../items/CongressmanCard';
import { Card } from '../items/Card';
import type { PersonType, PartyType } from '../index.d';

const person1: {
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
const person2: {
    congressman: PersonType
    party?: PartyType
    size?: 'sm' | 'md' | 'lg'
} = {
    congressman: {
        abbreviation: 'abbr',
        birth: '2001-01-01',
        death: null,
        id: 690,
        name: 'Rsalega Langt Ólafur Ragnar Grímsson'
    },
}
const person3: {
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
    title: 'Items/Congressman/Card',
    component: CongressmanCard
} as ComponentMeta<typeof CongressmanCard >;

export const Variants = () => (
    <>
        <ul style={{display: 'flex', flexDirection: 'column', gap: '2rem', listStyle: 'none'}}>
            <li>
                <Card>
                    <CongressmanCard {...person1} >
                        <ul>
                            <li>item one</li>
                            <li>item two</li>
                            <li>item three</li>
                        </ul>
                    </CongressmanCard>
                </Card>
            </li>
            <li>
                <Card>
                    <CongressmanCard {...person2} >
                        <ul>
                            <li>item one</li>
                            <li>item two</li>
                            <li>item three</li>
                        </ul>
                    </CongressmanCard>
                </Card>
            </li>
            <li>
                <Card><CongressmanCard {...person3} /></Card>
            </li>
        </ul>
    </>
);
