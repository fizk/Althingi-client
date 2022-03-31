import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { LayoutContext } from "../context/LayoutContext";
import { useParams } from "react-router-dom";
import { Spinner } from "../items/Spinner";
import { Card } from "../items/Card";
import { CongressmanSittingCard } from "../items/CongressmanSittingCard";
import { classVariants } from '../utils/classVariants';
import { LayoutSwitch } from '../items/LayoutSwitch';
import { Search } from '../icons/Search';
import type { CongressmanSessionsType } from "../index.d";
import './AssemblyCongressmen.css';

const ASSEMBLY_CONGRESSMEN_QUERY = gql`
query AssemblyCongressmen($assembly: ID!) {

    Primaries: AssemblyCongressmen(assembly: $assembly, type: PRIMARY) {
        ...congressmanSessions
    }
    Substitutes: AssemblyCongressmen(assembly: $assembly, type: SUBSTITUTE) {
        ...congressmanSessions
    }
    Presidents: AssemblyPresidents(assembly: $assembly) {
        ...presidentSessions
    }
}

fragment congressmanSessions on CongressmanSessions {
    id
    person { id name }
    assembly { id from to }
    sessions {
        id
        from
        to
        abbr
        constituency { id name }
        party { id name color }
    }
}

fragment presidentSessions on CongressmanSessions {
    id
    person { id name }
    assembly { id from to }
    sessions {
        id
        from
        to
        abbr
        type
        constituency { id name }
        party { id name color }
    }
}
`;

export function AssemblyCongressmen () {
    const { assembly_id } = useParams();
    const { layout } = useContext(LayoutContext);
    const { loading, error, data } = useQuery<{
        Primaries: Array<CongressmanSessionsType>,
        Substitutes: Array<CongressmanSessionsType>,
        Presidents: Array<CongressmanSessionsType>,
    }>(
        ASSEMBLY_CONGRESSMEN_QUERY,
        {variables: {assembly: assembly_id}}
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <div className="assembly-congressmen__controls">
                <LayoutSwitch>
                    <button className="assembly-congressmen__search">
                        <Search />
                    </button>
                </LayoutSwitch>
            </div>
            <section className="assembly-congressmen__section">
                <h3>Forsetar ({data?.Presidents.length})</h3>
                <ul className={classVariants('assembly-congressmen__list', layout === 'list' ? ['list'] : ['grid'])}>
                    {data?.Presidents.map(({id, assembly, person, sessions}) => (
                        <li key={id} className="assembly-congressmen__list-item">
                            <Card>
                                <CongressmanSittingCard
                                    variation={layout === 'grid' ? 'vertical' : 'horizontal'}
                                    person={person}
                                    sessions={sessions}
                                    assembly={assembly} />
                            </Card>
                        </li>
                    ))}
                </ul>
                <h3>Þingmenn ({data?.Primaries.length})</h3>
                <ul className={classVariants('assembly-congressmen__list', layout === 'list' ? ['list'] : ['grid'])}>
                    {data?.Primaries.map(({id, assembly, person, sessions}) => (
                        <li key={id} className="assembly-congressmen__list-item">
                            <Card>
                                <CongressmanSittingCard
                                    variation={layout === 'grid' ? 'vertical' : 'horizontal'}
                                    person={person}
                                    sessions={sessions}
                                    assembly={assembly} />
                            </Card>
                        </li>
                    ))}
                </ul>
                <h3>Varamenn ({data?.Substitutes.length})</h3>
                <ul className={classVariants('assembly-congressmen__list', layout === 'list' ? ['list'] : ['grid'])}>
                    {data?.Substitutes.map(({id, assembly, person, sessions}) => (
                        <li key={id} className="assembly-congressmen__list-item">
                            <Card>
                                <CongressmanSittingCard
                                    variation={layout === 'grid' ? 'vertical' : 'horizontal'}
                                    person={person}
                                    sessions={sessions}
                                    assembly={assembly} />
                            </Card>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}
