export function formatDateFields(item: Record<string, any>, fields: string[], formatFn: (date: Date) => string): Record<string, any> {
    const newItem = { ...item };
    for (const field of fields) {
        if (newItem[field] instanceof Date) {
            newItem[field] = formatFn(newItem[field]);
        }
    }
    return newItem;
}

export function formatDateToISO(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} `
        + `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
}

export function formatDatesDeep(
    item: Record<string, any>,
    dateFields: string[],
    formatFn: (date: Date) => string
): Record<string, any> {
    const newItem: Record<string, any> = { ...item };
    for (const key in newItem) {
        if (dateFields.includes(key) && newItem[key] instanceof Date) {
            newItem[key] = formatFn(newItem[key]);
        } else if (Array.isArray(newItem[key])) {
            newItem[key] = newItem[key].map((child: any) =>
                typeof child === 'object' && child !== null
                    ? formatDatesDeep(child, dateFields, formatFn)
                    : child
            );
        } else if (typeof newItem[key] === 'object' && newItem[key] !== null) {
            newItem[key] = formatDatesDeep(newItem[key], dateFields, formatFn);
        }
    }
    return newItem;
}