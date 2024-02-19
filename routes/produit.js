import express from 'express'
import fs from 'fs'
import {v4 as uuid} from 'uuid'

const route = express.Router()

route.post('/produit', (req, res) => {

    if(!fs.existsSync('./data'))
        fs.mkdirSync('./data')

    const produit = req.body
    if(Object.keys(produit).length===0)
        return res.status(404).send('Produit inexistant dans le corps de la requete')

    const id = uuid()
    fs.writeFileSync(`./data/${id}.txt`, JSON.stringify(produit))
    res.end()
})

route.get('/produit/all', (req, res) => {
    const files = fs.readdirSync('./data')
    var produits = []
    files.forEach(name => {
        const data = fs.readFileSync(`./data/${name}`)
        produits.push({id:name.split('.')[0],...JSON.parse(data)})
    })  
    res.json(produits)
})

route.get('/produit/id/:id', (req, res) => {
    
    const id = req.params.id;
    if(!fs.existsSync(`./data/${id}.txt`))
        return res.status(404).send(`${id} produit incorrect`)
    
    const data = fs.readFileSync(`./data/${id}.txt`)
    res.json(JSON.parse(data))
})

route.get('/produit/famille/:famille', (req, res) => {
    
    const files = fs.readdirSync('./data')
    var produits = []
    files.forEach(name => {
        const produit = JSON.parse(fs.readFileSync(`./data/${name}`))
        if(produit.famille == req.params.famille)
            produits.push({id:name.split('.')[0],...produit})
    })  
    res.json(produits)
})

route.put('/produit/:id', (req, res) => {
    if(!fs.existsSync(`./data/${req.params.id}`))
        return res.status(404).send('ID produit incorrect')

    const produit = req.body
    fs.writeFileSync(`./data/${id}.txt`, JSON.stringify(produit))
    res.end()
})

route.delete('/produit/:id', (req, res) => {
    if(!fs.existsSync(`./data/${req.params.id}`))
        return res.status(404).send('ID produit incorrect')

    fs.unlinkSync(`./data/${req.params.id}`)
    res.end()
})


export default route;