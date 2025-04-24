import express from 'express';

import {userSignup, userLogin, userVerification} from '../controllers/authController'

const router = express.Router();
// @ts-ignore
router.post('/login', userLogin)
// @ts-ignore
router.post('/signup', userSignup)
// @ts-ignore
router.get('/', userVerification)

export default router