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
    defaultOrderDirection: 'asc',
    
    requiredFields: ['name'],     // 'email' not present on Client model
    optionalFields: ['phone', 'address', 'business', 'notes', 'nkp', 'npwp'],
    
    includeRelations: {
        folders: true,  // matches your Prisma relation in Client
    }
};

export default clientConfig;
