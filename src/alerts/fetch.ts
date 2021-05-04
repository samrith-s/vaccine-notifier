import d from 'dayjs';

import { Alert, CenterData } from '../interface';
import { setAlert } from './storage';

import { filterSlots, Notify } from './utils';

export async function fetchAlert(alert: Alert) {
    const date = d().format('DD-MM-YYYY');

    const response = (await fetch(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${alert.district.district_id}&date=${date}`
    ).then((res) => res.json())) as CenterData;

    const slots = filterSlots(alert, response);
    const shouldNotify = alert.slots.length !== slots.length;
    const newAlert = {
        ...alert,
        slots,
        shouldNotify,
    };

    await setAlert(newAlert);

    if (shouldNotify) {
        Notify(
            `There are vaccines available in ${alert.district.district_name}, ${alert.state.state_name}! Head to Cowin portal to book.`
        );
    }

    console.log(`Fetch::${alert.id}::${alert.name}`);
}
