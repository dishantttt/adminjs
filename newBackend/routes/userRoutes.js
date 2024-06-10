import express from 'express'
// import { Router } from 'express';


import { register, findUser, getRegistrationFee } from '../controllers/user.js'


const router = express.Router();
router.route('/register').post(register);
router.route('/findUser').get(findUser);
router.route('/getRegistrationfee/:id').get(getRegistrationFee);

export default router;