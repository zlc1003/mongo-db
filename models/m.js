const db = require ('mongoose')
const sch=db.Schema;

const bps = new sch({t:String,b:String,u:String})
const bp=db.model('BlogPost',bps)
module.exports=bp