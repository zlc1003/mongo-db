/* ---------------------------------password---------------------------- */
var NEWS_PAPER_ADMIN_PASSW = "doyouknow-west-bay-news-paper-admin-password"
/* --------------------------------------------------------------------- */

const db = require('mongoose')
const bodyParser = require("body-parser");
const bp = require('./models/m')
const express = require('express')
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express()
const port = 60000
bcrypt.hash('123456', 10, function (err, hash) {
    if (err) {
        throw err;
    }
    console.log(hash)
});
var css = `
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
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
db.connect("mongodb+srv://lucas:zlc20100303@cluster0.xf2ly.mongodb.net/news_paper?retryWrites=true&w=majority", { useNewUrlParser: true })
//aasasd
app.get('/post/:id', (req, res) => {
    console.log(req.params.id)
    bp.post.findById(req.params.id, (err, data) => {
        if (err) throw err
        console.log(data)
        if (data == null || data == undefined) {
            res.render('nonefind', { data: null })
        }
        else {
            res.render('post', { data })
        }
    })
})

app.get('/', (req, res) => {
    res.redirect('/posts')
});

app.get('/posts', (req, res) => {
    bp.post.find({}, (err, data) => {
        if (err) { throw err }
        res.render('posts', { data: data })
    });
});

app.get('/admin/new', (req, res) => {
    res.render('newpost');//, { pwd: "doyouknow-west-bay-news-paper-admin-password" })
});

app.post('/post', (req, res) => {
    console.log(req.body);
    url = req.body.urls;
    if (url.indexOf('https://') == -1 && url!='') {
        url = 'https://' + url;
    }
    else if (url == '') {
        url = '/#'
    }
    console.log(req.body.urls);
    ppp = req.body.moreinfo
    ppp = ppp.replace(/\r\n/g, '\n')
    pwd = req.body.pwd
    if (pwd != NEWS_PAPER_ADMIN_PASSW) { res.redirect('/404'); return; }
    bp.post.create({ t: req.body.title, b: req.body.textbody, u: url, m: ppp }, (err, blpo) => { console.log(err, blpo) })
    res.redirect('/')
});

app.post('/del', (req, res) => {
    console.log(req.body);
    bp.post.findByIdAndRemove(req.body.id, (err, blpo) => { console.log(err, blpo) })
    res.redirect('/')
});
app.get('/sscss', (req, res) => {
    res.send(css)
})
// 404 page
app.use((req, res) => {
    res.status(404).render('404')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

Infinity; Infinity; Infinity; Infinity; Infinity; Infinity; Infinity; Infinity;