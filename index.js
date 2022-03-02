const db = require ('mongoose')
const bp = require ('./models/m')
const express = require('express')

const app = express()
const port = 80
db.connect("mongodb+srv://lucas:zlc20100303@cluster0.xf2ly.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true })

app.get('/', (req, res) => {
    res.send('Hello World!')
    bp.create({t:'hello',b:'World'},(err,blpo)=>{console.log(err,blpo)})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 