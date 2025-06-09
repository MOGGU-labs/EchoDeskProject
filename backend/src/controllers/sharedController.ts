import { RequestHandler } from 'express';
import { listEntities } from '../services/sharedService';
import { TableConfig } from '../configs/TableConfig';

export function list(config: TableConfig): RequestHandler {
    return async (req, res) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;
            const result = await listEntities(config, page, limit);
            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to list data' });
        }
    };
}
