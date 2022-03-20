import React from "react";
import type { FunctionComponent } from "react";
import { CongressmanAvatar } from "./CongressmanAvatar";
import { Link } from "react-router-dom";
import { Timeline } from "./Timeline";
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
}

export const CongressmanSittingCard: FunctionComponent<Props> = ({ sessions, assembly, person }) => {

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
        <section className="congressman-sitting-card">
            <aside className="congressman-sitting-card__avatar">
                <CongressmanAvatar congressman={person} />
            </aside>
            <header className="congressman-sitting-card__header">
                <Link to={`/loggjafarthing/${assembly.id}/thingmenn/${person.id}`}>
                    <h4 className="congressman-sitting-card__title">{person.name}</h4>
                </Link>
            </header>
            <div className="congressman-sitting-card__content">
                <ul>
                    {parties.map(party => (
                        <li className="congressman-sitting-card__subtitle">
                            <Link key={party?.id} to={`/loggjafarthing/${assembly.id}/thingflokkar/${party.id}`}>
                                <svg width="16" height="16" viewBox="0 0 16 16">
                                    <circle cy="8" cx="8" r="8" fill={party.color || 'gray'} />
                                </svg>{party?.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul>
                    {constituencies.map(constituency => (
                        <li className="congressman-sitting-card__subtitle">
                            <Link key={constituency?.id} to={`/loggjafarthing/${assembly.id}/kjordaemi/${constituency?.id}`}>
                                {constituency?.name}
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
