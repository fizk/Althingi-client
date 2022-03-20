import React from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";


export const AssemblySessions = () => {
    const { assembly_id } = useParams();

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to={`/loggjafarthing/${assembly_id}/thingseta`} end
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                            Þingmenn
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/loggjafarthing/${assembly_id}/thingseta/kjordaemi`} end
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                            Kjördœmi
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/loggjafarthing/${assembly_id}/thingseta/flokkar`} end
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                            Þingflokkar
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

