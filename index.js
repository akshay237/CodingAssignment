const request = require('request')
const data = require('./data')
const express = require('express')
const result = []
const app = express()
const port = process.env.PORT || 8081

app.use(express.json())

//setting a product as favourite 
app.post('/setfavourite', (req,res) => {
    const id = req.body.id
    try{
        // console.log(id)
        const item = data.find(_item => _item.id === id)
        if(!item){
            return res.status(404).json(e)
        }
        item.isfavorite = "1"
        result.push(item)
        // for (const i in result){
        //     console.log(result[i])
        // }
        res.json(item)
        res.status(201)
    }catch(e){
        res.status(501).json(e)
    }
    

})
// for (const i in result){
//     console.log(result[i])
// }

//list all products
app.get('/products',async(req,res) => {
    try{
        res.json(data)
    }catch(e){
        res.status(501).json({error:e})
    }
})

//search product
app.get('/search?',async(req,res) => {
    const name = req.query.name
    try{
        const item =  data.find(_item => _item.name === name)
        if(!item){
           return res.status(404).json({message : 'Item does not exist' })
        }
        return res.json(item)
    }catch(e){
        res.status(501).json({error : e})
    }
    

})

//favourite products
app.get('/favorites',(req,res) => {
    try{
        // const item = data.find(_item => _item.isfavorite === 1)
        // if(!item){
        //     return res.status(404).json(e)
        // }
        // res.json(item)
        res.json(result)
    }catch(e){
        res.status(501).json(e)
    }

})

//starting the port
app.listen(port,() =>{
    console.log('Server is up on the port ' + port)
})
