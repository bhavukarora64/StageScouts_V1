import express from 'express';
import userAuth from '../middlewares/userAuth';

import {getImages, publishImages} from '../controllers/imageController'

const router = express.Router();

router.get('/', getImages);

router.post('/upload', publishImages);

export default router;