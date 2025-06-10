import { TableConfig } from './TableConfig';

const folderConfig: TableConfig = {
    model: 'consultFolder',
    idField: 'id',
    uniqueFields: ['name', 'clientId'], // adjust as needed based on your schema

    softDelete: true,
    softDeleteField: 'isDeleted',

    codeField: 'folderCode', // if you have a code field, otherwise remove
    codePrefix: 'FOLD-',

    dateFields: ['createdAt', 'updatedAt'],

    defaultOrderField: 'createdAt',
    defaultOrderDirection: 'desc',

    requiredFields: ['name', 'clientId'],
    optionalFields: ['notes'],

    includeRelations: {
        client: true, // include the related client
        consults: {
            take: 5,
            orderBy: { createdAt: 'desc' }
        }
    }
};

export default folderConfig;