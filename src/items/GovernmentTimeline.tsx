import React from "react";
import type { FunctionComponent } from "react";
import { scaleTime } from 'd3-scale';
import { timeMonth } from 'd3-time';
import { GovernmentSession } from "../index.d";
import './GovernmentTimeline.css';

interface Props {
    sessions: GovernmentSession[]
}

export const GovernmentTimeline: FunctionComponent<Props> = ({ sessions }) => {
    const assembly = sessions.at(0)?.congressmen.at(0)?.assembly
    const from = assembly?.from ? new Date(assembly?.from) : new Date();
    const to = assembly?.to ? new Date(assembly?.to) : new Date();

    const width = 900;
    const legends = 200;
    const row = 30;
    const gutter = 30;


    const total = sessions.reduce((previous, current) => {
        return previous + current.congressmen.length
    }, 0);

    const scale = scaleTime()
        .domain([from, to])
        .range([0, width - legends])
        .clamp(true);
    const range = timeMonth.range(from, to);

    let offset = 0;

    return (
        <svg className="government-timeline" width={width} height={(total * row) + (2 * gutter)}
            viewBox={`0 0 ${width} ${total * row}`}
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id="clipCircle">
                    <circle r="16" cx="16" cy="16" />
                </clipPath>
            </defs>
            {sessions.map((ministry, i) => (
                <g key={ministry.id} transform={`translate(0 ${((i + offset) * row) + gutter})`}>
                    {offset += (ministry.congressmen.length - 1)}
                    <text x={legends - gutter}
                        className="government-timeline__legent"
                        textAnchor="end"
                        alignmentBaseline="baseline" y={7 + row - (2 * 7)}>
                            {ministry.name}
                    </text>
                    {ministry.congressmen.map((session, j) => (
                        <g key={session.id} transform={`translate(${legends + scale(new Date(session.from))} ${j * row})`}>
                            <rect className="government-timeline__bar"
                                x={0}
                                y={7}
                                width={session.to
                                    ? (scale(new Date(session.to))) - (scale(new Date(session.from)))
                                    : (scale(new Date())) - (scale(new Date(session.from)))
                                }
                                height={row - (2* 7)}
                                style={{ fill: session.party.color || undefined}} />
                            <g transform={`translate(10 0)`}>
                                <image
                                    x="0"
                                    y="0"
                                    width={32}
                                    height={32}
                                    href={`/myndir/unsafe/60x60/www.althingi.is/myndir/mynd/thingmenn/${session.person.id}/org/mynd.jpg`}
                                    clipPath="url(#clipCircle)"
                                />
                            </g>
                        </g>
                    ))}
                </g>
            ))}
            <g transform={`translate(${legends} 0)`}>
                {range.map(date => (
                    <g key={date.getTime()}>
                        <circle cx={scale(date)}
                            cy={12}
                            r="1"
                            className="government-timeline__tick-marker"
                        />
                        <text textAnchor="middle"
                            x={scale(date)}
                            y="20"
                            className="government-timeline__tick-label" >
                            {date.getMonth() + 1}
                        </text>
                    </g>
                ))}
            </g>
        </svg>
    )
}
