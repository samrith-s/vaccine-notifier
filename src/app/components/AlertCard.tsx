import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSync, FaTrash } from 'react-icons/fa';
import d from 'dayjs';

import { Alert } from '../../interface';
import { classNames } from '../util';
import { useFetchAlertData } from '../hooks/useFetchAlertData';
import { useAlerts } from '../hooks/useAlerts';

interface AlertCardProps {
    alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
    const { remove } = useAlerts();
    const { loading, getSlots } = useFetchAlertData(alert);
    const [count, setCounter] = useState(0);
    const timeout = useRef<number>();
    const counter = useRef<number>();
    const countRef = useRef<number>(0);
    const numberClass = useMemo(() => {
        const category = alert.category;

        if (category === 80) {
            return 'text-red-600';
        }

        if (category === 45) {
            return 'text-yellow-600';
        }

        return 'text-green-600';
    }, [alert.category]);

    const slotsAvailable = useMemo(() => !!alert.slots.length, [alert.slots]);

    const handleRemove = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (window.confirm('Are you sure you want to remove this alert?')) {
            remove(alert.id);
        }
    };

    const handleRefresh = async (e: React.SyntheticEvent) => {
        e.stopPropagation();
        e.preventDefault();
        getSlots();
    };

    useEffect(() => {
        getSlots();

        counter.current = window.setInterval(() => {
            countRef.current += 1;
            setCounter((countRef.current * 100) / 30);
        }, 1000);

        timeout.current = window.setInterval(() => {
            countRef.current = 0;
            getSlots();
            setCounter(0);
        }, 30000);

        return () => {
            window.clearInterval(timeout.current);
            window.clearInterval(counter.current);
        };
    }, []);

    return (
        <Link
            to={`/alerts/${alert.id}`}
            className={classNames(
                'transition-all',
                'rounded',
                'bg-gray-800',
                'hover:bg-gray-700',
                'overflow-hidden',
                'border',
                !slotsAvailable && 'border-transparent',
                slotsAvailable && 'border-green-500'
            )}
        >
            <div
                className='grid items-center relative p-4'
                style={{ gridTemplateColumns: 'max-content auto max-content' }}
            >
                <span
                    className={classNames(
                        'absolute',
                        'left-2/4',
                        'top-0',
                        'px-1.5',
                        'bg-green-500',
                        'text-sm',
                        'rounded-br',
                        'rounded-bl',
                        'transform',
                        '-translate-x-2/4',
                        'shadow-lg',
                        'uppercase',
                        'transition-all',
                        !slotsAvailable && 'opacity-0',
                        slotsAvailable && 'opacity-100'
                    )}
                >
                    Available
                </span>
                <div
                    className={classNames(
                        'rounded',
                        'bg-gray-900',
                        'bg-opacity-50',
                        'text-lg',
                        'text-bold',
                        'mr-4',
                        'w-12',
                        'h-12',
                        'flex',
                        'items-center',
                        'justify-center',
                        'align-center',
                        numberClass
                    )}
                >
                    {alert.category}+
                </div>
                <div className='mr-auto'>
                    <div className='text-white text-lg'>{alert.name}</div>
                    <div className='text-gray-300'>
                        {alert.district.district_name}, {alert.state.state_name}
                    </div>
                    <div className='text-gray-500 text-sm'>
                        Created at {d(alert.id).format('D MMMM YYYY')}
                    </div>
                </div>
                <div className='ml-4 flex rounded overflow-hidden items-center'>
                    <div
                        className={classNames(
                            'rounded-full',
                            'transition',
                            'bg-gray-600',
                            'mr-2',
                            'flex',
                            'items-center',
                            'justify-center',
                            'w-12',
                            'h-12',
                            'text-sm',
                            'hover:bg-gray-500',
                            'cursor-pointer'
                        )}
                        title='Delete'
                        onClick={handleRemove}
                    >
                        <FaTrash />
                    </div>
                    <div
                        className={classNames(
                            'rounded-full',
                            'transition',
                            'bg-blue-600',
                            'mr-2',
                            'flex',
                            'items-center',
                            'justify-center',
                            'w-12',
                            'h-12',
                            'text-sm',
                            'hover:bg-blue-500',
                            'cursor-pointer'
                        )}
                        onClick={handleRefresh}
                        title='Refresh'
                    >
                        <FaSync className={classNames(loading && 'animate-spin')} />
                    </div>
                </div>
                <div className='absolute h-2 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-60'>
                    <div
                        className='h-full transition-all bg-green-500'
                        style={{ width: `${count}%` }}
                    />
                </div>
            </div>
        </Link>
    );
}
