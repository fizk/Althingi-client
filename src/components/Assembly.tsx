import React from "react";
import { gql, useQuery } from "@apollo/client";
import { NavLink, Outlet, useParams } from "react-router-dom";
import type { AssemblyType } from '../index.d';
import { Spinner } from "../items/Spinner";
import './Assembly.css';

const ASSEMBLY_QUERT = gql`
  query assembly ($assembly: ID!) {
  Assembly(assembly: $assembly) {
    id
    from
    to
    parties {
        id
        name
        color
    }
  }
}
`;

export const Assembly = () => {
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{ Assembly: AssemblyType }>(
        ASSEMBLY_QUERT,
        { variables: { assembly: assembly_id } }
    );

    if (loading) return <Spinner />;
    if (error) return <pre>{JSON.stringify(error, undefined, 4)}(</pre>;

    return (
        <>
            <header className="assembly__header">
                <h2>{data?.Assembly.id}. Löggjafarþing</h2>
                <time>{data?.Assembly.from}</time>
                <time>{data?.Assembly.to}</time>
                <h3>Flokkar á þingi</h3>
                <ul>
                    {data?.Assembly.parties.map(party => (
                        <li key={party.id}>
                            <svg width="16" height="16" viewBox="0 0 16 16">
                                <circle cy="8" cx="8" r="8" fill={party.color || 'gray'} />
                            </svg>
                            {party.name}
                        </li>
                    ))}
                </ul>
            </header>
            <nav>
                <ul>
                    <li>
                        <NavLink to={`/loggjafarthing/${data?.Assembly.id}`}
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}} end>
                            Samantekt
                        </NavLink>
                        </li>
                    <li>
                        <NavLink to={`/loggjafarthing/${data?.Assembly.id}/thingmal`}
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                            Þingmál
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/loggjafarthing/${data?.Assembly.id}/thingfundir`}
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                            Þingfundir
                        </NavLink>
                        </li>
                    <li>
                        <NavLink to={`/loggjafarthing/${data?.Assembly.id}/thingseta`}
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                            Þingseta
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )

}
