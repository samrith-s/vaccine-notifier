import React from 'react';
import d from 'dayjs';

export default function Home() {
    return (
        <>
            <div className='max-w-sm mx-auto'>
                <h1 className='text-2xl mb-4 text-green-500'>Create an alert</h1>
                <label htmlFor='name' className='text-gray-400 block mb-5'>
                    Alert name
                    <input name='name' type='text' placeholder='Enter a name for your alert' />
                </label>
                <label htmlFor='dob' className='text-gray-400 block mb-5'>
                    Date of birth
                    <input
                        name='dob'
                        type='date'
                        placeholder='Date of birth'
                        value={d().format('YYYY-MM-DD')}
                    />
                </label>
                <label htmlFor='zip' className='text-gray-400 mb-5 block'>
                    Postcode
                    <input name='zip' type='number' placeholder='Enter your postcode' />
                </label>
            </div>
        </>
    );
}
