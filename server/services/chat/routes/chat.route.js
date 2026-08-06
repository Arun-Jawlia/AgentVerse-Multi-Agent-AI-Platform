import express from 'express'
import { createConverstation, getConverstation, updateConverstationTitle } from '../controllers/converstation.controller.js'
import { getMessages, saveMessage } from '../controllers/message.controller.js'

const routes = express.Router()

routes.get('/create-conversation', createConverstation)
routes.get('/get-conversation', getConverstation)
routes.post('/update-conversation', updateConverstationTitle)
routes.post('/save-message', saveMessage)
routes.get('/get-messages/:conversationId', getMessages)

export default routes