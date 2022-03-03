import React from "react";
import type { FunctionComponent } from "react";
import './Card.css';

export const Card: FunctionComponent = ({children}) => {
    return (
        <div className="card">{children}</div>
    )
}
