import React from "react";
import { useParams } from "react-router-dom";

export function AssemblyCongressmen () {
    const params = useParams();
    return (
        <div>Assembly Congressmen for {params.assembly_id}</div>
    )
}