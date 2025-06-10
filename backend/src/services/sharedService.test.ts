import * as sharedService from './sharedService';
import * as sharedRepository from '../repositories/sharedRepository';

describe('listEntities', () => {
    it('returns paginated, formatted data', async () => {
        // Mock model with findMany and count
        const mockFindMany = jest.fn().mockResolvedValue([
            {
                id: 1,
                createdAt: new Date('2024-01-01T12:00:00Z'),
                updatedAt: new Date('2024-01-02T13:30:00Z'),
                folders: [
                    { createdAt: new Date('2024-01-03T14:00:00Z'), updatedAt: new Date('2024-01-04T15:00:00Z') }
                ]
            }
        ]);
        const mockCount = jest.fn().mockResolvedValue(1);

        // Mock getModel to return our fake model
        jest.spyOn(sharedRepository, 'getModel').mockReturnValue({
            findMany: mockFindMany,
            count: mockCount
        } as any);

        const config = {
            model: 'client',
            dateFields: ['createdAt', 'updatedAt'],
            includeRelations: { folders: true }
        };

        const result = await sharedService.listEntities(config as any, 1, 10);

        expect(result.data[0].createdAt).toBe('2024-01-01 12:00:00');
        expect(result.data[0].folders[0].createdAt).toBe('2024-01-03 14:00:00');
        expect(result.page).toBe(1);
        expect(result.limit).toBe(10);
        expect(result.total).toBe(1);
        expect(result.totalPages).toBe(1);
    });
});