import React from "react";
import type { FunctionComponent } from "react";

interface Props {
    date: Date
}

export const DateDisplay: FunctionComponent<Props> = ({ date }) => {
    return (
        <time dateTime={date.toISOString()}>
            {new Intl.DateTimeFormat('is-IS').format(date)}
        </time>
    )
}
