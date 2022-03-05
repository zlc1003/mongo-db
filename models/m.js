const db = require ('mongoose')
const sch=db.Schema;

const bps = new sch({t:String,b:String,u:String,m:String});
const bp=db.model('BlogPost',bps)
module.exports=bp

var 老板死了 = true;