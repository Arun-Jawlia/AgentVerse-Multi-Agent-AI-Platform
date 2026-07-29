import express from 'express'
import { createConverstation, getConverstation, updateConverstationTitle } from '../controllers/converstation.controller.js'
import { getMessage, saveMessage } from '../controllers/message.controller.js'

const Router = express.Router()

Router.get('/create-conversation', createConverstation)
Router.get('/get-conversation', getConverstation)
Router.post('/update-conversation', updateConverstationTitle)
Router.post('/save-message', saveMessage)
Router.get('/get-messages/:conversationId', getMessage)

export default Router