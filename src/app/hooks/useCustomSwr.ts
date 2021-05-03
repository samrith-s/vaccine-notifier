import { useMemo } from 'react';
import useSWR from 'swr';

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export function useCustomSwr<T = any, K = any>(url: string | null) {
    const props = useSWR<T, K>(url, fetcher);
    const loading = useMemo(() => !props.error && !props.data, [props.error, props.data]);

    return {
        ...props,
        loading,
    };
}
