import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import type { CongressmanType } from "../index.d";
import { Spinner } from "../items/Spinner";

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
            <h3>Primary</h3>
            <ul>
                {data?.Primary.map(congressman => (
                    <li key={congressman.id}>
                        <Link to={`/loggjafarthing/${assembly_id}/thingmenn/${congressman.id}`}>
                            <h4>{congressman.id}</h4>
                            <p>{congressman.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <h3>Substitude</h3>
            <ul>
                {data?.Substitude.map(congressman => (
                    <li key={congressman.id}>
                        <Link to={`/loggjafarthing/${assembly_id}/thingmenn/${congressman.id}`}>
                            <h4>{congressman.id}</h4>
                            <p>{congressman.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <h3>President</h3>
            <ul>
                {data?.President.map(congressman => (
                    <li key={congressman.id}>
                        <Link to={`/loggjafarthing/${assembly_id}/thingmenn/${congressman.id}`}>
                            <h4>{congressman.id}</h4>
                            <p>{congressman.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
