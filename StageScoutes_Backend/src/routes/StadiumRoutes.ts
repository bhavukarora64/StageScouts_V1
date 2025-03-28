import express from 'express';
import {getAllStadium, getStadium} from '../controllers/stadiumController'
import userAuth from '../middlewares/userAuth';

const router = express.Router();

router.get('/all', getAllStadium)
router.get('/:stadiumId', getStadium)

export default router;