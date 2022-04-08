import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { InflationTimeline } from '../items/InflationTimeline';

const inflation = [
    {
        date: "2011-10-27T00:00:00+00:00",
        id: 20111027,
        value: 5.3
    },
    {
        date: "2011-11-25T00:00:00+00:00",
        id: 20111125,
        value: 5.2
    },
    {
        date: "2011-12-21T00:00:00+00:00",
        id: 20111221,
        value: 5.3
    },
    {
        date: "2012-01-27T00:00:00+00:00",
        id: 20120127,
        value: 6.5
    },
    {
        date: "2012-02-24T00:00:00+00:00",
        id: 20120224,
        value: 6.3
    },
    {
        date: "2012-03-29T00:00:00+00:00",
        id: 20120329,
        value: 6.4
    },
    {
        date: "2012-04-27T00:00:00+00:00",
        id: 20120427,
        value: 6.4
    },
    {
        date: "2012-05-24T00:00:00+00:00",
        id: 20120524,
        value: 5.4
    },
    {
        date: "2012-06-27T00:00:00+00:00",
        id: 20120627,
        value: 5.4
    },
    {
        date: "2012-07-27T00:00:00+00:00",
        id: 20120727,
        value: 4.6
    },
    {
        date: "2012-08-29T00:00:00+00:00",
        id: 20120829,
        value: 4.1
    }
];

export default {
    title: 'Items/InflationTimeline',
    component: InflationTimeline
} as ComponentMeta<typeof InflationTimeline >;


export const WithData = () => <InflationTimeline data={inflation} />;
export const Empty = () => <InflationTimeline data={[]} />;
