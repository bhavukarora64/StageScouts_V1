import express from 'express';
import {getAllVenues, getSearchedVenue, getVenue} from '../controllers/venuesController'
import userAuth from '../middlewares/userAuth';

const router = express.Router();

router.get('/all', getAllVenues)
router.get('/search', getSearchedVenue)
router.get('/:venueId', getVenue)

export default router;