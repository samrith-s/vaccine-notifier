import React, { useMemo } from 'react';
import { FaTrash } from 'react-icons/fa';
import d from 'dayjs';

import { Alert } from '../../interface';
import { classNames } from '../util';
import { useAlertWorker } from '../hooks/useAlertWorker';

interface AlertCardProps {
    alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
    const { remove } = useAlertWorker();
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

    return (
        <div
            className={classNames(
                'transition-all',
                'rounded',
                'bg-gray-800',
                'overflow-hidden',
                'border-2',
                !slotsAvailable && 'border-gray-700',
                slotsAvailable && 'border-green-600'
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
                        'text-sm',
                        'rounded-br',
                        'rounded-bl',
                        'transform',
                        '-translate-x-2/4',
                        'shadow-lg',
                        'uppercase',
                        'transition-all',
                        slotsAvailable && 'bg-green-600',
                        !slotsAvailable && 'bg-gray-700 text-gray-400'
                    )}
                >
                    {slotsAvailable ? 'Available' : 'Unavailable'}
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
            </div>
        </div>
    );
}
