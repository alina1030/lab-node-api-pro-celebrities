const express = require('express')
const celebrities = require('./celebrities')


const app = express()
app.use(express.json())

app.listen(3000, () =>{
    console.log('listening to port 3000');
})



app.get('/',(req, res)=>{
    res.json({message:"API is working"})
})

app.get('/api/celebrities',(req,res) =>{
    res.json(celebrities)
})

app.post('/api/celebrities',(req,res) =>{

    if(!req.body.name){
        res.status(400)
        return res.json({error:"name is required"})
    }

    const user = {
        id: celebrities.length+1,
        name: req.body.name,
        occupation : req.body.occupation,
        catchphrase:req.body.catchphrase
    }

    celebrities.push(user)
    res.json(user)
})

app.put('/api/celebrities/:id' , (req,res)=>{
    let id = req.params.id
    let name= req.body.name,
     occupation = req.body.occupation,
     catchphrase = req.body.catchphrase

   let index = celebrities.findIndex((celebrity)=>{
        return (celebrity.id == Number.parseInt(id))
    })

    if(index>=0){
        let std = celebrities[index]
        std.name = name
        std.occupation = occupation
        std.catchphrase = catchphrase
        res.json(std)
    }
    else{
        res.status(404)
        
    }

    
})

app.delete('/api/celebrities/:id',(req,res)=>{
    let id = req.params.id;
    let index = celebrities.findIndex((celebrity)=>{
        return (celebrity.id == Number.parseInt(id))
    })
    if(index>=0){
        let std = celebrities[index]
       celebrities.splice(index,1)
       res.json(std)
    }
    else{
        res.status(404)
        
    }
})