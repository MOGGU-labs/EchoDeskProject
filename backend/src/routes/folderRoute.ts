import express from 'express';
import { list } from '../controllers/sharedController';
import config from '../configs/folderConfig';

const router = express.Router();

router.get('/', list(config));

export default router;