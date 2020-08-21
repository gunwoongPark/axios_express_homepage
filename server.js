const fs = require('fs');
const express = require('express');
const app = express();

// app.use(express.json())
// app.use(express.static('./'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/login.html")
})



app.listen(3000, () => {
    console.log('open server')
})