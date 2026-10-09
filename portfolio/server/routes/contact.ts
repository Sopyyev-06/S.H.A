import { Router } from 'express'
import { createContactMessage, getContactInfo } from '../controllers/contactController.js'

const router = Router()

router.get('/', getContactInfo)
router.post('/', createContactMessage)

export default router
