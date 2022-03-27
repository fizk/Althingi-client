import React from "react";
import type { FunctionComponent } from "react";
import { Timeline } from "./Timeline";
import { Link } from "react-router-dom";
import { CongressmanAvatar } from "./CongressmanAvatar";
import { classVariants } from "../utils/classVariants";
import { PartyBadge } from "../items/PartyBadge";
import { ConstituencyBadge } from "../items/ConstituencyBadge";
import type {
    AssemblyType,
    SessionType,
    ConstituencyType,
    PartyType,
    PersonType
} from "../index.d";
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

    return (
        <section className={classVariants('congressman-sitting-card', variation === 'vertical' ? ['vertical'] : ['horizontal'])}>
            <aside className="congressman-sitting-card__avatar">
                <CongressmanAvatar congressman={person} size={variation === 'horizontal' ? 'sm' : 'md'} />
            </aside>
            <header className="congressman-sitting-card__header">
                <Link to={`/loggjafarthing/${assembly.id}/thingmenn/${person.id}`}>
                    <h4 className="congressman-sitting-card__title">{person.name}</h4>
                </Link>
            </header>
            <div className="congressman-sitting-card__content">
                <ul className="congressman-sitting-card__list">
                    {parties.map(party => (
                        <li key={party.id} className="congressman-sitting-card__subtitle">
                            <Link key={party?.id} to={`/loggjafarthing/${assembly.id}/thingflokkar/${party.id}`}>
                                <PartyBadge party={party} />
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className="congressman-sitting-card__list">
                    {constituencies.map(constituency => (
                        <li key={constituency.id} className="congressman-sitting-card__subtitle">
                            <Link key={constituency?.id} to={`/loggjafarthing/${assembly.id}/kjordaemi/${constituency?.id}`}>
                                <ConstituencyBadge constituency={constituency} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <footer className="congressman-sitting-card__footer">
                <Timeline key={assembly.id} assembly={assembly} sessions={sessions} />
            </footer>
        </section>
    )
}
