import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Home } from './Home';
import { Assemblies } from './Assemblies';
import { Assembly } from './Assembly';
import { AssemblySummary } from './AssemblySummary';
import { AssemblyIssues } from './AssemblyIssues';
import { AssemblyIssueDocuments } from './AssemblyIssueDocuments';
import { AssemblyIssueSpeeches } from './AssemblyIssueSpeeches';
import { AssemblyIssue } from './AssemblyIssue';
import { AssemblyCongressmen } from './AssemblyCongressmen';
import { AssemblyCongressman } from './AssemblyCongressman';
import './App.css';

export function App() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/loggjafarthing">loggjafarthing</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/loggjafarthing" element={<Assemblies />} />
                <Route path="/loggjafarthing/:assembly_id" element={<Assembly />} >
                    <Route path="" element={<AssemblySummary />} />
                    <Route path="thingmal" element={<AssemblyIssues />} />
                    <Route path="thingmal/:category/:issue_id" element={<AssemblyIssue />} >
                        <Route path="" element={<AssemblyIssueSpeeches />} />
                        <Route path="skjol" element={<AssemblyIssueDocuments />} />
                    </Route>
                    <Route path="thingmenn" element={<AssemblyCongressmen />} />
                    <Route path="thingmenn/:congressman_id" element={<AssemblyCongressman />} />
                </Route>
            </Routes>
        </>
    );
}
