import { useCallback } from 'react';
import { useFetch } from 'use-http';
import d from 'dayjs';

import { Alert, CenterData } from '../../interface';
import { useAlerts } from './useAlerts';
import { filterSlots } from '../alerts/utils';

export function useFetchAlertData(alert: Alert) {
    const { update } = useAlerts();
    const date = d().format('DD-MM-YYYY');
    const { loading, get } = useFetch<CenterData>(
        'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public'
    );

    const getSlots = useCallback(async () => {
        try {
            const response = await get(
                `calendarByDistrict?district_id=${alert.district.district_id}&date=${date}`
            );
            const slots = filterSlots(alert, response);
            update(alert.id, {
                slots,
                shouldNotify: alert.slots.length !== slots.length,
            });
        } catch (error) {
            console.error(error);
        }
    }, [get, alert, date, update]);

    return {
        loading,
        getSlots,
    };
}
