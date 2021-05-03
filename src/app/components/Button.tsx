import React from 'react';
import { classNames } from '../util';

export function Button({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...rest}
            className={classNames(
                'rounded',
                'px-2',
                'py-1.5',
                'bg-green-500',
                'text-white',
                'outline-none',
                'hover:bg-green-600',
                'active:bg-green-700',
                'w-full',
                'disabled:opacity-50',
                'disabled:cursor-not-allowed'
            )}
        >
            {children}
        </button>
    );
}
