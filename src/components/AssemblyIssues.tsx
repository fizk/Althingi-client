import React from "react";
import { useParams } from "react-router-dom";

export function AssemblyIssues () {
    const params = useParams();
    return (
        <div>Assembly issues for {params.assembly_id}</div>
    )
}