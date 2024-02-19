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
        produits.push({id:name.split('.')[0],...JSON.parse(data)})
    })  
    res.json(produits)
})

app.get('/produit/id/:id', (req, res) => {
    
    const id = req.params.id;
    if(!fs.existsSync(`./data/${id}.txt`))
        return res.status(404).send(`${id} produit incorrect`)
    
    const data = fs.readFileSync(`./data/${id}.txt`)
    res.json(JSON.parse(data))
})

app.get('/produit/famille/:famille', (req, res) => {
    
    const files = fs.readdirSync('./data')
    var produits = []
    files.forEach(name => {
        const produit = JSON.parse(fs.readFileSync(`./data/${name}`))
        if(produit.famille == req.params.famille)
            produits.push({id:name.split('.')[0],...produit})
    })  
    res.json(produits)
})

app.put('/produit/:id', (req, res) => {
    if(!fs.existsSync(`./data/${req.params.id}`))
        return res.status(404).send('ID produit incorrect')

    const produit = req.body
    fs.writeFileSync(`./data/${id}.txt`, JSON.stringify(produit))
    res.end()
})

app.delete('/produit/:id', (req, res) => {
    if(!fs.existsSync(`./data/${req.params.id}`))
        return res.status(404).send('ID produit incorrect')

    fs.unlinkSync(`./data/${req.params.id}`)
    res.end()
})

app. listen(3000, (err) => {
    if(!err)
        console.log('Server started')
    else 
        console.log('Unable to start server')      
});