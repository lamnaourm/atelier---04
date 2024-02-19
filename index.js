import express from 'express'
import cors from 'cors'
import produitRoute from './routes/produit.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/',produitRoute)


app. listen(3000, (err) => {
    if(!err)
        console.log('Server started')
    else 
        console.log('Unable to start server')      
});