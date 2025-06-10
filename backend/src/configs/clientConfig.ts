import { TableConfig } from './TableConfig';

const clientConfig: TableConfig = {
    model: 'client',
    idField: 'id',
    uniqueFields: ['name', 'npwp', 'clientCode'], // according to your Prisma schema
    
    softDelete: true,
    softDeleteField: 'isDeleted',
    
    codeField: 'clientCode',
    codePrefix: 'CLNT-',
    
    dateFields: ['createdAt', 'updatedAt'],
    
    defaultOrderField: 'createdAt',
    defaultOrderDirection: 'desc',
    
    requiredFields: ['name'],     // 'email' not present on Client model
    optionalFields: ['phone', 'address', 'business', 'notes', 'nkp', 'npwp'],
    
    includeRelations: {
        folders: {
            take: 5, // Only include the first 5 folders per client
            orderBy: { createdAt: 'desc' },
            where: { isDeleted: false },
            include: {
                createdBy: {
                    select: { fullName: true } // or use 'username' or 'email' if you prefer
                }
            }
        }
    }
};

export default clientConfig;
