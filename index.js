const db = require ('mongoose')
const bodyParser = require("body-parser");
const bp = require ('./models/m')
const express = require('express')
const app = express()
const port = 60000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')
db.connect("mongodb+srv://lucas:zlc20100303@cluster0.xf2ly.mongodb.net/blogdb?retryWrites=true&w=majority", { useNewUrlParser: true })

app.get('/', (req, res) => {
    res.redirect('/posts')
});
app.get('/posts', (req, res) => {
    bp.find({},(err,data)=>{
        if (err) {throw err}
        res.render('posts',{data:data})
    });
});
app.get('/new', (req, res) => {
    res.render('newpost')
});
app.post('/post',(req,res) => {
    console.log(req.body);
    url=req.body.urls;
    if(url.indexOf('https://')==-1){
        url='https://'+url;
    }
    bp.create({t:req.body.title,b:req.body.textbody,u:url},(err,blpo)=>{console.log(err,blpo)})
    res.redirect('/')
});
app.post('/del',(req,res) => {
    console.log(req.body);
    bp.findByIdAndRemove(req.body.id,(err,blpo)=>{console.log(err,blpo)})
    res.redirect('/')
});
// 404 page
app.use((req, res) => {
    res.status(404).render('404')
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
Infinity;Infinity;Infinity;Infinity;Infinity;Infinity;Infinity;Infinity;