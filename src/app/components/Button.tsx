import React from 'react';
import { classNames } from '../util';

interface ButtonAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    anchor: true;
}

interface ButtonRegularProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    anchor?: false;
}

type ButtonProps = (ButtonAnchorProps | ButtonRegularProps) & {
    stylize?: string;
    stretch?: boolean;
};

export function Button({
    children,
    anchor,
    stylize = 'green',
    className,
    stretch = true,
    ...rest
}: ButtonProps) {
    const classes = classNames(
        'flex',
        'items-center',
        'justify-center',
        'flex-nowrap',
        'whitespace-nowrap',
        'rounded',
        'transition-all',
        'px-4',
        'py-1.5',
        `bg-${stylize}-500`,
        'text-white',
        'outline-none',
        `hover:bg-${stylize}-600`,
        `active:bg-${stylize}-700`,
        stretch && 'w-full',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        'h-9',
        className
    );

    if (anchor) {
        return (
            <a {...(rest as Omit<ButtonAnchorProps, 'anchor'>)} className={classes}>
                {children}
            </a>
        );
    }

    return (
        <button {...(rest as Omit<ButtonRegularProps, 'anchor'>)} className={classes}>
            {children}
        </button>
    );
}
