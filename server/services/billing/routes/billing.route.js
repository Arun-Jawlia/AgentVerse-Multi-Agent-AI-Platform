import express from 'express'
import { createOrder, verifyPayment } from '../controllers/billing.controllers.js'

const router = express.Router()

router.post('/create', createOrder)
router.post('/verify', verifyPayment)

export default router