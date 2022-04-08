import React from 'react';
import type { FunctionComponent } from 'react';
import { Timeline } from './Timeline';
import { CongressmanCard } from './CongressmanCard';
import { PartyBadge } from '../items/PartyBadge';
import { ConstituencyBadge } from '../items/ConstituencyBadge';
import { LabelBadge } from '../items/LabelBadge';
import { Link } from 'react-router-dom';
import type {
    AssemblyType,
    SessionType,
    ConstituencyType,
    PartyType,
    PersonType
} from '../index.d';
import './CongressmanSittingCard.css';

interface Props {
    sessions: SessionType[]
    assembly: AssemblyType
    person: PersonType
    variation?: 'vertical' | 'horizontal'
}

export const CongressmanSittingCard: FunctionComponent<Props> = ({ sessions, assembly, person, variation = 'vertical' }) => {

    const parties = sessions.reduce<PartyType[]>((previous, current) => {
        if (current.party?.id === undefined) {
            return previous;
        }
        if (previous.find(party => party?.id === current.party?.id)) {
            return previous;
        }
        return [...previous, current.party!];
    }, []);

    const constituencies = sessions.reduce<ConstituencyType[]>((previous, current) => {
        if (current.constituency?.id === undefined) {
            return previous;
        }
        if (previous.find(constituency => constituency?.id === current.constituency?.id)) {
            return previous;
        }
        return [...previous, current.constituency!];
    }, []);

    const types = sessions.reduce<string[]>((previous, current) => {
        if (current.type === undefined) {
            return previous;
        }
        if (previous.find(type => type === current.type)) {
            return previous;
        }
        return [...previous, current.type!];
    }, []);

    return (
        <article className="congressman-sitting-card">
            <CongressmanCard congressman={person} to={`/loggjafarthing/${assembly.id}/thingmenn/${person.id}`}>
                <ul className="congressman-sitting-card__list">
                    {parties.map(party => (
                        <li key={party.id}>
                            <Link to={`/loggjafarthing/${assembly.id}/thingflokkar/${party.id}`}>
                                <PartyBadge party={party} />
                            </Link>
                        </li>
                    ))}
                    {constituencies.map(constituency => (
                        <li key={constituency.id}>
                            <Link to={`/loggjafarthing/${assembly.id}/kjordaemi/${constituency.id}`}>
                                <ConstituencyBadge constituency={constituency} />
                            </Link>
                        </li>
                    ))}
                    {types.map(type => (
                        <li key={type}>
                            <LabelBadge>{type}</LabelBadge>
                        </li>
                    ))}
                </ul>
            </CongressmanCard>
            <hr className="congressman-sitting-card__divider" />
            <footer className="congressman-sitting-card__footer">
                <Timeline key={assembly.id} assembly={assembly} sessions={sessions} />
            </footer>
        </article>
    )
}
