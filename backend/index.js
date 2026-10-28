const express = require('express')
const app = express()
const cors = require('cors')
const conn = require('./db/conn')
const host = 'localhost'
const port = 3000
const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req,res)=>{
    res.status(200).json({message: 'servidor rodando'})
})

conn.sync()
.then(()=>{
    app.listen(port,host, ()=>{
        console.log(`servidor rodando em http://${host}:${port}`)
    })
})