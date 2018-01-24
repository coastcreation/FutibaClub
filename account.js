const express = require('express')
const app = express.Router()

const init = connection => {
    app.get('/',async (req,res) => {
        const [rows,fields] = await connection.execute('select * from users')
        console.log(rows)
    
        res.render('home')
    })
    app.get('/new-account',(req,res) => {
        res.render('new-account')
    })
    app.post('/new-account',async(req,res) => {
        const [rows,fields] = await connection.execute('select * from users where email = ?',[req.body.email])
        if(rows.length === 0){
            console.log('Inserir')
            res.render('new-account')
        }else{ 
            console.log('Deu erro') 
            res.render('new-account', {error: ''})
        }        
    })
    return app
}

module.exports = init