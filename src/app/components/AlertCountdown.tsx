import React, { useEffect, useRef, useState } from 'react';

export function AlertCountdown() {
    const [count, setCounter] = useState(0);
    const counter = useRef<number>();
    const countRef = useRef(0);

    useEffect(() => {
        counter.current = window.setInterval(() => {
            countRef.current += 1;

            if (countRef.current > 30) {
                setCounter(0);
                countRef.current = 0;
                return;
            }

            setCounter((countRef.current * 100) / 30);
        }, 1000);

        return () => {
            window.clearInterval(counter.current);
        };
    });

    return (
        <div className='absolute h-2 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-60'>
            <div
                className='h-full transition-all bg-green-200 bg-opacity-20'
                style={{ width: `${count}%` }}
            />
        </div>
    );
}
