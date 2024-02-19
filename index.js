import express from 'express'
import cors from 'cors'
import fs from 'fs'
import {v4 as uuid} from 'uuid'

const app = express()
app.use(express.json())
app.use(cors())


app.post('/produit', (req, res) => {

    if(!fs.existsSync('./data'))
        fs.mkdirSync('./data')

    const produit = req.body
    if(Object.keys(produit).length===0)
        return res.status(404).send('Produit inexistant dans le corps de la requete')

    const id = uuid()
    fs.writeFileSync(`./data/${id}.txt`, JSON.stringify(produit))
    res.end()
})

app.get('/produit/all', (req, res) => {
    const files = fs.readdirSync('./data')
    var produits = []
    files.forEach(name => {
        const data = fs.readFileSync(`./data/${name}`)
        produits.push(JSON.parse(data))
    })  
    res.json(produits)
})

app.get('/produit/id/:id', (req, res) => {
    
})

app.get('/produit/famille/:famille', (req, res) => {
    
})

app.put('/produit/:id', (req, res) => {
    
})

app.delete('/produit/:id', (req, res) => {
    
})

app. listen(3000, (err) => {
    if(!err)
        console.log('Server started')
    else 
        console.log('Unable to start server')      
});