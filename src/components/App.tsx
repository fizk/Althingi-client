import React from 'react';
import type { FunctionComponent } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Assemblies } from './Assemblies';
import { Assembly } from './Assembly';
import { AssemblySummary } from './AssemblySummary';
import { AssemblyIssues } from './AssemblyIssues';
import { AssemblyIssueDocuments } from './AssemblyIssueDocuments';
import { AssemblyIssueSpeeches } from './AssemblyIssueSpeeches';
import { AssemblyIssue } from './AssemblyIssue';
import { AssemblyConstituencies } from './AssemblyConstituencies';
import { AssemblyParties } from './AssemblyParties';
import { AssemblyCommittees } from './AssemblyCommittees';
import { AssemblySessions } from './AssemblySessions';
import { AssemblyCongressmen } from './AssemblyCongressmen';
import { AssemblyCongressman } from './AssemblyCongressman';
import { AssemblyCongressmanCurrent } from './AssemblyCongressmanCurrent';
import { AssemblyCongressmanAll } from './AssemblyCongressmanAll';
import { AssemblyPlenaries } from './AssemblyPlenaries';
import { AssemblyPlenaryAgenda } from './AssemblyPlenaryAgenda';
import './App.css';

export const App: FunctionComponent = () => {
    return (
        <>
            <nav className="app__navigation">
                <ul>
                    <li>
                        <NavLink to="/"
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                            home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/loggjafarthing"
                            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : {}}>
                            loggjafarthing
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <main className="app__content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/loggjafarthing" element={<Assemblies />} />
                <Route path="/loggjafarthing/:assembly_id" element={<Assembly />} >
                    <Route path="" element={<AssemblySummary />} />
                    <Route path="thingfundir" element={<AssemblyPlenaries />} >
                        <Route path="" element={<AssemblyPlenaryAgenda />} />
                        <Route path=":plenary_id" element={<AssemblyPlenaryAgenda />} />
                    </Route>
                    <Route path="thingmal" element={<AssemblyIssues />} />
                    <Route path="thingmal/:category/:issue_id" element={<AssemblyIssue />} >
                        <Route path="" element={<AssemblyIssueSpeeches />} />
                        <Route path="skjol" element={<AssemblyIssueDocuments />} />
                    </Route>
                    <Route path="thingseta" element={<AssemblySessions />} >
                        <Route path="" element={<AssemblyCongressmen />} />
                        <Route path="kjordaemi" element={<AssemblyConstituencies />} />
                        <Route path="flokkar" element={<AssemblyParties />} />
                        <Route path="nefndir" element={<AssemblyCommittees />} />
                    </Route>
                    <Route path="thingmenn/:congressman_id" element={<AssemblyCongressman />} >
                        <Route path="" element={<AssemblyCongressmanCurrent />} />
                        <Route path="oll" element={<AssemblyCongressmanAll />} />
                    </Route>
                </Route>
            </Routes>
            </main>
        </>
    );
}
