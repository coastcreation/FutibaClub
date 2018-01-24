const express = require('express')
const app = express()
const mysql = require('mysql2/promise')
const bodyParser = require('body-parser')

const account = require('./account')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')

const init = async() => {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'futibaclub'
    })
   
    app.use(account(connection))

    app.listen(3000, err => {
        console.log('Futiba Club server is running...')
    })
}

init()
