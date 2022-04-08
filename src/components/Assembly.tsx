import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { Spinner } from '../items/Spinner';
import { DateDisplay } from '../items/DateDisplay';
import { PartyBadge } from '../items/PartyBadge';
import { List } from '../icons/List';
import { OpenBook } from '../icons/OpenBook';
import { User } from '../icons/User';
import { Watch } from '../icons/Watch';
import { ErrorMessage } from '../items/ErrorMessage';
import type { AssemblyType } from '../index.d';
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
    governmentParties {
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
    if (error) return <ErrorMessage error={error} />;

    return (
        <>
            <header className="assembly__header">
                <div className="assembly__properties">
                    <h2 className="assembly__header-title">{data?.Assembly.id}. Löggjafarþing</h2>
                    <ul>
                        <li>
                            <DateDisplay date={new Date(data?.Assembly?.from!)} />
                        </li>
                        {data?.Assembly.to && (<li>
                            <DateDisplay date={new Date(data?.Assembly?.to!)} />
                        </li>)}
                    </ul>
                </div>
                <div className="assembly__parties-card">
                    <h3 className="assembly__header-subtitle">Flokkar á þingi</h3>
                    <ul>
                        {data?.Assembly.parties.map(party => (
                            <li key={party.id}>
                                <PartyBadge party={party} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="assembly__parties-card">
                    <h3 className="assembly__header-subtitle">Stjórnarflokkar</h3>
                    <ul>
                        {data?.Assembly.governmentParties.map(party => (
                            <li key={party.id}>
                                <PartyBadge party={party} />
                            </li>
                        ))}
                    </ul>
                </div>
            </header>
            <nav className="assembly__navigation">
                <ul className="assembly__navigation-list">
                    <li className="assembly__navigation-list-item">
                        <NavLink to={`/loggjafarthing/${data?.Assembly.id}`}
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}} end>
                            <span className="assembly__navigation-list-group">
                                    <OpenBook />
                                    Samantekt
                                </span>
                        </NavLink>
                    </li>
                    <li className="assembly__navigation-list-item">
                        <NavLink to={`/loggjafarthing/${data?.Assembly.id}/thingmal`}
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                            <span className="assembly__navigation-list-group">
                                <List />
                                Þingmál
                            </span>
                        </NavLink>
                    </li>
                    <li className="assembly__navigation-list-item">
                        <NavLink to={`/loggjafarthing/${data?.Assembly.id}/thingfundir`}
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                            <span className="assembly__navigation-list-group">
                                <Watch />
                                Þingfundir
                            </span>
                        </NavLink>
                    </li>
                    <li className="assembly__navigation-list-item">
                        <NavLink to={`/loggjafarthing/${data?.Assembly.id}/thingseta`}
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                            <span className="assembly__navigation-list-group">
                                <User />
                                Þingseta
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="assembly__content">
                <Outlet />
            </div>
        </>
    )

}
