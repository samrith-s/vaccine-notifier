import React, { useMemo } from 'react';
import d from 'dayjs';
import { FaSync, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Alert } from '../../interface';
import { classNames } from '../util';

interface AlertCardProps {
    alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
    const numberClass = useMemo(() => {
        const category = alert.category;

        if (category === 80) {
            return 'bg-red-600';
        }

        if (category === 45) {
            return 'bg-yellow-600';
        }

        return 'bg-green-600';
    }, [alert.category]);

    return (
        <Link
            to={`/alerts/${alert.id}`}
            className='transition rounded p-4 bg-gray-800 hover:bg-gray-700'
        >
            <div
                className='grid items-center'
                style={{ gridTemplateColumns: 'max-content auto max-content' }}
            >
                <div
                    className={classNames(
                        'rounded',
                        'text-white',
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
                            'hover:bg-gray-500'
                        )}
                        title='Delete'
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
                            'hover:bg-blue-500'
                        )}
                        title='Refresh'
                    >
                        <FaSync />
                    </div>
                </div>
            </div>
        </Link>
    );
}
