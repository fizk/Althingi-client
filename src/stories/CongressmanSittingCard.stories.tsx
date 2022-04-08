import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { CongressmanSittingCard } from '../items/CongressmanSittingCard';
import { Card } from '../items/Card';
import type { PersonType, SessionType, AssemblyType } from '../index.d';

interface Props {
    sessions: SessionType[]
    assembly: AssemblyType
    person: PersonType
    variation?: 'vertical' | 'horizontal'
}

const variant1: Props = {
    sessions: [
        {
            abbr: null,
            type: 'þingmaður',
            constituency: {
                id: 3,
                name: 'Austurland',
                abbrLong: 'long',
                abbrShort: 'short',
                description: null,
            },
            from: '1978-02-10T00:00:00+00:00',
            id: 77409,
            to: '1978-04-12T00:00:00+00:00',
            party: {
                color: '34a312',
                id: 21,
                name: 'Alþýðubandalag',
                abbrLong: 'long',
                abbrShort: 'short',
            },
        },
        {
            type: 'type',
            abbr: null,
            constituency: {
                id: 3,
                name: 'Austurland',
                abbrLong: 'long',
                abbrShort: 'short',
                description: null,
            },
            from: '1978-08-12T00:00:00+00:00',
            id: 77410,
            party: {
                color: null,
                id: 21,
                name: 'Alþýðubandalag',
                abbrLong: 'long',
                abbrShort: 'short',
            },
            to: '1978-11-23T00:00:00+00:00'
        }
    ],
    assembly: {
        id: 1,
        from: '1978-01-10T00:00:00+00:00',
        to: '1979-01-10T00:00:00+00:00',
        governmentParties: [],
        parties: [],
    },
    person: {
        abbreviation: 'abbr',
        birth: '2001-01-01',
        death: null,
        id: 690,
        name: 'Ólafur Ragnar Grímsson'
    }
};

export default {
    title: 'Items/Congressman/SittingCard',
    component: CongressmanSittingCard
} as ComponentMeta<typeof CongressmanSittingCard >;

export const Variants = () => (
    <BrowserRouter>
        <ul style={{display: 'flex', flexDirection: 'column', gap: '2rem', listStyle: 'none'}}>
            <li>
                <Card>
                    <CongressmanSittingCard {...variant1} />
                </Card>
            </li>
            <li>
                <Card>
                    <CongressmanSittingCard {...variant1} />
                </Card>
            </li>
            <li>
                <Card><CongressmanSittingCard {...variant1} /></Card>
            </li>
        </ul>
    </BrowserRouter>
);
