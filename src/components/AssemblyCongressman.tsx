import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import type { CongressmanType } from "../index.d";

const EXCHANGE_RATES = gql`
query assemblyCongressman($assembly: ID! $congressman: ID!) {
  AssemblyCongressman (assembly: $assembly, congressman: $congressman) {
    ... congressman
  }
}

fragment congressman on Congressman {
  id
  name
}
`;

export function AssemblyCongressman () {
    const { assembly_id, congressman_id } = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyCongressman: CongressmanType ,
    }>(EXCHANGE_RATES, { variables: { assembly: assembly_id, congressman: congressman_id}});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <h4>{data?.AssemblyCongressman.id} {data?.AssemblyCongressman.name}</h4>
        </>
    )
}
