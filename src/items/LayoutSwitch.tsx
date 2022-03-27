import React, { useContext } from "react";
import type { FunctionComponent } from "react";
import { LayoutContext } from "../context/LayoutContext";
import { classVariants } from "../utils/classVariants";
import { List } from "../icons/List";
import { Grid } from "../icons/Grid";
import './LayoutSwitch.css';

export const LayoutSwitch: FunctionComponent = ({ children }) => {
    const { layout, setLayout } = useContext(LayoutContext);
    return (
        <>
            <button aria-label="listi" aria-pressed={layout === 'list' ? true : false}
                className={classVariants('layout-switch', layout === 'list' ? ['active'] : ['disable'])}
                onClick={() => setLayout('list')}>
                <List />
            </button>
            <button aria-label="kort" aria-pressed={layout === 'grid' ? true : false}
                className={classVariants('layout-switch', layout === 'grid' ? ['active'] : ['disable'])}
                onClick={() => setLayout('grid')}>
                <Grid />
            </button>
            {children}
        </>
    );
}
