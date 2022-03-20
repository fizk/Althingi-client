import React from "react";
import type { FunctionComponent } from "react";
import type { AssemblyType, SessionType } from "../index.d";
import { scaleTime } from 'd3-scale';
import { timeMonth } from 'd3-time';
import { classVariants } from '../utils/classVariants';
import './Timeline.css';

interface Props {
    assembly: AssemblyType
    sessions: SessionType[]
}

export const Timeline: FunctionComponent<Props> = ({ assembly, sessions }) => {
    const width = 300;
    const height = 22;

    const scale = scaleTime()
        .domain([new Date(assembly.from), assembly.to ? new Date(assembly.to) : new Date()])
        .range([0, width])
        .clamp(true);

    const range = timeMonth.range(
        new Date(assembly.from),
        assembly.to ? new Date(assembly.to) : new Date()
    );

    return (
        <svg className="timeline" viewBox={`0 0 ${width} ${height}`} style={{ width: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <g>
                {sessions.map(item => (
                    <rect key={`${item.from}${item.to}`}
                        className={classVariants('timeline__bar', item.type === "þingmaður" ? ['primary'] : ['secondary'])}
                        x={scale(new Date(item.from))}
                        y={0}
                        height={10}
                        width={item.to
                            ? (scale(new Date(item.to))) - (scale(new Date(item.from)))
                            : (scale(new Date())) - (scale(new Date(item.from)))
                        }>
                        <title>{`${item.from} ${item.to}`}</title>
                    </rect>
                ))}
            </g>
            <g>
                {range.map(date => (
                    <g key={date.getTime()}>
                        <circle cx={scale(date)} cy={12} r="1" fill="#61DAFB" />
                        <text textAnchor="middle" x={scale(date)} y="20" style={{ fontSize: '.5rem' }} >
                            {date.getMonth() + 1}
                        </text>
                    </g>
                ))}
            </g>
        </svg>
    )
};
