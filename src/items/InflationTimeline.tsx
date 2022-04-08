import React from 'react';
import { FunctionComponent, MouseEvent } from 'react';
import { scaleTime, scaleLinear } from 'd3-scale';
import { timeMonth } from 'd3-time';
import type { InflationType } from '../index.d';
import './InflationTimeline.css';

interface Props {
    data: InflationType[]
}

export const InflationTimeline: FunctionComponent<Props> = ({ data }) => {
    const width = 575;
    const legend = 20;
    const gutter = 5;
    const height = 175;

    const fullWidth = width + legend + gutter;
    const fullHeight = height + legend + gutter;

    if (data.length === 0) return (
        <svg className="inflation-timeline"
            role="img"
            viewBox={`0 0 ${fullWidth} ${fullHeight}`}
            width={fullWidth}
            height={fullHeight}
            xmlns="http://www.w3.org/2000/svg"
        ></svg>
    );

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

    const area = data.reduce((previous, current) => {
        return previous + `${scaleX(new Date(current.date))}, ${height - scaleY(current.value)} `;
    }, `0, ${height} `) + `${width}, ${height}`;
    const path = data.reduce((previous, current) => {
        return previous + `${scaleX(new Date(current.date))}, ${height - scaleY(current.value)} `;
    }, '');

    const range = timeMonth.range(minDate, maxDate);

    const handleMouseEnter = (event: MouseEvent<SVGCircleElement>) => {
        console.log(event.clientX, event.clientY)
    };
    const handleMouseLeave = (event: MouseEvent<SVGCircleElement>) => {
        console.log(event.clientX, event.clientY)
    };


    return (
        <svg className="inflation-timeline"
            role="img"
            viewBox={`0 0 ${fullWidth} ${fullHeight}`}
            width={fullWidth}
            height={fullHeight}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Horizontal bars */}
            <g transform={`translate(${legend} ${gutter})`}>
                {ticksY.map(tick => (
                    <line key={tick} className="inflation-timeline__tick-bar"
                        x1={0}
                        y1={scaleY(tick)}
                        x2={width}
                        y2={scaleY(tick)}
                    />
                ))}
            </g>

            {/* Y Axis */}
            <g transform={`translate(8, ${gutter})`}>
                {ticksY.map(item => (
                    <g key={item} transform={`translate(0, ${height - scaleY(item) })`}>
                        <text textAnchor="end"
                            alignmentBaseline="middle"
                            className="inflation-timeline__label">
                                {item}
                        </text>
                    </g>
                ))}
            </g>

            {/* X Axis */}
            <g transform={`translate(${legend} ${height + gutter + 8})`}>
                {range.map(date => (
                    <g key={date.getTime()} transform={`translate(${scaleX(date)} 0)`}>
                        <text className="inflation-timeline__label"
                            alignmentBaseline="hanging"
                            textAnchor="middle"
                        >{date.getMonth() + 1}</text>
                    </g>
                ))}
            </g>

            {/* Area */}
            <g transform={`translate(${legend} ${gutter})`}>
                <polyline points={area}
                    className="inflation-timeline__area" />
                <polyline points={path}
                    className="inflation-timeline__path"/>
                {data.map(item => (
                    <circle key={item.id} cx={scaleX(new Date(item.date))}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        cy={height - scaleY(item.value)}
                        r="3"
                        className="inflation-timeline__dots">
                        <title>
                            {item.date} - {item.value}
                        </title>
                    </circle>
                ))}
            </g>
        </svg>
    )
}
