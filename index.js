const db = require ('mongoose')
const bodyParser = require("body-parser");
const bp = require ('./models/m')
const express = require('express')
const app = express()
const port = 60000
var css=`
.bb {
    font-weight: bold;
}
.hide {
    display: none;
}
`
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')
db.connect("mongodb+srv://lucas:zlc20100303@cluster0.xf2ly.mongodb.net/blogdb?retryWrites=true&w=majority", { useNewUrlParser: true })
//aasasd
app.get('/post/:id',(req,res)=>{
    console.log(req.params.id)
    bp.findById(req.params.id,(err,data)=>{
        if(err) throw err
        console.log(data)
        if (data==null || data==undefined) {
            res.render('nonefind',{data:null})
        }
        else{
            res.render('post',{data})
        }
    })
})

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
    ppp=req.body.moreinfo
    ppp=ppp.replace(/\r\n/g,'\n')
    bp.create({t:req.body.title,b:req.body.textbody,u:url,m:ppp},(err,blpo)=>{console.log(err,blpo)})
    res.redirect('/')
});

app.post('/del',(req,res) => {
    console.log(req.body);
    bp.findByIdAndRemove(req.body.id,(err,blpo)=>{console.log(err,blpo)})
    res.redirect('/')
});
app.get('/sscss',(req,res)=>{
    res.send(css)
})
// 404 page
app.use((req, res) => {
    res.status(404).render('404')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

Infinity;Infinity;Infinity;Infinity;Infinity;Infinity;Infinity;Infinity;