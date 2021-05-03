export function classNames(...args: (string | boolean)[]): string {
    return args.filter((o) => o).join(' ');
}
