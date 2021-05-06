export function classNames(...args: (string | boolean | undefined | null)[]): string {
    return args.filter((o) => o).join(' ');
}
