import React, {
    ChangeEventHandler,
    SyntheticEvent,
    useContext,
    useMemo,
    useRef,
    useState,
} from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Alert, EventTranspose } from '../../interface';
import { useAlerts } from '../hooks/useAlerts';
import { useLocationSelection } from '../hooks/useLocationSelection';

export function CreateForm() {
    const { add } = useAlerts();
    const {
        states,
        districts,
        selectState,
        selectDistrict,
        statesLoading,
        districtsLoading,
        currentState,
        currentDistrict,
        reset,
    } = useLocationSelection();
    const [formData, setFormData] = useState<Pick<Alert, 'name' | 'category'>>({
        name: '',
        category: 0,
    });
    const disabled = useMemo(
        () => !formData.name || !formData.category || !currentState || !currentDistrict,
        [formData, currentState, currentDistrict]
    );
    const formRef = useRef<HTMLFormElement>(null);

    const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData({
            ...formData,
            name: e.target.value,
        });
    };

    const handleCategoryChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setFormData({
            ...formData,
            category: parseInt(e.target.value, 10),
        });
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (currentState && currentDistrict) {
            const target = e.target as EventTranspose<
                typeof e.target,
                {
                    alertName: string;
                    category: string;
                }
            >;

            add({
                name: target.alertName.value,
                category: parseInt(target.category.value, 10),
                state: currentState,
                district: currentDistrict,
            });

            reset();
            setFormData({
                name: '',
                category: 0,
            });
        }
    };

    return (
        <>
            <form
                className='rounded col-span-12 bg-gray-800 bg-opacity-50 p-4 sm:col-span-4'
                onSubmit={handleSubmit}
                ref={formRef}
            >
                {statesLoading && (
                    <div className='bg-gray-900 bg-opacity-70 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
                        <FaSpinner className='text-3xl animate-spin text-green-500' />
                    </div>
                )}
                <h1 className='text-xl font-bold mb-4 text-green-500'>Create an alert</h1>
                <label htmlFor='alertName' className='text-gray-400 block mb-5 text-sm'>
                    Alert name <span className='text-red-500'>*</span>
                    <input
                        name='alertName'
                        type='text'
                        placeholder='Enter a name for your alert'
                        value={formData.name}
                        onChange={handleNameChange}
                        required
                    />
                </label>
                <label htmlFor='category' className='text-gray-400 block mb-5 text-sm'>
                    Category <span className='text-red-500'>*</span>
                    <select
                        name='category'
                        placeholder='Select a category'
                        required
                        value={formData.category}
                        onChange={handleCategoryChange}
                    >
                        <option>Select a category..</option>
                        <option value={18}>18 - 44 years</option>
                        <option value={45}>45+ years</option>
                        <option value={80}>80+ years</option>
                    </select>
                </label>
                <label htmlFor='state' className='text-gray-400 mb-5 block text-sm'>
                    State <span className='text-red-500'>*</span>
                    <select
                        name='state'
                        onChange={selectState}
                        value={currentState?.state_id || ''}
                        required
                    >
                        <option>Select a state..</option>
                        {states?.map((state) => (
                            <option key={state.state_id} value={state.state_id}>
                                {state.state_name}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor='district' className='text-gray-400 mb-5 block text-sm'>
                    District <span className='text-red-500'>*</span>
                    <select
                        name='district'
                        onChange={selectDistrict}
                        disabled={districtsLoading}
                        value={currentDistrict?.district_id}
                        required
                    >
                        <option>Select a district..</option>
                        {districts?.map((district) => (
                            <option key={district.district_id} value={district.district_id || ''}>
                                {district.district_name}
                            </option>
                        ))}
                    </select>
                </label>
                <button
                    type='submit'
                    className='rounded px-2 py-1.5 bg-green-500 text-white outline-none hover:bg-green-600 active:bg-green-700 w-full'
                    disabled={disabled}
                >
                    Create alert
                </button>
            </form>
            <div className='mt-5 text-sm text-gray-400'>
                Instructions:
                <ul>
                    <li>- Allow notifications from this site</li>
                    <li>- Keep this website running in a new tab</li>
                </ul>
            </div>
            <div className='mt-5 text-sm text-gray-500'>
                This site does not store any data on the internet. It only uses the internet to
                fetch data from the government's Cowin API.
            </div>
        </>
    );
}
