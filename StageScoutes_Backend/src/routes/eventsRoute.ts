import express from 'express';
import {getAllEvents, getEvent} from '../controllers/eventsController'
import userAuth from '../middlewares/userAuth';

const router = express.Router();

router.get('/all', getAllEvents)
router.get('/:eventId', getEvent)

export default router;