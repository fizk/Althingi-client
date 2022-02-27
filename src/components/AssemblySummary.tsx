import React from "react";
import { useParams } from "react-router-dom";

export function AssemblySummary() {
    const params = useParams();
    return (
        <div>Assembly summary for {params.assembly_id}</div>
    )
}