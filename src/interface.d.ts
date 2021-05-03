export interface Slots {
    center_id: number;
    name: string;
    state_name: string;
    district_name: string;
    block_name: string;
    pincode: string;
    lat: number;
    long: number;
    from: string;
    to: string;
    fee_type: string;
    fee: string;
    date: string;
    available_capacity: number;
    min_age_limit: number;
    vaccine: string;
    slots: string[];
}

export interface State {
    state_id: number;
    state_name: string;
}

export interface StateData {
    states: State[];
}

export interface District {
    state_id: number;
    district_id: number;
    district_name: string;
}

export interface DistrictData {
    districts: District[];
}

export interface Alert {
    id: number;
    name: string;
    category: number;
    state: State;
    district: District;
    slots: Slots[];
}

export interface Session {
    session_id: string;
    date: string;
    available_capacity: number;
    min_age_limit: number;
    vaccine: string;
    slots: string[];
}

export interface Center {
    center_id: number;
    name: string;
    state_name: string;
    district_name: string;
    block_name: string;
    pincode: number;
    lat: number;
    long: number;
    from: string;
    to: string;
    fee_type: string;
    sessions: Session[];
}

export type EventTranspose<Target = any, FormData = Record<string, string>> = Target &
    {
        [key in keyof FormData]: { value: FormData[typeof key] };
    };
