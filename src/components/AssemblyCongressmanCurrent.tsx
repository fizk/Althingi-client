import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Spinner } from "../items/Spinner";
import type { CongressmanType } from "../index.d";

const ASSEMBLY_CONGRESSMAN_QUERY = gql`
query assemblyCongressmanCurrent($assembly: ID! $congressman: ID!) {
  AssemblyCongressman (assembly: $assembly, congressman: $congressman) {
    ... congressman
  }
}

fragment congressman on Congressman {
    parties {
        id
        name
        color
    }
    constituencies {
        id
        name
        description
    }
}
`;

export const AssemblyCongressmanCurrent = () => {
    const { assembly_id, congressman_id } = useParams();
    const { loading, error, data } = useQuery<{
        AssemblyCongressman: CongressmanType,
    }>(
        ASSEMBLY_CONGRESSMAN_QUERY,
        { variables: { assembly: assembly_id, congressman: congressman_id } }
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;
    return (
        <article>
            <header>
                <h4>Parties</h4>
                <ul>
                    {data?.AssemblyCongressman.parties.map(party => (
                        <li key={party.id}>{party.name}</li>
                    ))}
                </ul>
                <h4>Constituencies</h4>
                <ul>
                    {data?.AssemblyCongressman.constituencies.map(constituency => (
                        <li key={constituency.id}>{constituency.name}</li>
                    ))}
                </ul>
            </header>
        </article>
    )
}
