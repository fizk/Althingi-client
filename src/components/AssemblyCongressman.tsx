import { gql, useQuery } from "@apollo/client";
import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Spinner } from "../items/Spinner";
import type { PersonType } from "../index.d";
import './AssemblyCongressman.css';

const PERSON_QUERY = gql`
query person ($person: ID!){
  Person (person: $person){
		... person
  }
}

fragment person on Person {
    id
    name
    birth
    death
    abbreviation
}
`;

export function AssemblyCongressman () {
    const { assembly_id, congressman_id } = useParams();
    const { loading, error, data } = useQuery<{
        Person: PersonType ,
    }>(
        PERSON_QUERY,
        { variables: { person: congressman_id}}
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <section className="assembly-congressman">
            <header className="assembly-congressman__header">
                <img src={`/myndir/unsafe/400x500/www.althingi.is/myndir/mynd/thingmenn/${data?.Person.id}/org/mynd.jpg`} />
                <p>{data?.Person.name}</p>
                <p>{data?.Person.abbreviation}</p>
                <p>{data?.Person.birth}</p>
            </header>
            <div className="assembly-congressman__content">
                <nav className="assembly-congressman__navigation">
                    <ul className="assembly-congressman__navigation-list">
                        <li className="assembly-congressman__navigation-item">
                            <NavLink to={`/loggjafarthing/${assembly_id}/thingmenn/${data?.Person.id}`}
                                end
                                style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                                núverandi
                            </NavLink>
                        </li>
                        <li className="assembly-congressman__navigation-item">
                            <NavLink to={`/loggjafarthing/${assembly_id}/thingmenn/${congressman_id}/oll`}
                                end
                                style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                                öll
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </section>
    )
}
