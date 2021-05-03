import React, { useEffect, useMemo, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import d from 'dayjs';

import { Alert } from '../../interface';
import { classNames } from '../util';
import { useFetchAlertData } from '../hooks/useFetchAlertData';
import { useAlerts } from '../hooks/useAlerts';
import { AlertCountdown } from './AlertCountdown';

interface AlertCardProps {
    alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
    const { remove } = useAlerts();
    const { getSlots } = useFetchAlertData(alert);
    const timeout = useRef<number>();
    const firstLoad = useRef(false);
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

    useEffect(() => {
        if (!firstLoad.current) {
            getSlots();
            firstLoad.current = true;
        }

        timeout.current = window.setInterval(() => {
            getSlots();
        }, 30000);

        return () => {
            window.clearInterval(timeout.current);
        };
    }, [getSlots]);

    useEffect(() => {
        if (!(window as any).__UNAVAILABLE && alert.shouldNotify) {
            const notification = new Notification('Vaccine Notifier', {
                body: `There are vaccines available in ${alert.district.district_name}, ${alert.state.state_name}! Head to Cowin portal to book.`,
            });
            notification.onclick = () => {
                window.focus();
            };
        }
    }, [alert.shouldNotify, alert.district.district_name, alert.state.state_name]);

    return (
        <div
            className={classNames(
                'transition-all',
                'rounded',
                'bg-gray-800',
                'overflow-hidden',
                'border-2',
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
                            'bg-gray-900',
                            'bg-opacity-30',
                            'mr-2',
                            'flex',
                            'items-center',
                            'justify-center',
                            'w-12',
                            'h-12',
                            'text-sm',
                            'hover:bg-red-600',
                            'cursor-pointer'
                        )}
                        title='Delete'
                        onClick={handleRemove}
                    >
                        <FaTrash />
                    </div>
                </div>
                <AlertCountdown />
            </div>
        </div>
    );
}
