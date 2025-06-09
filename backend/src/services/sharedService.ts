import { TableConfig } from '../configs/TableConfig';
import { getModel } from '../repositories/sharedRepository';
import { getPagination } from '../utils/pagination';
import { buildWhere, buildOrderBy } from '../utils/queryHelpers';

export async function listEntities(config: TableConfig, page: number, limit: number) {
    const model = getModel(config.model);

    if (!model) {
        throw new Error(`Model not found.`);
    }

    const { skip, take } = getPagination(page, limit);
    const where = buildWhere(config);
    const orderBy = buildOrderBy(config);

    const [data, total] = await Promise.all([
        model.findMany({
            skip,
            take,
            where,
            orderBy,
            include: config.includeRelations,
        }),
        model.count({ where }),
    ]);

    return {
        data,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
    };
}
