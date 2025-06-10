import { TableConfig } from '../configs/TableConfig';
import { getModel } from '../repositories/sharedRepository';
import {
    getPagination,
    buildWhere,
    buildOrderBy,
    formatDatesDeep,
    formatDateToISO
} from '../utils/UtilityIndex';


export async function listEntities(config: TableConfig, page: number, limit: number) {
    // Get the Prisma model instance based on the config
    const model = getModel(config.model);

    if (!model) {
        throw new Error(`Model not found.`);
    }

    // Calculate pagination parameters (skip/take)
    const { skip, take } = getPagination(page, limit);

    // Build the 'where' filter and 'orderBy' clause from config
    const where = buildWhere(config);
    const orderBy = buildOrderBy(config);

    // Fetch data and total count in parallel
    const [data, total] = await Promise.all([
        model.findMany({
            skip,
            take,
            where,
            orderBy,
            include: config.includeRelations, // Include related entities if specified
        }),
        model.count({ where }),
    ]);

    // Format specified date fields (e.g., createdAt, updatedAt) for each result item
    const dateFields = config.dateFields || ['createdAt', 'updatedAt'];
    const formattedData = data.map((item: any) =>
        formatDatesDeep(item, dateFields, formatDateToISO)
    );

    // Return paginated and formatted result
    return {
        data: formattedData,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
    };
}
