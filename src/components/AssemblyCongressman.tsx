import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import type { CongressmanType } from "../index.d";
import { Spinner } from "../items/Spinner";

const ASSEMBLY_CONGRESSMAN_QUERY = gql`
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
    }>(
        ASSEMBLY_CONGRESSMAN_QUERY,
        { variables: { assembly: assembly_id, congressman: congressman_id}}
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <h4>{data?.AssemblyCongressman.id}</h4>
            <p>{data?.AssemblyCongressman.name}</p>
        </>
    )
}
