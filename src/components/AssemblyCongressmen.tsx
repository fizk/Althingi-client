import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import type { CongressmanType } from "../index.d";
import { Spinner } from "../items/Spinner";
import { Card } from "../items/Card";
import { CongressmanCard } from "../items/CongressmanCard";
import './AssemblyCongressmen.css';

const ASSEMBLY_CONGRESSMEN_QUERY = gql`
query assemblyCongressmen($assembly: ID!) {
  Primary: AssemblyCongressmen(assembly: $assembly, type: PRIMARY) {
    ...congressman
  }
  Substitude: AssemblyCongressmen(assembly: $assembly, type: SUBSTITUTE) {
    ...congressman
  }
  President: AssemblyCongressmen(assembly: $assembly, type: PRESIDENT) {
    ...congressman
  }
}

fragment congressman on Congressman {
    id
    name
    parties {id name color}
}
`;

export function AssemblyCongressmen () {
    const { assembly_id } = useParams();
    const { loading, error, data } = useQuery<{
        Primary: Array<CongressmanType> ,
        Substitude: Array<CongressmanType> ,
        President: Array<CongressmanType> ,
    }>(
        ASSEMBLY_CONGRESSMEN_QUERY,
        {variables: {assembly: assembly_id}}
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <>
        <section className="assembly-congressmen__section">
            <h3>Primary</h3>
            <ul className="assembly-congressmen__list">
                {data?.Primary.map(congressman => (
                    <li key={congressman.id} className="assembly-congressmen__list-item">
                        <Link to={`/loggjafarthing/${assembly_id}/thingmenn/${congressman.id}`}>
                            <Card>
                                <div className="assembly-congressmen__frame">
                                    <CongressmanCard congressman={congressman} party={congressman.parties?.at(0)} />
                                </div>
                            </Card>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
        <section className="assembly-congressmen__section">
            <h3>Substitude</h3>
            <ul className="assembly-congressmen__list">
                {data?.Substitude.map(congressman => (
                    <li key={congressman.id} className="assembly-congressmen__list-item">
                        <Link to={`/loggjafarthing/${assembly_id}/thingmenn/${congressman.id}`}>
                            <Card>
                                <div className="assembly-congressmen__frame">
                                    <CongressmanCard congressman={congressman} party={congressman.parties?.at(0)} />
                                </div>
                            </Card>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
        <section className="assembly-congressmen__section">
            <h3>President</h3>
            <ul className="assembly-congressmen__list">
                {data?.President.map(congressman => (
                    <li key={congressman.id} className="assembly-congressmen__list-item">
                        <Link to={`/loggjafarthing/${assembly_id}/thingmenn/${congressman.id}`}>
                            <Card>
                                <div className="assembly-congressmen__frame">
                                    <CongressmanCard congressman={congressman} party={congressman.parties?.at(0)} />
                                </div>
                            </Card>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
        </>
    )
}
