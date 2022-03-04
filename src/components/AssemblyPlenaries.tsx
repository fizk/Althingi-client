import { gql, useQuery } from "@apollo/client";
import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { PlenaryType } from '../index.d';
import { Spinner } from "../items/Spinner";
import { PlenaryCard } from "../items/PlenaryCard";
import './AssemblyPlenaries.css';

const ASSEMBLY_PLENARIES = gql`
query AssemblyPlenaries ($assembly: ID! ){
  AssemblyPlenaries (assembly: $assembly) {
    ... plenary
  }
}

fragment plenary on Plenary {
    id
    name
    assembly {id}
    from
    to
}
`;

export const AssemblyPlenaries = () => {
    const { assembly_id, plenary_id } = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyPlenaries: PlenaryType[],
    }>(
        ASSEMBLY_PLENARIES,
        { variables: { assembly: assembly_id } }
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <section className="assembly-plenaries">
            <header className="assembly-plenaries__header">
                <ul className="assembly-plenaries__list">
                    {data?.AssemblyPlenaries.map((plenary, i) => (
                        <li key={plenary.id} className="assembly-plenaries__list-item">
                            <NavLink to={`/loggjafarthing/${plenary.assembly.id}/thingfundir/${plenary.id}`}
                                style={({ isActive }) => {
                                    if (plenary_id === undefined && i === 0) return { textDecoration: 'underline' };
                                    return isActive ? { textDecoration: 'underline' } : {}
                                }} end>
                                <PlenaryCard plenary={plenary} />
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </header>
            <div className="assembly-plenaries__content">
                <Outlet/>
            </div>
        </section>
    )
}
