import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, Outlet, useParams } from "react-router-dom";
import type { AssemblyType } from '../index.d';
import { Spinner } from "../items/Spinner";

const ASSEMBLY_QUERT = gql`
  query assembly ($assembly: ID!) {
  Assembly(assembly: $assembly) {
    id
    from
    to
  }
}
`;

export const Assembly = () => {
    const params = useParams();
    const { loading, error, data } = useQuery<{ Assembly: AssemblyType }>(
        ASSEMBLY_QUERT,
        { variables: { assembly: params.assembly_id } }
    );

    if (loading) return <Spinner />;
    if (error) return <pre>{JSON.stringify(error, undefined, 4)}(</pre>;

    return (
        <>
            <header>
                <h2>{data?.Assembly.id}</h2>
                <time>{data?.Assembly.from}</time>
                <time>{data?.Assembly.to}</time>
            </header>
            <nav>
                <ul>
                    <li><Link to={`/loggjafarthing/${data?.Assembly.id}`}>Samantekt</Link></li>
                    <li><Link to={`/loggjafarthing/${data?.Assembly.id}/thingmal`}>Thingmal</Link></li>
                    <li><Link to={`/loggjafarthing/${data?.Assembly.id}/thingmenn`}>Thingmenn</Link></li>
                </ul>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )

}
