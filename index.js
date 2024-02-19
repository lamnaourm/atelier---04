import express from 'express'
import cors from 'cors'
import fs from 'fs'
import {v4 as uuid} from 'uuid'

const app = express()
app.use(express.json())
app.use(cors())


app. listen(3000, (err) => {
    if(!err)
        console.log('Server started')
    else 
        console.log('Unable to start server')      
});