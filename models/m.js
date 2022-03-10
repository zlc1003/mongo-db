const db = require ('mongoose')
const sch=db.Schema;

const bps = new sch({t:String,b:String,u:String,m:String});
const  bp=db.model('BlogPost',bps)
module.exports.post=bp

const bps2 = new sch({name:String,pwd:String});
const bp2=db.model('user',bps2)
module.exports.user=bp2

var 老板死了 = true;