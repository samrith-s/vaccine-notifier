import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';

import { District, DistrictData, State, StateData } from '../../interface';

import { useCustomSwr } from './useCustomSwr';

export function useLocationSelection() {
    const [currentState, setCurrentState] = useState<State>();
    const [currentDistrict, setCurrentDistrict] = useState<District>();

    const {
        data: statesData,
        error: statesError,
        loading: statesLoading,
    } = useCustomSwr<StateData>('https://cdn-api.co-vin.in/api/v2/admin/location/states');

    const {
        data: districtsData,
        error: districtsError,
        loading: districtsLoading,
    } = useCustomSwr<DistrictData>(
        currentState
            ? `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${currentState.state_id}`
            : null
    );

    const states = useMemo(() => statesData?.states, [statesData]);
    const districts = useMemo(() => districtsData?.districts, [districtsData]);

    const error = useMemo(() => statesError || districtsError, [statesError, districtsError]);

    const selectState: ChangeEventHandler<HTMLSelectElement> = useCallback(
        (e) => {
            const selectedState = states?.find(
                (state) => state.state_id === parseInt(e.target.value, 10)
            );
            setCurrentState(selectedState);
        },
        [setCurrentState, states]
    );

    const selectDistrict: ChangeEventHandler<HTMLSelectElement> = useCallback(
        (e) => {
            const selectedDistrict = districts?.find(
                (district) => district.district_id === parseInt(e.target.value, 10)
            );
            setCurrentDistrict(selectedDistrict);
        },
        [setCurrentDistrict, districts]
    );

    const reset = useCallback(() => {
        setCurrentState(undefined);
        setCurrentDistrict(undefined);
    }, [setCurrentState, setCurrentDistrict]);

    return {
        states,
        currentState,
        districts,
        currentDistrict,
        error,
        statesLoading,
        districtsLoading,
        selectState,
        selectDistrict,
        reset,
    };
}
