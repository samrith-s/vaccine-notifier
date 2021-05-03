import { Alert, Center, CenterData } from '../../interface';

export function filterSlots(alert: Alert, centerData: CenterData): Center[] {
    return centerData.centers.filter((center) =>
        center.sessions.some(
            (session) => session.min_age_limit <= alert.category && session.available_capacity
        )
    );
}
