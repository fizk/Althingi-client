import React from 'react';
import type { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { classVariants } from '../utils/classVariants';
import './TabNav.css';

interface TabNavProps {
    title?: string
}

export const TabNav: FunctionComponent<TabNavProps> = ({children, title = ''}) => {
    return (
        <nav className="tab-nav" aria-label={title}>
            <ul className="tab-nav__list">
                {children}
            </ul>
        </nav>
    )
}

interface TabNavItemProps {
    to: string
}

export const TabNavItem: FunctionComponent<TabNavItemProps> = ({children, to}) => {
    return (
        <li className="tab-nav__item">
            <NavLink to={to} end
                className={({ isActive }) => isActive ? classVariants('tab-nav__link', ['active']) : 'tab-nav__link'}>
                {children}
            </NavLink>
        </li>
    )
}

export const TabNavStaticItem: FunctionComponent = ({children}) => {
    return (
        <li className="tab-nav__item">
            <span className="active">
                {children}
            </span>
        </li>
    )
}
