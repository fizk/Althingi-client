import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IssueType } from "../index.d";
import { Spinner } from "../items/Spinner";
import { IssueCard } from "../items/IssueCard";
import { Card } from "../items/Card";
import './AssemblyIssues.css';

const ASSEMBLY_ISSUE_QUERY = gql`
query AssemblyIssues ($assembly: ID!) {
  AssemblyIssues (assembly: $assembly) {
    ... issue
  }
}

fragment issue on Issue {
  id
  name
  category
  status
  subName
  typeName
  typeSubName
}
`;

export function AssemblyIssues () {
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyIssues: Array<IssueType>,
    }>(
        ASSEMBLY_ISSUE_QUERY,
        { variables: { assembly: assembly_id } }
    );

    const [options, setOptions] = useState<string[]>([]);
    const navigate = useNavigate();

    /**
     * @todo Let's think about if this is the right
     * way of doing this, feels like a lot of code :|
     */
    const handleOptionsChange = (event: ChangeEvent<HTMLFormElement>) => {
        const value: string = event.target.name;
        const checked: boolean = event.target.checked;
        let values: string[] = checked
            ? [...options, value]
            : [...options.slice().filter(item => item !== value)];
        setOptions(values);

        // navigate(`/loggjafarthing/${assembly_id}/thingmal?options=${values.join(',')}`);
    }

    // if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <section className="assembly-issues">
            <nav className="assembly-issues__options">
                <form onChange={handleOptionsChange}>
                    <ul className="assembly-issues__options-list">
                        <li>
                            <div><input id="l" name="l" type="checkbox" />    <label htmlFor="l">lagafrumvarp</label></div>
                            <div><input id="a" name="a" type="checkbox" />    <label htmlFor="a">þingsályktunartillaga</label></div>
                            <div><input id="f" name="f" type="checkbox" />    <label htmlFor="f">frestun funda</label></div>
                            <div><input id="s" name="s" type="checkbox" />    <label htmlFor="s">skýrsla</label></div>
                            <div><input id="b" name="b" type="checkbox" />    <label htmlFor="b">beiðni um skýrslu</label></div>
                            <div><input id="m" name="m" type="checkbox" />    <label htmlFor="m">fyrirspurn</label></div>
                            <div><input id="q" name="q" type="checkbox" />    <label htmlFor="q">fyrirspurn til skrifl. svars</label></div>
                            <div><input id="v" name="v" type="checkbox" />    <label htmlFor="v">vantraust</label></div>
                            <div><input id="n" name="n" type="checkbox" />    <label htmlFor="n">álit nefndar</label></div>
                        </li>
                        <li>
                            <div><input type="checkbox" name="ud" id="ud" />   <label htmlFor="ud">umræður utan dagskrár</label></div>
                            <div><input type="checkbox" name="ft" id="ft" />   <label htmlFor="ft">óundirbúinn fyrirspurnatími</label></div>
                            <div><input type="checkbox" name="ff" id="ff" />   <label htmlFor="ff">fyrirspurnir til ráðherra</label></div>
                            <div><input type="checkbox" name="um" id="um" />   <label htmlFor="um">sérstök umræða</label></div>
                            <div><input type="checkbox" name="uu" id="uu" />   <label htmlFor="uu">umræður utan dagskrár</label></div>
                        </li>
                    </ul>
                </form>
            </nav>
            <main>
                {loading && <Spinner />}
                {!loading && (
                    <ul className="assembly-issues__list">
                        {data?.AssemblyIssues.map(issue => (
                            <li key={issue.id} className="assembly-issues__list-item">
                                <Card>
                                    <Link to={`/loggjafarthing/${assembly_id}/thingmal/${issue.category}/${issue.id}`}>
                                        <IssueCard issue={issue} />
                                    </Link>
                                </Card>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </section>
    )
}
