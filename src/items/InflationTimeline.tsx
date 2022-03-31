import React from "react";
import { FunctionComponent } from "react";
import { InflationType } from "../index.d";
import { scaleTime, scaleLinear } from 'd3-scale';
import { timeMonth } from 'd3-time';
import { classVariants } from '../utils/classVariants';

interface Props {
    data: InflationType[]
}

export const InflationTimeline: FunctionComponent<Props> = ({ data }) => {
    const width = 300;
    const legend = 20;
    const gutter = 5;
    const height = 52;

    const dates = data.map(item => new Date(item.date));
    const values = data.map(item => item.value);

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    var minDate = dates.reduce((a, b) => a < b ? a : b);
    var maxDate = dates.reduce((a, b) => a > b ? a : b);

    const scaleX = scaleTime()
        .domain([minDate, maxDate])
        .range([0, width])
        .clamp(true);

    const scaleY = scaleLinear()
        .domain([0, Math.ceil(maxValue / 10) * 10])
        .range([0, height])
        .clamp(false);

    const ticksY = scaleY.ticks()


    const path = data.reduce((previous, current) => {
        return previous + `${scaleX(new Date(current.date))}, ${height - scaleY(current.value)} `;
    }, `0, ${height} `) + `${width}, ${height}`;

    const range = timeMonth.range(minDate, maxDate);

    return (
        <svg className="timeline"
            viewBox={`0 0 ${width + legend + gutter + gutter} ${height + gutter + gutter}`}
            style={{ width: '100%' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g transform={`translate(5, ${gutter})`}>
            {ticksY.map(item => (
                <g transform={`translate(0, ${height - scaleY(item) })`}>
                    <text x="5"
                        alignmentBaseline="middle"
                        style={{fontSize: '0.3rem'}}>
                            {item}
                    </text>
                    <circle key={item}
                        cx="0"
                        cy="0"
                        r="1"
                        fill="black" />
                </g>
            ))}
            </g>
            <g transform={`translate(${legend + gutter} ${gutter})`}>
                <polyline points={path} fill="steelblue" />
                {data.map(item => (
                    <circle key={item.id} cx={scaleX(new Date(item.date))}
                        cy={height - scaleY(item.value)}
                        r="2"
                        fill="black" />
                ))}
            </g>
        </svg>
    )
}
