import { useContext } from 'react';

import { AlertsContext } from '../alerts/Alerts.context';

export const useAlerts = () => useContext(AlertsContext);
