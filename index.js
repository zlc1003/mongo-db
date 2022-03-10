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
db.connect("mongodb+srv://lucas:zlc20100303@cluster0.xf2ly.mongodb.net/blogdb?retryWrites=true&w=majority", { useNewUrlParser: true })
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

app.get('/new', (req, res) => {
    res.render('newpost')
});

app.post('/login', (req, res) => {
    hash=req.body.pwd
    bp.user.findOne({ name: req.body.user}, (err, data) => {
        if (err) throw err
        if (data == null || data == undefined) {
            res.render('login', { data: null })
        }
        else {
            bcrypt.compare(req.body.pwd, data.pwd, function (err, result) {
                if (err) throw err
                if (result) {
                    req.session.userid = data._id
                    res.redirect('/posts')
                }
                else {
                    res.render('login', { data: null })
                }
            });
        }
    });
})
app.get('/login', (req, res) => {
    res.render('login', { data: null })
})
app.post('/register', (req, res) => {
    bp.user.findOne({ name: req.body.user }, (err, data) => {
        if (err) { throw err }
        if (data == null || data == undefined) {
            bcrypt.hash(req.body.pwd, 10, function (err, hash) {
                if (err) {
                    throw err;
                }
                bp.user.create({ name: req.body.user, pwd: hash }, (err, data) => {
                    if (err) { throw err }
                    res.redirect('/login')
                })
            });
        }
        else {
            res.render('login', { data: null })
        }
    });
})
app.get('/register', (req, res) => {
    res.render('register', { data: null })
})
app.get('/logout', (req, res) => {
    res.clearCookie('userid')
    req.session.destroy(
        function (err) {
            if (err) {
                throw err
            }
            res.redirect('/login')
        }
    )
})
app.post('/post', (req, res) => {
    console.log(req.body);
    url = req.body.urls;
    if (url.indexOf('https://') == -1) {
        url = 'https://' + url;
    }
    ppp = req.body.moreinfo
    ppp = ppp.replace(/\r\n/g, '\n')
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