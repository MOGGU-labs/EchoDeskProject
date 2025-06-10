export function buildWhere(config: any) {
    const where: Record<string, any> = {};
    if (config.softDelete && config.softDeleteField) {
        where[config.softDeleteField] = false;
    }
    return where;
}

export function buildOrderBy(config: any) {
    const orderBy: Record<string, any> = {};
    if (config.defaultOrderField && config.defaultOrderDirection) {
        orderBy[config.defaultOrderField] = config.defaultOrderDirection;
    }
    return orderBy;
}