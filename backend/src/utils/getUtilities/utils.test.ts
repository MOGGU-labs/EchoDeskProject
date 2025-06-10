import { getPagination } from './pagination';
import { buildWhere, buildOrderBy } from './queryHelpers';
import { formatDateFields, formatDateToISO, formatDatesDeep } from './formatDates';

describe('Utils', () => {
    test('getPagination returns correct skip and take', () => {
        expect(getPagination(1, 10)).toEqual({ skip: 0, take: 10 });
        expect(getPagination(2, 10)).toEqual({ skip: 10, take: 10 });
    });

    test('buildWhere returns correct filter for soft delete', () => {
        const config = { softDelete: true, softDeleteField: 'isDeleted' };
        expect(buildWhere(config)).toEqual({ isDeleted: false });
    });

    test('buildOrderBy returns correct order object', () => {
        const config = { defaultOrderField: 'createdAt', defaultOrderDirection: 'desc' };
        expect(buildOrderBy(config)).toEqual({ createdAt: 'desc' });
    });

    test('formatDateFields formats date fields', () => {
        const item = { createdAt: new Date('2024-01-01T12:00:00Z'), updatedAt: new Date('2024-01-02T13:30:00Z') };
        const fields = ['createdAt', 'updatedAt'];
        const formatted = formatDateFields(item, fields, formatDateToISO);
        expect(formatted.createdAt).toBe('2024-01-01 12:00:00');
        expect(formatted.updatedAt).toBe('2024-01-02 13:30:00');
    });

    test('formatDatesDeep formats nested date fields', () => {
        const item = {
            createdAt: new Date('2024-01-01T12:00:00Z'),
            updatedAt: new Date('2024-01-02T13:30:00Z'),
            folders: [
                {
                    createdAt: new Date('2024-01-03T14:00:00Z'),
                    updatedAt: new Date('2024-01-04T15:00:00Z'),
                }
            ],
            nested: {
                createdAt: new Date('2024-01-05T16:00:00Z')
            }
        };
        const fields = ['createdAt', 'updatedAt'];
        const formatted = formatDatesDeep(item, fields, formatDateToISO);
        expect(formatted.createdAt).toBe('2024-01-01 12:00:00');
        expect(formatted.updatedAt).toBe('2024-01-02 13:30:00');
        expect(formatted.folders[0].createdAt).toBe('2024-01-03 14:00:00');
        expect(formatted.folders[0].updatedAt).toBe('2024-01-04 15:00:00');
        expect(formatted.nested.createdAt).toBe('2024-01-05 16:00:00');
    });
});

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
};